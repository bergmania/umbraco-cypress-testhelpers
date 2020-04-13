export default class CommandBase {
  _commandName;
  _relativeBackOfficePath;
  _cy;
  _cypress;

  get commandName() {
    return this._commandName;
  }
  set commandName(commandName) {
    this._commandName = commandName;
  }
  get relativeBackOfficePath() {
    return this._relativeBackOfficePath;
  }
  get cy() {
    if (typeof this._cy !== 'undefined') {
      return this._cy;
    }
    return cy;
  }

  get cypress() {
    if (typeof this._cypress !== 'undefined') {
      return this._cypress;
    }
    return Cypress;
  }

  constructor(relativeBackOfficePath, cy?, cypress?) {
    this._relativeBackOfficePath = relativeBackOfficePath;
    this._cy = cy;
    this._cypress = cypress;
  }

  method(a, b, c, d, e, f, g) {
    throw new Error('You have to implement the method()');
  }
  getCommand() {
    return {
      name: this.commandName,
      method: (a, b, c, d, e, f, g) => {
        this.method(a, b, c, d, e, f, g);
      },
    };
  }
  registerCommand() {
    this.cypress.Commands.add(this.commandName, (a, b, c, d, e, f, g) => {
      this.method(a, b, c, d, e, f, g);
    });
  }
}
