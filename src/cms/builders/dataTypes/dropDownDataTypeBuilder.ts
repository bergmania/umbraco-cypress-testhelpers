import { DataTypeBuilder } from './dataTypeBuilder';
import { DropDownDataType } from '../../models/datatypes/dropDownDataType';

export class DropDownDataTypeBuilder extends DataTypeBuilder {
  constructor(private dropDownDataType: DropDownDataType = new DropDownDataType()) {
    super(dropDownDataType);    
  }
  withPrevalues(value: string[],multiSelect: boolean = false) {
    this.dropDownDataType.addPrevalues(value,multiSelect);
    return this;
  }
}
