import faker from 'faker';
import DocumentTypeGroupBuilder from './documentTypeGroupBuilder';
import DocumentTypeTabBuilder from './documentTypeTabBuilder';
import { AliasHelper } from '../../helpers/AliasHelper';

export class DocumentTypeBuilder {
  compositeContentTypes;
  isContainer;
  allowAsRoot;
  allowedTemplates;
  allowedContentTypes;
  alias;
  description;
  thumbnail;
  name;
  id;
  icon;
  trashed;
  key;
  parentId;
  path;
  allowCultureVariant;
  isElement;
  defaultTemplate;
  lockedCompositeContentTypes: any[];
  historyCleanupPreventCleanup;
  historyCleanupKeepAllVersionsNewerThanDays;
  historyCleanupKeepLatestVersionPerDayForDays;

  documentTypeGroupBuilders;
  documentTypeHistoryCleanupBuilder;

  constructor() {
    this.isContainer = false;
    this.allowAsRoot = false;
    this.documentTypeGroupBuilders = [];
    this.allowedContentTypes = [];
    this.documentTypeHistoryCleanupBuilder = [];
  }

  withHistoryCleanup(preventCleanup, keepAllVersionsNewerThanDays, keepLatestVersionPerDayForDays) {
    this.historyCleanupPreventCleanup = preventCleanup;
    this.historyCleanupKeepAllVersionsNewerThanDays = keepAllVersionsNewerThanDays;
    this.historyCleanupKeepLatestVersionPerDayForDays = keepLatestVersionPerDayForDays;
    return this;
  }
  withAllowAsRoot(allowAsRoot) {
    this.allowAsRoot = allowAsRoot;
    return this;
  }
  withDefaultTemplate(defaultTemplate) {
    this.defaultTemplate = defaultTemplate;
    return this;
  }
  withAlias(alias) {
    this.alias = alias;
    return this;
  }
  withName(name) {
    this.name = name;
    return this;
  }
  withAllowedContentTypes(id: number) {
    this.allowedContentTypes.push(id);
    return this;
  }
  withLockedCompositeContentTypes(types: any[]) {
    this.lockedCompositeContentTypes = types;
    return this;
  }
  addGroup(documentTypeGroupBuilder?: DocumentTypeGroupBuilder) {
    const builder =
      documentTypeGroupBuilder === null || documentTypeGroupBuilder === undefined
        ? new DocumentTypeGroupBuilder(this)
        : documentTypeGroupBuilder;
    this.documentTypeGroupBuilders.push(builder);
    return builder;
  }
  addTab(documentTypeTabBuilder?: DocumentTypeTabBuilder) {
    const builder =
      documentTypeTabBuilder === null || documentTypeTabBuilder === undefined
        ? new DocumentTypeTabBuilder(this)
        : documentTypeTabBuilder;
    this.documentTypeGroupBuilders.push(builder);
    return builder;
  }
  withId(id: number) {
    this.id = id;
    return this;
  }

  withAllowCultureVariation(allowCultureVariant)  {
    this.allowCultureVariant = allowCultureVariant;
    return this;
  }

  build() {
    const key = this.key || faker.random.uuid();
    const name = this.name || key;
    const alias = this.alias || AliasHelper.toSafeAlias(name);
    const parentId = this.parentId || -1;
    // Weirdly it will fail if the path is not specified, but it doesn't seem to matter if the path is fully qualified.
    // So just use the parent id as the path.
    const path = this.path || String(parentId);

    return {
      compositeContentTypes: this.compositeContentTypes || [],
      isContainer: this.isContainer || false,
      allowAsRoot: this.allowAsRoot || false,
      allowedTemplates: this.allowedTemplates || [],
      allowedContentTypes: this.allowedContentTypes || [],
      alias,
      description: this.description || null,
      thumbnail: this.thumbnail || 'folder.png',
      name,
      id: this.id || -1,
      icon: this.icon || 'icon-document',
      trashed: this.trashed || false,
      key,
      parentId: parentId,
      path: path,
      allowCultureVariant: this.allowCultureVariant || false,
      isElement: this.isElement || false,
      defaultTemplate: this.defaultTemplate || null,
      lockedCompositeContentTypes: this.lockedCompositeContentTypes || null,
      groups: this.documentTypeGroupBuilders.map((builder) => {
        return builder.build();
      }),
      historyCleanup: {
        historyCleanupPreventCleanup: this.historyCleanupPreventCleanup || false,
        historyCleanupKeepAllVersionsNewerThanDays: this.historyCleanupKeepAllVersionsNewerThanDays || 7,
        historyCleanupKeepLatestVersionPerDayForDays: this.historyCleanupKeepLatestVersionPerDayForDays || 90,
      },
    };
  }
}
