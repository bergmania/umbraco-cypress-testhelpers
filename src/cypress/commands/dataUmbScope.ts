import CommandBase from './commandBase';
export default class DataUmbScope extends CommandBase {
  commandName = 'dataUmbScope';
  method(value: string, child?: string) {
    const element = child !== undefined ? cy.dataUmb(value, child) : cy.dataUmb(value);
    return element.then(($el) => cy.getAngular().then((ng) => ng.element($el).scope()));
  }
}
