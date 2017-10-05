import { Injectable } from '@angular/core';
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
        { type: Injectable },
    ];
    /** @nocollapse */
    HalModelBuilder.ctorParameters = function () { return []; };
    return HalModelBuilder;
}());
export { HalModelBuilder };
var HalLinkConfig = /** @class */ (function () {
    function HalLinkConfig() {
    }
    return HalLinkConfig;
}());
export { HalLinkConfig };
var HalPropertyConfig = /** @class */ (function () {
    function HalPropertyConfig() {
    }
    return HalPropertyConfig;
}());
export { HalPropertyConfig };
var HalResolveConfig = /** @class */ (function () {
    function HalResolveConfig() {
    }
    return HalResolveConfig;
}());
export { HalResolveConfig };
//# sourceMappingURL=hal-model-builder.service.js.map