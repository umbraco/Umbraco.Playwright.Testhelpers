import {Page, Locator, expect} from "@playwright/test";
import {UiBaseLocators} from "./UiBaseLocators";

export class DataTypeUiHelper extends UiBaseLocators {
  private readonly moveToBtn: Locator;
  private readonly duplicateToBtn: Locator;
  private readonly newDataTypeBtn: Locator;
  private readonly dataTypeNameTxt: Locator;
  private readonly createDataTypeFolderBtn: Locator;
  private readonly updateDataTypeFolderBtn: Locator;
  private readonly includeLabelsToggle: Locator;
  private readonly addColorBtn: Locator;
  private readonly colorValueTxt: Locator;
  private readonly offsetTimeToggle: Locator;
  private readonly dateFormatTxt: Locator;
  private readonly pageSizeTxt: Locator;
  private readonly ascendingRadioBtn: Locator;
  private readonly descendingRadioBtn: Locator;
  private readonly chooseColumnsDisplayedBtn: Locator;
  private readonly workspaceViewName: Locator;
  private readonly orderByDropDownBox: Locator;
  private readonly showWorkspaceViewFirstToggle: Locator;
  private readonly editInInfiniteEditorToggle: Locator;
  private readonly aliasTxt: Locator;
  private readonly widthTxt: Locator;
  private readonly heightTxt: Locator;
  private readonly addCropBtn: Locator;
  private readonly saveCropBtn: Locator;
  private readonly minimumTxt: Locator;
  private readonly maximumTxt: Locator;
  private readonly stepSizeTxt: Locator;
  private readonly optionTxt: Locator;
  private readonly addOptionBtn: Locator;
  private readonly maximumAllowedCharsTxt: Locator;
  private readonly numberOfRowsTxt: Locator;
  private readonly minHeightTxt: Locator;
  private readonly maxHeightTxt: Locator;
  private readonly acceptedFileExtensionsTxt: Locator;
  private readonly addAcceptedFileExtensionsBtn: Locator;
  private readonly minimumNumberOfItemsTxt: Locator;
  private readonly maximumNumberOfItemsTxt: Locator;
  private readonly ignoreUserStartNodesToggle: Locator;
  private readonly overlaySizeDropDownBox: Locator;
  private readonly hideAnchorQueryStringInputToggle: Locator;
  private readonly pickMultipleItemsToggle: Locator;
  private readonly enableFocalPointToggle: Locator;
  private readonly amountLowValueTxt: Locator;
  private readonly amountHighValueTxt: Locator;
  private readonly toolbarCheckboxes: Locator;
  private readonly addStylesheetBtn: Locator;
  private readonly dimensionsWidthTxt: Locator;
  private readonly dimensionsHeightTxt: Locator;
  private readonly maxImageSizeTxt: Locator;
  private readonly hideLabelToggle: Locator;
  private readonly defineTagGroupTxt: Locator;
  private readonly showOpenButtonToggle: Locator;
  private readonly enableMultipleChoiceToggle: Locator;
  private readonly addOptionsBtn: Locator;
  private readonly presetValueToggle: Locator;
  private readonly showToggleLabelsToggle: Locator;
  private readonly labelOnTxt: Locator;
  private readonly labelOffTxt: Locator;
  private readonly labelTxt: Locator;
  private readonly chooseAcceptedTypesBtn: Locator;
  private readonly chooseWithPlusBtn: Locator;
  private readonly storageTypeDropDownBox: Locator;
  private readonly allowDecimalsToggle: Locator;
  private readonly chooseLayoutsBtn: Locator;
  private readonly columnsDisplayedItems: Locator;
  private readonly layoutsItems: Locator;
  private readonly inlineRadioBtn: Locator;
  private readonly duplicateBtn: Locator;
  private readonly addWithPlusBtn: Locator;
  private readonly selectAPropertyEditorBtn: Locator;
  private readonly typeToFilterTxt: Locator;
  private readonly chooseStartNodeBtn: Locator;
  private readonly addBlockBtn: Locator;
  private readonly minAmountTxt: Locator;
  private readonly maxAmountTxt: Locator;
  private readonly singleBlockModeBtn: Locator;
  private readonly liveEditingModeBtn: Locator;
  private readonly inlineEditingModeBtn: Locator;
  private readonly propertyEditorWidthTxt: Locator;
  private readonly labelTextTxt: Locator;
  private readonly overlaySizeOption: Locator;
  private readonly chooseContentModelBtn: Locator;
  private readonly chooseSettingsModelBtn: Locator;
  private readonly contentModelNode: Locator;
  private readonly settingsModelNode: Locator;
  private readonly removeExactContentModelNodeBtn: Locator;
  private readonly removeExactSettingsModelNodeBtn: Locator;
  private readonly openBtn: Locator;
  private readonly backgroundColorBtn: Locator;
  private readonly backgroundColorTxt: Locator;
  private readonly chooseCustomStylesheetBtn: Locator;
  private readonly iconColorBtn: Locator;
  private readonly iconColorTxt: Locator;
  private readonly stylesheetRemoveBtn: Locator;
  private readonly hideContentEditorBlockGridBtn: Locator;
  private readonly hideContentEditorBlockListBtn: Locator;
  private readonly customStylesheetLabel: Locator;
  private readonly documentTypeWorkspace: Locator;
  private readonly editorWidthTxt: Locator;
  private readonly createButtonLabelTxt: Locator;
  private readonly gridColumnsTxt: Locator;
  private readonly showResizeOptionsBtn: Locator;
  private readonly columnSpanOptions: Locator;
  private readonly areasTabBtn: Locator;
  private readonly availableRowSpansLowValueTxt: Locator;
  private readonly availableRowSpansHighValueTxt: Locator;
  private readonly areaGridColumnsTxt: Locator;
  private readonly addAreaBtn: Locator;
  private readonly blockAreaConfig: Locator;
  private readonly aliasAliasTxt: Locator;
  private readonly blockGridAreaWorkspaceSubmitBtn: Locator;
  private readonly createLabelTxt: Locator;
  private readonly minAllowedTxt: Locator;
  private readonly maxAllowedTxt: Locator;
  private readonly addSpecifiedAllowanceBtn: Locator;
  private readonly advancedTabBtn: Locator;
  private readonly allowBlockAtRootBtn: Locator;
  private readonly allowInAreasBtn: Locator;
  private readonly chooseThumbnailAlias: Locator;
  private readonly expandChildItemsForMediaBtn: Locator;
  private readonly tiptapToolbarConfiguration: Locator;
  private readonly addGroupToolbarBtn: Locator;
  private readonly addRowToolbarBtn: Locator;
  private readonly tiptapExtensionsConfiguration: Locator;
  private readonly propertyEditor: Locator;
  private readonly selectIconBtn: Locator;
  private readonly newFolderBtn: Locator;
  private readonly dataTypeBtn: Locator;
  private readonly dataTypesMenu: Locator;
  private readonly propertyEditorConfig: Locator;
  private readonly propertyEditorConfigItems: Locator;
  private readonly tiptapStatusbarConfiguration: Locator;
  private readonly blockThumbnailImage: Locator;
  private readonly dataTypeTreeRoot: Locator;

