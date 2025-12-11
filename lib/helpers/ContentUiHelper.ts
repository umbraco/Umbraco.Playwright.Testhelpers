import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";
import {ConstantHelper} from "./ConstantHelper";

export class ContentUiHelper extends UiBaseLocators {
  private readonly contentNameTxt: Locator;
  private readonly saveAndPublishBtn: Locator;
  private readonly publishBtn: Locator;
  private readonly unpublishBtn: Locator;
  private readonly actionMenuForContentBtn: Locator;
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
  private readonly addNewHostnameBtn: Locator;
  private readonly hostnameTxt: Locator;
  private readonly hostnameLanguageDropdownBox: Locator;
  private readonly deleteHostnameBtn: Locator;
  private readonly reloadChildrenThreeDotsBtn: Locator;
  private readonly contentTree: Locator;
  private readonly richTextAreaTxt: Locator;
  private readonly textAreaTxt: Locator;
  private readonly plusIconBtn: Locator;
  private readonly enterTagTxt: Locator;
  private readonly menuItemTree: Locator;
  private readonly hostnameComboBox: Locator;
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
  private readonly sliderInput: Locator;
  private readonly tabItems: Locator;
  private readonly documentWorkspace: Locator;
  private readonly searchTxt: Locator;
  private readonly selectAVariantBtn: Locator;
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
  private readonly containerSaveBtn: Locator
  private readonly groupBasedProtectionBtn: Locator;
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
  private readonly schedulePublishBtn: Locator;
  private readonly schedulePublishModalBtn: Locator;
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
  private readonly confirmToPublishBtn: Locator;
  private readonly tiptapStatusbarWordCount: Locator;
  private readonly tiptapStatusbarElementPath: Locator;
  private readonly publishWithDescendantsBtn: Locator;
  private readonly documentPublishWithDescendantsModal: Locator;
  private readonly includeUnpublishedDescendantsToggle: Locator;
  private readonly publishWithDescendantsModalBtn: Locator;
  private readonly documentVariantLanguagePicker: Locator;
  private readonly documentVariantLanguageItem: Locator;
  private readonly styleSelectBtn: Locator;
  private readonly cascadingMenuContainer: Locator;
  private readonly modalFormValidationMessage: Locator;
  private readonly treePickerSearchTxt: Locator;
  private readonly mediaPickerSearchTxt: Locator;
  private readonly memberPickerSearchTxt: Locator;
  private readonly documentCreateOptionsModal: Locator;
  private readonly refListBlock: Locator;
  private readonly propertyActionMenu: Locator;
  private readonly listViewCustomRows: Locator;
  private readonly collectionMenu: Locator;
  private readonly entityPickerTree: Locator;
  private readonly hostNameItem: Locator;
  private readonly languageToggle: Locator;
  private readonly contentVariantDropdown: Locator;
  private readonly blockProperty: Locator;

