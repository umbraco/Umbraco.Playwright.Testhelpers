import {ApiHelpers} from "./ApiHelpers";

export class StylesheetApiHelper {
    api: ApiHelpers

    constructor(api: ApiHelpers) {
        this.api = api;
    }

    async get(path: string) {
        const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet?path=' + path);
        const json = await response.json();

        if (json !== null) {
            return json;
        }
        return null;
    }

    async doesExists(path: string) {
        const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet?path=' + path);
        return response.status() === 200;
    }

    async create(name: string, content: string, parentPath: string = "") {
        const stylesheetData = {
            "name": name,
            "content": content,
            "parentPath": parentPath
        };
        const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet', stylesheetData);
        // Returns the path of the created stylesheet
        return response.headers().location.split("=").pop();
    }

    async update(stylesheet) {
        const stylesheetData = {
            "name": stylesheet.name,
            "content": stylesheet.content,
            "existingPath": stylesheet.path
        };
        return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet', stylesheetData);
    }

    async delete(path: string) {
        return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet?path=' + path);
    }

    async getChildren(path: string) {
        const response = await this.api.get(`${this.api.baseUrl}/umbraco/management/api/v1/tree/stylesheet/children?path=${path}&skip=0&take=10000`);
        const items = await response.json();
        return items.items;
    }

    async doesNameExists(name: string) {
        return await this.getByName(name);
    }

    async getAllAtRoot() {
        return await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/stylesheet/root?skip=0&take=10000');
    }

    async getByName(name: string) {
        const rootScripts = await this.getAllAtRoot();
        const jsonScripts = await rootScripts.json();

        for (const script of jsonScripts.items) {
            if (script.name === name) {
                if (script.isFolder) {
                    return this.getFolder(script.path);
                } else {
                    return this.get(script.path);
                }
            } else if (script.isFolder && script.hasChildren) {
                const result = await this.recurseChildren(name, script.path, false);
                if (result) {
                    return result;
                }
            }
        }
        return false;
    }

    async ensureNameNotExists(name: string) {
        const rootStylesheet = await this.getAllAtRoot();
        const jsonStylesheet = await rootStylesheet.json();

        for (const stylesheet of jsonStylesheet.items) {
        if (stylesheet.name === name) {
            if (stylesheet.isFolder) {
                return await this.recurseDeleteChildren(stylesheet);
            }
            return await this.delete(stylesheet.path);
        } else if (stylesheet.hasChildren) {
            await this.recurseChildren(name, stylesheet.path, true);

        }
        }
        return null;
    }

    private async recurseChildren(name: string, path: string, toDelete: boolean) {
        const items = await this.getChildren(path);

        for (const child of items) {
            if (child.name === name) {
                if (!toDelete) {
                    if (child.isFolder) {
                        return await this.getFolder(child.path);
                    }
                    return await this.get(child.path);
                }
                if (child.isFolder) {
                    return await this.recurseDeleteChildren(child);
                }
                return await this.delete(child.path);

            } else if (child.hasChildren) {
                return await this.recurseChildren(name, child.path, toDelete);
            }
        }
        return false;
    }

    private async recurseDeleteChildren(scriptFolder) {
        if (!scriptFolder.hasChildren) {
            return await this.deleteFolder(scriptFolder.path);
        }
        const items = await this.getChildren(scriptFolder.path);

        for (const child of items) {
            if (child.hasChildren) {
                await this.recurseDeleteChildren(child);
            } else if (child.isFolder) {
                await this.deleteFolder(child.path);
            } else {
                await this.delete(child.path);
            }
        }
        return await this.deleteFolder(scriptFolder.path);
    }


    // Folder
    async getFolder(path: string) {
        const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet/folder?path=' + path);
        const json = await response.json();

        if (json !== null) {
        return json;
        }
        return null;
    }

    async doesFolderExists(path: string) {
        const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet/folder?path=' + path);
        return response.status() === 200;
    }

    async createFolder(name: string, parentPath = "") {
        const stylesheetFolderData =
        {
            "name": name,
            "parentPath": parentPath
        };
        const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet/folder', stylesheetFolderData);
        // Returns the id of the created stylesheetFolder
        const json = await response.json();
        return json.path;
    }

    async deleteFolder(path: string) {
        return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet/folder?path=' + path);
    }

    async doesRuleNameExists(path: string, name : string) {
        const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/stylesheet/rich-text/rules?path=' + path);
        const rulesJson = await response.json();

        for (const rule of rulesJson.rules) {
            if (rule.name === name) {
                return true;
            }
        }
        return false;   
    }
}