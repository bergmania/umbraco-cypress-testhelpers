import CommandBase from "./commandBase";
import ResponseHelper from "../../helpers/responseHelper";

export default class UmbracoEnsureUserGroupNameNotExists extends CommandBase {
  _commandName = 'umbracoEnsureUserGroupNameNotExists';

  method(name) {
    const cy = this.cy;

    cy.getCookie("UMB-XSRF-TOKEN", {log:false}).then(token => {
      cy.request({
        method: 'GET',
        url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/UserGroups/GetUserGroups?onlyCurrentUserGroups=false',
        followRedirect: true,
        headers: {
          "Accept": "application/json",
          "X-UMB-XSRF-TOKEN":token.value
        },
        log:false
      }).then(response => {

        const searchBody = ResponseHelper.getResponseBody(response);
        if(searchBody.length > 0){

          let userGroupId = null;
          for (let i = 0; i < searchBody.length; i++) {
            let group = searchBody[i];

            if(group.name === name){
              userGroupId = group.id;
            }
          }

          if(userGroupId !== null){
            cy.request({
              method: 'POST',
              url: this._relativeBackOfficePath + '/backoffice/UmbracoApi/UserGroups/PostDeleteUserGroups?userGroupIds=' + userGroupId,
              followRedirect: false,
              headers: {
                "ContentType": "application/json",
                "X-UMB-XSRF-TOKEN": token.value
              }
            }).then((response) => {

            });
          }


        }



      });
    });

  }
}


