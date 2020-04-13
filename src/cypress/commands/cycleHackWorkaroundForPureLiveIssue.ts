import CommandBase from './commandBase';

export default class CycleHackWorkaroundForPureLiveIssue extends CommandBase {
  commandName = 'cycleHackWorkaroundForPureLiveIssue';

  method() {
    const cy = this.cy;

    const method = 'GET';
    const url = '/people'; // Nasty hack - this endpoint right now triggers a purelive reset

    return cy
      .server()
      .route(method, url)
      .as('cycleHackWorkaroundForPureLiveIssue')
      .window()
      .then((win) => {
        const xhr = new win.XMLHttpRequest();
        xhr.open(method, url);
        xhr.send();
      })
      .wait('@cycleHackWorkaroundForPureLiveIssue', { requestTimeout: 30000 })
      .wait(4000); // We know the app restart is delayed 1000
  }
}
