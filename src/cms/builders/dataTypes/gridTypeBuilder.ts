import { DataTypeBuilder } from './dataTypeBuilder';
import { GridDataType } from '../../models/dataTypes/gridDataType';

export class GridDataTypeBuilder extends DataTypeBuilder {
  preValues = [];

  constructor(private gridDataType: GridDataType = new GridDataType()){
    super(gridDataType);
  }

  withSimpleItems(){
    // TODO: Maybe make builders for this?
    const items = {
      key: 'items',
      value: {
        columns: 12,
        config: [],
        layouts: [
          {
            label: 'Headline',
            name: 'Headline',
            areas: [
              {
                grid: 12,
                editors: ['headline'],
              },
            ],
          },
        ],
        styles: [],
        templates: [
          {
            name: '1 column layout',
            sections: [ {grid: 12}, ],
          },
        ],
      },
    };
    this.preValues.push(items);
    return this;
  }

  withDefaultPrevalues(){
    const defaultRtePreValue = {
      key: 'rte',
      value: {
        maxImageSize: 500,
        mode: 'classic',
        stylesheets: [],
        toolbar: ['umbmacro'],
      },
    };
    this.preValues.push(defaultRtePreValue);
    this.preValues.push({key: 'ignoreUserStartNodes', value: false});
    this.preValues.push({key: 'mediaParentId', value: null});
    return this;
  }

  applyPreValues(){
    this.dataType.addPrevalues(this.preValues);
    return this;
  }
}
