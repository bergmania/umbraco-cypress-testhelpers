import CommandBase from './commandBase';

export default class SaveDataType extends CommandBase {
  commandName = 'saveDataType';

  method(dataType) {
    const cy = this.cy;

    if (dataType == null) {
      return;
    }

    return cy.umbracoApiRequest(this.relativeBackOfficePath + '/backoffice/UmbracoApi/DataType/PostSave', 'POST', dataType);
  }
}
