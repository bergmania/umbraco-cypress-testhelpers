import CommandBase from "./commandBase";
import JsonHelper from "../../helpers/jsonHelper";

export default class DeleteForm extends CommandBase {
  commandName = 'deleteForm';

  method(id) {
    const cy = this.cy;

    if(id == null){
        return;
      }

      if (typeof id === 'string' || id instanceof String){
        cy.request({
          method: 'GET',
          url: this.relativeBackOfficePath + '/backoffice/UmbracoForms/FormTree/GetNodes?id=-1&application=forms&tree=&use=main&culture=',
        }).then((response) => {
          const forms = JsonHelper.getBody(response);

          for (let i = 0; i<forms.length;i++){
            if(forms[i].name === id || forms[i].key === id){
              cy.deleteFormByGuid(forms[i].id);
              break;
            }
          }


        });
      }else{ // assume guid
        cy.deleteFormByGuid(id);
      }

    };
}