  constructor(page: Page) {
    super(page);
    this.moveToBtn = this.actionsMenuContainer.getByLabel('Move to');
    this.duplicateToBtn = this.actionsMenuContainer.getByLabel(/^Duplicate to(…)?$/);
    this.newDataTypeBtn = page.getByRole('link', {name: 'Data Type', exact: true});
    this.dataTypeNameTxt = page.locator('umb-data-type-workspace-editor #nameInput #input');
    this.createDataTypeFolderBtn = page.getByLabel('Create folder');
    this.newFolderBtn = page.locator('[name="Folder"]');
    this.updateDataTypeFolderBtn = page.getByLabel('Update folder');
    this.ignoreUserStartNodesToggle = page.getByTestId('property:ignoreUserStartNodes').locator('#toggle');
    this.duplicateBtn = this.sidebarModal.getByLabel('Duplicate', {exact: true});
    this.selectAPropertyEditorBtn = page.getByLabel('Select a property editor');
    this.typeToFilterTxt = page.locator('#filter #input');

    // Approved Color
    this.includeLabelsToggle = page.locator('#toggle');
    this.addColorBtn = page.getByLabel('Add');
    this.colorValueTxt = page.getByPlaceholder('Value').getByRole('textbox');

    // Date Picker
    this.offsetTimeToggle = page.locator('umb-property[label="Offset time"] #toggle');
    this.dateFormatTxt = page.getByTestId('property:format').locator('#input');

    // List View
    this.pageSizeTxt = page.getByTestId('property:pageSize').locator('#input');
    this.ascendingRadioBtn = page.locator('uui-radio[label="Ascending [a-z]"] #button');
    this.descendingRadioBtn = page.locator('uui-radio[label="Descending [z-a]"] #button');
    this.chooseColumnsDisplayedBtn = page.getByTestId('property:includeProperties').getByLabel('Choose');
    this.columnsDisplayedItems = page.getByTestId('property:includeProperties').locator('.layout-item');
    this.workspaceViewName = page.getByTestId('property:tabName').locator('#input');
    this.showWorkspaceViewFirstToggle = page.getByTestId('property:showContentFirst').locator('#toggle');
    this.editInInfiniteEditorToggle = page.locator('umb-property[label="Edit in Infinite Editor"] #toggle');
    this.orderByDropDownBox = page.getByTestId('property:orderBy').locator('select');
    this.chooseLayoutsBtn = page.getByTestId('property:layouts').getByLabel('Choose');
    this.layoutsItems = page.getByTestId('property:layouts').locator('.layout-item');

    // Image Cropper
    this.labelTxt = page.getByLabel('Label', {exact: true});
    this.aliasTxt = page.getByLabel('Alias', {exact: true});
    this.widthTxt = page.getByLabel('Width', {exact: true});
    this.heightTxt = page.getByLabel('Height', {exact: true});
    this.addCropBtn = page.getByLabel('Add', {exact: true});
    this.saveCropBtn = page.locator('[alias="crops"]').getByLabel('Save');

    // Numeric
    this.minimumTxt = page.getByTestId('property:min').locator('#input');
    this.maximumTxt = page.getByTestId('property:max').locator('#input');
    this.stepSizeTxt = page.getByTestId('property:step').locator('#input');
    this.allowDecimalsToggle = page.locator('umb-property[label="Allow decimals"] #toggle');

    // Radiobox
    this.optionTxt = page.getByTestId('property:items').locator('#input');
    this.addOptionBtn = page.getByTestId('property:items').getByLabel('Add', {exact: true});

    // Textarea - Textstring
    this.maximumAllowedCharsTxt = page.getByTestId('property:maxChars').locator('#input');
    this.numberOfRowsTxt = page.getByTestId('property:rows').locator('#input');
    this.minHeightTxt = page.getByTestId('property:minHeight').locator('#input');
    this.maxHeightTxt = page.getByTestId('property:maxHeight').locator('#input');

    // Upload
    this.acceptedFileExtensionsTxt = page.getByTestId('property:fileExtensions').locator('#input');
    this.addAcceptedFileExtensionsBtn = page.getByTestId('property:fileExtensions').getByLabel('Add', {exact: true});

    // Multi URL Picker
    this.minimumNumberOfItemsTxt = page.getByTestId('property:minNumber').locator('#input');
    this.maximumNumberOfItemsTxt = page.getByTestId('property:maxNumber').locator('#input');
    this.overlaySizeDropDownBox = page.getByTestId('property:overlaySize').locator('select');
    this.hideAnchorQueryStringInputToggle = page.getByTestId('property:hideAnchor').locator('#toggle');

    // Media Picker
    this.pickMultipleItemsToggle = page.getByTestId('property:multiple').locator('#toggle');
    this.enableFocalPointToggle = page.getByTestId('property:enableLocalFocalPoint').locator('#toggle');
    this.amountLowValueTxt = page.getByTestId('property:validationLimit').getByLabel('Low value');
    this.amountHighValueTxt = page.getByTestId('property:validationLimit').getByLabel('High value');
    this.chooseAcceptedTypesBtn = page.getByTestId('property:filter').getByLabel('Choose');
    this.chooseWithPlusBtn = page.locator('#btn-add').filter({hasText: 'Choose'});
    this.chooseStartNodeBtn = page.getByTestId('property:startNodeId').locator('#btn-add');

    // Rich Editor
    this.toolbarCheckboxes = page.getByTestId('property:toolbar').locator('uui-checkbox');
    this.addStylesheetBtn = page.getByTestId('property:stylesheets').getByLabel('Add stylesheet');
    this.dimensionsWidthTxt = page.getByTestId('property:dimensions').getByLabel('Width');
    this.dimensionsHeightTxt = page.getByTestId('property:dimensions').getByLabel('Height');
    this.maxImageSizeTxt = page.getByTestId('property:maxImageSize').locator('#input');
    this.hideLabelToggle = page.getByTestId('property:hideLabel').locator('#toggle');
    this.inlineRadioBtn = page.getByTestId('property:mode').locator('uui-radio[value="Inline"]');
    this.addWithPlusBtn = page.getByTestId('property:blocks').locator('#add-button');

    // Tags
    this.defineTagGroupTxt = page.getByTestId('property:group').locator('#input');
    this.storageTypeDropDownBox = page.locator('#native');

    // Content Picker
    this.showOpenButtonToggle = page.getByTestId('property:showOpenButton').locator('#toggle');

    // Dropdown
    this.enableMultipleChoiceToggle = page.getByTestId('property:multiple').locator('#toggle');
    this.addOptionsBtn = page.getByTestId('property:items').getByLabel('Add', {exact: true});

    // True/false
    this.presetValueToggle = page.getByTestId('property:default').locator('#toggle');
    this.showToggleLabelsToggle = page.getByTestId('property:showLabels').locator('#toggle');
    this.labelOnTxt = page.getByTestId('property:labelOn').locator('#input');
    this.labelOffTxt = page.getByTestId('property:labelOff').locator('#input');

    // Block List Editor and Block Grid Editor
    this.addBlockBtn = page.locator('umb-input-block-type #blocks').getByLabel('open');
    this.minAmountTxt = page.getByLabel('Low value');
    this.maxAmountTxt = page.getByLabel('High value');
    this.singleBlockModeBtn = this.page.locator('umb-property-layout').filter({hasText: 'Single block mode'}).locator('#toggle');
    this.liveEditingModeBtn = this.page.locator('umb-property-layout').filter({hasText: 'Live editing'}).locator('#toggle');
    this.inlineEditingModeBtn = this.page.locator('umb-property-layout').filter({hasText: 'Inline editing'}).locator('#toggle');
    this.propertyEditorWidthTxt = this.page.locator('umb-property-layout').filter({hasText: 'Property editor width'}).locator('#input');
    this.labelTextTxt = this.page.locator('[label="Label"]').locator('#input');
    this.overlaySizeOption = this.page.locator('[label="Overlay editor size"]').locator('#native');
    this.chooseContentModelBtn = this.page.locator('[alias="contentElementTypeKey"]').getByLabel('Choose');
    this.chooseSettingsModelBtn = this.page.locator('[alias="settingsElementTypeKey"]').getByLabel('Choose');
    this.contentModelNode = this.page.locator('[alias="contentElementTypeKey"]').locator('uui-ref-node-document-type');
    this.settingsModelNode = this.page.locator('[alias="settingsElementTypeKey"]').locator('uui-ref-node-document-type')
    this.removeExactContentModelNodeBtn = this.page.locator('[alias="contentElementTypeKey"]').getByLabel('Remove', {exact: true});
    this.removeExactSettingsModelNodeBtn = this.page.locator('[alias="settingsElementTypeKey"]').getByLabel('Remove', {exact: true});
    this.openBtn = this.page.getByLabel('Open', {exact: true});
    this.backgroundColorBtn = this.page.locator('umb-property-layout').filter({hasText: 'Background color'}).getByLabel('Eye dropper');
    this.backgroundColorTxt = this.page.locator('[label="Background color"]').locator('[label="Eye dropper"]').locator('#input');
    this.iconColorBtn = this.page.locator('umb-property-layout').filter({hasText: 'Icon color'}).getByLabel('Eye dropper');
    this.iconColorTxt = this.page.locator('[label="Icon color"]').locator('[label="Eye dropper"]').locator('#input');
    this.stylesheetRemoveBtn = this.page.locator('uui-ref-node').getByLabel('Remove', {exact: true});
    this.hideContentEditorBlockListBtn = this.page.locator('[alias="forceHideContentEditorInOverlay"]').locator('#toggle');
    this.hideContentEditorBlockGridBtn = this.page.locator('[alias="hideContentEditor"]').locator('#toggle');
    this.customStylesheetLabel = this.page.locator('[label="Custom stylesheet"]');
    this.chooseThumbnailAlias = this.page.locator('[alias="thumbnail"]').getByLabel('Choose');
    this.documentTypeWorkspace = this.page.locator('umb-document-type-workspace-editor');
    this.editorWidthTxt = this.page.locator('umb-property-layout').filter({hasText: 'Editor width'}).locator('#input');
    this.createButtonLabelTxt = this.page.locator('umb-property-layout').filter({hasText: 'Create button label'}).locator('#input');
    this.gridColumnsTxt = this.page.locator('umb-property-layout').filter({hasText: 'Grid columns'}).locator('#input');
    this.showResizeOptionsBtn = this.page.getByLabel('Show resize options');
    this.columnSpanOptions = this.page.locator('[alias="columnSpanOptions"]');
    this.areasTabBtn = this.page.getByRole('tab', {name: 'Areas'});
    this.availableRowSpansLowValueTxt = this.page.locator('[label="Available row spans"]').getByLabel('Low value');
    this.availableRowSpansHighValueTxt = this.page.locator('[label="Available row spans"]').getByLabel('High value');
    this.areaGridColumnsTxt = this.page.locator('[alias="areaGridColumns"]').locator('#input');
    this.addAreaBtn = this.page.getByLabel('Add area');
    this.blockAreaConfig = this.page.locator('umb-block-area-config-entry');
    this.aliasAliasTxt = this.page.locator('[alias="alias"]').locator('#input');
    this.blockGridAreaWorkspaceSubmitBtn = this.page.locator('umb-block-grid-area-type-workspace-editor').getByLabel('Submit');
    this.createLabelTxt = this.page.locator('[alias="createLabel"]').locator('#input');
    this.minAllowedTxt = this.page.locator('#container').getByLabel('Low value');
    this.maxAllowedTxt = this.page.locator('#container').getByLabel('High value');
    this.addSpecifiedAllowanceBtn = this.page.locator('[alias="specifiedAllowance"]').getByLabel('Add');
    this.advancedTabBtn = this.page.getByRole('tab', {name: 'Advanced'});
    this.allowBlockAtRootBtn = this.page.locator('[alias="allowAtRoot"]');
    this.allowInAreasBtn = this.page.locator('[alias="allowInAreas"]');
    this.expandChildItemsForMediaBtn = this.page.getByLabel('Expand child items for media', {exact: true});
    this.chooseCustomStylesheetBtn = this.page.locator('[label="Custom stylesheet"]').getByLabel('Choose');

    // Tiptap
    this.tiptapToolbarConfiguration = this.page.locator('umb-property-editor-ui-tiptap-toolbar-configuration');
    this.addGroupToolbarBtn = this.tiptapToolbarConfiguration.locator('uui-button').filter({hasText: 'Add group'});
    this.addRowToolbarBtn = this.tiptapToolbarConfiguration.locator('uui-button').filter({hasText: 'Add row'});
    this.tiptapExtensionsConfiguration = this.page.locator('umb-property-editor-ui-tiptap-extensions-configuration');
    this.propertyEditor = this.page.locator('umb-ref-property-editor-ui');
    this.selectIconBtn = page.getByLabel('Select icon');
    this.dataTypeBtn = this.createOptionActionListModal.locator('[name="New Data Type"]');
    this.dataTypesMenu = page.locator('#menu-item').getByRole('link', {name: 'Data Types'});
    this.tiptapStatusbarConfiguration = this.page.locator('umb-property-editor-ui-tiptap-statusbar-configuration');

    // Settings
    this.propertyEditorConfig = page.locator('umb-property-editor-config');
    this.propertyEditorConfigItems = this.propertyEditorConfig.locator('umb-property');
    this.blockThumbnailImage = page.locator('uui-card-block-type').locator('img');

    this.dataTypeTreeRoot = page.locator('[alias="Umb.TreeItem.DataType"]').locator('uui-menu-item[label="Data Types"]')
  }

