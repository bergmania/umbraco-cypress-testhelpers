import td from 'testdouble'

export const clearCookiesMock = td.func('cy.clearCookies');
export const clearLocalStorageMock = td.func('cy.clearLocalStorageMock');
export const logMock = td.func('cy.log');
export const hasClassMock = td.func('cy.get(...).should(...).hasClass');
export const typeMock = td.func('cy.get(...).type');

export default {
  clearCookies: () => clearCookiesMock(),
  clearLocalStorage: () => clearLocalStorageMock(),
  log: () => logMock(),

  visit: (fn1) => {
    return {
      then: (fn) => fn(),
    }
  },

  get: (fn1) => {
    return {
      should: (s) => s({
        hasClass: (a) => hasClassMock(a),
      }),
      click: (fn1) => {
        return {
          then: (fn) => fn(),
        }
      },
      type: (text) => typeMock(text)

    }
  },

  request: (fn1) => {
    let responseBody = ')]}\',\n{"test":"json"}';
    return {


      then: (fn) => fn({body:responseBody}),
    }
  },

  getCookie: (fn1) => {
    return {

      then: (fn) => fn({token:"test"}),
    }
  },
};
