import { Template } from '../../models/template';

export class TemplateBuilder {
  constructor(private template: Template = new Template()) {}

  withId(id) {
    this.template.id = id;
    return this;
  }
  withKey(key) {
    this.template.key = key;
    return this;
  }
  withName(name) {
    this.template.name = name;
    return this;
  }
  withAlias(alias) {
    this.template.alias = alias;
    return this;
  }
  withContent(content) {
    this.template.content = content;
    return this;
  }
  withPath(path) {
    this.template.path = path;
    return this;
  }
  withVirtualPath(virtualPath) {
    this.template.virtualPath = virtualPath;
    return this;
  }
  withMasterTemplateAlias(masterTemplateAlias) {
    this.template.masterTemplateAlias = masterTemplateAlias;
    return this;
  }
  withIsMasterTemplate(isMasterTemplate) {
    this.template.isMasterTemplate = isMasterTemplate;
    return this;
  }
  withNotifications(notifications) {
    this.template.notifications = notifications;
    return this;
  }

  public build(): Template {
    return this.template;
  }
}
