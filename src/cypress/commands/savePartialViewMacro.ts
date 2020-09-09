import CommandBase from './commandBase';

export default class SavePartialViewMacro extends CommandBase {
  commandName = 'savePartialViewMacro';

  method(partialViewMacro) {
    const cy = this.cy;

    if (partialViewMacro == null) {
      return;
    }

    return cy.umbracoApiRequest(
      this.relativeBackOfficePath + '/backoffice/UmbracoApi/CodeFile/PostSave',
      'POST',
      partialViewMacro,
    );
  }
}
