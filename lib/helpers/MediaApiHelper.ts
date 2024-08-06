﻿import {ApiHelpers} from "./ApiHelpers";
import {MediaBuilder} from "@umbraco/json-models-builders";

export class MediaApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async ensureNameNotExists(name: string) {
    const rootMedia = await this.getAllAtRoot();
    const jsonMedia = await rootMedia.json();

    for (const media of jsonMedia.items) {
      if (media.variants[0].name === name) {
        if (media.hasChildren) {
          return await this.recurseDeleteChildren(media);
        }
        return await this.delete(media.id);
      } else if (media.hasChildren) {
        await this.recurseChildren(name, media.id, true);
      }
    }
    return null;
  }

  async getAllAtRoot() {
    return await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/media/root?skip=0&take=10000');
  }

  private async recurseChildren(name: string, id: string, toDelete: boolean) {
    const items = await this.getChildren(id);

    for (const child of items) {
      if (child.variants[0].name === name) {
        if (!toDelete) {
          return await this.get(child.id);
        }
        if (child.hasChildren) {
          return await this.recurseDeleteChildren(child);
        }
        return await this.delete(child.id);
      } else if (child.hasChildren) {
        return await this.recurseChildren(name, child.id, toDelete);
      }
    }
    return false;
  }

  private async recurseDeleteChildren(media) {
    if (!media.hasChildren) {
      return await this.delete(media.id);
    }
    const items = await this.getChildren(media.id);

    for (const child of items) {
      if (child.hasChildren) {
        await this.recurseDeleteChildren(child);
      } else {
        await this.delete(child.id);
      }
    }
    return await this.delete(media.id);
  }

  async get(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/media/' + id);
    return await response.json();
  }

  async delete(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/media/' + id);
  }

  async getChildren(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/media/children?parentId=' + id + '&skip=0&take=10000');
    const items = await response.json();
    return items.items;
  }

  async create(media) {
    if (media == null) {
      return;
    }
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/media', media);
    return response.headers().location.split("/").pop();
  }

  async doesNameExist(name: string) {
    return await this.getByName(name);
  }

  async getByName(name: string) {
    const rootMedia = await this.getAllAtRoot();
    const jsonMedia = await rootMedia.json();

    for (const media of jsonMedia.items) {
      if (media.variants[0].name === name) {
        return await this.get(media.id);
      } else if (media.hasChildren) {
        await this.recurseChildren(name, media.id, false);
      }
    }
    return null;
  }

  async getRecycleBinItems() {
    return await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/recycle-bin/media/root?skip=0&take=10000');
  }

  async emptyRecycleBin() {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/recycle-bin/media');
  }

  async doesMediaItemExistInRecycleBin(mediaItemName: string) {
    const recycleBin = await this.getRecycleBinItems();
    const jsonRecycleBin = await recycleBin.json();
    for (const media of jsonRecycleBin.items) {
      if (media.variants[0].name === mediaItemName) {
        return true;
      }
    }
    return false;
  }

  async trashMediaItem(mediaItemName: string) {
    const media = await this.getByName(mediaItemName);
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/media/' + media.id + '/move-to-recycle-bin');
  }

  async createMediaWithFolderType(mediaFolderName: string, parentId?: string) {
    const mediaType = await this.api.mediaType.getByName('Folder');
    const media = new MediaBuilder()
      .withMediaTypeId(mediaType.id)
      .addVariant()
        .withName(mediaFolderName)
        .done()
      .build();

    if (parentId !== undefined) {
      media.parent = {id: parentId};
    }

    return await this.create(media);
  }

  async createDefaultMedia(mediaName: string, mediaTypeName: string, parentId?: string) {
    const mediaType = await this.api.mediaType.getByName(mediaTypeName);

    const crypto = require('crypto');
    const temporaryFileId = crypto.randomUUID();
    const fileName = 'File.txt';
    const filePath = './fixtures/mediaLibrary/' + fileName;
    const mimeType = 'text/plain';
    await this.api.temporaryFile.create(temporaryFileId, fileName, mimeType, filePath);

    const media = new MediaBuilder()
      .withMediaTypeId(mediaType.id)
      .addVariant()
        .withName(mediaName)
        .done()
      .addValue()
        .withAlias('umbracoFile')
        .withValue(temporaryFileId)
        .done()
      .build();

    if (parentId !== undefined) {
      media.parent = {id: parentId};
    }

    return await this.create(media);
  }

  async createDefaultMediaFolder(mediaFolderName: string, parentId?: string) {
    const mediaType = await this.api.mediaType.getByName('Folder');
    const media = new MediaBuilder()
      .withMediaTypeId(mediaType.id)
      .addVariant()
        .withName(mediaFolderName)
        .done()
      .build();

    if (parentId !== undefined) {
      media.parent = {id: parentId};
    }

    return await this.create(media);
  }
  
  async createDefaultMediaWithImage(mediaName: string, parentId?: string) {
    const mediaType = await this.api.mediaType.getByName('Image');
    const crypto = require('crypto');
    const temporaryFileId = crypto.randomUUID();
    const fileName = 'Umbraco.png';
    const filePath = './fixtures/mediaLibrary/' + fileName;
    const mimeType = 'image/png';
    await this.api.temporaryFile.create(temporaryFileId, fileName, mimeType, filePath);
    
    const media = new MediaBuilder()
      .withMediaTypeId(mediaType.id)
      .addVariant()
        .withName(mediaName)
        .done()
      .addValue()
        .withAlias('umbracoFile')
        .withValue(temporaryFileId)
        .done()
      .build();

    if (parentId !== undefined) {
      media.parent = {id: parentId};
    }

    return await this.create(media);
  }
}