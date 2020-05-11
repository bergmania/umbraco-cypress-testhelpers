import { FormField } from './formField';

export class ShortAnswerField extends FormField {
    
    constructor(
        public id: string, 
        public alias?: string, 
        public caption?: string, 
        public value?: string,
        public containsSensitiveData?: boolean, 
        public mandatory?: boolean,
        public requiredErrorMessage?: string, 
        public regex?: string) {
        super(containsSensitiveData,mandatory,requiredErrorMessage,regex);
        
    }
    
}