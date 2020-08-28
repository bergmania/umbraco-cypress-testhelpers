import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class SaveCodeFile extends CommandBase{
  commandName = 'saveCodeFile';

  method(codeFile) {
    const cy = this.cy;

    if (codeFile == null) {
      return;
    }

    return cy.umbracoApiRequest(
      this.relativeBackOfficePath + '/backoffice/UmbracoApi/CodeFile/PostSave', 'POST', codeFile);
  }
}