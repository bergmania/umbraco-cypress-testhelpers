import faker from 'faker';
import camelize from 'camelize';
export class Template {
  public id = 0;
  public name: string = faker.random.uuid();
  public key: string = faker.random.uuid();
  public alias: string = 'a' + camelize(name);
  public virtualPath: string = '/Views/' + this.alias + '.cshtml';
  public content =
    '@inherits Umbraco.Web.Mvc.UmbracoViewPage\r\n@{\r\n\tLayout = null;\r\n}\r\n\r\n@* the fun starts here *@\r\n\r\n';
  public masterTemplateAlias: string = null;
  public path = '-1';
  public isMasterTemplate = false;
  public notifications = null;
}
