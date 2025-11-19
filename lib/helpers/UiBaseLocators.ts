import {expect, Locator, Page} from "@playwright/test"
import {ConstantHelper} from "./ConstantHelper";

export class UiBaseLocators {
  public readonly page: Page;
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
  public readonly entityItem: Locator;
  public readonly sectionLinks: Locator;

  constructor(page: Page) {
    this.page = page;
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
    this.aliasLockBtn = page.locator('#name #lock');
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
    this.entityItem = page.locator('umb-entity-item-ref');
  }

  async clickActionsMenuForNameInSectionSidebar(name: string) {
    await this.sectionSidebar.locator('[label="' + name + '"]').hover();
    await this.sectionSidebar.locator('[label="' + name + '"] >> [label="Open actions menu"]').first().click();
  }

  async clickActionsMenuForName(name: string) {
    await expect(this.page.locator('uui-menu-item[label="' + name + '"]').locator('#menu-item').first()).toBeVisible();
    // We need to wait for the load to be finished, otherwise we would run into flaky tests
    await this.page.waitForTimeout(1000);
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
    await this.page.waitForTimeout(500);
    await this.clickActionsMenuForName(treeName);
    await this.clickReloadChildrenActionMenuOption();

    await this.openCaretButtonForName(treeName);
  }

  async clickReloadButton() {
    await expect(this.reloadBtn).toBeVisible();
    await this.reloadBtn.click();
  }

  async clickReloadChildrenButton() {
    await expect(this.reloadChildrenBtn).toBeVisible();
    await this.reloadChildrenBtn.click({force: true});
  }

  async isSuccessStateVisibleForSaveButton(isVisible: boolean = true) {
    const regex = new RegExp(`^workspace-action:.*Save$`);
    const saveButtonLocator = this.page.getByTestId(regex);
    const saveBtn = this.workspaceAction.filter({has: saveButtonLocator});
    await expect(saveBtn.locator(this.successState)).toBeVisible({visible: isVisible, timeout: 10000});
  }

  async clickSaveButton() {
    await expect(this.saveBtn).toBeVisible();
    await this.saveBtn.click();
    await this.page.waitForTimeout(500);
  }

  async clickChooseButton() {
    await expect(this.chooseBtn).toBeVisible();
    await this.chooseBtn.click();
  }

  async clickChooseContainerButton() {
    await this.containerChooseBtn.click();
  }

  async clickFilterChooseButton() {
    await this.filterChooseBtn.click();
  }

  async clickRenameFolderThreeDotsButton() {
    await this.renameFolderThreeDotsBtn.click();
  }

  async clickRenameFolderButton() {
    await this.clickRenameButton();
  }

  async clickConfirmRenameButton() {
    await this.confirmRenameBtn.click();
  }

  async clickUpdateFolderButton() {
    await this.updateFolderBtn.click();
  }

  async clickUpdateButton() {
    await this.updateBtn.click();
  }

  async clickSubmitButton() {
    await expect(this.submitBtn).toBeVisible();
    await this.submitBtn.click();
  }

  async clickConfirmToSubmitButton() {
    await this.confirmToSubmitBtn.click();
  }

  async clickChangeButton() {
    await this.changeBtn.click();
  }

  async clickExactLinkWithName(name: string, toForce: boolean = false) {
    const exactLinkWithNameLocator = this.page.getByRole('link', {name: name, exact: true});
    await expect(exactLinkWithNameLocator).toBeVisible();
    await exactLinkWithNameLocator.click({force: toForce});
  }

  async enterAliasName(aliasName: string) {
    // Unlocks alias
    await this.aliasLockBtn.click();
    await this.aliasNameTxt.clear();
    await this.aliasNameTxt.fill(aliasName);
  }

  async updateIcon(iconName: string) {
    await expect(this.iconBtn).toBeVisible();
    // Force click is needed
    await this.iconBtn.click({force: true});
    await this.searchForTypeToFilterValue(iconName);
    await this.clickLabelWithName(iconName, true, true);
    await this.clickSubmitButton();
  }

  async clickTextButtonWithName(name: string) {
    await expect(this.page.getByText(name, {exact: true})).toBeVisible();
    await this.page.getByText(name, {exact: true}).click();
  }

  async clickSelectPropertyEditorButton() {
    await expect(this.selectPropertyEditorBtn).toBeVisible();
    await this.selectPropertyEditorBtn.click();
  }

