import faker from 'faker';
import camelize from 'camelize';
import { FormPickerDocumentTypePropertyBuilder } from './properties/formPickerDocumentTypePropertyBuilder';
import { TextBoxDocumentTypePropertyBuilder } from './properties/textBoxDocumentTypePropertyBuilder';
import { DropDownDocumentTypePropertyBuilder } from './properties/dropDownDocumentTypePropertyBuilder';
import { ContentPickerPropertyBuilder } from './properties/contentPickerTypePropertyBuilder';
import { RichTextDocumentTypePropertyEditor, CustomDocumentTypePropertyBuilder } from './properties';
import { UrlPickerPropertyBuilder } from './properties/urlPickerTypePropertyBuilder';


export default class DocumentTypeGroupBuilder {
  parentBuilder;
  alias;
  name;
  sortOrder;
  id;
  inherited;
  documentTypeGroupPropertyBuilders;
  

  constructor(parentBuilder) {
    this.parentBuilder = parentBuilder;
    this.sortOrder = 0;
    this.documentTypeGroupPropertyBuilders = [];
  }

  withName(name) {
    this.name = name;
    return this;
  }
  withAlias(alias){
    this.alias = alias;
    return this;
  }
  addFormPickerProperty() {
    const builder = new FormPickerDocumentTypePropertyBuilder(this);

    this.documentTypeGroupPropertyBuilders.push(builder);

    return builder;
  }

  addTextBoxProperty() {
    const builder = new TextBoxDocumentTypePropertyBuilder(this);

    this.documentTypeGroupPropertyBuilders.push(builder);

    return builder;
  }

  addDropDownProperty() {
    const builder = new DropDownDocumentTypePropertyBuilder(this);

    this.documentTypeGroupPropertyBuilders.push(builder);

    return builder;
  }

  addContentPickerProperty() {
    const builder = new ContentPickerPropertyBuilder(this);
    this.documentTypeGroupPropertyBuilders.push(builder);
    return builder;
  }

  addUrlPickerProperty() {
    const builder = new UrlPickerPropertyBuilder(this);
    this.documentTypeGroupPropertyBuilders.push(builder);
    return builder;
  }

  addRichTextProperty() {
    const builder = new RichTextDocumentTypePropertyEditor(this);
    this.documentTypeGroupPropertyBuilders.push(builder);
    return builder;
  }

  addCustomProperty(id) {
    const builder = new CustomDocumentTypePropertyBuilder(this, id);
    this.documentTypeGroupPropertyBuilders.push(builder);
    return builder;
  }

  done() {
    return this.parentBuilder;
  }
  getAlias(){
    return this.alias || 'a' + camelize(this.name);
  }

  build() {
    const name = this.name || faker.random.uuid()
    return {
      id: this.id || -1,
      inherited: this.inherited || false,
      name: this.name || name,
      alias: this.getAlias(),
      sortOrder: this.sortOrder || 0,
      properties: this.documentTypeGroupPropertyBuilders.map((builder) => {
        return builder.build();
      }),
    };
  }
}
