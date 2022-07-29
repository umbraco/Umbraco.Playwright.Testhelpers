export class PartialViewBuilder {
  name;
  content;
  filetype;
  id;
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

  withId(id: number) {
    this.id = id;
    return this;
  }

  build() {
    return {
      name: this.name,
      content: this.content,
      filetype: this.filetype || 'partialViews',
      id: this.id || 0,
      notifications: this.notifications || [],
      path: this.path || null,
      snippet: this.snippet || null,
      virtualPath: this.virtualPath || '/Views/Partials/',
    };
  }
}
