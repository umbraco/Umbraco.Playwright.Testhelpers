import { GridLayoutBuilder } from './gridLayoutBuilder';

export class SectionBuilder {
  parrentBuilder;
  grid;
  allowed;

  constructor(parrentBuilder: GridLayoutBuilder) {
    this.parrentBuilder = parrentBuilder;
    this.allowed = [];
  }

  withGridSize(gridSize: number) {
    this.grid = gridSize;
    return this;
  }

  withAllowAll() {
    this.allowed = [];
    return this;
  }

  withAllowed(allowedName: string) {
    this.allowed.push(allowedName);
    return this;
  }

  done(): GridLayoutBuilder {
    return this.parrentBuilder;
  }

  build() {
    const grid = {
      grid: this.grid,
      allowAll: true,
    };

    if (this.allowed.length > 0) {
      Object.assign(grid, { allowed: this.allowed });
      grid.allowAll = false;
    }

    return grid;
  }
}
