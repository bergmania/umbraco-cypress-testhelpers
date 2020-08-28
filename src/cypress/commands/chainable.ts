declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject> {
      addTextToUsernameInput: (name: string) => Chainable<void>;
      cycleHackWorkaroundForPureLiveIssue: (name: string) => Chainable<void>;
      dataUmb(value: string, child?: string): Chainable<Element>;
      dataUmbScope(value: string, child?: string): Chainable<Element>;
      deleteAllContent: () => Chainable<void>;
      deleteAllForms: (name: string) => Chainable<void>;
      deleteAllDataSources: () => Chainable<void>;
      deleteAllPreValues: () => Chainable<void>;
      deleteContentById: (name: string) => Chainable<void>;
      deleteDocumentType: (name: string) => Chainable<void>;
      deleteDocumentTypeById: (name: string) => Chainable<void>;
      deleteDocumentTypesByNamePrefix: (name: string) => Chainable<void>;
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
      umbracoScriptExists: (name: string) => Chainable<any>;
      saveScript: (script: any) => Chainable<void>;
      saveFolder: (section: string ,folderName: string) => Chainable<void>;
      umbracoVerifyScriptContent: (name: string, expected: string) => Chainable<any>;
    }
  }
}
export class Chainable {}
