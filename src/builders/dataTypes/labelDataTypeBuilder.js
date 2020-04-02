import faker from 'faker'
import DataTypeBuilderBase from "./dataTypeBuilderBase";

export default class LabelDataTypeBuilder extends DataTypeBuilderBase{


  constructor() {
    super();
    this.withStringValueType();
    this.selectedEditor = "Umbraco.Label";
  }

  withStringValueType(){
    return this.withValueType('STRING');
  }

  withDecimalValueType(){
    return this.withValueType('DECIMAL');
  }

  withDateTimeValueType(){
    return this.withValueType('DATETIME');
  }

  withTimeValueType(){
    return this.withValueType('TIME');
  }

  withIntegerValueType(){
    return this.withValueType('INT');
  }

  withBigIntegerValueType(){
    return this.withValueType('BIGINT');
  }

  withLongStringValueType(){
    return this.withValueType('TEXT');
  }

  withValueType(type){
    this.preValues = [{key: 'umbracoDataValueType', value: type}];
    return this;
  }
}
