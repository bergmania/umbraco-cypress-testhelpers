import CommandBase from './commandBase';

export default class SaveTemplate extends CommandBase {
  commandName = 'saveTemplate';

  method(template) {
    const cy = this.cy;

    if (template == null) {
      return;
    }

    return cy.umbracoApiRequest(this.relativeBackOfficePath + '/backoffice/UmbracoApi/Template/PostSave', 'POST', template);
  }
}
