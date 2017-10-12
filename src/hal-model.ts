import {HalLinkConfig,HalPropertyConfig,HalResolveConfig} from './hal-model-builder.service';

export abstract class HalModel {
   
    private _plainLinks : {[name: string]: string} = {};
    private _halProperties : Array<HalPropertyConfig>;
    private _halLinks : HalLinkConfig[];
    private _halResolves : HalResolveConfig[];

    public get plainLinks() {
        return this._plainLinks;
    }

    public addPlainLinks(name: string, link : string) {
        this._plainLinks[name] = link;
    }

    public get halProperties() {
        if(!this._halProperties) this._halProperties = new Array();
        return this._halProperties;
    }

    public get halLinks() {
        if(!this._halLinks) this._halLinks = new Array();
        return this._halLinks;
    }

    public get halResolves() {
        if(!this._halResolves) this._halResolves = new Array();
        return this._halResolves;
    }
}