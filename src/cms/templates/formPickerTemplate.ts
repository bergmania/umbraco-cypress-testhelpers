import { AliasHelper } from '../../helpers/aliasHelper';

export class FormPickerTemplate {
  /**
   * Generates a HTML Razor View to use with Umbraco Forms.
   * Adds the Umbraco Forms Macro to the template with the
   *
   * @param  {string} formPickerModel Doctype Property Name that contains the Form Picker
   * @param  {string} model Name of model to use in HTML Razor View template. Default value is empty string
   * @param  {{name:string;alias:string}[]} properties Optional array of objects containing `name` and `alias` which will use to print out the Document type property values in the view
   * @returns string  A basic HTML Razor view with Umbraco Forms macro added to the page, with the correct model for the doctype and prints out values for each property
   */
  public get(formPickerModel: string, model = '', properties?: { name: string; alias: string }[]): string {
    if (model.length > 0) model = `<${AliasHelper.capitalize(model)}>`;
    let template = `@inherits Umbraco.Web.Mvc.UmbracoViewPage${model}\n                 
            @using ContentModels = Umbraco.Web.PublishedModels;\n
            @{\n
            \tLayout = null;\n
            }\n
            <html>\n
            \t<head>\n
            \t\t<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.2.4.min.js"></script>\n
            \t\t<script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.min.js"></script>\n
            \t\t<script src="https://ajax.aspnetcdn.com/ajax/mvc/5.1/jquery.validate.unobtrusive.min.js"></script>\n
            \t</head>\n
            \t<body>\n`;
    properties?.forEach((property) => {
      template += `@Model.Value("${property.alias}")\n`;
    });
    template += `\t\t@Umbraco.RenderMacro("renderUmbracoForm", new {FormGuid=Model.${formPickerModel}.ToString(), FormTheme="", ExcludeScripts="0"})`;
    template += ` \t</body>\n
                        </html>\n `;
    return template;
  }
}
