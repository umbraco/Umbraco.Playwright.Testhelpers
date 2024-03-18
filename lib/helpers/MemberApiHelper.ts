import {ApiHelpers} from "./ApiHelpers";
import {MemberBuilder} from "@umbraco/json-models-builders";

export class MemberApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async get(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/member/' + id);
    return await response.json();
  }

  async create(member) {
    if (member == null) {
      return;
    }
    const response = await this.api.post(this.api.baseUrl + '/umbraco/management/api/v1/member', member);
    return response.headers().location.split("v1/member/").pop();
  }

  async delete(id: string) {
    if (id == null) {
      return;
    }
    const response = await this.api.delete(this.api.baseUrl + '/umbraco/management/api/v1/member/' + id);
    return response.status();
  }

  async filterAll() {
    return await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/filter/member?orderBy=username&skip=0&take=10000');
  }

  async filterByMemberTypeId(memberTypeId: string) {
    return await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/filter/member?memberTypeId='+ memberTypeId + '&orderBy=username&skip=0&take=100');
  }

  async doesExist(id: string) {
    const response = await this.api.get(this.api.baseUrl + '/umbraco/management/api/v1/member/' + id);
    return response.status() === 200;
  }

  async doesNameExist(name: string) {
    return await this.getByName(name);
  }

  async getByName(name: string) {
    const rootMembers = await this.filterAll();
    const jsonMembers = await rootMembers.json();

    for (const member of jsonMembers.items) {
      if (member.variants[0].name === name) {
        return this.get(member.id);
      }
    }
    return false;
  }

  async ensureNameNotExists(name: string) {
    const rootMembers = await this.filterAll();
    const jsonMembers = await rootMembers.json();

    for (const member of jsonMembers.items) {
      if (member.variants[0].name === name) {
        return this.delete(member.id);
      }
    }
    return null;
  }

  async createDefaultMember(memberName: string, memberTypeId: string, email: string, username: string, password: string) {
    const member = new MemberBuilder()
      .addVariant()
        .withName(memberName)
        .done()
      .withEmail(email)
      .withUsername(username)
      .withPassword(password)
      .withMemberTypeId(memberTypeId)
      .build();
    return await this.create(member);
  }

  async createMemberWithMemberGroup(memberName: string, memberTypeId: string, email: string, username: string, password: string, memberGroupId: string) {
    const member = new MemberBuilder()
      .addVariant()
        .withName(memberName)
        .done()
      .withEmail(email)
      .withUsername(username)
      .withPassword(password)
      .withMemberTypeId(memberTypeId)
      .addGroup(memberGroupId)
      .build();
    return await this.create(member);
  }
}