  async clickActionsMenuForDataType(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForDataType('Data Types');
  }

  async clickRootFolderCaretButton() {
    await this.clickCaretButtonForName('Data Types');
  }

  async createDataTypeFolder(folderName: string) {
    await this.clickCreateActionMenuOption();
    await this.clickFolderButton();
    await this.enterFolderName(folderName);
    await this.clickConfirmCreateFolderButton();
  }

  async goToDataType(dataTypeName: string) {
    await this.clickRootFolderCaretButton();
    await expect(this.sectionSidebar.getByLabel(dataTypeName, {exact: true})).toBeVisible();
    await this.sectionSidebar.getByLabel(dataTypeName, {exact: true}).click();
  }

  async clickMoveToButton() {
    await expect(this.moveToBtn).toBeVisible();
    await this.moveToBtn.click();
  }

  async clickDuplicateToButton() {
    await expect(this.duplicateToBtn).toBeVisible();
    await this.duplicateToBtn.click();
  }

  async waitForDataTypeToBeCreated() {
    await this.waitForNetworkToBeIdle();
  }

  async isDataTypeTreeItemVisible(name: string, isVisible: boolean = true) {
    {
      const hasShowChildren = await this.dataTypeTreeRoot.getAttribute('show-children') !== null;

      if (!hasShowChildren) {
        await this.dataTypeTreeRoot.locator(this.caretBtn).first().click();
      }

      await this.isTreeItemVisible(name, isVisible);
    }
  }

