import { GridLayoutBuilder } from './gridLayoutBuilder';

export class GridAreaBuilder {
  parentBuilder;
  gridSize;
  editors;
  allowed;
  maxItems;

  constructor(parentBuilder: GridLayoutBuilder) {
    this.parentBuilder = parentBuilder;
    this.editors = [];
    this.allowed = [];
  }

  withGridSize(gridSize: number) {
    this.gridSize = gridSize;
    return this;
  }

  withMaxItems(maxItems : number) {
    this.maxItems = maxItems;
    return this
  }

  withEditor(editor) {
    this.editors.push(editor);
    return this;
  }

  withAllowRTE() {
    this.allowed.push('rte');
    return this;
  }

  withAllowImage() {
    this.allowed.push('media');
    return this;
  }

  withAllowMacro() {
    this.allowed.push('macro');
    return this;
  }

  withAllowEmbed() {
    this.allowed.push('embed');
    return this;
  }

  withAllowHeadline() {
    this.allowed.push('headline');
    return this;
  }

  withAllowQuote() {
    this.allowed.push('quote');
    return this;
  }

  withAllowAll() {
    this.allowed = [];
    return this;
  }

  done(): GridLayoutBuilder {
    return this.parentBuilder;
  }

  build() {
    let area = { grid: this.gridSize }

    if(this.editors.length > 0) {
      Object.assign(area, {editors: this.editors});
    }

    if(this.allowed.length > 0) {
      Object.assign(area, {
        allowAll: false,
        allowed: this.allowed,
      })
    }

    if(this.maxItems) {
      Object.assign(area, { maxItems : this.maxItems})
    }

    return area;
  }
}
