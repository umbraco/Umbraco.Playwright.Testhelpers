import {expect, Locator, Page} from "@playwright/test"
import {ConstantHelper} from "./ConstantHelper";
import {BasePage} from "./BasePage";

export class UiBaseLocators extends BasePage {
  public readonly saveBtn: Locator;
  public readonly chooseBtn: Locator;
  public readonly submitBtn: Locator;
  public readonly createFolderBtn: Locator;
  public readonly breadcrumbBtn: Locator;
  public readonly confirmToDeleteBtn: Locator;
  public readonly deleteExactBtn: Locator;
  public readonly confirmCreateFolderBtn: Locator;
  public readonly insertBtn: Locator;
  public readonly modalCaretBtn: Locator;
  public readonly queryBuilderBtn: Locator;
  public readonly queryBuilderOrderedBy: Locator;
  public readonly queryBuilderCreateDate: Locator;
  public readonly folderNameTxt: Locator;
  public readonly textAreaInputArea: Locator;
  public readonly wherePropertyAliasBtn: Locator;
  public readonly whereOperatorBtn: Locator;
  public readonly whereConstrainValueTxt: Locator;
  public readonly orderByPropertyAliasBtn: Locator;
  public readonly ascendingBtn: Locator;
  public readonly queryBuilderShowCode: Locator;
  public readonly createThreeDotsBtn: Locator;
  public readonly newFolderThreeDotsBtn: Locator;
  public readonly renameThreeDotsBtn: Locator;
  public readonly newNameTxt: Locator;
  public readonly renameModalBtn: Locator;
  public readonly createBtn: Locator;
  public readonly successState: Locator;
  public readonly chooseModalBtn: Locator;
  public readonly addBtn: Locator;
  public readonly renameFolderThreeDotsBtn: Locator;
  public readonly renameFolderBtn: Locator;
  public readonly updateFolderBtn: Locator;
  public readonly filterChooseBtn: Locator;
  public readonly updateBtn: Locator;
  public readonly changeBtn: Locator;
  public readonly propertyNameTxt: Locator;
  public readonly selectPropertyEditorBtn: Locator;
  public readonly addGroupBtn: Locator;
  public readonly iAmDoneReorderingBtn: Locator;
  public readonly reorderBtn: Locator;
  public readonly compositionsBtn: Locator;
  public readonly addTabBtn: Locator;
  public readonly descriptionBtn: Locator;
  public readonly enterDescriptionTxt: Locator;
  public readonly mandatoryToggle: Locator;
  public readonly validation: Locator;
  public readonly regexTxt: Locator;
  public readonly regexMessageTxt: Locator;
  public readonly structureTabBtn: Locator;
  public readonly allowAtRootBtn: Locator;
  public readonly addPropertyBtn: Locator;
  public readonly typeToFilterSearchTxt: Locator;
  public readonly editorSettingsBtn: Locator;
  public readonly labelAboveBtn: Locator;
  public readonly unnamedTabTxt: Locator;
  public readonly deleteThreeDotsBtn: Locator;
  public readonly removeExactBtn: Locator;
  public readonly confirmBtn: Locator;
  public readonly disableBtn: Locator;
  public readonly confirmDisableBtn: Locator;
  public readonly enableBtn: Locator;
  public readonly confirmEnableBtn: Locator;
  public readonly iconBtn: Locator;
  public readonly aliasLockBtn: Locator;
  public readonly aliasNameTxt: Locator;
  public readonly deleteFolderThreeDotsBtn: Locator;
  public readonly createLink: Locator;
  public readonly insertValueBtn: Locator;
  public readonly insertPartialViewBtn: Locator;
  public readonly insertDictionaryItemBtn: Locator;
  public readonly chooseFieldDropDown: Locator;
  public readonly systemFieldsOption: Locator;
  public readonly chooseFieldValueDropDown: Locator;
  public readonly renameBtn: Locator;
  public readonly returnedItemsCount: Locator;
  public readonly chooseRootContentBtn: Locator;
  public readonly queryResults: Locator;
  public readonly reloadBtn: Locator;
  public readonly confirmToRemoveBtn: Locator;
  public readonly confirmToSubmitBtn: Locator;
  public readonly typeGroups: Locator;
  public readonly allowedChildNodesModal: Locator;
  public readonly addCollectionBtn: Locator;
  public readonly errorNotification: Locator;
  public readonly confirmRenameBtn: Locator;
  public readonly successNotification: Locator;
  public readonly leftArrowBtn: Locator;
  public readonly clickToUploadBtn: Locator;
  public readonly backOfficeHeader: Locator;
  public readonly failedStateButton: Locator;
  public readonly sidebarModal: Locator;
  public readonly enterAName: Locator;
  public readonly mediaCardItems: Locator;
  public readonly enterPropertyEditorDescriptionTxt: Locator;
  public readonly breadcrumbsTemplateModal: Locator;
  public readonly containerChooseBtn: Locator;
  public readonly documentTypeNode: Locator;
  public readonly groupLabel: Locator;
  public readonly containerSaveAndPublishBtn: Locator;
  public readonly confirmTrashBtn: Locator;
  public readonly recycleBinBtn: Locator;
  public readonly recycleBinMenuItemCaretBtn: Locator;
  public readonly recycleBinMenuItem: Locator;
  public readonly gridBtn: Locator;
  public readonly listBtn: Locator;
  public readonly viewBundleBtn: Locator;
  public readonly chooseDocumentInputBtn: Locator;
  public readonly chooseMediaInputBtn: Locator;
  public readonly container: Locator;
  public readonly createDocumentBlueprintBtn: Locator;
  public readonly actionBtn: Locator;
  public readonly mediaPickerModalSubmitBtn: Locator;
  public readonly deleteBtn: Locator;
  public readonly createModalBtn: Locator;
  public readonly mediaCaptionAltTextModalSubmitBtn: Locator;
  public readonly embeddedMediaModal: Locator;
  public readonly embeddedURLTxt: Locator;
  public readonly embeddedRetrieveBtn: Locator;
  public readonly embeddedMediaModalConfirmBtn: Locator;
  public readonly embeddedPreview: Locator;
  public readonly sectionSidebar: Locator;
  public readonly actionsMenuContainer: Locator;
  public readonly menuItem: Locator;
  public readonly property: Locator;
  public readonly currentUserAvatarBtn: Locator;
  public readonly newPasswordTxt: Locator;
  public readonly confirmPasswordTxt: Locator;
  public readonly currentPasswordTxt: Locator;
  public readonly createOptionActionListModal: Locator;
  public readonly createActionButtonCollection: Locator;
  public readonly createActionBtn: Locator;
  public readonly collectionTreeItemTableRow: Locator;
  public readonly folderBtn: Locator;
  public readonly reloadChildrenBtn: Locator;
  public readonly confirmActionModalEntityReferences: Locator;
  public readonly referenceHeadline: Locator;
  public readonly entityItemRef: Locator;
  public readonly validationMessage: Locator;
  public readonly successStateIcon: Locator;
  public readonly workspaceAction: Locator;
  public readonly entityAction: Locator;
  public readonly openEntityAction: Locator;
  public readonly caretBtn: Locator;
  public readonly workspaceActionMenuBtn: Locator;
  public readonly monacoEditor: Locator;
  public readonly createNewDocumentBlueprintBtn: Locator;
  public readonly openedModal: Locator;
  public readonly uiLoader: Locator;
  public readonly createDocumentBlueprintModal: Locator;
  public readonly inputDropzone: Locator;
  public readonly imageCropperField: Locator;
  public readonly inputUploadField: Locator;
  public readonly entityItem: Locator;
  public readonly sectionLinks: Locator;
  public readonly restoreBtn: Locator;
  public readonly backOfficeMain: Locator;
  public readonly firstPaginationBtn: Locator;
  public readonly nextPaginationBtn: Locator;
  public readonly nextBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.saveBtn = page.getByLabel('Save', {exact: true});
    this.submitBtn = page.getByLabel('Submit');
    this.deleteExactBtn = page.getByRole('button', {name: 'Delete', exact: true});
    this.confirmToDeleteBtn = page.locator('#confirm').getByLabel('Delete');
    this.confirmCreateFolderBtn = page.locator('#confirm').getByLabel('Create Folder');
    this.breadcrumbBtn = page.getByLabel('Breadcrumb');
    this.createFolderBtn = page.getByLabel('Create folder');
    this.insertBtn = page.locator('uui-box uui-button').filter({hasText: 'Insert'});
    this.sidebarModal = page.locator('uui-modal-sidebar');
    this.modalCaretBtn = this.sidebarModal.locator('#caret-button');
    this.enterAName = page.getByLabel('Enter a name...', {exact: true});
    this.queryBuilderBtn = page.locator('#query-builder-button');
    this.queryBuilderOrderedBy = page.locator('#property-alias-dropdown').getByLabel('Property alias');
    this.queryBuilderCreateDate = page.locator('#property-alias-dropdown').getByText('CreateDate').locator("..");
    this.folderNameTxt = page.getByLabel('Enter a folder name');
    this.textAreaInputArea = page.locator('textarea.ime-text-area');
    this.wherePropertyAliasBtn = page.locator('#property-alias-dropdown');
    this.whereOperatorBtn = page.locator('#operator-dropdown');
    this.whereConstrainValueTxt = page.getByLabel('constrain value');
    this.orderByPropertyAliasBtn = page.locator('#sort-dropdown');
    this.ascendingBtn = page.locator('[key="template_ascending"]');
    this.queryBuilderShowCode = page.locator('umb-code-block');
    this.createThreeDotsBtn = page.getByText('Create…', {exact: true});
    this.chooseBtn = page.getByLabel('Choose', {exact: true});
    this.containerChooseBtn = page.locator('#container').getByLabel('Choose');
    this.containerSaveAndPublishBtn = page.locator('#container').getByLabel('Save and Publish');
    this.newFolderThreeDotsBtn = page.getByLabel('New Folder…');
    this.renameThreeDotsBtn = page.getByLabel('Rename…', {exact: true});
    this.newNameTxt = page.getByRole('textbox', {name: 'Enter new name...'});
    this.renameModalBtn = page.locator('umb-rename-modal').getByLabel('Rename');
    this.createBtn = page.getByRole('button', {name: /^Create(…)?$/});
    this.actionsMenuContainer = page.locator('uui-scroll-container');
    this.successState = page.locator('[state="success"]');
    this.chooseModalBtn = this.sidebarModal.locator('[look="primary"]').getByLabel('Choose');
    this.addBtn = page.getByRole('button', {name: 'Add', exact: true});
    this.renameFolderThreeDotsBtn = page.getByRole('button', {name: 'Rename folder…'})
    this.renameFolderBtn = page.getByLabel('Rename folder');
    this.confirmRenameBtn = page.locator('#confirm').getByLabel('Rename');
    this.updateFolderBtn = page.getByLabel('Update folder');
    this.filterChooseBtn = page.locator('button').filter({hasText: 'Choose'});
    this.updateBtn = page.getByLabel('Update');
    this.changeBtn = page.getByLabel('Change');
    this.propertyNameTxt = page.getByTestId('input:entity-name').locator('#input').first();
    this.selectPropertyEditorBtn = page.getByLabel('Select Property Editor');
    this.addGroupBtn = page.getByLabel('Add group', {exact: true});
    this.iAmDoneReorderingBtn = page.getByLabel('I am done reordering');
    this.reorderBtn = page.getByLabel('Reorder');
    this.compositionsBtn = page.getByLabel('Compositions');
    this.addTabBtn = page.getByLabel('Add tab');
    this.descriptionBtn = page.getByLabel('Description');
    this.enterDescriptionTxt = page.getByLabel('Enter a description...');
    this.mandatoryToggle = page.locator('#mandatory #toggle');
    this.validation = page.locator('#native');
    this.regexTxt = page.locator('input[name="pattern"]');
    this.regexMessageTxt = page.locator('textarea[name="pattern-message"]');
    this.structureTabBtn = page.locator('uui-tab').filter({hasText: 'Structure'}).locator('svg');
    this.allowAtRootBtn = page.locator('label').filter({hasText: 'Allow at root'});
    this.addPropertyBtn = page.getByLabel('Add property', {exact: true});
    this.typeToFilterSearchTxt = page.locator('[type="search"] #input');
    this.editorSettingsBtn = page.getByLabel('Editor settings');
    this.labelAboveBtn = page.locator('.appearance-option').filter({hasText: 'Label above'});
    this.firstPaginationBtn = this.page.locator('umb-collection-pagination').getByLabel('First');
    this.nextPaginationBtn = this.page.locator('umb-collection-pagination').getByLabel('Next');
    this.nextBtn = this.page.getByLabel('Next');
    // tab: means that the tab is unnamed
    this.unnamedTabTxt = page.getByTestId('tab:').getByTestId('tab:name-input').locator('#input');
    this.deleteThreeDotsBtn = page.getByLabel('Delete…');
    this.removeExactBtn = page.getByLabel('Remove', {exact: true});
    this.confirmBtn = page.getByLabel('Confirm');
    this.disableBtn = page.getByLabel('Disable', {exact: true});
    this.confirmDisableBtn = page.locator('#confirm').getByLabel('Disable');
    this.confirmToSubmitBtn = page.locator('#confirm').getByLabel('Submit');
    this.enableBtn = page.getByLabel('Enable');
    this.confirmEnableBtn = page.locator('#confirm').getByLabel('Enable');
    this.iconBtn = page.getByLabel('icon');
    this.aliasLockBtn = page.locator('#name').getByLabel('Unlock input');
    this.aliasNameTxt = page.locator('#name').getByLabel('alias');
    this.deleteFolderThreeDotsBtn = page.locator('#action-modal').getByLabel('Delete Folder...');
    this.createLink = page.getByRole('link', {name: 'Create', exact: true});
    this.insertValueBtn = page.locator('uui-button').filter({has: page.locator('[key="template_insertPageField"]')});
    this.insertPartialViewBtn = page.locator('uui-button').filter({has: page.locator('[key="template_insertPartialView"]')});
    this.insertDictionaryItemBtn = page.locator('uui-button').filter({has: page.locator('[key="template_insertDictionaryItem"]')});
    this.chooseFieldDropDown = page.locator('#preview #expand-symbol-wrapper');
    this.systemFieldsOption = page.getByText('System fields');
    this.chooseFieldValueDropDown = page.locator('#value #expand-symbol-wrapper');
    this.renameBtn = page.getByRole('button', {name: /^Rename(…)?$/});
    this.returnedItemsCount = page.locator('#results-count');
    this.chooseRootContentBtn = page.getByLabel('Choose root document');
    this.queryResults = page.locator('.query-results');
    this.reloadBtn = page.getByRole('button', {name: 'Reload', exact: true});
    this.confirmToRemoveBtn = page.locator('#confirm').getByLabel('Remove');
    this.typeGroups = page.locator('umb-content-type-design-editor-group');
    this.allowedChildNodesModal = page.locator('umb-tree-picker-modal');
    this.addCollectionBtn = page.locator('umb-input-content-type-collection-configuration #create-button');
    this.errorNotification = page.locator('uui-toast-notification[open][color="danger"]');
    this.successNotification = page.locator('uui-toast-notification[open][color="positive"]');
    this.leftArrowBtn = page.locator('[name="icon-arrow-left"] svg');
    this.clickToUploadBtn = page.locator('#splitViews').getByRole('button', {name: 'Click to upload'});
    this.backOfficeHeader = page.locator('umb-backoffice-header');
    this.failedStateButton = page.locator('uui-button[state="failed"]');
    this.mediaCardItems = page.locator('uui-card-media');
    this.enterPropertyEditorDescriptionTxt = this.sidebarModal.getByTestId('input:entity-description').locator('#textarea');
    this.breadcrumbsTemplateModal = this.sidebarModal.locator('umb-template-workspace-editor uui-breadcrumbs');
    this.documentTypeNode = page.locator('uui-ref-node-document-type');
    this.groupLabel = page.getByLabel('Group', {exact: true});
    this.confirmTrashBtn = page.locator('#confirm').getByLabel('Trash');
    this.recycleBinBtn = page.getByLabel('Recycle Bin', {exact: true});
    this.recycleBinMenuItem = page.locator('uui-menu-item[label="Recycle Bin"]');
    this.recycleBinMenuItemCaretBtn = this.recycleBinMenuItem.locator('#caret-button');
    this.gridBtn = page.getByLabel('Grid');
    this.listBtn = page.getByLabel('List');
    this.viewBundleBtn = page.locator('umb-collection-view-bundle uui-button svg');
    this.createDocumentBlueprintModal = page.locator('umb-document-blueprint-options-create-modal');
    this.createDocumentBlueprintBtn = page.getByLabel(/^Create Document Blueprint(…)?$/);
    this.createNewDocumentBlueprintBtn = this.createDocumentBlueprintModal.locator('umb-ref-item', {hasText: 'Document Blueprint for'});
    this.chooseDocumentInputBtn = page.locator('umb-input-document').getByLabel('Choose');
    this.chooseMediaInputBtn = page.locator('umb-input-media').getByLabel('Choose');
    this.container = page.locator('#container');
    this.actionBtn = page.getByTestId('workspace:action-menu-button');
    this.mediaPickerModalSubmitBtn = page.locator('umb-media-picker-modal').getByLabel('Submit');
    this.deleteBtn = page.getByRole('button', {name: /^Delete(…)?$/});
    this.createModalBtn = this.sidebarModal.getByLabel('Create', {exact: true});
    this.mediaCaptionAltTextModalSubmitBtn = page.locator('umb-media-caption-alt-text-modal').getByLabel('Submit');
    this.embeddedMediaModal = page.locator('umb-embedded-media-modal');
    this.embeddedURLTxt = this.embeddedMediaModal.locator('[label="URL"] #input');
    this.embeddedRetrieveBtn = this.embeddedMediaModal.locator('[label="Retrieve"]');
    this.embeddedMediaModalConfirmBtn = this.embeddedMediaModal.getByLabel('Confirm');
    this.embeddedPreview = this.embeddedMediaModal.locator('[label="Preview"]');
    this.sectionSidebar = page.locator('umb-section-sidebar');
    this.menuItem = page.locator('uui-menu-item');
    this.property = page.locator('umb-property');
    this.currentUserAvatarBtn = page.getByTestId('header-app:Umb.HeaderApp.CurrentUser').locator('uui-avatar');
    this.currentPasswordTxt = page.locator('input[name="oldPassword"]');
    this.newPasswordTxt = page.locator('input[name="newPassword"]');
    this.confirmPasswordTxt = page.locator('input[name="confirmPassword"]');
    this.createOptionActionListModal = page.locator('umb-entity-create-option-action-list-modal');
    this.createActionButtonCollection = page.locator('umb-collection-create-action-button');
    this.createActionBtn = this.createActionButtonCollection.locator('[label="Create"]');
    this.collectionTreeItemTableRow = page.locator('umb-collection-workspace-view umb-table uui-table-row');
    this.folderBtn = this.createOptionActionListModal.locator('umb-ref-item', {hasText: 'Folder'});
    this.reloadChildrenBtn = page.getByRole('button', {name: 'Reload children'});
    this.confirmActionModalEntityReferences = page.locator('umb-confirm-action-modal-entity-references,umb-confirm-bulk-action-modal-entity-references');
    this.referenceHeadline = this.confirmActionModalEntityReferences.locator('#reference-headline').first();
    this.entityItemRef = this.confirmActionModalEntityReferences.locator('uui-ref-list').first().getByTestId('entity-item-ref');
    this.validationMessage = page.locator('umb-form-validation-message').locator('#messages');
    this.successStateIcon = this.successState.locator('#state');
    this.workspaceAction = page.locator('umb-workspace-action');
    this.caretBtn = page.locator('#caret-button');
    this.sectionLinks = page.getByTestId('section-links');
    // Entity Action
    this.entityAction = page.locator('umb-entity-action-list umb-entity-action');
    this.openEntityAction = page.locator('#action-modal[open]').locator(this.entityAction);
    // Workspace Entity Action
    this.workspaceActionMenuBtn = page.getByTestId('workspace:action-menu-button');
    this.monacoEditor = page.locator('.monaco-editor');
    this.openedModal = page.locator('uui-modal-container[backdrop]');
    this.uiLoader = page.locator('uui-loader');
    this.inputDropzone = page.locator('umb-input-dropzone');
    this.imageCropperField = page.locator('umb-image-cropper-field');
    this.inputUploadField = page.locator('umb-input-upload-field').locator('#wrapperInner');
    this.entityItem = page.locator('umb-entity-item-ref');
    this.restoreBtn = page.getByLabel('Restore', {exact: true});
    this.backOfficeMain = page.locator('umb-backoffice-main');
  }

  async clickActionsMenuForNameInSectionSidebar(name: string) {
    await this.sectionSidebar.locator('[label="' + name + '"]').hover();
    await this.sectionSidebar.locator('[label="' + name + '"] >> [label="Open actions menu"]').first().click();
  }

  async clickActionsMenuForName(name: string) {
    await expect(this.page.locator('uui-menu-item[label="' + name + '"]').locator('#menu-item').first()).toBeVisible();
    // We need to wait for the load to be finished, otherwise we would run into flaky tests
    await this.page.waitForTimeout(ConstantHelper.wait.medium);
    await this.page.locator('uui-menu-item[label="' + name + '"]').locator('#menu-item').first().hover({force: true});
    await this.page.locator('uui-menu-item[label="' + name + '"] #action-modal').first().click({force: true});
  }

  async isActionsMenuForNameVisible(name: string, isVisible = true) {
    await this.page.locator('uui-menu-item[label="' + name + '"]').click();
    await expect(this.page.locator('uui-menu-item[label="' + name + '"] #action-modal').first()).toBeVisible({visible: isVisible});
  }

  async clickCaretButtonForName(name: string) {
    await this.isCaretButtonWithNameVisible(name);
    await this.page.locator('uui-menu-item[label="' + name + '"]').locator('#caret-button').first().click();
  }

  async isCaretButtonWithNameVisible(name: string, isVisible = true) {
    await expect(this.page.locator('uui-menu-item[label="' + name + '"]').locator('#caret-button').first()).toBeVisible({visible: isVisible});
  }

  async clickCaretButton() {
    await this.page.locator('#caret-button').click();
  }

  async openCaretButtonForName(name: string, isInModal: boolean = false) {
    let menuItem: Locator;
    if (isInModal) {
      menuItem = this.sidebarModal.locator('uui-menu-item[label="' + name + '"]');
    } else {
      menuItem = this.page.locator('uui-menu-item[label="' + name + '"]');
    }
    const isCaretButtonOpen = await menuItem.getAttribute('show-children');

    if (isCaretButtonOpen === null) {
      await this.clickCaretButtonForName(name);
    }
  }

  async reloadTree(treeName: string) {
    // Waits until the tree item is visible
    await expect(this.page.getByLabel(treeName, {exact: true})).toBeVisible();
    await this.page.waitForTimeout(ConstantHelper.wait.short);
    await this.clickActionsMenuForName(treeName);
    await this.clickReloadChildrenActionMenuOption();

    await this.openCaretButtonForName(treeName);
  }

  async clickReloadButton() {
    await this.click(this.reloadBtn);
  }

  async clickReloadChildrenButton() {
    await this.click(this.reloadChildrenBtn, {force: true});
  }

  async isSuccessStateVisibleForSaveButton(isVisible: boolean = true) {
    const regex = new RegExp(`^workspace-action:.*Save$`);
    const saveButtonLocator = this.page.getByTestId(regex);
    const saveBtn = this.workspaceAction.filter({has: saveButtonLocator});
    await expect(saveBtn.locator(this.successState)).toBeVisible({visible: isVisible, timeout: ConstantHelper.timeout.long});
  }

  async clickSaveButton() {
    await this.click(this.saveBtn);
    await this.page.waitForTimeout(ConstantHelper.wait.short);
  }

  async clickChooseButton() {
    await this.click(this.chooseBtn);
  }

  async clickChooseContainerButton() {
    await this.click(this.containerChooseBtn);
  }

  async clickFilterChooseButton() {
    await this.click(this.filterChooseBtn);
  }

  async clickRenameFolderThreeDotsButton() {
    await this.click(this.renameFolderThreeDotsBtn);
  }

  async clickRenameFolderButton() {
    await this.clickRenameButton();
  }

  async clickConfirmRenameButton() {
    await this.click(this.confirmRenameBtn);
  }

  async clickUpdateFolderButton() {
    await this.click(this.updateFolderBtn);
  }

  async clickUpdateButton() {
    await this.click(this.updateBtn);
  }

  async clickSubmitButton() {
    await this.click(this.submitBtn);
  }

  async clickConfirmToSubmitButton() {
    await this.click(this.confirmToSubmitBtn);
  }

  async clickChangeButton() {
    await this.click(this.changeBtn);
  }

  async clickExactLinkWithName(name: string, toForce: boolean = false) {
    const exactLinkWithNameLocator = this.page.getByRole('link', {name: name, exact: true});
    await this.click(exactLinkWithNameLocator, {force: toForce});
  }

  async enterAliasName(aliasName: string) {
    // Unlocks alias
    await this.page.waitForTimeout(ConstantHelper.wait.short);
    await this.click(this.aliasLockBtn, {force: true});
    await this.enterText(this.aliasNameTxt, aliasName);
  }

  async updateIcon(iconName: string) {
    // Force click is needed
    await this.click(this.iconBtn, {force: true});
    await this.searchForTypeToFilterValue(iconName);
    await this.clickLabelWithName(iconName, true, true);
    await this.clickSubmitButton();
  }

  async clickTextButtonWithName(name: string) {
    await this.click(this.page.getByText(name, {exact: true}));
  }

  async clickSelectPropertyEditorButton() {
    await this.click(this.selectPropertyEditorBtn);
  }

  async clickCreateFolderButton() {
    await this.click(this.createFolderBtn);
    await this.page.waitForTimeout(ConstantHelper.wait.short);
  }

  async enterAPropertyName(name: string) {
    await this.enterText(this.propertyNameTxt, name, {clearFirst: false});
  }

  async clickNextPaginationButton() {
    await this.click(this.nextPaginationBtn);
  }

  async clickNextButton(){
    await this.click(this.nextBtn);
  }

  async clickConfirmButton() {
    await this.click(this.confirmBtn);
  }

  async clickBreadcrumbButton() {
    await this.click(this.breadcrumbBtn);
  }

  async clickInsertButton() {
    await this.click(this.insertBtn);
  }

  async clickConfirmToDeleteButton() {
    await this.click(this.confirmToDeleteBtn);
    await this.page.waitForTimeout(ConstantHelper.wait.short);
  }

  async clickConfirmCreateFolderButton() {
    await this.click(this.confirmCreateFolderBtn);
    await this.page.waitForTimeout(ConstantHelper.wait.short);
  }

  async clickRemoveExactButton() {
    await this.click(this.removeExactBtn);
  }

  async clickRemoveButtonForName(name: string) {
    const removeButtonWithNameLocator = this.page.locator('[name="' + name + '"] [label="Remove"]');
    await this.click(removeButtonWithNameLocator);
  }

  async clickTrashIconButtonForName(name: string) {
    const trashIconButtonWithNameLocator = this.page.locator('[name="' + name + '"] [name="icon-trash"]');
    await this.click(trashIconButtonWithNameLocator);
  }

  async clickRemoveWithName(name: string) {
    const removeLabelWithNameLocator = this.page.locator('[label="Remove ' + name + '"]');
    await this.click(removeLabelWithNameLocator);
  }

  async clickDisableButton() {
    await this.click(this.disableBtn);
  }

  async clickConfirmDisableButton() {
    await this.click(this.confirmDisableBtn);
  }

  async clickConfirmRemoveButton() {
    await this.click(this.confirmToRemoveBtn);
  }

  async clickEnableButton() {
    await this.click(this.enableBtn);
  }

  async clickConfirmEnableButton() {
    await this.click(this.confirmEnableBtn);
  }

  async insertDictionaryItem(dictionaryName: string) {
    await this.clickInsertButton();
    await this.click(this.insertDictionaryItemBtn);
    await this.click(this.page.getByLabel(dictionaryName));
    await this.click(this.chooseBtn);
  }

  async addQueryBuilderWithOrderByStatement(propertyAlias: string, isAscending: boolean) {
    await this.click(this.queryBuilderBtn, {timeout: ConstantHelper.timeout.long});
    await this.click(this.orderByPropertyAliasBtn);
    // Wait and choose property alias option
    await this.waitAndSelectQueryBuilderDropDownList(propertyAlias);
    await this.click(this.orderByPropertyAliasBtn);
    // Click to ascending button if isAscending is false
    if (!isAscending) {
      await this.click(this.ascendingBtn);
    }
  }

  async addQueryBuilderWithWhereStatement(propertyAlias: string, operator: string, constrainValue: string) {
    await this.click(this.queryBuilderBtn, {timeout: ConstantHelper.timeout.long});
    // Wait and choose property alias
    await this.click(this.wherePropertyAliasBtn);
    await this.waitAndSelectQueryBuilderDropDownList(propertyAlias);
    // Wait and choose operator
    await this.click(this.whereOperatorBtn);
    await this.waitAndSelectQueryBuilderDropDownList(operator);
    // Wait and choose constrain value and press Enter
    await this.enterText(this.whereConstrainValueTxt, constrainValue);
    await this.pressKey(this.whereConstrainValueTxt, 'Enter');
  }

  async waitAndSelectQueryBuilderDropDownList(option: string) {
    const ddlOption = this.page.locator('[open]').locator('uui-combobox-list-option').filter({hasText: option}).first();
    await this.click(ddlOption, {timeout: ConstantHelper.timeout.long});
  }

  async createFolder(folderName: string) {
    await this.clickCreateActionMenuOption();
    await this.clickNewFolderThreeDotsButton();
    await this.enterFolderName(folderName);
    await this.clickConfirmCreateFolderButton();
  }

  async deletePropertyEditor(propertyEditorName: string) {
    // We need to hover over the property to be able to see the delete button
    await this.page.locator('uui-button').filter({hasText: propertyEditorName}).getByLabel('Editor settings').hover();
    await this.deleteBtn.click();
  }

  async enterFolderName(folderName: string) {
    await this.enterText(this.folderNameTxt, folderName, {verify: true});
  }

  async isTextWithExactNameVisible(name: string, isVisible = true) {
    return expect(this.page.getByText(name, {exact: true})).toBeVisible({visible: isVisible});
  }

  async isQueryBuilderCodeShown(code: string) {
    await this.click(this.queryBuilderShowCode);
    await this.containsText(this.queryBuilderShowCode, code, 10000);
  }

  async deleteFolder() {
    await this.clickDeleteActionMenuOption();
    await this.clickConfirmToDeleteButton();
  }

  async clickDeleteExactButton() {
    await this.click(this.deleteExactBtn);
  }

  async isTreeItemVisible(name: string, isVisible = true) {
    await this.isVisible(this.page.locator('umb-tree-item').locator('[label="' + name + '"]'), isVisible);
  }

  async doesTreeItemHaveTheCorrectIcon(name: string, icon: string) {
    return await this.isVisible(this.page.locator('umb-tree-item').filter({hasText: name}).locator('umb-icon').locator('[name="' + icon + '"]'));
  }

  async goToSection(sectionName: string, checkSections = true, skipReload = false) {
    if (checkSections) {
      for (let section in ConstantHelper.sections) {
        await expect(this.sectionLinks.getByRole('tab', {name: ConstantHelper.sections[section]})).toBeVisible({timeout: ConstantHelper.timeout.navigation});
      }
    }

    // We need to check if we are on the section tab already, if we are, then we need to reload the page instead of clicking again
    const alreadySelected = await this.sectionLinks.locator('[active]').getByText(sectionName).isVisible();
    if (alreadySelected && !skipReload) {
      await this.page.reload();
    } else {
      await this.backOfficeHeader.getByRole('tab', {name: sectionName}).click();
    }
  }

  async goToSettingsTreeItem(settingsTreeItemName: string) {
    await this.goToSection(ConstantHelper.sections.settings);
    await this.click(this.page.getByLabel(settingsTreeItemName, {exact: true}));
  }

  async clickDataElement(elementName: string, options: any = null) {
    await this.page.click(`[data-element="${elementName}"]`, options);
  }

  async getDataElement(elementName: string) {
    return this.page.locator(`[data-element="${elementName}"]`);
  }

  async isButtonWithNameVisible(name: string) {
    await this.isVisible(this.page.getByRole('button', {name: name}));
  }

  async clickLabelWithName(name: string, isExact: boolean = true, toForce: boolean = false) {
    await this.click(this.page.getByLabel(name, {exact: isExact}), {force: toForce});
  }

  async clickButtonWithName(name: string, isExact: boolean = false) {
    const exactButtonWithNameLocator = this.page.getByRole('button', {name: name, exact: isExact});
    // Force click is needed
    await this.click(exactButtonWithNameLocator, {force: true});
  }

  async isSuccessNotificationVisible(isVisible: boolean = true) {
    return await expect(this.successNotification.first()).toBeVisible({visible: isVisible, timeout: ConstantHelper.timeout.long});
  }

  async doesSuccessNotificationsHaveCount(count: number) {
    return await expect(this.successNotification).toHaveCount(count);
  }

  async isErrorNotificationVisible(isVisible: boolean = true) {
    return await expect(this.errorNotification.first()).toBeVisible({visible: isVisible});
  }

  async isTextWithMessageVisible(message: string, isVisible: boolean = true) {
    return await expect(this.page.getByText(message)).toBeVisible({visible: isVisible});
  }

  async clickCreateThreeDotsButton() {
    await this.click(this.createThreeDotsBtn);
  }

  async clickCreateButton() {
    await this.click(this.createBtn);
  }

  async clickAddButton() {
    await this.click(this.addBtn);
  };

  async clickNewFolderThreeDotsButton() {
    await this.click(this.newFolderThreeDotsBtn);
  }

  async clickEditorSettingsButton(index: number = 0) {
    await this.click(this.editorSettingsBtn.nth(index));
  }

  async enterDescription(description: string) {
    await this.enterText(this.enterDescriptionTxt, description);
  }

  async doesDescriptionHaveValue(value: string, index: number = 0) {
    return await this.hasValue(this.descriptionBtn.nth(index), value);
  }

  async clickStructureTab() {
    await this.page.waitForTimeout(ConstantHelper.wait.medium);
    await this.click(this.structureTabBtn);
  }

  async clickAllowAtRootButton() {
    await this.click(this.allowAtRootBtn);
  }

  async clickIAmDoneReorderingButton() {
    await this.click(this.iAmDoneReorderingBtn);
  }

  async clickReorderButton() {
    await this.click(this.reorderBtn);
  }

  async clickLabelAboveButton() {
    await this.click(this.labelAboveBtn);
  }

  async clickMandatoryToggle() {
    await this.click(this.mandatoryToggle);
  }

  async selectValidationOption(option: string) {
    await this.selectByValue(this.validation, option);
  }

  async enterRegEx(regEx: string) {
    await this.enterText(this.regexTxt, regEx, {clearFirst: false});
  }

  async enterRegExMessage(regExMessage: string) {
    await this.enterText(this.regexMessageTxt, regExMessage, {clearFirst: false});
  }

  async clickCompositionsButton() {
    await this.click(this.compositionsBtn);
  }

  async clickAddTabButton() {
    await this.click(this.addTabBtn);
  }

  async enterTabName(tabName: string) {
    await this.waitForVisible(this.unnamedTabTxt);
    await this.page.waitForTimeout(ConstantHelper.wait.debounce);
    await this.enterText(this.unnamedTabTxt, tabName);
    // We use this to make sure the test id is updated
    await this.page.getByRole('tab', {name: 'Design'}).click();
    // We click again to make sure the tab is focused
    await this.page.getByTestId('tab:' + tabName).click();
  }

  async searchForTypeToFilterValue(searchValue: string) {
    await this.enterText(this.typeToFilterSearchTxt, searchValue, {clearFirst: false});
  }

  async addPropertyEditor(propertyEditorName: string, index: number = 0) {
    await this.click(this.addPropertyBtn.nth(index));
    await this.enterAPropertyName(propertyEditorName);
    await this.hasValue(this.propertyNameTxt, propertyEditorName);
    await this.clickSelectPropertyEditorButton();
    await this.searchForTypeToFilterValue(propertyEditorName);
    await this.click(this.page.getByText(propertyEditorName, {exact: true}));
    await this.clickSubmitButton();
  }

  async updatePropertyEditor(propertyEditorName: string) {
    await this.clickEditorSettingsButton();
    await this.clickChangeButton();
    await this.searchForTypeToFilterValue(propertyEditorName);
    await this.click(this.page.getByText(propertyEditorName, {exact: true}));
    await this.enterAPropertyName(propertyEditorName);
    await this.clickSubmitButton();
  }

  async enterPropertyEditorDescription(description: string) {
    await this.enterText(this.enterPropertyEditorDescriptionTxt, description);
  }

  async clickAddGroupButton() {
    await this.click(this.addGroupBtn);
  }

  async clickChooseModalButton() {
    await this.click(this.chooseModalBtn);
  }

  async enterGroupName(groupName: string, index: number = 0) {
    const groupNameTxt = this.groupLabel.nth(index);
    await this.enterText(groupNameTxt, groupName);
  }

  async isGroupVisible(groupName: string, isVisible = true) {
    await this.isVisible(this.groupLabel.filter({hasText: groupName}), isVisible);
  }

  async doesGroupHaveValue(value: string) {
    await this.waitForVisible(this.groupLabel);
    return await this.hasValue(this.groupLabel, value);
  }

  async rename(newName: string) {
    await this.clickRenameActionMenuOption();
    await this.click(this.newNameTxt);
    await this.enterText(this.newNameTxt, newName);
    await this.click(this.renameModalBtn);
    await this.page.waitForTimeout(ConstantHelper.wait.short);
  }

  async isSuccessButtonWithTextVisible(text: string) {
    return await this.isVisible(this.successState.filter({hasText: text}));
  }

  async dragAndDrop(dragFromSelector: Locator, dragToSelector: Locator, verticalOffset: number = 0, horizontalOffset: number = 0, steps: number = 5) {
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
    await this.page.mouse.up();
  }

  async getButtonWithName(name: string) {
    await this.waitForVisible(this.page.getByRole('button', {name: name}));
    return this.page.getByRole('button', {name: name});
  }

  async clickCreateLink() {
    await this.click(this.createLink);
  }

  async insertSystemFieldValue(fieldValue: string) {
    await this.clickInsertButton();
    await this.click(this.insertValueBtn);
    await this.click(this.chooseFieldDropDown);
    await this.click(this.systemFieldsOption);
    await this.click(this.chooseFieldValueDropDown);
    await this.click(this.page.getByText(fieldValue));
    await this.clickSubmitButton();
  }

  async insertPartialView(partialViewName: string) {
    await this.clickInsertButton();
    await this.click(this.insertPartialViewBtn);
    await this.click(this.page.getByLabel(partialViewName));
    await this.clickChooseButton();
  }

  async deletePropertyEditorWithName(name: string) {
    // We need to hover over the Property Editor to make the delete button visible
    const propertyEditor = this.page.locator('umb-content-type-design-editor-property', {hasText: name});
    await this.hover(propertyEditor);
    // Force click is needed
    await this.click(propertyEditor.getByLabel('Delete'), {force: true});
    await this.clickConfirmToDeleteButton();
  }

  async clickRenameButton() {
    await this.click(this.renameBtn);
  }

  async clickDeleteAndConfirmButton() {
    await this.clickDeleteActionMenuOption();
    await this.clickConfirmToDeleteButton();
  }

  async clickDeleteButton() {
    await this.click(this.deleteBtn);
  }

  async clickQueryBuilderButton() {
    await this.click(this.queryBuilderBtn);
    await this.page.waitForTimeout(ConstantHelper.wait.short);
  }

  async chooseRootContentInQueryBuilder(contentName: string) {
    await this.click(this.chooseRootContentBtn);
    await this.clickModalMenuItemWithName(contentName);
    await this.clickChooseButton();
  }

  async reorderTwoGroups(firstGroupName: string, secondGroupName: string) {
    const firstGroup = this.page.getByTestId('group:' + firstGroupName);
    const secondGroup = this.page.getByTestId('group:' + secondGroupName);
    const firstGroupValue = await firstGroup.getByLabel('Group').inputValue();
    const secondGroupValue = await secondGroup.getByLabel('Group').inputValue();
    const dragToLocator = firstGroup.locator('[slot="header"]').first();
    const dragFromLocator = secondGroup.locator('[slot="header"]').first();
    await this.dragAndDrop(dragFromLocator, dragToLocator, 0, 0, 20);
    return {firstGroupValue, secondGroupValue};
  }

  async clickAllowedChildNodesButton() {
    await this.click(this.allowedChildNodesModal.locator(this.chooseBtn));
  }

  async clickAddCollectionButton() {
    await this.click(this.addCollectionBtn);
  }

  async doesReturnedItemsHaveCount(itemCount: number) {
    await this.containsText(this.returnedItemsCount, itemCount.toString() + ' published items returned');
  }

  async doesQueryResultHaveContentName(contentName: string) {
    await this.containsText(this.queryResults, contentName);
  }

  async deleteGroup(groupName: string) {
    await this.page.waitForTimeout(ConstantHelper.wait.medium);
    const groups = this.page.locator('umb-content-type-design-editor-group').all();
    for (const group of await groups) {
      if (await group.getByLabel('Group', {exact: true}).inputValue() === groupName) {
        const headerActionsDeleteLocator = group.locator('[slot="header-actions"]').getByLabel('Delete');
        // Force click is needed
        await this.click(headerActionsDeleteLocator, {force: true});
        return;
      }
    }
  }

  async clickRemoveTabWithName(name: string) {
    const tab = this.page.locator('uui-tab').filter({hasText: name});
    await this.hover(tab);
    const removeTabWithNameLocator = tab.locator('[label="Remove"]');
    await this.click(removeTabWithNameLocator);
  }

  async clickLeftArrowButton() {
    await this.click(this.leftArrowBtn);
  }

  async clickToUploadButton() {
    await this.click(this.clickToUploadBtn);
  }

  async uploadFile(filePath: string) {
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      await this.clickToUploadButton(),
    ]);
    await fileChooser.setFiles(filePath);
  }

  getTabLocatorWithName(name: string) {
    return this.page.getByRole('tab', {name: name});
  }

  getTextLocatorWithName(name: string) {
    return this.page.getByText(name, {exact: true});
  }

  getLocatorWithDataMark(dataMark: string) {
    return this.page.getByTestId(dataMark);
  };

  async isFailedStateButtonVisible() {
    await this.isVisible(this.failedStateButton);
  }

  async clickContainerSaveAndPublishButton() {
    await this.click(this.containerSaveAndPublishBtn);
    await this.page.waitForTimeout(ConstantHelper.wait.short);
  }

  async clickConfirmTrashButton() {
    await this.click(this.confirmTrashBtn);
    await this.page.waitForTimeout(ConstantHelper.wait.short);
  }

  async reloadRecycleBin(containsItems = true) {
    await this.waitForVisible(this.recycleBinMenuItem);
    // If the Recycle Bin does not contain any items, the caret button should not be visible. and we should not try to click it
    if (!containsItems) {
      await this.clickReloadChildrenActionMenuOption();
      await this.isVisible(this.recycleBinMenuItemCaretBtn, false);
      return;
    }

    await this.clickActionsMenuForName('Recycle Bin');
    await this.clickReloadChildrenActionMenuOption();

    await this.openCaretButtonForName('Recycle Bin');
  }

  async clickRecycleBinButton() {
    await this.click(this.recycleBinBtn);
  }

  async isItemVisibleInRecycleBin(item: string, isVisible: boolean = true, isReload: boolean = true) {
    if (isReload) {
      await this.reloadRecycleBin(isVisible);
    }
    return await this.isVisible(this.page.locator('[label="Recycle Bin"] [label="' + item + '"]'), isVisible);
  }

  async changeToGridView() {
    await this.click(this.viewBundleBtn);
    await this.click(this.gridBtn);
  }

  async changeToListView() {
    await this.click(this.viewBundleBtn);
    await this.click(this.listBtn);
  }

  async isViewBundleButtonVisible(isVisible: boolean = true) {
    return this.isVisible(this.viewBundleBtn, isVisible);
  }

  async doesSuccessNotificationHaveText(text: string, isVisible: boolean = true, deleteNotification = false, timeout = 5000) {
    const response = await expect(this.successNotification.filter({hasText: text})).toBeVisible({
      visible: isVisible,
      timeout: timeout
    });
    if (deleteNotification) {
      await this.successNotification.filter({hasText: text}).getByLabel('close').click({force: true});
    }
    return response;
  }

  async doesErrorNotificationHaveText(text: string, isVisible: boolean = true, deleteNotification: boolean = false) {
    const response = await expect(this.errorNotification.filter({hasText: text})).toBeVisible({visible: isVisible});
    if (deleteNotification) {
      await this.errorNotification.filter({hasText: text}).locator('svg').click();
    }
    return response;
  }

  async isSectionWithNameVisible(sectionName: string, isVisible: boolean = true) {
    await this.isVisible(this.page.getByRole('tab', {name: sectionName}), isVisible);
  }

  async clickMediaWithName(name: string) {
    await this.click(this.mediaCardItems.filter({hasText: name}));
  }

  async clickChooseContentStartNodeButton() {
    await this.click(this.chooseDocumentInputBtn);
  }

  async clickChooseMediaStartNodeButton() {
    await this.click(this.chooseMediaInputBtn);
  }

  async clickActionButton() {
    await this.click(this.actionBtn);
  }

  async clickReferenceNodeLinkWithName(name: string) {
    await this.click(this.page.locator('[name="' + name + '"] a#open-part'));
  }

  async clickLinkWithName(name: string, isExact: boolean = false) {
    await this.click(this.page.getByRole('link', {name: name, exact: isExact}));
  }

  async clickMediaPickerModalSubmitButton() {
    await this.click(this.mediaPickerModalSubmitBtn);
  }

  async selectMediaWithName(mediaName: string, isForce: boolean = false) {
    const mediaLocator = this.mediaCardItems.filter({hasText: mediaName});
    await this.waitForVisible(mediaLocator);
    await mediaLocator.click({position: {x: 0.5, y: 0.5}, force: isForce});
  }

  async selectMediaWithTestId(mediaKey: string) {
    const locator = this.page.getByTestId('media:' + mediaKey);
    await this.waitForVisible(locator);
    await locator.click({position: {x: 0.5, y: 0.5}});
  }

  async clickCreateModalButton() {
    await this.click(this.createModalBtn);
  }

  async clickMediaCaptionAltTextModalSubmitButton() {
    await this.click(this.mediaCaptionAltTextModalSubmitBtn);
  }

  // Embed Modal
  async enterEmbeddedURL(value: string) {
    await this.enterText(this.embeddedURLTxt, value);
  }

  async clickEmbeddedRetrieveButton() {
    await this.click(this.embeddedRetrieveBtn);
  }

  async clickEmbeddedMediaModalConfirmButton() {
    await this.click(this.embeddedMediaModalConfirmBtn);
  }

  async waitForEmbeddedPreviewVisible() {
    await this.waitForVisible(this.embeddedPreview);
  }

  async isSubmitButtonDisabled() {
    await this.isVisible(this.submitBtn);
    await this.isDisabled(this.submitBtn);
  }

  async doesMediaHaveThumbnail(mediaId: string, thumbnailIconName: string, thumbnailImage: string) {
    const mediaThumbnailLocator = this.page.getByTestId('media:' + mediaId);
    if (thumbnailIconName === 'image') {
      const regexImageSrc = new RegExp(`^${thumbnailImage}.*`);
      await this.hasAttribute(mediaThumbnailLocator.locator('umb-imaging-thumbnail img'), 'src', regexImageSrc.toString());
    } else {
      await this.hasAttribute(mediaThumbnailLocator.locator('umb-imaging-thumbnail umb-icon'), 'name', thumbnailIconName);
    }
  }

  async clickCurrentUserAvatarButton() {
    await this.click(this.currentUserAvatarBtn, {force: true});
  }

  async clickCreateActionButton() {
    await this.click(this.createActionBtn);
  }

  async clickCreateActionWithOptionName(optionName: string) {
    await this.clickCreateActionButton();
    const createOptionLocator = this.createActionButtonCollection.locator('[label="' + optionName + '"]');
    await this.click(createOptionLocator);
  }

  async doesCollectionTreeItemTableRowHaveName(name: string) {
    await this.waitForVisible(this.collectionTreeItemTableRow.first());
    await this.isVisible(this.collectionTreeItemTableRow.locator('[label="' + name + '"]'));
  }

  async doesCollectionTreeItemTableRowHaveIcon(name: string, icon: string) {
    await this.waitForVisible(this.collectionTreeItemTableRow.first());
    await this.isVisible(this.collectionTreeItemTableRow.filter({hasText: name}).locator('umb-icon').locator('[name="' + icon + '"]'));
  }

  async clickFolderButton() {
    await this.click(this.folderBtn);
  }

  async doesReferenceHeadlineHaveText(text: string) {
    await this.containsText(this.referenceHeadline, text);
  }

  async isReferenceHeadlineVisible(isVisible: boolean) {
    await this.isVisible(this.referenceHeadline, isVisible);
  }

  async doesReferenceItemsHaveCount(count: number) {
    await this.hasCount(this.entityItemRef, count);
  }

  async isReferenceItemNameVisible(itemName: string) {
    await this.isVisible(this.entityItemRef.locator('uui-ref-node[name="' + itemName + '"]'));
  }

  async doesReferencesContainText(text: string) {
    await this.containsText(this.confirmActionModalEntityReferences, text);
  }

  async isValidationMessageVisible(message: string, isVisible: boolean = true) {
    await this.isVisible(this.validationMessage.filter({hasText: message}), isVisible);
  }

  async isSuccessStateIconVisible() {
    await this.isVisible(this.successStateIcon);
  }

  async isPropertyEditorUiWithNameReadOnly(name: string) {
    const propertyEditorUiLocator = this.page.locator('umb-property-editor-ui-' + name);
    await this.hasAttribute(propertyEditorUiLocator, 'readonly', '');
  }

  async isPropertyEditorUiWithNameVisible(name: string, isVisible: boolean = true) {
    const propertyEditorUiLocator = this.page.locator('umb-property-editor-ui-' + name);
    await this.isVisible(propertyEditorUiLocator, isVisible);
  }

  // Entity Action
  async clickEntityActionWithName(name: string) {
    const regex = new RegExp(`^entity-action:.*${name}$`);
    await this.openEntityAction.getByTestId(regex).filter({has: this.page.locator(':visible')}).click();
  }

  async clickCreateActionMenuOption() {
    await this.clickEntityActionWithName('Create');
  }

  async clickTrashActionMenuOption() {
    await this.clickEntityActionWithName('Trash');
  }

  async clickMoveToActionMenuOption() {
    await this.clickEntityActionWithName('MoveTo');
  }

  async clickCreateBlueprintActionMenuOption() {
    await this.clickEntityActionWithName('CreateBlueprint');
  }

  async clickDuplicateToActionMenuOption() {
    await this.clickEntityActionWithName('DuplicateTo');
  }

  async clickPublishActionMenuOption() {
    await this.clickEntityActionWithName('Publish');
  }

  async clickUnpublishActionMenuOption() {
    await this.clickEntityActionWithName('Unpublish');
  }

  async clickRollbackActionMenuOption() {
    await this.clickEntityActionWithName('Rollback');
  }

  async clickCultureAndHostnamesActionMenuOption() {
    await this.clickEntityActionWithName('CultureAndHostnames');
  }

  async clickPublicAccessActionMenuOption() {
    await this.clickEntityActionWithName('PublicAccess');
  }

  async clickSortChildrenActionMenuOption() {
    await this.clickEntityActionWithName('SortChildrenOf');
  }

  async clickNotificationsActionMenuOption() {
    await this.clickEntityActionWithName('Notifications');
  }

  async clickReloadChildrenActionMenuOption() {
    await this.clickEntityActionWithName('ReloadChildrenOf');
  }

  async clickDeleteActionMenuOption() {
    await this.clickEntityActionWithName('Delete');
  }

  async clickRestoreActionMenuOption() {
    await this.clickEntityActionWithName('Restore');
  }

  async clickRenameActionMenuOption() {
    await this.clickEntityActionWithName('Rename');
  }

  async clickCreateOptionsActionMenuOption() {
    await this.clickEntityActionWithName('CreateOptions');
  }

  async clickExportActionMenuOption() {
    await this.clickEntityActionWithName('Export');
  }

  async clickImportActionMenuOption() {
    await this.clickEntityActionWithName('Import');
  }

  async clickUpdateActionMenuOption() {
    await this.clickEntityActionWithName('Update');
  }

  async clickModalMenuItemWithName(name: string) {
    await this.click(this.openedModal.locator('uui-menu-item[label="' + name + '"]'));
  }

  async isModalMenuItemWithNameDisabled(name: string) {
    await this.hasAttribute(this.sidebarModal.locator('uui-menu-item[label="' + name + '"]'), 'disabled', '');
  }

  async doesPropertyHaveInvalidBadge(propertyName: string) {
    await this.isVisible(this.page.locator('umb-property-layout').filter({hasText: propertyName}).locator('#invalid-badge uui-badge'));
  }

  async isModalMenuItemWithNameVisible(name: string, isVisible: boolean = true) {
    await this.isVisible(this.sidebarModal.locator('uui-menu-item[label="' + name + '"]'), isVisible);
  }

  async clickEntityItemByName(itemName: string) {
    await this.click(this.page.locator('uui-ref-node,umb-ref-item[name="' + itemName + '"]'));
  }

  async isMediaCardItemWithNameDisabled(itemName: string) {
    await this.hasAttribute(this.mediaCardItems.filter({hasText: itemName}), 'class', 'not-allowed');
  }

  async isMediaCardItemWithNameVisible(itemName: string, isVisible: boolean = true) {
    await this.isVisible(this.mediaCardItems.filter({hasText: itemName}), isVisible);
  }

  async clickWorkspaceActionMenuButton() {
    await this.click(this.workspaceActionMenuBtn);
  }

  async clickLockActionMenuOption() {
    await this.clickEntityActionWithName('Lock');
  }

  async isDashboardTabWithNameVisible(name: string, isVisible: boolean = true) {
    await this.isVisible(this.page.locator('uui-tab[label="' + name + '"]'), isVisible);
  }

  async enterMonacoEditorValue(value: string) {
    await this.click(this.monacoEditor);
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.press('Backspace');
    await this.page.keyboard.insertText(value);
  }

  async waitUntilUiLoaderIsNoLongerVisible() {
    await this.waitForHidden(this.uiLoader, 10000);
  }

  async isWorkspaceViewTabWithAliasVisible(alias: string, isVisible: boolean = true) {
    await this.isVisible(this.page.getByTestId('workspace:view-link:' + alias), isVisible);
  }

  async clickRestoreButton() {
    await this.click(this.restoreBtn);
  }

  async isInputDropzoneVisible(isVisible: boolean = true) {
    await this.isVisible(this.inputDropzone, isVisible);
  }

  async isImageCropperFieldVisible(isVisible: boolean = true) {
    await this.isVisible(this.imageCropperField, isVisible);
  }

  async isInputUploadFieldVisible(isVisible: boolean = true) {
    await this.isVisible(this.inputUploadField, isVisible);
  }

  async isBackOfficeMainVisible(isVisible: boolean = true) {
    // We need to wait to make sure the page has loaded
    await this.page.waitForTimeout(ConstantHelper.wait.medium);
    await this.isVisible(this.backOfficeMain, isVisible);
  }
}
