import { Stylesheet } from '@umbraco/playwright-models';
import faker from 'faker';

export class StylesheetBuilder {
  constructor(private stylesheet: Stylesheet = new Stylesheet()) {}

  withId(id) {
    this.stylesheet.id = id;
    return this;
  }
  withName(name) {
    this.stylesheet.name = name;
    return this;
  }
  withFileType(fileType){
    this.stylesheet.fileType = fileType;
    return this;
  }
  withContent(content) {
    this.stylesheet.content = content;
    return this;
  }
  withVirtualPath(virtualPath) {
    this.stylesheet.virtualPath = virtualPath;
    return this;
  }
  withNotifications(notifications) {
    this.stylesheet.notifications = notifications;
    return this;
  }
  withSnippet(snippet){
    this.stylesheet.snippet = snippet;
    return this;
  }

  public build(): Stylesheet {
    if(this.stylesheet.virtualPath === null){
      this.stylesheet.virtualPath = "/css/"
    }
    if(this.stylesheet.name === null){
      this.stylesheet.name = faker.random.uuid();
    }
    if(this.stylesheet.content === null){
      this.stylesheet.content = "";
    }
    if(this.stylesheet.fileType === null){
      this.stylesheet.fileType = "stylesheets";
    }
    return this.stylesheet;
  }
}
