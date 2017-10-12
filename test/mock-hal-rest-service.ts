import { HalRestService,HalModel } from '../index';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HalModelBuilder } from '../src/hal-model-builder.service';

import { Observable } from 'rxjs/Rx';

export class MockHalRestService extends HalRestService {
    
    matchers : {[name: string]: any} = {};

    constructor(private _builder : HalModelBuilder){
        super(undefined, undefined);
    }


    public match(uri:string, response:any) {
        this.matchers[uri] = response;
    }
    
    public get<T extends HalModel>(uri: string, c: { new(): T }): Observable<T | T[]> {
        let match = this.matchers[uri];
        if(match) {
            return Observable.of(match).map(res => this._builder.build(c, res, this));
        }

        return Observable.empty();
    }
}