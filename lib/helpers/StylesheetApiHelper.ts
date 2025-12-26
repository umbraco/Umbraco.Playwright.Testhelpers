import {PathBasedTreeApiHelper} from "./PathBasedTreeApiHelper";

export class StylesheetApiHelper extends PathBasedTreeApiHelper {
  protected resourcePath = 'stylesheet';
  protected treePath = 'tree/stylesheet';

  // Stylesheet-specific create with content
  async createStylesheet(name: string, content: string, parentPath?: string) {
    const parentValue = parentPath ? { 'path': parentPath } : null;
    const stylesheetData = {
      "name": name,
      "parent": parentValue,
      "content": content
    };
    const response = await this.api.post(this.buildUrl(), stylesheetData);
    return this.extractPathFromLocation(response);
  }

  // Backward compatible alias
  async create(name: string, content: string, parentPath?: string) {
    return this.createStylesheet(name, content, parentPath);
  }

  async createDefaultStylesheet(name: string) {
    await this.ensureNameNotExists(name);
    return await this.createStylesheet(name, "/*\n");
  }

  async encodeStylesheetPath(path: string) {
    let encodedPath = encodeURIComponent(path);
    encodedPath = encodedPath.replace(/\./g, '%25dot%25');
    return encodedPath;
  }

  async createStylesheetWithHeaderContent(name: string) {
    await this.ensureNameNotExists(name);

    const content = '/**umb_name:red*/\n' +
      'h1 {\n' +
      '\tcolor:red\n' +
      '}';

    return await this.createStylesheet(name, content);
  }
}