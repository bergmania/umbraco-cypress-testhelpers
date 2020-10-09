/// <reference types="Cypress" />
import { PartialViewMacroBuilder, MacroBuilder, DocumentTypeBuilder, ContentBuilder, AliasHelper, GridDataTypeBuilder } from '../../../src';

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
  
  function createSimpleMacro(name){
    const insertMacro = new PartialViewMacroBuilder()
    .withName(name)
    .withContent(`@inherits Umbraco.Web.Macros.PartialViewMacroPage
<h1>Acceptance test</h1>`)
    .build();
  
  const macroWithPartial = new MacroBuilder()
    .withName(name)
    .withPartialViewMacro(insertMacro)
    .withRenderInEditor()
    .withUseInEditor()
    .build();
  
  cy.saveMacroWithPartial(macroWithPartial);
  }

  it('Create macro', () => {
    const name = "Test macro";

    cy.umbracoEnsureMacroNameNotExists(name);

    cy.umbracoSection('settings');
    cy.get('li .umb-tree-root:contains("Settings")').should("be.visible");

    cy.umbracoTreeItem("settings", ["Macros"]).rightclick();

    cy.umbracoContextMenuAction("action-create").click();

    cy.get('form[name="createMacroForm"]').within(($form) => {
      cy.get('input[name="itemKey"]').type(name);
      cy.get(".btn-primary").click();
    });

    cy.location().should((loc) => {
      expect(loc.hash).to.include('#/settings/macros/edit/')
    });

    //Clean up
    cy.umbracoEnsureMacroNameNotExists(name);
  });

  it('Can insert macro into RTE and have the content displayed', () => {
    const viewMacroName = 'Insert into RTE';
    const partialFileName = viewMacroName + '.cshtml';

    cy.umbracoEnsureMacroNameNotExists(viewMacroName);
    cy.umbracoEnsurePartialViewMacroFileNameNotExists(partialFileName);
    cy.umbracoEnsureDocumentTypeNameNotExists(viewMacroName);
    cy.umbracoEnsureTemplateNameNotExists(viewMacroName);
    cy.deleteAllContent();

    // First thing first we got to create the macro we will be inserting
    createSimpleMacro(viewMacroName);

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

    // Edit the macro template in order to have something to verify on when rendered.
    cy.editTemplate(viewMacroName, `@inherits Umbraco.Web.Mvc.UmbracoViewPage<ContentModels.InsertIntoRte>
@using ContentModels = Umbraco.Web.PublishedModels;
@{
  Layout = null;
}
@{
    if (Model.HasValue("text")){
        @(Model.Value("text"))
    }
} `);
    
    // Enter content
    refreshContentTree();
    cy.umbracoTreeItem("content", [viewMacroName]).click();

    // Insert macro
    cy.get('#mceu_13-button').click();
    cy.get('.umb-card-grid-item').contains(viewMacroName).click();
    
    // Assert that it gets displayed in editor
    cy.get('iframe', { timeout: 20000 }).then($iframe => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body).contains('Acceptance test', {timeout: 20000}).should('be.visible');
    });

    // Save and publish
    cy.umbracoButtonByLabelKey('buttons_saveAndPublish').click();
    cy.umbracoSuccessNotification().should('be.visible');

    // Ensure that the view gets rendered correctly
    const expected = `<h1>Acceptance test</h1><p> </p>`;
    cy.umbracoVerifyRenderedViewContent('/', expected, true).should('be.true');

    // Cleanup
    cy.umbracoEnsureMacroNameNotExists(viewMacroName);
    cy.umbracoEnsurePartialViewMacroFileNameNotExists(partialFileName);
    cy.umbracoEnsureDocumentTypeNameNotExists(viewMacroName);
    cy.umbracoEnsureTemplateNameNotExists(viewMacroName);
  });

  it('Insert macro into grid', () => {
    const name = 'Insert macro into grid';
    const macroName = 'Grid macro';
    const macroFileName = macroName + '.cshtml';
    
    cy.umbracoEnsureDataTypeNameNotExists(name);
    cy.umbracoEnsureDocumentTypeNameNotExists(name);
    cy.umbracoEnsureTemplateNameNotExists(name);
    cy.umbracoEnsureMacroNameNotExists(macroName);
    cy.umbracoEnsurePartialViewMacroFileNameNotExists(macroFileName);
    cy.deleteAllContent();

    createSimpleMacro(macroName);

    const grid = new GridDataTypeBuilder()
      .withName(name)
      .withDefaultGrid()
      .build();

    const alias = AliasHelper.toAlias(name);
    // Save grid and get the ID 
    cy.saveDataType(grid).then((dataType) => {
      // Create a document type using the data type
      const docType = new DocumentTypeBuilder()
        .withName(name)
        .withAlias(alias)
        .withAllowAsRoot(true)
        .withDefaultTemplate(alias)
          .addGroup()
            .addCustomProperty(dataType['id'])
              .withAlias('grid')
          .done()
        .done()
        .build();
      
      cy.saveDocumentType(docType).then((generatedDocType) => {
        const contentNode = new ContentBuilder()
          .withContentTypeAlias(generatedDocType["alias"])
          .addVariant()
            .withName(name)
            .withSave(true)
          .done()
          .build();
        
          cy.saveContent(contentNode);
      });
    });

    // Edit the template to allow us to verify the rendered view
    cy.editTemplate(name, `@inherits Umbraco.Web.Mvc.UmbracoViewPage<ContentModels.InsertMacroIntoGrid>
@using ContentModels = Umbraco.Web.PublishedModels;
@{
  Layout = null;
}
@Html.GetGridHtml(Model, "grid")`);

    // Act
    // Enter content
    refreshContentTree();
    cy.umbracoTreeItem("content", [name]).click();
    // Click add
    cy.get(':nth-child(2) > .preview-row > .preview-col > .preview-cell').click();
    cy.get('.umb-column > .templates-preview > :nth-child(2) > .preview-overlay').click();
    cy.get('.umb-cell-placeholder').click();
    // Click macro
    cy.get(':nth-child(4) > .umb-card-grid-item > :nth-child(1)').click();
    // Select the macro
    cy.get('.umb-card-grid-item').contains(macroName).click();

    // Assert that it gets displayed in the grid
    cy.get('.umb-editor-placeholder').contains('Acceptance test', {timeout: 20000}).should('be.visible');

    // Save and publish
    cy.umbracoButtonByLabelKey('buttons_saveAndPublish').click();
    cy.umbracoSuccessNotification().should('be.visible');

    const expected = `
    <div class="umb-grid">
                <div class="grid-section">
    <div >
            <div class="container">
        <div class="row clearfix">
            <div class="col-md-12 column">
                <div >
                            
    

    
        <h1>Acceptance test</h1>
    


                </div>
            </div>        </div>
            </div>
    </div>
                </div>
    </div>`

    cy.umbracoVerifyRenderedViewContent('/', expected, true).should('be.true');

    // Clean 
    cy.umbracoEnsureDataTypeNameNotExists(name);
    cy.umbracoEnsureDocumentTypeNameNotExists(name);
    cy.umbracoEnsureTemplateNameNotExists(name);
    cy.umbracoEnsureMacroNameNotExists(macroName);
    cy.umbracoEnsurePartialViewMacroFileNameNotExists(macroFileName);
  });
});
