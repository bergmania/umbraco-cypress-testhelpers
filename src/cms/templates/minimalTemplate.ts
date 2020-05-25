import { AliasHelper } from '../../helpers/aliasHelper';

export class MinimalTemplate {
  public get(model = '', properties?: { name: string; alias: string }[]): string {
    if (model.length > 0) model = `<${AliasHelper.capitalize(model)}>`;
    let template = `@inherits Umbraco.Web.Mvc.UmbracoViewPage${model}
        @{
            Layout = null;
        }        
        `;
    if (properties?.length > 0) {
      properties.forEach((property) => {
        template += `@Model.Value("${property.alias}")\n`;
      });
    }

    return template;
  }
}
