import { GridLayoutBuilder } from './gridLayoutBuilder';

export class GridAreaBuilder {
  parentBuilder;
  gridSize;
  editors;

  constructor(parentBuilder: GridLayoutBuilder) {
    this.parentBuilder = parentBuilder;
    this.editors = [];
  }

  withGridSize(gridSize: number) {
    this.gridSize = gridSize;
    return this;
  }

  withEditors(editor) {
    this.editors.push(editor);
    return this;
  }

  done(): GridLayoutBuilder {
    return this.parentBuilder;
  }

  build() {
    if (this.editors.length > 0) {
      return {
        grid: this.gridSize,
        editors: this.editors,
      };
    } else {
      return { grid: this.gridSize };
    }
  }
}
