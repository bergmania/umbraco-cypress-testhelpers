import { AliasHelper } from '../../helpers/aliasHelper';

export class FormPickerTemplate {
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
