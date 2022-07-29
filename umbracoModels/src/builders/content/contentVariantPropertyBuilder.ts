export class ContentVariantPropertyBuilder {
  parentBuilder;

  id;
  alias;
  value;

  constructor(parentBuilder) {
    this.parentBuilder = parentBuilder;
  }

  withAlias(alias) {
    this.alias = alias;
    return this;
  }

  withValue(value) {
    this.value = value;
    return this;
  }

  done() {
    return this.parentBuilder;
  }

  build() {
    return {
      id: this.id || 0,
      alias: this.alias || null,
      value: this.value || null,
    };
  }
}
