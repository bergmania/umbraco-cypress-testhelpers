import faker from 'faker';
import camelize from 'camelize';
export class Template {
  public id: number = 0;
  public name: string = faker.random.uuid();
  public key: string = faker.random.uuid();
  public alias: string = 'a' + camelize(name);
  public virtualPath: string = '/Views/' + this.alias + '.cshtml';
  public content: string =
    '@inherits Umbraco.Web.Mvc.UmbracoViewPage\r\n@{\r\n\tLayout = null;\r\n}\r\n\r\n@* the fun starts here *@\r\n\r\n';
  public masterTemplateAlias: string = null;
  public path: string = '-1';
  public isMasterTemplate: boolean = false;
  public notifications = null;
}
