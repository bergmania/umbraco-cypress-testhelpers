export class DataSourcesBuilderHelper {
  private readonly dataSourceWebServiceDataSourceId = '7edf567c-4230-4079-b3fb-cca44baf6b75';
  private readonly dataSourceSqlDataSourceId = 'f19506f3-efea-4b13-a308-89348f69df91';

  public insertWebService(
    name: string,
    settings: {
      InsertMethod: string;
      Password: string;
      ServiceName: string;
      ServiceUrl: string;
      UserName: string;
    },
  ) {
    const payload = {
      formDataSourceTypeId: this.dataSourceWebServiceDataSourceId,
      name,
      settings,
    };
    return cy.postRequest('/backoffice/UmbracoForms/DataSource/PostSave', payload).then((postsave) => postsave);
  }

  public insertSqlDatabase(
    name: string,
    settings: {
      Connection: string;
      Table: string;
    },
  ) {
    const payload = {
      formDataSourceTypeId: this.dataSourceSqlDataSourceId,
      name,
      settings,
    };
    return cy.postRequest('/backoffice/UmbracoForms/DataSource/PostSave', payload).then((postsave) => postsave);
  }
  public cleanUp() {
    return cy.deleteAllDataSources();
  }
}
