(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs/Observable'), require('rxjs/add/operator/map'), require('rxjs/add/operator/mergeMap'), require('rxjs/add/operator/expand'), require('rxjs/add/operator/last'), require('rxjs/add/observable/of'), require('rxjs/add/observable/empty'), require('rxjs/add/observable/from')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common/http', 'rxjs/Observable', 'rxjs/add/operator/map', 'rxjs/add/operator/mergeMap', 'rxjs/add/operator/expand', 'rxjs/add/operator/last', 'rxjs/add/observable/of', 'rxjs/add/observable/empty', 'rxjs/add/observable/from'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.springhal = global.ng.springhal || {}),global.ng.core,global.ng.common.http,global.Rx));
}(this, (function (exports,_angular_core,_angular_common_http,rxjs_Observable) { 'use strict';

var HalModelBuilder = /** @class */ (function () {
    function HalModelBuilder() {
    }
    HalModelBuilder.prototype.build = function (c, res, restService) {
        return this.parse(c, res, restService);
    };
    HalModelBuilder.prototype.parse = function (c, response, restService, relationName) {
        //console.log("ASSIGN:", response);
        if (response['_embedded']) {
            relationName = relationName ? relationName : this.findRelationName(response);
            var contentArray = response['_embedded'][relationName];
            if (contentArray && contentArray instanceof Array) {
                var content = new Array();
                for (var _i = 0, contentArray_1 = contentArray; _i < contentArray_1.length; _i++) {
                    var objectContent = contentArray_1[_i];
                    content.push(this.buildObject(c, objectContent, restService));
                }
                return content;
            }
            else {
                console.error("Can't parse array result: ", response['_embedded'], relationName);
            }
        }
        return this.buildObject(c, response, restService);
    };
    HalModelBuilder.prototype.findRelationName = function (response) {
        if (!response['_embedded']) {
            return '';
        }
        for (var key in response['_embedded']) {
            return key;
        }
        return '';
    };
    HalModelBuilder.prototype.buildObject = function (c, content, restService) {
        var instance = new c();
        var wantedProperties = instance[HalModelBuilder.PROTOTYPE_IDENT_HAL_PROPERTIES];
        var wantedLinks = instance[HalModelBuilder.PROTOTYPE_IDENT_HAL_LINKS];
        var wantedResolves = instance[HalModelBuilder.PROTOTYPE_IDENT_HAL_RESOLVES];
        instance = this.assignProperties(instance, wantedProperties, content);
        instance = this.assignLinks(instance, wantedLinks, content, restService);
        instance = this.assignContent(instance, content['content']);
        instance = this.assignResolves(instance, wantedResolves, restService);
        return instance;
    };
    HalModelBuilder.prototype.assignProperties = function (target, wantedProperties, content) {
        if (!wantedProperties)
            return target;
        for (var _i = 0, wantedProperties_1 = wantedProperties; _i < wantedProperties_1.length; _i++) {
            var conf = wantedProperties_1[_i];
            if (content[conf.relationName]) {
                Object.defineProperty(target, conf.propertyKey, {
                    value: content[conf.relationName]
                });
            }
        }
        return target;
    };
    HalModelBuilder.prototype.assignResolves = function (target, wantedResolves, restService) {
        if (!wantedResolves)
            return target;
        var _loop_1 = function (conf) {
            var current = void 0;
            restService.resolveAsyncPath(target, conf.propertyPath)
                .subscribe(function (value) {
                return Object.defineProperty(target, conf.propertyKey, {
                    value: value
                });
            });
        };
        for (var _i = 0, wantedResolves_1 = wantedResolves; _i < wantedResolves_1.length; _i++) {
            var conf = wantedResolves_1[_i];
            _loop_1(conf);
        }
        return target;
    };
    HalModelBuilder.prototype.assignContent = function (target, content) {
        if (!content)
            return target;
        for (var propKey in content) {
            Object.defineProperty(target, propKey, {
                value: content[propKey]
            });
        }
        return target;
    };
    HalModelBuilder.prototype.assignLinks = function (target, wantedLinks, content, restService) {
        if (!wantedLinks)
            return target;
        var links = content['_links'];
        if (!links)
            return target;
        for (var _i = 0, wantedLinks_1 = wantedLinks; _i < wantedLinks_1.length; _i++) {
            var conf = wantedLinks_1[_i];
            if (links[conf.relationName]) {
                var link = links[conf.relationName];
                Object.defineProperty(target, conf.propertyKey, {
                    value: restService.get(link['href'], conf.clazz)
                });
            }
        }
        return target;
    };
    HalModelBuilder.PROTOTYPE_IDENT_HAL_PROPERTIES = 'halProperties';
    HalModelBuilder.PROTOTYPE_IDENT_HAL_LINKS = 'halLinks';
    HalModelBuilder.PROTOTYPE_IDENT_HAL_RESOLVES = 'halResolves';
    HalModelBuilder.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    HalModelBuilder.ctorParameters = function () { return []; };
    return HalModelBuilder;
}());

var HalModel = /** @class */ (function () {
    function HalModel() {
    }
    return HalModel;
}());

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
        return rxjs_Observable.Observable.of(target).expand(function (obj) {
            if (propertyKeys.length == 0)
                return rxjs_Observable.Observable.empty();
            var key = propertyKeys.pop();
            var resolvedObj = undefined;
            if (key) {
                resolvedObj = obj[key];
            }
            if (obj instanceof HalModel
                && resolvedObj instanceof rxjs_Observable.Observable) {
                if (flatten === true) {
                    return resolvedObj.flatMap(function (o) {
                        if (o instanceof Array) {
                            var k_1 = propertyKeys;
                            return rxjs_Observable.Observable.from(o).flatMap(function (o) { return _this.resolveAsync(o, k_1); });
                        }
                        return rxjs_Observable.Observable.of(o);
                    });
                }
                else {
                    return resolvedObj;
                }
            }
            else {
                return rxjs_Observable.Observable.of(resolvedObj);
            }
        }).last();
    };
    HalRestService.decorators = [
        { type: _angular_core.Injectable },
    ];
    /** @nocollapse */
    HalRestService.ctorParameters = function () { return [
        { type: _angular_common_http.HttpClient, },
        { type: HalModelBuilder, },
    ]; };
    return HalRestService;
}());

