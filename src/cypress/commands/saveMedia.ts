import CommandBase from './commandBase';

export default class SaveMedia extends CommandBase {
  commandName = "saveMedia";
  
  method(media){
    const url = this.relativeBackOfficePath + '/backoffice/umbracoapi/media/PostAddFile';
    
    cy.getCookie('UMB-XSRF-TOKEN').then((token => {
      if(media.path !== null){
        cy.fixture(media.path, 'binary').then((bin) => {
          let blob = Cypress.Blob.binaryStringToBlob(bin);
          sendMedia(media, blob, token, url);
        })
      }
      else if(media.base64String !== null){
        let blob = Cypress.Blob.base64StringToBlob(media.base64String);
        sendMedia(media, blob, token, url);
      }
      else {
        throw 'Either path or base64String must be set.'
      }
      
    }));
    
    function sendMedia(media, blob, token, url){
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      formData.set('file', blob, media.fileName);
      formData.set('currentFolder', media.parentFolder);
      formData.set('contentTypeAlias', media.contentTypeAlias);
      formData.set('propertyAlias', media.propertyAlias);

      xhr.open('POST', url);

      xhr.setRequestHeader('accept', 'application/json');
      xhr.setRequestHeader('X-UMB-XSRF-TOKEN', token.value);
      xhr.send(formData);
    }
  }
}