export class BaseProperty {
    public id: string;
    public alias: string;
    public name: string;
    constructor(name: string,alias?:string) {        
        this.alias=alias;
        this.name=name;
        
    }
}