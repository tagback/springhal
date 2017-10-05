import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HalModelBuilder } from './hal-model-builder.service';
import { HalModel } from './hal-model';

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

    public get<T extends HalModel>(uri: string, c: { new(): T }): Observable<T | T[]> {

        return this._httpClient.get<Object>(uri)
            .map(res => this._modelBuilder.build(c, res, this));


    }

    public resolveAsyncPath(target: HalModel, propertyPath: string): Observable<any> {
        return this.resolveAsync(target, propertyPath.split('.'))
    }

    public resolveAsync(target: HalModel, propertyKeys: string[], flatten: boolean = false): Observable<any> {

        propertyKeys = propertyKeys.reverse();

        return Observable.of(target).expand((obj:any) => {

            if (propertyKeys.length == 0) return Observable.empty();

            let key = propertyKeys.pop();
            let resolvedObj = undefined;
            if(key) {
                resolvedObj = obj[key];
            }

            if (obj instanceof HalModel
                && resolvedObj instanceof Observable) {

                if (flatten === true) {
                    return resolvedObj.flatMap((o:any) => {
                        if (o instanceof Array) {
                            let k = propertyKeys;
                            return Observable.from(o).flatMap((o:any) => this.resolveAsync(o, k));
                        }
                        return Observable.of(o);
                    });
                } else {
                    return resolvedObj;
                }

            } else {
                return Observable.of(resolvedObj);
            }

        }).last();


    }
}
