export class FormField{
   
    
    constructor(
        public containsSensitiveData?: boolean, 
        public mandatory?: boolean,
        public requiredErrorMessage?: string, 
        public regex?: string) {
            containsSensitiveData ?? false;
            mandatory ?? false;
            requiredErrorMessage ?? '';
            regex ?? '';
    }
}