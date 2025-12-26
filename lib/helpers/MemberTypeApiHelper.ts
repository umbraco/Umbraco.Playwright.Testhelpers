import {TreeApiHelper} from "./TreeApiHelper";
import {AliasHelper} from "./AliasHelper";
import {MemberTypeBuilder} from "@umbraco/json-models-builders";

export class MemberTypeApiHelper extends TreeApiHelper {
  protected resourcePath = 'member-type';
  protected treePath = 'tree/member-type';

  // Override ensureNameNotExists - MemberType has no folders
  async ensureNameNotExists(name: string): Promise<any> {
    const rootItems = await this.getAllAtRoot();
    const jsonItems = await rootItems.json();

    for (const item of jsonItems.items) {
      if (item.name === name) {
        return await this.delete(item.id);
      }
    }
    return null;
  }

  // Override getByName - MemberType has no folders
  async getByName(name: string): Promise<any> {
    const rootItems = await this.getAllAtRoot();
    const jsonItems = await rootItems.json();

    for (const item of jsonItems.items) {
      if (item.name === name) {
        return this.get(item.id);
      }
    }
    return false;
  }

  async createDefaultMemberType(memberTypeName: string) {
    await this.ensureNameNotExists(memberTypeName);

    const memberType = new MemberTypeBuilder()
      .withName(memberTypeName)
      .withAlias(AliasHelper.toAlias(memberTypeName))
      .withAllowedAsRoot(true)
      .build();
      
    return await this.create(memberType);
  }

  async createMemberTypeWithPropertyEditor(memberTypeName: string, dataTypeName: string, dataTypeId: string, groupName: string = "GroupTest")
  {
    const crypto = require('crypto');
    const containerId = crypto.randomUUID();

    const memberType = new MemberTypeBuilder()
      .withName(memberTypeName)
      .withAlias(AliasHelper.toAlias(memberTypeName))
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
    return await this.create(memberType);
  }

  async createMemberTypeWithTwoPropertyEditors(memberTypeName: string, dataTypeNameOne: string, dataTypeIdOne: string, dataTypeNameTwo: string, dataTypeIdTwo: string, groupName: string = "GroupTest")
  {
    const crypto = require('crypto');
    const containerId = crypto.randomUUID();

    const memberType = new MemberTypeBuilder()
      .withName(memberTypeName)
      .withAlias(AliasHelper.toAlias(memberTypeName))
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
    return await this.create(memberType);
  }
}