  constructor(page: Page) {
    super(page);
    this.saveContentBtn = page.getByTestId('workspace-action:Umb.WorkspaceAction.Document.Save');
    this.saveAndPublishBtn = page.getByTestId('workspace-action:Umb.WorkspaceAction.Document.SaveAndPublish');
    this.closeBtn = page.getByRole('button', {name: 'Close', exact: true});
    this.linkPickerModal = page.locator('umb-link-picker-modal');
    this.contentNameTxt = page.locator('#name-input input');
    this.publishBtn = page.getByLabel(/^Publish(…)?$/);
    this.unpublishBtn = page.getByLabel(/^Unpublish(…)?$/);
    this.actionMenuForContentBtn = page.locator('#header').getByTestId('open-dropdown');
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
    this.linkTxt = page.getByTestId('input:url').locator('#input');
    this.anchorQuerystringTxt = page.getByLabel('#value or ?key=value');
    this.linkTitleTxt = this.linkPickerModal.getByLabel('Title');
    this.tagItems = page.locator('uui-tag');
    this.removeFilesBtn = page.locator('umb-input-upload-field [label="Clear file(s)"]');
    this.toggleBtn = page.locator('umb-property-editor-ui-toggle #toggle');
    this.toggleInput = page.locator('umb-property-editor-ui-toggle span');
    this.documentTypeWorkspace = this.sidebarModal.locator('umb-document-type-workspace-editor');
    this.addMultipleTextStringBtn = page.locator('umb-input-multiple-text-string').getByLabel('Add');
    this.multipleTextStringValueTxt = page.locator('umb-input-multiple-text-string').getByLabel('Value');
    this.sliderInput = page.locator('umb-property-editor-ui-slider #input');
    this.tabItems = page.locator('uui-tab');
    this.documentWorkspace = page.locator('umb-document-workspace-editor');
    this.searchTxt = this.documentWorkspace.getByLabel('Search', {exact: true});
    this.selectAVariantBtn = page.getByRole('button', {name: 'Open version selector'});
    this.variantAddModeBtn = page.locator('.switch-button.add-mode').locator('.variant-name');
    this.saveAndCloseBtn = page.getByLabel('Save and close');
    this.documentTreeItem = page.locator('umb-document-tree-item');
    this.documentLanguageSelect = page.locator('umb-app-language-select');
    this.documentLanguageSelectPopover = page.locator('umb-popover-layout');
    this.documentReadOnly = this.documentWorkspace.locator('#name-input').getByText('Read-only');
    // Info tab
    this.infoTab = page.getByTestId('workspace:view-link:Umb.WorkspaceView.Document.Info');
    this.linkContent = page.locator('umb-document-links-workspace-info-app');
    this.historyItems = page.locator('umb-history-item');
    this.generalItem = page.locator('.general-item');
    this.documentState = this.generalItem.locator('uui-tag');
    this.createdDate = this.generalItem.filter({hasText: 'Created'}).locator('umb-localize-date');
    this.editDocumentTypeBtn = this.generalItem.filter({hasText: 'Document Type'}).locator('#button');
    this.addTemplateBtn = this.generalItem.filter({hasText: 'Template'}).locator('#button');
    this.id = this.generalItem.filter({hasText: 'Id'}).locator('span');
    this.documentCreateOptionsModal = page.locator('umb-document-create-options-modal');
    // Culture and Hostname
    this.cultureAndHostnamesBtn = page.getByLabel(/^Culture and Hostnames(…)?$/);
    this.hostNameItem = page.locator('.hostname-item');
    this.cultureLanguageDropdownBox = this.hostNameItem.locator('[label="Culture"]').getByLabel('combobox-input');
    this.hostnameTxt = page.getByLabel('Hostname', {exact: true});
    this.hostnameLanguageDropdownBox = this.hostNameItem.locator('[label="Culture"]').getByLabel('combobox-input');
    this.deleteHostnameBtn = this.hostNameItem.locator('[name="icon-trash"] svg');
    this.hostnameComboBox = this.hostNameItem.locator('[label="Culture"]').locator('uui-combobox-list-option');
    this.saveModalBtn = this.sidebarModal.getByLabel('Save', {exact: true});
    this.resetFocalPointBtn = page.getByLabel('Reset focal point');
    this.addNewHostnameBtn = page.getByLabel('Add new hostname');
    // List View
    this.enterNameInContainerTxt = this.container.getByTestId('input:entity-name').locator('#input');
    this.listView = page.locator('umb-document-table-collection-view');
    this.nameBtn = page.getByRole('button', { name: 'Name', exact: true });
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
    this.emptyRecycleBinBtn = page.getByTestId('entity-action:Umb.EntityAction.Document.RecycleBin.Empty').locator('#button');
    this.confirmEmptyRecycleBinBtn = page.locator('#confirm').getByLabel('Empty Recycle Bin', {exact: true});
    this.duplicateToBtn = page.getByRole('button', {name: 'Duplicate to'});
    this.moveToBtn = page.getByRole('button', {name: 'Move to'});
    this.duplicateBtn = page.getByLabel('Duplicate', {exact: true});
    this.contentTreeRefreshBtn = page.locator('#header').getByLabel('#actions_refreshNode');
    this.sortChildrenBtn = page.getByRole('button', {name: 'Sort children'});
    this.rollbackBtn = page.getByRole('button', { name: 'Rollback…' });
    this.rollbackContainerBtn = this.container.getByLabel('Rollback');
    this.publicAccessBtn = page.getByRole('button', {name: 'Public Access'});
    this.uuiCheckbox = page.locator('uui-checkbox');
    this.sortBtn = page.getByLabel('Sort', {exact: true});
    this.containerSaveBtn = this.container.getByLabel('Save');
    this.groupBasedProtectionBtn = page.locator('span').filter({hasText: 'Group based protection'});
    this.chooseMemberGroupBtn = page.locator('umb-input-member-group').getByLabel('Choose');
    this.selectLoginPageDocument = page.locator('.select-item').filter({hasText: 'Login Page'}).locator('umb-input-document');
    this.selectErrorPageDocument = page.locator('.select-item').filter({hasText: 'Error Page'}).locator('umb-input-document');
    this.rollbackItem = page.locator('.rollback-item');
    this.actionsMenu = page.locator('uui-scroll-container');
    this.linkToDocumentBtn = this.linkPickerModal.getByTestId('action:document').locator('#button');
    this.linkToMediaBtn = this.linkPickerModal.getByTestId('action:media').locator('#button');
    this.linkToManualBtn = this.linkPickerModal.getByTestId('action:external').locator('#button');
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
    this.openActionsMenu = page.locator('#action-menu');
    this.replaceExactBtn = page.getByRole('button', {name: 'Replace', exact: true});
    this.clipboardEntryPicker = page.locator('umb-clipboard-entry-picker');
    this.blockGridAreasContainer = page.locator('umb-block-grid-areas-container');
    this.blockGridEntries = page.locator('umb-block-grid-entries');
    this.inlineCreateBtn = page.locator('uui-button-inline-create');
    this.refListBlock = page.locator('umb-ref-list-block');
    // TipTap
    this.tipTapPropertyEditor = page.locator('umb-property-editor-ui-tiptap');
    this.tipTapEditor = this.tipTapPropertyEditor.locator('#editor .tiptap');
    this.uploadedSvgThumbnail = page.locator('umb-input-upload-field-svg img');
    this.insertBlockBtn = page.getByTestId('action:tiptap-toolbar:Umb.Tiptap.Toolbar.BlockPicker');
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
    this.schedulePublishBtn = this.workspaceActionMenuItem.getByLabel('Schedule publish', {exact: true});
    this.documentScheduleModal = page.locator('umb-document-schedule-modal');
    this.schedulePublishModalBtn = this.documentScheduleModal.getByLabel('Schedule publish', {exact: true});
    this.publishAtFormLayout = this.documentScheduleModal.locator('uui-form-layout-item').first();
    this.unpublishAtFormLayout = this.documentScheduleModal.locator('uui-form-layout-item').last();
    this.publishAtValidationMessage = this.publishAtFormLayout.locator('#messages');
    this.unpublishAtValidationMessage = this.unpublishAtFormLayout.locator('#messages');
    this.lastPublished = this.generalItem.filter({hasText: 'Last published'}).locator('umb-localize-date');
    this.publishAt = this.generalItem.filter({hasText: 'Publish at'}).locator('umb-localize-date');
    this.removeAt = this.generalItem.filter({hasText: 'Remove at'}).locator('umb-localize-date');
    this.selectAllCheckbox = this.documentScheduleModal.locator('[label="Select all"]');
    this.confirmToPublishBtn = page.locator('umb-document-publish-modal').getByLabel('Publish');
    // Publish with descendants 
    this.documentPublishWithDescendantsModal = page.locator('umb-document-publish-with-descendants-modal');
    this.publishWithDescendantsBtn = this.workspaceActionMenuItem.getByLabel('Publish with descendants', {exact: true});
    this.includeUnpublishedDescendantsToggle = this.documentPublishWithDescendantsModal.locator('#includeUnpublishedDescendants');
    this.publishWithDescendantsModalBtn = this.documentPublishWithDescendantsModal.getByLabel('Publish with descendants', {exact: true});
    this.documentVariantLanguagePicker = page.locator('umb-document-variant-language-picker');
    this.documentVariantLanguageItem = this.documentVariantLanguagePicker.locator('uui-menu-item');
    // Tiptap - Style Select
    this.styleSelectBtn = page.locator('uui-button[label="Style Select"]');
    this.cascadingMenuContainer = page.locator('umb-cascading-menu-popover uui-scroll-container');
    this.modalFormValidationMessage = this.sidebarModal.locator('umb-form-validation-message #messages');
    this.treePickerSearchTxt = this.page.locator('umb-tree-picker-modal #input');
    this.mediaPickerSearchTxt = this.page.locator('umb-media-picker-modal #search #input');
    this.memberPickerSearchTxt = this.page.locator('umb-member-picker-modal #input');
    // Property Actions
    this.propertyActionMenu = page.locator('#property-action-popover umb-popover-layout');
    // List view custom
    this.listViewCustomRows = page.locator('table tbody tr');
    // Entity Data Picker
    this.collectionMenu = page.locator('umb-collection-menu');
    this.entityPickerTree = page.locator('umb-tree[alias="Umb.Tree.EntityDataPicker"]');
    this.languageToggle = page.getByTestId('input:entity-name').locator('#toggle');
    this.contentVariantDropdown = page.locator('umb-document-workspace-split-view-variant-selector uui-popover-container #dropdown');
    this.blockProperty = page.locator('umb-block-workspace-view-edit-property');
  }

  async enterContentName(name: string) {
    await expect(this.contentNameTxt).toBeVisible();
    await this.contentNameTxt.clear();
    await this.contentNameTxt.fill(name);
    await expect(this.contentNameTxt).toHaveValue(name);
  }

  async clickSaveAndPublishButton() {
    await this.click(this.saveAndPublishBtn);
    await this.page.waitForTimeout(ConstantHelper.wait.short);
  }

  async isSuccessStateVisibleForSaveAndPublishButton (isVisible: boolean = true){
    const saveAndPublishBtn = this.workspaceAction.filter({has: this.saveAndPublishBtn});
    await expect(saveAndPublishBtn.locator(this.successState)).toBeVisible({visible: isVisible, timeout: ConstantHelper.timeout.long});
  }

