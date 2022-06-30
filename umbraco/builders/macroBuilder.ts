export class MacroBuilder {
  name;
  renderInEditor;
  useInEditor;
  cacheByPage;
  cacheByUser;
  partialViewMacro;

  withName(name) {
    this.name = name;
    return this;
  }

  withRenderInEditor() {
    this.renderInEditor = true;
    return this;
  }

  withUseInEditor() {
    this.useInEditor = true;
    return this;
  }

  withCacheByPage() {
    this.cacheByPage = true;
    return this;
  }

  withCacheByUser() {
    this.cacheByUser = true;
    return this;
  }

  withPartialViewMacro(partialView) {
    this.partialViewMacro = partialView;
    return this;
  }

  build() {
    return {
      name: this.name,
      renderInEditor: this.renderInEditor || true,
      useInEditor: this.useInEditor || false,
      cacheByPage: this.cacheByPage || false,
      cacheByUser: this.cacheByUser || false,
      partialView: this.partialViewMacro || null,
    };
  }
}
