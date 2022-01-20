import { DataType } from 'src/cms/models/dataTypes/dataType';

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
       * Edit/update a template/view with specific HTML
       * @param  {string} name The name of the template/view to edit
       * @param  {string} content The HTML contents to set for that template/view
       */
      editTemplate: (name: string, content: string) => Chainable<any>;

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
       * Save an Umbraco Macro with a partial
       * @param  {any} macro The Umbraco macro object to save containing the partial view
       * @see MacroBuilder
       */
      saveMacroWithPartial: (macro: any) => Chainable<any>;

      /**
       * Save a Partial View
       * @param  {any} view The Umbraco partial view object to save
       * @see PartialViewBuilder
       */
      savePartialView: (view: any) => Chainable<void>;

      /**
       * Save a Partial View Macro
       * @param  {any} macro The Umbraco Partial View Macro object to save
       * @see PartialViewMacroBuilder
       */
      savePartialViewMacro: (macro: any) => Chainable<any>;

      /**
       * Save Javascript file
       * @param  {any} script The Umbraco Javascript object to save
       * @see ScriptBuilder
       */
      saveScript: (script: any) => Chainable<void>;

      /**
       * Save CSS Stylesheet
       * @param  {any} stylesheet The Umbraco Stylesheet object to save
       * @see StylesheetBuilder
       */
      saveStylesheet: (stylesheet: any) => Chainable<void>;

      /**
       * Save Umbraco Template/View
       * @param  {any} template The Umbraco template/view object to save
       * @see TemplateBuilder
       */
      saveTemplate: (template: any) => Chainable<any>;

      /**
       * Make HTTP requests to Umbraco Backoffice APIs
       * This will remove the junk JSON data & return a nice object
       * @param  {string} url The Url to make the HTTP request for
       * @param  {string} method Such as POST/PUT/GET etc
       * @param  {any} body The body of the request to send in the HTTP request
       * @returns JSON from the API response
       * @example cy.umbracoApiRequest(this.relativeBackOfficePath + '/backoffice/UmbracoApi/ContentType/PostSave', 'POST', docType);
       */
      umbracoApiRequest: (url: string, method: string, body: any) => Chainable<any>;

      /**
       * Gets an Umbraco button HTML element for clicking etc
       * It selects umb-button elements with label-key for the HTML data attribute
       *
       * @param  {string} name The transaltion label-key the button has
       * @example cy.umbracoButtonByLabelKey('buttons_saveAndPublish').click();
       */
      umbracoButtonByLabelKey: (name: string) => Chainable<void>;

      /**
       * Gets a HTML element of a context menu action for clicking etc
       * It selects li.umb-action with data-element attribute
       * @param  {string} actionName The action name key to look for in the [data-element] attribute on li.umb-action
       * @example cy.umbracoContextMenuAction("action-refreshNode").click();
       */
      umbracoContextMenuAction: (actionName: string) => Chainable<void>;
      /**
       * Creates a document type and some content for that document type
       * @param {string} name Name of the given doc type
       * @param {string} alias Alias of the given doc type
       * @param {DataType} dataType of the given doc tpye
       */
      umbracoCreateDocTypeWithContent: (name: string, alias: string, dataType: DataType) => Chainable<void>;
      /**
       * Gets the umbEditorHeader types in the name into the textbox and verifies the alias generated
       * Is in the format we expect it to be generated
       *
       * @param  {string} name The text we want to enter in the name of the umbracoEditorHeader
       * @example cy.umbracoEditorHeaderName('Test member type');
       */
      umbracoEditorHeaderName: (name: string) => Chainable<void>;

      /**
       * Checks to see if DataType with specified name does not exist
       * If it does it will automatically delete it
       * @param  {string} name Name of DataType to delete
       * @example cy.umbracoEnsureDataTypeNameNotExists('Content with macro in grid');
       */
      umbracoEnsureDataTypeNameNotExists: (name: string) => Chainable<void>;

      /**
       * Checks to see if DocumentType with specified name does not exist
       * If it does it will automatically delete it
       * @param  {string} name Name of DocumentType to delete
       * @example cy.umbracoEnsureDocumentTypeNameNotExists('Home');
       */
      umbracoEnsureDocumentTypeNameNotExists: (name: string) => Chainable<void>;
      /**
       * Checks to see if any document types with the specified array
       *  of names does not exist, if it does it will automatically delete it
       * @param {Array<string>} names Names of DocumentTypes to delete
       * @example cy.umbracoEnsureMultipleDocumentTypeNameNotExists(['Home', 'About Us'])
       */
      umbracoEnsureMultipleDocumentTypeNameNotExists: (names: Array<string>) => Chainable<void>;
      /**
       * Checks to see if Language with specified name does not exist
       * If it does it will automatically delete it
       * @param  {string} name Name of Language to delete
       * @example cy.umbracoEnsureLanguageNameNotExists('Kyrgyz (Kyrgyzstan)');
       */
      umbracoEnsureLanguageNameNotExists: (name: string) => Chainable<void>;

      /**
       * Checks to see if Macro with specified name does not exist
       * If it does it will automatically delete it
       * @param  {string} name Name of Macro to delete
       * @example cy.umbracoEnsureMacroNameNotExists('Content with macro in RTE');
       */
      umbracoEnsureMacroNameNotExists: (name: string) => Chainable<void>;

      /**
       * Checks to see if MediaType with specified name does not exist
       * If it does it will automatically delete it
       * @param  {string} name Name of MediaType to delete
       * @example cy.umbracoEnsureMediaTypeNameNotExists('Test media type');
       */
      umbracoEnsureMediaTypeNameNotExists: (name: string) => Chainable<void>;

      /**
       * Checks to see if Member with specified email address does not exist
       * If it does it will automatically delete it
       * @param  {string} email Email address of Member to delete
       * @example cy.umbracoEnsureMemberEmailNotExists('alice-bobson@acceptancetest.umbraco');
       */
      umbracoEnsureMemberEmailNotExists: (email: string) => Chainable<void>;

      /**
       * Checks to see if Member Group with specified name does not exist
       * If it does it will automatically delete it
       * @param  {string} name Name of Member Group to delete
       * @example cy.umbracoEnsureMemberGroupNameNotExists('Test Group');
       */
      umbracoEnsureMemberGroupNameNotExists: (name: string) => Chainable<void>;

      /**
       * Checks to see if Member Type with specified name does not exist
       * If it does it will automatically delete it
       * @param  {string} name Name of Member Type to delete
       * @example cy.umbracoEnsureMemberTypeNameNotExists('Test member type');
       */
      umbracoEnsureMemberTypeNameNotExists: (name: string) => Chainable<void>;

      /**
       * Checks to see if a package with specified name does not exist
       * If it does it will automatically delete it
       * @param  {string} name name of package to delete
       * @example cy.umbracoEnsurePartialViewMacroFileNameNotExists('Test Package');
       */
      umbracoEnsurePackageNameNotExists: (name: string) => Chainable<void>;

      /**
       * Checks to see if Partial View Macro File with specified name does not exist
       * If it does it will automatically delete it
       * @param  {string} filename Filename of Partial View Macro File to delete
       * @example cy.umbracoEnsurePartialViewMacroFileNameNotExists('RTE.cshtml');
       */
      umbracoEnsurePartialViewMacroFileNameNotExists: (filename: string) => Chainable<void>;

      /**
       * Checks to see if Partial View File with specified name does not exist
       * If it does it will automatically delete it
       * @param  {string} filename Filename of Partial View File to delete
       * @example cy.umbracoEnsurePartialViewNameNotExists('navi.cshtml');
       */
      umbracoEnsurePartialViewNameNotExists: (name: string) => Chainable<void>;

      /**
       * Checks to see if Relation Type with specified name does not exist
       * If it does it will automatically delete it
       * @param  {string} name Name of Relation Type to delete
       * @example cy.umbracoEnsureRelationTypeNameNotExists('Test relation type');
       */
      umbracoEnsureRelationTypeNameNotExists: (name: string) => Chainable<void>;

      /**
       * Checks to see if Javascript file with specified name does not exist
       * If it does it will automatically delete it
       * @param  {string} filename Filename of Javascript File to delete
       * @example cy.umbracoEnsureScriptNameNotExists('TestScript.js');
       */
      umbracoEnsureScriptNameNotExists: (filename: string) => Chainable<void>;

      /**
       * Checks to see if CSS file with specified name does not exist
       * If it does it will automatically delete it
       * @param  {string} filename Filename of Javascript File to delete
       * @example cy.umbracoEnsureStylesheetNameNotExists('TestStylesheet.css');
       */
      umbracoEnsureStylesheetNameNotExists: (filename: string) => Chainable<void>;

      /**
       * Checks to see if Template/View file with specified name does not exist
       * If it does it will automatically delete it
       * @param  {string} filename Filename of Javascript File to delete
       * @example cy.umbracoEnsureTemplateNameNotExists('Content with macro in RTE');
       */
      umbracoEnsureTemplateNameNotExists: (name: string) => Chainable<void>;

      /**
       * Checks to see if backoffice User with specified email address does not exist
       * If it does it will automatically delete it
       * @param  {string} email Email address of User to delete
       * @example cy.umbracoEnsureUserEmailNotExists('alice-bobson@acceptancetest.umbraco');
       */
      umbracoEnsureUserEmailNotExists: (email: string) => Chainable<void>;

      /**
       * Checks to see if User Group with specified name does not exist
       * If it does it will automatically delete it
       * @param  {string} name Name of User Group to delete
       * @example cy.umbracoEnsureUserGroupNameNotExists('Test Group');
       */
      umbracoEnsureUserGroupNameNotExists: (name: string) => Chainable<void>;

      /**
       * This checks for the presense of Umbraco error notification banners
       * Will wait upto 6000ms as we may be waiting for a server response
       * @example cy.umbracoErrorNotification().should('be.visible');
       */
      umbracoErrorNotification: () => Chainable<any>;

      /**
       * A handy shortcut to help select the Umbraco global help
       * @example cy.umbracoGlobalHelp().should("be.visible");
       * cy.umbracoGlobalHelp().click();
       */
      umbracoGlobalHelp: () => Chainable<void>;

      /**
       * A handy shortcut to help select the Umbraco global user
       * @example cy.umbracoGlobalUser().click()
       */
      umbracoGlobalUser: () => Chainable<void>;

      /**
       * Clicks its way through the Umbraco installer UI providing username, password and DB connection string
       * @param  {string} username Username for install - fallsback to Cypress.ENV('username')
       * @param  {string} password Password for install - fallsback to Cypress.ENV('password')
       * @param  {string} connectionString Database connection string to use for install - fallsback to Cypress.ENV('connectionString')
       */
      umbracoInstall: (username: string, password: string, connectionString: string) => Chainable<void>;

      /**
       * Perform a login to the Umbraco backoffice
       * Mostly used in beforeEach of cypress intergration tests
       * @param  {string} username Username of Umbraco backoffice login
       * @param  {string} password Passowrd of Umbraco backoffice login
       * @param  {boolean} skipCheckTours Will skip tour prompt on first login - Defaults to false
       * @example cy.umbracoLogin(Cypress.env('username'), Cypress.env('password'));
       */
      umbracoLogin: (username: string, password: string, skipCheckTours: boolean) => Chainable<void>;

      /**
       * Checks to see if Macro with specified name exists
       * @param  {string} name Name of Macro to check for
       * @example cy.umbracoMacroExists('TestPartialViewMacro').should('be.true');
       */
      umbracoMacroExists: (name: string) => Chainable<boolean>;

      /**
       * Checks to see if Partial View with specified name exists
       * @param  {string} filename Name of PartialView to check for
       * @example cy.umbracoPartialViewExists('TestPartialView.cshtml').should('be.true');
       */
      umbracoPartialViewExists: (filename: string) => Chainable<boolean>;
      /**
       *
       */
      umbracoRefreshContentTree: () => Chainable<void>;
      /**
       * Checks to see if Partial View with specified name exists
       * @param  {string} filename Name of Javascript to check for
       * @example cy.umbracoScriptExists('TestScript.js').should('be.true');
       */
      umbracoScriptExists: (filename: string) => Chainable<boolean>;

      /**
       * Automatically clicks the Umbraco section in the backoffice to navigate to it
       * @param  {string} name The name/alias of the section found in [data-element="section-xx"] html selector
       * @example cy.umbracoSection('member');
       * cy.umbracoSection('settings');
       * cy.umbracoSection('users');
       */
      umbracoSection: (name: string) => Chainable<void>;

      /**
       *  This will set the currently logged in Users language
       *
       * @param language The iso code for the language you want
       * @returns The JSON data in the body of the response as an object
       */
      umbracoSetCurrentUserLanguage: (language: string) => Chainable<any>;

      /**
       * Checks to see if CSS file with specified name exists
       * @param  {string} filename Name of CSS file to check for
       * @example cy.umbracoStylesheetExists('TestStylesheet.css').should('be.true');
       */
      umbracoStylesheetExists: (name: string) => Chainable<boolean>;

      /**
       * This checks for the presense of Umbraco success notification banners
       * Will wait upto 6000ms as we may be waiting for a server response
       * @example cy.umbracoSuccessNotification().should('be.visible');
       */
      umbracoSuccessNotification: () => Chainable<void>;

      /**
       * Find an Umbraco tree node to expand and then use to click, rightclick etc
       * @param  {string} treeName Name of tree root to use
       * @param  {string[]} itemNamePathArray A string array of names of nodes to help click through and expand
       * @example cy.umbracoTreeItem("content", ["Home"]).click();
       * cy.umbracoTreeItem("content", ["A-Home", "A-Child"]).click();
       * cy.umbracoTreeItem("settings", ["Data Types"]).rightclick();
       */
      umbracoTreeItem: (treeName: string, itemNamePathArray: string[]) => Chainable<void>;

      /**
       * Visits a page on the public website and compares the HTML output
       * 
       * @param  {string} endpoint URL of frontend page to view and verify content
       * @param  {string} expectedContent Content you expect to be in rendered view on frontend of site
       * @param  {boolean} removeWhiteSpace Boolean to indicate if whitespace should be removed
       * @example const expected = `<h1>Acceptance test</h1><p> </p>`;
        cy.umbracoVerifyRenderedViewContent('/', expected, true).should('be.true');
       */
      umbracoVerifyRenderedViewContent: (
        endpoint: string,
        expectedContent: string,
        removeWhiteSpace: boolean,
      ) => Chainable<boolean>;

      /**
       * This verifies a specific Umbraco JS file contents
       *
       * @param  {string} fileName JS Filename to request
       * @param  {string} expected Expected contents of JS file
       * @returns {boolean} A boolean if expected JS matches requested file
       * @example const expected = '.h1{ color: red;}\n';
       * cy.umbracoVerifyScriptContent("test.js", expected).should('be.true');
       */
      umbracoVerifyScriptContent: (fileName: string, expected: string) => Chainable<boolean>;

      /**
       * This verifies a specific Umbraco CSS file contents
       *
       * @param  {string} fileName CSS Filename to request
       * @param  {string} expected Expected contents of CSS file
       * @returns {boolean} A boolean if expected CSS matches requested file
       * @example
       * cy.umbracoVerifyStylesheetContent('styles.css', expected).should('be.true');
       */
      umbracoVerifyStylesheetContent: (fileName: string, expected: string) => Chainable<boolean>;

      /**
       * Checks to see if a Media entry with specified name does not exist
       * If it does it will automatically delete it
       * @param  {string} name Name of Media entry to delete
       * @example cy.umbracoEnsureMediaNameNotExists('Test Image');
       */
      umbracoEnsureMediaNameNotExists: (name: string) => Chainable<any>;

      /**
       * Saves media to the media section
       * @param media Media object built with the MediaBuilder
       */
      saveMedia: (media: any) => Chainable<void>;

      upload(fileOrArray, processingOpts?): Chainable<Subject>;
    }
  }
}
export class Chainable {}
