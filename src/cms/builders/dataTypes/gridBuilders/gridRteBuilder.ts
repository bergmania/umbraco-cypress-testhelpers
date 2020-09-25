import { GridDataTypeBuilder } from '../gridDataTypeBuilder';
import { RteToolbarOptionsBuilder } from './rteToolbarOptionsBuilder';

export class GridRteBuilder {
  parentBuilder;
  maxImageSize;
  mode;
  stylesheets;
  toolbarOptionsBuilder;
  dimensions;

  constructor(parentBuilder: GridDataTypeBuilder) {
    this.parentBuilder = parentBuilder;
    this.stylesheets = [];
  }

  withClassicMode() {
    this.mode = "classic";
    return this;
  }

  withDistractionFreeMode() {
    this.mode = "distraction-free";
    return this;
  }

  withMaxImageSize(imageSize : number) {
    this.maxImageSize = imageSize;
    return this;
  }

  withDimensions(width : number, height: number){
    this.dimensions = {
      width: width,
      height: height,
    };
    return this;
  }

  withToolBarOptions(optionsBuilder?: RteToolbarOptionsBuilder) {
    const builder = 
      optionsBuilder === null || optionsBuilder === undefined
      ? new RteToolbarOptionsBuilder(this)
      : optionsBuilder;
    
    this.toolbarOptionsBuilder = builder;
    return builder;
  }

  done() {
    return this.parentBuilder;
  }

  build() {
    if(this.dimensions){
      return {
        maxImageSize : this.maxImageSize || 500,
        dimensions : this.dimensions,
        mode : this.mode || "classic",
        stylesheets : this.stylesheets,
        toolbar : this.toolbarOptionsBuilder.build(),
      };
    }
    return {
      maxImageSize : this.maxImageSize || 500,
      mode : this.mode || "classic",
      stylesheets : this.stylesheets,
      toolbar : this.toolbarOptionsBuilder.build(),
    };
  }
}