  async waitForDataTypeToBeDeleted() {
    await this.waitForNetworkToBeIdle();
  }

  async waitForDataTypeToBeRenamed() {
    await this.waitForNetworkToBeIdle();
  }

  async clickNewDataTypeButton() {
    await this.newDataTypeBtn.click();
  }

  async clickNewDataTypeFolderButton() {
    await this.newFolderBtn.click();
  }

  async enterDataTypeName(name: string) {
    await this.dataTypeNameTxt.click();
    await this.dataTypeNameTxt.clear();
    await this.dataTypeNameTxt.fill(name);
  }

  async clickCreateFolderButton() {
    await this.createDataTypeFolderBtn.click();
  }

  async clickUpdateFolderButton() {
    await this.updateDataTypeFolderBtn.click();
  }

  async deleteDataType(name: string) {
    await this.clickActionsMenuForDataType(name);
    await this.clickDeleteAndConfirmButton();
  }

  async deleteDataTypeFolder(folderName: string) {
    await this.clickActionsMenuForDataType(folderName);
    await this.deleteFolder();
  }

  async moveDataTypeToFolder(folderName: string) {
    await this.clickMoveToActionMenuOption();
    await this.sidebarModal.getByText(folderName, {exact: true}).click();
    await this.chooseModalBtn.click();
  }

  async duplicateDataTypeToFolder(folderName: string) {
    await this.clickDuplicateToActionMenuOption();
    await this.sidebarModal.getByText(folderName, {exact: true}).click();
    await this.duplicateBtn.click();
  }

  async addMediaStartNode(mediaName: string) {
    await this.mediaCardItems.filter({hasText: mediaName}).click();
    await this.clickChooseModalButton();
  }

  async addContentStartNode(contentName: string) {
    await this.clickTextButtonWithName(contentName);
    await this.chooseModalBtn.click();
  }

  async clickSelectAPropertyEditorButton() {
    await this.selectAPropertyEditorBtn.click();
  }

  async selectAPropertyEditor(propertyName: string, filterKeyword?: string) {
    await this.typeToFilterTxt.fill(filterKeyword ? filterKeyword : propertyName);
    await this.clickTextButtonWithName(propertyName);
  }

  // Approved Color
  async clickIncludeLabelsToggle() {
    await this.includeLabelsToggle.click();
  }

  async removeColorByValue(value: string) {
    await this.page.locator('[value="' + value + '"] uui-button svg').click();
    await this.confirmToDeleteBtn.click();
  }

  async addColor(value: string) {
    await this.addColorBtn.click();
    await this.colorValueTxt.clear();
    await this.colorValueTxt.fill(value);
  }

  // Label
  async changeValueType(valueType: string) {
    await this.page.getByLabel('Select a value type').selectOption({label: valueType});
  }

  // Date Picker
  async clickOffsetTimeToggle() {
    await this.offsetTimeToggle.click();
  }

  async enterDateFormatValue(value: string) {
    await this.dateFormatTxt.clear();
    await this.dateFormatTxt.fill(value);
  }

  // List View
  async enterPageSizeValue(value: string) {
    await this.pageSizeTxt.clear();
    await this.pageSizeTxt.fill(value);
  }

  async chooseOrderDirection(isAscending: boolean) {
    if (isAscending) {
      await this.ascendingRadioBtn.click();
    } else {
      await this.descendingRadioBtn.click();
    }
  }

  async addColumnDisplayed(contentType: string, contentName: string, propertyAlias: string) {
    await this.chooseColumnsDisplayedBtn.click();
    await this.clickTextButtonWithName(contentType);
    await this.clickTextButtonWithName(contentName);
    await this.clickChooseContainerButton();
    await this.clickTextButtonWithName(propertyAlias);
  }

  async removeColumnDisplayed(propertyAlias: string) {
    await this.columnsDisplayedItems.filter({has: this.page.getByText(propertyAlias, {exact: true})}).getByText('Remove').click();
  }

  async addLayouts(layoutName: string) {
    await expect(this.chooseLayoutsBtn).toBeVisible();
    await this.chooseLayoutsBtn.click();
    await expect(this.page.locator('[name="' + layoutName + '"]')).toBeVisible();
    await this.page.locator('[name="' + layoutName + '"]').click();
  }

  async removeLayouts(layoutAlias: string) {
    await this.layoutsItems.filter({has: this.page.getByText(layoutAlias, {exact: true})}).getByText('Remove').click();
  }

  async chooseOrderByValue(value: string) {
    await this.orderByDropDownBox.selectOption({label: value});
  }

  async enterWorkspaceViewName(name: string) {
    await this.workspaceViewName.clear();
    await this.workspaceViewName.fill(name);
  }