  async clickPublishButton() {
    await this.click(this.publishBtn);
    await this.page.waitForTimeout(ConstantHelper.wait.short);
  }

  async clickUnpublishButton() {
    await this.click(this.unpublishBtn);
  }

  async clickReloadChildrenThreeDotsButton() {
    await this.click(this.reloadChildrenThreeDotsBtn);
  }

  async clickActionsMenuAtRoot() {
    await this.click(this.actionMenuForContentBtn, {force: true});
  }

  async goToContentWithName(contentName: string) {
    const contentWithNameLocator = this.menuItemTree.getByText(contentName, {exact: true});
    await this.click(contentWithNameLocator);
  }

  async clickActionsMenuForContent(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async openContentCaretButtonForName(name: string) {
    const menuItem = this.menuItemTree.filter({hasText: name}).last()
    const isCaretButtonOpen = await menuItem.getAttribute('show-children');

    if (isCaretButtonOpen === null) {
      await this.clickCaretButtonForContentName(name);
    }
  }

  async clickCaretButtonForContentName(name: string) {
    await this.click(this.menuItemTree.filter({hasText: name}).last().locator('#caret-button').last());
  }

  async waitForModalVisible() {
    await this.openedModal.waitFor({state: 'attached'});
  }

  async waitForModalHidden() {
    await this.openedModal.waitFor({state: 'hidden'});
  }

  async clickSaveButtonForContent() {
    await this.click(this.saveContentBtn);
    await this.page.waitForTimeout(ConstantHelper.wait.short);
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
    await this.click(this.confirmToUnpublishBtn);
  }

  async clickCreateDocumentBlueprintButton() {
    await this.click(this.createDocumentBlueprintBtn);
  }

  // Info Tab
  async clickInfoTab() {
    await this.click(this.infoTab);
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
    await this.click(this.editDocumentTypeBtn);
  }

  async clickAddTemplateButton() {
    await this.click(this.addTemplateBtn);
  }

  async waitForContentToBeCreated() {
    await this.page.waitForLoadState();
  }

  async waitForContentToBeDeleted() {
    await this.page.waitForLoadState();
  }

  async waitForContentToBeRenamed() {
    await this.page.waitForLoadState();
  }

  async waitForDomainToBeCreated() {
    await this.page.waitForLoadState();
  }

  async waitForDomainToBeUpdated() {
    await this.page.waitForLoadState();
  }

  async waitForDomainToBeDeleted() {
    await this.page.waitForLoadState();
  }

  async waitForContentToBeTrashed() {
    await this.page.waitForLoadState();
  }

  async clickDocumentTypeByName(documentTypeName: string) {
    await this.click(this.page.locator(`uui-ref-node-document-type[name="${documentTypeName}"]`));
  }

  async clickTemplateByName(templateName: string) {
    await this.click(this.page.locator(`uui-ref-node[name="${templateName}"]`));
  }

  async isDocumentTypeModalVisible(documentTypeName: string) {
    await expect(this.documentTypeWorkspace.filter({hasText: documentTypeName})).toBeVisible();
  }

  async isTemplateModalVisible(templateName: string) {
    await expect(this.breadcrumbsTemplateModal.getByText(templateName)).toBeVisible();
  }

  async clickEditTemplateByName(templateName: string) {
    await this.click(this.page.locator(`uui-ref-node[name="${templateName}"]`).getByLabel('Choose'));
  }

  async changeTemplate(oldTemplate: string, newTemplate: string) {
    await this.clickEditTemplateByName(oldTemplate);
    await this.click(this.sidebarModal.getByLabel(newTemplate));
    await this.clickChooseModalButton();
  }

  async isTemplateNameDisabled(templateName: string) {
    await expect(this.sidebarModal.getByLabel(templateName)).toBeVisible();
    await expect(this.sidebarModal.getByLabel(templateName)).toBeDisabled();
  }

  // Culture and Hostnames
  async clickCultureAndHostnamesButton() {
    await this.click(this.cultureAndHostnamesBtn);
  }

  async clickAddNewHostnameButton(){
    await this.click(this.addNewHostnameBtn);
  }

  async selectCultureLanguageOption(option: string) {
    await this.click(this.cultureLanguageDropdownBox);
    await this.click(this.hostNameItem.getByText(option, {exact: true}));
  }

  async selectHostnameLanguageOption(option: string, index: number = 0) {
    await this.click(this.hostnameLanguageDropdownBox.nth(index));
    await this.click(this.hostnameComboBox.getByText(option).nth(index));
  }

  async enterDomain(value: string, index: number = 0) {
    await this.enterText(this.hostnameTxt.nth(index), value, {verify: true});
  }

  async clickDeleteHostnameButton() {
    await this.click(this.deleteHostnameBtn.first());
  }

  async clickSaveModalButton() {
    await this.click(this.saveModalBtn);
    await this.page.waitForTimeout(ConstantHelper.wait.short);
  }

  async chooseDocumentType(documentTypeName: string) {
    await this.click(this.documentTypeNode.filter({hasText: documentTypeName}));
  }

  // Approved Color
  async clickApprovedColorByValue(value: string) {
    await this.click(this.page.locator(`uui-color-swatch[value="#${value}"] #swatch`));
  }

  // Checkbox list
  async chooseCheckboxListOption(optionValue: string) {
    await this.click(this.page.locator(`uui-checkbox[value="${optionValue}"] svg`));
  }

  // Content Picker
  async addContentPicker(contentName: string) {
    await this.clickChooseButton();
    await this.click(this.sidebarModal.getByText(contentName));
    await this.click(this.chooseModalBtn);
  }

  async isOpenButtonVisibleInContentPicker(contentPickerName: string, isVisible: boolean = true) {
    return expect(this.page.getByLabel('Open ' + contentPickerName)).toBeVisible({visible: isVisible});
  }

  async clickContentPickerOpenButton(contentPickerName: string) {
    await this.click(this.page.getByLabel('Open ' + contentPickerName));
  }

  async isNodeOpenForContentPicker(contentPickerName: string) {
    return expect(this.openedModal.getByText(contentPickerName)).toBeVisible();
  }

  async isContentNameVisible(contentName: string, isVisible: boolean = true) {
    return expect(this.sidebarModal.getByText(contentName)).toBeVisible({visible: isVisible});
  }

  async isContentInTreeVisible(name: string, isVisible: boolean = true) {
    await expect(this.documentTreeItem.getByLabel(name, {exact: true}).first()).toBeVisible({visible: isVisible});
  }

  async isChildContentInTreeVisible(parentName: string, childName: string, isVisible: boolean = true) {
    await expect(this.documentTreeItem.locator('[label="' + parentName + '"]').getByLabel(childName)).toBeVisible({visible: isVisible});
  }

  async removeContentPicker(contentPickerName: string) {
    const contentPickerLocator = this.entityItem.filter({has: this.page.locator(`[name="${contentPickerName}"]`)});
    await this.hover(contentPickerLocator);
    await this.click(contentPickerLocator.getByLabel('Remove'));
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
    await this.click(this.chooseMediaPickerBtn);
  }

  async clickChooseButtonAndSelectMediaWithName(mediaName: string) {
    await this.clickChooseMediaPickerButton();
    await this.selectMediaWithName(mediaName);
  }

  async clickChooseButtonAndSelectMediaWithKey(mediaKey: string) {
    await this.clickChooseMediaPickerButton();
    await this.selectMediaWithTestId(mediaKey);
  }

  async removeMediaPickerByName(mediaPickerName: string) {
    await this.click(this.page.locator(`[name="${mediaPickerName}"] [label="Remove"] svg`));
    await this.clickConfirmRemoveButton();
  }

  async isMediaNameVisible(mediaName: string, isVisible: boolean = true) {
    return expect(this.mediaCardItems.filter({hasText: mediaName})).toBeVisible({visible: isVisible});
  }

  async clickResetFocalPointButton() {
    await this.click(this.resetFocalPointBtn);
  }

  async setFocalPoint(widthPercentage: number = 50, heightPercentage: number = 50) {
    await this.page.waitForTimeout(ConstantHelper.wait.medium);
    const element = await this.page.locator('#image').boundingBox();
    if (!element) {
      throw new Error('Element not found');
    }

    const centerX = element.x + element.width / 2;
    const centerY = element.y + element.height / 2;

    const x = element.x + (element.width * widthPercentage) / 100;
    const y = element.y + (element.height * heightPercentage) / 100;

    await this.page.waitForTimeout(ConstantHelper.wait.minimal);
    await this.page.mouse.move(centerX, centerY, {steps: 5});
    await this.page.waitForTimeout(ConstantHelper.wait.minimal);
    await this.page.mouse.down();
    await this.page.waitForTimeout(ConstantHelper.wait.minimal);
    await this.page.mouse.move(x, y);
    await this.page.waitForTimeout(ConstantHelper.wait.minimal);
    await this.page.mouse.up();
  }

  // Member Picker
  async clickChooseMemberPickerButton() {
    await this.click(this.chooseMemberPickerBtn);
  }

  async selectMemberByName(memberName: string) {
    await this.click(this.sidebarModal.getByText(memberName, {exact: true}));
  }

  async removeMemberPickerByName(memberName: string) {
    const mediaPickerLocator = this.entityItem.filter({has: this.page.locator(`[name="${memberName}"]`)});
    await this.hover(mediaPickerLocator);
    await this.click(mediaPickerLocator.getByLabel('Remove'));
    await this.clickConfirmRemoveButton();
  }

  // Numeric
  async enterNumeric(number: number) {
    await this.numericTxt.clear();
    await this.numericTxt.fill(number.toString());
  }

  // Radiobox
  async chooseRadioboxOption(optionValue: string) {
    await this.click(this.page.locator(`uui-radio[value="${optionValue}"] #button`));
  }

  // Tags
  async clickPlusIconButton() {
    await this.click(this.plusIconBtn);
  }

  async enterTag(tagName: string) {
    await this.enterTagTxt.fill(tagName);
    await this.enterTagTxt.press('Enter');
  }

  async removeTagByName(tagName: string) {
    await this.click(this.tagItems.filter({hasText: tagName}).locator('svg'));
  }

  // Multi URL Picker
  async clickAddMultiURLPickerButton() {
    await this.click(this.addMultiURLPickerBtn);
  }

  async selectLinkByName(linkName: string) {
    await this.click(this.sidebarModal.getByText(linkName, {exact: true}));
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
    await this.click(this.page.locator(`[name="${linkName}"]`).getByLabel('Remove'));
    await this.clickConfirmRemoveButton();
  }

  async clickEditUrlPickerButtonByName(linkName: string) {
    await this.click(this.page.locator(`[name="${linkName}"]`).getByLabel('Edit'));
  }

  // Upload
  async clickRemoveFilesButton() {
    await this.click(this.removeFilesBtn);
  }

  // True/false
  async clickToggleButton() {
    await this.click(this.toggleBtn, {force: true});
  }

  async doesToggleHaveLabel(label: string) {
    return await expect(this.toggleInput).toHaveText(label);
  }

  // Multiple Text String
  async clickAddMultipleTextStringButton() {
    await this.click(this.addMultipleTextStringBtn);
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
    await this.enterMonacoEditorValue(value);
  }

  // Markdown Editor
  async enterMarkdownEditorValue(value: string) {
    await this.enterMonacoEditorValue(value);
  }

  // Slider
  async changeSliderValue(value: string) {
    await this.sliderInput.fill(value);
  }

  async isDocumentTypeNameVisible(contentName: string, isVisible: boolean = true) {
    return expect(this.sidebarModal.getByText(contentName)).toBeVisible({visible: isVisible});
  }

  async doesModalHaveText(text: string) {
    return expect(this.openedModal).toContainText(text);
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
    await this.page.waitForTimeout(ConstantHelper.wait.short);
  }

  async clickSelectVariantButton() {
    await this.click(this.selectAVariantBtn);
  }

  async clickVariantAddModeButtonForLanguageName(language: string) {
    await this.click(this.variantAddModeBtn.getByText(language));
    await this.page.waitForTimeout(ConstantHelper.wait.short);
  }

  async clickSaveAndCloseButton() {
    await this.click(this.saveAndCloseBtn);
    await this.page.waitForTimeout(ConstantHelper.wait.short);
  }

  // List View
  async clickCreateContentWithName(name: string) {
    await this.click(this.page.getByLabel(`Create ${name}`));
  }

  async enterNameInContainer(name: string) {
    await expect(this.enterNameInContainerTxt).toBeVisible();
    await this.enterNameInContainerTxt.clear();
    await this.enterNameInContainerTxt.fill(name);
  }

  async goToContentInListViewWithName(contentName: string) {
    await this.click(this.listView.getByLabel(contentName));
  }

  async doesListViewHaveNoItemsInList() {
    await expect(this.listView.filter({hasText: 'There are no items to show in the list.'})).toBeVisible();
  }

  async doesContentListHaveNoItemsInList() {
    await expect(this.umbDocumentCollection.filter({hasText: 'No items'})).toBeVisible();
  }

  async clickNameButtonInListView() {
    await this.click(this.nameBtn);
  }

  async doesFirstItemInListViewHaveName(name: string) {
    await expect(this.listViewTableRow.first()).toContainText(name);
  }

  async doesListViewContainCount(count: number) {
    await expect(this.listViewTableRow).toHaveCount(count);
  }

  async selectContentWithNameInListView(name: string) {
    await this.click(this.listViewTableRow.filter({hasText: name}));
  }

  async clickPublishSelectedListItems() {
    await this.click(this.publishSelectedListItems);
  }

  async clickUnpublishSelectedListItems() {
    await this.click(this.unpublishSelectedListItems);
  }

  async clickDuplicateToSelectedListItems() {
    // Force click is needed
    await this.click(this.duplicateToSelectedListItems, {force: true});
  }

  async clickMoveToSelectedListItems() {
    // Force click is needed
    await this.click(this.moveToSelectedListItems, {force: true});
  }

  async clickTrashSelectedListItems() {
    await this.click(this.trashSelectedListItems);
  }

  async selectDocumentWithNameAtRoot(name: string) {
    await this.openCaretButtonForName('Content');
    await this.click(this.modalContent.getByLabel(name));
    await this.clickChooseButton();
  }

  async clickTrashButton() {
    await this.click(this.trashBtn);
  }

  async clickExactTrashButton() {
    await this.click(this.exactTrashBtn);
  }

  async isDocumentListViewVisible(isVisible: boolean = true) {
    await expect(this.documentListView).toBeVisible({visible: isVisible});
  }

  async isDocumentGridViewVisible(isVisible: boolean = true) {
    await expect(this.documentGridView).toBeVisible({visible: isVisible});
  }

  async changeDocumentSectionLanguage(newLanguageName: string) {
    await this.click(this.documentLanguageSelect);
    // Force click is needed
    await this.click(this.documentLanguageSelectPopover.getByText(newLanguageName), {force: true});
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
    await this.hover(this.recycleBinMenuItem);
    // Force click is needed
    await this.click(this.emptyRecycleBinBtn, {force: true});
  }

  async clickConfirmEmptyRecycleBinButton() {
    await this.click(this.confirmEmptyRecycleBinBtn);
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
    await this.click(this.splitView.getByRole('tab', {name: 'Content'}));
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
    await this.click(this.documentBlueprintSaveBtn);
  }

  async clickDuplicateToButton() {
    await this.click(this.duplicateToBtn);
  }

  async clickDuplicateButton() {
    await this.click(this.duplicateBtn);
  }

  async clickMoveToButton() {
    await this.click(this.moveToBtn);
  }

  async moveToContentWithName(parentNames: string[], moveTo: string) {
    for (const contentName of parentNames) {
      await this.click(this.container.getByLabel(`Expand child items for ${contentName}`));
    }
    await this.click(this.container.getByLabel(moveTo));
    await this.clickChooseContainerButton();
  }

  async isCaretButtonVisibleForContentName(contentName: string, isVisible: boolean = true) {
    await expect(this.page.locator(`[label="${contentName}"]`).getByLabel('Expand child items for ')).toBeVisible({visible: isVisible});
  }

  async reloadContentTree() {
    // Force click is needed
    await this.click(this.contentTreeRefreshBtn, {force: true});
  }

  async clickSortChildrenButton() {
    await this.click(this.sortChildrenBtn);
  }

  async clickRollbackButton() {
    await this.click(this.rollbackBtn);
  }

  async clickRollbackContainerButton() {
    await this.click(this.rollbackContainerBtn);
  }

  async clickLatestRollBackItem() {
    await this.click(this.rollbackItem.last());
  }

  async clickPublicAccessButton() {
    await this.click(this.publicAccessBtn);
  }

  async addGroupBasedPublicAccess(memberGroupName: string, documentName: string) {
    await this.click(this.groupBasedProtectionBtn);
    await this.clickNextButton();
    await this.click(this.chooseMemberGroupBtn);
    await this.click(this.page.getByLabel(memberGroupName));
    await this.clickChooseModalButton();
    await this.click(this.selectLoginPageDocument);
    await this.click(this.container.getByLabel(documentName, {exact: true}));
    await this.clickChooseModalButton();
    await this.click(this.selectErrorPageDocument);
    await this.click(this.container.getByLabel(documentName, {exact: true}));
    await this.clickChooseModalButton();
    await this.click(this.containerSaveBtn);
  }

  async sortChildrenDragAndDrop(dragFromSelector: Locator, dragToSelector: Locator, verticalOffset: number = 0, horizontalOffset: number = 0, steps: number = 5) {
    await this.waitForVisible(dragFromSelector);
    await this.waitForVisible(dragToSelector);
    const targetLocation = await dragToSelector.boundingBox();
    const elementCenterX = targetLocation!.x + targetLocation!.width / 2;
    const elementCenterY = targetLocation!.y + targetLocation!.height / 2;
    await this.hover(dragFromSelector);
    await this.page.mouse.move(10, 10);
    await this.hover(dragFromSelector);
    await this.page.mouse.down();
    await this.page.waitForTimeout(ConstantHelper.wait.debounce);
    await this.page.mouse.move(elementCenterX + horizontalOffset, elementCenterY + verticalOffset, {steps: steps});
    await this.page.waitForTimeout(ConstantHelper.wait.debounce);
    // If we do not have this, the drag and drop will not work
    await this.hover(dragToSelector);
    await this.page.mouse.up();
  }

  async clickSortButton() {
    await this.click(this.sortBtn);
  }

  async doesIndexDocumentInTreeContainName(parentName: string, childName: string, index: number) {
    await expect(this.documentTreeItem.locator(`[label="${parentName}"]`).locator('umb-tree-item').nth(index).locator('#label')).toHaveText(childName);
  }

  async selectMemberGroup(memberGroupName: string) {
    await this.click(this.uuiCheckbox.getByLabel(memberGroupName));
  }

  async isPermissionInActionsMenuVisible(permissionName: string, isVisible: boolean = true) {
    await expect(this.actionsMenu.getByRole('button', {
      name: permissionName,
      exact: true
    })).toBeVisible({visible: isVisible});
  }

  async clickDocumentLinkButton() {
    await this.click(this.linkToDocumentBtn);
  }

  async clickMediaLinkButton() {
    await this.click(this.linkToMediaBtn);
  }

  async clickManualLinkButton() {
    await this.click(this.linkToManualBtn);
  }

  // Block Grid - Block List
  async clickAddBlockElementButton() {
    await this.click(this.addBlockElementBtn);
  }

  async clickAddBlockWithNameButton(name: string) {
    await this.click(this.page.getByLabel(`Add ${name}`));
  }

  async clickCreateForModalWithHeadline(headline: string) {
    await this.click(this.page.locator(`[headline="${headline}"]`).getByLabel('Create'));
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
    await this.click(this.addBlockSettingsTabBtn);
  }

  async clickEditBlockGridBlockButton() {
    await this.hover(this.blockGridEntry);
    await this.click(this.editBlockEntryBtn);
  }

  async clickDeleteBlockGridBlockButton() {
    await this.hover(this.blockGridEntry);
    await this.click(this.deleteBlockEntryBtn);
  }

  async clickEditBlockListBlockButton() {
    await this.hover(this.blockListEntry);
    await this.click(this.editBlockEntryBtn);
  }

  async clickDeleteBlockListBlockButton() {
    await this.hover(this.blockListEntry);
    await this.click(this.deleteBlockEntryBtn);
  }

  async clickCopyBlockListBlockButton(groupName: string, propertyName: string, blockName: string, index: number = 0) {
    const blockListBlock = this.workspaceEditTab.filter({hasText: groupName}).locator(this.workspaceEditProperties).filter({hasText: propertyName}).locator(this.blockListEntry).nth(index).filter({hasText: blockName});
    await this.hover(blockListBlock);
    await this.click(blockListBlock.locator(this.copyBlockEntryBtn), {force: true});
    await this.page.waitForTimeout(ConstantHelper.wait.short);
  }

  async clickCopyBlockGridBlockButton(groupName: string, propertyName: string, blockName: string, index: number = 0) {
    const blockGridBlock = this.workspaceEditTab.filter({hasText: groupName}).locator(this.workspaceEditProperties).filter({hasText: propertyName}).locator(this.blockGridEntry).nth(index).filter({hasText: blockName});
    await this.hover(blockGridBlock);
    await this.click(blockGridBlock.locator(this.copyBlockEntryBtn), {force: true});
    await this.page.waitForTimeout(ConstantHelper.wait.short);
  }

  async clickPasteFromClipboardButtonForProperty(groupName: string, propertyName: string) {
    await this.page.waitForTimeout(ConstantHelper.wait.short);
    const property = this.workspaceEditTab.filter({hasText: groupName}).locator(this.property).filter({hasText: propertyName});
    await this.click(property.locator(this.pasteFromClipboardBtn), {force: true});
  }

  async clickActionsMenuForProperty(groupName: string, propertyName: string) {
    const property = this.workspaceEditTab.filter({hasText: groupName}).locator(this.workspaceEditProperties).filter({hasText: propertyName});
    await this.hover(property);
    await this.click(property.locator(this.openActionsMenu), {force: true});
  }

  async clickAddBlockGridElementWithName(elementTypeName: string) {
    await this.click(this.page.getByRole('link', {name: `Add ${elementTypeName}`, exact: true}));
  }

  async clickEditBlockListEntryWithName(blockListElementName: string) {
    await this.click(this.blockListEntry.filter({hasText: blockListElementName}).getByLabel('edit'), {force: true});
  }

  async clickSelectBlockElementWithName(elementTypeName: string) {
    await this.click(this.page.getByRole('button', {name: elementTypeName, exact: true}));
  }

  async clickSelectBlockElementInAreaWithName(elementTypeName: string) {
    await this.click(this.container.getByRole('button', {name: elementTypeName, exact: true}));
  }

  async clickBlockElementWithName(elementTypeName: string) {
    await this.click(this.page.getByRole('link', {name: elementTypeName, exact: true}), {force: true});
  }

  async enterPropertyValue(propertyName: string, value: string) {
    const property = this.property.filter({hasText: propertyName});
    await expect(property).toBeVisible();
    await property.locator('input').clear();
    await property.locator('input').fill(value);
  }

  async doesBlockContainBlockInAreaWithName(blockWithAreaName: string, areaName: string, blockInAreaName: string, index: number = 0) {
    const blockWithArea = this.blockGridEntry.locator(this.blockGridBlock.filter({hasText: blockWithAreaName})).nth(index);
    const area = blockWithArea.locator(this.blockGridAreasContainer).locator(`[data-area-alias="${areaName}"]`);
    const blockInArea = area.locator(this.blockGridEntry.filter({hasText: blockInAreaName}));
    await expect(blockInArea).toBeVisible();
  }

  async doesBlockContainBlockCountInArea(blockWithAreaName: string, areaName: string, blocksInAreaCount: number, index: number = 0) {
    const blockWithArea = this.blockGridEntry.locator(this.blockGridBlock.filter({hasText: blockWithAreaName})).nth(index);
    const area = blockWithArea.locator(this.blockGridAreasContainer).locator(`[data-area-alias="${areaName}"]`);
    const blocks = area.locator(this.blockGridEntry);
    await expect(blocks).toHaveCount(blocksInAreaCount);
  }

  async doesBlockContainCountOfBlockInArea(blockWithAreaName: string, areaName: string, blockInAreaName: string, count: number, index: number = 0) {
    const blockWithArea = this.blockGridEntry.locator(this.blockGridBlock.filter({hasText: blockWithAreaName})).nth(index);
    const area = blockWithArea.locator(this.blockGridAreasContainer).locator(`[data-area-alias="${areaName}"]`);
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
    const area = parentBlock.locator(this.blockGridAreasContainer).locator(`[data-area-alias="${areaName}"]`);
    const block = area.locator(this.blockGridEntry.filter({hasText: blockName})).nth(childIndex);
    return block.getAttribute('data-element-key');
  }

  async removeBlockFromArea(parentBlockName: string, areaName: string, blockName: string, parentIndex: number = 0, childIndex: number = 0) {
    const parentBlock = this.blockGridEntry.locator(this.blockGridBlock.filter({hasText: parentBlockName})).nth(parentIndex);
    const area = parentBlock.locator(this.blockGridAreasContainer).locator(`[data-area-alias="${areaName}"]`);
    const block = area.locator(this.blockGridEntry.filter({hasText: blockName})).nth(childIndex);
    await this.hover(block);
    await this.click(block.getByLabel('delete'), {force: true});
  }

  async doesBlockAreaContainColumnSpan(blockWithAreaName: string, areaName: string, columnSpan: number, index: number = 0) {
    const blockWithArea = this.blockGridEntry.locator(this.blockGridBlock.filter({hasText: blockWithAreaName})).nth(index);
    const area = blockWithArea.locator(this.blockGridAreasContainer).locator(`[data-area-alias="${areaName}"]`);
    await expect(area).toHaveAttribute('data-area-col-span', columnSpan.toString());
  }

  async doesBlockAreaContainRowSpan(blockWithAreaName: string, areaName: string, rowSpan: number, index: number = 0) {
    const blockWithArea = this.blockGridEntry.locator(this.blockGridBlock.filter({hasText: blockWithAreaName})).nth(index);
    const area = blockWithArea.locator(this.blockGridAreasContainer).locator(`[data-area-alias="${areaName}"]`);
    await expect(area).toHaveAttribute('data-area-row-span', rowSpan.toString());
  }

  async clickInlineAddToAreaButton(parentBlockName: string, areaName: string, parentIndex: number = 0, buttonIndex: number = 1) {
    const parentBlock = this.blockGridEntry.locator(this.blockGridBlock.filter({hasText: parentBlockName})).nth(parentIndex);
    const area = parentBlock.locator(this.blockGridAreasContainer).locator(`[data-area-alias="${areaName}"]`);
    await this.click(area.locator(this.inlineCreateBtn).nth(buttonIndex));
  }

  async addBlockToAreasWithExistingBlock(blockWithAreaName: string, areaName: string, parentIndex: number = 0, addToIndex: number = 0) {
    const blockWithArea = this.blockGridEntry.locator(this.blockGridBlock).filter({hasText: blockWithAreaName}).nth(parentIndex);
    await this.hover(blockWithArea);
    const area = blockWithArea.locator(this.blockGridAreasContainer).locator(`[data-area-alias="${areaName}"]`);
    const addBlockBtn = area.locator(this.inlineCreateBtn).nth(addToIndex);
    await this.hover(addBlockBtn, {force: true});
    await this.click(addBlockBtn, {force: true});
  }

  async doesBlockGridBlockWithAreaContainCreateLabel(blockWithAreaName: string, createLabel: string, index: number = 0) {
    const blockWithArea = this.blockGridEntry.locator(this.blockGridBlock.filter({hasText: blockWithAreaName})).nth(index);
    return expect(blockWithArea.locator(this.blockGridAreasContainer).getByLabel(createLabel)).toBeVisible();
  }

  async doesPropertyContainValue(propertyName: string, value: string) {
    await expect(this.property.filter({hasText: propertyName}).locator('input')).toHaveValue(value);
  }

  async clickCreateButtonForModalWithElementTypeNameAndGroupName(headlineName: string, groupName: string) {
    await this.click(this.blockWorkspace.filter({hasText: `Add ${headlineName}`}).filter({hasText: groupName}).getByLabel('Create'));
  }

  async clickUpdateButtonForModalWithElementTypeNameAndGroupName(headlineName: string, groupName: string) {
    await this.click(this.blockWorkspace.filter({hasText: `Edit ${headlineName}`}).filter({hasText: groupName}).locator(this.updateBtn));
  }

  async clickExactCopyButton() {
    await this.click(this.exactCopyBtn);
  }

  async clickExactReplaceButton() {
    await this.click(this.replaceExactBtn);
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
    await this.click(this.clipboardEntryPicker.getByLabel(`${contentName} - ${propertyName} - ${blockName}`).nth(index));
  }

  async selectClipboardEntriesWithName(contentName: string, propertyName: string, index: number = 0) {
    await this.doesClipboardHaveCopiedBlocks(contentName, propertyName, index);
    await this.click(this.clipboardEntryPicker.getByLabel(`${contentName} - ${propertyName}`).nth(index));
  }

  async goToBlockGridBlockWithName(groupName: string, propertyName: string, blockName: string, index: number = 0) {
    const blockGridBlock = this.workspaceEditTab.filter({hasText: groupName}).locator(this.workspaceEditProperties).filter({hasText: propertyName}).locator(this.blockGridEntry).nth(index).filter({hasText: blockName});
    await this.click(blockGridBlock);
  }

  async goToBlockListBlockWithName(groupName: string, propertyName: string, blockName: string, index: number = 0) {
    const blocklistBlock = this.workspaceEditTab.filter({hasText: groupName}).locator(this.workspaceEditProperties).filter({hasText: propertyName}).locator(this.blockListEntry).nth(index).filter({hasText: blockName});
    await this.click(blocklistBlock);
  }

  async doesBlockEditorBlockWithNameContainValue(groupName: string, propertyName: string, inputType: string = ConstantHelper.inputTypes.general, value) {
    await expect(this.blockWorkspaceEditTab.filter({hasText: groupName}).locator(this.property).filter({hasText: propertyName}).locator(inputType)).toContainText(value)
  }

  async clickCloseButton() {
    await this.click(this.closeBtn);
  }

  async clickPasteButton() {
    await this.click(this.pasteBtn, {force: true});
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
    await this.click(this.insertBlockBtn);
  }

  // TipTap
  async enterRTETipTapEditor(value: string) {
    await this.enterText(this.tipTapEditor, value);
  }

  async enterRTETipTapEditorWithName(name: string , value: string){
    const tipTapEditorLocator = this.page.locator(`[data-mark="property:${name}"]`).locator(this.tipTapEditor);
    await this.enterText(tipTapEditorLocator, value);
  }

  async clickTipTapToolbarIconWithTitle(iconTitle: string) {
    await this.click(this.tipTapPropertyEditor.getByTitle(iconTitle, {exact: true}).locator('svg'));
  }

  async doesUploadedSvgThumbnailHaveSrc(imageSrc: string) {
    await expect(this.uploadedSvgThumbnail).toBeVisible();
    await expect(this.uploadedSvgThumbnail).toHaveAttribute('src', imageSrc);
  }

  async doesRichTextEditorBlockContainLabel(richTextEditorAlias: string, label: string) {
    await expect(this.page.getByTestId(`property:${richTextEditorAlias}`).locator(this.rteBlock)).toContainText(label);
  }

  async doesBlockEditorModalContainEditorSize(editorSize: string, elementName: string) {
    await expect(this.backofficeModalContainer.locator(`[size="${editorSize}"]`).locator(`[headline="Add ${elementName}"]`)).toBeVisible();
  }

  async doesBlockEditorModalContainInline(richTextEditorAlias: string, elementName: string) {
    await expect(this.page.getByTestId(`property:${richTextEditorAlias}`).locator(this.tiptapInput).locator(this.rteBlockInline)).toContainText(elementName);
  }

  async doesBlockHaveBackgroundColor(elementName: string, backgroundColor: string) {
    await expect(this.page.locator('umb-block-type-card', {hasText: elementName}).locator(`[style="background-color:${backgroundColor};"]`)).toBeVisible();
  }

  async doesBlockHaveIconColor(elementName: string, backgroundColor: string) {
    await expect(this.page.locator('umb-block-type-card', {hasText: elementName}).locator(`[color="${backgroundColor}"]`)).toBeVisible();
  }

  async addDocumentDomain(domainName: string, languageName: string) {
    await this.clickCultureAndHostnamesButton();
    await this.clickAddNewHostnameButton();
    await this.enterDomain(domainName);
    await this.selectHostnameLanguageOption(languageName);
    await this.clickSaveModalButton();
  }

  // Scheduled Publishing
  async clickViewMoreOptionsButton() {
    await this.click(this.viewMoreOptionsBtn);
  }

  async clickSchedulePublishButton() {
    await this.click(this.schedulePublishBtn);
  }

  async clickSchedulePublishModalButton() {
    await this.click(this.schedulePublishModalBtn);
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
    await this.click(this.selectAllCheckbox);
  }

  async doesSchedulePublishModalButtonContainDisabledTag(hasDisabledTag: boolean = false) {
    if (!hasDisabledTag) {
      return await expect(this.schedulePublishModalBtn).not.toHaveAttribute('disabled', '');
    }
    return await expect(this.schedulePublishModalBtn).toHaveAttribute('disabled', '');
  }

  async clickInlineBlockCaretButtonForName(blockEditorName: string, index: number = 0) {
    const caretButtonLocator = this.blockListEntry.filter({hasText: blockEditorName}).nth(index).locator('uui-symbol-expand svg');
    await this.click(caretButtonLocator);
  }

  async doesTiptapHaveWordCount(count: number) {
    await expect(this.tiptapStatusbarWordCount).toHaveText(`${count} words`);
  }

  async doesTiptapHaveCharacterCount(count: number) {
    await expect(this.tiptapStatusbarWordCount).toHaveText(`${count} characters`);
  }

  async clickTiptapWordCountButton() {
    await this.click(this.tiptapStatusbarWordCount);
  }

  async doesElementPathHaveText(text: string) {
    await expect(this.tiptapStatusbarElementPath).toHaveText(text);
  }

  async clickConfirmToPublishButton() {
    await this.click(this.confirmToPublishBtn);
  }

  async clickPublishWithDescendantsButton() {
    await this.click(this.publishWithDescendantsBtn);
  }

  async clickIncludeUnpublishedDescendantsToggle() {
    await this.click(this.includeUnpublishedDescendantsToggle);
  }

  async clickPublishWithDescendantsModalButton() {
    await this.click(this.publishWithDescendantsModalBtn);
  }

  async doesDocumentVariantLanguageItemHaveCount(count: number) {
    await expect(this.documentVariantLanguageItem).toHaveCount(count);
  }

  async doesDocumentVariantLanguageItemHaveName(name: string) {
    await expect(this.documentVariantLanguagePicker).toContainText(name);
  }

  async clickSchedulePublishLanguageButton(languageName: string) {
    await this.click(this.page.getByRole('menu').filter({hasText: languageName}));
  }

  async clickBlockCardWithName(name: string, toForce: boolean = false) {
    const blockWithNameLocator = this.page.locator('uui-card-block-type', {hasText: name});
    await this.click(blockWithNameLocator, {force: toForce});
  }

  async clickStyleSelectButton() {
    await this.click(this.styleSelectBtn);
  }

  async clickCascadingMenuItemWithName(name: string) {
    const menuItemLocator = this.cascadingMenuContainer.locator(`uui-menu-item[label="${name}"]`);
    await this.click(menuItemLocator);
  }

  async hoverCascadingMenuItemWithName(name: string) {
    const menuItemLocator = this.cascadingMenuContainer.locator(`uui-menu-item[label="${name}"]`);
    await this.hover(menuItemLocator);
  }

  async selectAllRTETipTapEditorText() {
    await this.click(this.tipTapEditor);
    await this.page.keyboard.press('Control+A');
  }

  async waitForContentToBePublished() {
    await this.page.waitForLoadState();
  }

  async waitForRecycleBinToBeEmptied() {
    await this.page.waitForLoadState();
  }

  async clearTipTapEditor() {
    await this.waitForVisible(this.tipTapEditor);
    // We use the middle mouse button click so we don't accidentally open a block in the RTE. This solution avoids that.
    await this.tipTapEditor.click({button: "middle"});
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.press('Backspace');
  }

  async clickBlockElementInRTEWithName(elementTypeName: string) {
    const blockElementLocator = this.page.locator('uui-ref-node umb-ufm-render').filter({hasText: elementTypeName});
    await this.click(blockElementLocator, {force: true});
  }

  async doesModalFormValidationMessageContainText(text: string) {
    await expect(this.modalFormValidationMessage).toContainText(text);
  }

  async enterSearchKeywordInTreePickerModal(keyword: string) {
    await expect(this.treePickerSearchTxt).toBeVisible();
    await this.treePickerSearchTxt.fill(keyword);
    await this.page.keyboard.press('Enter');
  }

  async enterSearchKeywordInMediaPickerModal(keyword: string) {
    await expect(this.mediaPickerSearchTxt).toBeVisible();
    await this.mediaPickerSearchTxt.fill(keyword);
    await this.page.keyboard.press('Enter');
  }

  async enterSearchKeywordInMemberPickerModal(keyword: string) {
    await expect(this.memberPickerSearchTxt).toBeVisible();
    await this.memberPickerSearchTxt.fill(keyword);
    await this.page.keyboard.press('Enter');
  }
  
  async isContentNameReadOnly() {
    await expect(this.contentNameTxt).toHaveAttribute('readonly');
  }

  // Block Custom View
  async isBlockCustomViewVisible(blockCustomViewLocator: string, isVisible: boolean = true) {
    await expect(this.page.locator(blockCustomViewLocator)).toBeVisible({visible: isVisible});
  }

  async isSingleBlockElementVisible(isVisible: boolean = true) {
    const count = await this.refListBlock.count();
    if (isVisible) {
      expect(count, `Expected only one element, but found ${count}`).toBe(1);
    } else {
      expect(count, `Expected only one element, but found ${count}`).toBe(0);
    }
    await expect(this.refListBlock).toBeVisible({visible: isVisible});
  }

  async doesBlockCustomViewHaveValue(customBlockViewLocator: string, valueText: string) {
    const locator = this.page.locator(`${customBlockViewLocator} p`);
    await expect(locator).toBeVisible();
    await expect(locator).toHaveText(valueText);
  }

  async clickPropertyActionWithName(name: string) {
    const actionLocator = this.propertyActionMenu.locator(`umb-property-action uui-menu-item[label="${name}"]`);
    await this.click(actionLocator);
  }
  
  async isContentWithNameVisibleInList(contentName: string, isVisible: boolean = true) {
    await expect(this.documentTableColumnName.filter({hasText: contentName})).toBeVisible({visible: isVisible});
  }
  
  async selectDocumentBlueprintWithName(blueprintName: string) {
    await this.click(this.documentCreateOptionsModal.locator('uui-menu-item', {hasText: blueprintName}));
  }

  async doesDocumentModalHaveText(text: string) {
    await expect(this.documentCreateOptionsModal).toContainText(text);
  }

  async doesListViewItemsHaveCount(pageSize: number){
    await expect(this.listViewCustomRows).toHaveCount(pageSize);
  }

  async isListViewItemWithNameVisible(itemName: string, index: number = 0){
    await expect(this.listViewCustomRows.nth(index)).toContainText(itemName);
  }

  async clickPaginationNextButton(){
    await this.click(this.nextPaginationBtn);
  }

  // Entity Data Picker
  async chooseCollectionMenuItemWithName(name: string) {
    await this.clickChooseButton();
    await this.click(this.collectionMenu.locator('umb-collection-menu-item', {hasText: name}));
    await this.clickChooseContainerButton();
  }

  async chooseTreeMenuItemWithName(name: string, parentNames: string[] = []) {
    await this.clickChooseButton();
    for (const itemName of parentNames) {
      await this.click(this.entityPickerTree.locator('umb-tree-item').getByLabel(`Expand child items for ${itemName}`));
    }
    await this.click(this.container.getByLabel(name));
    await this.clickChooseContainerButton();
  }
  
  async isChooseButtonVisible(isVisible: boolean = true) {
    await expect(this.chooseBtn).toBeVisible({visible: isVisible});
  }

  async clickDocumentNotificationOptionWithName(name: string) {
    const notificationOptionLocator = this.page.locator(`umb-document-notifications-modal [id$="${name}"]`).locator('#toggle');
    await this.click(notificationOptionLocator);
  }

  async switchLanguage(languageName: string) {
    await this.click(this.languageToggle);
    const languageOptionLocator = this.contentVariantDropdown.locator('.culture-variant').filter({hasText: languageName});
    await this.click(languageOptionLocator);
    await expect(languageOptionLocator).toContainClass('selected');
  }

  async clickAddBlockListElementWithName(blockName: string) {
    const createNewButtonLocator = this.page.getByTestId(`property:${blockName.toLowerCase()}`).getByLabel('Create new');
    await this.click(createNewButtonLocator);
  }

  async isAddBlockListElementWithNameDisabled(blockName: string) {
    const createNewButtonLocator = this.page.getByTestId(`property:${blockName.toLowerCase()}`).locator('uui-button[label="Create new"]');
    await expect(createNewButtonLocator).toHaveAttribute('disabled');
  }

  async isAddBlockListElementWithNameVisible(blockName: string) {
    const createNewButtonLocator = this.page.getByTestId(`property:${blockName.toLowerCase()}`).locator('uui-button[label="Create new"]');
    await expect(createNewButtonLocator).toBeVisible();
    await expect(createNewButtonLocator).not.toHaveAttribute('disabled');
  }

  async enterBlockPropertyValue(propertyName: string, value: string) {
    const property = this.blockProperty.filter({hasText: propertyName});
    await expect(property).toBeVisible();
    await property.locator('input').clear();
    await property.locator('input').fill(value);
  }

  async isBlockPropertyEditable(propertyName: string, isEditable: boolean = true) {
    const propertyLocator = this.blockProperty.filter({hasText: propertyName}).locator('#input');
    await expect(propertyLocator).toBeVisible();
    await expect(propertyLocator).toBeEditable({editable: isEditable});
  }
}