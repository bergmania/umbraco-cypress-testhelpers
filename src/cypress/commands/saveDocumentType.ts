import CommandBase from './commandBase';

export default class SaveDocumentType extends CommandBase {
  commandName = 'saveDocumentType';

  method(docType) {
    const cy = this.cy;

    if (docType == null) {
      return;
    }

    return cy.umbracoApiRequest(
      this.relativeBackOfficePath + '/backoffice/UmbracoApi/ContentType/PostSave',
      'POST',
      docType,
    );
  }
}
