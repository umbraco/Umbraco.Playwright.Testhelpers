import {ApiHelpers} from "./ApiHelpers";
import {JsonHelper} from "./JsonHelper";
import {ContentBuilder, DocumentTypeBuilder, WebhookBuilder} from "@umbraco/json-models-builders";
import {AliasHelper} from "./AliasHelper";
import {ConstantHelper} from "./ConstantHelper";

export class WebhookApiHelper {
    api: ApiHelpers

    constructor(api: ApiHelpers) {
        this.api = api;
    }

    async get(key: string) {
        if (key == null) {
            return;
        }
        const response = await this.api.get(this.api.baseUrl + '/umbraco/backoffice/umbracoapi/webhook/GetByKey?key=' + key);
        return await JsonHelper.getBody(response);
    }

    async save(webhook: object) {
        if (webhook == null) {
            return;
        }
        const response = await this.api.post(this.api.baseUrl + '/umbraco/backoffice/umbracoapi/webhook/Create', webhook);
        return await JsonHelper.getBody(response);
    }

    async ensureNotExists(key: string) {
        if (key == null) {
            return;
        }
        return await this.api.delete(this.api.baseUrl + '/umbraco/backoffice/umbracoapi/webhook/Delete?key=' + key);
    }

    async doesExist(key: string) {
        if (key == null) {
            return;
        }
        const response = await this.api.get(this.api.baseUrl + '/umbraco/backoffice/umbracoapi/webhook/GetByKey?key=' + key);
        return response.status() === 200;
    }

    async createDefaultWebhookWithDocumentType(webhookUrl: string, documentName: string) {
        const documentAlias = AliasHelper.toAlias(documentName);

        const documentType = new DocumentTypeBuilder()
            .withName(documentName)
            .withAlias(documentAlias)
            .withAllowAsRoot(true)
            .build();
        const document = await this.api.documentTypes.save(documentType);

        const webhook = new WebhookBuilder()
            .withUrl(webhookUrl)
            .addEvent()
                .withEventName('Content was published')
            .done()
            .addContentTypeKey(document.key)
            .addHeader()
                .withType('Accept')
                .withValue('application/json')
            .done()
            .build();
        const webhookData = await this.api.webhook.save(webhook);
        
        return [webhookData, document];
    }

    async createDefaultWebhookContentEvent(webhookUrl: string) {
        const webhook = new WebhookBuilder()
            .withUrl(webhookUrl)
            .addEvent()
                .withEventName('Content was published')
            .done()
            .build();
        return await this.api.webhook.save(webhook);
    }

    async createDefaultWebhookMediaEvent(webhookUrl: string) {
        const webhook = new WebhookBuilder()
            .withUrl(webhookUrl)
            .addEvent()
                .withEventName('Media was saved')
            .done()
            .build();
        return await this.api.webhook.save(webhook);
    }
    
    async createDefaultWebhookWithDocumentTypeAndContent(webhookUrl: string, documentName: string, contentName: string) {
        let [_, document] = await this.api.webhook.createDefaultWebhookWithDocumentType(webhookUrl, documentName);
        
        const contentNode = new ContentBuilder()
            .withContentTypeAlias(document.alias)
            .withAction(ConstantHelper.actions.save)
            .addVariant()
                .withName(contentName)
                .withSave(true)
            .done()
            .build();
        return await this.api.content.save(contentNode);
    }
}