var SpringHalModule = /** @class */ (function () {
    function SpringHalModule() {
    }
    SpringHalModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [_angular_common_http.HttpClientModule],
                    exports: [],
                    declarations: [],
                    providers: [HalRestService, HalModelBuilder]
                },] },
    ];
    /** @nocollapse */
    SpringHalModule.ctorParameters = function () { return []; };
    return SpringHalModule;
}());

function HalProperty(relationName) {
    return function (target, key) {
        if (!target[HalModelBuilder.PROTOTYPE_IDENT_HAL_PROPERTIES]) {
            target[HalModelBuilder.PROTOTYPE_IDENT_HAL_PROPERTIES] = new Array();
        }
        target[HalModelBuilder.PROTOTYPE_IDENT_HAL_PROPERTIES].push({
            relationName: relationName ? relationName : key,
            propertyKey: key
        });
    };
}
function HalLink(clazz, relationName) {
    return function (target, key) {
        if (!target[HalModelBuilder.PROTOTYPE_IDENT_HAL_LINKS]) {
            target[HalModelBuilder.PROTOTYPE_IDENT_HAL_LINKS] = new Array();
        }
        target[HalModelBuilder.PROTOTYPE_IDENT_HAL_LINKS].push({
            clazz: clazz,
            relationName: relationName ? relationName : key,
            propertyKey: key
        });
    };
}
function HalResolve(propertyPath) {
    return function (target, key) {
        if (!target[HalModelBuilder.PROTOTYPE_IDENT_HAL_RESOLVES]) {
            target[HalModelBuilder.PROTOTYPE_IDENT_HAL_RESOLVES] = new Array();
        }
        target[HalModelBuilder.PROTOTYPE_IDENT_HAL_RESOLVES].push({
            propertyKey: key,
            propertyPath: propertyPath
        });
    };
}

exports.SpringHalModule = SpringHalModule;
exports.HalRestService = HalRestService;
exports.HalModel = HalModel;
exports.HalLink = HalLink;
exports.HalProperty = HalProperty;
exports.HalResolve = HalResolve;

Object.defineProperty(exports, '__esModule', { value: true });

})));
