import CommandBase from './commandBase';

export default class SaveMacro extends CommandBase{
  commandName = 'saveMacro';

  method(name : string) {
    const cy = this.cy;
    if (name.length == 0) {
      return;
    }

    return cy.umbracoApiRequest(this.relativeBackOfficePath + '/backoffice/UmbracoApi/Macros/Create?name=' + name, 'POST')
  }
}