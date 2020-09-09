/// <reference types="Cypress" />
import DataUmb from './dataUmb';
import UmbracoLogin from './umbracoLogin';
import DeleteAllForms from './deleteAllForms';
import SaveDataType from './saveDataType';
import DeleteFormByGuid from './deleteFormByGuid';
import SaveForm from './saveForm';
import DeleteForm from './deleteForm';
import UmbracoGlobalHelp from './umbracoGlobalHelp';
import UmbracoGlobalUser from './umbracoGlobalUser';
import DeleteDocumentType from './deleteDocumentType';
import DeleteDocumentTypeById from './deleteDocumentTypeById';
import SaveDocumentType from './saveDocumentType';
import SaveContent from './saveContent';
import SaveTemplate from './saveTemplate';
import DeleteDocumentTypesByNamePrefix from './deleteDocumentTypesByNamePrefix';
import DeleteFormsByNamePrefix from './deleteFormsByNamePrefix';
import DeleteTemplatesByNamePrefix from './deleteTemplatesByNamePrefix';
import DeleteDataTypesByNamePrefix from './deleteDataTypesByNamePrefix';
import DeleteDataTypeById from './deleteDataTypeById';
import DeleteTemplateById from './deleteTemplateById';
import AddTextToUsernameInput from './commandBase';
import UmbracoSection from './umbracoSection';
import UmbracoButtonByLabelKey from './umbracoButtonByLabelKey';
import UmbracoEditorHeaderName from './umbracoEditorHeaderName';
import UmbracoEnsureUserEmailNotExists from './umbracoEnsureUserEmailNotExists';
import UmbracoEnsureUserGroupNameNotExists from './umbracoEnsureUserGroupNameNotExists';
import UmbracoTreeItem from './umbracoTreeItem';
import UmbracoContextMenuAction from './umbracoContextMenuAction';
import UmbracoEnsureRelationTypeNameNotExists from './umbracoEnsureRelationTypeNameNotExists';
import UmbracoEnsureDocumentTypeNameNotExists from './umbracoEnsureDocumentTypeNameNotExists';
import UmbracoEnsureMediaTypeNameNotExists from './umbracoEnsureMediaTypeNameNotExists';
import UmbracoEnsureMemberTypeNameNotExists from './umbracoEnsureMemberTypeNameNotExists';
import UmbracoEnsureDataTypeNameNotExists from './umbracoEnsureDataTypeNameNotExists';
import UmbracoSuccessNotification from './umbracoSuccessNotification';
import UmbracoEnsureLanguageNameNotExists from './umbracoEnsureLanguageNameNotExists';
import UmbracoEnsureMacroNameNotExists from './umbracoEnsureMacroNameNotExists';
import UmbracoEnsureTemplateNameNotExists from './umbracoEnsureTemplateNameNotExists';
import UmbracoEnsurePartialViewNameNotExists from './umbracoEnsurePartialViewNameNotExists';
import UmbracoEnsurePartialViewMacroFileNameNotExists from './umbracoEnsurePartialViewMacroFileNameNotExists';
import UmbracoEnsureStylesheetNameNotExists from './umbracoEnsureStylesheetNameNotExists';
import UmbracoEnsureScriptNameNotExists from './umbracoEnsureScriptNameNotExists';
import CycleHackWorkaroundForPureLiveIssue from './cycleHackWorkaroundForPureLiveIssue';
import PostFile from './postFile';
import PostRequest from './postRequest';
import DeletePreValueSourceByGuid from './deletePreValueSourceByGuid';
import DeleteAllPreValues from './deleteAllPreValues';
import DataUmbScope from './dataUmbScope';
import GetAngular from './getAngular';
import DeleteDataSourceByGuid from './deleteDataSourceByGuid';
import DeleteAllDataSources from './deleteAllDataSources';
import DeleteAllContent from './deleteAllContent';
import DeleteContentById from './deleteContentById';
import UmbracoInstall from './umbracoInstall';
import UmbracoEnsureMemberGroupNameNotExists from './umbracoEnsureMemberGroupNameNotExists';
import UmbracoEnsureMemberEmailNotExists from './umbracoEnsureMemberEmailNotExists';
import UmbracoMacroExists from './umbracoMacroExists';
import SavePartialViewMacro from './savePartialViewMacro';
import UmbracoErrorNotification from './umbracoErrorNotification';
import SavePartialView from './savePartialView';
import UmbracoPartialViewExists from './umbracoPartialViewExists';
import SaveMacro from './saveMacro';
import SaveCodeFile from './saveCodeFile';
import SaveScript from './saveScript';
import UmbracoScriptExists from './umbracoScriptExists';
import UmbracoVerifyScriptContent from './umbracoVerifyScriptContent';
import SaveFolder from './saveFolder';
import UmbracoApiRequest from './umbracoApiRequest';
import EditTemplate from './editTemplate';
import UmbracoVerifyRenderedViewContent from './umbracoVerifyRenderedViewContent';

