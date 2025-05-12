import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class ContentUiHelper extends UiBaseLocators {
  private readonly contentNameTxt: Locator;
  private readonly saveAndPublishBtn: Locator;
  private readonly publishBtn: Locator;
  private readonly unpublishBtn: Locator;
  private readonly actionMenuForContentBtn: Locator;
  private readonly openedModal: Locator;
  private readonly textstringTxt: Locator;
  private readonly infoTab: Locator;
  private readonly linkContent: Locator;
  private readonly historyItems: Locator;
  private readonly generalItem: Locator;
  private readonly documentState: Locator;
  private readonly createdDate: Locator;
  private readonly editDocumentTypeBtn: Locator;
  private readonly addTemplateBtn: Locator;
  private readonly id: Locator;
  private readonly cultureAndHostnamesBtn: Locator;
  private readonly cultureLanguageDropdownBox: Locator;
  private readonly addNewDomainBtn: Locator;
  private readonly domainTxt: Locator;
  private readonly domainLanguageDropdownBox: Locator;
  private readonly deleteDomainBtn: Locator;
  private readonly reloadChildrenThreeDotsBtn: Locator;
  private readonly contentTree: Locator;
  private readonly richTextAreaTxt: Locator;
  private readonly textAreaTxt: Locator;
  private readonly plusIconBtn: Locator;
  private readonly enterTagTxt: Locator;
  private readonly menuItemTree: Locator;
  private readonly domainComboBox: Locator;
  private readonly confirmToUnpublishBtn: Locator;
  private readonly saveModalBtn: Locator;
  private readonly dropdown: Locator;
  private readonly setADateTxt: Locator;
  private readonly chooseMediaPickerBtn: Locator;
  private readonly chooseMemberPickerBtn: Locator;
  private readonly numericTxt: Locator;
  private readonly resetFocalPointBtn: Locator;
  private readonly addMultiURLPickerBtn: Locator;
  private readonly linkTxt: Locator;
  private readonly anchorQuerystringTxt: Locator;
  private readonly linkTitleTxt: Locator;
  private readonly tagItems: Locator;
  private readonly removeFilesBtn: Locator;
  private readonly toggleBtn: Locator;
  private readonly toggleInput: Locator;
  private readonly documentTypeWorkspace: Locator;
  private readonly addMultipleTextStringBtn: Locator;
  private readonly multipleTextStringValueTxt: Locator;
  private readonly markdownTxt: Locator;
  private readonly codeEditorTxt: Locator;
  private readonly sliderInput: Locator;
  private readonly tabItems: Locator;
  private readonly documentWorkspace: Locator;
  private readonly searchTxt: Locator;
  private readonly variantSelectorBtn: Locator;
  private readonly variantAddModeBtn: Locator;
  private readonly saveAndCloseBtn: Locator;
  private readonly enterNameInContainerTxt: Locator;
  private readonly listView: Locator;
  private readonly nameBtn: Locator;
  private readonly listViewTableRow: Locator;
  private readonly publishSelectedListItems: Locator;
  private readonly unpublishSelectedListItems: Locator;
  private readonly duplicateToSelectedListItems: Locator;
  private readonly moveToSelectedListItems: Locator;
  private readonly trashSelectedListItems: Locator;
  private readonly modalContent: Locator;
  private readonly trashBtn: Locator;
  private readonly documentListView: Locator;
  private readonly documentGridView: Locator;
  private readonly documentTreeItem: Locator;
  private readonly documentLanguageSelect: Locator;
  private readonly documentLanguageSelectPopover: Locator;
  private readonly documentReadOnly: Locator;
  private readonly documentWorkspaceEditor: Locator;
  private readonly documentBlueprintModal: Locator;
  private readonly documentBlueprintModalEnterNameTxt: Locator;
  private readonly documentBlueprintSaveBtn: Locator;
  private readonly exactTrashBtn: Locator;
  private readonly emptyRecycleBinBtn: Locator;
  private readonly confirmEmptyRecycleBinBtn: Locator;
  private readonly duplicateToBtn: Locator;
  private readonly moveToBtn: Locator;
  private readonly duplicateBtn: Locator;
  private readonly contentTreeRefreshBtn: Locator;
  private readonly sortChildrenBtn: Locator;
  private readonly rollbackBtn: Locator;
  private readonly rollbackContainerBtn: Locator;
  private readonly publicAccessBtn: Locator;
  private readonly uuiCheckbox: Locator;
  private readonly sortBtn: Locator;
  private readonly modalChooseBtn: Locator;
  private readonly containerSaveBtn: Locator
  private readonly groupBasedProtectionBtn: Locator;
  private readonly nextBtn: Locator;
  private readonly chooseMemberGroupBtn: Locator;
  private readonly selectLoginPageDocument: Locator;
  private readonly selectErrorPageDocument: Locator;
  private readonly rollbackItem: Locator;
  private readonly actionsMenu: Locator;
  private readonly linkToDocumentBtn: Locator;
  private readonly linkToMediaBtn: Locator;
  private readonly linkToManualBtn: Locator;
  private readonly umbDocumentCollection: Locator;
  private readonly documentTableColumnName: Locator;
  private readonly addBlockElementBtn: Locator;
  private readonly formValidationMessage: Locator;
  private readonly blockName: Locator;
  private readonly addBlockSettingsTabBtn: Locator;
  private readonly editBlockEntryBtn: Locator;
  private readonly copyBlockEntryBtn: Locator;
  private readonly deleteBlockEntryBtn: Locator;
  private readonly blockGridEntry: Locator;
  private readonly blockListEntry: Locator;
  private readonly tipTapPropertyEditor: Locator;
  private readonly tipTapEditor: Locator;
  private readonly uploadedSvgThumbnail: Locator;
  private readonly linkPickerModal: Locator;
  private readonly pasteFromClipboardBtn: Locator;
  private readonly pasteBtn: Locator;
  private readonly closeBtn: Locator;
  private readonly workspaceEditTab: Locator;
  private readonly workspaceEditProperties: Locator;
  private readonly exactCopyBtn: Locator;
  private readonly openActionsMenu: Locator;
  private readonly replaceExactBtn: Locator;
  private readonly clipboardEntryPicker: Locator;
  private readonly blockWorkspaceEditTab: Locator;
  private readonly insertBlockBtn: Locator;
  private readonly blockWorkspace: Locator;
  private readonly saveContentBtn: Locator;
  private readonly splitView: Locator;
  private readonly tiptapInput: Locator;
  private readonly rteBlockInline: Locator;
  private readonly backofficeModalContainer: Locator;
  private readonly rteBlock: Locator;
  private readonly workspaceActionMenu: Locator;
  private readonly workspaceActionMenuItem: Locator;
  private readonly viewMoreOptionsBtn: Locator;
  private readonly scheduleBtn: Locator;
  private readonly scheduleModalBtn: Locator;
  private readonly documentScheduleModal: Locator;
  private readonly publishAtFormLayout: Locator;
  private readonly unpublishAtFormLayout: Locator;
  private readonly publishAtValidationMessage: Locator;
  private readonly unpublishAtValidationMessage: Locator;
  private readonly lastPublished: Locator;
  private readonly publishAt: Locator;
  private readonly blockGridAreasContainer: Locator;
  private readonly blockGridBlock: Locator;
  private readonly blockGridEntries: Locator;
  private readonly inlineCreateBtn: Locator;
  private readonly removeAt: Locator;
  private readonly selectAllCheckbox: Locator;
  private readonly tiptapStatusbarWordCount: Locator;
  private readonly tiptapStatusbarElementPath: Locator;
  private readonly styleSelectBtn: Locator;
  private readonly cascadingMenuContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.saveContentBtn = page.locator('[data-mark="workspace-action:Umb.WorkspaceAction.Document.Save"]');
    this.closeBtn = page.getByRole('button', {name: 'Close', exact: true});
    this.linkPickerModal = page.locator('umb-link-picker-modal');
    this.contentNameTxt = page.locator('#name-input input');
    this.saveAndPublishBtn = page.getByLabel('Save And Publish');
    this.publishBtn = page.getByLabel(/^Publish(…)?$/);
    this.unpublishBtn = page.getByLabel(/^Unpublish(…)?$/);
    this.actionMenuForContentBtn = page.locator('#header [label="Open actions menu"]');
    this.openedModal = page.locator('uui-modal-container[backdrop]');
    this.textstringTxt = page.locator('umb-property-editor-ui-text-box #input');
    this.reloadChildrenThreeDotsBtn = page.getByRole('button', {name: 'Reload children…'});
    this.contentTree = page.locator('umb-tree[alias="Umb.Tree.Document"]');
    this.richTextAreaTxt = page.frameLocator('iframe[title="Rich Text Area"]').locator('#tinymce');
    this.textAreaTxt = page.locator('umb-property-editor-ui-textarea textarea');
    this.plusIconBtn = page.locator('#icon-add svg');
    this.enterTagTxt = page.getByPlaceholder('Enter tag');
    this.menuItemTree = page.locator('umb-menu-item-tree-default');
    this.confirmToUnpublishBtn = page.locator('umb-document-unpublish-modal').getByLabel('Unpublish');
    this.dropdown = page.locator('select#native');
    this.splitView = page.locator('#splitViews');
    this.setADateTxt = page.getByLabel('Set a date…');
    this.chooseMediaPickerBtn = page.locator('umb-property-editor-ui-media-picker #btn-add');
    this.chooseMemberPickerBtn = page.locator('umb-property-editor-ui-member-picker #btn-add');
    this.numericTxt = page.locator('umb-property-editor-ui-number input');
    this.addMultiURLPickerBtn = page.locator('umb-property-editor-ui-multi-url-picker #btn-add');
    this.linkTxt = page.locator('[data-mark="input:url"] #input');
    this.anchorQuerystringTxt = page.getByLabel('#value or ?key=value');
    this.linkTitleTxt = this.linkPickerModal.getByLabel('Title');
    this.tagItems = page.locator('uui-tag');
    this.removeFilesBtn = page.locator('umb-input-upload-field [label="Remove file(s)"]');
    this.toggleBtn = page.locator('umb-property-editor-ui-toggle #toggle');
    this.toggleInput = page.locator('umb-property-editor-ui-toggle span');
    this.documentTypeWorkspace = this.sidebarModal.locator('umb-document-type-workspace-editor');
    this.addMultipleTextStringBtn = page.locator('umb-input-multiple-text-string').getByLabel('Add');
    this.multipleTextStringValueTxt = page.locator('umb-input-multiple-text-string').getByLabel('Value');
    this.markdownTxt = page.locator('umb-input-markdown textarea');
    this.codeEditorTxt = page.locator('umb-code-editor textarea');
    this.sliderInput = page.locator('umb-property-editor-ui-slider #input');
    this.tabItems = page.locator('uui-tab');
    this.documentWorkspace = page.locator('umb-document-workspace-editor');
    this.searchTxt = this.documentWorkspace.getByLabel('Search', {exact: true});
    this.variantSelectorBtn = page.locator('#variant-selector-toggle');
    this.variantAddModeBtn = page.locator('.variant-selector-switch-button.add-mode');
    this.saveAndCloseBtn = page.getByLabel('Save and close');
    this.documentTreeItem = page.locator('umb-document-tree-item');
    this.documentLanguageSelect = page.locator('umb-app-language-select');
    this.documentLanguageSelectPopover = page.locator('umb-popover-layout');
    this.documentReadOnly = this.documentWorkspace.locator('#name-input').getByText('Read-only');
    // Info tab
    this.infoTab = page.locator('uui-tab[data-mark="workspace:view-link:Umb.WorkspaceView.Document.Info"]');
    this.linkContent = page.locator('umb-document-links-workspace-info-app');
    this.historyItems = page.locator('umb-history-item');
    this.generalItem = page.locator('.general-item');
    this.documentState = this.generalItem.locator('uui-tag');
    this.createdDate = this.generalItem.filter({hasText: 'Created'}).locator('umb-localize-date');
    this.editDocumentTypeBtn = this.generalItem.filter({hasText: 'Document Type'}).locator('#button');
    this.addTemplateBtn = this.generalItem.filter({hasText: 'Template'}).locator('#button');
    this.id = this.generalItem.filter({hasText: 'Id'}).locator('span');
    // Culture and Hostname
    this.cultureAndHostnamesBtn = page.getByLabel(/^Culture and Hostnames(…)?$/);
    this.cultureLanguageDropdownBox = page.locator('[headline="Culture"]').getByLabel('combobox-input');
    this.addNewDomainBtn = page.getByLabel('Add new domain');
    this.domainTxt = page.getByLabel('Domain', {exact: true});
    this.domainLanguageDropdownBox = page.locator('[headline="Domains"]').getByLabel('combobox-input');
    this.deleteDomainBtn = page.locator('[headline="Domains"] [name="icon-trash"] svg');
    this.domainComboBox = page.locator('#domains uui-combobox');
    this.saveModalBtn = this.sidebarModal.getByLabel('Save', {exact: true});
    this.resetFocalPointBtn = page.getByLabel('Reset focal point');
    // List View
    this.enterNameInContainerTxt = this.container.locator('[data-mark="input:entity-name"] #input');
    this.listView = page.locator('umb-document-table-collection-view');
    this.nameBtn = page.getByRole('button', {name: 'Name'});
    this.listViewTableRow = this.listView.locator('uui-table-row');
    this.publishSelectedListItems = page.locator('umb-entity-bulk-action').getByText('Publish', {exact: true});
    this.unpublishSelectedListItems = page.locator('umb-entity-bulk-action').getByText('Unpublish', {exact: true});
    this.duplicateToSelectedListItems = page.locator('umb-entity-bulk-action').getByText('Duplicate to', {exact: true});
    this.moveToSelectedListItems = page.locator('umb-entity-bulk-action').getByText('Move to', {exact: true});
    this.trashSelectedListItems = page.locator('umb-entity-bulk-action').getByText('Trash', {exact: true});
    this.modalContent = page.locator('umb-tree-picker-modal');
    this.trashBtn = page.getByLabel(/^Trash(…)?$/);
    this.exactTrashBtn = page.getByRole('button', {name: 'Trash', exact: true});
    this.documentListView = page.locator('umb-document-table-collection-view');
    this.documentGridView = page.locator('umb-document-grid-collection-view');
    this.documentWorkspaceEditor = page.locator('umb-workspace-editor');
    this.documentBlueprintModal = page.locator('umb-create-blueprint-modal');
    this.documentBlueprintModalEnterNameTxt = this.documentBlueprintModal.locator('input');
    this.documentBlueprintSaveBtn = this.documentBlueprintModal.getByLabel('Save');
    this.emptyRecycleBinBtn = page.getByLabel('Empty Recycle Bin');
    this.confirmEmptyRecycleBinBtn = page.locator('#confirm').getByLabel('Empty Recycle Bin', {exact: true});
    this.duplicateToBtn = page.getByRole('button', {name: 'Duplicate to'});
    this.moveToBtn = page.getByRole('button', {name: 'Move to'});
    this.duplicateBtn = page.getByLabel('Duplicate', {exact: true});
    this.contentTreeRefreshBtn = page.locator('#header').getByLabel('#actions_refreshNode');
    this.sortChildrenBtn = page.getByRole('button', {name: 'Sort children'});
    this.rollbackBtn = page.getByRole('button', {name: /^Rollback(…)?$/, exact: true});
    this.rollbackContainerBtn = this.container.getByLabel('Rollback');
    this.publicAccessBtn = page.getByRole('button', {name: 'Public Access'});
    this.uuiCheckbox = page.locator('uui-checkbox');
    this.sortBtn = page.getByLabel('Sort', {exact: true});
    this.modalChooseBtn = page.locator('umb-tree-picker-modal').getByLabel('Choose');
    this.containerSaveBtn = this.container.getByLabel('Save');
    this.groupBasedProtectionBtn = page.locator('span').filter({hasText: 'Group based protection'});
    this.nextBtn = page.getByLabel('Next');
    this.chooseMemberGroupBtn = page.locator('umb-input-member-group').getByLabel('Choose');
    this.selectLoginPageDocument = page.locator('.select-item').filter({hasText: 'Login Page'}).locator('umb-input-document');
    this.selectErrorPageDocument = page.locator('.select-item').filter({hasText: 'Error Page'}).locator('umb-input-document');
    this.rollbackItem = page.locator('.rollback-item');
    this.actionsMenu = page.locator('uui-scroll-container');
    this.linkToDocumentBtn = this.linkPickerModal.locator('[data-mark="action:document"] #button');
    this.linkToMediaBtn = this.linkPickerModal.locator('[data-mark="action:media"] #button');
    this.linkToManualBtn = this.linkPickerModal.locator('[data-mark="action:external"] #button');
    this.umbDocumentCollection = page.locator('umb-document-collection');
    this.documentTableColumnName = this.listView.locator('umb-document-table-column-name');
    //Block Grid - Block List
    this.addBlockElementBtn = page.locator('uui-button-group > uui-button').first().filter({has: page.locator('a#button')});
    this.formValidationMessage = page.locator('#splitViews umb-form-validation-message #messages');
    this.blockName = page.locator('#editor [slot="name"]');
    this.addBlockSettingsTabBtn = page.locator('umb-body-layout').getByRole('tab', {name: 'Settings'});
    this.editBlockEntryBtn = page.locator('[label="edit"] svg');
    this.copyBlockEntryBtn = page.getByLabel('Copy to clipboard');
    this.exactCopyBtn = page.getByRole('button', {name: 'Copy', exact: true});
    this.deleteBlockEntryBtn = page.locator('[label="delete"] svg');
    this.blockGridEntry = page.locator('umb-block-grid-entry');
    this.blockGridBlock = page.locator('umb-block-grid-block');
    this.blockListEntry = page.locator('umb-block-list-entry');
    this.pasteFromClipboardBtn = page.getByLabel('Paste from clipboard');
    this.pasteBtn = page.getByRole('button', {name: 'Paste', exact: true});
    this.workspaceEditTab = page.locator('umb-content-workspace-view-edit-tab');
    this.blockWorkspaceEditTab = page.locator('umb-block-workspace-view-edit-tab');
    this.workspaceEditProperties = page.locator('umb-content-workspace-view-edit-properties');
    this.openActionsMenu = page.getByLabel('Open actions menu');
    this.replaceExactBtn = page.getByRole('button', {name: 'Replace', exact: true});
    this.clipboardEntryPicker = page.locator('umb-clipboard-entry-picker');
    this.blockGridAreasContainer = page.locator('umb-block-grid-areas-container');
    this.blockGridEntries = page.locator('umb-block-grid-entries');
    this.inlineCreateBtn = page.locator('uui-button-inline-create');
    // TipTap
    this.tipTapPropertyEditor = page.locator('umb-property-editor-ui-tiptap');
    this.tipTapEditor = this.tipTapPropertyEditor.locator('#editor .tiptap');
    this.uploadedSvgThumbnail = page.locator('umb-input-upload-field-svg img');
    this.insertBlockBtn = page.locator('[title="Insert Block"]');
    this.blockWorkspace = page.locator('umb-block-workspace-editor');
    this.tiptapInput = page.locator('umb-input-tiptap');
    this.rteBlockInline = page.locator('umb-rte-block-inline');
    this.backofficeModalContainer = page.locator('umb-backoffice-modal-container');
    this.rteBlock = page.locator('umb-rte-block');
    this.tiptapStatusbarWordCount = page.locator('umb-tiptap-statusbar-word-count');
    this.tiptapStatusbarElementPath = page.locator('umb-tiptap-statusbar-element-path');
    // Scheduled Publishing
    this.workspaceActionMenu = page.locator('umb-workspace-action-menu');
    this.workspaceActionMenuItem = page.locator('umb-workspace-action-menu-item');
    this.viewMoreOptionsBtn = this.workspaceActionMenu.locator('#popover-trigger');
    this.scheduleBtn = this.workspaceActionMenuItem.getByLabel('Schedule', {exact: true});
    this.documentScheduleModal = page.locator('umb-document-schedule-modal');
    this.scheduleModalBtn = this.documentScheduleModal.getByLabel('Schedule', {exact: true});
    this.publishAtFormLayout = this.documentScheduleModal.locator('uui-form-layout-item').first();
    this.unpublishAtFormLayout = this.documentScheduleModal.locator('uui-form-layout-item').last();
    this.publishAtValidationMessage = this.publishAtFormLayout.locator('#messages');
    this.unpublishAtValidationMessage = this.unpublishAtFormLayout.locator('#messages');
    this.lastPublished = this.generalItem.filter({hasText: 'Last published'}).locator('umb-localize-date');
    this.publishAt = this.generalItem.filter({hasText: 'Publish at'}).locator('umb-localize-date');
    this.removeAt = this.generalItem.filter({hasText: 'Remove at'}).locator('umb-localize-date');
    this.selectAllCheckbox = this.documentScheduleModal.locator('[label="Select all"]');
    // Tiptap - Style Select
    this.styleSelectBtn = page.locator('uui-button[label="Style Select"]');
    this.cascadingMenuContainer = page.locator('umb-cascading-menu-popover uui-scroll-container');
  }

  async enterContentName(name: string) {
    await expect(this.contentNameTxt).toBeVisible();
    await this.contentNameTxt.clear();
    await this.contentNameTxt.fill(name);
    await expect(this.contentNameTxt).toHaveValue(name);
  }

  async clickSaveAndPublishButton() {
    await expect(this.saveAndPublishBtn).toBeVisible();
    await this.saveAndPublishBtn.click();
  }

  async clickActionsButton() {
    await this.actionsBtn.click();
  }

  async clickPublishButton() {
    await this.publishBtn.click();
  }

  async clickUnpublishButton() {
    await this.unpublishBtn.click();
  }

  async clickReloadChildrenThreeDotsButton() {
    await this.reloadChildrenThreeDotsBtn.click();
  }

  async clickActionsMenuAtRoot() {
    await this.actionMenuForContentBtn.click();
  }

  async goToContentWithName(contentName: string) {
    const contentWithNameLocator = this.menuItemTree.getByText(contentName, {exact: true});
    await expect(contentWithNameLocator).toBeVisible();
    await contentWithNameLocator.click();
  }

  async clickActionsMenuForContent(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async clickCaretButtonForContentName(name: string) {
    await expect(this.menuItemTree.filter({hasText: name}).last().locator('#caret-button').last()).toBeVisible();
    await this.menuItemTree.filter({hasText: name}).last().locator('#caret-button').last().click();
  }

  async waitForModalVisible() {
    await this.openedModal.waitFor({state: 'attached'});
  }

  async waitForModalHidden() {
    await this.openedModal.waitFor({state: 'hidden'});
  }

  async clickSaveButtonForContent() {
    await expect(this.saveContentBtn).toBeVisible();
    await this.saveContentBtn.click();
  }

  async enterTextstring(text: string) {
    await expect(this.textstringTxt).toBeVisible();
    await this.textstringTxt.clear();
    await this.textstringTxt.fill(text);
  }

  async doesContentTreeHaveName(contentName: string) {
    await expect(this.contentTree).toContainText(contentName);
  }

  async enterRichTextArea(value: string) {
    await expect(this.richTextAreaTxt).toBeVisible();
    await this.richTextAreaTxt.fill(value);
  }

  async enterTextArea(value: string) {
    await expect(this.textAreaTxt).toBeVisible();
    await this.page.waitForTimeout(200);
    await this.textAreaTxt.clear();
    await this.textAreaTxt.fill(value);
  }

  async clickConfirmToUnpublishButton() {
    await this.confirmToUnpublishBtn.click();
  }

  async clickCreateDocumentBlueprintButton() {
    await this.createDocumentBlueprintBtn.click();
  }

  // Info Tab
  async clickInfoTab() {
    await expect(this.infoTab).toBeVisible();
    await this.infoTab.click();
  }

  async doesDocumentHaveLink(link: string) {
    await expect(this.linkContent).toContainText(link);
  }

  async doesHistoryHaveText(text: string) {
    await expect(this.historyItems).toHaveText(text);
  }

  async doesDocumentStateHaveText(text: string) {
    await expect(this.documentState).toHaveText(text);
  }

  async doesCreatedDateHaveText(text: string) {
    await expect(this.createdDate).toHaveText(text);
  }

  async doesIdHaveText(text: string) {
    await expect(this.id).toHaveText(text);
  }

  async clickEditDocumentTypeButton() {
    await this.editDocumentTypeBtn.click();
  }

  async clickAddTemplateButton() {
    await this.addTemplateBtn.click();
  }

  async clickDocumentTypeByName(documentTypeName: string) {
    await this.page.locator('uui-ref-node-document-type[name="' + documentTypeName + '"]').click();
  }

  async clickTemplateByName(templateName: string) {
    await this.page.locator('uui-ref-node[name="' + templateName + '"]').click();
  }

  async isDocumentTypeModalVisible(documentTypeName: string) {
    await expect(this.documentTypeWorkspace.filter({hasText: documentTypeName})).toBeVisible();
  }

  async isTemplateModalVisible(templateName: string) {
    await expect(this.breadcrumbsTemplateModal.getByText(templateName)).toBeVisible();
  }

  async clickEditTemplateByName(templateName: string) {
    await this.page.locator('uui-ref-node[name="' + templateName + '"]').getByLabel('Choose').click();
  }

  async changeTemplate(oldTemplate: string, newTemplate: string) {
    await this.clickEditTemplateByName(oldTemplate);
    await this.sidebarModal.getByLabel(newTemplate).click();
    await this.clickChooseModalButton();
  }

  async isTemplateNameDisabled(templateName: string) {
    await expect(this.sidebarModal.getByLabel(templateName)).toBeVisible();
    await expect(this.sidebarModal.getByLabel(templateName)).toBeDisabled();
  }

  // Culture and Hostnames
  async clickCultureAndHostnamesButton() {
    await this.cultureAndHostnamesBtn.click();
  }

  async selectCultureLanguageOption(option: string) {
    await expect(this.cultureLanguageDropdownBox).toBeVisible();
    await this.cultureLanguageDropdownBox.click();
    await expect(this.page.getByText(option, {exact: true})).toBeVisible();
    await this.page.getByText(option, {exact: true}).click();
  }

  async selectDomainLanguageOption(option: string, index: number = 0) {
    await this.domainLanguageDropdownBox.nth(index).click();
    await this.domainComboBox.nth(index).getByText(option).click();
  }

  async clickAddNewDomainButton() {
    await expect(this.addNewDomainBtn).toBeVisible();
    await this.addNewDomainBtn.click();
  }

  async enterDomain(value: string, index: number = 0) {
    await expect(this.domainTxt.nth(index)).toBeVisible();
    await this.domainTxt.nth(index).clear();
    await this.domainTxt.nth(index).fill(value);
    await expect(this.domainTxt.nth(index)).toHaveValue(value);
  }

  async clickDeleteDomainButton() {
    await this.deleteDomainBtn.first().click();
  }

  async clickSaveModalButton() {
    await this.saveModalBtn.click();
  }

  async chooseDocumentType(documentTypeName: string) {
    await this.documentTypeNode.filter({hasText: documentTypeName}).click();
  }

  // Approved Color
  async clickApprovedColorByValue(value: string) {
    await this.page.locator('uui-color-swatch[value="#' + value + '"] #swatch').click();
  }

  // Checkbox list
  async chooseCheckboxListOption(optionValue: string) {
    await this.page.locator('uui-checkbox[value="' + optionValue + '"] svg').click();
  }

  // Content Picker
  async addContentPicker(contentName: string) {
    await this.clickChooseButton();
    await this.sidebarModal.getByText(contentName).click();
    await this.chooseModalBtn.click();
  }

  async isOpenButtonVisibleInContentPicker(contentPickerName: string, isVisible: boolean = true) {
    return expect(this.page.getByLabel('Open ' + contentPickerName)).toBeVisible({visible: isVisible});
  }

  async clickContentPickerOpenButton(contentPickerName: string) {
    await this.page.getByLabel('Open ' + contentPickerName).click();
  }

  async isNodeOpenForContentPicker(contentPickerName: string) {
    return expect(this.openedModal.getByText(contentPickerName)).toBeVisible();
  }

  async isContentNameVisible(contentName: string, isVisible: boolean = true) {
    return expect(this.sidebarModal.getByText(contentName)).toBeVisible({visible: isVisible});
  }

  async isContentInTreeVisible(name: string, isVisible: boolean = true) {
    await expect(this.documentTreeItem.getByLabel(name, {exact: true})).toBeVisible({visible: isVisible});
  }

  async isChildContentInTreeVisible(parentName: string, childName: string, isVisible: boolean = true) {
    await expect(this.documentTreeItem.locator('[label="' + parentName + '"]').getByLabel(childName)).toBeVisible({visible: isVisible});
  }

  async removeContentPicker(contentPickerName: string) {
    const contentPickerLocator = this.page.locator('umb-entity-item-ref').filter({has: this.page.locator('[name="' + contentPickerName + '"]')});
    await contentPickerLocator.hover();
    await contentPickerLocator.getByLabel('Remove').click();
    await this.clickConfirmRemoveButton();
  }

  // Dropdown
  async chooseDropdownOption(optionValues: string[]) {
    await this.dropdown.selectOption(optionValues);
  }

  // Date Picker
  async enterADate(date: string) {
    await this.setADateTxt.fill(date);
  }

  // Media Picker
  async clickChooseMediaPickerButton() {
    await this.chooseMediaPickerBtn.click();
  }

  async clickChooseButtonAndSelectMediaWithName(mediaName: string) {
    await this.clickChooseMediaPickerButton();
    await this.selectMediaWithName(mediaName);
  }

  async removeMediaPickerByName(mediaPickerName: string) {
    await this.page.locator('[name="' + mediaPickerName + '"] [label="Remove"] svg').click();
    await this.clickConfirmRemoveButton();
  }

  async isMediaNameVisible(mediaName: string, isVisible: boolean = true) {
    return expect(this.mediaCardItems.filter({hasText: mediaName})).toBeVisible({visible: isVisible});
  }

  async clickResetFocalPointButton() {
    await this.resetFocalPointBtn.click();
  }

  async setFocalPoint(widthPercentage: number = 50, heightPercentage: number = 50) {
    await this.page.waitForTimeout(1000);
    const element = await this.page.locator('#image').boundingBox();
    if (!element) {
      throw new Error('Element not found');
    }

    const centerX = element.x + element.width / 2;
    const centerY = element.y + element.height / 2;

    const x = element.x + (element.width * widthPercentage) / 100;
    const y = element.y + (element.height * heightPercentage) / 100;

    await this.page.waitForTimeout(200);
    await this.page.mouse.move(centerX, centerY, {steps: 5});
    await this.page.waitForTimeout(200);
    await this.page.mouse.down();
    await this.page.waitForTimeout(200);
    await this.page.mouse.move(x, y);
    await this.page.waitForTimeout(200);
    await this.page.mouse.up();
  }

  // Member Picker
  async clickChooseMemberPickerButton() {
    await this.chooseMemberPickerBtn.click();
  }

  async selectMemberByName(memberName: string) {
    await this.sidebarModal.getByText(memberName, {exact: true}).click();
  }

  async removeMemberPickerByName(memberName: string) {
    const mediaPickerLocator = this.page.locator('umb-entity-item-ref').filter({has: this.page.locator('[name="' + memberName + '"]')});
    await mediaPickerLocator.hover();
    await mediaPickerLocator.getByLabel('Remove').click();
    await this.clickConfirmRemoveButton();
  }

  // Numeric
  async enterNumeric(number: number) {
    await this.numericTxt.clear();
    await this.numericTxt.fill(number.toString());
  }

  // Radiobox
  async chooseRadioboxOption(optionValue: string) {
    await this.page.locator('uui-radio[value="' + optionValue + '"] #button').click();
  }

  // Tags
  async clickPlusIconButton() {
    await this.plusIconBtn.click();
  }

  async enterTag(tagName: string) {
    await this.enterTagTxt.fill(tagName);
    await this.enterTagTxt.press('Enter');
  }

  async removeTagByName(tagName: string) {
    await expect(this.tagItems.filter({hasText: tagName}).locator('svg')).toBeVisible();
    await this.tagItems.filter({hasText: tagName}).locator('svg').click();
  }

  // Multi URL Picker
  async clickAddMultiURLPickerButton() {
    await this.addMultiURLPickerBtn.click();
  }

  async selectLinkByName(linkName: string) {
    await this.sidebarModal.getByText(linkName, {exact: true}).click();
  }

  async enterLink(value: string, toPress: boolean = false) {
    await this.linkTxt.clear();
    if (toPress) {
      await this.linkTxt.press(value);
    } else {
      await this.linkTxt.fill(value);
    }
  }

  async enterAnchorOrQuerystring(value: string, toPress: boolean = false) {
    await this.anchorQuerystringTxt.clear();
    if (toPress) {
      await this.anchorQuerystringTxt.press(value);
    } else {
      await this.anchorQuerystringTxt.fill(value);
    }
  }

  async enterLinkTitle(value: string, toPress: boolean = false) {
    await this.linkTitleTxt.clear();
    if (toPress) {
      await this.linkTitleTxt.press(value);
    } else {
      await this.linkTitleTxt.fill(value);
    }
  }

  async removeUrlPickerByName(linkName: string) {
    await this.page.locator('[name="' + linkName + '"]').getByLabel('Remove').click();
    await this.clickConfirmRemoveButton();
  }

  async clickEditUrlPickerButtonByName(linkName: string) {
    await this.page.locator('[name="' + linkName + '"]').getByLabel('Edit').click();
  }

  // Upload
  async clickRemoveFilesButton() {
    await expect(this.removeFilesBtn).toBeVisible();
    await this.removeFilesBtn.click();
  }

  // True/false
  async clickToggleButton() {
    await expect(this.toggleBtn).toBeVisible();
    await this.toggleBtn.click({force: true});
  }

  async doesToggleHaveLabel(label: string) {
    return await expect(this.toggleInput).toHaveText(label);
  }

  // Multiple Text String
  async clickAddMultipleTextStringButton() {
    await this.addMultipleTextStringBtn.click();
  }

  async enterMultipleTextStringValue(value: string) {
    await this.multipleTextStringValueTxt.clear();
    await this.multipleTextStringValueTxt.fill(value);
  }

  async addMultipleTextStringItem(value: string) {
    await this.clickAddMultipleTextStringButton();
    await this.enterMultipleTextStringValue(value);
  }

  // Code Editor
  async enterCodeEditorValue(value: string) {
    await this.codeEditorTxt.clear();
    await this.codeEditorTxt.fill(value);
  }

  // Markdown Editor
  async enterMarkdownEditorValue(value: string) {
    await this.markdownTxt.clear();
    await this.markdownTxt.fill(value);
  }

  // Slider
  async changeSliderValue(value: string) {
    await this.sliderInput.fill(value);
  }

  async isDocumentTypeNameVisible(contentName: string, isVisible: boolean = true) {
    return expect(this.sidebarModal.getByText(contentName)).toBeVisible({visible: isVisible});
  }

  async doesModalHaveText(text: string) {
    return expect(this.sidebarModal).toContainText(text);
  }

  // Collection tab
  async isTabNameVisible(tabName: string) {
    return expect(this.tabItems.filter({hasText: tabName})).toBeVisible();
  }

  async doesDocumentHaveName(name: string) {
    return expect(this.enterAName).toHaveValue(name);
  }

  async doesDocumentTableColumnNameValuesMatch(expectedValues: string[]) {
    await expect(this.documentListView).toBeVisible();
    return expectedValues.forEach((text, index) => {
      expect(this.documentTableColumnName.nth(index)).toHaveText(text);
    });
  }

  async searchByKeywordInCollection(keyword: string) {
    await this.searchTxt.clear();
    await this.searchTxt.fill(keyword);
    await this.searchTxt.press('Enter');
    await this.page.waitForTimeout(500);
  }

  async clickVariantSelectorButton() {
    await this.variantSelectorBtn.click();
  }

  async clickVariantAddModeButton() {
    await this.variantAddModeBtn.first().click();
    await this.page.waitForTimeout(500);
  }

  async clickSaveAndCloseButton() {
    await this.saveAndCloseBtn.click();
  }

  // List View
  async clickCreateContentWithName(name: string) {
    await expect(this.page.getByLabel('Create ' + name)).toBeVisible();
    await this.page.getByLabel('Create ' + name).click();
  }

  async enterNameInContainer(name: string) {
    await expect(this.enterNameInContainerTxt).toBeVisible();
    await this.enterNameInContainerTxt.clear();
    await this.enterNameInContainerTxt.fill(name);
  }

  async goToContentInListViewWithName(contentName: string) {
    await this.listView.getByLabel(contentName).click();
  }

  async doesListViewHaveNoItemsInList() {
    await expect(this.listView.filter({hasText: 'There are no items to show in the list.'})).toBeVisible();
  }

  async doesContentListHaveNoItemsInList() {
    await expect(this.umbDocumentCollection.filter({hasText: 'No items'})).toBeVisible();
  }

  async clickNameButtonInListView() {
    await this.nameBtn.click();
  }

  async doesFirstItemInListViewHaveName(name: string) {
    await expect(this.listViewTableRow.first()).toContainText(name);
  }

  async doesListViewContainCount(count: number) {
    await expect(this.listViewTableRow).toHaveCount(count);
  }

  async selectContentWithNameInListView(name: string) {
    const contentInListViewLocator = this.listViewTableRow.filter({hasText: name});
    await expect(contentInListViewLocator).toBeVisible();
    await contentInListViewLocator.click();
  }

  async clickPublishSelectedListItems() {
    await this.publishSelectedListItems.click();
  }

  async clickUnpublishSelectedListItems() {
    await this.unpublishSelectedListItems.click();
  }

  async clickDuplicateToSelectedListItems() {
    await expect(this.duplicateToSelectedListItems).toBeVisible();
    // This force click is needed 
    await this.duplicateToSelectedListItems.click({force: true});
  }

  async clickMoveToSelectedListItems() {
    await expect(this.moveToSelectedListItems).toBeVisible();
    // This force click is needed
    await this.moveToSelectedListItems.click({force: true});
  }

  async clickTrashSelectedListItems() {
    await this.trashSelectedListItems.click();
  }

  async selectDocumentWithNameAtRoot(name: string) {
    await this.clickCaretButtonForName('Content');
    const documentWithNameLocator = this.modalContent.getByLabel(name);
    await expect(documentWithNameLocator).toBeVisible();
    await documentWithNameLocator.click();
    await this.clickChooseButton();
  }

  async clickTrashButton() {
    await expect(this.trashBtn).toBeVisible();
    await this.trashBtn.click();
  }

  async clickExactTrashButton() {
    await this.exactTrashBtn.click();
  }

  async isDocumentListViewVisible(isVisible: boolean = true) {
    await expect(this.documentListView).toBeVisible({visible: isVisible});
  }

  async isDocumentGridViewVisible(isVisible: boolean = true) {
    await expect(this.documentGridView).toBeVisible({visible: isVisible});
  }

  async changeDocumentSectionLanguage(newLanguageName: string) {
    await this.documentLanguageSelect.click();
    const documentSectionLanguageLocator = this.documentLanguageSelectPopover.getByLabel(newLanguageName);
    await expect(documentSectionLanguageLocator).toBeVisible();
    // Force click is needed
    await documentSectionLanguageLocator.click({force: true});
  }

  async doesDocumentSectionHaveLanguageSelected(languageName: string) {
    await expect(this.documentLanguageSelect).toHaveText(languageName);
  }

  async isDocumentReadOnly(isVisible: boolean = true) {
    await expect(this.documentReadOnly).toBeVisible({visible: isVisible});
  }

  async isDocumentNameInputEditable(isEditable: boolean = true) {
    await expect(this.contentNameTxt).toBeVisible();
    await expect(this.contentNameTxt).toBeEditable({editable: isEditable});
  }

  async isActionsMenuForRecycleBinVisible(isVisible: boolean = true) {
    await this.isActionsMenuForNameVisible('Recycle Bin', isVisible);
  }

  async isActionsMenuForRootVisible(isVisible: boolean = true) {
    await this.isActionsMenuForNameVisible('Content', isVisible);
  }

  async clickEmptyRecycleBinButton() {
    await this.recycleBinMenuItem.hover();
    await expect(this.emptyRecycleBinBtn).toBeVisible();
    // Force click is needed
    await this.emptyRecycleBinBtn.click({force: true});
  }

  async clickConfirmEmptyRecycleBinButton() {
    await this.confirmEmptyRecycleBinBtn.click();
  }

  async isDocumentPropertyEditable(propertyName: string, isEditable: boolean = true) {
    const propertyLocator = this.documentWorkspace.locator(this.property).filter({hasText: propertyName}).locator('#input');
    await expect(propertyLocator).toBeVisible();
    await expect(propertyLocator).toBeEditable({editable: isEditable});
  }

  async doesDocumentPropertyHaveValue(propertyName: string, value: string) {
    const propertyLocator = this.documentWorkspace.locator(this.property).filter({hasText: propertyName}).locator('#input');
    await expect(propertyLocator).toHaveValue(value);
  }

  async clickContentTab() {
    await this.splitView.getByRole('tab', {name: 'Content'}).click();
  }

  async isDocumentTreeEmpty() {
    await expect(this.documentTreeItem).toHaveCount(0);
  }

  async doesDocumentWorkspaceContainName(name: string) {
    await expect(this.documentWorkspaceEditor.locator('#input')).toHaveValue(name);
  }

  async doesDocumentWorkspaceHaveText(text: string) {
    return expect(this.documentWorkspace).toContainText(text);
  }

  async enterDocumentBlueprintName(name: string) {
    await this.documentBlueprintModalEnterNameTxt.clear();
    await this.documentBlueprintModalEnterNameTxt.fill(name);
  }

  async clickSaveDocumentBlueprintButton() {
    await this.documentBlueprintSaveBtn.click();
  }

  async clickDuplicateToButton() {
    await this.duplicateToBtn.click();
  }

  async clickDuplicateButton() {
    await this.duplicateBtn.click();
  }

  async clickMoveToButton() {
    await this.moveToBtn.click();
  }

  async moveToContentWithName(parentNames: string[], moveTo: string) {
    for (const contentName of parentNames) {
      await this.container.getByLabel('Expand child items for ' + contentName).click();
    }
    await this.container.getByLabel(moveTo).click();
    await this.clickChooseContainerButton();
  }

  async isCaretButtonVisibleForContentName(contentName: string, isVisible: boolean = true) {
    await expect(this.page.locator('[label="' + contentName + '"]').getByLabel('Expand child items for ')).toBeVisible({visible: isVisible});
  }

  async reloadContentTree() {
    await expect(this.contentTreeRefreshBtn).toBeVisible();
    // Force click is needed
    await this.contentTreeRefreshBtn.click({force: true});
  }

  async clickSortChildrenButton() {
    await expect(this.sortChildrenBtn).toBeVisible();
    await this.sortChildrenBtn.click();
  }

  async clickRollbackButton() {
    await expect(this.rollbackBtn).toBeVisible();
    await this.rollbackBtn.click();
  }

  async clickRollbackContainerButton() {
    await expect(this.rollbackContainerBtn).toBeVisible();
    await this.rollbackContainerBtn.click();
  }

  async clickLatestRollBackItem() {
    await expect(this.rollbackItem.last()).toBeVisible();
    await this.rollbackItem.last().click();
  }

  async clickPublicAccessButton() {
    await expect(this.publicAccessBtn).toBeVisible();
    await this.publicAccessBtn.click();
  }

  async addGroupBasedPublicAccess(memberGroupName: string, documentName: string) {
    await expect(this.groupBasedProtectionBtn).toBeVisible();
    await this.groupBasedProtectionBtn.click();
    await this.nextBtn.click();
    await this.chooseMemberGroupBtn.click();
    await this.page.getByLabel(memberGroupName).click();
    await this.clickSubmitButton();
    await this.selectLoginPageDocument.click();
    await this.container.getByLabel(documentName, {exact: true}).click();
    await this.modalChooseBtn.click();
    await this.selectErrorPageDocument.click();
    await this.container.getByLabel(documentName, {exact: true}).click();
    await this.modalChooseBtn.click();
    await this.containerSaveBtn.click();
  }

  async sortChildrenDragAndDrop(dragFromSelector: Locator, dragToSelector: Locator, verticalOffset: number = 0, horizontalOffset: number = 0, steps: number = 5) {
    await expect(dragFromSelector).toBeVisible();
    await expect(dragToSelector).toBeVisible();
    const targetLocation = await dragToSelector.boundingBox();
    const elementCenterX = targetLocation!.x + targetLocation!.width / 2;
    const elementCenterY = targetLocation!.y + targetLocation!.height / 2;
    await dragFromSelector.hover();
    await this.page.mouse.move(10, 10);
    await dragFromSelector.hover();
    await this.page.mouse.down();
    await this.page.waitForTimeout(400);
    await this.page.mouse.move(elementCenterX + horizontalOffset, elementCenterY + verticalOffset, {steps: steps});
    await this.page.waitForTimeout(400);
    // If we do not have this, the drag and drop will not work
    await dragToSelector.hover();
    await this.page.mouse.up();
  }

  async clickSortButton() {
    await expect(this.sortBtn).toBeVisible();
    await this.sortBtn.click();
  }

  async doesIndexDocumentInTreeContainName(parentName: string, childName: string, index: number) {
    await expect(this.documentTreeItem.locator('[label="' + parentName + '"]').locator('umb-tree-item').nth(index).locator('#label')).toHaveText(childName);
  }

  async selectMemberGroup(memberGroupName: string) {
    await expect(this.uuiCheckbox.getByLabel(memberGroupName)).toBeVisible();
    await this.uuiCheckbox.getByLabel(memberGroupName).click();
  }

  async isPermissionInActionsMenuVisible(permissionName: string, isVisible: boolean = true) {
    await expect(this.actionsMenu.getByRole('button', {
      name: permissionName,
      exact: true
    })).toBeVisible({visible: isVisible});
  }

  async clickDocumentLinkButton() {
    await expect(this.linkToDocumentBtn).toBeVisible();
    await this.linkToDocumentBtn.click();
  }

  async clickMediaLinkButton() {
    await expect(this.linkToMediaBtn).toBeVisible();
    await this.linkToMediaBtn.click();
  }

  async clickManualLinkButton() {
    await expect(this.linkToManualBtn).toBeVisible();
    await this.linkToManualBtn.click();
  }

  // Block Grid - Block List
  async clickAddBlockElementButton() {
    await expect(this.addBlockElementBtn).toBeVisible();
    await this.addBlockElementBtn.click();
  }

  async clickAddBlockWithNameButton(name: string) {
    await expect(this.page.getByLabel('Add '+ name)).toBeVisible();
    await this.page.getByLabel('Add '+ name).click();
  }
  
  async clickCreateForModalWithHeadline(headline: string) {
    await expect(this.page.locator('[headline="' + headline + '"]').getByLabel('Create')).toBeVisible();
    await this.page.locator('[headline="' + headline + '"]').getByLabel('Create').click();
  }
  
  async isAddBlockElementButtonVisible(isVisible: boolean = true) {
    await expect(this.addBlockElementBtn).toBeVisible({visible: isVisible});
  }

  async isAddBlockElementButtonWithLabelVisible(blockName: string, label: string, isVisible: boolean = true) {
    await expect(this.property.filter({hasText: blockName}).locator(this.addBlockElementBtn).filter({hasText: label})).toBeVisible({visible: isVisible});
  }

  async doesFormValidationMessageContainText(text: string) {
    await expect(this.formValidationMessage).toContainText(text);
  }

  async doesBlockElementHaveName(name: string) {
    await expect(this.blockName).toContainText(name);
  }

  async clickAddBlockSettingsTabButton() {
    await expect(this.addBlockSettingsTabBtn).toBeVisible();
    await this.addBlockSettingsTabBtn.click();
  }

  async clickEditBlockGridBlockButton() {
    await expect(this.blockGridEntry).toBeVisible();
    await this.blockGridEntry.hover();
    await expect(this.editBlockEntryBtn).toBeVisible();
    await this.editBlockEntryBtn.click();
  }

  async clickDeleteBlockGridBlockButton() {
    await expect(this.blockGridEntry).toBeVisible();
    await this.blockGridEntry.hover();
    await expect(this.deleteBlockEntryBtn).toBeVisible();
    await this.deleteBlockEntryBtn.click();
  }

  async clickEditBlockListBlockButton() {
    await expect(this.blockListEntry).toBeVisible();
    await this.blockListEntry.hover();
    await expect(this.editBlockEntryBtn).toBeVisible();
    await this.editBlockEntryBtn.click();
  }

  async clickDeleteBlockListBlockButton() {
    await expect(this.blockListEntry).toBeVisible();
    await this.blockListEntry.hover();
    await expect(this.deleteBlockEntryBtn).toBeVisible();
    await this.deleteBlockEntryBtn.click();
  }

  async clickCopyBlockListBlockButton(groupName: string, propertyName: string, blockName: string, index: number = 0) {
    const blockListBlock = this.workspaceEditTab.filter({hasText: groupName}).locator(this.workspaceEditProperties).filter({hasText: propertyName}).locator(this.blockListEntry).nth(index).filter({hasText: blockName});
    await blockListBlock.hover();
    await expect(blockListBlock.locator(this.copyBlockEntryBtn)).toBeVisible();
    await blockListBlock.locator(this.copyBlockEntryBtn).click({force: true});
    await this.page.waitForTimeout(500);
  }

  async clickCopyBlockGridBlockButton(groupName: string, propertyName: string, blockName: string, index: number = 0) {
    const blockGridBlock = this.workspaceEditTab.filter({hasText: groupName}).locator(this.workspaceEditProperties).filter({hasText: propertyName}).locator(this.blockGridEntry).nth(index).filter({hasText: blockName});
    await blockGridBlock.hover();
    await expect(blockGridBlock.locator(this.copyBlockEntryBtn)).toBeVisible();
    await blockGridBlock.locator(this.copyBlockEntryBtn).click({force: true});
    await this.page.waitForTimeout(500);
  }

  async clickPasteFromClipboardButtonForProperty(groupName: string, propertyName: string) {
    await this.page.waitForTimeout(500);
    const property = this.workspaceEditTab.filter({hasText: groupName}).locator(this.property).filter({hasText: propertyName});
    await expect(property).toBeVisible();
    await expect(property.locator(this.pasteFromClipboardBtn)).toBeVisible();
    await property.locator(this.pasteFromClipboardBtn).click({force: true});
  }

  async clickActionsMenuForProperty(groupName: string, propertyName: string) {
    const property = this.workspaceEditTab.filter({hasText: groupName}).locator(this.workspaceEditProperties).filter({hasText: propertyName});
    await property.hover();
    await expect(property.locator(this.openActionsMenu)).toBeVisible();
    await property.locator(this.openActionsMenu).click({force: true});
  }

  async clickAddBlockGridElementWithName(elementTypeName: string) {
    await expect(this.page.getByRole('link', {name: 'Add ' + elementTypeName, exact: true})).toBeVisible();
    await this.page.getByRole('link', {name: 'Add ' + elementTypeName, exact: true}).click();
  }

  async clickEditBlockListEntryWithName(blockListElementName: string) {
    await expect(this.blockListEntry.filter({hasText: blockListElementName}).getByLabel('edit')).toBeVisible();
    await this.blockListEntry.filter({hasText: blockListElementName}).getByLabel('edit').click({force: true});
  }

  async clickSelectBlockElementWithName(elementTypeName: string) {
    await expect(this.page.getByRole('button', {name: elementTypeName, exact: true})).toBeVisible();
    await this.page.getByRole('button', {name: elementTypeName, exact: true}).click();
  }

  async clickSelectBlockElementInAreaWithName(elementTypeName: string) {
    await expect(this.container.getByRole('button', {name: elementTypeName, exact: true})).toBeVisible();
    await this.container.getByRole('button', {name: elementTypeName, exact: true}).click();
  }

  async clickBlockElementWithName(elementTypeName: string) {
    await expect(this.page.getByRole('link', {name: elementTypeName, exact: true})).toBeVisible();
    await this.page.getByRole('link', {name: elementTypeName, exact: true}).click({force: true});
  }

  async enterPropertyValue(propertyName: string, value: string) {
    const property = this.property.filter({hasText: propertyName});
    await expect(property).toBeVisible();
    await property.locator('input').clear();
    await property.locator('input').fill(value);
  }

  async doesBlockContainBlockInAreaWithName(blockWithAreaName: string, areaName: string, blockInAreaName: string, index: number = 0) {
    const blockWithArea = this.blockGridEntry.locator(this.blockGridBlock.filter({hasText: blockWithAreaName})).nth(index);
    const area = blockWithArea.locator(this.blockGridAreasContainer).locator('[data-area-alias="' + areaName + '"]');
    const blockInArea = area.locator(this.blockGridEntry.filter({hasText: blockInAreaName}));
    await expect(blockInArea).toBeVisible();
  }

  async doesBlockContainBlockCountInArea(blockWithAreaName: string, areaName: string, blocksInAreaCount: number, index: number = 0) {
    const blockWithArea = this.blockGridEntry.locator(this.blockGridBlock.filter({hasText: blockWithAreaName})).nth(index);
    const area = blockWithArea.locator(this.blockGridAreasContainer).locator('[data-area-alias="' + areaName + '"]');
    const blocks = area.locator(this.blockGridEntry);
    await expect(blocks).toHaveCount(blocksInAreaCount);
  }

  async doesBlockContainCountOfBlockInArea(blockWithAreaName: string, areaName: string, blockInAreaName: string, count: number, index: number = 0) {
    const blockWithArea = this.blockGridEntry.locator(this.blockGridBlock.filter({hasText: blockWithAreaName})).nth(index);
    const area = blockWithArea.locator(this.blockGridAreasContainer).locator('[data-area-alias="' + areaName + '"]');
    const blockInArea = area.locator(this.blockGridEntry.filter({hasText: blockInAreaName}));
    await expect(blockInArea).toHaveCount(count);
  }

  async getBlockAtRootDataElementKey(blockName: string, index: number = 0) {
    const blockGridEntrySelector = 'umb-block-grid-entry';
    return this.blockGridEntries.locator(`.umb-block-grid__layout-container > ${blockGridEntrySelector}`).filter({hasText: blockName}).nth(index).getAttribute('data-element-key');
  }

  async getBlockAreaKeyFromParentBlockDataElementKey(parentKey: string, index: number = 0) {
    const block = this.page.locator(`[data-element-key="${parentKey}"]`);
    return block.locator(this.blockGridAreasContainer).locator('.umb-block-grid__area-container > umb-block-grid-entries').nth(index).getAttribute('area-key');
  }

  async getBlockDataElementKeyInArea(parentBlockName: string, areaName: string, blockName: string, parentIndex: number = 0, childIndex: number = 0) {
    const parentBlock = this.blockGridEntry.locator(this.blockGridBlock.filter({hasText: parentBlockName})).nth(parentIndex);
    const area = parentBlock.locator(this.blockGridAreasContainer).locator('[data-area-alias="' + areaName + '"]');
    const block = area.locator(this.blockGridEntry.filter({hasText: blockName})).nth(childIndex);
    return block.getAttribute('data-element-key');
  }

  async removeBlockFromArea(parentBlockName: string, areaName: string, blockName: string, parentIndex: number = 0, childIndex: number = 0) {
    const parentBlock = this.blockGridEntry.locator(this.blockGridBlock.filter({hasText: parentBlockName})).nth(parentIndex);
    const area = parentBlock.locator(this.blockGridAreasContainer).locator('[data-area-alias="' + areaName + '"]');
    const block = area.locator(this.blockGridEntry.filter({hasText: blockName})).nth(childIndex);
    await block.hover();
    await block.getByLabel('delete').click({force: true});
  }

  async doesBlockAreaContainColumnSpan(blockWithAreaName: string, areaName: string, columnSpan: number, index: number = 0) {
    const blockWithArea = this.blockGridEntry.locator(this.blockGridBlock.filter({hasText: blockWithAreaName})).nth(index);
    const area = blockWithArea.locator(this.blockGridAreasContainer).locator('[data-area-alias="' + areaName + '"]');
    await expect(area).toHaveAttribute('data-area-col-span', columnSpan.toString());
  }

  async doesBlockAreaContainRowSpan(blockWithAreaName: string, areaName: string, rowSpan: number, index: number = 0) {
    const blockWithArea = this.blockGridEntry.locator(this.blockGridBlock.filter({hasText: blockWithAreaName})).nth(index);
    const area = blockWithArea.locator(this.blockGridAreasContainer).locator('[data-area-alias="' + areaName + '"]');
    await expect(area).toHaveAttribute('data-area-row-span', rowSpan.toString());
  }

  async clickInlineAddToAreaButton(parentBlockName: string, areaName: string, parentIndex: number = 0, buttonIndex: number = 1) {
    const parentBlock = this.blockGridEntry.locator(this.blockGridBlock.filter({hasText: parentBlockName})).nth(parentIndex);
    const area = parentBlock.locator(this.blockGridAreasContainer).locator('[data-area-alias="' + areaName + '"]');
    await area.locator(this.inlineCreateBtn).nth(buttonIndex).click();
  }

  async addBlockToAreasWithExistingBlock(blockWithAreaName: string, areaName: string, parentIndex: number = 0, addToIndex: number = 0) {
    const blockWithArea = this.blockGridEntry.locator(this.blockGridBlock).filter({hasText: blockWithAreaName}).nth(parentIndex);
    await expect(blockWithArea).toBeVisible();
    await blockWithArea.hover();
    const area = blockWithArea.locator(this.blockGridAreasContainer).locator('[data-area-alias="' + areaName + '"]');
    const addBlockBtn = area.locator(this.inlineCreateBtn).nth(addToIndex);
    await addBlockBtn.hover({force: true});
    await addBlockBtn.click({force: true});
  }

  async doesBlockGridBlockWithAreaContainCreateLabel(blockWithAreaName: string, createLabel: string, index: number = 0) {
    const blockWithArea = this.blockGridEntry.locator(this.blockGridBlock.filter({hasText: blockWithAreaName})).nth(index);
    return expect(blockWithArea.locator(this.blockGridAreasContainer).getByLabel(createLabel)).toBeVisible();
  }

  async doesPropertyContainValue(propertyName: string, value: string) {
    await expect(this.property.filter({hasText: propertyName}).locator('input')).toHaveValue(value);
  }

  async clickCreateButtonForModalWithElementTypeNameAndGroupName(headlineName: string, groupName: string) {
    await expect(this.blockWorkspace.filter({hasText: 'Add ' + headlineName}).filter({hasText: groupName}).getByLabel('Create')).toBeVisible();
    await this.blockWorkspace.filter({hasText: 'Add ' + headlineName}).filter({hasText: groupName}).getByLabel('Create').click();
  }

  async clickUpdateButtonForModalWithElementTypeNameAndGroupName(headlineName: string, groupName: string) {
    await expect(this.blockWorkspace.filter({hasText: 'Edit ' + headlineName}).filter({hasText: groupName}).locator(this.updateBtn)).toBeVisible();
    await this.blockWorkspace.filter({hasText: 'Edit ' + headlineName}).filter({hasText: groupName}).locator(this.updateBtn).click();
  }

  async clickExactCopyButton() {
    await expect(this.exactCopyBtn).toBeVisible();
    await this.exactCopyBtn.click();
  }

  async clickExactReplaceButton() {
    await expect(this.replaceExactBtn).toBeVisible();
    await this.replaceExactBtn.click();
  }

  async doesClipboardHaveCopiedBlockWithName(contentName: string, propertyName: string, blockName: string, index: number = 0) {
    await expect(this.clipboardEntryPicker.getByLabel(`${contentName} - ${propertyName} - ${blockName}`).nth(index)).toBeVisible();
  }

  async doesClipboardHaveCopiedBlocks(contentName: string, propertyName: string, index: number = 0) {
    await expect(this.clipboardEntryPicker.getByLabel(`${contentName} - ${propertyName}`).nth(index)).toBeVisible();
  }

  async doesClipboardContainCopiedBlocksCount(count: number) {
    await expect(this.clipboardEntryPicker.locator(this.menuItem)).toHaveCount(count);
  }

  async selectClipboardEntryWithName(contentName: string, propertyName: string, blockName: string, index: number = 0) {
    await this.doesClipboardHaveCopiedBlockWithName(contentName, propertyName, blockName, index);
    await this.clipboardEntryPicker.getByLabel(`${contentName} - ${propertyName} - ${blockName}`).nth(index).click();
  }

  async selectClipboardEntriesWithName(contentName: string, propertyName: string, index: number = 0) {
    await this.doesClipboardHaveCopiedBlocks(contentName, propertyName, index);
    await this.clipboardEntryPicker.getByLabel(`${contentName} - ${propertyName}`).nth(index).click();
  }

  async goToBlockGridBlockWithName(groupName: string, propertyName: string, blockName: string, index: number = 0) {
    const blockGridBlock = this.workspaceEditTab.filter({hasText: groupName}).locator(this.workspaceEditProperties).filter({hasText: propertyName}).locator(this.blockGridEntry).nth(index).filter({hasText: blockName});
    await expect(blockGridBlock).toBeVisible();
    await blockGridBlock.click();
  }

  async goToBlockListBlockWithName(groupName: string, propertyName: string, blockName: string, index: number = 0) {
    const blocklistBlock = this.workspaceEditTab.filter({hasText: groupName}).locator(this.workspaceEditProperties).filter({hasText: propertyName}).locator(this.blockListEntry).nth(index).filter({hasText: blockName});
    await expect(blocklistBlock).toBeVisible();
    await blocklistBlock.click();
  }

  async doesBlockEditorBlockWithNameContainValue(groupName: string, propertyName: string, inputType: string = ConstantHelper.inputTypes.general, value) {
    await expect(this.blockWorkspaceEditTab.filter({hasText: groupName}).locator(this.property).filter({hasText: propertyName}).locator(inputType)).toContainText(value)
  }

  async clickCloseButton() {
    await expect(this.closeBtn).toBeVisible();
    await this.closeBtn.click();
  }

  async clickPasteButton() {
    await expect(this.pasteBtn).toBeVisible();
    await this.pasteBtn.click({force: true});
  }

  async doesBlockListPropertyHaveBlockAmount(groupName: string, propertyName: string, amount: number) {
    await expect(this.workspaceEditTab.filter({hasText: groupName}).locator(this.workspaceEditProperties).filter({hasText: propertyName}).locator(this.blockListEntry)).toHaveCount(amount);
  }

  async doesBlockGridPropertyHaveBlockAmount(groupName: string, propertyName: string, amount: number) {
    await expect(this.workspaceEditTab.filter({hasText: groupName}).locator(this.workspaceEditProperties).filter({hasText: propertyName}).locator(this.blockGridEntry)).toHaveCount(amount);
  }

  async doesPropertyContainValidationMessage(groupName: string, propertyName: string, message: string) {
    await expect(this.blockWorkspaceEditTab.filter({hasText: groupName}).locator(this.property).filter({hasText: propertyName}).locator(this.validationMessage)).toContainText(message);
  }

  async clickInsertBlockButton() {
    await expect(this.insertBlockBtn).toBeVisible();
    await this.insertBlockBtn.click();
  }

  // TipTap
  async enterRTETipTapEditor(value: string) {
    await expect(this.tipTapEditor).toBeVisible();
    await this.tipTapEditor.clear();
    await this.tipTapEditor.fill(value);
  }
  
  async enterRTETipTapEditorWithName(name: string , value: string){
    const tipTapEditorLocator = this.page.locator('[data-mark="property:' + name + '"]').locator(this.tipTapEditor);
    await expect(tipTapEditorLocator).toBeVisible();
    await tipTapEditorLocator.clear();
    await tipTapEditorLocator.fill(value);
  }

  async clickTipTapToolbarIconWithTitle(iconTitle: string) {
    await expect(this.tipTapPropertyEditor.getByTitle(iconTitle, {exact: true}).locator('svg')).toBeVisible();
    await this.tipTapPropertyEditor.getByTitle(iconTitle, {exact: true}).locator('svg').click();
  }

  async doesUploadedSvgThumbnailHaveSrc(imageSrc: string) {
    await expect(this.uploadedSvgThumbnail).toBeVisible();
    await expect(this.uploadedSvgThumbnail).toHaveAttribute('src', imageSrc);
  }

  async doesRichTextEditorBlockContainLabel(richTextEditorAlias: string, label: string) {
    await expect(this.page.locator('[data-mark="property:' + richTextEditorAlias + '"]').locator(this.rteBlock)).toContainText(label);
  }

  async doesBlockEditorModalContainEditorSize(editorSize: string, elementName: string) {
    await expect(this.backofficeModalContainer.locator('[size="' + editorSize + '"]').locator('[headline="Add ' + elementName + '"]')).toBeVisible();
  }

  async doesBlockEditorModalContainInline(richTextEditorAlias: string, elementName: string) {
    await expect(this.page.locator('[data-mark="property:' + richTextEditorAlias + '"]').locator(this.tiptapInput).locator(this.rteBlockInline)).toContainText(elementName);
  }

  async doesBlockHaveBackgroundColor(elementName: string, backgroundColor: string) {
    await expect(this.page.locator('umb-block-type-card', {hasText: elementName}).locator('[style="background-color:' + backgroundColor + ';"]')).toBeVisible();
  }

  async doesBlockHaveIconColor(elementName: string, backgroundColor: string) {
    await expect(this.page.locator('umb-block-type-card', {hasText: elementName}).locator('[color="' + backgroundColor + '"]')).toBeVisible();
  }

  async addDocumentDomain(domainName: string, languageName: string) {
    await this.clickCultureAndHostnamesButton();
    await this.clickAddNewDomainButton();
    await this.enterDomain(domainName);
    await this.selectDomainLanguageOption(languageName);
    await this.clickSaveModalButton();
  }

  // Scheduled Publishing
  async clickViewMoreOptionsButton() {
    await expect(this.viewMoreOptionsBtn).toBeVisible();
    await this.viewMoreOptionsBtn.click();
  }

  async clickScheduleButton() {
    await expect(this.scheduleBtn).toBeVisible();
    await this.scheduleBtn.click();
  }

  async clickScheduleModalButton() {
    await expect(this.scheduleModalBtn).toBeVisible();
    await this.scheduleModalBtn.click();
  }

  async enterPublishTime(time: string, index: number = 0) {
    const publishAtTxt = this.documentScheduleModal.locator('.publish-date').nth(index).locator('uui-form-layout-item').first().locator('#input');
    await expect(publishAtTxt).toBeVisible();
    await publishAtTxt.fill(time);
  }

  async enterUnpublishTime(time: string, index: number = 0) {
    const unpublishAtTxt = this.documentScheduleModal.locator('.publish-date').nth(index).locator('uui-form-layout-item').last().locator('#input');
    await expect(unpublishAtTxt).toBeVisible();
    await unpublishAtTxt.fill(time);
  }

  async doesPublishAtValidationMessageContainText(text: string) {
    await expect(this.publishAtValidationMessage).toContainText(text);
  }

  async doesUnpublishAtValidationMessageContainText(text: string) {
    await expect(this.unpublishAtValidationMessage).toContainText(text);
  }

  async doesLastPublishedContainText(text: string) {
    await expect(this.lastPublished).toContainText(text);
  }

  async doesPublishAtContainText(text: string) {
    await expect(this.publishAt).toContainText(text);
  }

  async doesRemoveAtContainText(text: string) {
    await expect(this.removeAt).toContainText(text);
  }

  async clickSelectAllCheckbox() {
    await expect(this.selectAllCheckbox).toBeVisible();
    await this.selectAllCheckbox.click();
  }

  async doesSchedulePublishModalButtonContainDisabledTag(hasDisabledTag: Boolean = false)
  {
    const button = this.page.locator('uui-button[label="Schedule"]');

    if (!hasDisabledTag) {
      return await expect(button).not.toHaveAttribute('disabled', '');
    }
    return await expect(button).toHaveAttribute('disabled', '');
  }

  async clickInlineBlockCaretButtonForName(blockEditorName: string, index: number = 0) {
    const caretButtonLocator = this.blockListEntry.filter({hasText: blockEditorName}).nth(index).locator('uui-symbol-expand svg');
    await expect(caretButtonLocator).toBeVisible();
    await caretButtonLocator.click();
  }

  async clickBlockCardWithName(name: string, toForce: boolean = false) {
    const blockWithNameLocator = this.page.locator('umb-block-type-card', {hasText: name});
    await expect(blockWithNameLocator).toBeVisible();
    await blockWithNameLocator.click({force: toForce});
  }
  
  async doesTiptapHaveWordCount(count: number) {
    await expect(this.tiptapStatusbarWordCount).toHaveText(count.toString() + ' words');
  }
  
   async doesTiptapHaveCharacterCount(count: number) {
    await expect(this.tiptapStatusbarWordCount).toHaveText(count.toString() + ' characters');
  }

  async clickTiptapWordCountButton() {
    await expect(this.tiptapStatusbarWordCount).toBeVisible();
    await this.tiptapStatusbarWordCount.click();
  }

  async doesElementPathHaveText(text: string) {
    await expect(this.tiptapStatusbarElementPath).toHaveText(text);
  }

  async clickStyleSelectButton() {
    await expect(this.styleSelectBtn).toBeVisible();
    await this.styleSelectBtn.click();
  }

  async clickCascadingMenuItemWithName(name: string) {
    const menuItemLocator = this.cascadingMenuContainer.locator('uui-menu-item[label="' + name + '"]');
    await expect(menuItemLocator).toBeVisible();
    await menuItemLocator.click();
  }

  async hoverCascadingMenuItemWithName(name: string) {
    const menuItemLocator = this.cascadingMenuContainer.locator('uui-menu-item[label="' + name + '"]');
    await expect(menuItemLocator).toBeVisible();
    await menuItemLocator.hover();
  }

  async selectAllRTETipTapEditorText() {
    await expect(this.tipTapEditor).toBeVisible();
    await this.tipTapEditor.click();
    await this.page.keyboard.press('Control+A');
  }
}