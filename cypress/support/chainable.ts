declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      addTextToUsernameInput: (name: string) => Chainable<void>;
      cycleHackWorkaroundForPureLiveIssue: (name: string) => Chainable<void>;
      deleteAllForms: (name: string) => Chainable<void>;
      deleteDocumentType: (name: string) => Chainable<void>;
      deleteDocumentTypeById: (name: string) => Chainable<void>;
      deleteDocumentTypesByNamePrefix: (name: string) => Chainable<void>;
      deleteForm: (name: string) => Chainable<void>;
      deleteFormByGuid: (name: string) => Chainable<void>;
      deleteFormsByNamePrefix: (name: string) => Chainable<void>;
      deleteTemplateById: (name: string) => Chainable<void>;
      deleteTemplatesByNamePrefix: (name: string) => Chainable<void>;
      deleteDataTypesByNamePrefix: (name: string) => Chainable<void>;
      deleteDataTypeById: (name: string) => Chainable<void>;
      saveContent: (param: any) => Chainable<any>;
      saveDataType: (param: any) => Chainable<any>;
      saveDocumentType: (nparam: any) => Chainable<any>;
      saveForm: (param: any) => Chainable<any>;
      saveTemplate: (param: any) => Chainable<any>;
      umbracoContextMenuAction: (name: string) => Chainable<void>;
      umbracoGlobalHelp: (name: string) => Chainable<void>;
      umbracoGlobalUser: (name: string) => Chainable<void>;
      umbracoLogin: (name: string, password: string) => Chainable<void>;
      umbracoSection: (name: string) => Chainable<void>;
      umbracoSuccessNotification: () => Chainable<void>;
      umbracoTreeItem: (name: string, param: string[]) => Chainable<void>;
      umbracoEnsureUserEmailNotExists: (name: string) => Chainable<void>;
      umbracoEnsureUserGroupNameNotExists: (name: string) => Chainable<void>;
      umbracoEnsureRelationTypeNameNotExists: (name: string) => Chainable<void>;
      umbracoEnsureDocumentTypeNameNotExists: (name: string) => Chainable<void>;
      umbracoEnsureMediaTypeNameNotExists: (name: string) => Chainable<void>;
      umbracoEnsureMemberTypeNameNotExists: (name: string) => Chainable<void>;
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
    }
  }
}
export class Chainable {}
