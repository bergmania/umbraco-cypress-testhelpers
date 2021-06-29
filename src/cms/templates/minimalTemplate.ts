import { AliasHelper } from '../../helpers/aliasHelper';

export class MinimalTemplate {
  /**
   * Generates a HTML string for a basic HTML Razor view template
   *
   * @param  {string} model Name of model to use in HTML Razor View template. Default value is empty string
   * @param  {{name:string;alias:string}[]} properties Optional array of objects containing `name` and `alias` which will use to print out the Document type property values in the view
   * @returns string A basic HTML Razor view with the correct model for the doctype and prints out values for each property
   */
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
