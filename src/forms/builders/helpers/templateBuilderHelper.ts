import faker from 'faker';
import { TemplateBuilder, AliasHelper, FormPickerTemplate, MinimalTemplate, Template } from '../../..';
export class TemplateBuilderHelper {
  private getContent(docTypeAlias: string) {
    return `@inherits Umbraco.Web.Mvc.UmbracoViewPage<${AliasHelper.capitalize(docTypeAlias)}>\n
                @using Contentmodels = Umbraco.Web.Publishedmodels;\n
                @{\n
                \tLayout = null;\n
                }\n
                <html>\n
                  \t<head>\n
                  \t\t<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.2.4.min.js"></script>\n
                  \t\t<script src="https://ajax.aspnetcdn.com/ajax/jquery.validate/1.15.0/jquery.validate.min.js"></script>\n
                  \t\t<script src="https://ajax.aspnetcdn.com/ajax/mvc/5.1/jquery.validate.unobtrusive.min.js"></script>\n
                  \t</head>\n
                  \t<body>\n
                  \t\t@Umbraco.RenderMacro("renderUmbracoForm", new {FormGuid=Model.MyFormPicker.ToString(), FormTheme="", ExcludeScripts="0"})
                  \t</body>\n
                </html>\n`;
  }
  public build(templatePrefix: string, docTypeAlias: string) {
    return new TemplateBuilder()
      .withName(templatePrefix + faker.random.uuid())
      .withContent(this.getContent(docTypeAlias))
      .build();
  }
  public buildFormPickerTemplate(
    name: string,
    alias: string,
    formPickerModel: string,
    docTypeAlias: string,
    properties?: { name: string; alias: string }[],
  ) {
    return new TemplateBuilder()
      .withName(name)
      .withAlias(alias)
      .withContent(new FormPickerTemplate().get(formPickerModel, docTypeAlias, properties))
      .build();
  }
  public buildMinimalTemplate(
    name: string,
    alias: string,
    docTypeAlias?: string,
    properties?: { name: string; alias: string }[],
  ) {
    return new TemplateBuilder()
      .withName(name)
      .withAlias(alias)
      .withContent(new MinimalTemplate().get(docTypeAlias, properties))
      .build();
  }
  public insert(template: Template) {
    return cy.saveTemplate(template).then((templateBody) => templateBody);
  }
}
