/// <reference types="Cypress" />
import {
    AliasHelper,
    ApprovedColorPickerDataTypeBuilder,
    CheckBoxListDataTypeBuilder,
    DocumentTypeBuilder,
    MemberBuilder,
    Member
} from '../../../src';

context('DataTypes', () => {
  
    let name = '';

    beforeEach(() => {
        cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'), false);
      });

    
    // afterEach(() => {
    //   cy.umbracoEnsureDataTypeNameNotExists(name);
    //   cy.umbracoEnsureDocumentTypeNameNotExists(name);
    //   cy.umbracoEnsureTemplateNameNotExists(name);
    // });


    // it('Tests Approved Colors', () => {
    //     cy.deleteAllContent();
    //     name = 'Approved Colour Test';
    //     const alias = AliasHelper.toAlias(name);

    //     cy.umbracoEnsureDocumentTypeNameNotExists(name);
    //     cy.umbracoEnsureDataTypeNameNotExists(name);

    //     const pickerDataType = new ApprovedColorPickerDataTypeBuilder()
    //         .withName(name)
    //         .withPrevalues(['000000', 'FF0000'])
    //         .build()

    //     //umbracoMakeDocTypeWithDataTypeAndContent(name, alias, pickerDataType);
    //     cy.umbracoCreateDocTypeWithContent(name, alias, pickerDataType);
    //     //Editing template with some content
    //     cy.editTemplate(name, '@inherits Umbraco.Web.Mvc.UmbracoViewPage<ContentModels.ApprovedColourTest>' +
    //         '\n@using ContentModels = Umbraco.Web.PublishedModels;' +
    //         '\n@{' +
    //         '\n    Layout = null;' +
    //         '\n}' +
    //         '\n<p style="color:@Model.UmbracoTest">Lorem ipsum dolor sit amet</p>');

    //     // Act
    //     // Enter content
    //     cy.umbracoRefreshContentTree();
    //     cy.umbracoTreeItem("content", [name]).click();
    //     //Pick a colour
    //     cy.get('.btn-000000').click();
    //     //Save 
    //     cy.umbracoButtonByLabelKey('buttons_saveAndPublish').click();
    //     cy.umbracoSuccessNotification().should('be.visible');
    //     //Assert
    //     const expected = `<p style="color:000000" > Lorem ipsum dolor sit amet </p>`;
    //     cy.umbracoVerifyRenderedViewContent('/', expected, true).should('be.true');

    //     //Pick another colour to verify both work
    //     cy.get('.btn-FF0000').click();
    //     //Save 
    //     cy.umbracoButtonByLabelKey('buttons_saveAndPublish').click();
    //     cy.umbracoSuccessNotification().should('be.visible');
    //     //Assert
    //     cy.wait(2000);
    //     const expected2 = '<p style="color:FF0000">Lorem ipsum dolor sit amet</p>';
    //     cy.umbracoVerifyRenderedViewContent('/', expected2, true).should('be.true');
    // });


    // it('Tests Checkbox List', () => {
    //     name = 'CheckBox List';
    //     const alias = AliasHelper.toAlias(name); 

    //     cy.umbracoEnsureDocumentTypeNameNotExists(name);
    //     cy.umbracoEnsureDataTypeNameNotExists(name);
    //     cy.deleteAllContent();

    //     const pickerDataType = new CheckBoxListDataTypeBuilder()
    //     .withName(name)
    //     .withPrevalues(['Choice 1', 'Choice 2'])
    //     .build()

    //     cy.umbracoCreateDocTypeWithContent(name, alias, pickerDataType);
    //     // Act
    //     cy.editTemplate(name, `
    //     @inherits Umbraco.Web.Mvc.UmbracoViewPage<ContentModels.CheckboxList>
    //     @using ContentModels = Umbraco.Web.PublishedModels;
    //     @{
    //     	Layout = null;
    //     }
    //     @foreach(var s in Model.UmbracoTest){
    //     <input type="checkbox" id="@s" name="@s" value="@s">
    //     <label for="@s">@s</label><br>
    //     }
    //     `);
    //     // Enter content
    //     cy.umbracoRefreshContentTree();
    //     cy.umbracoTreeItem("content", [name]).click();
    //     //Check box 1 & 2
    //     cy.get('.checkbox').first().click();
    //     cy.get('.checkbox').last().click();
    //     //Save
    //     cy.umbracoButtonByLabelKey('buttons_saveAndPublish').click();
    //     cy.umbracoSuccessNotification().should('be.visible');
        
    //     const expectedResult = `<input type="checkbox" id="Choice 1" name="Choice 1" value="Choice 1">
    //     <label for="Choice 1">Choice 1</label><br>
    //     <input type="checkbox" id="Choice 2" name="Choice 2" value="Choice 2">
    //     <label for="Choice 2">Choice 2</label><br>`

    //     cy.umbracoVerifyRenderedViewContent('/', expectedResult, true).should('be.true');
    // });


    // it('Tests Date Picker', () => {
    //     name = 'CheckBox List';
    //     const alias = AliasHelper.toAlias(name); 

    //     cy.umbracoEnsureDocumentTypeNameNotExists(name);
    //     cy.umbracoEnsureDataTypeNameNotExists(name);
    //     cy.deleteAllContent()

    //     const pickerDocType = new DocumentTypeBuilder()
    //         .withName(name)
    //         .withAlias(alias)
    //         .withAllowAsRoot(true)
    //         .withDefaultTemplate(alias)
    //         .addGroup()
    //             .withName('ContentPickerGroup')
    //             .addDatePickerProperty()
    //                 .withAlias('picker')
    //             .done()
    //         .done()
    //         .build();

    //     cy.saveDocumentType(pickerDocType);
    //     //Act

    //     cy.editTemplate(name, 
    //       `
    //     @inherits Umbraco.Web.Mvc.UmbracoViewPage<ContentModels.CheckboxList>
    //     @using ContentModels = Umbraco.Web.PublishedModels;
    //     @{
    //       Layout = null;
    //     }
    //     <h1>The current date is: @Model.Picker.ToString("d/M/yyyy")</h1>`);

    //     // Create content with url picker
    //     cy.get('li .umb-tree-root:contains("Content")').should("be.visible").rightclick();
    //     cy.get('[data-element="action-create"]').click();
    //     cy.get('[data-element="action-create-' + alias + '"] > .umb-action-link').click();
    //     // Fill out content
    //     cy.umbracoEditorHeaderName('Date Picker Content');
    //     cy.get('.add-on').click();
    //     cy.get('.today').click();
    //     cy.umbracoButtonByLabelKey('buttons_saveAndPublish').click();
    //     cy.umbracoSuccessNotification().should('be.visible');
    //     const date: Date = new Date();
    //     const expectedResult = `<h1>The current date is: ` + (date.getUTCDate()) + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() +'</h1>';
    //     cy.umbracoVerifyRenderedViewContent('/', expectedResult, true).should('be.true');
    // });


    it('Tests Member Picker', () => {
      name = 'CheckBox List';
      const alias = AliasHelper.toAlias(name); 

      const newMember = new MemberBuilder(new Member())
      .withEmail('test@mail.com')
      .withUsername('Zeegan')
      .withName('Nikolaj')
      .withPassword('Password1234')
      .build();
      cy.saveMember(newMember);
  });


});