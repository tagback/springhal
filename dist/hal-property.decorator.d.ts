import { HalModel } from './hal-model';
export declare function HalProperty(relationName?: string): (target: any, key: string) => void;
export declare function HalLink<T extends HalModel>(clazz: {
    new (): T;
}, relationName?: string): (target: any, key: string) => void;
export declare function HalResolve<T extends HalModel>(propertyPath: string): (target: any, key: string) => void;
