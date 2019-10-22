import { assert } from 'chai';
import faker from "faker";
import td from 'testdouble'
import cypressTestDouble from "../testDoubles/cypressTestDouble";
import cyTestDouble, { typeMock } from "../testDoubles/cyTestDouble";
import AddTextToUsernameInput from "../../../src/cypress/commands/addTextToUsernameInput";

describe('AddTextToUsernameInput', () => {
  const sut = new AddTextToUsernameInput( "/umbraco", cyTestDouble, cypressTestDouble);

  it('Must type the inputted username', () => {
    const username = faker.name.findName();
    const shouldMock = td.object();

    td.when(typeMock(username)).thenReturn(shouldMock);

    sut.method(username);

    td.verify(typeMock(username))
  });
});
