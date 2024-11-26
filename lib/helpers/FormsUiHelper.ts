import { UiBaseLocators } from "./UiBaseLocators";
import { expect, Locator, Page } from "@playwright/test"

export class FormsUiHelper extends UiBaseLocators{
  private readonly formMenuItem : Locator;
  private readonly quickCreateNewFormButton : Locator;
  private readonly createNewFormModalButton : Locator;
  private readonly saveFormButton : Locator;
  private readonly formNameTxt : Locator;
  private readonly formPageNameInput : Locator;
  private readonly formGroupNameInput : Locator;
  private readonly formExpandButton : Locator;
  private readonly formAddNewPageButton : Locator;
  private readonly formAddNewGroupButton : Locator;
  private readonly formPage : Locator;
  private readonly formAddQuestionButton : Locator;
  private readonly formFieldType : Locator;
  private readonly formFieldName : Locator;
  private readonly formSubmitButtonModal : Locator;
  private readonly formTree : Locator;
  private readonly formActionModal : Locator;
  private readonly formDeleteThreeDotButton : Locator;
  private readonly formDeleteButton : Locator;
  private readonly formWorkspaceEditor : Locator;
  private readonly formSettingIcon : Locator;
  private readonly formSettingStoreRecordButton : Locator;
  private readonly formSettingCaptions : Locator;
  private readonly formSettingStyling : Locator;
  private readonly formSettingValidation : Locator;
  private readonly formSettingAutocomplete : Locator;
  private readonly formSettingModeration : Locator;
  private readonly formSettingFieldsDisplayed : Locator;
  private readonly formSettingDataRetention : Locator;
  private readonly formSettingCaptionsLable : Locator;
  private readonly formSettingStylingLable : Locator;
  private readonly formSettingValidationLable : Locator;
  private readonly formSettingAutocompleteLable : Locator;
  private readonly formSettingModerationLable : Locator;
  private readonly formSettingFieldsDisplayedLabel : Locator;
  private readonly formSettingDataRetentionLable : Locator;
  private readonly formWorkflowConfigureButton : Locator;
  private readonly formWorkflowOnSubmitStage : Locator;
  private readonly formWorkflowAddButtonModal : Locator;
  private readonly formConfigureWorkflowModal : Locator;
  private readonly formEditWorkflowModal : Locator;
  private readonly formEditFieldModal : Locator;
  private readonly formMenuItemForForm : Locator;
  private readonly formInputText : Locator;
  private readonly formInputNumber : Locator;
  private readonly formToggleSlider : Locator;

  constructor(page: Page) {
    super(page);
    this.quickCreateNewFormButton = page.locator('uui-button[label="Create..."]');
    this.createNewFormModalButton = page.locator('#menu-item [aria-label="New Form..."]');
    this.saveFormButton = page.getByLabel('Save', {exact: true});
    this.formNameTxt = page.locator('#nameInput input[aria-label="form name"]');
    this.formPageNameInput = page.locator('input[type = "text"][placeholder = "Untitled page (optional)"]');
    this.formGroupNameInput = page.locator('input[type = "text"][placeholder = "Untitled group (optional)"]');
    this.formAddNewPageButton = page.getByLabel('Add new page', {exact: true});
    this.formAddNewGroupButton = page.getByLabel('Add new group', {exact: true});
    this.formPage = page.locator('forms-form-page');
    this.formAddQuestionButton = page.getByLabel("Add question", {exact: true});
    this.formEditFieldModal = page.locator("form-edit-field-modal");
    this.formFieldType = page.locator('#btn-item');
    this.formFieldName = page.locator('#caption input[type="text"][aria-label="caption"]');
    this.formSubmitButtonModal = page.getByLabel('Submit', {exact: true});
    this.formExpandButton = page.locator('#menu-item button[aria-label="Expand child items for Forms"] svg');
    this.formTree = page.locator('umb-tree[alias="Forms.Tree.Forms"]');
    this.formMenuItem = page.locator('uui-menu-item');
    this.formMenuItemForForm = page.locator('uui-menu-item[label="Forms"]');
    this.formActionModal = page.locator('#action-modal');
    this.formDeleteThreeDotButton = page.locator('uui-menu-item[label="Delete..."]');
    this.formDeleteButton = page.getByLabel('Delete', {exact: true});
    this.formWorkspaceEditor = page.locator('umb-workspace-editor[alias="Forms.Workspace.Form"]');
    this.formSettingIcon = page.locator('umb-icon[name="settings"]');
    this.formSettingStoreRecordButton = page.locator('forms-settings-store-records');
    this.formSettingCaptions = page.locator('forms-settings-captions');
    this.formSettingStyling = page.locator('forms-settings-styling');
    this.formSettingValidation = page.locator('forms-settings-validation');
    this.formSettingAutocomplete = page.locator('forms-settings-autocomplete');
    this.formSettingModeration = page.locator('forms-settings-moderation');
    this.formSettingFieldsDisplayed = page.locator('forms-settings-fields-display');
    this.formSettingDataRetention = page.locator('forms-settings-data-retention');
    this.formSettingCaptionsLable = page.locator('uui-label[title="captions"]');
    this.formSettingStylingLable = page.locator('uui-label[title="styling"]');
    this.formSettingValidationLable = page.locator('uui-label[title="validation"]');
    this.formSettingAutocompleteLable = page.locator('uui-label[title="autocomplete"]');
    this.formSettingModerationLable = page.locator('uui-label[title="manualApproval"]');
    this.formSettingFieldsDisplayedLabel = page.locator('uui-label[title="fieldsDisplayed"]');
    this.formSettingDataRetentionLable = page.locator('uui-label[title="dataRetention"]');
    this.formWorkflowConfigureButton = page.getByLabel('Configure workflow', { exact: true });
    this.formWorkflowOnSubmitStage = page.locator('form-configure-workflow-stage[collectionname="onSubmit"]');
    this.formWorkflowAddButtonModal = page.locator('.stage-block', {hasText: "Add workflow"});
    this.formConfigureWorkflowModal = page.locator('form-configure-workflow-modal');
    this.formEditWorkflowModal = page.locator('form-edit-workflow-modal');
    this.formInputText = page.locator('input[type = "text"]');
    this.formInputNumber = page.locator('input[type = "number"]');
    this.formToggleSlider = page.locator('uui-toggle #slider');
  }

