(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/common/http"), require("rxjs/Observable"), require("rxjs/add/operator/map"), require("rxjs/add/operator/mergeMap"), require("rxjs/add/operator/expand"), require("rxjs/add/operator/last"), require("rxjs/add/observable/of"), require("rxjs/add/observable/empty"), require("rxjs/add/observable/from"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/common/http", "rxjs/Observable", "rxjs/add/operator/map", "rxjs/add/operator/mergeMap", "rxjs/add/operator/expand", "rxjs/add/operator/last", "rxjs/add/observable/of", "rxjs/add/observable/empty", "rxjs/add/observable/from"], factory);
	else if(typeof exports === 'object')
		exports["springhal"] = factory(require("@angular/core"), require("@angular/common/http"), require("rxjs/Observable"), require("rxjs/add/operator/map"), require("rxjs/add/operator/mergeMap"), require("rxjs/add/operator/expand"), require("rxjs/add/operator/last"), require("rxjs/add/observable/of"), require("rxjs/add/observable/empty"), require("rxjs/add/observable/from"));
	else
		root["springhal"] = factory(root["@angular/core"], root["@angular/common/http"], root["rxjs/Observable"], root["rxjs/add/operator/map"], root["rxjs/add/operator/mergeMap"], root["rxjs/add/operator/expand"], root["rxjs/add/operator/last"], root["rxjs/add/observable/of"], root["rxjs/add/observable/empty"], root["rxjs/add/observable/from"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var HalModelBuilder = /** @class */ (function () {
    function HalModelBuilder() {
    }
    HalModelBuilder_1 = HalModelBuilder;
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
        var wantedProperties = instance[HalModelBuilder_1.PROTOTYPE_IDENT_HAL_PROPERTIES];
        var wantedLinks = instance[HalModelBuilder_1.PROTOTYPE_IDENT_HAL_LINKS];
        var wantedResolves = instance[HalModelBuilder_1.PROTOTYPE_IDENT_HAL_RESOLVES];
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
    HalModelBuilder = HalModelBuilder_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], HalModelBuilder);
    return HalModelBuilder;
    var HalModelBuilder_1;
}());
exports.HalModelBuilder = HalModelBuilder;
var HalLinkConfig = /** @class */ (function () {
    function HalLinkConfig() {
    }
    return HalLinkConfig;
}());
exports.HalLinkConfig = HalLinkConfig;
var HalPropertyConfig = /** @class */ (function () {
    function HalPropertyConfig() {
    }
    return HalPropertyConfig;
}());
exports.HalPropertyConfig = HalPropertyConfig;
var HalResolveConfig = /** @class */ (function () {
    function HalResolveConfig() {
    }
    return HalResolveConfig;
}());
exports.HalResolveConfig = HalResolveConfig;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __webpack_require__(2);
var core_1 = __webpack_require__(0);
var hal_model_builder_service_1 = __webpack_require__(1);
var hal_model_1 = __webpack_require__(4);
var Observable_1 = __webpack_require__(7);
__webpack_require__(8);
__webpack_require__(9);
__webpack_require__(10);
__webpack_require__(11);
__webpack_require__(12);
__webpack_require__(13);
__webpack_require__(14);
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
        return Observable_1.Observable.of(target).expand(function (obj) {
            if (propertyKeys.length == 0)
                return Observable_1.Observable.empty();
            var key = propertyKeys.pop();
            var resolvedObj = undefined;
            if (key) {
                resolvedObj = obj[key];
            }
            if (obj instanceof hal_model_1.HalModel
                && resolvedObj instanceof Observable_1.Observable) {
                if (flatten === true) {
                    return resolvedObj.flatMap(function (o) {
                        if (o instanceof Array) {
                            var k_1 = propertyKeys;
                            return Observable_1.Observable.from(o).flatMap(function (o) { return _this.resolveAsync(o, k_1); });
                        }
                        return Observable_1.Observable.of(o);
                    });
                }
                else {
                    return resolvedObj;
                }
            }
            else {
                return Observable_1.Observable.of(resolvedObj);
            }
        }).last();
    };
    HalRestService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient,
            hal_model_builder_service_1.HalModelBuilder])
    ], HalRestService);
    return HalRestService;
}());
exports.HalRestService = HalRestService;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HalModel = /** @class */ (function () {
    function HalModel() {
    }
    return HalModel;
}());
exports.HalModel = HalModel;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var spring_hal_module_1 = __webpack_require__(6);
exports.SpringHalModule = spring_hal_module_1.SpringHalModule;
var hal_rest_service_1 = __webpack_require__(3);
exports.HalRestService = hal_rest_service_1.HalRestService;
var hal_model_1 = __webpack_require__(4);
exports.HalModel = hal_model_1.HalModel;
var hal_property_decorator_1 = __webpack_require__(15);
exports.HalLink = hal_property_decorator_1.HalLink;
exports.HalProperty = hal_property_decorator_1.HalProperty;
exports.HalResolve = hal_property_decorator_1.HalResolve;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var http_1 = __webpack_require__(2);
var hal_rest_service_1 = __webpack_require__(3);
var hal_model_builder_service_1 = __webpack_require__(1);
var SpringHalModule = /** @class */ (function () {
    function SpringHalModule() {
    }
    SpringHalModule = __decorate([
        core_1.NgModule({
            imports: [http_1.HttpClientModule],
            exports: [],
            declarations: [],
            providers: [hal_rest_service_1.HalRestService, hal_model_builder_service_1.HalModelBuilder]
        })
    ], SpringHalModule);
    return SpringHalModule;
}());
exports.SpringHalModule = SpringHalModule;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hal_model_builder_service_1 = __webpack_require__(1);
function HalProperty(relationName) {
    return function (target, key) {
        if (!target[hal_model_builder_service_1.HalModelBuilder.PROTOTYPE_IDENT_HAL_PROPERTIES]) {
            target[hal_model_builder_service_1.HalModelBuilder.PROTOTYPE_IDENT_HAL_PROPERTIES] = new Array();
        }
        target[hal_model_builder_service_1.HalModelBuilder.PROTOTYPE_IDENT_HAL_PROPERTIES].push({
            relationName: relationName ? relationName : key,
            propertyKey: key
        });
    };
}
exports.HalProperty = HalProperty;
function HalLink(clazz, relationName) {
    return function (target, key) {
        if (!target[hal_model_builder_service_1.HalModelBuilder.PROTOTYPE_IDENT_HAL_LINKS]) {
            target[hal_model_builder_service_1.HalModelBuilder.PROTOTYPE_IDENT_HAL_LINKS] = new Array();
        }
        target[hal_model_builder_service_1.HalModelBuilder.PROTOTYPE_IDENT_HAL_LINKS].push({
            clazz: clazz,
            relationName: relationName ? relationName : key,
            propertyKey: key
        });
    };
}
exports.HalLink = HalLink;
function HalResolve(propertyPath) {
    return function (target, key) {
        if (!target[hal_model_builder_service_1.HalModelBuilder.PROTOTYPE_IDENT_HAL_RESOLVES]) {
            target[hal_model_builder_service_1.HalModelBuilder.PROTOTYPE_IDENT_HAL_RESOLVES] = new Array();
        }
        target[hal_model_builder_service_1.HalModelBuilder.PROTOTYPE_IDENT_HAL_RESOLVES].push({
            propertyKey: key,
            propertyPath: propertyPath
        });
    };
}
exports.HalResolve = HalResolve;


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2ZmM1NDc1ZDYyNTYxNjg0ZGUxMCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAYW5ndWxhci9jb3JlXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hhbC1tb2RlbC1idWlsZGVyLnNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIiIsIndlYnBhY2s6Ly8vLi9zcmMvaGFsLXJlc3Quc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaGFsLW1vZGVsLnRzIiwid2VicGFjazovLy8uL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zcHJpbmctaGFsLm1vZHVsZS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyeGpzL09ic2VydmFibGVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyeGpzL2FkZC9vcGVyYXRvci9tZXJnZU1hcFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJ4anMvYWRkL29wZXJhdG9yL2V4cGFuZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJ4anMvYWRkL29wZXJhdG9yL2xhc3RcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyeGpzL2FkZC9vYnNlcnZhYmxlL29mXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicnhqcy9hZGQvb2JzZXJ2YWJsZS9lbXB0eVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInJ4anMvYWRkL29ic2VydmFibGUvZnJvbVwiIiwid2VicGFjazovLy8uL3NyYy9oYWwtcHJvcGVydHkuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QyxDQUFDLENBQUMsQ0FBQztZQUNwRCxNQUFNLENBQUMsMkNBQWUsQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLElBQUksS0FBSyxFQUFpQixDQUFDO1FBQ25GLENBQUM7UUFDRCxNQUFNLENBQUMsMkNBQWUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuRCxLQUFLLEVBQUMsS0FBSztZQUNYLFlBQVksRUFBQyxZQUFZLEVBQUMsYUFBWSxFQUFDLElBQUc7WUFDMUMsV0FBVyxFQUFDLEdBQUc7U0FDbEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztBQUNMLENBQUM7QUFaRCwwQkFZQztBQUVELG9CQUEyQixZQUFtQjtJQUMxQyxNQUFNLENBQUMsVUFBUyxNQUFVLEVBQUUsR0FBVTtRQUVsQyxFQUFFLEVBQUMsQ0FBQyxNQUFNLENBQUMsMkNBQWUsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RCxNQUFNLENBQUMsMkNBQWUsQ0FBQyw0QkFBNEIsQ0FBQyxHQUFHLElBQUksS0FBSyxFQUFvQixDQUFDO1FBQ3pGLENBQUM7UUFDRCxNQUFNLENBQUMsMkNBQWUsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN0RCxXQUFXLEVBQUMsR0FBRztZQUNmLFlBQVksRUFBQyxZQUFZO1NBQzVCLENBQUMsQ0FBQztJQUNQLENBQUM7QUFDTCxDQUFDO0FBWEQsZ0NBV0MiLCJmaWxlIjoic3ByaW5naGFsLnVtZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcIkBhbmd1bGFyL2NvcmVcIiksIHJlcXVpcmUoXCJAYW5ndWxhci9jb21tb24vaHR0cFwiKSwgcmVxdWlyZShcInJ4anMvT2JzZXJ2YWJsZVwiKSwgcmVxdWlyZShcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiKSwgcmVxdWlyZShcInJ4anMvYWRkL29wZXJhdG9yL21lcmdlTWFwXCIpLCByZXF1aXJlKFwicnhqcy9hZGQvb3BlcmF0b3IvZXhwYW5kXCIpLCByZXF1aXJlKFwicnhqcy9hZGQvb3BlcmF0b3IvbGFzdFwiKSwgcmVxdWlyZShcInJ4anMvYWRkL29ic2VydmFibGUvb2ZcIiksIHJlcXVpcmUoXCJyeGpzL2FkZC9vYnNlcnZhYmxlL2VtcHR5XCIpLCByZXF1aXJlKFwicnhqcy9hZGQvb2JzZXJ2YWJsZS9mcm9tXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcIkBhbmd1bGFyL2NvcmVcIiwgXCJAYW5ndWxhci9jb21tb24vaHR0cFwiLCBcInJ4anMvT2JzZXJ2YWJsZVwiLCBcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiLCBcInJ4anMvYWRkL29wZXJhdG9yL21lcmdlTWFwXCIsIFwicnhqcy9hZGQvb3BlcmF0b3IvZXhwYW5kXCIsIFwicnhqcy9hZGQvb3BlcmF0b3IvbGFzdFwiLCBcInJ4anMvYWRkL29ic2VydmFibGUvb2ZcIiwgXCJyeGpzL2FkZC9vYnNlcnZhYmxlL2VtcHR5XCIsIFwicnhqcy9hZGQvb2JzZXJ2YWJsZS9mcm9tXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInNwcmluZ2hhbFwiXSA9IGZhY3RvcnkocmVxdWlyZShcIkBhbmd1bGFyL2NvcmVcIiksIHJlcXVpcmUoXCJAYW5ndWxhci9jb21tb24vaHR0cFwiKSwgcmVxdWlyZShcInJ4anMvT2JzZXJ2YWJsZVwiKSwgcmVxdWlyZShcInJ4anMvYWRkL29wZXJhdG9yL21hcFwiKSwgcmVxdWlyZShcInJ4anMvYWRkL29wZXJhdG9yL21lcmdlTWFwXCIpLCByZXF1aXJlKFwicnhqcy9hZGQvb3BlcmF0b3IvZXhwYW5kXCIpLCByZXF1aXJlKFwicnhqcy9hZGQvb3BlcmF0b3IvbGFzdFwiKSwgcmVxdWlyZShcInJ4anMvYWRkL29ic2VydmFibGUvb2ZcIiksIHJlcXVpcmUoXCJyeGpzL2FkZC9vYnNlcnZhYmxlL2VtcHR5XCIpLCByZXF1aXJlKFwicnhqcy9hZGQvb2JzZXJ2YWJsZS9mcm9tXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJzcHJpbmdoYWxcIl0gPSBmYWN0b3J5KHJvb3RbXCJAYW5ndWxhci9jb3JlXCJdLCByb290W1wiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIl0sIHJvb3RbXCJyeGpzL09ic2VydmFibGVcIl0sIHJvb3RbXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIl0sIHJvb3RbXCJyeGpzL2FkZC9vcGVyYXRvci9tZXJnZU1hcFwiXSwgcm9vdFtcInJ4anMvYWRkL29wZXJhdG9yL2V4cGFuZFwiXSwgcm9vdFtcInJ4anMvYWRkL29wZXJhdG9yL2xhc3RcIl0sIHJvb3RbXCJyeGpzL2FkZC9vYnNlcnZhYmxlL29mXCJdLCByb290W1wicnhqcy9hZGQvb2JzZXJ2YWJsZS9lbXB0eVwiXSwgcm9vdFtcInJ4anMvYWRkL29ic2VydmFibGUvZnJvbVwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzBfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzhfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV85X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTBfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzEyX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTNfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNF9fKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2ZmM1NDc1ZDYyNTYxNjg0ZGUxMCIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8wX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJAYW5ndWxhci9jb3JlXCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBIYWxSZXN0U2VydmljZSB9IGZyb20gJy4vaGFsLXJlc3Quc2VydmljZSdcclxuaW1wb3J0IHsgSGFsTW9kZWwgfSBmcm9tICcuL2hhbC1tb2RlbCdcclxuXHJcblxyXG5cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEhhbE1vZGVsQnVpbGRlciB7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBQUk9UT1RZUEVfSURFTlRfSEFMX1BST1BFUlRJRVMgPSAnaGFsUHJvcGVydGllcyc7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFBST1RPVFlQRV9JREVOVF9IQUxfTElOS1MgPSAnaGFsTGlua3MnO1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBQUk9UT1RZUEVfSURFTlRfSEFMX1JFU09MVkVTID0gJ2hhbFJlc29sdmVzJztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe31cclxuXHJcbiAgICBwdWJsaWMgYnVpbGQ8VCBleHRlbmRzIEhhbE1vZGVsPihjIDoge25ldygpIDogVH0sIHJlcyA6IGFueSwgcmVzdFNlcnZpY2UgOiBIYWxSZXN0U2VydmljZSApIDogVCB8IFRbXXtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZTxUPihjLCByZXMsIHJlc3RTZXJ2aWNlKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBwYXJzZTxUPihjIDoge25ldygpIDogVH0sIHJlc3BvbnNlOmFueSwgcmVzdFNlcnZpY2UgOiBIYWxSZXN0U2VydmljZSwgcmVsYXRpb25OYW1lPzpzdHJpbmcpIDogVCB8IFRbXXtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQVNTSUdOOlwiLCByZXNwb25zZSk7XHJcblxyXG4gICAgICAgIGlmKHJlc3BvbnNlWydfZW1iZWRkZWQnXSkge1xyXG5cclxuICAgICAgICAgICAgcmVsYXRpb25OYW1lID0gcmVsYXRpb25OYW1lP3JlbGF0aW9uTmFtZTp0aGlzLmZpbmRSZWxhdGlvbk5hbWUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBsZXQgY29udGVudEFycmF5ID0gcmVzcG9uc2VbJ19lbWJlZGRlZCddW3JlbGF0aW9uTmFtZV07XHJcbiAgICAgICAgICAgIGlmKGNvbnRlbnRBcnJheSAmJiBjb250ZW50QXJyYXkgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBuZXcgQXJyYXk8VD4oKTtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgb2JqZWN0Q29udGVudCBvZiBjb250ZW50QXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LnB1c2godGhpcy5idWlsZE9iamVjdDxUPihjLCBvYmplY3RDb250ZW50LCByZXN0U2VydmljZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiQ2FuJ3QgcGFyc2UgYXJyYXkgcmVzdWx0OiBcIiwgcmVzcG9uc2VbJ19lbWJlZGRlZCddLCByZWxhdGlvbk5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmJ1aWxkT2JqZWN0PFQ+KGMsIHJlc3BvbnNlLCByZXN0U2VydmljZSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaW5kUmVsYXRpb25OYW1lKHJlc3BvbnNlIDogYW55KSA6c3RyaW5nIHtcclxuICAgICAgICBpZighcmVzcG9uc2VbJ19lbWJlZGRlZCddKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gcmVzcG9uc2VbJ19lbWJlZGRlZCddKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBrZXk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidWlsZE9iamVjdDxUIGV4dGVuZHMgYW55PihjOntuZXcoKTpUfSwgY29udGVudDphbnksIHJlc3RTZXJ2aWNlIDogSGFsUmVzdFNlcnZpY2UpIDogVCB7XHJcbiAgICAgICAgbGV0IGluc3RhbmNlID0gbmV3IGMoKTtcclxuICAgICAgICBsZXQgd2FudGVkUHJvcGVydGllcyA9IGluc3RhbmNlW0hhbE1vZGVsQnVpbGRlci5QUk9UT1RZUEVfSURFTlRfSEFMX1BST1BFUlRJRVNdO1xyXG4gICAgICAgIGxldCB3YW50ZWRMaW5rcyA9IGluc3RhbmNlW0hhbE1vZGVsQnVpbGRlci5QUk9UT1RZUEVfSURFTlRfSEFMX0xJTktTXTtcclxuICAgICAgICBsZXQgd2FudGVkUmVzb2x2ZXMgPSBpbnN0YW5jZVtIYWxNb2RlbEJ1aWxkZXIuUFJPVE9UWVBFX0lERU5UX0hBTF9SRVNPTFZFU107XHJcblxyXG4gICAgICAgIGluc3RhbmNlID0gdGhpcy5hc3NpZ25Qcm9wZXJ0aWVzKGluc3RhbmNlLCB3YW50ZWRQcm9wZXJ0aWVzLCBjb250ZW50KTtcclxuICAgICAgICBpbnN0YW5jZSA9IHRoaXMuYXNzaWduTGlua3MoaW5zdGFuY2UsIHdhbnRlZExpbmtzLCBjb250ZW50LCByZXN0U2VydmljZSk7XHJcbiAgICAgICAgaW5zdGFuY2UgPSB0aGlzLmFzc2lnbkNvbnRlbnQoaW5zdGFuY2UsIGNvbnRlbnRbJ2NvbnRlbnQnXSk7XHJcbiAgICAgICAgaW5zdGFuY2UgPSB0aGlzLmFzc2lnblJlc29sdmVzKGluc3RhbmNlLCB3YW50ZWRSZXNvbHZlcywgcmVzdFNlcnZpY2UpO1xyXG5cclxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3NpZ25Qcm9wZXJ0aWVzPFQ+KHRhcmdldDpULCB3YW50ZWRQcm9wZXJ0aWVzOkhhbFByb3BlcnR5Q29uZmlnW10sIGNvbnRlbnQ6YW55KSA6IFQge1xyXG4gICAgICAgIGlmKCF3YW50ZWRQcm9wZXJ0aWVzKSByZXR1cm4gdGFyZ2V0O1xyXG4gICAgICAgIGZvcihsZXQgY29uZiBvZiB3YW50ZWRQcm9wZXJ0aWVzKSB7ICAgXHJcbiAgICAgICAgICAgIGlmKGNvbnRlbnRbY29uZi5yZWxhdGlvbk5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LGNvbmYucHJvcGVydHlLZXkse1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOmNvbnRlbnRbY29uZi5yZWxhdGlvbk5hbWVdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzc2lnblJlc29sdmVzPFQ+KHRhcmdldDpULCB3YW50ZWRSZXNvbHZlczpIYWxSZXNvbHZlQ29uZmlnW10sIHJlc3RTZXJ2aWNlIDogSGFsUmVzdFNlcnZpY2UpIDogVCB7XHJcbiAgICAgICAgaWYoIXdhbnRlZFJlc29sdmVzKSByZXR1cm4gdGFyZ2V0O1xyXG4gICAgICAgIGZvcihsZXQgY29uZiBvZiB3YW50ZWRSZXNvbHZlcykge1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICByZXN0U2VydmljZS5yZXNvbHZlQXN5bmNQYXRoKHRhcmdldCwgY29uZi5wcm9wZXJ0eVBhdGgpXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LGNvbmYucHJvcGVydHlLZXkse1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6dmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXNzaWduQ29udGVudDxUPih0YXJnZXQ6VCwgY29udGVudDphbnkpIDogVCB7XHJcbiAgICAgICAgaWYoIWNvbnRlbnQpIHJldHVybiB0YXJnZXQ7XHJcblxyXG4gICAgICAgIGZvcihsZXQgcHJvcEtleSBpbiBjb250ZW50KSB7ICAgXHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQscHJvcEtleSx7XHJcbiAgICAgICAgICAgICAgIHZhbHVlOmNvbnRlbnRbcHJvcEtleV1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXNzaWduTGlua3M8VD4odGFyZ2V0OlQsIHdhbnRlZExpbmtzOkhhbExpbmtDb25maWdbXSwgY29udGVudDphbnksIHJlc3RTZXJ2aWNlIDogSGFsUmVzdFNlcnZpY2UpIDogVCB7XHJcbiAgICAgICAgaWYoIXdhbnRlZExpbmtzKSByZXR1cm4gdGFyZ2V0O1xyXG5cclxuICAgICAgICBsZXQgbGlua3MgPSBjb250ZW50WydfbGlua3MnXTtcclxuICAgICAgICBpZighbGlua3MpIHJldHVybiB0YXJnZXQ7XHJcblxyXG4gICAgICAgIGZvcihsZXQgY29uZiBvZiB3YW50ZWRMaW5rcykgeyAgIFxyXG5cclxuICAgICAgICAgICAgaWYobGlua3NbY29uZi5yZWxhdGlvbk5hbWVdKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGluayA9IGxpbmtzW2NvbmYucmVsYXRpb25OYW1lXTtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsY29uZi5wcm9wZXJ0eUtleSx7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6cmVzdFNlcnZpY2UuZ2V0PGFueT4obGlua1snaHJlZiddLGNvbmYuY2xhenopXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGFsTGlua0NvbmZpZyB7XHJcbiAgICBjbGF6ejp7bmV3KCk6YW55fTtcclxuICAgIHJlbGF0aW9uTmFtZTpzdHJpbmc7XHJcbiAgICBwcm9wZXJ0eUtleTpzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBIYWxQcm9wZXJ0eUNvbmZpZyB7XHJcbiAgICByZWxhdGlvbk5hbWU6c3RyaW5nO1xyXG4gICAgcHJvcGVydHlLZXk6c3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSGFsUmVzb2x2ZUNvbmZpZyB7XHJcbiAgICBwcm9wZXJ0eVBhdGg6c3RyaW5nO1xyXG4gICAgcHJvcGVydHlLZXk6c3RyaW5nO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2hhbC1tb2RlbC1idWlsZGVyLnNlcnZpY2UudHMiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIlxuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBIYWxNb2RlbEJ1aWxkZXIgfSBmcm9tICcuL2hhbC1tb2RlbC1idWlsZGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBIYWxNb2RlbCB9IGZyb20gJy4vaGFsLW1vZGVsJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21hcCc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWVyZ2VNYXAnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2V4cGFuZCc7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbGFzdCc7XHJcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9vZic7XHJcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9lbXB0eSc7XHJcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9mcm9tJ1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgSGFsUmVzdFNlcnZpY2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHBDbGllbnQ6IEh0dHBDbGllbnQsXHJcbiAgICAgICAgcHJpdmF0ZSBfbW9kZWxCdWlsZGVyOiBIYWxNb2RlbEJ1aWxkZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0PFQgZXh0ZW5kcyBIYWxNb2RlbD4odXJpOiBzdHJpbmcsIGM6IHsgbmV3KCk6IFQgfSk6IE9ic2VydmFibGU8VCB8IFRbXT4ge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cENsaWVudC5nZXQ8T2JqZWN0Pih1cmkpXHJcbiAgICAgICAgICAgIC5tYXAocmVzID0+IHRoaXMuX21vZGVsQnVpbGRlci5idWlsZChjLCByZXMsIHRoaXMpKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNvbHZlQXN5bmNQYXRoKHRhcmdldDogSGFsTW9kZWwsIHByb3BlcnR5UGF0aDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXNvbHZlQXN5bmModGFyZ2V0LCBwcm9wZXJ0eVBhdGguc3BsaXQoJy4nKSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzb2x2ZUFzeW5jKHRhcmdldDogSGFsTW9kZWwsIHByb3BlcnR5S2V5czogc3RyaW5nW10sIGZsYXR0ZW46IGJvb2xlYW4gPSBmYWxzZSk6IE9ic2VydmFibGU8YW55PiB7XHJcblxyXG4gICAgICAgIHByb3BlcnR5S2V5cyA9IHByb3BlcnR5S2V5cy5yZXZlcnNlKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLm9mKHRhcmdldCkuZXhwYW5kKChvYmo6YW55KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAocHJvcGVydHlLZXlzLmxlbmd0aCA9PSAwKSByZXR1cm4gT2JzZXJ2YWJsZS5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGtleSA9IHByb3BlcnR5S2V5cy5wb3AoKTtcclxuICAgICAgICAgICAgbGV0IHJlc29sdmVkT2JqID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBpZihrZXkpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmVkT2JqID0gb2JqW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBIYWxNb2RlbFxyXG4gICAgICAgICAgICAgICAgJiYgcmVzb2x2ZWRPYmogaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGZsYXR0ZW4gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZWRPYmouZmxhdE1hcCgobzphbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG8gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGsgPSBwcm9wZXJ0eUtleXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5mcm9tKG8pLmZsYXRNYXAoKG86YW55KSA9PiB0aGlzLnJlc29sdmVBc3luYyhvLCBrKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2Yobyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlZE9iajtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihyZXNvbHZlZE9iaik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSkubGFzdCgpO1xyXG5cclxuXHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9oYWwtcmVzdC5zZXJ2aWNlLnRzIiwiZXhwb3J0IGNsYXNzIEhhbE1vZGVsIHtcclxuICAgXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9oYWwtbW9kZWwudHMiLCJleHBvcnQgeyBTcHJpbmdIYWxNb2R1bGUgfSBmcm9tICcuL3NyYy9zcHJpbmctaGFsLm1vZHVsZSc7XHJcbmV4cG9ydCB7IEhhbFJlc3RTZXJ2aWNlIH0gZnJvbSAnLi9zcmMvaGFsLXJlc3Quc2VydmljZSc7XHJcbmV4cG9ydCB7IEhhbE1vZGVsIH0gZnJvbSAnLi9zcmMvaGFsLW1vZGVsJztcclxuZXhwb3J0IHsgSGFsTGluaywgSGFsUHJvcGVydHksIEhhbFJlc29sdmUgfSBmcm9tICcuL3NyYy9oYWwtcHJvcGVydHkuZGVjb3JhdG9yJztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL2luZGV4LnRzIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuXHJcbmltcG9ydCB7IEhhbFJlc3RTZXJ2aWNlIH0gZnJvbSAnLi9oYWwtcmVzdC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSGFsTW9kZWxCdWlsZGVyIH0gZnJvbSAnLi9oYWwtbW9kZWwtYnVpbGRlci5zZXJ2aWNlJztcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0h0dHBDbGllbnRNb2R1bGVdLFxyXG4gICAgZXhwb3J0czogW10sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtdLFxyXG4gICAgcHJvdmlkZXJzOiBbSGFsUmVzdFNlcnZpY2UsIEhhbE1vZGVsQnVpbGRlcl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNwcmluZ0hhbE1vZHVsZSB7IH1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9zcHJpbmctaGFsLm1vZHVsZS50cyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyeGpzL09ic2VydmFibGVcIlxuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOF9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCJcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJ4anMvYWRkL29wZXJhdG9yL21lcmdlTWFwXCJcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzEwX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyeGpzL2FkZC9vcGVyYXRvci9leHBhbmRcIlxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzExX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyeGpzL2FkZC9vcGVyYXRvci9sYXN0XCJcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xMl9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicnhqcy9hZGQvb2JzZXJ2YWJsZS9vZlwiXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTNfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJ4anMvYWRkL29ic2VydmFibGUvZW1wdHlcIlxuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE0X187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyeGpzL2FkZC9vYnNlcnZhYmxlL2Zyb21cIlxuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgSGFsTW9kZWxCdWlsZGVyLCBIYWxMaW5rQ29uZmlnLCBIYWxQcm9wZXJ0eUNvbmZpZywgSGFsUmVzb2x2ZUNvbmZpZyB9IGZyb20gJy4vaGFsLW1vZGVsLWJ1aWxkZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IEhhbE1vZGVsIH0gZnJvbSAnLi9oYWwtbW9kZWwnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEhhbFByb3BlcnR5KHJlbGF0aW9uTmFtZT86c3RyaW5nKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24odGFyZ2V0OmFueSwga2V5OnN0cmluZykge1xyXG5cclxuICAgICAgICBpZighdGFyZ2V0W0hhbE1vZGVsQnVpbGRlci5QUk9UT1RZUEVfSURFTlRfSEFMX1BST1BFUlRJRVNdKSB7XHJcbiAgICAgICAgICAgIHRhcmdldFtIYWxNb2RlbEJ1aWxkZXIuUFJPVE9UWVBFX0lERU5UX0hBTF9QUk9QRVJUSUVTXSA9IG5ldyBBcnJheTxIYWxQcm9wZXJ0eUNvbmZpZz4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGFyZ2V0W0hhbE1vZGVsQnVpbGRlci5QUk9UT1RZUEVfSURFTlRfSEFMX1BST1BFUlRJRVNdLnB1c2goe1xyXG4gICAgICAgICAgICByZWxhdGlvbk5hbWU6cmVsYXRpb25OYW1lP3JlbGF0aW9uTmFtZTprZXksXHJcbiAgICAgICAgICAgIHByb3BlcnR5S2V5OmtleVxyXG4gICAgICAgIH0pO1xyXG4gICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gSGFsTGluazxUIGV4dGVuZHMgSGFsTW9kZWw+KGNsYXp6OntuZXcoKTpUfSxyZWxhdGlvbk5hbWU/OnN0cmluZykge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHRhcmdldDphbnksIGtleTpzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgaWYoIXRhcmdldFtIYWxNb2RlbEJ1aWxkZXIuUFJPVE9UWVBFX0lERU5UX0hBTF9MSU5LU10pIHtcclxuICAgICAgICAgICAgdGFyZ2V0W0hhbE1vZGVsQnVpbGRlci5QUk9UT1RZUEVfSURFTlRfSEFMX0xJTktTXSA9IG5ldyBBcnJheTxIYWxMaW5rQ29uZmlnPigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YXJnZXRbSGFsTW9kZWxCdWlsZGVyLlBST1RPVFlQRV9JREVOVF9IQUxfTElOS1NdLnB1c2goe1xyXG4gICAgICAgICAgICBjbGF6ejpjbGF6eixcclxuICAgICAgICAgICAgcmVsYXRpb25OYW1lOnJlbGF0aW9uTmFtZT9yZWxhdGlvbk5hbWU6a2V5LFxyXG4gICAgICAgICAgICBwcm9wZXJ0eUtleTprZXlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEhhbFJlc29sdmUocHJvcGVydHlQYXRoOnN0cmluZykge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHRhcmdldDphbnksIGtleTpzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgaWYoIXRhcmdldFtIYWxNb2RlbEJ1aWxkZXIuUFJPVE9UWVBFX0lERU5UX0hBTF9SRVNPTFZFU10pIHtcclxuICAgICAgICAgICAgdGFyZ2V0W0hhbE1vZGVsQnVpbGRlci5QUk9UT1RZUEVfSURFTlRfSEFMX1JFU09MVkVTXSA9IG5ldyBBcnJheTxIYWxSZXNvbHZlQ29uZmlnPigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YXJnZXRbSGFsTW9kZWxCdWlsZGVyLlBST1RPVFlQRV9JREVOVF9IQUxfUkVTT0xWRVNdLnB1c2goe1xyXG4gICAgICAgICAgICBwcm9wZXJ0eUtleTprZXksXHJcbiAgICAgICAgICAgIHByb3BlcnR5UGF0aDpwcm9wZXJ0eVBhdGhcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvaGFsLXByb3BlcnR5LmRlY29yYXRvci50cyJdLCJzb3VyY2VSb290IjoiIn0=