  async clickCreateFolderButton() {
    await expect(this.createFolderBtn).toBeVisible();
    await this.createFolderBtn.click();
    await this.page.waitForTimeout(500); // Wait for the action to complete
  }

  async enterAPropertyName(name: string) {
    await expect(this.propertyNameTxt).toBeVisible();
    await this.propertyNameTxt.fill(name);
  }

  async clickConfirmButton() {
    await expect(this.confirmBtn).toBeVisible();
    await this.confirmBtn.click();
  }

  async clickBreadcrumbButton() {
    await expect(this.breadcrumbBtn).toBeVisible();
    await this.breadcrumbBtn.click();
  }

  async clickInsertButton() {
    await expect(this.insertBtn).toBeVisible();
    await this.insertBtn.click();
  }

  async clickConfirmToDeleteButton() {
    await expect(this.confirmToDeleteBtn).toBeVisible();
    await this.confirmToDeleteBtn.click();
    await this.page.waitForTimeout(500); // Wait for the action to complete
  }

  async clickConfirmCreateFolderButton() {
    await expect(this.confirmCreateFolderBtn).toBeVisible();
    await this.confirmCreateFolderBtn.click();
    await this.page.waitForTimeout(500); // Wait for the action to complete
  }

  async clickRemoveExactButton() {
    await expect(this.removeExactBtn).toBeVisible();
    await this.removeExactBtn.click();
  }

  async clickRemoveButtonForName(name: string) {
    const removeButtonWithNameLocator = this.page.locator('[name="' + name + '"] [label="Remove"]');
    await expect(removeButtonWithNameLocator).toBeVisible();
    await removeButtonWithNameLocator.click();
  }

  async clickTrashIconButtonForName(name: string) {
    const trashIconButtonWithNameLocator = this.page.locator('[name="' + name + '"] [name="icon-trash"]');
    await expect(trashIconButtonWithNameLocator).toBeVisible();
    await trashIconButtonWithNameLocator.click();
  }

  async clickRemoveWithName(name: string) {
    const removeLabelWithNameLocator = this.page.locator('[label="Remove ' + name + '"]');
    await expect(removeLabelWithNameLocator).toBeVisible();
    await removeLabelWithNameLocator.click();
  }

  async clickDisableButton() {
    await expect(this.disableBtn).toBeVisible();
    await this.disableBtn.click();
  }

  async clickConfirmDisableButton() {
    await expect(this.confirmDisableBtn).toBeVisible();
    await this.confirmDisableBtn.click();
  }

  async clickConfirmRemoveButton() {
    await expect(this.confirmToRemoveBtn).toBeVisible();
    await this.confirmToRemoveBtn.click();
  }

  async clickEnableButton() {
    await expect(this.enableBtn).toBeVisible();
    await this.enableBtn.click();
  }

  async clickConfirmEnableButton() {
    await expect(this.confirmEnableBtn).toBeVisible();
    await this.confirmEnableBtn.click();
  }

  async insertDictionaryItem(dictionaryName: string) {
    await this.clickInsertButton();
    await expect(this.insertDictionaryItemBtn).toBeVisible();
    await this.insertDictionaryItemBtn.click();
    await expect(this.page.getByLabel(dictionaryName)).toBeVisible();
    await this.page.getByLabel(dictionaryName).click();
    await expect(this.chooseBtn).toBeVisible();
    await this.chooseBtn.click();
  }

  async addQueryBuilderWithOrderByStatement(propertyAlias: string, isAscending: boolean) {
    await expect(this.queryBuilderBtn).toBeVisible({timeout: 10000});
    await this.queryBuilderBtn.click();
    await expect(this.orderByPropertyAliasBtn).toBeVisible();
    await this.orderByPropertyAliasBtn.click();
    // Wait and choose property alias option 
    await this.waitAndSelectQueryBuilderDropDownList(propertyAlias);
    await expect(this.orderByPropertyAliasBtn).toBeVisible();
    await this.orderByPropertyAliasBtn.click();
    // Click to ascending button if isAscending is false
    if (!isAscending) {
      await expect(this.ascendingBtn).toBeVisible();
      await this.ascendingBtn.click();
    }
  }