  async clickQuickCreateFormButton() {
    await this.formMenuItemForForm.hover();
    await this.formMenuItemForForm.locator(this.quickCreateNewFormButton).click();
  }

  async clickNewFormButton() {
    await this.createNewFormModalButton.click();
  }

  async clickSaveFormButton(){
    await this.saveFormButton.click();
  }

  async fillFormName(name: string){
    await expect(this.formNameTxt).toBeVisible();
    await this.formNameTxt.fill(name);
  }

  async fillFormPageName(position: number, name: string){
    const nameInput = this.formPageNameInput.nth(position);
    await expect(nameInput).toBeVisible();
    await nameInput.fill(name);
  }

  async fillFormGroupName(position: number, name: string){
    const groupInput = this.formGroupNameInput.nth(position);
    await expect(groupInput).toBeVisible();
    await groupInput.fill(name);
  }

  async fillFormFieldName(name: string){
    await this.formEditFieldModal.locator(this.formFieldName).fill(name);
  }

  async clickAddNewPageButton(){
    await this.formAddNewPageButton.click();
  }

  async clickAddNewGroupButton(){
    await this.formAddNewGroupButton.click();
  }

  async clickAddQuestionButton(index: number = 0){
    const button = this.formPage.nth(index).locator(this.formAddQuestionButton);
    await button.click();
  }

  async chooseFormFieldType(type: string){
    await this.formFieldType.filter({hasText: type}).nth(0).click();
  }

  async clickExpandFormsTreeButton(){
    await this.formExpandButton.click();
  }

  async doesFormTreeHaveFormName(name: string) {
    await expect(this.formTree).toContainText(name);
  }

  async goToFormWithName(name: string) {
    await this.formTree.getByText(name, {exact: true}).click();
  }

  async clickFormFieldTypeSubmitModal() {
    await this.formSubmitButtonModal.click();
  }

  async clickActionMenuOnFormMenuItem(name: string){
    await this.formMenuItem.locator('[label="' + name + '"] uui-button[label="Open actions menu"]').click();
  }

  async clickDeleteFormButton(){
    await this.formActionModal.locator(this.formDeleteThreeDotButton).click();
    await this.formDeleteButton.click();
  }

  async goToFormSetting(){
    await this.formWorkspaceEditor.locator(this.formSettingIcon).click();
  }

  async setFormStoreRecordsSetting(){
    await expect(this.formSettingStoreRecordButton).toBeVisible();
    const toggle = this.formSettingStoreRecordButton.locator(this.formToggleSlider);
    await expect(toggle).toBeVisible();
    await toggle.check();
  }

  async setFormCaptionsSetting(){
    await expect(this.formSettingCaptions.locator(this.formSettingCaptionsLable)).toBeVisible();
    for (let i = 0; i < 3; i++) {
      const captionInput = this.formSettingCaptions.locator(this.formInputText).nth(i);
      await expect(captionInput).toBeVisible();
      await captionInput.fill("Test Caption " + (i + 1));
    }
  }

