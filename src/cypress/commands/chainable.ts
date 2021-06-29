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

      /**
       * Deletes a specific Umbraco Form type by its ID
       * @param  {string} id The id of the Umbraco Form to delete
       */
      deleteFormByGuid: (id: string) => Chainable<void>;

      /**
       * Deletes Umbraco Forms that start with a certain prefix for its name
       * @param  {string} name The prefix used for the name of Umbraco Forms that you wish to delete
       * @example cy.deleteFormsByNamePrefix('Campaign');
       */
      deleteFormsByNamePrefix: (name: string) => Chainable<void>;

      /**
       * Deletes Umbraco Forms PreValue Source by its ID
       * @param  {string} id The ID of the Umbraco Forms PreValue source you wish to delete
       */
      deletePreValueSourceByGuid: (id: string) => Chainable<void>;

      /**
       * Deletes Umbraco Template/View by its id
       * @param  {string} id The ID of the Umbraco Template/view you wish to delete
       */
      deleteTemplateById: (id: string) => Chainable<void>;

      /**
       * Deletes Umbraco Templates/views that start with a certain prefix for its name
       * @param  {string} name The prefix used for the name of Umbraco templates/views that you wish to delete
       * @example cy.deleteTemplatesByNamePrefix('blog');
       */
      deleteTemplatesByNamePrefix: (name: string) => Chainable<void>;

      /**
       * Deletes Umbraco DataTypes that start with a certain prefix for its name
       * @param  {string} name The prefix used for the name of Umbraco content datatypes that you wish to delete
       * @example cy.deleteDataTypesByNamePrefix('home');
       */
      deleteDataTypesByNamePrefix: (name: string) => Chainable<void>;

      /**
       * Deletes Umbraco DataType by its id
       * @param  {string} id The id of the datatype to delete
       */
      deleteDataTypeById: (id: string) => Chainable<void>;

      /**
       * Gets the global AngularJS library found on the window object
       * So that it can be used
       */
      getAngular: () => Chainable<any>;

      /**
       * Upload a file to a specific URL endpoint relative to Umbraco backoffice
       * @param  {string} fileName This filename is for a file located in the cypress fixture folder `fixturesFolder` which by default is `cypress/fixtures/`
       * @param  {string} url The URL to POST the file to
       * @example cy.postFile('prevaluesource.txt', '/backoffice/UmbracoForms/PreValueFile/PostAddFile')
       * @returns This returns the JSON body from the POST request
       */
      postFile: (fileName: string, url: string) => Chainable<any>;

      /**
       * Makes a HTTP POST request to a specific URL endpoint relative to Umbraco backoffice
       * @param  {string} url The URL to POST the data to
       * @param  {any} payload The data to POST to the URL such as simple string or JSON object
       * @example cy.postRequest('/backoffice/UmbracoForms/PreValueSource/PostSave', {name: 'Some Name'});
       * @returns This returns the JSON body from the POST request
       */
      postRequest: (url: string, payload: any) => Chainable<any>;

      /**
       * Save Umbraco Content Node
       * **Note** This must be the entire content object that gets sent to the server
       * @param  {any} content The JSON object for the entire content node
       * @see ContentBuilder to help create the object you need
       */
      saveContent: (content: any) => Chainable<any>;

      /**
       * Save Umbraco DataType
       * @param  {any} datatype The datatype object to save
       * @see DataTypesBuilderHelper
       */
      saveDataType: (datatype: any) => Chainable<any>;

      /**
       * Save Umbraco Document Type
       * @param  {any} doctype The doctype object to save
       * @see DocumentTypeBuilder
       */
      saveDocumentType: (doctype: any) => Chainable<any>;

      /**
       * Creates a folder in either Stylesheets or Scripts
       * @param  {string} section This should be set to 'scripts' or 'stylesheets'
       * @param  {string} folderName The name of the folder you wish to create
       * @example cy.saveFolder('scripts', 'my-awesome-js-code');
       */
      saveFolder: (section: string, folderName: string) => Chainable<void>;

      /**
       * Save an Umbraco Form
       * @param  {any} form The Umbraco Form object to save
       * @see FormBuilder
       */
      saveForm: (form: any) => Chainable<any>;

      /**
       * Saves an Umbraco Macro
       * @param  {string} name A name to give the new Umbraco macro
       * @example cy.saveMacro('InsertMacroTest');
       */
      saveMacro: (name: string) => Chainable<any>;

      /**
       * Save an Umbraco Macro with a parital
       * @param  {any} macro The Umbraco macro object to save containing the partial view
       * @see MacroBuilder
       */
      saveMacroWithPartial: (macro: any) => Chainable<any>;

      savePartialView: (view: any) => Chainable<void>;

      savePartialViewMacro: (macro: any) => Chainable<any>;
      saveScript: (script: any) => Chainable<void>;
      saveStylesheet: (stylesheet: any) => Chainable<void>;
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

      umbracoVerifyScriptContent: (name: string, expected: string) => Chainable<boolean>;

      /**
       * This verifies a specific Umbraco CSS file contents
       *
       * @param  {string} name Filename to request
       * @param  {string} expected Expected contents of CSS file
       * @returns {boolean} A boolean if expected CSS matches requested file
       */
      umbracoVerifyStylesheetContent: (name: string, expected: string) => Chainable<boolean>;
      umbracoPartialViewExists: (name: string) => Chainable<boolean>;
      umbracoErrorNotification: () => Chainable<any>;
      umbracoMacroExists: (name: string) => Chainable<boolean>;
      umbracoApiRequest: (url: string, method: string, body: any) => Chainable<any>;
      editTemplate: (name: string, content: string) => Chainable<any>;
      umbracoVerifyRenderedViewContent: (
        endpoint: string,
        expectedContent: string,
        removeWhiteSpace: boolean,
      ) => Chainable<boolean>;
    }
  }
}
export class Chainable {}