  async addQueryBuilderWithWhereStatement(propertyAlias: string, operator: string, constrainValue: string) {
    await expect(this.queryBuilderBtn).toBeVisible({timeout: 10000});
    await this.queryBuilderBtn.click();
    // Wait and choose property alias
    await expect(this.wherePropertyAliasBtn).toBeVisible();
    await this.wherePropertyAliasBtn.click();
    await this.waitAndSelectQueryBuilderDropDownList(propertyAlias);
    // Wait and choose operator
    await expect(this.whereOperatorBtn).toBeVisible();
    await this.whereOperatorBtn.click();
    await this.waitAndSelectQueryBuilderDropDownList(operator);
    // Wait and choose constrain value and press Enter
    await expect(this.whereConstrainValueTxt).toBeVisible();
    await this.whereConstrainValueTxt.clear();
    await this.whereConstrainValueTxt.fill(constrainValue);
    await this.whereConstrainValueTxt.press('Enter');
  }

  async waitAndSelectQueryBuilderDropDownList(option: string) {
    const ddlOption = this.page.locator('[open]').locator('uui-combobox-list-option').filter({hasText: option}).first();
    await expect(ddlOption).toBeVisible({timeout: 10000});
    await ddlOption.click();
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
    await expect(this.folderNameTxt).toBeVisible();
    await this.folderNameTxt.clear();
    await this.folderNameTxt.fill(folderName);
    await expect(this.folderNameTxt).toHaveValue(folderName);
  }

  async isTextWithExactNameVisible(name: string, isVisible = true) {
    return expect(this.page.getByText(name, {exact: true})).toBeVisible({visible: isVisible});
  }

  async isQueryBuilderCodeShown(code: string) {
    await expect(this.queryBuilderShowCode).toBeVisible();
    await this.queryBuilderShowCode.click();
    await expect(this.queryBuilderShowCode).toContainText(code, {timeout: 10000});
  }

  async deleteFolder() {
    await this.clickDeleteActionMenuOption();
    await this.clickConfirmToDeleteButton();
  }

  async clickDeleteExactButton() {
    await expect(this.deleteExactBtn).toBeVisible();
    await this.deleteExactBtn.click();
  }

  async isTreeItemVisible(name: string, isVisible = true) {
    await expect(this.page.locator('umb-tree-item').locator('[label="' + name + '"]')).toBeVisible({visible: isVisible});
  }

  async doesTreeItemHaveTheCorrectIcon(name: string, icon: string) {
    return await expect(this.page.locator('umb-tree-item').filter({hasText: name}).locator('umb-icon').locator('[name="' + icon + '"]')).toBeVisible();
  }

  async goToSection(sectionName: string, checkSections = true) {
    if (checkSections) {
      for (let section in ConstantHelper.sections) {
        await expect(this.sectionLinks.getByRole('tab', {name: ConstantHelper.sections[section]})).toBeVisible({timeout: 30000});
      }
    }

    // We need to check if we are on the section tab already, if we are, then we need to reload the page instead of clicking again
    const alreadySelected = await this.sectionLinks.locator('[active]').getByText(sectionName).isVisible();
    if (alreadySelected) {
      await this.page.reload();
    } else {
      await this.backOfficeHeader.getByRole('tab', {name: sectionName}).click();
    }
  }

  async goToSettingsTreeItem(settingsTreeItemName: string) {
    await this.goToSection(ConstantHelper.sections.settings);
    await expect(this.page.getByLabel(settingsTreeItemName, {exact: true})).toBeVisible();
    await this.page.getByLabel(settingsTreeItemName, {exact: true}).click();
  }

  async clickDataElement(elementName: string, options: any = null) {
    await this.page.click(`[data-element="${elementName}"]`, options);
  }

  async getDataElement(elementName: string) {
    return this.page.locator(`[data-element="${elementName}"]`);
  }

  async isButtonWithNameVisible(name: string) {
    await expect(this.page.getByRole('button', {name: name})).toBeVisible();
  }

  async clickLabelWithName(name: string, isExact: boolean = true, toForce: boolean = false) {
    await expect(this.page.getByLabel(name, {exact: isExact})).toBeVisible();
    await this.page.getByLabel(name, {exact: isExact}).click({force: toForce});
  }

  async clickButtonWithName(name: string, isExact: boolean = false) {
    const exactButtonWithNameLocator = this.page.getByRole('button', {name: name, exact: isExact});
    await expect(exactButtonWithNameLocator).toBeVisible();
    // Force click is needed
    await exactButtonWithNameLocator.click({force: true});
  }

  async isSuccessNotificationVisible(isVisible: boolean = true) {
    return await expect(this.successNotification.first()).toBeVisible({visible: isVisible, timeout: 10000});
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
    await expect(this.createThreeDotsBtn).toBeVisible();
    await this.createThreeDotsBtn.click();
  }