  async setFormStylingSetting(){
    await expect(this.formSettingStyling.locator(this.formSettingStylingLable)).toBeVisible();
    const cssClassInput = this.formSettingStyling.locator(this.formInputText);
    await expect(cssClassInput).toBeVisible();
    await cssClassInput.fill("custom-css-class");
    const disableDefaultStylesheetInput = this.formSettingStyling.locator(this.formToggleSlider);
    await expect(disableDefaultStylesheetInput).toBeVisible();
    await disableDefaultStylesheetInput.click();
  }

  async setFormValidationSetting(){
    await expect(this.formSettingValidation.locator(this.formSettingValidationLable)).toBeVisible();
    const requiredErrorMessageInput = this.formSettingValidation.locator(this.formInputText).nth(0);
    await expect(requiredErrorMessageInput).toBeVisible();
    await requiredErrorMessageInput.fill("Required error message");
    const invalidErrorMessageInput = this.formSettingValidation.locator(this.formInputText).nth(1);
    await expect(invalidErrorMessageInput).toBeVisible();
    await invalidErrorMessageInput.fill("Invalid error message");

    const showValidationSummaryInput = this.formSettingValidation.locator(this.formToggleSlider).nth(0);
    await expect(showValidationSummaryInput).toBeVisible();
    await showValidationSummaryInput.click();
    const hideFieldValidationInput = this.formSettingValidation.locator(this.formToggleSlider).nth(1);
    await expect(hideFieldValidationInput).toBeVisible();
    await hideFieldValidationInput.click();

    const markMandatoryFieldRadioInput = this.formSettingValidation.locator("uui-radio[value = 'MarkMandatoryFields']");
    await expect(markMandatoryFieldRadioInput).toBeVisible();
    await markMandatoryFieldRadioInput.click();

    const indicatorInput = this.formSettingValidation.locator(this.formInputText).nth(2);
    await expect(indicatorInput).toBeVisible();
    await indicatorInput.fill("+");
  }

  async setFormAutocompleteSetting(){
    await expect(this.formSettingAutocomplete.locator(this.formSettingAutocompleteLable)).toBeVisible();
    const autocompleteAttributeRadioInput = this.formSettingAutocomplete.locator('uui-radio[value = "On"]');
    await expect(autocompleteAttributeRadioInput).toBeVisible();
    await autocompleteAttributeRadioInput.click();
  }

  async setFormModerationSetting(){
    await expect(this.formSettingModeration.locator(this.formSettingModerationLable)).toBeVisible();
    const enablePostModerationAttributeToggleInput = this.formSettingModeration.locator(this.formToggleSlider);
    await expect(enablePostModerationAttributeToggleInput).toBeVisible();
    await enablePostModerationAttributeToggleInput.click();
  }

  async setFormFieldsDisplayedSetting(){
    await expect(this.formSettingFieldsDisplayed.locator(this.formSettingFieldsDisplayedLabel)).toBeVisible();
    const displayDefaultFieldsToggleInput = this.formSettingFieldsDisplayed.locator(this.formToggleSlider);
    await expect(displayDefaultFieldsToggleInput).toBeVisible();
    await displayDefaultFieldsToggleInput.click();
    await this.page.waitForTimeout(100); // short pause required here otherwise revealed elements are not found
    const displayFieldsSelect = this.formSettingFieldsDisplayed.locator("select");
    await expect(displayFieldsSelect).toBeVisible();
    await displayFieldsSelect.selectOption({ value: '_system_state' });
    const displayFieldsAddButton = this.formSettingFieldsDisplayed.locator("button[id='button']");
    await expect(displayFieldsAddButton).toBeVisible();
    await displayFieldsAddButton.click();
  }

  async setFormDataRetentionSetting(){
    await expect(this.formSettingDataRetention.locator(this.formSettingDataRetentionLable)).toBeVisible();
    const retainSubmittedRecordsToggleInput = this.formSettingDataRetention.locator(this.formToggleSlider).nth(0);
    await expect(retainSubmittedRecordsToggleInput).toBeVisible();
    await retainSubmittedRecordsToggleInput.click();
    await this.page.waitForTimeout(100); // short pause required here otherwise revealed elements are not found
    const retainSubmittedRecordsNumberInput = this.formSettingDataRetention.locator(this.formInputNumber).nth(0);
    await expect(retainSubmittedRecordsNumberInput).toBeVisible();
    await retainSubmittedRecordsNumberInput.fill("7");
  }