  async clickShowContentWorkspaceViewFirstToggle() {
    await this.showWorkspaceViewFirstToggle.click();
  }

  async clickEditInInfiniteEditorToggle() {
    await this.editInInfiniteEditorToggle.click();
  }

  async clickBulkActionPermissionsToggleByValue(value: string) {
    await this.page.locator("uui-toggle[label='" + value + "'] #toggle").click();
  }

  async clickSelectIconButton() {
    await expect(this.selectIconBtn).toBeVisible();
    // Force click is needed
    await this.selectIconBtn.click({force: true});
  }

  async chooseWorkspaceViewIconByValue(value: string) {
    await this.page.locator('[label="' + value + '"] svg').click();
    await this.submitBtn.click();
  }

  // Image Cropper
  async enterCropValues(label: string, alias: string, width: string, height: string) {
    await expect(this.labelTxt).toBeVisible();
    await this.labelTxt.clear();
    await this.labelTxt.fill(label);
    await expect(this.aliasTxt).toBeVisible();
    await this.aliasTxt.clear();
    await this.aliasTxt.fill(alias);
    await expect(this.widthTxt).toBeVisible();
    await this.widthTxt.clear();
    await this.widthTxt.fill(width);
    await this.heightTxt.clear();
    await this.heightTxt.fill(height);
  }

  async clickAddCropButton() {
    await expect(this.addCropBtn).toBeVisible();
    await this.addCropBtn.click();
  }

  async clickSaveCropButton() {
    await expect(this.saveCropBtn).toBeVisible();
    await this.saveCropBtn.click();
  }

  async editCropByAlias(alias: string) {
    await expect(this.page.locator('.crop').filter({has: this.page.getByText(alias)}).getByText('Edit')).toBeVisible();
    await this.page.locator('.crop').filter({has: this.page.getByText(alias)}).getByText('Edit').click();
  }

  async removeCropByAlias(alias: string) {
    await expect(this.page.locator('.crop').filter({has: this.page.getByText(alias)}).getByText('Remove')).toBeVisible();
    await this.page.locator('.crop').filter({has: this.page.getByText(alias)}).getByText('Remove').click();
  }

  // Numeric
  async enterMinimumValue(value: string) {
    await expect(this.minimumTxt).toBeVisible();
    await this.minimumTxt.clear();
    await this.minimumTxt.fill(value);
  }

  async enterMaximumValue(value: string) {
    await expect(this.maximumTxt).toBeVisible();
    await this.maximumTxt.clear();
    await this.maximumTxt.fill(value);
  }

  async enterStepSizeValue(value: string) {
    await expect(this.stepSizeTxt).toBeVisible();
    await this.stepSizeTxt.clear();
    await this.stepSizeTxt.fill(value);
  }

  async clickAllowDecimalsToggle() {
    await expect(this.allowDecimalsToggle).toBeVisible();
    await this.allowDecimalsToggle.click();
  }

  // Radiobox
  async removeOptionByName(name: string) {
    await expect(this.page.locator("uui-button[label='Remove " + name + "'] svg")).toBeVisible();
    await this.page.locator("uui-button[label='Remove " + name + "'] svg").click();
    await this.confirmToDeleteBtn.click();
  }

  async enterOptionName(name: string) {
    await expect(this.optionTxt.last()).toBeVisible();
    await this.optionTxt.last().clear();
    await this.optionTxt.last().fill(name);
  }

  async clickAddOptionButton() {
    await expect(this.addOptionBtn).toBeVisible();
    await this.addOptionBtn.click();
  }

  // Textarea - Textstring
  async enterMaximumAllowedCharactersValue(value: string) {
    await expect(this.maximumAllowedCharsTxt).toBeVisible();
    await this.maximumAllowedCharsTxt.clear();
    await this.maximumAllowedCharsTxt.fill(value);
  }

  async enterNumberOfRowsValue(value: string) {
    await expect(this.numberOfRowsTxt).toBeVisible();
    await this.numberOfRowsTxt.clear();
    await this.numberOfRowsTxt.fill(value);
  }

  async enterMaxHeightValue(value: string) {
    await expect(this.maxHeightTxt).toBeVisible();
    await this.maxHeightTxt.clear();
    await this.maxHeightTxt.fill(value);
  }

  async enterMinHeightValue(value: string) {
    await this.minHeightTxt.clear();
    await this.minHeightTxt.fill(value);
  }

  // Upload
  async enterAcceptedFileExtensions(value: string) {
    await this.acceptedFileExtensionsTxt.last().clear();
    await this.acceptedFileExtensionsTxt.last().fill(value);
  }

  async removeAcceptedFileExtensionsByValue(value: string) {
    await this.page.locator("uui-button[label='Remove " + value + "'] svg").click();
    await this.confirmToDeleteBtn.click();
  }

  async clickAddAcceptedFileExtensionsButton() {
    await this.addAcceptedFileExtensionsBtn.click();
  }

  // Multi URL Picker
  async enterMinimumNumberOfItemsValue(value: string) {
    await this.minimumNumberOfItemsTxt.clear();
    await this.minimumNumberOfItemsTxt.fill(value);
  }

  async enterMaximumNumberOfItemsValue(value: string) {
    await this.maximumNumberOfItemsTxt.clear();
    await this.maximumNumberOfItemsTxt.fill(value);
  }

  async clickIgnoreUserStartNodesToggle() {
    await this.ignoreUserStartNodesToggle.click();
  }

  async chooseOverlaySizeByValue(value: string) {
    await this.overlaySizeDropDownBox.selectOption({value: value});
  }

  async clickHideAnchorQueryStringInputToggle() {
    await this.hideAnchorQueryStringInputToggle.click();
  }

  // Media Picker
  async clickPickMultipleItemsToggle() {
    await this.pickMultipleItemsToggle.click();
  }

  async clickEnableFocalPointToggle() {
    await expect(this.enableFocalPointToggle).toBeVisible();
    await this.enableFocalPointToggle.click();
  }

  async enterAmountValue(lowValue: string, highValue: string) {
    await this.amountLowValueTxt.clear();
    await this.amountLowValueTxt.fill(lowValue);
    await this.amountHighValueTxt.clear();
    await this.amountHighValueTxt.fill(highValue);
  }

  async addAcceptedType(mediaTypeName: string) {
    await this.chooseAcceptedTypesBtn.click();
    await this.clickTextButtonWithName(mediaTypeName);
    await this.chooseModalBtn.click();
  }

  async removeAcceptedType(mediaTypeName: string) {
    await this.page.locator('uui-ref-node-document-type[name="' + mediaTypeName + '"]').getByLabel('Remove').click();
    await this.confirmToRemoveBtn.click();
  }

