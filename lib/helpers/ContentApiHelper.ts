import {ApiHelpers} from "./ApiHelpers";
import {JsonHelper} from "./JsonHelper";
import fetch from 'node-fetch';
import {ContentBuilder, DocumentTypeBuilder} from "@umbraco/json-models-builders";

const https = require('https');
const FormData = require('form-data');

export class ContentApiHelper {
  api: ApiHelpers

  constructor(api: ApiHelpers) {
    this.api = api;
  }

  async createDocTypeWithContent(name, alias, dataTypeBuilder) {
    await this.api.dataTypes.save(dataTypeBuilder).then(async (response) => {
      // Create a document type using the data type
      const docType = new DocumentTypeBuilder()
        .withName(name)
        .withAlias(alias)
        .withAllowAsRoot(true)
        .withDefaultTemplate(alias)
        .addGroup()
          .addCustomProperty(response.id)
            .withAlias('umbracoTest')
          .done()
        .done()
        .build();

      this.api.documentTypes.save(docType).then(async (generatedDocType) => {
        const contentNode = new ContentBuilder()
          .withContentTypeAlias(generatedDocType['alias'])
          .addVariant()
            .withName(name)
            .withSave(true)
          .done()
          .build();

        await this.api.content.save(contentNode);
      });
    });
  }

  async deleteAllContent() {
    const response = await this.api.get(this.api.baseUrl + `/umbraco/backoffice/UmbracoTrees/ApplicationTree/GetApplicationTrees?application=content&tree=&use=main`);
    const content = await JsonHelper.getBody(response);

    if (content !== null) {
      for (const child of content.children) {
        if (child.id > 0) {
          await this.deleteById(child.id);
        }
      }
      await this.clearRecycleBin();
    }
  }

  async deleteById(id) {
    await this.api.post(this.api.baseUrl + `/umbraco/backoffice/UmbracoApi/Content/DeleteById?id=${id}`)
  }

  async verifyRenderedContent(endpoint, expectedContent, removeWhitespace = false) {
    for (let i = 0; i < 6; i++) {
      let response = await this.api.get(this.api.baseUrl + endpoint);
      let body = (await response.body()).toString();

      if (removeWhitespace) {
        expectedContent = expectedContent.replace(/\s/g, '');
        body = body.replace(/\s/g, '');
      }
      if( body === expectedContent){
        return true;
      }
      
      console.log("Something went wrong, body did not match expected")
      console.log("Endpoint called: " + this.api.baseUrl + endpoint)
      console.log("Logging response: ")
      console.log(response);
      
      console.log("Logging body:")
      console.log(body)
      await this.api.page.waitForTimeout(5000);
    }

    return false;
  }

  async save(content) {
    const url = this.api.baseUrl + "/umbraco/backoffice/UmbracoApi/Content/PostSave";
    const formData = new FormData();
    formData.append('contentItem', JSON.stringify(content));

    // This is a bit weird, but essentially playwright doesn't handle the way we send content very well.
    // Instead we have to save the content with a normal fetch request, 
    // however this request won't be sent from the browser which is logged in,
    // it'll instead be sent from the runner controlling the browser.
    // What this all means is that we must hijack the cookies of the browser, and use that when sending the request.

    const context = this.api.page.context();
    const cookies = await context.cookies();
    let cookieHeader = "";
    for (const cook of cookies) {
      cookieHeader += cook.name + "=" + cook.value + ";";
    }

    // Since this will mostly be run on local sites, there will be either no SSL certificate, or a self signed one,
    // so make fetch ignore SSL certificate verification.
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
  }

  async getContentId(name: string):Promise<number | null> {
    const response = await this.api.get(this.api.baseUrl + `/umbraco/backoffice/UmbracoTrees/ApplicationTree/GetApplicationTrees?application=content&tree=&use=main`);
    const content = await JsonHelper.getBody(response);

    let contentNameId = null;

    if (content !== null) {
      for (const child of content.children) {
        if (child.name == name) {
          contentNameId = child.id;
        }
      }
    }
    return contentNameId;
  }

  async clearRecycleBin() {
    await this.api.post(this.api.baseUrl + '/umbraco/backoffice/umbracoApi/media/EmptyRecycleBin');
  }
}