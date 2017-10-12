import { HalModelBuilder, HalLinkConfig, HalPropertyConfig, HalResolveConfig } from './hal-model-builder.service';
import { HalModel } from './hal-model';

export function HalProperty(relationName?:string) {
    return function(target:HalModel, key:string) {
        
        target.halProperties.push({
            relationName:relationName?relationName:key,
            propertyKey:key
        });
     
    }
}

export function HalLink<T extends HalModel>(clazz:{new():T},relationName?:string) {
    return function(target:HalModel, key:string) {
        
        target.halLinks.push({
            clazz:clazz,
            relationName:relationName?relationName:key,
            propertyKey:key
        });
    }
}

export function HalResolve(propertyPath:string, flatten : boolean = false) {
    return function(target:HalModel, key:string) {
        
        target.halResolves.push({
            propertyKey:key,
            propertyPath:propertyPath,
            flatten:flatten
        });
    }
}

