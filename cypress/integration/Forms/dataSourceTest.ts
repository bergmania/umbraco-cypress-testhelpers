/// <reference types="Cypress" />
import faker from 'faker';
import { DataSources } from '../Shared/datasources';


context('Forms Data sources', () => {

    const dataSources: DataSources = new DataSources();    

    beforeEach(() => {
        cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
        dataSources.cleanUp();        
    });

    afterEach(() => {
        dataSources.cleanUp();        
    });


    it('Test Create Web Service source', () => {
        const dataSourceName = faker.random.word();
        var fixture= { InsertMethod: 'POST', Password: "test",ServiceName:"Add",ServiceUrl:"http://localhost/service.asmx?wsdl",UserName:"test"};
        dataSources.insertWebService(dataSourceName,fixture).then(dataSource => {
            cy.visit(`/umbraco#/forms/datasource/edit/${dataSource.id}`);
            cy.dataUmbScope(`settingstype-pickers-dataSourceType`).its('dataSource.formDataSourceTypeId').should('deep.equal',dataSource.formDataSourceTypeId);
            cy.dataUmbScope(`setting-dataSource_0`,`input`).its('setting.value').should('deep.equal',fixture.ServiceUrl);
            cy.dataUmbScope(`setting-dataSource_1`,`input`).its('setting.value').should('deep.equal',fixture.UserName);
            cy.dataUmbScope(`setting-dataSource_2`,`input`).its('setting.value').should('deep.equal',fixture.Password);
            cy.dataUmbScope(`setting-dataSource_3`,`input`).its('setting.value').should('deep.equal',fixture.ServiceName);
            cy.dataUmbScope(`setting-dataSource_4`,`input`).its('setting.value').should('deep.equal',fixture.InsertMethod);            
        });
    });    
    it('Test CreateSql Database source', () => {
        const dataSourceName = faker.random.word();
        var fixture=  {Connection: 'Server=myServerAddress;Database=myDataBase;User Id=myUsername;Password=myPassword;Provider=sqloledb',Table: 'Test'}
        dataSources.insertSqlDatabase(dataSourceName,fixture).then(dataSource => {            
            cy.visit(`/umbraco#/forms/datasource/edit/${dataSource.id}`).wait(15000).then(()=>{
            cy.dataUmbScope(`settingstype-pickers-dataSourceType`).its('dataSource.formDataSourceTypeId').should('deep.equal',dataSource.formDataSourceTypeId);
            cy.dataUmbScope(`setting-dataSource_0`,`textarea`).its('setting.value').should('deep.equal',fixture.Connection);
            cy.dataUmbScope(`setting-dataSource_1`,`input`).its('setting.value').should('deep.equal',fixture.Table);            
        });
        });
    });    
});
