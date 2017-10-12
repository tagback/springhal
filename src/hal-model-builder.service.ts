import { Injectable } from '@angular/core';
import { HalRestService } from './hal-rest.service'
import { HalModel } from './hal-model'

import {Observable} from 'rxjs/Rx'


@Injectable()
export class HalModelBuilder {



    constructor(){}

    public build<T extends HalModel>(c : {new() : T}, res : any, restService : HalRestService ) : T | T[]{
        return this.parse<T>(c, res, restService);
    }


    private parse<T extends HalModel>(c : {new() : T}, response:any, restService : HalRestService, relationName?:string) : T | T[]{
        if(response['_embedded']) {

            relationName = relationName?relationName:this.findRelationName(response);
            let contentArray = response['_embedded'][relationName];
            if(contentArray && contentArray instanceof Array) {
                let content = new Array<T>();
                for(let objectContent of contentArray) {
                    content.push(this.buildObject<T>(c, objectContent, restService));
                }
                return content;
            } else {
                console.error("Can't parse array result: ", response['_embedded'], relationName);
            }


        }

        return this.buildObject<T>(c, response, restService);
        
    }

    private findRelationName(response : any) :string {
        if(!response['_embedded']) {
            return ''
        }

        for(let key in response['_embedded']) {
            return key;
        }

        return '';
    }

    private buildObject<T extends HalModel>(c:{new():T}, content:any, restService : HalRestService) : T {
        let instance = new c();
      
        instance = this.assignProperties(instance, content);
        instance = this.assignLinks(instance, content, restService);
        instance = this.assignContent(instance, content['content']);
        instance = this.assignResolves(instance, restService);

        return instance;
    }

    private assignProperties<T extends HalModel>(target:T, content:any) : T {
      
        for(let conf of target.halProperties) {   
            if(content[conf.relationName]) {
                Object.defineProperty(target,conf.propertyKey,{
                    value:content[conf.relationName]
                });
            }
        }

        return target;
    }

    private assignResolves<T extends HalModel>(target:T, restService : HalRestService) : T {
        
        for(let conf of target.halResolves) {
        
            let obs : Observable<T>;
            if(conf.flatten) {
                obs = restService.resolveAsyncPathReduced(target, conf.propertyPath,(acc,curr)=>{
                    return acc ? acc + ',' + curr : curr;
                },(val:any)=>val && val.length > 0);
            } else {
                obs = restService.resolveAsyncPath(target, conf.propertyPath)
            }
            
            obs.subscribe(value => 
                Object.defineProperty(target,conf.propertyKey,{
                    value:value
                })
            );
 
        }

        return target;
    }

    private assignContent<T extends HalModel>(target:T, content:any) : T {
        if(!content) return target;

        for(let propKey in content) {   
            Object.defineProperty(target,propKey,{
               value:content[propKey]
            });
        }

        return target;
    }

    private assignLinks<T extends HalModel>(target:T, content:any, restService : HalRestService) : T {
       

        let links = content['_links'];
        if(!links) return target;

        for(let conf of target.halLinks) {   

            if(links[conf.relationName]) {
                let link = links[conf.relationName];

                target.addPlainLinks(conf.relationName, link.href);

                Object.defineProperty(target,conf.propertyKey,{
                    value:restService.get<any>(link.href,conf.clazz)
                });
            }
        }

        return target;

    }

}

export class HalLinkConfig {
    clazz:{new():any};
    relationName:string;
    propertyKey:string;
}

export class HalPropertyConfig {
    relationName:string;
    propertyKey:string;
}

export class HalResolveConfig {
    propertyPath:string;
    propertyKey:string;
    flatten:boolean;
}
