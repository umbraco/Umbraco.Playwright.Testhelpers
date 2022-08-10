import {ApiHelpers, ConstantHelper, JsonHelper, test} from '../../umbraco/helpers';
import {expect, request} from "@playwright/test";
import {ContentBuilder, DocumentTypeBuilder} from "../../umbraco/builders";
import {MediaBuilder} from "../../umbraco/builders/media/mediaBuilder";
import {umbracoConfig} from "../../umbraco.config";
import {MediaApiHelper} from "../../umbraco/helpers/MediaApiHelper";
import {Blob} from 'node:buffer';
import * as fs from "fs";
import * as path from "path";
import {MediaFileBuilder} from "../../umbraco/builders/media/mediaFileBuilder";

test.describe('Media', () => {

    test.beforeEach(async ({page, umbracoApi, umbracoUi}) => {
        await umbracoApi.login();
        await umbracoUi.goToSection(ConstantHelper.sections.media);
    });

    //CREATE FILETYPES

    test.describe('Create FileTypes', () => {

        // test('Create Folder', async ({page, umbracoApi, umbracoUi}) => {
        //     const folderName = 'MediaFolder';
        //     //Ensures that there is not already an existing folder with the same name
        //     await umbracoApi.mediaNames.ensureNameNotExists(folderName);
        //
        //     //Action
        //     await page.locator('[element="tree-item-options"]', {hasText: "Media"}).click({force: true});
        //     await page.locator('[data-element="action-Folder"]').click();
        //     await page.locator('[data-element="editor-name-field"]').type(folderName);
        //     await umbracoUi.clickElement(umbracoUi.getButtonByLabelKey(ConstantHelper.buttons.save));
        //
        //     //Assert
        //     await umbracoUi.refreshMediaTree();
        //     await expect(page.locator(".umb-tree-item__inner", {hasText: folderName})).toBeVisible();
        //
        //     //Clean
        //     await umbracoApi.mediaNames.ensureNameNotExists(folderName);
        // });

        // test('Create image', async ({request, page, umbracoApi, umbracoUi}) => {
        //     const imageName = 'MediaImage';
        //     const umbracoFileValue = {"src": "Umbraco.jpg"};
        //     //Ensures that there is not already an existing image with the name
        //     await umbracoApi.mediaNames.ensureNameNotExists(imageName);
        //     const bufferImage = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAADcAAAAjCAYAAAAwnJLLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGpSURBVFhH7ZRNq0FRFIbPbzD3A/wKSUkZmCgzAyUpkhhRyMT8TIwlEylDI2WgJMyMmJAB+SqS5OvVXjY599ad3eyt/dRpnbXW7rSf1upo+GKUnKwoOVlRcrKi5GRFycmKkpMVJScrSk5WhJDr9/uIRqPYbDa8Aux2O2QyGVitVjidTrTbbd55cLvdUKlUUCgUcDqdeNXIR+XYBev1OtxuNzweD1ar1auu6zrK5TK9j8dj+P1+LJdL6jOazSZisRj2+z2v/OajcuxitVoNk8kEwWDQIMdqh8OBcjbFcDiM0WhE+Xw+RyKRoPgXQqwlk3qX+0m320UymcTxeKQnHo/D4XDA5XIhn89jvV7zk0aEl2MrydbvOaVerwefz4fZbIbr9YpqtYp0Oo3L5UL9d4SWY2KRSITik1arhWKxyDNgOp0ilUq9VvgdYeWYUCgUwnA45JUHg8EA2WwW5/OZ8kajgVwuJ+bk2F/RZrPBbDZTZPl2u4XX64XFYoHJZIKmaRQ7nQ5JlEol2O12Oh8IBLBYLPjXjAgxuf9CycmKkpMVJScrSk5WvlgOuANsVZDROrcwfgAAAABJRU5ErkJggg==", 'base64');
        //
        //     console.log(bufferImage);
        //
        //     // //Action
        //     // const response = await request.post(umbracoApi.baseUrl + "/umbraco/backoffice/umbracoapi/media/PostSave", {
        //     //     ignoreHTTPSErrors: true,
        //     //     headers: {
        //     //         accept: "*/*",
        //     //         ContentType: "multipart/form-data",
        //     //     },
        //     //     multipart: {
        //     //         file: {
        //     //             name: imageName,
        //     //             mimeType: "image/jpg",
        //     //             buffer: bufferImage,
        //     //         },
        //     //         title: "Please Work",
        //     //     },
        //     // });
        //     //Switched from JSON.parse to stringify, I would get a Unexpected token < in JSON at position 2. with parse
        //     // const body = await JsonHelper.getBody(response);
        //     //console.log(await response.text())
        //
        //     const mediaImage = new MediaBuilder()
        //         .withName(imageName)
        //         .withContentTypeAlias('Image')
        //         .addProperty()
        //         .withAlias('umbracoFile')
        //         .withValue(umbracoFileValue)
        //         .done()
        //         .build()
        //
        //     await umbracoApi.mediaNames.save(mediaImage, bufferImage);
        //     await umbracoUi.refreshMediaTree();
        //
        //     //Assert
        //     // await expect(page.locator(".umb-tree-item__inner", {hasText: imageName})).toBeVisible();
        //
        //     //Clean
        //     //  await umbracoApi.mediaNames.ensureNameNotExists(imageName);
        // });

        // test('Create image', async ({request, page, umbracoApi, umbracoUi}) => {
        //     const path = "./fixtures/mediaLibrary/Umbraco.png";
        //     const image = fs.readFileSync(path);
        //
        //     const context = page.context();
        //     const cookies = await context.cookies();
        //     let cookieHeader = "";
        //     for (const cook of cookies) {
        //         cookieHeader += cook.name + "=" + cook.value + ";";
        //     }
        //     //Action
        //     const imageName = "Umbraco.png"
        //     const umbracoFileValue = {"src": "Umbraco.png"};
        //     const mediaImage = new MediaBuilder()
        //         .withName(imageName)
        //         .withContentTypeAlias('Image')
        //         .addProperty()
        //         .withAlias('umbracoFile')
        //         .withValue(umbracoFileValue)
        //         .done()
        //         .build()
        //
        //     await request.post(umbracoApi.baseUrl + "/umbraco/backoffice/umbracoapi/media/PostSave", {
        //         ignoreHTTPSErrors: true,
        //         headers: {
        //             Accept: "*/*",
        //             ContentType: "multipart/form-data",
        //             'X-UMB-XSRF-TOKEN': await umbracoApi.getCsrfToken(),
        //             Cookie: cookieHeader,
        //         },
        //         multipart: {
        //             file_umbracoFile__: {
        //                 name: imageName,
        //                 mimeType: "image/png",
        //                 buffer: image,
        //             },
        //             contentItem: JSON.stringify(mediaImage),
        //         },
        //     });
        // });

        test('Create image with new mediaFileBuilder', async ({request, page, umbracoApi, umbracoUi}) => {
            const imageName = "Umbraco.png";
            const umbracoFileValue = {"src": "Umbraco.png"};
            //Action
            const mediaItem = new MediaBuilder()
                .withName(imageName)
                .withContentTypeAlias('Image')
                .addProperty()
                .withAlias('umbracoFile')
                .withValue(umbracoFileValue)
                .done()
                .build()

            const path = "./fixtures/mediaLibrary/Umbraco.png";
            const mimeType = "image/png";
            const mediaFile = new MediaFileBuilder()
                .withName(imageName)
                .withPath(path)
                .withMimeType(mimeType)
                .build()
            
            await umbracoApi.media.saveFile(mediaItem, mediaFile);
        });


        // test('Create article', async ({page, umbracoApi, umbracoUi}) => {
        //     const articleName = 'MediaArticle';
        //     await umbracoApi.mediaNames.ensureNameNotExists(articleName);
        //
        //     //Action
        //     const mediaArticle = new MediaBuilder()
        //         .withName(articleName)
        //         .withContentTypeAlias('umbracoMediaArticle')
        //         .build()
        //
        //     await umbracoApi.mediaNames.save(mediaArticle, null);
        //     await umbracoUi.refreshMediaTree();
        //
        //     //Assert
        //     await expect(page.locator(".umb-tree-item__inner", {hasText: articleName})).toBeVisible();
        //
        //     //Clean
        //     await umbracoApi.mediaNames.ensureNameNotExists(articleName);
        // });
        //
        // test('Create SVG', async ({page, umbracoApi, umbracoUi}) => {
        //     const SVGName = 'MediaSVG';
        //     await umbracoApi.mediaNames.ensureNameNotExists(SVGName);
        //
        //     //Action
        //     const mediaSVG = new MediaBuilder()
        //         .withName(SVGName)
        //         .withContentTypeAlias('umbracoMediaVectorGraphics')
        //         .build()
        //
        //     await umbracoApi.mediaNames.save(mediaSVG, null);
        //     await umbracoUi.refreshMediaTree();
        //     //Assert
        //     await expect(page.locator(".umb-tree-item__inner", {hasText: SVGName})).toBeVisible();
        //
        //     //Clean
        //     await umbracoApi.mediaNames.ensureNameNotExists(SVGName);
        // });
        //
        // test('Create audio', async ({page, umbracoApi, umbracoUi}) => {
        //     const audioName = 'MediaAudio';
        //     await umbracoApi.mediaNames.ensureNameNotExists(audioName);
        //
        //     //Action
        //     const mediaAudio = new MediaBuilder()
        //         .withName(audioName)
        //         .withContentTypeAlias('umbracoMediaAudio')
        //         .build()
        //     await umbracoApi.mediaNames.save(mediaAudio, null);
        //     await umbracoUi.refreshMediaTree();
        //
        //     //Assert
        //     await expect(page.locator(".umb-tree-item__inner", {hasText: audioName})).toBeVisible();
        //
        //     //Clean
        //     await umbracoApi.mediaNames.ensureNameNotExists(audioName);
        // });
        //
        // test('Create file', async ({page, umbracoApi, umbracoUi}) => {
        //     const fileName = 'MediaFile';
        //     await umbracoApi.mediaNames.ensureNameNotExists(fileName);
        //
        //     //Action
        //     const mediaFile = new MediaBuilder()
        //         .withName(fileName)
        //         .withContentTypeAlias('File')
        //         .build()
        //     await umbracoApi.mediaNames.save(mediaFile, null);
        //     await umbracoUi.refreshMediaTree();
        //
        //     //Assert
        //     await expect(page.locator(".umb-tree-item__inner", {hasText: fileName})).toBeVisible();
        //
        //     //Clean
        //     await umbracoApi.mediaNames.ensureNameNotExists(fileName);
        // });
        //
        // test('Create video', async ({page, umbracoApi, umbracoUi}) => {
        //     const videoName = 'MediaVideo';
        //     await umbracoApi.mediaNames.ensureNameNotExists(videoName);
        //
        //     //Action
        //     const mediaVideo = new MediaBuilder()
        //         .withName(videoName)
        //         .withContentTypeAlias('umbracoMediaVideo')
        //         .build()
        //     await umbracoApi.mediaNames.save(mediaVideo, null);
        //     await umbracoUi.refreshMediaTree();
        //
        //     //Assert
        //     await expect(page.locator(".umb-tree-item__inner", {hasText: videoName})).toBeVisible();
        //
        //     //Clean
        //     await umbracoApi.mediaNames.ensureNameNotExists(videoName);
        // });
    });
    //END OF FILETYPES

    // test('Create folder in a folder', async ({page, umbracoApi, umbracoUi}) => {
    //
    //     const parentFolderName = 'ParentFolder';
    //     const childFolderName = 'ChildFolder';
    //     //Ensures that there is not already an existing folder with the same name
    //     await umbracoApi.mediaNames.ensureNameNotExists(parentFolderName);
    //     await umbracoApi.mediaNames.ensureNameNotExists(childFolderName);
    //
    //     //Action
    //     //ParentFolder Creation
    //     const mediaFolder = new MediaBuilder()
    //         .withName(parentFolderName)
    //         .withContentTypeAlias('Folder')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaFolder, null);
    //     //ChildFolder Creation
    //     await umbracoUi.refreshMediaTree();
    //     await umbracoUi.clickElement(umbracoUi.getTreeItem('media', [parentFolderName]), {
    //         button: "right",
    //         force: true
    //     });
    //     await page.locator('[data-element="action-create"]').click();
    //     await page.locator('[data-element="action-Folder"]').click();
    //     await page.locator('[data-element="editor-name-field"]').type(childFolderName);
    //     await umbracoUi.clickElement(umbracoUi.getButtonByLabelKey(ConstantHelper.buttons.save));
    //
    //     //Assert
    //     await expect(page.locator('.alert-success')).toBeVisible();
    //
    //     //Clean
    //     await umbracoApi.mediaNames.ensureNameNotExists(parentFolderName);
    //     await umbracoApi.mediaNames.ensureNameNotExists(childFolderName);
    // });

    //Need to insert a picture, otherwise it wont let me save
    // test('Create image in a folder', async ({page, umbracoApi, umbracoUi}) => {
    //     const parentFolderName = 'ParentFolder';
    //     const childImageName = 'ChildImage';
    //
    //     const umbracoFileValue = {"src": "Umbraco.png,"};
    //
    //     await umbracoApi.mediaNames.ensureNameNotExists(parentFolderName);
    //     await umbracoApi.mediaNames.ensureNameNotExists(childImageName);
    //
    //     //Action
    //     //ParentFolder Creation
    //     const mediaFolder = new MediaBuilder()
    //         .withName(parentFolderName)
    //         .withContentTypeAlias('Folder')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaFolder, null);
    //
    //     //ChildImage Creation
    //     await umbracoUi.refreshMediaTree();
    //     await umbracoUi.clickElement(umbracoUi.getTreeItem('media', [parentFolderName]), {
    //         button: "right",
    //         force: true
    //     });
    //     await page.locator('[data-element="action-create"]').click();
    //     await page.locator('[data-element="action-Image"]').click();
    //     await page.locator('[data-element="editor-name-field"]').type(childImageName);
    //
    //     await umbracoUi.clickElement(umbracoUi.getButtonByLabelKey(ConstantHelper.buttons.save));
    //
    //     //Assert
    //     await expect(page.locator('.alert-success')).toBeVisible();
    //
    //     //Clean
    //     await umbracoApi.mediaNames.ensureNameNotExists(parentFolderName);
    //     await umbracoApi.mediaNames.ensureNameNotExists(childImageName);
    // });
    //

    // //Missing assert
    // test('Sort by Name', async ({page, umbracoApi, umbracoUi}) => {
    //     const mediaFolderNameA = 'A';
    //     const mediaFolderNameB = 'B';
    //     const mediaFolderNameC = 'C';
    //     await umbracoApi.mediaNames.ensureNameNotExists(mediaFolderNameA);
    //     await umbracoApi.mediaNames.ensureNameNotExists(mediaFolderNameB);
    //     await umbracoApi.mediaNames.ensureNameNotExists(mediaFolderNameC);
    //
    //     //Action
    //     const mediaFolderC = new MediaBuilder()
    //         .withName(mediaFolderNameC)
    //         .withContentTypeAlias('Folder')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaFolderC, null);
    //     const mediaFolderB = new MediaBuilder()
    //         .withName(mediaFolderNameB)
    //         .withContentTypeAlias('Folder')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaFolderB, null);
    //     const mediaFolderA = new MediaBuilder()
    //         .withName(mediaFolderNameA)
    //         .withContentTypeAlias('Folder')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaFolderA, null);
    //
    //     await umbracoUi.refreshMediaTree();
    //     await page.locator('[element="tree-item-options"]', {hasText: "Media"}).click({button: "right", force: true});
    //     await page.locator('[data-element="action-sort"]').click();
    //     await page.locator('.table-sortable >> [key="general_name"]').click();
    //
    //     //Assert
    //     // const items = await page.locator(".ui-sortable").locator("xpath=/*[1][name()=\"a\"]");
    //     // await expect(items[1]).toContainText("A");
    //    
    //     //Clean
    //     await umbracoApi.mediaNames.ensureNameNotExists(mediaFolderNameA);
    //     await umbracoApi.mediaNames.ensureNameNotExists(mediaFolderNameB);
    //     await umbracoApi.mediaNames.ensureNameNotExists(mediaFolderNameC);
    // });


    // test('Search after a specific folder', async ({page, umbracoApi, umbracoUi}) => {
    //     const mediaFolderSearchName = 'SearchMe';
    //     await umbracoApi.mediaNames.ensureNameNotExists(mediaFolderSearchName);
    //
    //     //Action
    //     const mediaFolderSearch = new MediaBuilder()
    //         .withName(mediaFolderSearchName)
    //         .withContentTypeAlias('Folder')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaFolderSearch, null);
    //
    //     await page.pause();
    //     await page.locator('[model="options.filter"]').click();
    //     await page.locator('[placeholder="Type to search..."]').type(mediaFolderSearchName);
    //     await page.pause();
    //
    //     //Assert
    //     //Assert
    //     await expect(page.locator(".umb-folder-grid__folder-description", {hasText: mediaFolderSearchName})).toBeVisible();
    //
    //     //Clean
    //     await umbracoApi.mediaNames.ensureNameNotExists(mediaFolderSearchName);
    // });
    //
    // test('Change grid to list', async ({page, umbracoApi, umbracoUi}) => {
    //     const mediaFolderOneName = 'FolderOne';
    //     const mediaFolderTwoName = 'FolderTwo';
    //     await umbracoApi.mediaNames.ensureNameNotExists(mediaFolderOneName);
    //     await umbracoApi.mediaNames.ensureNameNotExists(mediaFolderTwoName);
    //
    //     //Action
    //     const mediaFolderOne = new MediaBuilder()
    //         .withName(mediaFolderOneName)
    //         .withContentTypeAlias('Folder')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaFolderOne, null);
    //     const mediaFolderTwo = new MediaBuilder()
    //         .withName(mediaFolderTwoName)
    //         .withContentTypeAlias('Folder')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaFolderTwo, null);
    //     await page.reload();
    //     await page.locator('[ng-click="vm.toggleLayoutDropdown()"]').click({force: true});
    //     await page.locator('[title="List"]').click();
    //
    //     //Assert
    //     await expect(page.locator('[icon="icon-list"]')).toBeVisible();
    //
    //     //Clean
    //     await umbracoApi.mediaNames.ensureNameNotExists(mediaFolderOneName);
    //     await umbracoApi.mediaNames.ensureNameNotExists(mediaFolderTwoName);
    // });
    // test('Change List to grid', async ({page, umbracoApi, umbracoUi}) => {
    //     const mediaFolderOneName = 'FolderOne';
    //     const mediaFolderTwoName = 'FolderTwo';
    //     await umbracoApi.mediaNames.ensureNameNotExists(mediaFolderOneName);
    //     await umbracoApi.mediaNames.ensureNameNotExists(mediaFolderTwoName);
    //
    //     await page.locator('[ng-click="vm.toggleLayoutDropdown()"]').click({force: true});
    //     await page.locator('[title="List"]').click();
    //
    //     //Action
    //     const mediaFolderOne = new MediaBuilder()
    //         .withName(mediaFolderOneName)
    //         .withContentTypeAlias('Folder')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaFolderOne, null);
    //
    //     const mediaFolderTwo = new MediaBuilder()
    //         .withName(mediaFolderTwoName)
    //         .withContentTypeAlias('Folder')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaFolderTwo, null);
    //     await page.reload();
    //     await page.locator('[ng-click="vm.toggleLayoutDropdown()"]').click({force: true});
    //     await page.locator('[title="Grid"]').click();
    //
    //     //Assert
    //     await expect(page.locator('[icon="icon-thumbnails-small"]')).toBeVisible();
    //
    //     //Clean
    //     await umbracoApi.mediaNames.ensureNameNotExists(mediaFolderOneName);
    //     await umbracoApi.mediaNames.ensureNameNotExists(mediaFolderTwoName);
    // });
    //
    // test('Move file into folder', async ({page, umbracoApi, umbracoUi}) => {
    //     const mediaFileMoveName = 'MobileFile';
    //     const mediaFolderImmobileName = 'Immobile';
    //     await umbracoApi.mediaNames.ensureNameNotExists(mediaFileMoveName);
    //     await umbracoApi.mediaNames.ensureNameNotExists(mediaFolderImmobileName);
    //     //Action
    //     const mediaFileMove = new MediaBuilder()
    //         .withName(mediaFileMoveName)
    //         .withContentTypeAlias('File')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaFileMove, null);
    //     const mediaFolderImmobile = new MediaBuilder()
    //         .withName(mediaFolderImmobileName)
    //         .withContentTypeAlias('Folder')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaFolderImmobile, null);
    //     await umbracoUi.refreshMediaTree();
    //
    //     await umbracoUi.clickElement(umbracoUi.getTreeItem('media', [mediaFileMoveName]), {
    //         button: "right",
    //         force: true
    //     });
    //     await umbracoUi.clickElement(umbracoUi.getContextMenuAction(ConstantHelper.actions.move));
    //
    //     await page.locator('[api="dialogTreeApi"] >> "Immobile"').click();
    //     await page.locator('[key="actions_move"]').click();
    //
    //     //Assert
    //     await expect(page.locator('.alert-success')).toBeVisible();
    //
    //     //Clean
    //     await umbracoApi.mediaNames.ensureNameNotExists(mediaFileMoveName);
    //     await umbracoApi.mediaNames.ensureNameNotExists(mediaFolderImmobileName);
    // });
    //

    // test('Delete one of each files in media', async ({page, umbracoApi, umbracoUi}) => {
    //     let mediaArticleName;
    //     let mediaAudioName;
    //     let mediaFileName;
    //     let mediaFolderName;
    //     let mediaImageName;
    //     let mediaSVGName;
    //     let mediaVideoName;
    //     const names = [mediaArticleName = 'ArticleToDelete', mediaAudioName = 'AudioToDelete', mediaFileName = 'FileToDelete', mediaImageName = 'ImageToDelete', mediaSVGName = 'SVGToDelete', mediaVideoName = 'VideoToDelete', mediaFolderName = 'FolderToDelete'];
    //
    //     for (const name of names) {
    //         await umbracoApi.mediaNames.ensureNameNotExists(name);
    //     }
    //     //Action
    //     const mediaArticle = new MediaBuilder()
    //         .withName(mediaArticleName)
    //         .withContentTypeAlias('umbracoMediaArticle')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaArticle, null);
    //     const mediaAudio = new MediaBuilder()
    //         .withName(mediaAudioName)
    //         .withContentTypeAlias('umbracoMediaAudio')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaAudio, null);
    //     const mediaFile = new MediaBuilder()
    //         .withName(mediaFileName)
    //         .withContentTypeAlias('File')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaFile, null);
    //     const mediaFolder = new MediaBuilder()
    //         .withName(mediaFolderName)
    //         .withContentTypeAlias('Folder')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaFolder, null);
    //     const mediaImage = new MediaBuilder()
    //         .withName(mediaImageName)
    //         .withContentTypeAlias('Image')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaImage, null);
    //     const mediaSVG = new MediaBuilder()
    //         .withName(mediaSVGName)
    //         .withContentTypeAlias('umbracoMediaVectorGraphics')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaSVG, null);
    //     const mediaVideo = new MediaBuilder()
    //         .withName(mediaVideoName)
    //         .withContentTypeAlias('umbracoMediaVideo')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaVideo, null);
    //
    //     await page.reload();
    //
    //     //Takes all the child elements in folder-grid.
    //     const folders = await page.locator(".umb-folder-grid").locator("xpath=/*");
    //     await umbracoUi.clickMultiple(folders);
    //     const files = await page.locator('[data-element="media-grid"]').locator("xpath=/*");
    //     await umbracoUi.clickMultiple(files);
    //     await page.locator('[label-key="actions_delete"]').click();
    //
    //     //Needs to wait. Otherwise it would not have loaded Article
    //     await page.waitForTimeout(1000);
    //     await page.locator('[alias="overlaySubmit"]').click();
    //
    //     //Assert
    //     await expect(page.locator('.alert-success')).toBeVisible();
    //
    //     //Clean
    //     await umbracoApi.mediaNames.ensureRecycleBinEmpty();
    // });

    //Does not work.Same problem with clicking the correct folder. Should I check what kind of layout the list/grid has? so I can test for both
    // test('Move one of each files into a folder', async ({page, umbracoApi, umbracoUi}) => {
    //     let mediaArticleName;
    //     let mediaAudioName;
    //     let mediaFileName;
    //     let mediaFolderName;
    //     let mediaImageName;
    //     let mediaSVGName;
    //     let mediaVideoName;
    //     const names = [mediaArticleName = 'ArticleToMove', mediaAudioName = 'AudioToMove', mediaFileName = 'FileToMove', mediaImageName = 'ImageToMove', mediaSVGName = 'SVGToMove', mediaVideoName = 'VideoToMove', mediaFolderName = 'FolderToMoveInto'];
    //
    //     for (const name of names) {
    //         await umbracoApi.mediaNames.ensureNameNotExists(name);
    //     }
    //     //Action
    //     const mediaArticle = new MediaBuilder()
    //         .withName(mediaArticleName)
    //         .withContentTypeAlias('umbracoMediaArticle')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaArticle, null);
    //     const mediaAudio = new MediaBuilder()
    //         .withName(mediaAudioName)
    //         .withContentTypeAlias('umbracoMediaAudio')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaAudio, null);
    //     const mediaFile = new MediaBuilder()
    //         .withName(mediaFileName)
    //         .withContentTypeAlias('File')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaFile, null);
    //     const mediaFolder = new MediaBuilder()
    //         .withName(mediaFolderName)
    //         .withContentTypeAlias('Folder')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaFolder, null);
    //     const mediaImage = new MediaBuilder()
    //         .withName(mediaImageName)
    //         .withContentTypeAlias('Image')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaImage, null);
    //     const mediaSVG = new MediaBuilder()
    //         .withName(mediaSVGName)
    //         .withContentTypeAlias('umbracoMediaVectorGraphics')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaSVG, null);
    //     const mediaVideo = new MediaBuilder()
    //         .withName(mediaVideoName)
    //         .withContentTypeAlias('umbracoMediaVideo')
    //         .build()
    //     await umbracoApi.mediaNames.save(mediaVideo, null);
    //
    //     await page.reload();
    //
    //    
    //     for (const name of names)
    //     {
    //         await page.locator('[alt="' + name + '"]').click();
    //     }
    //     await page.locator('[label-key="actions_move"]').click();
    //
    //     //Maybe I have to delete all the folders in the grid for folders So the only folder will be the one I created?
    //     //Apparently it cant find the folder
    //     // await page.locator('[data-element="tree-item-FolderToMoveInto"]').click();
    //     // await page.locator('[label-key="general_submit"]').click();
    //
    //     //Takes all the child elements in folder-grid.
    //     // await page.pause();
    //     // const items = await page.locator(".umb-tree ng-isolate-scope hide-options").locator("xpath=/*");
    //     // await page.pause();
    //     // await umbracoUi.clickMultiple(items);
    //    
    //
    //     //Assert
    //
    //     //Clean
    //     for (const name of names) {
    //         await umbracoApi.mediaNames.ensureNameNotExists(name);
    //     }
    //
    // });
});