import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class ContentUiHelper extends UiBaseLocators {
  private readonly contentNameTxt: Locator;
  private readonly saveAndPublishBtn: Locator;
  private readonly actionsBtn: Locator;
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
  private readonly createDocumentBlueprintBtn: Locator;
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
  private readonly documentTableColumnNames: Locator;
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

  constructor(page: Page) {
    super(page);
    this.contentNameTxt = page.locator('#name-input input');
    this.saveAndPublishBtn = page.getByLabel('Save And Publish');
    this.actionsBtn = page.getByLabel('Actions', {exact: true});
    this.publishBtn = page.getByLabel('Publish', {exact: true});
    this.unpublishBtn = page.getByLabel('Unpublish', {exact: true});
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
    this.createDocumentBlueprintBtn = page.getByLabel('Create Document Blueprint');
    this.dropdown = page.locator('select#native');
    this.setADateTxt = page.getByLabel('Set a date...');
    this.chooseMediaPickerBtn = page.locator('umb-property-editor-ui-media-picker #btn-add');
    this.chooseMemberPickerBtn = page.locator('umb-property-editor-ui-member-picker #btn-add');
    this.numericTxt = page.locator('umb-property-editor-ui-number input');
    this.addMultiURLPickerBtn = page.locator('umb-property-editor-ui-multi-url-picker #btn-add');
    this.linkTxt = page.getByLabel('URL');
    this.anchorQuerystringTxt = page.getByLabel('#value or ?key=value');
    this.linkTitleTxt = page.getByLabel('Link title');
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
    this.documentTableColumnNames = page.locator('umb-document-table-column-name');
    this.searchTxt = this.documentWorkspace.locator('#input-search input');
    this.variantSelectorBtn = page.locator('#variant-selector-toggle');
    this.variantAddModeBtn = page.locator('.variant-selector-switch-button.add-mode');
    this.saveAndCloseBtn = page.getByLabel('Save and close');

    // Info tab
    this.infoTab = page.getByRole('tab', {name: 'Info'});
    this.linkContent = page.locator('.link-content');
    this.historyItems = page.locator('umb-history-item');
    this.generalItem = page.locator('.general-item');
    this.publicationStatus = this.generalItem.filter({hasText: 'Publication Status'}).locator('uui-tag');
    this.createdDate = this.generalItem.filter({hasText: 'Created'}).locator('umb-localize-date');
    this.editDocumentTypeBtn = this.generalItem.filter({hasText: 'Document Type'}).locator('#button');
    this.addTemplateBtn = this.generalItem.filter({hasText: 'Template'}).locator('#button');
    this.id = this.generalItem.filter({hasText: 'Id'}).locator('span');
    // Culture and Hostname
    this.cultureAndHostnamesBtn = page.getByLabel('Culture and Hostnames');
    this.cultureLanguageDropdownBox = page.locator('[headline="Culture"]').getByLabel('combobox-input');
    this.addNewDomainBtn = page.getByLabel('Add new domain');
    this.domainTxt = page.getByLabel('Domain', {exact: true});
    this.domainLanguageDropdownBox = page.locator('[headline="Domains"]').getByLabel('combobox-input');
    this.deleteDomainBtn = page.locator('[headline="Domains"] [name="icon-trash"] svg');
    this.domainComboBox = page.locator('#domains uui-combobox');
    this.saveModalBtn = this.sidebarModal.getByLabel('Save', {exact: true});
    this.resetFocalPointBtn = this.page.getByLabel('Reset focal point');

    // List View
    this.enterNameInContainerTxt = page.locator('#container').getByLabel('Enter a name...');
    this.listView = page.locator('umb-document-table-collection-view');
    this.nameBtn = page.getByRole('button', {name: 'Name'});
    this.listViewTableRow = this.listView.locator('uui-table-row');
    this.publishSelectedListItems = page.getByRole('button', {name: 'Publish', exact: true});
    this.unpublishSelectedListItems = page.getByRole('button', {name: 'Unpublish', exact: true});
    this.duplicateToSelectedListItems = page.getByRole('button', {name: 'Duplicate to', exact: true});
    this.moveToSelectedListItems = page.getByRole('button', {name: 'Move to', exact: true});
    this.trashSelectedListItems = page.getByRole('button', {name: 'Trash', exact: true});
    this.modalContent = page.locator('umb-tree-picker-modal');
    this.trashBtn = page.getByLabel('Trash');
    this.documentListView = page.locator('umb-document-table-collection-view');
    this.documentGridView = page.locator('umb-document-grid-collection-view');
  }

  async enterContentName(name: string) {
    await expect(this.contentNameTxt).toBeVisible();
    await this.contentNameTxt.clear();
    await this.contentNameTxt.fill(name);
  }

  async clickSaveAndPublishButton() {
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
    await this.menuItemTree.getByText(contentName, {exact: true}).click();
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
    await this.infoTab.click({force: true});
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
    await this.chooseModalBtn.click();
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

  async removeContentPicker(contentPickerName: string) {
    await this.page.locator('[name="' + contentPickerName + '"]').getByLabel('Remove').click();
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

  async clickMediaByNameInMediaPicker(mediaName: string) {
    await this.mediaCardItems.filter({hasText: mediaName}).click();
  }

  async selectMediaByName(mediaName: string) {
    await this.clickChooseMediaPickerButton();
    await this.clickMediaByNameInMediaPicker(mediaName);
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

  async enterLink(value: string) {
    await this.linkTxt.clear();
    await this.linkTxt.fill(value);
  }

  async enterAnchorOrQuerystring(value: string) {
    await this.anchorQuerystringTxt.clear();
    await this.anchorQuerystringTxt.fill(value);
  }

  async enterLinkTitle(value: string) {
    await this.linkTitleTxt.clear();
    await this.linkTitleTxt.fill(value);
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

  async doesDocumentWorkspaceHaveText(text: string) {
    return expect(this.documentWorkspace).toContainText(text);
  }

  async doesDocumentTableColumnNameValuesMatch(expectedValues: string[]) {
    return expectedValues.forEach((text, index) => {
      expect(this.documentTableColumnNames.nth(index)).toHaveText(text);
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
    await this.enterNameInContainerTxt.fill(name);
  }

  async goToContentInListViewWithName(contentName: string) {
    await this.listView.getByLabel(contentName).click();
  }

  async doesListViewHaveNoItemsInList() {
    await expect(this.listView.filter({hasText: 'There are no items to show in the list.'})).toBeVisible();
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
    await this.listViewTableRow.filter({hasText: name}).click();
  }

  async clickPublishSelectedListItems() {
    await this.publishSelectedListItems.click();
  }

  async clickUnpublishSelectedListItems() {
    await this.unpublishSelectedListItems.click();
  }

  async clickDuplicateToSelectedListItems() {
    await this.duplicateToSelectedListItems.click({force: true});
  }

  async clickMoveToSelectedListItems() {
    await this.moveToSelectedListItems.click({force: true});
  }

  async clickTrashSelectedListItems() {
    await this.trashSelectedListItems.click();
  }

  async selectDocumentWithNameAtRoot(name: string) {
    await this.clickCaretButtonForName('Content');
    await this.modalContent.getByLabel(name).click({force: true});
    await this.clickChooseButton();
  }

  async clickTrashButton(toForceClick: boolean = false) {
    await this.trashBtn.click({force: toForceClick});
  }

  async isDocumentListViewVisible(isVisible: boolean = true) {
    await expect(this.documentListView).toBeVisible({visible: isVisible});
  }

  async isDocumentGridViewVisible(isVisible: boolean = true) {
    await expect(this.documentGridView).toBeVisible({visible: isVisible});
  }
}