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
import 'rxjs/add/observable/from';
var HalRestService = /** @class */ (function () {
    function HalRestService(_httpClient, _modelBuilder) {
        this._httpClient = _httpClient;
        this._modelBuilder = _modelBuilder;
    }
    HalRestService.prototype.get = function (uri, c) {
        var _this = this;
        return this._httpClient.get(uri)
            .map(function (res) { return _this._modelBuilder.build(c, res, _this); });
    };
    HalRestService.prototype.resolveAsyncPath = function (target, propertyPath) {
        return this.resolveAsync(target, propertyPath.split('.'));
    };
    HalRestService.prototype.resolveAsync = function (target, propertyKeys, flatten) {
        var _this = this;
        if (flatten === void 0) { flatten = false; }
        propertyKeys = propertyKeys.reverse();
        return Observable.of(target).expand(function (obj) {
            if (propertyKeys.length == 0)
                return Observable.empty();
            var key = propertyKeys.pop();
            var resolvedObj = undefined;
            if (key) {
                resolvedObj = obj[key];
            }
            if (obj instanceof HalModel
                && resolvedObj instanceof Observable) {
                if (flatten === true) {
                    return resolvedObj.flatMap(function (o) {
                        if (o instanceof Array) {
                            var k_1 = propertyKeys;
                            return Observable.from(o).flatMap(function (o) { return _this.resolveAsync(o, k_1); });
                        }
                        return Observable.of(o);
                    });
                }
                else {
                    return resolvedObj;
                }
            }
            else {
                return Observable.of(resolvedObj);
            }
        }).last();
    };
    HalRestService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HalRestService.ctorParameters = function () { return [
        { type: HttpClient, },
        { type: HalModelBuilder, },
    ]; };
    return HalRestService;
}());
export { HalRestService };
//# sourceMappingURL=hal-rest.service.js.map