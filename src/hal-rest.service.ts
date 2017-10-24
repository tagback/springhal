import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HalModelBuilder } from './hal-model-builder.service';
import { HalModel,HalPage } from './hal-model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/last';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from'

@Injectable()
export class HalRestService {

    constructor(private _httpClient: HttpClient,
        private _modelBuilder: HalModelBuilder) {
    }

    public get<T extends HalModel>(uri: string, c: { new(): T }): Observable<T | HalPage<T>> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/hal+json' });
        return this._httpClient.get<Object>(uri,{headers:headers})
            .map(res => this._modelBuilder.build(c, res, this));
    }

    public post<T extends HalModel>(uri:string, object:T) : Observable<T> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.post<T>(uri, this._modelBuilder.toJson(object),{headers:headers});
    }

    public patch<T extends HalModel>(model:T) : Observable<T> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/merge-patch+json' });
        return this._httpClient.patch<T>(model.selfHref, this._modelBuilder.toJson(model),{headers:headers});
    }

    public put<T extends HalModel>(model:T) : Observable<T> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this._httpClient.put<T>(model.selfHref, this._modelBuilder.toJson(model),{headers:headers});
    }

    public delete<T extends HalModel>(model:T) : Observable<number> {
        return this._httpClient.delete(model.selfHref, {observe: 'response'}).map(response => response.status);
    }

    public resolveAsyncPath(target: HalModel, propertyPath: string): Observable<any> {
            return this.resolveAsync(target, propertyPath.split('.').reverse(), false);
    }

    public resolveAsyncPathReduced(target: HalModel, propertyPath: string, reduce : (acc:any, curr:any)=>any, filter : (val:any)=>boolean = (val)=>true): Observable<any> {
        return this.resolveAsync(target, propertyPath.split('.').reverse(), true).filter(filter).reduce(reduce);
    }

    public resolveAsync(target: HalModel, propertyKeys: string[], flatten: boolean = false): Observable<any> {
        let keys = Array.from(propertyKeys);

        let obs = Observable.of(target).expand((obj:any) => {
           
            if (keys.length == 0) return Observable.empty();

            let key = keys.pop();
           
            let resolvedObj = undefined;
            if(key) {
                resolvedObj = obj[key];
            }
            
            
            if (obj instanceof HalModel
                && resolvedObj instanceof Observable) {

                if (flatten === true) {
                    let k = Array.from(keys);
                    keys.pop();
                    return resolvedObj.flatMap((o:any) => {
                       console.log(o);
                        if (o instanceof HalPage) {
                            return Observable.from(o.data).flatMap((o:any) =>  this.resolveAsync(o, k, flatten));
                        }
                        
                        return Observable.of(o);
                    });
                } else {
                    return resolvedObj;
                }

            } else {
                return Observable.of(resolvedObj);
            }

        });

        if(flatten) {
            return obs;
        } else {
            return obs.last();
        }
    }
    
}