  async clickCreateButton() {
    await expect(this.createBtn).toBeVisible();
    await this.createBtn.click();
  }

  async clickAddButton() {
    await expect(this.addBtn).toBeVisible();
    await this.addBtn.click();
  };

  async clickNewFolderThreeDotsButton() {
    await expect(this.newFolderThreeDotsBtn).toBeVisible();
    await this.newFolderThreeDotsBtn.click();
  }

  async clickEditorSettingsButton(index: number = 0) {
    await expect(this.editorSettingsBtn.nth(index)).toBeVisible();
    return this.editorSettingsBtn.nth(index).click();
  }

  async enterDescription(description: string) {
    await expect(this.enterDescriptionTxt).toBeVisible();
    await this.enterDescriptionTxt.clear();
    await this.enterDescriptionTxt.fill(description);
  }

  async doesDescriptionHaveValue(value: string, index: number = 0) {
    return await expect(this.descriptionBtn.nth(index)).toHaveValue(value);
  }

  async clickStructureTab() {
    await this.page.waitForTimeout(1000);
    await expect(this.structureTabBtn).toBeVisible();
    await this.structureTabBtn.click();
  }

  async clickAllowAtRootButton() {
    await expect(this.allowAtRootBtn).toBeVisible();
    await this.allowAtRootBtn.click();
  }

  async clickIAmDoneReorderingButton() {
    await expect(this.iAmDoneReorderingBtn).toBeVisible();
    await this.iAmDoneReorderingBtn.click();
  }

  async clickReorderButton() {
    await expect(this.reorderBtn).toBeVisible();
    await this.reorderBtn.click();
  }

  async clickLabelAboveButton() {
    await expect(this.labelAboveBtn).toBeVisible();
    await this.labelAboveBtn.click();
  }

  async clickMandatoryToggle() {
    await expect(this.mandatoryToggle).toBeVisible();
    await this.mandatoryToggle.click();
  }

  async selectValidationOption(option: string) {
    await expect(this.validation).toBeVisible();
    await this.validation.selectOption(option);
  }

  async enterRegEx(regEx: string) {
    await expect(this.regexTxt).toBeVisible();
    await this.regexTxt.fill(regEx);
  }

  async enterRegExMessage(regExMessage: string) {
    await expect(this.regexMessageTxt).toBeVisible();
    await this.regexMessageTxt.fill(regExMessage);
  }

  async clickCompositionsButton() {
    await expect(this.compositionsBtn).toBeVisible();
    await this.compositionsBtn.click();
  }

  async clickAddTabButton() {
    await expect(this.addTabBtn).toBeVisible();
    await this.addTabBtn.click();
  }

  async enterTabName(tabName: string) {
    await expect(this.unnamedTabTxt).toBeVisible();
    await this.page.waitForTimeout(400);
    await this.unnamedTabTxt.clear();
    await this.unnamedTabTxt.fill(tabName);
    // We use this to make sure the test id is updated
    await this.page.getByRole('tab', { name: 'Design' }).click();
    // We click again to make sure the tab is focused
    await this.page.getByTestId('tab:' + tabName).click();
  }

  async searchForTypeToFilterValue(searchValue: string) {
    await expect(this.typeToFilterSearchTxt).toBeVisible();
    await this.typeToFilterSearchTxt.fill(searchValue);
  }

  async addPropertyEditor(propertyEditorName: string, index: number = 0) {
    await expect(this.addPropertyBtn.nth(index)).toBeVisible();
    await this.addPropertyBtn.nth(index).click();
    await this.enterAPropertyName(propertyEditorName);
    await expect(this.propertyNameTxt).toHaveValue(propertyEditorName);
    await this.clickSelectPropertyEditorButton();
    await this.searchForTypeToFilterValue(propertyEditorName);
    await this.page.getByText(propertyEditorName, {exact: true}).click();
    await this.clickSubmitButton();
  }

  async updatePropertyEditor(propertyEditorName: string) {
    await this.clickEditorSettingsButton();
    await this.clickChangeButton();
    await this.searchForTypeToFilterValue(propertyEditorName);
    await this.page.getByText(propertyEditorName, {exact: true}).click();
    await this.enterAPropertyName(propertyEditorName);
    await this.clickSubmitButton();
  }

  async enterPropertyEditorDescription(description: string) {
    await expect(this.enterPropertyEditorDescriptionTxt).toBeVisible();
    await this.enterPropertyEditorDescriptionTxt.clear();
    await this.enterPropertyEditorDescriptionTxt.fill(description);
  }

