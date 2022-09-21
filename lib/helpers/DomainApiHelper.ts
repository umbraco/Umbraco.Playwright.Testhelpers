﻿import {ApiHelpers} from "./ApiHelpers";
import {JsonHelper} from "./JsonHelper";
import {DomainBuilder} from "@umbraco/playwright-models";

export class DomainApiHelper {
    api: ApiHelpers

    constructor(api: ApiHelpers) {
        this.api = api;
    }

    async save(domain) {
        if(domain == null){
            return;
        }
        const response = await this.api.post(this.api.baseUrl + "/umbraco/backoffice/umbracoapi/content/PostSaveLanguageAndDomains", domain);
        return await JsonHelper.getBody(response);
    };
    
    async createDomain(contentId, langId)
    {
        const danishDomain = new DomainBuilder()
            .withNodeId(contentId)
            .addDomain()
            .withName("/")
            .withLang(langId)
            .done()
            .build()
        await this.save(danishDomain);
    }
}