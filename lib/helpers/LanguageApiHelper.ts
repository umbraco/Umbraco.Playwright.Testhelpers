import {BaseApiHelper} from "./BaseApiHelper";

export class LanguageApiHelper extends BaseApiHelper {
  protected resourcePath = 'language';

  // Override - Language uses isoCode as key instead of id
  protected getItemKey(item: any): string {
    return item.isoCode;
  }

  // Override - return response object for getAll (backward compatibility)
  async getAll(): Promise<any> {
    return await this.api.get(this.buildUrl('?skip=0&take=10000'));
  }

  // Override - getByName needs to parse response.json() since getAll returns response
  async getByName(name: string): Promise<any> {
    const allLanguages = await this.getAll();
    const jsonLanguages = await allLanguages.json();

    for (const language of jsonLanguages.items) {
      if (language.name === name && language.isoCode !== null) {
        return await this.get(language.isoCode);
      }
    }
    return null;
  }

  // Override - ensureNameNotExists needs to parse response.json()
  async ensureNameNotExists(name: string): Promise<any> {
    const allLanguages = await this.getAll();
    const jsonLanguages = await allLanguages.json();

    for (const language of jsonLanguages.items) {
      if (language.name === name && language.isoCode !== null) {
        return await this.delete(language.isoCode);
      }
    }
    return null;
  }

  // Language-specific: create with custom signature
  async createLanguage(name: string, isDefault = false, isMandatory = false, isoCode: string, fallbackIsoCode = "en-US") {
    const languageData = {
      "name": name,
      "isDefault": isDefault,
      "isMandatory": isMandatory,
      "fallbackIsoCode": fallbackIsoCode,
      "isoCode": isoCode
    };
    const response = await this.api.post(this.buildUrl(), languageData);
    return response.headers().location.split("/").pop();
  }


  // Override - delete returns response not status
  async delete(isoCode: string): Promise<any> {
    return await this.api.delete(this.buildUrl('/' + isoCode));
  }

  // Override - update returns response
  async update(isoCode: string, language: object): Promise<any> {
    return await this.api.put(this.buildUrl('/' + isoCode), language);
  }

  // Language-specific method
  async ensureIsoCodeNotExists(isoCode: string): Promise<any> {
    const allLanguages = await this.getAll();
    const jsonLanguages = await allLanguages.json();

    for (const language of jsonLanguages.items) {
      if (language.isoCode === isoCode) {
        return await this.delete(language.isoCode);
      }
    }
    return null;
  }

  async createDanishLanguage() {
    await this.ensureNameNotExists('Danish');
    return await this.createLanguage('Danish', false, false, 'da');
  }

  async createVietnameseLanguage() {
    await this.ensureNameNotExists('Vietnamese');
    return await this.createLanguage('Vietnamese', false, false, 'vi');
  }
}