  async clickAddGroupButton() {
    await expect(this.addGroupBtn).toBeVisible();
    await this.addGroupBtn.click();
  }

  async clickChooseModalButton() {
    await expect(this.chooseModalBtn).toBeVisible();
    await this.chooseModalBtn.click();
  }

  async enterGroupName(groupName: string, index: number = 0) {
    const groupNameTxt = this.groupLabel.nth(index);
    await expect(groupNameTxt).toBeVisible();
    await groupNameTxt.clear();
    await groupNameTxt.fill(groupName);
  }

  async isGroupVisible(groupName: string, isVisible = true) {
    await expect(this.groupLabel.filter({hasText: groupName})).toBeVisible({visible: isVisible});
  }

  async doesGroupHaveValue(value: string) {
    await expect(this.groupLabel).toBeVisible();
    return await expect(this.groupLabel).toHaveValue(value);
  }

  async rename(newName: string) {
    await this.clickRenameActionMenuOption();
    await expect(this.newNameTxt).toBeVisible();
    await this.newNameTxt.click();
    await this.newNameTxt.clear();
    await this.newNameTxt.fill(newName);
    await this.renameModalBtn.click();
    await this.page.waitForTimeout(500);
  }

  async isSuccessButtonWithTextVisible(text: string) {
    return await expect(this.successState.filter({hasText: text})).toBeVisible();
  }

  async dragAndDrop(dragFromSelector: Locator, dragToSelector: Locator, verticalOffset: number = 0, horizontalOffset: number = 0, steps: number = 5) {
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
    await this.page.mouse.up();
  }

  async getButtonWithName(name: string) {
    await expect(this.page.getByRole('button', {name: name})).toBeVisible();
    return this.page.getByRole('button', {name: name});
  }

  async clickCreateLink() {
    await expect(this.createLink).toBeVisible();
    await this.createLink.click();
  }

  async insertSystemFieldValue(fieldValue: string) {
    await this.clickInsertButton();
    await expect(this.insertValueBtn).toBeVisible();
    await this.insertValueBtn.click();
    await expect(this.chooseFieldDropDown).toBeVisible();
    await this.chooseFieldDropDown.click();
    await expect(this.systemFieldsOption).toBeVisible();
    await this.systemFieldsOption.click();
    await expect(this.chooseFieldValueDropDown).toBeVisible();
    await this.chooseFieldValueDropDown.click();
    await expect(this.page.getByText(fieldValue)).toBeVisible();
    await this.page.getByText(fieldValue).click();
    await this.clickSubmitButton();
  }

  async insertPartialView(partialViewName: string) {
    await this.clickInsertButton();
    await expect(this.insertPartialViewBtn).toBeVisible();
    await this.insertPartialViewBtn.click();
    await expect(this.page.getByLabel(partialViewName)).toBeVisible();
    await this.page.getByLabel(partialViewName).click();
    await this.clickChooseButton();
  }

  async deletePropertyEditorWithName(name: string) {
    // We need to hover over the Property Editor to make the delete button visible
    const propertyEditor = this.page.locator('umb-content-type-design-editor-property', {hasText: name});
    await expect(propertyEditor).toBeVisible();
    await propertyEditor.hover();
    await expect(propertyEditor.getByLabel('Delete')).toBeVisible();
    // Force click is needed
    await propertyEditor.getByLabel('Delete').click({force: true});
    await this.clickConfirmToDeleteButton();
  }

  async clickRenameButton() {
    await expect(this.renameBtn).toBeVisible();
    await this.renameBtn.click();
  }

  async clickDeleteAndConfirmButton() {
    await this.clickDeleteActionMenuOption();
    await this.clickConfirmToDeleteButton();
  }

  async clickDeleteButton() {
    await expect(this.deleteBtn).toBeVisible();
    await this.deleteBtn.click();
  }

  async clickQueryBuilderButton() {
    await expect(this.queryBuilderBtn).toBeVisible();
    await this.queryBuilderBtn.click();
    await this.page.waitForTimeout(500);
  }

  async chooseRootContentInQueryBuilder(contentName: string) {
    await expect(this.chooseRootContentBtn).toBeVisible();
    await this.chooseRootContentBtn.click();
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
    await expect(this.allowedChildNodesModal.locator(this.chooseBtn)).toBeVisible();
    await this.allowedChildNodesModal.locator(this.chooseBtn).click();
  }

