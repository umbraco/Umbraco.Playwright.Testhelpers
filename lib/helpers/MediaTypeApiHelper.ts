import {TreeApiHelper} from "./TreeApiHelper";
import {AliasHelper} from "./AliasHelper";
import {MediaTypeBuilder} from "@umbraco/json-models-builders";

export class MediaTypeApiHelper extends TreeApiHelper {
  protected resourcePath = 'media-type';
  protected treePath = 'tree/media-type';

  async createDefaultMediaType(mediaTypeName: string) {
    const mediaType = new MediaTypeBuilder()
      .withName(mediaTypeName)
      .withAlias(AliasHelper.toAlias(mediaTypeName))
      .build();
    return await this.create(mediaType);
  }

  async createMediaTypeWithPropertyEditor(mediaTypeName: string, dataTypeName: string, dataTypeId: string, groupName: string = "GroupTest", isAllowAsRoot: boolean = false) {
    const crypto = require('crypto');
    const containerId = crypto.randomUUID();

    const mediaType = new MediaTypeBuilder()
      .withName(mediaTypeName)
      .withAllowedAsRoot(isAllowAsRoot)
      .withAlias(AliasHelper.toAlias(mediaTypeName))
      .addContainer()
        .withName(groupName)
        .withId(containerId)
        .withType("Group")
        .done()
      .addProperty()
        .withContainerId(containerId)
        .withAlias(AliasHelper.toAlias(dataTypeName))
        .withName(dataTypeName)
        .withDataTypeId(dataTypeId)
        .done()
      .build();
    return await this.create(mediaType);
  }

  async createMediaTypeWithTwoPropertyEditors(mediaTypeName: string, dataTypeNameOne: string, dataTypeIdOne: string, dataTypeNameTwo: string, dataTypeIdTwo: string, groupName: string = "GroupTest") {
    const crypto = require('crypto');
    const containerId = crypto.randomUUID();

    const mediaType = new MediaTypeBuilder()
      .withName(mediaTypeName)
      .withAlias(AliasHelper.toAlias(mediaTypeName))
      .addContainer()
        .withName(groupName)
        .withId(containerId)
        .withType("Group")
        .done()
      .addProperty()
        .withContainerId(containerId)
        .withAlias(AliasHelper.toAlias(dataTypeNameOne))
        .withName(dataTypeNameOne)
        .withDataTypeId(dataTypeIdOne)
        .done()
      .addProperty()
        .withContainerId(containerId)
        .withAlias(AliasHelper.toAlias(dataTypeNameTwo))
        .withName(dataTypeNameTwo)
        .withDataTypeId(dataTypeIdTwo)
        .done()
      .build();
    return await this.create(mediaType);
  }

  async createMediaTypeWithPropertyEditorInTab(mediaTypeName: string, dataTypeName: string, dataTypeId: string, tabName: string, groupName: string = "TestGroup", varyByCulture: boolean = false) {
    const crypto = require('crypto');
    const tabId = crypto.randomUUID();
    const groupId = crypto.randomUUID();

    const mediaType = new MediaTypeBuilder()
      .withName(mediaTypeName)
      .withAlias(AliasHelper.toAlias(mediaTypeName))
      .addContainer()
        .withName(tabName)
        .withId(tabId)
        .withType("Tab")
        .done()
      .addContainer()
        .withName(groupName)
        .withId(groupId)
        .withType("Group")
        .withParentId(tabId)
        .done()
      .addProperty()
        .withContainerId(groupId)
        .withAlias(AliasHelper.toAlias(dataTypeName))
        .withName(dataTypeName)
        .withDataTypeId(dataTypeId)
        .done()
      .withVariesByCulture(varyByCulture)
      .build();
    return await this.create(mediaType);
  }

  async createMediaTypeWithTwoGroups(mediaTypeName: string, dataType: string, dataTypeId: string, groupNameOne: string, groupNameTwo: string) {
    const crypto = require('crypto');
    const groupOneId = crypto.randomUUID();
    const groupTwoId = crypto.randomUUID();

    const mediaType = new MediaTypeBuilder()
      .withName(mediaTypeName)
      .withAlias(AliasHelper.toAlias(mediaTypeName))
      .addContainer()
        .withName(groupNameOne)
        .withId(groupOneId)
        .withType("Group")
        .withSortOrder(0)
        .done()
      .addContainer()
        .withName(groupNameTwo)
        .withId(groupTwoId)
        .withType("Group")
        .withSortOrder(1)
        .done()
      .addProperty()
        .withContainerId(groupOneId)
        .withAlias(AliasHelper.toAlias(dataType + "One"))
        .withName(dataType + "One")
        .withDataTypeId(dataTypeId)
        .done()
      .addProperty()
        .withContainerId(groupTwoId)
        .withAlias(AliasHelper.toAlias(dataType + "Two"))
        .withName(dataType + "Two")
        .withDataTypeId(dataTypeId)
        .done()
      .build();
    return await this.create(mediaType);
  }

