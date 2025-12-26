import {PathBasedTreeApiHelper} from "./PathBasedTreeApiHelper";

export class PartialViewApiHelper extends PathBasedTreeApiHelper {
  protected resourcePath = 'partial-view';
  protected treePath = 'tree/partial-view';

  // PartialView-specific create with content
  async createPartialView(name: string, content: string, parentPath?: string) {
    const parentValue = parentPath ? { 'path': parentPath } : null;
    const partialViewData = {
      'name': name,
      'parent': parentValue,
      'content': content
    };
    const response = await this.api.post(this.buildUrl(), partialViewData);
    return this.extractPathFromLocation(response);
  }

  // Backward compatible alias
  async create(name: string, content: string, parentPath?: string) {
    return this.createPartialView(name, content, parentPath);
  }

  async createDefaultPartialView(name: string) {
    await this.ensureNameNotExists(name);
    return await this.createPartialView(name, "<h1>Test</h1>");
  }
}