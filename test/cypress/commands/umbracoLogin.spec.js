import { assert } from 'chai';
import UmbracoLogin from "../../../src/cypress/commands/umbracoLogin";
import faker from "faker";
import td from 'testdouble'
import cypressTestDouble from "../testDoubles/cypressTestDouble";
import cyTestDouble, {clearCookiesMock, clearLocalStorageMock, hasClassMock} from "../testDoubles/cyTestDouble";

describe('UmbracoLogin', () => {
  const sut = new UmbracoLogin( "/umbraco", cyTestDouble, cypressTestDouble);

  it('Happy path - Success, visit backoffice with tour', () => {
    //Arrage
    var captor = td.matchers.captor();
    var username = faker.name.findName();
    var password = faker.name.findName();

    //Mock
    td.when(cypressTestDouble.Commands.add("umbracoLogin", captor.capture())).thenDo(() => captor.value(username, password));
    td.when(hasClassMock('umb-tour-is-visible')).thenReturn(false);

    //Act
    sut.method(username, password);

    //Assert

    //Verify
    td.verify(clearCookiesMock());
    td.verify(clearLocalStorageMock());
    td.verify(hasClassMock('umb-tour-is-visible'));
  });
});