  async createMediaTypeWithTwoTabs(mediaTypeName: string, dataType: string, dataTypeId: string, tabNameOne: string, tabNameTwo: string) {
    const crypto = require('crypto');
    const tabOneId = crypto.randomUUID();
    const tabTwoId = crypto.randomUUID();
    const groupOneId = crypto.randomUUID();
    const groupTwoId = crypto.randomUUID();

    const mediaType = new MediaTypeBuilder()
      .withName(mediaTypeName)
      .withAlias(AliasHelper.toAlias(mediaTypeName))
      .addContainer()
        .withName(tabNameOne)
        .withId(tabOneId)
        .withType("Tab")
        .withSortOrder(0)
        .done()
      .addContainer()
        .withName(tabNameTwo)
        .withId(tabTwoId)
        .withType("Tab")
        .withSortOrder(1)
        .done()
      .addContainer()
        .withName("GroupTestOne")
        .withId(groupOneId)
        .withType("Group")
        .withParentId(tabOneId)
        .done()
      .addProperty()
        .withContainerId(groupOneId)
        .withAlias(AliasHelper.toAlias(dataType + "One"))
        .withName(dataType + "One")
        .withDataTypeId(dataTypeId)
        .done()
      .addContainer()
        .withName("GroupTestTwo")
        .withId(groupTwoId)
        .withType("Group")
        .withParentId(tabTwoId)
        .done()
      .addProperty()
        .withContainerId(groupTwoId)
        .withAlias(AliasHelper.toAlias(dataType + "Two"))
        .withName(dataType + "Two")
        .withDataTypeId(dataTypeId)
        .done()
      .build();
    return await this.create(mediaType);
  }

  async createMediaTypeWithAllowedChildNode(mediaTypeName: string, allowedChildNodeId: string) {
    await this.ensureNameNotExists(mediaTypeName);
    const mediaType = new MediaTypeBuilder()
      .withName(mediaTypeName)
      .withAlias(AliasHelper.toAlias(mediaTypeName))
      .withAllowedAsRoot(true)
      .addAllowedMediaType()
        .withId(allowedChildNodeId)
        .done()
      .build();
    return await this.create(mediaType);
  }

  async doesGroupContainCorrectPropertyEditor(mediaTypeName: string, dataTypeName: string, dataTypeId: string, groupName: string) {
    const mediaType = await this.getByName(mediaTypeName);
    const group = mediaType.containers.find(x => x.name === groupName);
    // Check if group is defined
    if (group) {
      // Check if the media type properties include the specified property, and it belongs to the group
      return mediaType.properties.find(x => x.name === dataTypeName && x.dataType.id === dataTypeId && x.container.id === group.id);
    } else {
      // Group not found
      return false;
    }
  }

  async doesTabContainCorrectPropertyEditorInGroup(mediaTypeName: string, dataTypeName: string, dataTypeId: string, tabName: string, groupName: string) {
    const mediaType = await this.getByName(mediaTypeName);
    const tab = mediaType.containers.find(x => x.name === tabName);
    // Check if tab is defined
    if (tab) {
      const group = mediaType.containers.find(x => x.name === groupName && x.parent.id === tab.id);
      // Check if group is defined
      if (group) {
        // Check if the media type properties include the specified property, and it belongs to the group
        return mediaType.properties.find(x => x.name === dataTypeName && x.dataType.id === dataTypeId && x.container.id === group.id);
      } else {
        // Group not found
        return false;
      }
    } else {
      // Tab not found
      return false;
    }
  }

  async doesMediaTypeGroupNameContainCorrectSortOrder(mediaTypeName: string, groupName: string, sortOrder: number) {
    const mediaType = await this.getByName(mediaTypeName);
    const group = mediaType.containers.find(x => x.name === groupName);
    // Check if group is defined
    if (group) {
      return group.sortOrder === sortOrder;
    } else {
      // Group not found
      return false;
    }
  }

  async doesMediaTypeTabNameContainCorrectSortOrder(mediaTypeName: string, tabName: string, sortOrder: number) {
    const mediaType = await this.getByName(mediaTypeName);
    const tab = mediaType.containers.find(x => x.name === tabName);
    // Check if tab is defined
    if (tab) {
      return tab.sortOrder === sortOrder;
    } else {
      // Tab not found
      return false;
    }
  }

  async doesTabContainerCorrectPropertyEditor(mediaTypeName: string, tabName: string, dataTypeId: string) {
    const mediaType = await this.getByName(mediaTypeName);
    const tab = mediaType.containers.find(x => x.name === tabName);
    if (tab) {
      return mediaType.properties.find(x => x.dataType.id === dataTypeId && x.container.id === tab.id);
    } else {
      return false;
    }
  }

  async doesMediaTypeContainAllowedChildNodeIds(mediaTypeName: string, allowedChildNodeIds: string[]) {
    const mediaType = await this.getByName(mediaTypeName);
    const allowedChildNodeIdsArray = mediaType.allowedMediaTypes.map(x => x.mediaType.id);
    return allowedChildNodeIdsArray.every(id => allowedChildNodeIds.includes(id));
  }
}
