import CommandBase from "./commandBase";


export default class UmbracoEnsureMediaNameNotExists extends CommandBase {
  _commandName = 'umbracoEnsureMediaNameNotExists';
  
  method(name) {
    const cy = this.cy;

    cy.umbracoApiRequest(
      this._relativeBackOfficePath + '/backoffice/umbracotrees/mediatree/GetNodes?id=-1&application=media',
      null,
      null
    ).then(responseJson => {
      if(responseJson.length > 0){
        let mediaId = null;
        for(const sb of responseJson){
          if(sb.name === name){
            mediaId = sb.id;
          }
        }
        
        if(mediaId !== null){
          const mediaDeletePath = this._relativeBackOfficePath + '/backoffice/umbracoapi/media/DeleteById?id=' + mediaId;

          cy.umbracoApiRequest(mediaDeletePath, 'POST', null).then((response) => {
            // This is a bit odd, but the first time we delete a media item it gets added to the trash
            // The second time it actually gets deleted.
            cy.umbracoApiRequest(mediaDeletePath, 'POST', null).then((response) => {
              return;
            });
          });
        }
      }
    });
  }
}