import { HalModelBuilder, HalLinkConfig, HalPropertyConfig, HalResolveConfig } from './hal-model-builder.service';
import { HalModel } from './hal-model';

export function HalProperty(relationName?:string) {
    return function(target:any, key:string) {

        if(!target[HalModelBuilder.PROTOTYPE_IDENT_HAL_PROPERTIES]) {
            target[HalModelBuilder.PROTOTYPE_IDENT_HAL_PROPERTIES] = new Array<HalPropertyConfig>();
        }
        target[HalModelBuilder.PROTOTYPE_IDENT_HAL_PROPERTIES].push({
            relationName:relationName?relationName:key,
            propertyKey:key
        });
     
    }
}

export function HalLink<T extends HalModel>(clazz:{new():T},relationName?:string) {
    return function(target:any, key:string) {

        if(!target[HalModelBuilder.PROTOTYPE_IDENT_HAL_LINKS]) {
            target[HalModelBuilder.PROTOTYPE_IDENT_HAL_LINKS] = new Array<HalLinkConfig>();
        }
        target[HalModelBuilder.PROTOTYPE_IDENT_HAL_LINKS].push({
            clazz:clazz,
            relationName:relationName?relationName:key,
            propertyKey:key
        });
    }
}

export function HalResolve<T extends HalModel>(propertyPath:string) {
    return function(target:any, key:string) {

        if(!target[HalModelBuilder.PROTOTYPE_IDENT_HAL_RESOLVES]) {
            target[HalModelBuilder.PROTOTYPE_IDENT_HAL_RESOLVES] = new Array<HalResolveConfig>();
        }
        target[HalModelBuilder.PROTOTYPE_IDENT_HAL_RESOLVES].push({
            propertyKey:key,
            propertyPath:propertyPath
        });
    }
}