export class Command {
  public registerCypressCommands(customRelativeBackOfficePath?: string): void {
    const relativeBackOfficePath = customRelativeBackOfficePath || '/umbraco';

    Cypress.Server.defaults({
      // @ts-ignore
      ignore: (xhr) => {
        if (new URL(xhr.url).pathname?.startsWith(relativeBackOfficePath)) {
          return true;
        }
        // this function receives the xhr object in question and
        // will whitelist if it's a GET that appears to be a static resource
        return xhr.method === 'GET' && /\.(jsx?|html|css)(\?.*)?$/.test(xhr.url);
      },
    });
    new DataUmb(relativeBackOfficePath).registerCommand();
    new DataUmbScope(relativeBackOfficePath).registerCommand();
    new DeleteAllContent(relativeBackOfficePath).registerCommand();
    new DeleteAllForms(relativeBackOfficePath).registerCommand();
    new DeleteAllDataSources(relativeBackOfficePath).registerCommand();
    new DeleteAllPreValues(relativeBackOfficePath).registerCommand();
    new UmbracoLogin(relativeBackOfficePath).registerCommand();
    new DeleteDataSourceByGuid(relativeBackOfficePath).registerCommand();
    new DeleteContentById(relativeBackOfficePath).registerCommand();
    new DeleteDocumentType(relativeBackOfficePath).registerCommand();
    new DeleteDocumentTypeById(relativeBackOfficePath).registerCommand();
    new DeleteDocumentTypesByNamePrefix(relativeBackOfficePath).registerCommand();
    new DeleteForm(relativeBackOfficePath).registerCommand();
    new DeleteFormByGuid(relativeBackOfficePath).registerCommand();
    new DeleteFormsByNamePrefix(relativeBackOfficePath).registerCommand();
    new DeletePreValueSourceByGuid(relativeBackOfficePath).registerCommand();
    new DeleteTemplateById(relativeBackOfficePath).registerCommand();
    new DeleteTemplatesByNamePrefix(relativeBackOfficePath).registerCommand();
    new DeleteDataTypesByNamePrefix(relativeBackOfficePath).registerCommand();
    new DeleteDataTypeById(relativeBackOfficePath).registerCommand();
    new GetAngular(relativeBackOfficePath).registerCommand();
    new PostFile(relativeBackOfficePath).registerCommand();
    new PostRequest(relativeBackOfficePath).registerCommand();
    new SaveContent(relativeBackOfficePath).registerCommand();
    new SaveDataType(relativeBackOfficePath).registerCommand();
    new SaveDocumentType(relativeBackOfficePath).registerCommand();
    new SaveForm(relativeBackOfficePath).registerCommand();
    new SaveTemplate(relativeBackOfficePath).registerCommand();
    new UmbracoGlobalHelp(relativeBackOfficePath).registerCommand();
    new UmbracoGlobalUser(relativeBackOfficePath).registerCommand();
    new UmbracoInstall(relativeBackOfficePath).registerCommand();
    new UmbracoSection(relativeBackOfficePath).registerCommand();
    new UmbracoTreeItem(relativeBackOfficePath).registerCommand();
    new UmbracoContextMenuAction(relativeBackOfficePath).registerCommand();
    new UmbracoSuccessNotification(relativeBackOfficePath).registerCommand();
    new CycleHackWorkaroundForPureLiveIssue(relativeBackOfficePath).registerCommand();
    new UmbracoEnsureUserEmailNotExists(relativeBackOfficePath).registerCommand();
    new UmbracoEnsureMemberEmailNotExists(relativeBackOfficePath).registerCommand();
    new UmbracoEnsureUserGroupNameNotExists(relativeBackOfficePath).registerCommand();
    new UmbracoEnsureRelationTypeNameNotExists(relativeBackOfficePath).registerCommand();
    new UmbracoEnsureDocumentTypeNameNotExists(relativeBackOfficePath).registerCommand();
    new UmbracoEnsureMediaTypeNameNotExists(relativeBackOfficePath).registerCommand();
    new UmbracoEnsureMemberTypeNameNotExists(relativeBackOfficePath).registerCommand();
    new UmbracoEnsureMemberGroupNameNotExists(relativeBackOfficePath).registerCommand();
    new UmbracoEnsureDataTypeNameNotExists(relativeBackOfficePath).registerCommand();
    new UmbracoEnsureLanguageNameNotExists(relativeBackOfficePath).registerCommand();
    new UmbracoEnsureMacroNameNotExists(relativeBackOfficePath).registerCommand();
    new UmbracoEnsureTemplateNameNotExists(relativeBackOfficePath).registerCommand();
    new UmbracoEnsurePartialViewNameNotExists(relativeBackOfficePath).registerCommand();
    new UmbracoEnsurePartialViewMacroFileNameNotExists(relativeBackOfficePath).registerCommand();
    new UmbracoEnsureStylesheetNameNotExists(relativeBackOfficePath).registerCommand();
    new UmbracoEnsureScriptNameNotExists(relativeBackOfficePath).registerCommand();
    new UmbracoButtonByLabelKey(relativeBackOfficePath).registerCommand();
    new UmbracoEditorHeaderName(relativeBackOfficePath).registerCommand();
    new AddTextToUsernameInput(relativeBackOfficePath).registerCommand();
    new UmbracoMacroExists(relativeBackOfficePath).registerCommand();
    new SavePartialViewMacro(relativeBackOfficePath).registerCommand();
    new UmbracoErrorNotification(relativeBackOfficePath).registerCommand();
    new SavePartialView(relativeBackOfficePath).registerCommand();
    new UmbracoPartialViewExists(relativeBackOfficePath).registerCommand();
    new SaveMacro(relativeBackOfficePath).registerCommand();
    new SaveCodeFile(relativeBackOfficePath).registerCommand();
    new SaveScript(relativeBackOfficePath).registerCommand();
    new UmbracoScriptExists(relativeBackOfficePath).registerCommand();
    new UmbracoVerifyScriptContent(relativeBackOfficePath).registerCommand();
    new SaveFolder(relativeBackOfficePath).registerCommand();
    new UmbracoApiRequest(relativeBackOfficePath).registerCommand();
    new EditTemplate(relativeBackOfficePath).registerCommand();
    new UmbracoVerifyRenderedViewContent(relativeBackOfficePath).registerCommand();
  }
}
