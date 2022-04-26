import { Stylesheet } from '../../models/stylesheet';

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

  public build(): Stylesheet {
    return this.stylesheet;
  }
}