  async clickAddCollectionButton() {
    await expect(this.addCollectionBtn).toBeVisible();
    await this.addCollectionBtn.click();
  }

  async doesReturnedItemsHaveCount(itemCount: number) {
    await expect(this.returnedItemsCount).toContainText(itemCount.toString() + ' published items returned');
  }

  async doesQueryResultHaveContentName(contentName: string) {
    await expect(this.queryResults).toContainText(contentName);
  }

  async deleteGroup(groupName: string) {
    await this.page.waitForTimeout(1000);
    const groups = this.page.locator('umb-content-type-design-editor-group').all();
    for (const group of await groups) {
      if (await group.getByLabel('Group', {exact: true}).inputValue() === groupName) {
        const headerActionsDeleteLocator = group.locator('[slot="header-actions"]').getByLabel('Delete');
        await expect(headerActionsDeleteLocator).toBeVisible();
        // Force click is needed
        await headerActionsDeleteLocator.click({force: true});
        return;
      }
    }
  }

  async clickRemoveTabWithName(name: string) {
    await expect(this.page.locator('uui-tab').filter({hasText: name})).toBeVisible();
    await this.page.locator('uui-tab').filter({hasText: name}).hover();
    const removeTabWithNameLocator = this.page.locator('uui-tab').filter({hasText: name}).locator('[label="Remove"]');
    await expect(removeTabWithNameLocator).toBeVisible();
    await removeTabWithNameLocator.click();
  }

  async clickLeftArrowButton() {
    await expect(this.leftArrowBtn).toBeVisible();
    await this.leftArrowBtn.click();
  }

  async clickToUploadButton() {
    await expect(this.clickToUploadBtn).toBeVisible();
    await this.clickToUploadBtn.click();
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
    await expect(this.failedStateButton).toBeVisible();
  }

  async clickContainerSaveAndPublishButton() {
    await expect(this.containerSaveAndPublishBtn).toBeVisible();
    await this.containerSaveAndPublishBtn.click();
    await this.page.waitForTimeout(500);
  }

  async clickConfirmTrashButton() {
    await expect(this.confirmTrashBtn).toBeVisible();
    await this.confirmTrashBtn.click();
    await this.page.waitForTimeout(500);
  }

  async reloadRecycleBin(containsItems = true) {
    await expect(this.recycleBinMenuItem).toBeVisible();
    // If the Recycle Bin does not contain any items,0 the caret button should not be visible. and we should not try to click it
    if (!containsItems) {
      await this.clickReloadChildrenActionMenuOption();
      await expect(this.recycleBinMenuItemCaretBtn).not.toBeVisible();
      return;
    }

    await this.clickActionsMenuForName('Recycle Bin');
    await this.clickReloadChildrenActionMenuOption();

    await this.openCaretButtonForName('Recycle Bin');
  }

  async clickRecycleBinButton() {
    await expect(this.recycleBinBtn).toBeVisible();
    await this.recycleBinBtn.click();
  }

  async isItemVisibleInRecycleBin(item: string, isVisible: boolean = true, isReload: boolean = true) {
    if (isReload) {
      await this.reloadRecycleBin(isVisible);
    }
    return await expect(this.page.locator('[label="Recycle Bin"] [label="' + item + '"]')).toBeVisible({visible: isVisible});
  }

  async changeToGridView() {
    await expect(this.viewBundleBtn).toBeVisible();
    await this.viewBundleBtn.click();
    await this.gridBtn.click();
  }

  async changeToListView() {
    await expect(this.viewBundleBtn).toBeVisible();
    await this.viewBundleBtn.click();
    await this.listBtn.click();
  }

  async isViewBundleButtonVisible(isVisible: boolean = true) {
    return expect(this.viewBundleBtn).toBeVisible({visible: isVisible});
  }

  async doesSuccessNotificationHaveText(text: string, isVisible: boolean = true, deleteNotification = false) {
    const response = await expect(this.successNotification.filter({hasText: text})).toBeVisible({visible: isVisible});
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
    await expect(this.page.getByRole('tab', {name: sectionName})).toBeVisible({visible: isVisible});
  }

  async clickMediaWithName(name: string) {
    await expect(this.mediaCardItems.filter({hasText: name})).toBeVisible();
    await this.mediaCardItems.filter({hasText: name}).click();
  }

  async clickChooseContentStartNodeButton() {
    await expect(this.chooseDocumentInputBtn).toBeVisible();
    await this.chooseDocumentInputBtn.click();
  }

