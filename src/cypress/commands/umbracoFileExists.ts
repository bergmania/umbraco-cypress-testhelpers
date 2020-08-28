import CommandBase from './commandBase';

export default class UmbracoFileExists extends CommandBase{
  _commandName = 'umbracoFileExists';
  _endPoint;

  method(name) {
    const cy = this.cy;

    cy.umbracoApiRequest(this._relativeBackOfficePath + this._endPoint)
      .then((searchBody) => {
        if (searchBody.length > 0) {
          for (const sb of searchBody) {
            if (sb.name === name) {
              return true;
            }
          }
        }
        return false;
      });
  }
}