  async toggleFieldSetting(settingAlias: string) {
    const settingFieldLocator = this.page.locator('umb-property-layout[alias="' + settingAlias + '"] #slider');
    await expect(settingFieldLocator).toBeVisible();
    await settingFieldLocator.click();
  }

  async applyFieldSettingViaTextInput(settingAlias: string, settingValue: string) {
    const settingFieldLocator = this.page.locator('umb-property[alias="' + settingAlias + '"] input');
    await settingFieldLocator.fill(settingValue);
  }

  async applyFieldSettingViaDropDown(settingAlias: string, settingValue: string) {
    const settingFieldLocator = this.page.locator('umb-property[alias="' + settingAlias + '"] select');
    await settingFieldLocator.selectOption({ value: settingValue });
  }

  async applyFieldSettingViaSlider(settingAlias: string) {
    const settingFieldLocator = this.page.locator('umb-property[alias="' + settingAlias + '"] #slider');
    await expect(settingFieldLocator).toBeVisible();
    await settingFieldLocator.click();
  }

  async applyFieldFileUploadSettings(settingAlias: string, allowedProvidedExtensions: Array<string>, allowedCustomExtensions: Array<string>, allowMultiple: boolean) {
    const settingFieldLocator = this.page.locator('umb-property-layout[alias="' + settingAlias + '"]');
    for (var i = 0; i < allowedProvidedExtensions.length; i++) {
      const checkBoxLocator = settingFieldLocator.locator('uui-toggle', {hasText: allowedProvidedExtensions[i].toUpperCase()}).locator('#slider');
      await expect(checkBoxLocator).toBeVisible();
      await checkBoxLocator.click();
    }
  
    const addNewExtensionLocator = settingFieldLocator.locator('input[placeholder = "Add new allowed file type"]');
    await expect(addNewExtensionLocator).toBeVisible();
    const buttonLocator = settingFieldLocator.locator('form svg');
    await expect(buttonLocator).toBeVisible();
    for (var i = 0; i < allowedCustomExtensions.length; i++) {
      await addNewExtensionLocator.fill(allowedCustomExtensions[i]);
      await buttonLocator.click();
    }
  
    if (allowMultiple) {
      const alias = "allowMultipleFileUploads";
      const multipleUploadLocator = this.page.locator('umb-property-layout[alias="' + alias + '"] #slider');
      await expect(multipleUploadLocator).toBeVisible();
      await multipleUploadLocator.click();
    }
  }

  async applyFieldPrevalues(settingAlias: string, prevalues: Array<any>) {
    const settingFieldLocator = this.page.locator('umb-property-layout[alias="' + settingAlias + '"]');
    for (var i = 0; i < prevalues.length; i++) {
      const valueFieldLocator = settingFieldLocator.locator("input[placeholder = 'New value']");
      await expect(valueFieldLocator).toBeVisible();
      await valueFieldLocator.fill(prevalues[i].value);
  
      const captionFieldLocator = settingFieldLocator.locator("input[placeholder = 'New caption']");
      await expect(captionFieldLocator).toBeVisible();
      await captionFieldLocator.fill(prevalues[i].caption);
  
      const buttonLocator = settingFieldLocator.locator('uui-button[label="add"]');
      await expect(buttonLocator).toBeVisible();
      await buttonLocator.click();
    }
  }

  async applyFieldSettingViaTextArea(settingAlias: string, settingValue: string) {
    const settingFieldLocator = this.page.locator('umb-property[alias="' + settingAlias + '"] textarea');
    await settingFieldLocator.fill(settingValue);
  }

  async applyFieldSettingViaRichTextInput(settingAlias: string, settingValue: string) {
    const richTextAreaTxt = this.page.frameLocator('umb-property[alias="' + settingAlias + '"] iframe[title="Rich Text Area"]').locator('#tinymce');
    await expect(richTextAreaTxt).toBeVisible();
    await richTextAreaTxt.fill(settingValue);
  }

  async applyFieldSettingViaRange(settingAlias: string, settingValue: string) {
    const settingFieldLocator = this.page.locator('umb-property[alias="' + settingAlias + '"]');
    await settingFieldLocator.locator('input[type="range"]').fill(settingValue);
  }

