import td from 'testdouble'

export const addMock = td.func('Cypress.Commands.add');
export default {
 Commands: {
   add: (name, func) => addMock(name, func)
 }
};
