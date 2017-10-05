import { HttpClient } from '@angular/common/http';
import { HalModelBuilder } from './hal-model-builder.service';
import { HalModel } from './hal-model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/last';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
export declare class HalRestService {
    private _httpClient;
    private _modelBuilder;
    constructor(_httpClient: HttpClient, _modelBuilder: HalModelBuilder);
    get<T extends HalModel>(uri: string, c: {
        new (): T;
    }): Observable<T | T[]>;
    resolveAsyncPath(target: HalModel, propertyPath: string): Observable<any>;
    resolveAsync(target: HalModel, propertyKeys: string[], flatten?: boolean): Observable<any>;
}
