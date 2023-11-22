import {Page, Locator} from "@playwright/test"

export class StylesheetUiHelper {

    private readonly page: Page;
    private readonly newStylesheetFileBtn: Locator;
    private readonly newRTEStylesheetFileBtn: Locator;
    private readonly createFolderBtn: Locator;
    private readonly saveBtn: Locator;
    private readonly submitBtn: Locator;
    private readonly stylesheetNameTxt: Locator;
    private readonly addRuleBtn: Locator;
    private readonly ruleNameTxt: Locator;
    private readonly ruleSelectorTxt: Locator;
    private readonly ruleStylesTxt: Locator;
    private readonly folderNameTxt: Locator;
    private readonly caretBtn: Locator;
    private readonly deleteBtn: Locator;
    private readonly confirmToDeleteBtn: Locator;
    private readonly removeFolderBtn: Locator;
    private readonly confirmCreateFolderBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.newStylesheetFileBtn = page.getByLabel('New stylesheet file');
        this.newRTEStylesheetFileBtn = page.getByLabel('New Rich Text Editor style sheet file');
        this.createFolderBtn = page.getByLabel('Create folder');
        this.saveBtn = page.getByLabel('Save');
        this.submitBtn = page.getByLabel('Submit');
        this.stylesheetNameTxt = page.getByLabel('stylesheet name');
        this.addRuleBtn = page.getByLabel('Add rule');
        this.ruleNameTxt = page.getByLabel('Rule name');
        this.ruleSelectorTxt = page.getByLabel('Rule selector');
        this.ruleStylesTxt = page.getByLabel('Rule styles');
        this.folderNameTxt = page.getByRole('textbox', { name: 'Enter folder name...' });
        this.caretBtn = page.locator('umb-tree-item').filter({ hasText: 'Stylesheets' }).locator('#caret-button');
        this.deleteBtn = page.getByRole('button', { name: 'Delete' });
        this.confirmToDeleteBtn = page.locator('#confirm').getByLabel('Delete');
        this.removeFolderBtn = page.getByLabel('Remove folder');
        this.confirmCreateFolderBtn = page.locator('#confirm').getByLabel('Create folder');
    }

    async openActionsMenuForName(name : string) {
        await this.page.locator('umb-tree-item').locator('[label="' + name + '"] >> [label="Open actions menu"]').click();
    }

    async clickRootFolderCaretButton() {
        await this.caretBtn.click();
    }

    async clickCaretButtonForName(name: string) {
        await this.page.locator('umb-tree-item >> [label="' + name + '"]').locator('#caret-button').click();
    }

    async clickNewStylesheetFileButton() {
        await this.newStylesheetFileBtn.click();
    }

    async clickNewRTEStylesheetFileButton() {
        await this.newRTEStylesheetFileBtn.click();
    }

    async clickSaveButton() {
        await this.saveBtn.click();
    }

    async createNewFolder(folderName : string) {
        await this.createFolderBtn.click();
        await this.folderNameTxt.fill(folderName);
        await this.confirmCreateFolderBtn.click();
    }

    async enterStylesheetName(stylesheetName : string) {
        await this.stylesheetNameTxt.clear();
        await this.stylesheetNameTxt.fill(stylesheetName);
    }

    async addNewRule(ruleName : string, ruleSelector: string, ruleStyles: string) {
        await this.addRuleBtn.click();
        await this.ruleNameTxt.clear();
        await this.ruleNameTxt.fill(ruleName);
        await this.ruleNameTxt.clear();
        await this.ruleSelectorTxt.fill(ruleSelector);
        await this.ruleSelectorTxt.clear();
        await this.ruleStylesTxt.fill(ruleStyles);
        await this.ruleStylesTxt.click();
        await this.submitBtn.click();
    }

    async openStylesheetFileByNameAtRoot(stylesheetFileName : string) {
        await this.caretBtn.click();
        await this.page.getByLabel(stylesheetFileName).click();
    }

    async deleteStylesheetFile() {
        await this.deleteBtn.click();
        await this.confirmToDeleteBtn.click();
    }

    async removeFolder() {
        await this.removeFolderBtn.click();
        await this.confirmToDeleteBtn.click();
    }
}