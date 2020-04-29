import CommandBase from './commandBase';
export default class DataUmbScope extends CommandBase {
  commandName = 'dataUmbScope';
  method(value: string) {
    return cy.dataUmb(value).then(($el) => cy.getAngular().then((ng) => ng.element($el).scope()));
  }
}
