import { DataTypeBuilder } from './dataTypeBuilder';
import { GridDataType } from '../../models/dataTypes/gridDataType';
import { 
  GridTemplateBuilder, 
  GridRowConfigBuilder, 
  GridRteBuilder, 
  GridSettingsbuilder, 
  GridStylesBuilder 
} from './gridBuilders';

export class GridDataTypeBuilder extends DataTypeBuilder {
  preValues = [];
  layoutBuilders;
  templateBuilders;
  settingsBuilders;
  styleBuilders;
  rteBuilder;
  columns = 12;
  ignoreUserStartNodes;
  imageUploadFolder;

  constructor(private gridDataType: GridDataType = new GridDataType()) {
    super(gridDataType);
    this.templateBuilders = [];
    this.layoutBuilders = [];
    this.settingsBuilders = [];
    this.styleBuilders = [];
  }

  withColumns(columns: number) {
    this.columns = columns;
    return this;
  }

  withIgnoreUserStartNodes(ignore: boolean) {
    this.ignoreUserStartNodes = ignore;
    return this;
  }

  withImageUploadFolder(folderPath : string) {
    this.imageUploadFolder = folderPath;
    return this;
  }

  addRowConfiguration(gridRowConfigBuilder?: GridRowConfigBuilder) {
    const builder = 
      gridRowConfigBuilder === null || gridRowConfigBuilder === undefined
      ? new GridRowConfigBuilder(this)
      : gridRowConfigBuilder;

    this.layoutBuilders.push(builder);
    return builder;
  }

  addTemplate(templateBuilder?: GridTemplateBuilder) {
    const builder =
      templateBuilder === null || templateBuilder === undefined 
      ? new GridTemplateBuilder(this) 
      : templateBuilder;

    this.templateBuilders.push(builder);
    return builder;
  }

  addRte(rteBuilder?: GridRteBuilder) {
    const builder = 
      rteBuilder === null || rteBuilder === undefined
      ? new GridRteBuilder(this)
      : rteBuilder;

    this.rteBuilder = builder;
    return builder;
  }

  addSetting(settingsBuilder?: GridSettingsbuilder) {
    const builder = 
      settingsBuilder === null || settingsBuilder === undefined
      ? new GridSettingsbuilder(this)
      : settingsBuilder;
    
      this.settingsBuilders.push(builder);
      return builder;
  }

  addStyle(styleBuilder?: GridStylesBuilder) {
    const builder = 
      styleBuilder === null || styleBuilder === undefined
      ? new GridStylesBuilder(this)
      : styleBuilder;
    
      this.styleBuilders.push(builder);
      return builder;
  }

  withSimpleItems() {
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
            sections: [{ grid: 12 }],
          },
        ],
      },
    };
    this.preValues.push(items);
    return this;
  }

  apply() {
    // Add items
    const items = {
      key: 'items',
      value: {
        columns: this.columns || 12,
        config: this.settingsBuilders.map((builder) => {
          return builder.build();
        }),
        layouts: this.layoutBuilders.map((builder) => {
          return builder.build();
        }),
        styles: this.styleBuilders.map((builder) => {
          return builder.build();
        }),
        templates: this.templateBuilders.map((builder) => {
          return builder.build();
        }),
      },
    };
    this.preValues.push(items);

    // Add RTE
    const rtePrevalue = {
      key: 'rte',
      value: this.rteBuilder.build(),
    };
    this.preValues.push(rtePrevalue);

    this.preValues.push({
      key: 'ignoreUserStartNodes',
      value: this.ignoreUserStartNodes || false,
    });

    // Add Image upload folder
    this.preValues.push({
      key: 'mediaParentId',
      value: this.imageUploadFolder || null
    });

    return this.applyPreValues();
  }

  applyPreValues() {
    this.dataType.addPrevalues(this.preValues);
    return this;
  }
}