  async clickChooseMediaStartNodeButton() {
    await expect(this.chooseMediaInputBtn).toBeVisible();
    await this.chooseMediaInputBtn.click();
  }

  async clickActionButton() {
    await expect(this.actionBtn).toBeVisible();
    await this.actionBtn.click();
  }

  async clickReferenceNodeLinkWithName(name: string) {
    await expect(this.page.locator('[name="' + name + '"] a#open-part')).toBeVisible();
    await this.page.locator('[name="' + name + '"] a#open-part').click();
  }

  async clickLinkWithName(name: string, isExact: boolean = false) {
    await expect(this.page.getByRole('link', {name: name, exact: isExact})).toBeVisible();
    await this.page.getByRole('link', {name: name, exact: isExact}).click();
  }

  async clickMediaPickerModalSubmitButton() {
    await expect(this.mediaPickerModalSubmitBtn).toBeVisible();
    await this.mediaPickerModalSubmitBtn.click();
  }

  async selectMediaWithName(mediaName: string, isForce: boolean = false) {
    const mediaLocator = this.mediaCardItems.filter({hasText: mediaName});
    await expect(mediaLocator).toBeVisible();
    await mediaLocator.click({position: {x: 0.5, y: 0.5}, force: isForce});
  }

  async selectMediaWithTestId(mediaKey: string) {
    const locator = this.page.getByTestId('media:' + mediaKey);
    await expect(locator).toBeVisible();
    await locator.click({position: {x: 0.5, y: 0.5}});
  }

  async clickCreateModalButton() {
    await expect(this.createModalBtn).toBeVisible();
    await this.createModalBtn.click();
  }

  async clickMediaCaptionAltTextModalSubmitButton() {
    await expect(this.mediaCaptionAltTextModalSubmitBtn).toBeVisible();
    await this.mediaCaptionAltTextModalSubmitBtn.click();
  }

  // Embed Modal
  async enterEmbeddedURL(value: string) {
    await expect(this.embeddedURLTxt).toBeVisible();
    await this.embeddedURLTxt.clear();
    await this.embeddedURLTxt.fill(value);
  }

  async clickEmbeddedRetrieveButton() {
    await expect(this.embeddedRetrieveBtn).toBeVisible();
    await this.embeddedRetrieveBtn.click();
  }

  async clickEmbeddedMediaModalConfirmButton() {
    await expect(this.embeddedMediaModalConfirmBtn).toBeVisible();
    await this.embeddedMediaModalConfirmBtn.click();
  }

  async waitForEmbeddedPreviewVisible() {
    await expect(this.embeddedPreview).toBeVisible();
  }

  async isSubmitButtonDisabled() {
    await expect(this.submitBtn).toBeVisible();
    await expect(this.submitBtn).toHaveAttribute('disabled');
  }

  async doesMediaHaveThumbnail(mediaId: string, thumbnailIconName: string, thumbnailImage: string) {
    const mediaThumbnailLocator = this.page.getByTestId('media:' + mediaId);
    if (thumbnailIconName === 'image') {
      const regexImageSrc = new RegExp(`^${thumbnailImage}.*`);
      await expect(mediaThumbnailLocator.locator('umb-imaging-thumbnail img')).toHaveAttribute('src', regexImageSrc);
    } else {
      await expect(mediaThumbnailLocator.locator('umb-imaging-thumbnail umb-icon')).toHaveAttribute('name', thumbnailIconName);
    }
  }

  async clickCurrentUserAvatarButton() {
    await expect(this.currentUserAvatarBtn).toBeVisible();
    await this.currentUserAvatarBtn.click();
  }

  async clickCreateActionButton() {
    await expect(this.createActionBtn).toBeVisible();
    await this.createActionBtn.click();
  }

  async clickCreateActionWithOptionName(optionName: string) {
    await this.clickCreateActionButton();
    const createOptionLocator = this.createActionButtonCollection.locator('[label="' + optionName + '"]');
    await expect(createOptionLocator).toBeVisible();
    await createOptionLocator.click();
  }

  async doesCollectionTreeItemTableRowHaveName(name: string) {
    await expect(this.collectionTreeItemTableRow.first()).toBeVisible();
    await expect(this.collectionTreeItemTableRow.locator('[label="' + name + '"]')).toBeVisible();
  }