  async applyFieldSettingViaFieldMappingInput(settingAlias: string, settingValue: Array<any>) {
    const settingFieldLocator = this.page.locator('umb-property[alias="' + settingAlias + '"]');
    await expect(settingFieldLocator).toBeVisible();
  
    for (let i = 0; i < settingValue.length; i++) {
      const buttonLocator = settingFieldLocator.locator('uui-button[label="add"]');
      await expect(buttonLocator).toBeVisible();
      await buttonLocator.click();
  
      const aliasInputLocator = settingFieldLocator.locator("input[placeholder = 'Alias']").nth(i);
      await expect(aliasInputLocator).toBeVisible();
      await aliasInputLocator.fill(settingValue[i].alias);
  
      const staticValueInputLocator = settingFieldLocator.locator("input[placeholder = 'Static value']").nth(i);
      await expect(staticValueInputLocator).toBeVisible();
      await staticValueInputLocator.fill(settingValue[i].staticValue);
    }
  }

  async applyFieldSettingViaDocumentMapper(settingAlias: string, settingValue: any) {
    const settingFieldLocator = this.page.locator('umb-property[alias="' + settingAlias + '"]');
    await expect(settingFieldLocator).toBeVisible();
  
    const selectLocator = settingFieldLocator.locator("forms-document-mapper-property-editor select");
    await selectLocator.selectOption({ value : settingValue.doctype });
  
    const inputLocator = settingFieldLocator.locator('forms-document-mapper-property-editor  input[type = "text"]');
    await expect(inputLocator.first()).toBeVisible();
    const inputLocatorCount = await inputLocator.count();
    for (let i = 0; i < inputLocatorCount; i++) {
      await expect(inputLocator.nth(i)).toBeVisible();
      await inputLocator.nth(i).fill(settingValue.nameStaticValue);
    }
  }

  async applyFieldSettingViaEmailTemplatePicker(settingAlias: string, settingValue: string) {
    const settingFieldLocator = this.page.locator('umb-property[alias="' + settingAlias + '"]');
    await expect(settingFieldLocator).toBeVisible();
  
    const buttonLocator = settingFieldLocator.locator("#caret-button");
    await buttonLocator.click();
  
    const templateLocator = this.page.locator("#label-button", {hasText: settingValue});
    await expect(templateLocator).toBeVisible();
    await templateLocator.click();
  }

  async applyFieldSettingViaStandardFieldMappingInput(settingAlias: string, settingValue: Array<any>) {
    const settingFieldLocator = this.page.locator('umb-property[alias="' + settingAlias + '"]');
    await expect(settingFieldLocator).toBeVisible();
  
    for (let i = 0; i < settingValue.length; i++) {
      if (settingValue[i].include) {
        const includeButtonLocator = settingFieldLocator.locator('div[data-umb-standard-field-mapping-include="' + settingValue[i].alias + '"] #slider');
        await includeButtonLocator.click();
      }
  
      const keyNameButtonLocator = settingFieldLocator.locator('div[data-umb-standard-field-mapping-key-name="' + settingValue[i].alias + '"] input[type="text"]');
      await keyNameButtonLocator.fill(settingValue[0].keyName);
    }
  }

  async setFieldMandatory(message: string) {
    const settingFieldLocator = this.page.locator('umb-property-layout[alias="mandatory"]');
    await settingFieldLocator.locator("#slider").click();
    await this.page.waitForTimeout(1000);
    const inputLocator = settingFieldLocator.locator('input[type="text"]');
    await expect(inputLocator).toBeVisible();
    await inputLocator.fill(message);
  }
  
  async setFieldValidation(label: string, message: string) {
    const settingFieldLocator = this.page.locator('umb-property-layout[alias="regex"]');
    const selectLocator = settingFieldLocator.locator("select");
    await selectLocator.selectOption({ label: label });
    await this.page.waitForTimeout(1000);
    const inputLocator = settingFieldLocator.locator("input");
    await expect(inputLocator).toBeVisible();
    await inputLocator.fill(message);
  }

  async clickFormWorkflowConfigureButton(){
    await this.formWorkflowConfigureButton.click();
  }

  async clickFormWorkflowEditSubmitButton() {
    await this.formEditWorkflowModal.locator(this.formSubmitButtonModal).click();
  }

  async clickFormWorkflowConfigureSubmitButton() {
    await this.formConfigureWorkflowModal.locator(this.formSubmitButtonModal).click();
  }

  async clickFormWorkflowAddButton(){
    await this.formWorkflowOnSubmitStage.locator(this.formWorkflowAddButtonModal).click({force: true});
  }

  async selectWorkflowType(workflowType: string){
    this.page.locator('umb-ref-item[title="'+workflowType+'"]').click();
  }

  async fillWorkflowName(workflowName: string) {
    const nameInput = this.page.locator('umb-property-layout[alias="name"] input[type=text]');
    await expect(nameInput).toBeVisible();
    await nameInput.fill(workflowName);
  }
}