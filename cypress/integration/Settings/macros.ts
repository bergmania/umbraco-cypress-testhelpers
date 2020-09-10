/// <reference types="Cypress" />
import { PartialViewMacroBuilder, MacroBuilder, DocumentTypeBuilder, ContentBuilder, AliasHelper } from '../../../src';

context('Macros', () => {

  beforeEach(() => {
    cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
  });

  function refreshContentTree(){
    // Refresh to update the tree
    cy.get('li .umb-tree-root:contains("Content")').should("be.visible").rightclick();
    cy.umbracoContextMenuAction("action-refreshNode").click();
    // We have to wait in case the execution is slow, otherwise we'll try and click the item before it appears in the UI
    cy.get('.umb-tree-item__inner').should('exist', {timeout: 10000});
}

  // it('Create macro', () => {
  //   const name = "Test macro";

  //   cy.umbracoEnsureMacroNameNotExists(name);

  //   cy.umbracoSection('settings');
  //   cy.get('li .umb-tree-root:contains("Settings")').should("be.visible");

  //   cy.umbracoTreeItem("settings", ["Macros"]).rightclick();

  //   cy.umbracoContextMenuAction("action-create").click();

  //   cy.get('form[name="createMacroForm"]').within(($form) => {
  //     cy.get('input[name="itemKey"]').type(name);
  //     cy.get(".btn-primary").click();
  //   });

  //   cy.location().should((loc) => {
  //     expect(loc.hash).to.include('#/settings/macros/edit/')
  //   });

  //   //Clean up
  //   cy.umbracoEnsureMacroNameNotExists(name);
  // });

  it('Can insert macro into RTE and have the content displayed', () => {
    const viewMacroName = 'Insert into RTE';
    const partialFileName = viewMacroName + '.cshtml';

    cy.umbracoEnsureMacroNameNotExists(viewMacroName);
    cy.umbracoEnsurePartialViewMacroFileNameNotExists(partialFileName);
    cy.umbracoEnsureDocumentTypeNameNotExists(viewMacroName);
    cy.umbracoEnsureTemplateNameNotExists(viewMacroName);
    cy.deleteAllContent();

    // First thing first we got to create the macro we will be inserting
    const insertMacro = new PartialViewMacroBuilder()
      .withName(viewMacroName)
      .withContent(`@inherits Umbraco.Web.Macros.PartialViewMacroPage
<h1>Acceptance test</h1>`)
      .build();
    
    const macroWithPartial = new MacroBuilder()
      .withName(viewMacroName)
      .withPartialViewMacro(insertMacro)
      .withRenderInEditor()
      .withUseInEditor()
      .build();
    
    cy.saveMacroWithPartial(macroWithPartial);

    // Now we need to create a document type with a rich text editor where we can insert the macro
    // The document type must have a template as well in order to ensure that the content is displayed correctly
    const alias = AliasHelper.toAlias(viewMacroName);
    const docType = new DocumentTypeBuilder()
      .withName(viewMacroName)
      .withAlias(alias)
      .withAllowAsRoot(true)
      .withDefaultTemplate(alias)
      .addGroup()
      .addRichTextProperty()
      .withAlias('text')
      .done()
      .done()
      .build();
    
    cy.saveDocumentType(docType).then((generatedDocType) => {
      // Might as wel initally create the content here, the less GUI work during the test the better
      const contentNode = new ContentBuilder()
        .withContentTypeAlias(generatedDocType["alias"])
        .withAction('saveNew')
        .addVariant()
        .withName(viewMacroName)
        .withSave(true)
        .done()
        .build();
      
      cy.saveContent(contentNode);
    });

    cy.editTemplate(viewMacroName, `@inherits Umbraco.Web.Mvc.UmbracoViewPage<ContentModels.InsertIntoRte>
@using ContentModels = Umbraco.Web.PublishedModels;
@{
  Layout = null;
}
@{
    if (Model.HasValue("text")){
        <p>@(Model.Value("text"))</p>
    }
} `);
    
    refreshContentTree();
    cy.umbracoTreeItem("content", [viewMacroName]).click();
    cy.get('#mceu_13-button').click();
    cy.get('.umb-card-grid-item').click();
    cy.get('iframe', { timeout: 20000 }).then($iframe => {
      debugger;
      const $body = $iframe.contents().find('body');
      cy.wrap($body).contains('Acceptance test');
    });
    
    // cy.umbracoEnsureMacroNameNotExists(viewMacroName);
    // cy.umbracoEnsurePartialViewMacroFileNameNotExists(partialFileName);
    // cy.umbracoEnsureDocumentTypeNameNotExists(viewMacroName);
    // cy.umbracoEnsureTemplateNameNotExists(viewMacroName);

  });
});
