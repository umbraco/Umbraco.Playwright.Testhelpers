import faker from 'faker';
import camelize from 'camelize';

/**
 * Used to generate a new template
 * Will generate name, key and alias and virtualPath for view as random UUID
 *
 */
export class Template {
  public id = 0;
  public name: string = faker.random.uuid();
  public key: string = faker.random.uuid();
  public alias: string = 'a' + camelize(this.name);
  public virtualPath: string = '/Views/' + this.alias + '.cshtml';
  public content =
    '@inherits Umbraco.Web.Mvc.UmbracoViewPage\r\n@{\r\n\tLayout = null;\r\n}\r\n\r\n@* the fun starts here *@\r\n\r\n';
  public masterTemplateAlias: string = "";
  public path = '-1';
  public isMasterTemplate = false;
  public notifications = null;
}
