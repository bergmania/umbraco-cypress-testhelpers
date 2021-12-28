// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import {Command} from '../../src/cypress/commands/command';
import {Chainable} from '../../src/cypress/commands/chainable';
require('cy-verify-downloads').addCustomCommand();

new Chainable();
new Command().registerCypressCommands();
import 'cypress-file-upload';