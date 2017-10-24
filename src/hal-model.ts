import {HalLinkConfig,HalPropertyConfig,HalResolveConfig} from './hal-model-builder.service';

export abstract class HalModel {

    private _plainLinks : {[name: string]: any} = {};
    private _halProperties : Array<HalPropertyConfig>;
    private _halLinks : HalLinkConfig[];
    private _halResolves : HalResolveConfig[];

    
    public addPlainLinks(name: string, link : string) {
        if(this._plainLinks[name] && !(this._plainLinks[name] instanceof Array)) {
            let tmp = this._plainLinks[name];
            this._plainLinks[name] = new Array<string>();
            this._plainLinks[name].push(link);
        } else if((this._plainLinks[name] instanceof Array)) {
            this._plainLinks[name].push(link);
        } else {
            this._plainLinks[name] = link;
        }
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

    public get plainLinks() {
        if(!this._plainLinks) this._plainLinks = new Array();
        return this._plainLinks;
    }

    public get selfHref() {
        if(this._plainLinks) {
            return this._plainLinks['_self'];
        }

        return undefined;
    }
}

export class HalPage<T extends HalModel> {
    data : T[];

    page : number = 0;
    totalElements:number = 0;
    totalPages:number = 0;
    pageSize:number = 0;

    firstLink:string = undefined;
    lastLink:string = undefined;
    nextLink:string = undefined;
    prevLink:string = undefined;

    origin:string = undefined;

    constructor(data:T[]) {
        this.data = data;
    }
}