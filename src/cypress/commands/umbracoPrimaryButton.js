import CommandBase from "./commandBase";

export default class UmbracoPrimaryButton extends CommandBase {
  _commandName = 'umbracoPrimaryButton';

  method() {
    const cy = this.cy;

    return cy.get('[data-element="button-groupPrimary"]')
  }
}