  async removeMediaStartNode(mediaName: string) {
    await this.page.locator('uui-card-media[name="' + mediaName + '"]').locator('[label="Remove"]').click();
    await this.confirmToRemoveBtn.click();
  }

  async clickChooseStartNodeButton() {
    await this.chooseStartNodeBtn.click();
  }

  // Richtext Editor
  async clickToolbarOptionByValue(values) {
    for (var index in values) {
      await this.toolbarCheckboxes.filter({has: this.page.getByLabel(values[index])}).locator('#ticker svg').click();
    }
  }

  async addStylesheet(stylesheetName: string) {
    await this.addStylesheetBtn.click();
    await this.page.getByLabel(stylesheetName).click();
    await this.chooseModalBtn.click();
  }

  async enterDimensionsValue(width: string, height: string) {
    await this.dimensionsWidthTxt.clear();
    await this.dimensionsWidthTxt.fill(width);
    await this.dimensionsHeightTxt.clear();
    await this.dimensionsHeightTxt.fill(height);
  }

  async enterMaximumSizeForImages(value: string) {
    await this.maxImageSizeTxt.clear();
    await this.maxImageSizeTxt.fill(value);
  }

  async clickHideLabelToggle() {
    await this.hideLabelToggle.click();
  }

  async clickInlineRadioButton() {
    await this.inlineRadioBtn.click();
  }

  async clickChooseWithPlusButton() {
    await this.chooseWithPlusBtn.click();
  }

  async addImageUploadFolder(mediaFolderName: string) {
    await this.clickChooseWithPlusButton();
    await this.selectMediaWithName(mediaFolderName);
    await this.clickChooseModalButton();
  }

  async clickAddWithPlusButton() {
    await expect(this.addWithPlusBtn).toBeVisible();
    await this.addWithPlusBtn.click();
  }

  async addAvailableBlocks(blockName: string) {
    await this.clickAddWithPlusButton();
    await this.clickTextButtonWithName(blockName);
    await this.clickChooseModalButton();
    await this.clickSubmitButton();
  }

  // Tags
  async enterDefineTagGroupValue(value: string) {
    await expect(this.defineTagGroupTxt).toBeVisible();
    await this.defineTagGroupTxt.clear();
    await this.defineTagGroupTxt.fill(value);
  }

  async selectStorageTypeOption(option: string) {
    await expect(this.storageTypeDropDownBox).toBeVisible();
    await this.storageTypeDropDownBox.selectOption({label: option});
  }

  // Content Picker
  async clickShowOpenButtonToggle() {
    await expect(this.showOpenButtonToggle).toBeVisible();
    await this.showOpenButtonToggle.click();
  }

  async removeContentStartNode(contentName: string) {
    const startNodeLocator = this.page.locator('umb-entity-item-ref').filter({has: this.page.locator('[name="' + contentName + '"]')});
    await startNodeLocator.hover();
    await startNodeLocator.getByLabel('Remove').click();
    await this.clickConfirmRemoveButton();
  }

  // Dropdown
  async clickEnableMultipleChoiceToggle() {
    await expect(this.enableMultipleChoiceToggle).toBeVisible();
    await this.enableMultipleChoiceToggle.click();
  }

  async clickAddOptionsButton() {
    await expect(this.addOptionsBtn).toBeVisible();
    await this.addOptionsBtn.click();
  }

  // True/false
  async clickPresetValueToggle() {
    await expect(this.presetValueToggle).toBeVisible();
    await this.presetValueToggle.click();
  }

  async clickShowToggleLabelsToggle() {
    await expect(this.showToggleLabelsToggle).toBeVisible();
    await this.showToggleLabelsToggle.click();
  }

  async enterLabelOnValue(value: string) {
    await expect(this.labelOnTxt).toBeVisible();
    await this.labelOnTxt.clear();
    await this.labelOnTxt.fill(value);
  }

  async enterLabelOffValue(value: string) {
    await expect(this.labelOffTxt).toBeVisible();
    await this.labelOffTxt.clear();
    await this.labelOffTxt.fill(value);
  }

  // Block List Editor
  async clickAddBlockButton(index: number = 0) {
    await expect(this.addBlockBtn.nth(index)).toBeVisible();
    await this.addBlockBtn.nth(index).click();
  }

  async clickRemoveBlockWithName(name: string) {
    const blockWithNameLocator = this.page.locator('umb-block-type-card', {hasText: name});
    await expect(blockWithNameLocator).toBeVisible();
    // The force click is necessary. 
    await blockWithNameLocator.getByLabel('Remove block').click({force: true});
  }

  async enterMinAmount(value: string) {
    await expect(this.minAmountTxt).toBeVisible()
    await this.minAmountTxt.clear();
    await this.minAmountTxt.fill(value);
  }

  async enterMaxAmount(value: string) {
    await expect(this.maxAmountTxt).toBeVisible()
    await this.maxAmountTxt.clear();
    await this.maxAmountTxt.fill(value);
  }

  async doesAmountContainErrorMessageWithText(errorMessage: string) {
    return await expect(this.page.getByText(errorMessage)).toBeVisible();
  }

  async clickSingleBlockMode() {
    await expect(this.singleBlockModeBtn).toBeVisible()
    await this.singleBlockModeBtn.click();
  }

  async clickLiveEditingMode() {
    await expect(this.liveEditingModeBtn).toBeVisible();
    await this.liveEditingModeBtn.click();
  }

  async clickInlineEditingMode() {
    await expect(this.inlineEditingModeBtn).toBeVisible();
    await this.inlineEditingModeBtn.click();
  }

  async enterPropertyEditorWidth(width: string) {
    await expect(this.propertyEditorWidthTxt).toBeVisible();
    await this.propertyEditorWidthTxt.clear();
    await this.propertyEditorWidthTxt.fill(width);
  }

  async goToBlockWithName(name: string) {
    await expect(this.page.getByRole('link', {name: name})).toBeVisible();
    await this.page.getByRole('link', {name: name}).click();
  }

  async enterBlockLabelText(label: string) {
    await this.removeBlockLabelText();
    await this.labelTextTxt.fill(label);
  }

  async removeBlockLabelText() {
    await expect(this.labelTextTxt).toBeVisible();
    await this.labelTextTxt.clear();
  }

  async clickAllowInRootForBlock() {
    await expect(this.allowBlockAtRootBtn).toBeVisible();
    await this.allowBlockAtRootBtn.click();
  }

  async clickAllowInAreasForBlock() {
    await expect(this.allowInAreasBtn).toBeVisible();
    await this.allowInAreasBtn.click();
  }

  async updateBlockOverlaySize(size: string) {
    await expect(this.overlaySizeOption).toBeVisible();
    await this.overlaySizeOption.selectOption(size);
  }

