export class ScriptBuilder {
  content;
  fileType;
  id;
  name;
  notifications;
  path;
  snippet;
  virtualPath;

  withContent(content) {
    this.content = content;
    return this;
  }

  withName(name) {
    this.name = name;
    return this;
  }

  build() {
    return {
      name: this.name,
      content: this.content,
      filetype: this.fileType || 'scripts',
      id: this.id || '0',
      notifications: this.notifications || [],
      path: this.path || null,
      snippet: this.snippet || null,
      virtualPath: this.virtualPath || '/scripts/',
    };
  }
}
