import { HalRestService } from './hal-rest.service';
import { HalModel } from './hal-model';
export declare class HalModelBuilder {
    static readonly PROTOTYPE_IDENT_HAL_PROPERTIES: string;
    static readonly PROTOTYPE_IDENT_HAL_LINKS: string;
    static readonly PROTOTYPE_IDENT_HAL_RESOLVES: string;
    constructor();
    build<T extends HalModel>(c: {
        new (): T;
    }, res: any, restService: HalRestService): T | T[];
    private parse<T>(c, response, restService, relationName?);
    private findRelationName(response);
    private buildObject<T>(c, content, restService);
    private assignProperties<T>(target, wantedProperties, content);
    private assignResolves<T>(target, wantedResolves, restService);
    private assignContent<T>(target, content);
    private assignLinks<T>(target, wantedLinks, content, restService);
}
export declare class HalLinkConfig {
    clazz: {
        new (): any;
    };
    relationName: string;
    propertyKey: string;
}
export declare class HalPropertyConfig {
    relationName: string;
    propertyKey: string;
}
export declare class HalResolveConfig {
    propertyPath: string;
    propertyKey: string;
}
