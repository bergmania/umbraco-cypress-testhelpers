import { DataTypeBuilder } from './dataTypeBuilder';
import { GridDataType } from '../../models/dataTypes/gridDataType';
import { GridTemplateBuilder } from './gridBuilders/gridTemplateBuilder';

export class GridDataTypeBuilder extends DataTypeBuilder {
  preValues = [];
  layoutBuilders;
  templateBuilders;
  columns = 12;

  constructor(private gridDataType: GridDataType = new GridDataType()){
    super(gridDataType);
    this.templateBuilders = [];
    this.layoutBuilders = [];
  }

  withColumns(columns: number){
    this.columns = columns;
    return this
  }

  addTemplate(templateBuilder?: GridTemplateBuilder){
    const builder = 
      templateBuilder === null || templateBuilder === undefined
      ? new GridTemplateBuilder(this)
      : templateBuilder;
    
      this.templateBuilders.push(builder)
      return builder;
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

  apply(){
    const items = {
      key: 'items',
      value: {
        columns: this.columns || 12,
        config: [],
        layouts: [],
        styles: [],
        templates: this.templateBuilders.map((builder) => {
          return builder.build();
        })
      }
    }

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
