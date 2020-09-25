import { GridTemplateBuilder } from './gridTemplateBuilder';

export class SectionBuilder {
  parrentBuilder;
  allowAll;
  grid;
  allowed;

  constructor(parrentBuilder: GridTemplateBuilder) {
    this.parrentBuilder = parrentBuilder;
    this.allowed = [];
  }

  withGridSize(gridSize: number) {
    this.grid = gridSize;
    return this;
  }

  withAllowAll(allowAll: boolean) {
    this.allowAll = allowAll;
    return this;
  }

  withAllowed(allowedName: string) {
    this.allowed.push(allowedName);
    return this;
  }

  done(): GridTemplateBuilder {
    return this.parrentBuilder;
  }

  build() {
    if (this.allowAll) {
      return {
        allowAll: this.allowAll || true,
        grid: this.grid,
      };
    } else {
      return {
        allowAll: this.allowAll || false,
        allowed: this.allowed,
        grid: this.grid,
      };
    }
  }
}
