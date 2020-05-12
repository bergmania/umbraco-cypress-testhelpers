import { FormField } from './formField';

export class DropDownField extends FormField {
    
    constructor(
        public id: string, 
        public alias?: string, 
        public caption?: string, 
        public value?: string,
        public containsSensitiveData?: boolean, 
        public mandatory?: boolean,
        public requiredErrorMessage?: string, 
        public regex?: string,
        public prevalueSourceId?: string,
        public preValues?: string[]
        ) {
        super(containsSensitiveData,mandatory,requiredErrorMessage,regex);
        
    }
    
}