import {FormFieldBuilderBase} from './formFieldBuilderBase';

export  class DropDownFieldBuilder  extends FormFieldBuilderBase {
  fieldTypeId = '0dd29d42-a6a5-11de-a2f2-222256d89593';
  removePrevalueEditor = true;
  prevalueSourceId : string = '';
  parentBuilder;
  formFieldBuilderBase: FormFieldBuilderBase; 
  
  withPrevalueSourceId(value: string) {    
    this.prevalueSourceId = value;
    return this;
  }

  withPrevalues(values: string[]) {    
    this.preValues = values
    return this;
  }  
  build(){
    var baseBuild=super.build();    
    baseBuild['prevalueSourceId']=this.prevalueSourceId;        
    return baseBuild;
  }
}