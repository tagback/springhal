import { HalModelBuilder } from './hal-model-builder.service';
export function HalProperty(relationName) {
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
export function HalLink(clazz, relationName) {
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
export function HalResolve(propertyPath) {
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
//# sourceMappingURL=hal-property.decorator.js.map