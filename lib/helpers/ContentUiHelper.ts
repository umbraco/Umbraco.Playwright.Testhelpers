import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

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
  private readonly publicationStatus: Locator;
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
  private readonly expandChildItemsForContent: Locator;
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
  private readonly deleteBlockEntryBtn: Locator;
  private readonly blockGridEntry: Locator;
  private readonly blockListEntry: Locator;
  private readonly tipTapPropertyEditor: Locator;
  private readonly tipTapEditor: Locator;
  private readonly uploadedSvgThumbnail: Locator;

  constructor(page: Page) {
    super(page);
    this.contentNameTxt = page.locator('#name-input input');
    this.saveAndPublishBtn = page.getByLabel('Save And Publish');
    this.publishBtn = page.getByLabel(/^Publish(\.\.\.)?$/);
    this.unpublishBtn = page.getByLabel(/^Unpublish(\.\.\.)?$/);
    this.actionMenuForContentBtn = page.locator('#header [label="Open actions menu"]');
    this.openedModal = page.locator('uui-modal-container[backdrop]');
    this.textstringTxt = page.locator('umb-property-editor-ui-text-box #input');
    this.reloadChildrenThreeDotsBtn = page.getByRole('button', {name: 'Reload children...'});
    this.contentTree = page.locator('umb-tree[alias="Umb.Tree.Document"]');
    this.richTextAreaTxt = page.frameLocator('iframe[title="Rich Text Area"]').locator('#tinymce');
    this.textAreaTxt = page.locator('umb-property-editor-ui-textarea textarea');
    this.plusIconBtn = page.locator('#icon-add svg');
    this.enterTagTxt = page.getByPlaceholder('Enter tag');
    this.menuItemTree = page.locator('umb-menu-item-tree-default');
    this.confirmToUnpublishBtn = page.locator('umb-document-unpublish-modal').getByLabel('Unpublish');
    this.dropdown = page.locator('select#native');
    this.setADateTxt = page.getByLabel('Set a date...');
    this.chooseMediaPickerBtn = page.locator('umb-property-editor-ui-media-picker #btn-add');
    this.chooseMemberPickerBtn = page.locator('umb-property-editor-ui-member-picker #btn-add');
    this.numericTxt = page.locator('umb-property-editor-ui-number input');
    this.addMultiURLPickerBtn = page.locator('umb-property-editor-ui-multi-url-picker #btn-add');
    this.linkTxt = page.getByLabel('Enter a URL...', {exact: true});
    this.anchorQuerystringTxt = page.getByLabel('#value or ?key=value');
    this.linkTitleTxt = page.locator('umb-link-picker-modal').getByLabel('Title');
    this.tagItems = page.locator('uui-tag');
    this.removeFilesBtn = page.locator('umb-input-upload-field [label="Remove file(s)"]');
    this.toggleBtn = page.locator('umb-property-editor-ui-toggle #slider');
    this.toggleInput = page.locator('umb-property-editor-ui-toggle #input');
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
    this.infoTab = page.getByRole('tab', {name: 'Info'});
    this.linkContent = page.locator('.link-item');
    this.historyItems = page.locator('umb-history-item');
    this.generalItem = page.locator('.general-item');
    this.publicationStatus = this.generalItem.filter({hasText: 'Publication Status'}).locator('uui-tag');
    this.createdDate = this.generalItem.filter({hasText: 'Created'}).locator('umb-localize-date');
    this.editDocumentTypeBtn = this.generalItem.filter({hasText: 'Document Type'}).locator('#button');
    this.addTemplateBtn = this.generalItem.filter({hasText: 'Template'}).locator('#button');
    this.id = this.generalItem.filter({hasText: 'Id'}).locator('span');
    // Culture and Hostname
    this.cultureAndHostnamesBtn = page.getByLabel(/^Culture and Hostnames(\.\.\.)?$/);
    this.cultureLanguageDropdownBox = page.locator('[headline="Culture"]').getByLabel('combobox-input');
    this.addNewDomainBtn = page.getByLabel('Add new domain');
    this.domainTxt = page.getByLabel('Domain', {exact: true});
    this.domainLanguageDropdownBox = page.locator('[headline="Domains"]').getByLabel('combobox-input');
    this.deleteDomainBtn = page.locator('[headline="Domains"] [name="icon-trash"] svg');
    this.domainComboBox = page.locator('#domains uui-combobox');
    this.saveModalBtn = this.sidebarModal.getByLabel('Save', {exact: true});
    this.resetFocalPointBtn = this.page.getByLabel('Reset focal point');
    // List View
    this.enterNameInContainerTxt = this.container.getByLabel('Enter a name...');
    this.listView = page.locator('umb-document-table-collection-view');
    this.nameBtn = page.getByRole('button', {name: 'Name'});
    this.listViewTableRow = this.listView.locator('uui-table-row');
    this.publishSelectedListItems = page.getByRole('button', {name: /^Publish(\.\.\.)?$/});
    this.unpublishSelectedListItems = page.getByRole('button', {name: /^Unpublish(\.\.\.)?$/});
    this.duplicateToSelectedListItems = page.getByRole('button', {name: /^Duplicate to(\.\.\.)?$/});
    this.moveToSelectedListItems = page.getByRole('button', {name: /^Move to(\.\.\.)?$/});
    this.trashSelectedListItems = page.getByRole('button', {name: /^Trash(\.\.\.)?$/});
    this.modalContent = page.locator('umb-tree-picker-modal');
    this.trashBtn = page.getByLabel(/^Trash(\.\.\.)?$/);
    this.exactTrashBtn = page.getByRole('button', {name: 'Trash', exact: true});
    this.documentListView = page.locator('umb-document-table-collection-view');
    this.documentGridView = page.locator('umb-document-grid-collection-view');
    this.documentWorkspaceEditor = page.locator('umb-workspace-editor');
    this.documentBlueprintModal = page.locator('umb-create-blueprint-modal');
    this.documentBlueprintModalEnterNameTxt = this.documentBlueprintModal.locator('input');
    this.documentBlueprintSaveBtn = this.documentBlueprintModal.getByLabel('Save');
    this.emptyRecycleBinBtn = page.getByLabel('Empty Recycle Bin');
    this.confirmEmptyRecycleBinBtn = this.page.locator('#confirm').getByLabel('Empty Recycle Bin', {exact: true});
    this.duplicateToBtn = page.getByRole('button', {name: 'Duplicate to'});
    this.moveToBtn = page.getByRole('button', {name: 'Move to'});
    this.duplicateBtn = page.getByLabel('Duplicate', {exact: true});
    this.contentTreeRefreshBtn = page.locator('#header').getByLabel('#actions_refreshNode');
    this.sortChildrenBtn = page.getByRole('button', {name: 'Sort children'});
    this.rollbackBtn = page.getByRole('button', {name: 'Rollback'});
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
    this.expandChildItemsForContent = page.getByLabel('Expand child items for Content');
    this.actionsMenu = page.locator('uui-scroll-container');
    this.linkToDocumentBtn = page.locator('umb-link-picker-modal').getByLabel('Document', {exact: true});
    this.linkToMediaBtn = page.locator('umb-link-picker-modal').getByLabel('Media', {exact: true});
    this.linkToManualBtn = page.locator('umb-link-picker-modal').getByLabel('Manual', {exact: true});
    this.umbDocumentCollection = page.locator('umb-document-collection');
    this.documentTableColumnName = this.listView.locator('umb-document-table-column-name');
    //Block Grid - Block List
    this.addBlockElementBtn = page.locator('uui-button-group uui-button').first();
    this.formValidationMessage = page.locator('#splitViews umb-form-validation-message #messages');
    this.blockName = page.locator('#editor [slot="name"]');
    this.addBlockSettingsTabBtn = page.locator('umb-body-layout').getByRole('tab', {name: 'Settings'});
    this.editBlockEntryBtn = page.locator('[label="edit"] svg');
    this.deleteBlockEntryBtn = page.locator('[label="delete"] svg');
    this.blockGridEntry = page.locator('umb-block-grid-entry');
    this.blockListEntry = page.locator('umb-block-list-entry');
    // TipTap
    this.tipTapPropertyEditor = page.locator('umb-property-editor-ui-tiptap');
    this.tipTapEditor = this.tipTapPropertyEditor.locator('#editor .tiptap');
    this.uploadedSvgThumbnail = this.page.locator('umb-input-upload-field-svg img');
  }

  async enterContentName(name: string) {
    await expect(this.contentNameTxt).toBeVisible();
    await this.contentNameTxt.clear();
    await this.contentNameTxt.fill(name);
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
    await this.menuItemTree.filter({hasText: name}).last().locator('#caret-button').last().click();
  }

  async waitForModalVisible() {
    await this.openedModal.waitFor({state: 'attached'});
  }

  async waitForModalHidden() {
    await this.openedModal.waitFor({state: 'hidden'});
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

  async doesLinkHaveText(text: string) {
    await expect(this.linkContent).toHaveText(text);
  }

  async doesHistoryHaveText(text: string) {
    await expect(this.historyItems).toHaveText(text);
  }

  async doesPublicationStatusHaveText(text: string) {
    await expect(this.publicationStatus).toHaveText(text);
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
    await expect(this.sidebarModal.getByLabel(templateName)).toBeDisabled();
  }

  // Culture and Hostnames
  async clickCultureAndHostnamesButton() {
    await this.cultureAndHostnamesBtn.click();
  }

  async selectCultureLanguageOption(option: string) {
    await this.cultureLanguageDropdownBox.click();
    await this.page.getByText(option).click();
  }

  async selectDomainLanguageOption(option: string, index: number = 0) {
    await this.domainLanguageDropdownBox.nth(index).click();
    await this.domainComboBox.nth(index).getByText(option).click();
  }

  async clickAddNewDomainButton() {
    await this.addNewDomainBtn.click();
  }

  async enterDomain(value: string, index: number = 0) {
    await this.domainTxt.nth(index).clear();
    await this.domainTxt.nth(index).fill(value);
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
    const contentPickerLocator = this.page.locator('[name="' + contentPickerName + '"]');
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
    await this.page.locator('[name="' + memberName + '"]').getByLabel('Remove').click();
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
    await this.removeFilesBtn.click();
  }

  // True/false
  async clickToggleButton() {
    await this.toggleBtn.click();
  }

  async doesToggleHaveLabel(label: string) {
    return await expect(this.toggleInput).toHaveAttribute('aria-label', label);
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
    const propertyLocator = this.documentWorkspace.locator('umb-property').filter({hasText: propertyName}).locator('#input');
    await expect(propertyLocator).toBeVisible();
    await expect(propertyLocator).toBeEditable({editable: isEditable});
  }

  async doesDocumentPropertyHaveValue(propertyName: string, value: string) {
    const propertyLocator = this.documentWorkspace.locator('umb-property').filter({hasText: propertyName}).locator('#input');
    await expect(propertyLocator).toHaveValue(value);
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
    await this.expandChildItemsForContent.click();
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
    await this.sortChildrenBtn.click();
  }

  async clickRollbackButton() {
    await this.rollbackBtn.click();
  }

  async clickRollbackContainerButton() {
    await this.rollbackContainerBtn.click();
  }

  async clickLatestRollBackItem() {
    await this.rollbackItem.last().click();
  }

  async clickPublicAccessButton() {
    await this.publicAccessBtn.click();
  }

  async addGroupBasedPublicAccess(memberGroupName: string, documentName: string) {
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
    await this.sortBtn.click();
  }

  async doesIndexDocumentInTreeContainName(parentName: string, childName: string, index: number) {
    await expect(this.documentTreeItem.locator('[label="' + parentName + '"]').locator('umb-tree-item').nth(index).locator('#label')).toHaveText(childName);
  }

  async selectMemberGroup(memberGroupName: string) {
    await this.uuiCheckbox.getByLabel(memberGroupName).click();
  }

  async isPermissionInActionsMenuVisible(permissionName: string, isVisible: boolean = true) {
    await expect(this.actionsMenu.getByRole('button', {
      name: permissionName,
      exact: true
    })).toBeVisible({visible: isVisible});
  }

  async clickDocumentLinkButton() {
    await this.linkToDocumentBtn.click();
  }

  async clickMediaLinkButton() {
    await this.linkToMediaBtn.click();
  }

  async clickManualLinkButton() {
    await this.linkToManualBtn.click();
  }

  // Block Grid - Block List
  async clickAddBlockElementButton() {
    await this.addBlockElementBtn.click();
  }

  async isAddBlockElementButtonVisible(isVisible: boolean = true) {
    await expect(this.addBlockElementBtn).toBeVisible({visible: isVisible});
  }

  async isAddBlockElementButtonWithLabelVisible(label: string, isVisible: boolean = true) {
    await expect(this.addBlockElementBtn.getByLabel(label)).toBeVisible({visible: isVisible});
  }

  async doesFormValidationMessageContainText(text: string) {
    await expect(this.formValidationMessage).toContainText(text);
  }

  async doesBlockElementHaveName(name: string) {
    await expect(this.blockName).toContainText(name);
  }

  async clickAddBlockSettingsTabButton() {
    await this.addBlockSettingsTabBtn.click();
  }

  async clickEditBlockGridBlockButton() {
    await this.blockGridEntry.hover();
    await this.editBlockEntryBtn.click();
  }

  async clickDeleteBlockGridBlockButton() {
    await this.blockGridEntry.hover();
    await this.deleteBlockEntryBtn.click();
  }

  async clickEditBlockListBlockButton() {
    await this.blockListEntry.hover();
    await this.editBlockEntryBtn.click();
  }

  async clickDeleteBlockListBlockButton() {
    await this.blockListEntry.hover();
    await this.deleteBlockEntryBtn.click();
  }

  // TipTap
  async enterRTETipTapEditor(value: string) {
    await this.tipTapEditor.clear();
    await this.tipTapEditor.fill(value);
  }

  async clickTipTapToolbarIconWithTitle(iconTitle: string) {
    await this.tipTapPropertyEditor.getByTitle(iconTitle, {exact: true}).locator('svg').click();
  }

  async doesUploadedSvgThumbnailHaveSrc(imageSrc: string) {
    await expect(this.uploadedSvgThumbnail).toHaveAttribute('src', imageSrc);
  }
}