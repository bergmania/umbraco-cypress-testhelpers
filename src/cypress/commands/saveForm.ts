import CommandBase from './commandBase';

export default class SaveForm extends CommandBase {
  commandName = 'saveForm';

  method(form) {
    const cy = this.cy;

    if (form == null) {
      return;
    }

    return cy.umbracoApiRequest(this.relativeBackOfficePath + '/backoffice/UmbracoForms/Form/SaveForm', 'POST', form);
  }
}
