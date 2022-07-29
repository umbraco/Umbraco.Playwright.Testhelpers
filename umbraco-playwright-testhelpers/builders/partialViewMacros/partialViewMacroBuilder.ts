import { PartialViewMacro } from '@umbraco/playwright-models';

export class PartialViewMacroBuilder {
  constructor(public partialViewMacro: PartialViewMacro = new PartialViewMacro()) {}

  public withName(name) {
    this.partialViewMacro.name = name;
    return this;
  }
  public withContent(content) {
    this.partialViewMacro.content = content;
    return this;
  }

  public build(): PartialViewMacro {
    return this.partialViewMacro;
  }
}
