import {ApiHelpers} from "./ApiHelpers";
import {JsonHelper} from "./JsonHelper";
import fetch from 'node-fetch';
import {MediaBuilder, MediaFileBuilder} from "@umbraco/json-models-builders";

const https = require('https');
const FormData = require('form-data');

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

            await this.clearRecycleBin();
        }
    }

    async save(media) {
        const url = this.api.baseUrl + "/umbraco/backoffice/umbracoApi/media/PostSave";
        const formData = new FormData();
        formData.append('contentItem', JSON.stringify(media));

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
        return JsonHelper.parseString(json);
    };
    
    //Article
    async createDefaultArticle(name) {
        await this.api.media.ensureNameNotExists(name);
        const mediaItem = new MediaBuilder()
            .withName(name)
            .withContentTypeAlias('umbracoMediaArticle')
            .build()
        await this.api.media.save(mediaItem);
        return mediaItem;
    }

    async createArticleWithFile(name, fileName, path, mimeType) {
        await this.api.media.ensureNameNotExists(name);
        const mediaItem = new MediaBuilder()
            .withName(name)
            .withContentTypeAlias('umbracoMediaArticle')
            .build()

        const mediaFile = new MediaFileBuilder()
            .withName(fileName)
            .withPath(path)
            .withMimeType(mimeType)
        await this.api.media.saveFile(mediaItem, mediaFile)
    }

    //Audio
    async createDefaultAudio(name) {
        await this.api.media.ensureNameNotExists(name);
        const mediaItem = new MediaBuilder()
            .withName(name)
            .withContentTypeAlias('umbracoMediaAudio')
            .build()
        await this.api.media.save(mediaItem);
        return mediaItem;
    }

    async createAudioWithFile(name, fileName, path, mimeType) {
        await this.api.media.ensureNameNotExists(name);
        const mediaItem = new MediaBuilder()
            .withName(name)
            .withContentTypeAlias('umbracoMediaAudio')
            .build()

        const mediaFile = new MediaFileBuilder()
            .withName(fileName)
            .withPath(path)
            .withMimeType(mimeType)
        await this.api.media.saveFile(mediaItem, mediaFile)
    }

    //File
    async createDefaultFile(name) {
        await this.api.media.ensureNameNotExists(name);
        const mediaItem = new MediaBuilder()
            .withName(name)
            .withContentTypeAlias('File')
            .build()
        await this.api.media.save(mediaItem);
        return mediaItem;
    }

    async createFileWithFile(name, fileName, path, mimeType) {
        await this.api.media.ensureNameNotExists(name);
        const mediaItem = new MediaBuilder()
            .withName(name)
            .withContentTypeAlias('File')
            .build()

        const mediaFile = new MediaFileBuilder()
            .withName(fileName)
            .withPath(path)
            .withMimeType(mimeType)
        await this.api.media.saveFile(mediaItem, mediaFile)
    }

    //Folder
    async createDefaultFolder(name) {
        await this.api.media.ensureNameNotExists(name);
        const mediaItem = new MediaBuilder()
            .withName(name)
            .withContentTypeAlias('Folder')
            .build()
        await this.api.media.save(mediaItem);
        return mediaItem;
    }

    //Image
    async createDefaultImage(name) {
        await this.api.media.ensureNameNotExists(name);
        const mediaItem = new MediaBuilder()
            .withName(name)
            .withContentTypeAlias('Image')
            .build()
        await this.api.media.save(mediaItem);
        return mediaItem;
    }

    async createImageWithFile(name, umbracoFileValue, fileName, path, mimeType) {
        await this.api.media.ensureNameNotExists(name);
        const mediaItem = new MediaBuilder()
            .withName(name)
            .withContentTypeAlias('Image')
            .addProperty()
            .withAlias('umbracoFile')
            .withValue(umbracoFileValue)
            .done()
            .build()

        const mediaFile = new MediaFileBuilder()
            .withName(fileName)
            .withPath(path)
            .withMimeType(mimeType)
        await this.api.media.saveFile(mediaItem, mediaFile)
    }

    //VectorGraphics
    async createDefaultVectorGraphics(name) {
        await this.api.media.ensureNameNotExists(name);
        const mediaItem = new MediaBuilder()
            .withName(name)
            .withContentTypeAlias('umbracoMediaVectorGraphics')
            .build()
        await this.api.media.save(mediaItem);
        return mediaItem;
    }

    async createVectorGraphicsWithFile(name, fileName, path, mimeType) {
        await this.api.media.ensureNameNotExists(name);
        const mediaItem = new MediaBuilder()
            .withName(name)
            .withContentTypeAlias('umbracoMediaVectorGraphics')
            .build()

        const mediaFile = new MediaFileBuilder()
            .withName(fileName)
            .withPath(path)
            .withMimeType(mimeType)
        await this.api.media.saveFile(mediaItem, mediaFile)
    }

    //Video
    async createDefaultVideo(name) {
        await this.api.media.ensureNameNotExists(name);
        const mediaItem = new MediaBuilder()
            .withName(name)
            .withContentTypeAlias('umbracoMediaVideo')
            .build()
        await this.api.media.save(mediaItem);
        return mediaItem;
    }

    async createVideoWithFile(name, fileName, path, mimeType) {
        await this.api.media.ensureNameNotExists(name);
        const mediaItem = new MediaBuilder()
            .withName(name)
            .withContentTypeAlias('umbracoMediaVideo')
            .build()

        const mediaFile = new MediaFileBuilder()
            .withName(fileName)
            .withPath(path)
            .withMimeType(mimeType)
        await this.api.media.saveFile(mediaItem, mediaFile)
    }

    async createAllFileTypes(articleName, audioName, fileName, folderName, imageName, vectorGraphicsName, videoName) {
        await this.api.media.createDefaultArticle(articleName);
        await this.api.media.createDefaultAudio(audioName);
        await this.api.media.createDefaultFile(fileName);
        await this.api.media.createDefaultFolder(folderName);
        await this.api.media.createDefaultImage(imageName);
        await this.api.media.createDefaultVectorGraphics(vectorGraphicsName);
        await this.api.media.createDefaultVideo(videoName);
    }

    async deleteAllFiles(articleName, audioName, fileName, folderName, imageName, vectorGraphicsName, videoName) {
        await this.api.media.ensureNameNotExists(articleName);
        await this.api.media.ensureNameNotExists(audioName);
        await this.api.media.ensureNameNotExists(fileName);
        await this.api.media.ensureNameNotExists(folderName);
        await this.api.media.ensureNameNotExists(imageName);
        await this.api.media.ensureNameNotExists(vectorGraphicsName);
        await this.api.media.ensureNameNotExists(videoName);
    }

    async deleteAllMedia() {
        const response = await this.api.get(this.api.baseUrl + `/umbraco/backoffice/UmbracoTrees/ApplicationTree/GetApplicationTrees?application=media&tree=&use=main`);
        const content = await JsonHelper.getBody(response);

        if (content !== null) {
            for (const child of content.children) {
                if (child.id > 0) {
                    await this.deleteById(child.id);
                }
            }
        }
    }

    async deleteById(id) {
        await this.api.post(this.api.baseUrl + `/umbraco/backoffice/UmbracoApi/Media/DeleteById?id=${id}`)
    }

    async clearRecycleBin(){
        await this.api.post(this.api.baseUrl + '/umbraco/backoffice/umbracoApi/media/EmptyRecycleBin');
    }
}
