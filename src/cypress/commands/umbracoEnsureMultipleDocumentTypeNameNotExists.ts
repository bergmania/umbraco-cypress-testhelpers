import CommandBase from './commandBase';

export default class UmbracoEnsureMultipleDocumentTypeNameNotExists extends CommandBase {
  _commandName = 'umbracoEnsureMultipleDocumentTypeNameNotExists';
  method(names) {
    names.forEach(function (value) {
      cy.umbracoEnsureDocumentTypeNameNotExists(value);
    });
  }
}
