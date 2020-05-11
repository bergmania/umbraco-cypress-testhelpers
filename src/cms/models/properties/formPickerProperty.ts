import { BaseProperty } from './baseProperty';

export class FormPickerProperty extends BaseProperty{
    allowedFormIds: string[];
    formBuild: string;
    constructor(name: string, alias: string, allowedFormIds?: string[], formBuild?: string) {
        super(name,alias); 
        this.allowedFormIds=allowedFormIds;
        this.formBuild=formBuild;          
    }
}
         