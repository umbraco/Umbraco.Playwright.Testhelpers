import {VariantBasedApiHelper} from "./VariantBasedApiHelper";
import {MemberBuilder} from "@umbraco/json-models-builders";

export class MemberApiHelper extends VariantBasedApiHelper {
  protected resourcePath = 'member';
  protected filterPath = 'filter/member';

  // Member-specific filter
  async filterByMemberTypeId(memberTypeId: string) {
    return await this.api.get(this.buildFilterUrl('?memberTypeId=' + memberTypeId + '&orderBy=username&skip=0&take=100'));
  }

  async createDefaultMember(memberName: string, memberTypeId: string, email: string, username: string, password: string) {
    await this.ensureNameNotExists(memberName);

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