import {UiBaseLocators} from "./UiBaseLocators";
import {Locator, Page} from "@playwright/test";

export class DocumentTypeUiHelper extends UiBaseLocators {
  private readonly newDocumentTypeBtn: Locator;
  private readonly documentNameTxt: Locator;
  private readonly addGroupBtn: Locator;
  
  constructor(page: Page) {
    super(page);
    
    this.newDocumentTypeBtn = page.getByLabel('New Document Type...');
    this.documentNameTxt = page.getByLabel('name', {exact: true});
    this.addGroupBtn = page.getByLabel('Add group', {exact: true});
  }

  async clickActionsMenuForDocumentType(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForDocumentType("Document Types");
  }

  async clickRootFolderCaretButton() {
    await this.clickCaretButtonForName("Document Types");
  }
  
  async clickNewDocumentTypeButton() {
    await this.newDocumentTypeBtn.click();
  }
  
  async goToDocumentType(documentTypeName: string) {
    await this.clickRootFolderCaretButton();
    await this.page.getByLabel(documentTypeName).click();
  }
  
  async enterDocumentTypeName(documentTypeName: string) {
    await this.documentNameTxt.fill(documentTypeName);
  }
  
  async addPropertyEditor(propertyEditorName: string) {
    await this.page.getByLabel('Add property', { exact: true }).click({force: true});
    await this.page.getByLabel('Select Property Editor').click();
    await this.page.getByLabel('Type to filter icons').fill(propertyEditorName);
    await this.page.getByText(propertyEditorName).click();
    await this.page.waitForTimeout(200);
    await this.page.getByRole('textbox', { name: 'Enter a name...' }).fill(propertyEditorName);
    await this.clickAddButton();
  }
  
  async updatePropertyEditor(propertyEditorName: string){
    await this.page.getByLabel('Editor settings').click();
    await this.page.getByLabel('Change').click();
    await this.page.getByLabel('Type to filter icons').fill(propertyEditorName);
    await this.page.waitForTimeout(200);
    await this.page.getByRole('textbox', { name: 'Enter a name...' }).fill(propertyEditorName);
    await this.page.getByLabel('Update').click();

  }
  
  async clickAddGroupButton() {
    await this.addGroupBtn.click();
  }
  
  async enterGroupName(groupName: string) {
    await this.page.waitForTimeout(200);
    await this.page.getByLabel('Group', { exact: true }).fill(groupName);
  }
}