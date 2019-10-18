export default class UmbracoLogin{
  relativeBackOfficePath;
  cy;
  cypress;
  constructor(relativeBackOfficePath, cy, cypress){
    this.relativeBackOfficePath = relativeBackOfficePath;
    this.cy = cy;
    this.cypress = cypress;
  }

  getCy() {
    if (typeof this.cy !== 'undefined') {
      return this.cy;
    }
    return cy;
  }

  getCypress() {
    if (typeof this.cypress !== 'undefined') {
      return this.cypress;
    }
    return Cypress;
  }


  method(username, password) {
    const cy = this.getCy();
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.request({
      method: 'POST',
      url: this.relativeBackOfficePath + '/backoffice/UmbracoApi/Authentication/PostLogin',
      followRedirect: false,
      body: {
        username: username,
        password: password,
      },
      headers: {
        contentType: "application/json"
      }
    }).then((response) => {
      cy.visit(this.relativeBackOfficePath+'umbraco/').then($page => {
        cy.log("$page", $page);
      });

      cy.get('body').should($body => {
        if($body.hasClass('umb-tour-is-visible')){
          cy.get('.umb-tour-step__close').click();
        }
      });
    });
  }

  registerCommand() {
    this.getCypress().Commands.add('umbracoLogin', (username, password) => {
      this.method(username, password)
    });
    ///////////
//
//     Cypress.Commands.add('addTextToUsernameInput', (username) => {
//       cy.get('input[name="username"]').type(username).should('have.value', username);
//     });
//
//     Cypress.Commands.add('addTextToPasswordInput', (password, doNotEndWithEnter) => {
//
//       if(doNotEndWithEnter !== true){
//         cy.get('input[name="password"]:visible').type(password + '{enter}').should('have.value', password);
//       }
//       else{
//         cy.get('input[name="password"]:visible').type(password).should('have.value', password);
//       }
//
//     });
//
//     Cypress.Commands.add('globalUser', () => {
//       cy.get('[data-element="global-user"]');
//     });
//
//
//
//     Cypress.Commands.add('globalHelp', () => {
//       cy.get('[data-element="global-help"]');
//     });
//
//
//     Cypress.Commands.add('saveDocumentType', (docType) => {
//       cy.request({
//         method: 'POST',
//         url: '/umbraco/backoffice/UmbracoApi/ContentType/PostSave',
//         body: docType,
//         timeout: 90000,
//         json: true,
//       }).then((response) => {
//         return _getBody(response);
//       });
//     });
//
//     function _getBody(response){
//       return JSON.parse(response.body.substr(6));
//     }
//
//     Cypress.Commands.add('deleteDocumentType', (id) => {
//
//       if(id == null){
//         return;
//       }
//
//       if (typeof id === 'string' || id instanceof String){
//         cy.request({
//           method: 'GET',
//           url: '/umbraco/backoffice/UmbracoApi/ContentType/GetAll',
//         }).then((response) => {
//           var documentTypes = _getBody(response);
//
//           for (var i = 0; i<documentTypes.length;i++){
//             if(documentTypes[i].alias === id || documentTypes[i].key === id){
//               cy.deleteDocumentTypeById(documentTypes[i].id);
//               break;
//             }
//           }
//
//
//         });
//       }else{ // assume int
//         cy.deleteDocumentTypeById(id);
//       }
//
//     });
//
//     Cypress.Commands.add('deleteDocumentTypeById', (id) => {
//
//       cy.request({
//         method: 'POST',
//         url: '/umbraco/backoffice/UmbracoApi/ContentType/DeleteById?id=' + id,
//         timeout: 150000,
//         headers: {
//           contentType: "application/json"
//         }
//       }).then((response) => {
//
//       });
//
//     });
//
//
//
//
//     Cypress.Commands.add('section', (name) => {
//
//       return cy.get('[data-element="section-'+Helpers.camelize(name)+'"]');
//
//     });
//
//
//     Cypress.Commands.add('treeItem', (treeName, itemNamePath1, itemNamePath2, itemNamePath3) => {
//
//
//       cy.log("treeItem");
//
//       if(itemNamePath3){
//         //todo
//       }
//
//       if(itemNamePath2){
//
//         cy.get('.umb-tree li')
//           .contains(treeName)
//           .closest('li')
//           .find(".umb-tree-item__label")
//           .contains(itemNamePath1)
//           .closest('li')
//           .find("[data-element=\"tree-item-expand\"]")
//           .click();
//
//
//         return cy.get('.umb-tree li')
//           .contains(treeName)
//           .closest('li')
//           .find(".umb-tree-item__label")
//           .contains(itemNamePath1)
//           .closest('li')
//           .find('ul li .umb-tree-item__label')
//           .contains(itemNamePath2)
//           .closest('li');
//       }
//
//
//       return cy.get('.umb-tree li')
//         .contains(treeName)
//         .closest('li')
//         .find(".umb-tree-item__label")
//         .contains(itemNamePath1)
//         .closest('li')
//
//     });
//
//     Cypress.Commands.add('contextmenu', {
//       prevSubject: true
//     }, ($subject, method) => {
//
//       const e = document.createEvent('HTMLEvents');
//       e.initEvent('contextmenu', true, false);
//       $subject[0].dispatchEvent(e);
//     });
//
//
//
// ///////////////// Forms /////////////////////
//
// /////////////////  Date type  //////////////
//
//
//
//     Cypress.Commands.add('deleteForm', (id) => {
//
//       if(id == null){
//         return;
//       }
//
//       if (typeof id === 'string' || id instanceof String){
//         cy.request({
//           method: 'GET',
//           url: '/umbraco/backoffice/UmbracoForms/FormTree/GetNodes?id=-1&application=forms&tree=&use=main&culture=',
//         }).then((response) => {
//           var forms = _getBody(response);
//
//           for (var i = 0; i<forms.length;i++){
//             if(forms[i].name === id || forms[i].key === id){
//               cy.deleteFormByGuid(forms[i].id);
//               break;
//             }
//           }
//
//
//         });
//       }else{ // assume guid
//         cy.deleteFormByGuid(id);
//       }
//
//     });
//
//     Cypress.Commands.add('deleteAllForms', () => {
//
//       cy.request({
//         method: 'GET',
//         url: '/umbraco/backoffice/UmbracoForms/FormTree/GetNodes?id=-1&application=forms&tree=&use=main&culture=',
//       }).then((response) => {
//         var forms = _getBody(response);
//
//         for (var i = 0; i<forms.length;i++){
//           cy.deleteFormByGuid(forms[i].id);
//         }
//
//
//       });
//     });
//
//
//
//     Cypress.Commands.add('deleteFormByGuid', (guid) => {
//
//       cy.request({
//         method: 'DELETE',
//         url: 'https://cypress.s1.umbraco.io/umbraco/backoffice/UmbracoForms/Form/DeleteByGuid?guid=' + guid,
//         timeout: 150000,
//         failOnStatusCode: false,
//         json:true,
//       }).then((response) => {
//
//       });
//
//     });
//
//
//
//
//     Cypress.Commands.add('saveForm', (obj) => {
//
//       if(obj == null){
//         return;
//       }
//
//       return cy.request({
//         method: 'POST',
//         url: '/umbraco/backoffice/UmbracoForms/Form/SaveForm',
//         body: obj,
//         json: true,
//       }).then((response) => {
//         return _getBody(response);
//       });
//
//     });
//
//
//     Cypress.Commands.add('saveDataType', (obj) => {
//       if(obj == null){
//         return;
//       }
//       cy.request({
//         method: 'POST',
//         url: '/umbraco/backoffice/UmbracoApi/DataType/PostSave',
//         body: obj,
//         timeout: 90000,
//         json:true,
//       }).then((response) => {
//         return _getBody(response);
//       });
//     });
//



    ////////////////

  }
}

