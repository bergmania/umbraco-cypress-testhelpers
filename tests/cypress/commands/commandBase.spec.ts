import { assert } from 'chai';
import faker from "faker";
import td from 'testdouble'
import cypressTestDouble, {addMock} from "../testDoubles/cypressTestDouble";
import cyTestDouble from "../testDoubles/cyTestDouble";
import CommandBase from '../../../src/cypress/commands/commandBase';



describe('CommandBase', () => {
  const sut = new CommandBase( "/umbraco", cyTestDouble, cypressTestDouble);

  it('register command must call the method', () => {
    const commandName = faker.name.findName();
    let captor = td.matchers.captor();

    // ensure we call the method of the class self, and therefore expect the same error
    td.when(addMock(commandName, captor.capture())).thenDo(() => captor.value());

    sut.commandName = commandName;

    assert.throws(() => sut.registerCommand(), Error, /You have to implement the method()/);

  });

  it('method must throw error on base class (alternative to abstract)', () => {
    assert.throws(() => sut.method(0,0,0,0,0,0,0), Error, /You have to implement the method()/);
  });
});
