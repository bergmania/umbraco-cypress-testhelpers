import CommandBase from "./commandBase";

export default class AddTextToUsernameInput extends CommandBase {
  _commandName = 'addTextToUsernameInput';

  method(username) {
    const cy = this.cy;
    cy.get('input[name="username"]').type(username).should('have.value', username);
  }
}


