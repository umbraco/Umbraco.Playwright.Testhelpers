﻿import {ApiHelpers} from "./ApiHelpers";
import {CheckboxListDataTypeBuilder, DatePickerDataTypeBuilder, BlockListDataTypeBuilder,BlockGridDataTypeBuilder} from "@umbraco/json-models-builders";

export class DataTypeApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async get(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + id);
    return await response.json();
  }

  async create(name: string, editorAlias: string, values: { alias: string; value: string; }[], parentId?: string, editorUiAlias?: string, id?: string) {
    const dataType = {
      "name": name,
      "editorAlias": editorAlias,
      "editorUiAlias": editorUiAlias,
      "values": values,
      "id": id,
      "parent": parentId ? {"id": parentId} : null
    };
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/data-type', dataType);
    // Returns the id of the created dataType
    return response.headers().location.split("v1/data-type/").pop();
  }

  async update(id: string, dataType) {
    const updateDataType = {
      "name": dataType.name,
      "editorAlias": dataType.editorAlias,
      "editorUiAlias": dataType.editorUiAlias,
      "values": dataType.values,
    };
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + id, updateDataType);
  }

  async delete(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + id);
  }

  async getAllAtRoot() {
    return await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/data-type/root?skip=0&take=10000&foldersOnly=false');
  }

  async doesExist(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + id);
    return response.status() === 200;
  }

  async getItems(ids: string[]) {
    let idArray = 'id=' + ids[0];
    let i: number;

    for (i = 1; i < ids.length; ++i) {
      idArray += '&id=' + ids[i];
    }

    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/data-type/item?' + idArray);
    return await response.json();
  }

  async getByName(name: string) {
    const rootDataTypes = await this.getAllAtRoot();
    const jsonDataTypes = await rootDataTypes.json();

    for (const dataType of jsonDataTypes.items) {
      if (dataType.name === name) {
        return this.get(dataType.id);
      } else if (dataType.isContainer || dataType.hasChildren) {
        const result = await this.recurseChildren(name, dataType.id, false);
        if (result) {
          return result;
        }
      }
    }
    return false;
  }

  async ensureNameNotExists(name: string) {
    const rootDataTypes = await this.getAllAtRoot();
    const jsonDataTypes = await rootDataTypes.json();

    for (const dataType of jsonDataTypes.items) {
      if (dataType.name === name) {
        if (dataType.isFolder) {
          return await this.recurseDeleteChildren(dataType);
        }
        return await this.delete(dataType.id);
      } else if (dataType.hasChildren) {
        await this.recurseChildren(name, dataType.id, true);

      }
    }
    return null;
  }

  async doesNameExist(name: string) {
    return await this.getByName(name);
  }

  async moveToFolder(dataTypeId: string, folderId: string) {
    const folderIdBody = {
      "target": {id: folderId}
    };
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + dataTypeId + '/move', folderIdBody);
  }

  async copyToFolder(dataTypeId: string, folderId: string) {
    const folderIdBody = {
      "target": {id: folderId}
    };
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/data-type/' + dataTypeId + '/copy', folderIdBody);
    // Returns the id of the copied dataType
    return response.headers().location.split("v1/data-type/").pop();
  }

  // FOLDER
  async getFolder(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder/' + id);
    return await response.json();
  }

  async createFolder(name: string, parentId?: string, id?: string) {
    const folderData = {
      "name": name,
      "id": id,
      "parent": parentId ? {"id": parentId} : null
    };

    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder', folderData);
    // Returns the id of the created dataTypeFolder
    return response.headers().location.split("v1/data-type/folder/").pop();
  }

  async renameFolder(id: string, name: string) {
    const folderData = {
      "name": name,
    };
    return await this.api.put(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder/' + id, folderData);
  }

  async deleteFolder(id: string) {
    return await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder/' + id);
  }

  async doesFolderExist(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/data-type/folder/' + id);
    return response.status() === 200;
  }

  async getChildren(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/tree/data-type/children?parentId=' + id + '&skip=0&take=100&foldersOnly=false');
    const items = await response.json();
    return items.items;
  }

  private async recurseDeleteChildren(dataFolder) {
    if (!dataFolder.hasChildren) {
      return await this.deleteFolder(dataFolder.id);
    }
    const items = await this.getChildren(dataFolder.id);

    for (const child of items) {
      if (child.hasChildren) {
        await this.recurseDeleteChildren(child);
      } else if (child.isFolder) {
        await this.deleteFolder(child.id);
      } else {
        await this.delete(child.id);
      }
    }
    return await this.deleteFolder(dataFolder.id);
  }

  private async recurseChildren(name: string, id: string, toDelete: boolean) {
    const items = await this.getChildren(id);

    for (const child of items) {
      if (child.name === name) {
        if (!toDelete) {
          if (child.isFolder) {
            return await this.getFolder(child.id);
          }
          return await this.get(child.id);
        }
        if (child.isFolder) {
          return await this.recurseDeleteChildren(child);
        }
        return await this.delete(child.id);
      } else if (child.hasChildren) {
        return await this.recurseChildren(name, child.id, toDelete);
      }
    }
    return false;
  }

  async save(dataType) {
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/data-type', dataType)
    return response.headers().location.split("v1/data-type/").pop();
  }

  async createDateTypeDataType(name: string) {
    await this.ensureNameNotExists(name);

    const dataType = new DatePickerDataTypeBuilder()
      .withName(name)
      .build();
    return await this.save(dataType);
  }

  async createCheckboxListDataType(name: string, options: string[]) {
    await this.ensureNameNotExists(name);

    const dataType = new CheckboxListDataTypeBuilder()
      .withName(name)
      .withItems(options)
      .build();
    return await this.save(dataType);
  }

  // BlockListEditor
  async createEmptyBlockListDataType(name: string) {
    await this.ensureNameNotExists(name);

    const blockList = new BlockListDataTypeBuilder()
      .withName(name)
      .build();

    return await this.save(blockList);
  }
  
  async createBlockListDataTypeWithABlock(name: string, contentElementTypeId: string) {
    await this.ensureNameNotExists(name);
  
    const blockList = new BlockListDataTypeBuilder()
      .withName(name)
      .addBlock()
        .withContentElementTypeKey(contentElementTypeId)
        .done()
      .build();

    return await this.save(blockList);
  }
  
  async createBlockListDataTypeWithContentAndSettingsElementType(name: string, contentElementTypeId: string, settingsElementTypeId: string) {
    await this.ensureNameNotExists(name);
  
    const blockList = new BlockListDataTypeBuilder()
      .withName(name)
      .addBlock()
        .withContentElementTypeKey(contentElementTypeId)
        .withSettingsElementTypeKey(settingsElementTypeId)
        .done()
      .build();

    return await this.save(blockList);
  }
  
  async createBlockListDataTypeWithMinAndMaxAmount(name: string, minAmount: number = 0, maxAmount: number = 0) {
    await this.ensureNameNotExists(name);
  
    const blockList = new BlockListDataTypeBuilder()
      .withName(name)
      .withMinValue(minAmount)
      .withMaxValue(maxAmount)
      .build();
    
    return await this.save(blockList);
  }

  async createBlockListDataTypeWithSingleBlockMode(name: string, enabled: boolean) {
    await this.ensureNameNotExists(name);

    const blockList = new BlockListDataTypeBuilder()
      .withName(name)
      .withSingleBlockMode(enabled)
      .build();

    return await this.save(blockList);
  }

  async createBlockListDataTypeWithLiveEditingMode(name: string, enabled: boolean) {
    await this.ensureNameNotExists(name);

    const blockList = new BlockListDataTypeBuilder()
      .withName(name)
      .withLiveEditing(enabled)
      .build();

    return await this.save(blockList);
  }
  
  async createBlockListDataTypeWithInlineEditingMode(name: string, enabled: boolean) {
    await this.ensureNameNotExists(name);
  
    const blockList = new BlockListDataTypeBuilder()
      .withName(name)
      .withInlineEditingAsDefault(enabled)
      .build();

    return await this.save(blockList);
  }
  
  async createBlockListDataTypeWithPropertyEditorWidth(name: string, width: string) {
    await this.ensureNameNotExists(name);
  
    const blockList = new BlockListDataTypeBuilder()
      .withName(name)
      .withMaxPropertyWidth(width)
      .build();

    return await this.save(blockList);
  }
  
  async createBlockListWithBlockWithEditorAppearance(name: string, elementTypeId: string, label: string = '', overlaySize: string = 'small') {
    await this.ensureNameNotExists(name);
  
    const blockList = new BlockListDataTypeBuilder()
      .withName(name)
      .addBlock()
        .withContentElementTypeKey(elementTypeId)
        .withLabel(label)
        .withEditorSize(overlaySize)
        .done()
      .build();

    return await this.save(blockList);
  }

  async createBlockListWithBlockWithCatalogueAppearance(name: string, elementTypeId: string, backgroundColor: string = '', iconColor: string = '', customStylesheet: string = '') {
    await this.ensureNameNotExists(name);
  
    const blockList = new BlockListDataTypeBuilder()
      .withName(name)
      .addBlock()
        .withContentElementTypeKey(elementTypeId)
        .withBackgroundColor(backgroundColor)
        .withIconColor(iconColor)
        .withStylesheet(customStylesheet)
        .done()
      .build();

    return await this.save(blockList);
  }
  
  async createBlockListWithBlockWithHideContentEditor(name: string, elementTypeId: string, hideContentEditor: boolean) {
    await this.ensureNameNotExists(name);
  
    const blockList = new BlockListDataTypeBuilder()
      .withName(name)
      .addBlock()
        .withContentElementTypeKey(elementTypeId)
        .withHideContentEditor(hideContentEditor)
        .done()
      .build();

    return await this.save(blockList);
  }
  
    async doesBlockListContainBlockWithContentTypeIds(blockListName: string, elementTypeIds: string[]) {
    if (!elementTypeIds || elementTypeIds.length === 0) {
      return false;
    }
    
    const blockList = await this.getByName(blockListName);
    const blocksValue = blockList.values.find(value => value.alias === 'blocks');
    if (!blocksValue || blocksValue.value.length === 0) {
      return false;
    }
    
    const contentElementTypeKeys = blocksValue.value.map(block => block.contentElementTypeKey);
    return elementTypeIds.every(id => contentElementTypeKeys.includes(id));
  }

  async doesBlockListContainBlockWithSettingsTypeIds(blockListName: string, elementTypeIds: string[]) {
    if (!elementTypeIds || elementTypeIds.length === 0) {
      return false;
    }

    const blockList = await this.getByName(blockListName);
    const blocksValue = blockList.values.find(value => value.alias === 'blocks');
    if (!blocksValue || blocksValue.value.length === 0) {
      return false;
    }

    const settingsElementTypeKeys = blocksValue.value.map(block => block.settingsElementTypeKey);
    return elementTypeIds.every(id => settingsElementTypeKeys.includes(id));
  }

  async isSingleBlockModeEnabledForBlockList(blockListName: string, enabled: boolean) {
    const blockList = await this.getByName(blockListName);
    const singleBlockModeValue = blockList.values.find(value => value.alias === 'useSingleBlockMode');
    return singleBlockModeValue?.value === enabled;
  }

  async isLiveEditingModeEnabledForBlockList(blockListName: string, enabled: boolean) {
    const blockList = await this.getByName(blockListName);
    const liveEditingModeValue = blockList.values.find(value => value.alias === 'useLiveEditing');
    return liveEditingModeValue?.value === enabled;
  }

  async isInlineEditingModeEnabledForBlockList(blockListName: string, enabled: boolean) {
    const blockList = await this.getByName(blockListName);
    const inlineEditingModeValue = blockList.values.find(value => value.alias === 'useInlineEditingAsDefault');
    return inlineEditingModeValue?.value === enabled;
  }

  async doesMaxPropertyContainWidthForBlockList(blockListName: string, width: string) {
    const blockList = await this.getByName(blockListName);
    const maxPropertyWidthValue = blockList.values.find(value => value.alias === 'maxPropertyWidth');
    return maxPropertyWidthValue?.value === width;
  }
  
  async doesBlockListBlockContainLabel(blockListName: string, elementTypeKey: string, label: string) {
    const blockList = await this.getByName(blockListName);
    const blocks = blockList.values.find(value => value.alias === 'blocks');
    const block = blocks.value.find(block => block.contentElementTypeKey === elementTypeKey);
    return block.label === label;
  }
  
  // Block Grid
  async createEmptyBlockGridDataType(blockGridName: string) {
    await this.ensureNameNotExists(blockGridName);

    const blockGrid = new BlockGridDataTypeBuilder()
      .withName(blockGridName)
      .build();

    return await this.save(blockGrid);
  }
  
  async createBlockGridDataTypeWithABlock(blockGridName: string, contentElementTypeId: string) {
    await this.ensureNameNotExists(blockGridName);
  
    const blockGrid = new BlockGridDataTypeBuilder()
      .withName(blockGridName)
      .addBlock()
        .withContentElementTypeKey(contentElementTypeId)
        .done()
      .build();

    return await this.save(blockGrid);
  }


  async createBlockGridDataTypeWithABlockInAGroup(blockGridName: string, contentElementTypeId: string, groupName: string ) {
    await this.ensureNameNotExists(blockGridName);
  
    const blockGrid = new BlockGridDataTypeBuilder()
      .withName(blockGridName)
      .addBlockGroup()
        .withName(groupName)
        .done()
      .addBlock()
        .withContentElementTypeKey(contentElementTypeId)
        .withGroupName(groupName)
        .done()
      .build();
    
    return await this.save(blockGrid);
  }
  
  async createBlockGridDataTypeWithMinAndMaxAmount(blockGridName: string, minAmount: number = 0, maxAmount: number = 0) {
    await this.ensureNameNotExists(blockGridName);
  
    const blockGrid = new BlockGridDataTypeBuilder()
      .withName(blockGridName)
      .withMinValue(minAmount)
      .withMaxValue(maxAmount)
      .build();
    
    return await this.save(blockGrid);
  }
  
  async createBlockGridDataTypeWithLiveEditingMode(blockGridName: string, enabled: boolean) {
    await this.ensureNameNotExists(blockGridName);

    const blockGrid = new BlockGridDataTypeBuilder()
      .withName(blockGridName)
      .withLiveEditing(enabled)
      .build();

    return await this.save(blockGrid);
  }
  
  async createBlockGridDataTypeWithPropertyEditorWidth(blockGridName: string, width: string) {
    await this.ensureNameNotExists(blockGridName);
  
    const blockGrid = new BlockGridDataTypeBuilder()
      .withName(blockGridName)
      .withMaxPropertyWidth(width)
      .build();

    return await this.save(blockGrid);
  }
  
  async createBlockGridDataTypeWithCreateButtonLabel(blockGridName: string, label: string = '') {
    await this.ensureNameNotExists(blockGridName);
  
    const blockGrid = new BlockGridDataTypeBuilder()
      .withName(blockGridName)
      .withCreateLabel(label)
      .build();

    return await this.save(blockGrid);
  }

  async createBlockGridDataTypeWithGridColumns(blockGridName: string, columns: number = 12) {
    await this.ensureNameNotExists(blockGridName);

    const blockGrid = new BlockGridDataTypeBuilder()
      .withName(blockGridName)
      .withGridColumns(columns)
      .build();

    return await this.save(blockGrid);
  }
  
  async createBlockGridDataTypeWithLayoutStylesheet(blockGridName: string, stylesheet: string[] = ['']) {
    await this.ensureNameNotExists(blockGridName);
  
    const blockGrid = new BlockGridDataTypeBuilder()
      .withName(blockGridName)
      .withLayoutStylesheet(stylesheet)
      .build();

    return await this.save(blockGrid);
  }
  
  async createBlockGridWithAnAreaInABlock(blockGridName: string, contentElementTypeId: string, areaAlias: string = 'area',createButtonLabel :string = '', columnSpan: number = 6, rowSpan: number = 1, minAllowed: number = 0, maxAllowed: number = 2) {
      await this.ensureNameNotExists(blockGridName);
      const blockGrid = new BlockGridDataTypeBuilder()
        .withName(blockGridName)
        .addBlock()
          .withContentElementTypeKey(contentElementTypeId)
          .addArea()
            .withAlias(areaAlias)
            .withCreateLabel(createButtonLabel)
            .withColumnSpan(columnSpan)
            .withRowSpan(rowSpan)
            .withMinAllowed(minAllowed)
            .withMaxAllowed(maxAllowed)
            .done()
          .done()
        .build();

      return await this.save(blockGrid);
    }

  async createBlockGridDataTypeWithAdvancedSettingsInBlock(blockGridName: string, contentElementTypeId: string, customViewPath: string = '', customStylesheetPath: string = '', overlaySize: string = 'small', inlineEditing: boolean = false, hideContentEditor: boolean = false) {
    await this.ensureNameNotExists(blockGridName);

    
    
    const encodedViewPath = await this.api.stylesheet.encodeStylesheetPath(customViewPath);
    const encodedStylesheetPath = await this.api.stylesheet.encodeStylesheetPath(customStylesheetPath);
    
    const blockGrid = new BlockGridDataTypeBuilder()
      .withName(blockGridName)
      .addBlock()
        .withContentElementTypeKey(contentElementTypeId)
        .withView(encodedViewPath)
        .withStylesheet(encodedStylesheetPath)
        .withEditorSize(overlaySize)
        .withInlineEditing(inlineEditing)
        .withHideContentEditor(hideContentEditor)
        .done()
      .build();

    return await this.save(blockGrid);
  }

  async createBlockGridDataTypeWithCatalogueAppearanceInBlock(blockGridName: string, contentElementTypeId: string, backgroundColor: string = '', iconColor: string = '', thumbnail: string = '') {
    await this.ensureNameNotExists(blockGridName);

    const blockGrid = new BlockGridDataTypeBuilder()
      .withName(blockGridName)
      .addBlock()
        .withContentElementTypeKey(contentElementTypeId)
        .withBackgroundColor(backgroundColor)
        .withIconColor(iconColor)
        .withThumbnail(thumbnail)
        .done()
      .build();

    return await this.save(blockGrid);
    }
  async doesBlockGridGroupContainCorrectBlocks(blockGridName: string, groupName: string, elementTypeIds: string[]) {
    if (!elementTypeIds || elementTypeIds.length === 0) {
      return false;
    }

    const blockGrid = await this.getByName(blockGridName);
    // We need to get the GroupKey, so we can use it to find the blocks that use the Key.
    const blockGroupsValue = blockGrid.values.find(value => value.alias === 'blockGroups');
    if (!blockGroupsValue || blockGroupsValue.value.length === 0) {
      return false;
    }

    const blockGroupKey = blockGroupsValue.value.find(blockGroup => blockGroup.name === groupName).key;
    const blocksValue = blockGrid.values.find(value => value.alias === 'blocks');
    if (!blocksValue || blocksValue.value.length === 0) {
      return false;
    }

    const blocksWithGroupKey = blocksValue.value.filter(block => block.groupKey === blockGroupKey);

    return elementTypeIds.every(id =>
      blocksWithGroupKey.some(block => block.contentElementTypeKey === id)
    );
  }

  async doesBlockGridDataTypeContainCreateButtonLabel(blockGridName: string, label: string) {
    const blockGrid = await this.getByName(blockGridName);
    const createLabelValue = blockGrid.values.find(value => value.alias === 'createLabel');
    return createLabelValue?.value === label;
  }
  
  async doesBlockGridDataTypeContainGridColumns(blockGridName: string, columns: number) {
    const blockGrid = await this.getByName(blockGridName);
    const gridColumnsValue = blockGrid.values.find(value => value.alias === 'gridColumns');
    return gridColumnsValue?.value === columns;
  }
  
  async doesBlockHaveAllowInRootEnabled(blockGridName: string, elementTypeKey: string) {
    const blockGrid = await this.getByName(blockGridName);
    const blocks = blockGrid.values.find(value => value.alias === 'blocks');
    const block = blocks.value.find(block => block.contentElementTypeKey === elementTypeKey);
    return block.allowAtRoot;
  }

  async doesBlockHaveAllowInAreasEnabled(blockGridName: string, elementTypeKey: string) {
    const blockGrid = await this.getByName(blockGridName);
    const blocks = blockGrid.values.find(value => value.alias === 'blocks');
    const block = blocks.value.find(block => block.contentElementTypeKey === elementTypeKey);
    return block.allowInAreas;
  }

  async doesBlockContainColumnSpanOptions(blockGridName: string, elementTypeKey: string, expectedColumnSpans: number[]) {
    
    const blockGrid = await this.getByName(blockGridName);
    const blocks = blockGrid.values.find(value => value.alias === 'blocks');
    const block = blocks.value.find(block => block.contentElementTypeKey === elementTypeKey);

    // If the block does not have any columnSpanOptions, and we are not expecting any, return true
    if (block.columnSpanOptions.length === 0 && expectedColumnSpans.length === 0) {
      return true;
    }
    
    const columnSpans = block.columnSpanOptions.map(option => option.columnSpan);
    return expectedColumnSpans.every(span => columnSpans.includes(span)) && columnSpans.every(span => expectedColumnSpans.includes(span));
  }
  
  async doesBlockContainRowSpanOptions(blockGridName: string, elementTypeKey: string, minRowSpan: number, maxRowSpan: number) {
    const blockGrid = await this.getByName(blockGridName);
    const blocks = blockGrid.values.find(value => value.alias === 'blocks');
    const block = blocks.value.find(block => block.contentElementTypeKey === elementTypeKey);
    return block.rowMinSpan === minRowSpan && block.rowMaxSpan === maxRowSpan;
  }
  
  async doesBlockContainAreaGridColumns(blockGridName: string, elementTypeKey: string, areaGridColumns: number) {
    const blockGrid = await this.getByName(blockGridName);
    const blocks = blockGrid.values.find(value => value.alias === 'blocks');
    const block = blocks.value.find(block => block.contentElementTypeKey === elementTypeKey);
    return block.areaGridColumns === areaGridColumns;
  }
  
  async doesBlockContainAreaWithAlias(blockGridName: string, elementTypeKey: string, areaAlias: string = 'area') {
    const blockGrid = await this.getByName(blockGridName);
    const blocks = blockGrid.values.find(value => value.alias === 'blocks');
    const block = blocks.value.find(block => block.contentElementTypeKey === elementTypeKey);
    return block.areas.find(area => area.alias === areaAlias)
  }
  
  async doesBlockContainAreaWithCreateButtonLabel(blockGridName: string, elementTypeKey: string, areaAlias: string = 'area', createButtonLabel: string) {
    const blockGrid = await this.getByName(blockGridName);
    const blocks = blockGrid.values.find(value => value.alias === 'blocks');
    const block = blocks.value.find(block => block.contentElementTypeKey === elementTypeKey);
    return block.areas.find(area => area.createLabel === createButtonLabel && area.alias === areaAlias);
  }
  
  async doesBlockContainAreaWithMinAllowed(blockGridName: string, elementTypeKey: string, areaAlias: string = 'area', minAllowed: string = '') {
    const blockGrid = await this.getByName(blockGridName);
    const blocks = blockGrid.values.find(value => value.alias === 'blocks');
    const block = blocks.value.find(block => block.contentElementTypeKey === elementTypeKey);
    return block.areas.find(area => area.minAllowed === minAllowed && area.alias === areaAlias);
  }
  
  async doesBlockContainAreaWithMaxAllowed(blockGridName: string, elementTypeKey: string, areaAlias: string = 'area', maxAllowed: string = '') {
    const blockGrid = await this.getByName(blockGridName);
    const blocks = blockGrid.values.find(value => value.alias === 'blocks');
    const block = blocks.value.find(block => block.contentElementTypeKey === elementTypeKey);
    return block.areas.find(area => area.maxAllowed === maxAllowed && area.alias === areaAlias);
  }
  
  async doesBlockGridDataTypeContainStylesheet(blockGridName: string,elementTypeKey: string, stylesheetPath: string) {
    const blockGrid = await this.getByName(blockGridName);
    const blocks = blockGrid.values.find(value => value.alias === 'blocks');
    const block = blocks.value.find(block => block.contentElementTypeKey === elementTypeKey);
    const encodedSecondStylesheetPath = await this.api.stylesheet.encodeStylesheetPath(stylesheetPath);
    return block.stylesheet[0] === encodedSecondStylesheetPath;
  }
  
  async doesBlockContainOverlaySize(blockGridName: string, elementTypeKey: string, overlaySize: string) {
    const blockGrid = await this.getByName(blockGridName);
    const blocks = blockGrid.values.find(value => value.alias === 'blocks');
    const block = blocks.value.find(block => block.contentElementTypeKey === elementTypeKey);
    return block.editorSize === overlaySize;
  }
  
  async doesBlockContainInlineEditing(blockGridName: string, elementTypeKey: string, inlineEditing: boolean) {
    const blockGrid = await this.getByName(blockGridName);
    const blocks = blockGrid.values.find(value => value.alias === 'blocks');
    const block = blocks.value.find(block => block.contentElementTypeKey === elementTypeKey);
    return block.inlineEditing === inlineEditing;
  }
  
  async doesBlockContainHideContentEditor(blockGridName: string, elementTypeKey: string, hideContentEditor: boolean) {
    const blockGrid = await this.getByName(blockGridName);
    const blocks = blockGrid.values.find(value => value.alias === 'blocks');
    const block = blocks.value.find(block => block.contentElementTypeKey === elementTypeKey);
    return block.hideContentEditor === hideContentEditor;
  }
  
  async doesBlockContainBackgroundColor(blockGridName: string, elementTypeKey: string, backgroundColor: string) {
    const blockGrid = await this.getByName(blockGridName);
    const blocks = blockGrid.values.find(value => value.alias === 'blocks');
    const block = blocks.value.find(block => block.contentElementTypeKey === elementTypeKey);
    return block.backgroundColor === backgroundColor;
  }
  
  async doesBlockContainIconColor(blockGridName: string, elementTypeKey: string, iconColor: string) {
    const blockGrid = await this.getByName(blockGridName);
    const blocks = blockGrid.values.find(value => value.alias === 'blocks');
    const block = blocks.value.find(block => block.contentElementTypeKey === elementTypeKey);
    return block.iconColor === iconColor;
  }
  
  async doesBlockContainThumbnail(blockGridName: string, elementTypeKey: string, thumbnail: string) {
    const blockGrid = await this.getByName(blockGridName);
    const blocks = blockGrid.values.find(value => value.alias === 'blocks');
    const block = blocks.value.find(block => block.contentElementTypeKey === elementTypeKey);
    return block.thumbnail === thumbnail;
  }
}