import {PathBasedTreeApiHelper} from "./PathBasedTreeApiHelper";

export class ScriptApiHelper extends PathBasedTreeApiHelper {
  protected resourcePath = 'script';
  protected treePath = 'tree/script';

  // Script-specific create with content
  async createScript(name: string, content: string, parentPath: string | null = null) {
    const parentValue = parentPath ? { 'path': parentPath } : null;
    const scriptData = {
      "name": name,
      "parent": parentValue,
      "content": content
    };
    const response = await this.api.post(this.buildUrl(), scriptData);
    return this.extractPathFromLocation(response);
  }

  // Backward compatible alias
  async create(name: string, content: string, parentPath: string | null = null) {
    return this.createScript(name, content, parentPath);
  }

  async createDefaultScript(name: string) {
    await this.ensureNameNotExists(name);
    return await this.createScript(name, "@inherits Umbraco.Web.Mvc.UmbracoViewPage");
  }
}