  async addBlockContentModel(elementName: string) {
    await expect(this.chooseContentModelBtn).toBeVisible();
    await this.chooseContentModelBtn.click();
    await this.clickButtonWithName(elementName);
    await this.clickChooseButton();
  }

  async addBlockSettingsModel(elementName: string) {
    await expect(this.chooseSettingsModelBtn).toBeVisible();
    await this.chooseSettingsModelBtn.click();
    await this.clickButtonWithName(elementName);
    await this.clickChooseModalButton();
  }

  async removeBlockContentModel() {
    await expect(this.contentModelNode).toBeVisible();
    await this.contentModelNode.hover();
    await expect(this.removeExactContentModelNodeBtn).toBeVisible();
    await this.removeExactContentModelNodeBtn.click();
  }

  async removeBlockSettingsModel() {
    await expect(this.settingsModelNode).toBeVisible();
    await this.settingsModelNode.hover();
    await expect(this.removeExactSettingsModelNodeBtn).toBeVisible();
    await this.removeExactSettingsModelNodeBtn.click();
  }

  async openBlockContentModel() {
    await expect(this.contentModelNode).toBeVisible();
    await this.contentModelNode.hover();
    await expect(this.openBtn).toBeVisible();
    await this.openBtn.click();
  }

  async openBlockSettingsModel() {
    await expect(this.settingsModelNode).toBeVisible();
    await this.settingsModelNode.hover();
    await expect(this.openBtn).toBeVisible();
    await this.openBtn.click();
  }

  async isElementWorkspaceOpenInBlock(elementTypeName: string) {
    return await expect(this.documentTypeWorkspace.filter({hasText: elementTypeName})).toBeVisible();
  }

  async selectBlockBackgroundColor(color: string) {
    await expect(this.backgroundColorBtn).toBeVisible();
    await this.backgroundColorBtn.click();
    await this.backgroundColorTxt.clear();
    await this.backgroundColorTxt.fill(color);
  }

  async selectBlockIconColor(color: string) {
    await expect(this.iconColorBtn).toBeVisible();
    await this.iconColorBtn.click();
    await this.iconColorTxt.clear();
    await this.iconColorTxt.fill(color);
  }

  async clickExpandChildItemsForMediaButton() {
    await expect(this.expandChildItemsForMediaBtn).toBeVisible();
    await this.expandChildItemsForMediaBtn.click();
  }

  async clickRemoveCustomStylesheetWithName(name: string) {
    await expect(this.customStylesheetLabel.locator('[name="' + name + '"]')).toBeVisible();
    await this.customStylesheetLabel.locator('[name="' + name + '"]').click();
    await expect(this.stylesheetRemoveBtn).toBeVisible();
    await this.stylesheetRemoveBtn.click();
    await this.clickConfirmRemoveButton();
  }

  async clickBlockGridHideContentEditorButton() {
    await expect(this.hideContentEditorBlockGridBtn).toBeVisible();
    await this.hideContentEditorBlockGridBtn.click();
  }

  async chooseBlockCustomStylesheetWithName(name: string) {
    await expect(this.chooseCustomStylesheetBtn).toBeVisible();
    await this.chooseCustomStylesheetBtn.click();
    await this.clickCaretButtonForName('wwwroot');
    await this.clickCaretButtonForName('css');
    await this.clickLabelWithName(name, true);
    await this.clickChooseModalButton();
  }

  async chooseBlockThumbnailWithPath(mediaPath: string) {
    const mediaItems = mediaPath.split('/media/')[1].split('/');
    await expect(this.chooseThumbnailAlias).toBeVisible();
    await this.chooseThumbnailAlias.click();
    await this.clickCaretButtonForName('wwwroot');
    await this.clickExpandChildItemsForMediaButton();
    for (let i = 0; i < mediaItems.length; i++) {
      if (i === mediaItems.length - 1) {
        await this.clickLabelWithName(mediaItems[i], true);
      } else {
        await this.page.locator('uui-menu-item[label="' + mediaItems[i] + '"] #caret-button').click();
      }
    }
    await this.clickChooseModalButton();
  }

  async clickBlockListHideContentEditorButton() {
    await expect(this.hideContentEditorBlockListBtn).toBeVisible();
    await this.hideContentEditorBlockListBtn.click();
  }

  async enterEditorWidth(value: string) {
    await expect(this.editorWidthTxt).toBeVisible();
    await this.editorWidthTxt.clear();
    await this.editorWidthTxt.fill(value);
  }

  async enterCreateButtonLabel(value: string) {
    await expect(this.createButtonLabelTxt).toBeVisible();
    await this.createButtonLabelTxt.clear();
    await this.createButtonLabelTxt.fill(value);
  }

  async enterGridColumns(value: number) {
    await expect(this.gridColumnsTxt).toBeVisible();
    await this.gridColumnsTxt.clear();
    if (value === undefined) {
      return;
    }
    await this.gridColumnsTxt.fill(value.toString());
  }

  async clickShowResizeOptions() {
    await expect(this.showResizeOptionsBtn).toBeVisible();
    await this.showResizeOptionsBtn.click();
  }

  async clickAvailableColumnSpans(columnSpans: number[]) {
    for (let index in columnSpans) {
      await expect(this.columnSpanOptions.getByLabel(columnSpans[index].toString(), {exact: true})).toBeVisible();
      await this.columnSpanOptions.getByLabel(columnSpans[index].toString(), {exact: true}).click();
    }
  }

  async goToBlockAreasTab() {
    await expect(this.areasTabBtn).toBeVisible();
    await this.areasTabBtn.click();
  }

  async enterMinRowSpan(value: number) {
    await expect(this.availableRowSpansLowValueTxt).toBeVisible();
    await this.availableRowSpansLowValueTxt.clear();
    if (value === undefined) {
      return;
    }
    await this.availableRowSpansLowValueTxt.fill(value.toString());
  }

  async enterMaxRowSpan(value: number) {
    await expect(this.availableRowSpansHighValueTxt).toBeVisible();
    await this.availableRowSpansHighValueTxt.clear();
    if (value === undefined) {
      return;
    }
    await this.availableRowSpansHighValueTxt.fill(value.toString());
  }

  async enterGridColumnsForArea(value: number) {
    await expect(this.areaGridColumnsTxt).toBeVisible();
    await this.areaGridColumnsTxt.clear();
    if (value === undefined) {
      return;
    }
    await this.areaGridColumnsTxt.fill(value.toString());
  }

  async addAreaButton() {
    await expect(this.addAreaBtn).toBeVisible();
    await this.addAreaBtn.click();
  }

  async goToAreaByAlias(alias: string) {
    const editAreaWithAliasLocator = this.blockAreaConfig.filter({hasText: alias}).getByLabel('edit');
    await expect(editAreaWithAliasLocator).toBeVisible();
    await editAreaWithAliasLocator.click({force: true});
  }

