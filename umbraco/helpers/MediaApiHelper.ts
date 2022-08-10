import {ApiHelpers} from "./ApiHelpers";
import {JsonHelper} from "./JsonHelper";
import fetch from 'node-fetch';
import FormData from "form-data";
import https from "https";

export class MediaApiHelper {
    api: ApiHelpers

    constructor(api: ApiHelpers) {
        this.api = api;
    }

    //Does not check the bin
    async ensureNameNotExists(name: string) {
        const response = await this.api.get(this.api.baseUrl + '/umbraco/backoffice/UmbracoTrees/MediaTree/GetNodes?id=-1');
        const searchBody = await JsonHelper.getBody(response);

        let mediaNameId = null;

        for (const sb of searchBody) {
            if (sb.name == name) {
                mediaNameId = sb.id;
            }
        }

        if (mediaNameId !== null) {
            await this.api.post(this.api.baseUrl + '/umbraco/backoffice/umbracoApi/media/DeleteById?id=' + mediaNameId);

            //Clears the RecycleBin
            await this.api.post(this.api.baseUrl + '/umbraco/backoffice/umbracoApi/media/EmptyRecycleBin');
        }
    }

    async ensureRecycleBinEmpty() {
        await this.api.post(this.api.baseUrl + '/umbraco/backoffice/umbracoApi/media/EmptyRecycleBin');
    }

    async save(media, file) {
        const url = this.api.baseUrl + "/umbraco/backoffice/umbracoApi/media/PostSave";
        const formData = new FormData();
        formData.append('contentItem', JSON.stringify(media));

        if (file != null) {
            formData.append('file_umbracoFile__', file);
        }

        const context = this.api.page.context();
        const cookies = await context.cookies();
        let cookieHeader = "";
        for (const cook of cookies) {
            cookieHeader += cook.name + "=" + cook.value + ";";
        }

        const httpsAgent = new https.Agent({
            rejectUnauthorized: false
        });

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                'X-UMB-XSRF-TOKEN': await this.api.getCsrfToken(),
                'Cookie': cookieHeader
            },
            agent: httpsAgent
        });

        let json = await response.text();
        return JsonHelper.parseString(json);
    };

    async saveFile(mediaItem, mediaFile) {
        const url = this.api.baseUrl + "/umbraco/backoffice/umbracoApi/media/PostSave";
        const context = this.api.page.context();
        const cookies = await context.cookies();
        let cookieHeader = "";
        for (const cook of cookies) {
            cookieHeader += cook.name + "=" + cook.value + ";";
        }
        const response = await this.api.page.request.post(url, {
            ignoreHTTPSErrors: true,
            headers: {
                Accept: "*/*",
                ContentType: "multipart/form-data",
                'X-UMB-XSRF-TOKEN': await this.api.getCsrfToken(),
                Cookie: cookieHeader,
            },
            multipart: {
                file_umbracoFile__: {
                    name: mediaFile.name,
                    mimeType: mediaFile.mimeType,
                    buffer: mediaFile.buffer,
                },
                contentItem: JSON.stringify(mediaItem),
            },
        });

        let json = await response.text();
        console.log(json);
        return JsonHelper.parseString(json);

    };
}
