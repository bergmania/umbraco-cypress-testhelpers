import { DataTypeBuilder } from './dataTypeBuilder';
import { GridDataType } from '../../models/dataTypes/gridDataType';
import { GridTemplateBuilder } from './gridBuilders/gridTemplateBuilder';
import { GridLayoutBuilder } from './gridBuilders/gridLayoutBuilder';
import { GridRteBuilder } from './gridBuilders/gridRteBuilder';

export class GridDataTypeBuilder extends DataTypeBuilder {
  preValues = [];
  layoutBuilders;
  templateBuilders;
  rteBuilder;
  columns = 12;
  ignoreUserStartNodes;
  imageUploadFolder;

  constructor(private gridDataType: GridDataType = new GridDataType()) {
    super(gridDataType);
    this.templateBuilders = [];
    this.layoutBuilders = [];
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

  addLayout(layoutBuilder?: GridLayoutBuilder) {
    const builder = layoutBuilder === null || layoutBuilder === undefined ? new GridLayoutBuilder(this) : layoutBuilder;

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
        config: [],
        layouts: this.layoutBuilders.map((builder) => {
          return builder.build();
        }),
        styles: [],
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
