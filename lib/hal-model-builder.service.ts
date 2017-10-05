import { Injectable } from '@angular/core';
import { HalRestService } from './hal-rest.service'
import { HalModel } from './hal-model'

import { Observable } from 'rxjs/Observable';


@Injectable()
export class HalModelBuilder {

    public static readonly PROTOTYPE_IDENT_HAL_PROPERTIES = 'halProperties';
    public static readonly PROTOTYPE_IDENT_HAL_LINKS = 'halLinks';
    public static readonly PROTOTYPE_IDENT_HAL_RESOLVES = 'halResolves';

    constructor(){}

    public build<T extends HalModel>(c : {new() : T}, res : any, restService : HalRestService ) : T | T[]{
        return this.parse<T>(c, res, restService);
    }


    private parse<T>(c : {new() : T}, response:any, restService : HalRestService, relationName?:string) : T | T[]{
        //console.log("ASSIGN:", response);

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

    private buildObject<T extends any>(c:{new():T}, content:any, restService : HalRestService) : T {
        let instance = new c();
        let wantedProperties = instance[HalModelBuilder.PROTOTYPE_IDENT_HAL_PROPERTIES];
        let wantedLinks = instance[HalModelBuilder.PROTOTYPE_IDENT_HAL_LINKS];
        let wantedResolves = instance[HalModelBuilder.PROTOTYPE_IDENT_HAL_RESOLVES];

        instance = this.assignProperties(instance, wantedProperties, content);
        instance = this.assignLinks(instance, wantedLinks, content, restService);
        instance = this.assignContent(instance, content['content']);
        instance = this.assignResolves(instance, wantedResolves, restService);

        return instance;
    }

    private assignProperties<T>(target:T, wantedProperties:HalPropertyConfig[], content:any) : T {
        if(!wantedProperties) return target;
        for(let conf of wantedProperties) {   
            if(content[conf.relationName]) {
                Object.defineProperty(target,conf.propertyKey,{
                    value:content[conf.relationName]
                });
            }
        }

        return target;
    }

    private assignResolves<T>(target:T, wantedResolves:HalResolveConfig[], restService : HalRestService) : T {
        if(!wantedResolves) return target;
        for(let conf of wantedResolves) {
            let current : T;
            restService.resolveAsyncPath(target, conf.propertyPath)
                .subscribe(value => 
                        Object.defineProperty(target,conf.propertyKey,{
                            value:value
                        })
                    );
                    

              
            
        }

        return target;
    }

    private assignContent<T>(target:T, content:any) : T {
        if(!content) return target;

        for(let propKey in content) {   
            Object.defineProperty(target,propKey,{
               value:content[propKey]
            });
        }

        return target;
    }

    private assignLinks<T>(target:T, wantedLinks:HalLinkConfig[], content:any, restService : HalRestService) : T {
        if(!wantedLinks) return target;

        let links = content['_links'];
        if(!links) return target;

        for(let conf of wantedLinks) {   

            if(links[conf.relationName]) {
                let link = links[conf.relationName];
                Object.defineProperty(target,conf.propertyKey,{
                    value:restService.get<any>(link['href'],conf.clazz)
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
}
