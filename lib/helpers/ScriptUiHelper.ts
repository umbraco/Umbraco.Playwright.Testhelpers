import {Page, Locator} from "@playwright/test"

export class ScriptUiHelper {
    private readonly page: Page;

    private readonly newEmptyScriptBtn: Locator;
    private readonly insertScriptName: Locator;
    private readonly saveBtn: Locator;
    private readonly deleteFolderBtn: Locator;
    private readonly caretBtn: Locator;
    private readonly scriptTextArea: Locator;
    private readonly deleteBtn: Locator;
    private readonly confirmToDeleteBtn: Locator;
    private readonly insertFolderName: Locator;
    private readonly createFolderBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.newEmptyScriptBtn = page.getByLabel('New empty script');
        this.insertScriptName = page.getByLabel('template name');
        this.saveBtn = page.getByLabel('Save');
        this.caretBtn = page.locator('div').filter({hasText: 'Scripts'}).locator('#caret-button');
        this.scriptTextArea = page.locator('textarea.inputarea')
        this.deleteBtn = page.getByRole('button', {name: 'Delete'});
        this.confirmToDeleteBtn = page.locator('#confirm').getByLabel('Delete');
        this.createFolderBtn = page.getByLabel('Create folder...',{exact: true});
        this.insertFolderName = page.locator('[headline="Create Folder"] >> input');
        this.deleteFolderBtn = page.getByLabel('Delete');
    }


    async openActionsMenuForName(name: string) {
        await this.page.locator('[label="' + name + '"] >> [label="Open actions menu"]').click({force: true});
    }

    async openActionsMenuAtRoot() {
        await this.openActionsMenuForName("Scripts");
    }

    async clickRootFolderCaretButton() {
        await this.caretBtn.click();
    }

    async clickCaretButtonForName(name: string) {
        await this.page.locator('umb-tree-item >> [label="' + name + '"]').locator('#caret-button').click();
    }

    async clickNewScriptButton() {
        await this.newEmptyScriptBtn.click();
    }

    async clickSaveButton() {
        await this.saveBtn.click();
    }

    // async clickBreadcrumbButton() {
    //     await this.breadcrumbButton.click();
    // }

    async createNewFolder(folderName: string) {
        await this.createFolderBtn.click({});
        await this.insertFolderName.fill(folderName);
        await this.createFolderBtn.click({force: true});
    }

    async enterScriptName(scriptContent: string) {
        await this.insertScriptName.fill(scriptContent);
    }

    async enterScriptContent(scriptContent: string) {
        await this.scriptTextArea.clear();
        await this.scriptTextArea.fill(scriptContent);
    }

    async openScriptFileAtRoot(scriptFileName: string) {
        await this.caretBtn.click();
        await this.page.getByLabel(scriptFileName).click({force:true});
    }

    async deleteScriptFile() {
        await this.deleteBtn.click();
        await this.confirmToDeleteBtn.click();
    }

    async deleteFolder() {
        await this.deleteFolderBtn.click();
        await this.confirmToDeleteBtn.click();
    }
}