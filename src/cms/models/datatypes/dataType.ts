import faker from 'faker';
import { DataTypePrevalue } from './dataTypePrevalue';

export abstract class DataType {
  
  public action: string = 'saveNew';
  public id: number=0  ;
  public name: string = '';
  public parentId: number = -1;
  public selectedEditor: string = '';
  protected preValues: DataTypePrevalue[];
 
  public getPrevalues() {
    return this.preValues;
  }
  public abstract addPrevalues(value: any[] | any);
}
