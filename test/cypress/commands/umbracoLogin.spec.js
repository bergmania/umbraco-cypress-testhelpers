import { assert } from 'chai';
import UmbracoLogin from "../../../src/cypress/commands/umbracoLogin";
import sinon from "sinon";
import faker from "faker";

describe('Commands', () => {
  const path = "/umbraco";

  let reqestThenStub = sinon.stub({});
  let cyMock = {
    clearCookies: () => sinon.mock(),
    clearLocalStorage: () => sinon.mock(),
    log: () => sinon.mock(),

    visit: (fn1) => {
      return {
        then: (fn) => fn(),
      }
    },

    get: (fn1) => {
      return {
        should: (s) => s({
          hasClass: () => sinon.mock(),
        }),
        click: (fn1) => {
          return {
            then: (fn) => fn(),
          }
        },

      }
    },

    request: (fn1) => {
      return {
        then: (fn) => fn(),
      }
    },
  };
  let cypressMock = sinon.mock({Commands: {add:() => {}}});


  it('registerCommand', () => {
    const actual = new UmbracoLogin(path, cyMock, cypressMock.object).registerCommand();

    cypressMock.verify();
  });

  it('method', () => {
    const username = faker.name.findName();
    const password = faker.name.findName();

    // cyMock.expects("clearCookies").exactly(1);
    // cyMock.expects("clearLocalStorage").exactly(1);
    // cyMock.expects("request").exactly(1);

    const actual = new UmbracoLogin(path, cyMock, cypressMock.object).method(username, password);

    // cyMock.verify();
    // cypressMock.verify();
  });
});
