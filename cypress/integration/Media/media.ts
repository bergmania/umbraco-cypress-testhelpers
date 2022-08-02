/// <reference types="Cypress" />	
context('Media', () => {

    beforeEach(() => {
        cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
        cy.umbracoSection("media");
    });

   
        it('Create folder', () => {
         //const folderName =
            
            cy.get(".dropdown-toggle").contains("Create").click({force: true});
            cy.get('[role="menuitem"]').contains("Folder").click({force: true});
            cy.get('[data-element="editor-name-field"]').type('Media Folder');
            cy.umbracoButtonByLabelKey("buttons_save").click();
        });
        

    it('Create file inside of folder', () => {
        //Wait to ensure the next button is clickable
        cy.wait(1000)
        cy.umbracoTreeItem('media', ['Media Folder']).click();
        cy.get(".dropdown-toggle").contains("Create").click({force: true});
        cy.get('[role="menuitem"]').contains("Folder").click({force: true});
        cy.get('[data-element="editor-name-field"]').type('Folder in folder');
        cy.umbracoButtonByLabelKey("buttons_save").click();
        cy.umbracoEnsureMediaNameNotExists('Media Folder');
       
    });

});