  async doesCollectionTreeItemTableRowHaveIcon(name: string, icon: string) {
    await expect(this.collectionTreeItemTableRow.first()).toBeVisible();
    await expect(this.collectionTreeItemTableRow.filter({hasText: name}).locator('umb-icon').locator('[name="' + icon + '"]')).toBeVisible();
  }

  async clickFolderButton() {
    await expect(this.folderBtn).toBeVisible();
    await this.folderBtn.click();
  }

  async doesReferenceHeadlineHaveText(text: string) {
    await expect(this.referenceHeadline).toContainText(text);
  }

  async isReferenceHeadlineVisible(isVisible: boolean) {
    await expect(this.referenceHeadline).toBeVisible({visible: isVisible});
  }

  async doesReferenceItemsHaveCount(count: number) {
    await expect(this.entityItemRef).toHaveCount(count);
  }

  async isReferenceItemNameVisible(itemName: string) {
    await expect(this.entityItemRef.locator('uui-ref-node[name="' + itemName + '"]')).toBeVisible();
  }

  async doesReferencesContainText(text: string) {
    await expect(this.confirmActionModalEntityReferences).toContainText(text);
  }

  async isValidationMessageVisible(message: string, isVisible: boolean = true) {
    await expect(this.validationMessage.filter({hasText: message})).toBeVisible({visible: isVisible});
  }

  async isSuccessStateIconVisible() {
    await expect(this.successStateIcon).toBeVisible();
  }

  async isPropertyEditorUiWithNameReadOnly(name: string) {
    const propertyEditorUiLocator = this.page.locator('umb-property-editor-ui-' + name);
    await expect(propertyEditorUiLocator).toHaveAttribute('readonly');
  }

  async isPropertyEditorUiWithNameVisible(name: string, isVisible: boolean = true) {
    const propertyEditorUiLocator = this.page.locator('umb-property-editor-ui-' + name);
    await expect(propertyEditorUiLocator).toBeVisible({visible: isVisible});
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
    await expect(this.openedModal.locator('uui-menu-item[label="' + name + '"]')).toBeVisible();
    await this.openedModal.locator('uui-menu-item[label="' + name + '"]').click();
  }

  async isModalMenuItemWithNameDisabled(name: string) {
    await expect(this.sidebarModal.locator('uui-menu-item[label="' + name + '"]')).toHaveAttribute('disabled');
  }

  async doesPropertyHaveInvalidBadge(propertyName: string) {
    await expect(this.page.locator('umb-property-layout').filter({hasText: propertyName}).locator('#invalid-badge uui-badge')).toBeVisible();
  }

  async isModalMenuItemWithNameVisible(name: string, isVisible: boolean = true) {
    await expect(this.sidebarModal.locator('uui-menu-item[label="' + name + '"]')).toBeVisible({visible: isVisible});
  }

  async clickEntityItemByName(itemName: string) {
    await expect(this.page.locator('uui-ref-node,umb-ref-item[name="' + itemName + '"]')).toBeVisible();
    await this.page.locator('uui-ref-node,umb-ref-item[name="' + itemName + '"]').click();
  }

  async isMediaCardItemWithNameDisabled(itemName: string) {
    await expect(this.mediaCardItems.filter({hasText: itemName})).toHaveAttribute('class', 'not-allowed');
  }

  async isMediaCardItemWithNameVisible(itemName: string, isVisible: boolean = true) {
    await expect(this.mediaCardItems.filter({hasText: itemName})).toBeVisible({visible: isVisible});
  }

  async clickWorkspaceActionMenuButton() {
    await expect(this.workspaceActionMenuBtn).toBeVisible();
    await this.workspaceActionMenuBtn.click();
  }

  async clickLockActionMenuOption() {
    await this.clickEntityActionWithName('Lock');
  }

  async isDashboardTabWithNameVisible(name: string, isVisible: boolean = true) {
    await expect(this.page.locator('uui-tab[label="' + name + '"]')).toBeVisible({visible: isVisible});
  }

  async enterMonacoEditorValue(value: string) {
    await expect(this.monacoEditor).toBeVisible();
    await this.monacoEditor.click();
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.press('Backspace');
    await this.page.keyboard.insertText(value);
  }

  async waitUntilUiLoaderIsNoLongerVisible() {
    await expect(this.uiLoader).toBeVisible({visible: false, timeout: 10000});
  }

  async isWorkspaceViewTabWithAliasVisible(alias: string, isVisible: boolean = true) {
    await expect(this.page.getByTestId('workspace:view-link:' + alias)).toBeVisible({visible: isVisible});
  }
}
