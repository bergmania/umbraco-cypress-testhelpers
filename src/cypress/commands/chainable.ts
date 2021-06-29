declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject> {
      
      addTextToUsernameInput: (name: string) => Chainable<void>;

      cycleHackWorkaroundForPureLiveIssue: (name: string) => Chainable<void>;

      /**
       * Select a HTML element in the Umbraco backoffice that has a HTML data attribute
       * `<div data-umb="something"></div>` 
       * 
       * If the optional child param is sent then it will return that item as the selcted DOM element
       * 
       * @param  {string} value Value to search for inside the `data-umb` attribute to select the DOM element
       * @param  {string} child Optional HTML element to find inside the element with the data-umb selector such as `h1`
       * @example cy.dataUmb('forms-add-question').click()
       * @returns {Chainable<Element>} A HTML element
       */
      dataUmb(value: string, child?: string): Chainable<Element>;

      dataUmbScope(value: string, child?: string): Chainable<Element>;
      
      /**
       * This will iterate over all top level content nodes in Umbraco and delete them & their children
       * @example cy.deleteAllContent();
       */
      deleteAllContent: () => Chainable<void>;
      
      /**
       * This will iterate over all Forms in Umbraco Forms and delete them
       * @example cy.deleteAllForms();
       */
      deleteAllForms: () => Chainable<void>;
      
      /**
       * This will interate over all Umbraco Forms Datasources and delete them
       * @example cy.deleteAllDataSources();
       */
      deleteAllDataSources: () => Chainable<void>;

      /**
       * This will interate over all Umbraco Forms PreValue sources and delete them
       * @example cy.deleteAllDataSources();
       */
      deleteAllPreValues: () => Chainable<void>;

      /**
       * Deletes an Umbraco content node by its ID
       * @param  {string} id The ID of the content node to delete
       * @example cy.deleteContentById('1234');
       */
      deleteContentById: (id: number) => Chainable<void>;
      
      /**
       * Deletes a specific document type by either its Key or Alias
       * @param  {string} id The `key` or `alias` of the document type to delete 
       * @example cy.deleteDocumentType('myDocType');
       */
      deleteDocumentType: (id: string) => Chainable<void>;

      /**
       * Deletes document type by its id
       * @param  {string} id The id of the document type to delete
       * @example cy.deleteDocumentTypeById('');
       */
      deleteDocumentTypeById: (id: string) => Chainable<void>;

      /**
       * Deletes document types that start with a certain prefix for its name
       * @param  {string} name The prefix used in the document type names that you wish to delete
       * @example cy.deleteDocumentTypesByNamePrefix('My');
       */
      deleteDocumentTypesByNamePrefix: (name: string) => Chainable<void>;

      /**
       * Deletes a specific Umbraco Form type by either its Key or Name
       * @param  {string} name The `key` or `name` of the Umbraco Form to delete 
       * @example cy.deleteForm('Newsletter');
       */
      deleteForm: (name: string) => Chainable<void>;

      deleteFormByGuid: (name: string) => Chainable<void>;
      deleteFormsByNamePrefix: (name: string) => Chainable<void>;
      deletePreValueSourceByGuid: (id: string) => Chainable<void>;
      deleteTemplateById: (name: string) => Chainable<void>;
      deleteTemplatesByNamePrefix: (name: string) => Chainable<void>;
      deleteDataTypesByNamePrefix: (name: string) => Chainable<void>;
      deleteDataTypeById: (name: string) => Chainable<void>;
      getAngular: () => Chainable<any>;
      postFile: (fileName: string, url: string) => Chainable<any>;
      postRequest: (url: string, payload: any) => Chainable<any>;
      saveContent: (param: any) => Chainable<any>;
      saveDataType: (param: any) => Chainable<any>;
      saveDocumentType: (param: any) => Chainable<any>;
      saveForm: (param: any) => Chainable<any>;
      saveTemplate: (param: any) => Chainable<any>;
      umbracoContextMenuAction: (name: string) => Chainable<void>;
      umbracoGlobalHelp: (name: string) => Chainable<void>;
      umbracoGlobalUser: (name: string) => Chainable<void>;
      umbracoInstall: (username: string, password: string, connectionString: string) => Chainable<void>;
      umbracoLogin: (name: string, password: string, umbracoLogin: boolean) => Chainable<void>;
      umbracoSection: (name: string) => Chainable<void>;
      umbracoSuccessNotification: () => Chainable<void>;
      umbracoTreeItem: (name: string, param: string[]) => Chainable<void>;
      umbracoEnsureUserEmailNotExists: (name: string) => Chainable<void>;
      umbracoEnsureMemberEmailNotExists: (name: string) => Chainable<void>;
      umbracoEnsureUserGroupNameNotExists: (name: string) => Chainable<void>;
      umbracoEnsureRelationTypeNameNotExists: (name: string) => Chainable<void>;
      umbracoEnsureDocumentTypeNameNotExists: (name: string) => Chainable<void>;
      umbracoEnsureMediaTypeNameNotExists: (name: string) => Chainable<void>;
      umbracoEnsureMemberTypeNameNotExists: (name: string) => Chainable<void>;
      umbracoEnsureMemberGroupNameNotExists: (name: string) => Chainable<void>;
      umbracoEnsureDataTypeNameNotExists: (name: string) => Chainable<void>;
      umbracoEnsureLanguageNameNotExists: (name: string) => Chainable<void>;
      umbracoEnsureMacroNameNotExists: (name: string) => Chainable<void>;
      umbracoEnsureTemplateNameNotExists: (name: string) => Chainable<void>;
      umbracoEnsurePartialViewNameNotExists: (name: string) => Chainable<void>;
      umbracoEnsurePartialViewMacroFileNameNotExists: (name: string) => Chainable<void>;
      umbracoEnsureStylesheetNameNotExists: (name: string) => Chainable<void>;
      umbracoEnsureScriptNameNotExists: (name: string) => Chainable<void>;
      umbracoButtonByLabelKey: (name: string) => Chainable<void>;
      umbracoEditorHeaderName: (name: string) => Chainable<void>;
      upload(fileOrArray, processingOpts?): Chainable<Subject>;
      umbracoScriptExists: (name: string) => Chainable<boolean>;
      umbracoStylesheetExists: (name: string) => Chainable<boolean>;
      saveScript: (script: any) => Chainable<void>;
      saveStylesheet: (stylesheet: any) => Chainable<void>;
      saveFolder: (section: string, folderName: string) => Chainable<void>;
      umbracoVerifyScriptContent: (name: string, expected: string) => Chainable<boolean>;

      /**
       * This verifies a specific Umbraco CSS file contents
       * 
       * @param  {string} name Filename to request
       * @param  {string} expected Expected contents of CSS file
       * @returns {boolean} A boolean if expected CSS matches requested file
       */
      umbracoVerifyStylesheetContent: (name: string, expected: string) => Chainable<boolean>;
      
      saveMacro: (name: string) => Chainable<any>;

      umbracoPartialViewExists: (name: string) => Chainable<boolean>;

      savePartialView: (view: any) => Chainable<void>;

      umbracoErrorNotification: () => Chainable<any>;

      umbracoMacroExists: (name: string) => Chainable<boolean>;

      savePartialViewMacro: (macro: any) => Chainable<any>;

      umbracoApiRequest: (url: string, method: string, body: any) => Chainable<any>;

      editTemplate: (name: string, content: string) => Chainable<any>;

      umbracoVerifyRenderedViewContent: (endpoint: string, expectedContent: string, removeWhiteSpace: boolean) => Chainable<boolean>;
      
      saveMacroWithPartial: (macro: any) => Chainable<any>;
    }
  }
}
export class Chainable {}