  async clickRemoveAreaByAlias(alias: string) {
    const removeAreaWithAliasLocator = this.blockAreaConfig.filter({hasText: alias}).getByLabel('delete');
    await expect(removeAreaWithAliasLocator).toBeVisible();
    await removeAreaWithAliasLocator.click({force: true});
    await this.clickConfirmToDeleteButton();
  }

  async enterAreaAlias(alias: string) {
    await expect(this.aliasAliasTxt).toBeVisible();
    await this.aliasAliasTxt.clear();
    await this.aliasAliasTxt.fill(alias);
  }

  async clickAreaSubmitButton() {
    await expect(this.blockGridAreaWorkspaceSubmitBtn).toBeVisible();
    await this.blockGridAreaWorkspaceSubmitBtn.click();
    await this.page.waitForTimeout(500);
  }

  async enterCreateButtonLabelInArea(value: string) {
    await expect(this.createLabelTxt.nth(1)).toBeVisible();
    await this.createLabelTxt.nth(1).clear();
    if (value === undefined) {
      return;
    }
    await this.createLabelTxt.nth(1).fill(value);
  }

  async enterMinAllowedInArea(value: number) {
    await expect(this.minAllowedTxt).toBeVisible();
    await this.minAllowedTxt.clear();
    if (value === undefined) {
      return;
    }
    await this.minAllowedTxt.fill(value.toString());
  }

  async enterMaxAllowedInArea(value: number) {
    await expect(this.maxAllowedTxt).toBeVisible();
    await this.maxAllowedTxt.clear();
    if (value === undefined) {
      return;
    }
    await this.maxAllowedTxt.fill(value.toString());
  }

  async clickAddSpecifiedAllowanceButton() {
    await expect(this.addSpecifiedAllowanceBtn).toBeVisible();
    await this.addSpecifiedAllowanceBtn.click();
  }

  async goToBlockAdvancedTab() {
    await expect(this.advancedTabBtn).toBeVisible();
    await this.advancedTabBtn.click();
  }

  async getLinkWithName(name: string) {
    await expect(this.page.getByRole('link', {name: name})).toBeVisible();
    return this.page.getByRole('link', {name: name});
  }

  async getAddButtonInGroupWithName(name: string) {
    await expect(this.page.locator('.group').filter({hasText: name}).locator('#add-button')).toBeVisible();
    return this.page.locator('.group').filter({hasText: name}).locator('#add-button');
  }

  async clickRemoveStylesheetButton(stylesheetName: string) {
    await expect(this.page.locator('[name="' + stylesheetName + '"]').getByLabel('Remove')).toBeVisible();
    await this.page.locator('[name="' + stylesheetName + '"]').getByLabel('Remove').click();
  }

  // TipTap
  async deleteToolbarGroup(groupIndex: number, rowIndex: number = 0) {
    const groupButton = this.tiptapToolbarConfiguration.locator('.row').nth(rowIndex).locator('.group').nth(groupIndex);
    await expect(groupButton).toBeVisible();
    await groupButton.hover();
    const actionsInGroup = groupButton.locator('.items').locator('uui-button');
    const actionsCount = await actionsInGroup.count();
    for (let i = 0; i < actionsCount; i++) {
      await actionsInGroup.first().click();
    }
    await groupButton.locator('[label="Remove group"]').click();
  }

  async deleteToolbarRow(rowIndex: number) {
    const rowButton = this.tiptapToolbarConfiguration.locator('.row').nth(rowIndex);
    await expect(rowButton).toBeVisible();
    await rowButton.hover();
    await rowButton.locator('[label="Remove row"]').click();
  }

  async clickAddRowToolbarButton() {
    await expect(this.addRowToolbarBtn).toBeVisible();
    await this.addRowToolbarBtn.click();
  }

  async clickAddGroupToolbarButton() {
    await expect(this.addGroupToolbarBtn).toBeVisible();
    await this.addGroupToolbarBtn.click();
  }

  async clickExtensionItemWithName(name: string) {
    await expect(this.tiptapExtensionsConfiguration.locator('uui-checkbox[label="' + name + '"]')).toBeVisible();
    await this.tiptapExtensionsConfiguration.locator('uui-checkbox[label="' + name + '"]').click();
  }

  async doesPropertyEditorHaveUiAlias(uiAlias: string) {
    await expect(this.propertyEditor).toHaveAttribute('alias', uiAlias);
  }

  async doesPropertyEditorHaveName(name: string) {
    await expect(this.propertyEditor).toHaveAttribute('name', name);
  }

  async doesPropertyEditorHaveAlias(alias: string) {
    await expect(this.propertyEditor).toHaveAttribute('property-editor-schema-alias', alias);
  }

  async clickDataTypeButton() {
    await expect(this.dataTypeBtn).toBeVisible();
    await this.dataTypeBtn.click();
  }

  async clickDataTypesMenu() {
    await expect(this.dataTypesMenu).toBeVisible();
    await this.dataTypesMenu.click();
  }

  async doesSettingHaveValue(settings) {
    for (let index = 0; index < Object.keys(settings).length; index++) {
      const [label, description] = settings[index];
      await expect(this.propertyEditorConfigItems.nth(index).locator('#headerColumn #label')).toHaveText(label);
      if (description !== '')
        await expect(this.propertyEditorConfigItems.nth(index).locator('#description')).toHaveText(description);
    }
  }

  async doesSettingItemsHaveCount(settings) {
    await expect(this.propertyEditorConfigItems).toHaveCount(Object.keys(settings).length);
  }

  async doesSettingsContainText(text: string) {
    await expect(this.propertyEditorConfig).toContainText(text);
  }

  async clickStatusbarItemInToolboxWithName(name: string) {
    const statusbarItemLocator = this.tiptapStatusbarConfiguration.locator('#toolbox uui-button').filter({hasText: name});
    await expect(statusbarItemLocator).toBeVisible();
    await statusbarItemLocator.click();
  }

  async clickStatusbarItemWithName(name: string) {
    const statusbarItemLocator = this.tiptapStatusbarConfiguration.locator('#statusbar uui-button').filter({hasText: name});
    await expect(statusbarItemLocator).toBeVisible();
    await statusbarItemLocator.click();
  }

  async isExtensionItemChecked(itemName: string, isChecked: boolean = true) {
    await expect(this.tiptapExtensionsConfiguration.locator('uui-checkbox[label="' + itemName + '"] input')).toBeChecked({checked: isChecked});
  }
  
  async doesBlockHaveThumbnailImage(thumbnailImageUrl: string) {
    await expect(this.blockThumbnailImage).toHaveAttribute('src', thumbnailImageUrl);
  }
}