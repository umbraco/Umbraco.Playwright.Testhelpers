import {Page, Locator, expect} from "@playwright/test"
import {UiBaseLocators} from "./UiBaseLocators";

export class StylesheetUiHelper extends UiBaseLocators{
  private readonly newStylesheetBtn: Locator;
  private readonly stylesheetNameTxt: Locator;
  private readonly addRTEBtn: Locator;
  private readonly styleNameTxt: Locator;
  private readonly styleSelectorTxt: Locator;
  private readonly styleStylesTxt: Locator;
  private readonly newRichTextEditorStylesheetBtn: Locator;
  private readonly stylesheetTree: Locator;

  constructor(page: Page) {
    super(page);
    this.stylesheetNameTxt = page.getByLabel('stylesheet name');
    this.addRTEBtn = page.getByLabel('Add rule');
    this.styleNameTxt = page.getByLabel('Rule name');
    this.styleSelectorTxt = page.getByLabel('Rule selector');
    this.styleStylesTxt = page.getByLabel('Rule styles');
    this.newStylesheetBtn = page.getByLabel('New Stylesheet');
    this.newRichTextEditorStylesheetBtn = page.getByLabel('New Rich Text Editor Stylesheet');
    this.stylesheetTree = page.locator('umb-tree[alias="Umb.Tree.Stylesheet"]');
  }

  async clickActionsMenuForStylesheet(name: string) {
    await this.clickActionsMenuForName(name);
  }

  async clickActionsMenuAtRoot() {
    await this.clickActionsMenuForStylesheet('Stylesheets');
  }

  async clickRootFolderCaretButton() {
    await this.clickCaretButtonForName('Stylesheets');
  }

  async clickNewStylesheetButton() {
    await this.newStylesheetBtn.click();
  }
  
  async clickNewRichTextEditorStylesheetButton() {
    await this.newRichTextEditorStylesheetBtn.click();
  }

  async enterStylesheetName(stylesheetName: string) {
    await expect(this.stylesheetNameTxt).toBeVisible();
    await this.stylesheetNameTxt.clear();
    await this.stylesheetNameTxt.fill(stylesheetName);
  }
  
  async enterStylesheetContent(stylesheetContent: string) {
    await this.textAreaInputArea.clear();
    await this.textAreaInputArea.fill(stylesheetContent);
  }

  async addRTEStyle(styleName: string, styleSelector: string, styleStyles: string) {
    await this.addRTEBtn.click();
    await this.fillRTEStyleForm(styleName, styleSelector, styleStyles);
  }

  async openStylesheetByNameAtRoot(stylesheetName: string) {
    await this.clickRootFolderCaretButton();
    await this.page.getByLabel(stylesheetName).click();
  }

  async editRTEStyle(styleName: string, newStyleName: string, newStyleSelector: string, newStyleStyles: string) {
    await this.page.locator('umb-stylesheet-rule-ref[name="' + styleName + '"] [label="Edit ' + styleName + '"]').click();
    await this.fillRTEStyleForm(newStyleName, newStyleSelector, newStyleStyles);
  }

  async fillRTEStyleForm(styleName: string, styleSelector: string, styleStyles: string) {
    await expect(this.styleNameTxt).toBeVisible();
    await this.styleNameTxt.clear();
    await this.styleNameTxt.fill(styleName);
    await this.styleSelectorTxt.clear();
    await this.styleSelectorTxt.fill(styleSelector);
    await this.styleStylesTxt.clear();
    await this.styleStylesTxt.fill(styleStyles);
    await this.clickSubmitButton();
  }

  async removeRTEStyle(styleName: string) {
    await this.page.locator('umb-stylesheet-rule-ref[name="' + styleName + '"] [label="Remove ' + styleName + '"]').click();
  }

  async isStylesheetTreeItemVisibile(stylesheetName: string, isVisible: boolean = true){
    return expect(this.stylesheetTree.getByText(stylesheetName)).toBeVisible({visible: isVisible});
  }
}