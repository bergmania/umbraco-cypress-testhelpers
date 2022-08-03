import CommandBase from './commandBase';
import { JsonHelper } from '../../helpers/jsonHelper';

export default class UmbracoEnsureMediaNameNotExists extends CommandBase {
    _commandName = 'umbracoEnsureMediaNameNotExists';

    method(name) {
        const cy = this.cy;

        cy.getCookie('UMB-XSRF-TOKEN', { log: false }).then((token) => {
            cy.request({
                method: 'GET',
                url: this._relativeBackOfficePath + '/backoffice/UmbracoTrees/MediaTree/GetNodes?id=-1',
                followRedirect: true,
                headers: {
                    Accept: 'application/json',
                    'X-UMB-XSRF-TOKEN': token.value,
                },
                log: false,
            }).then((response) => {
                const searchBody = JsonHelper.getBody(response);
                if (searchBody.length > 0) {
                    let mediaNameId = null;
                    for (const sb of searchBody) {
                        if (sb.name === name) {
                            mediaNameId = sb.id;
                        }
                    }

                    if (mediaNameId !== null) {
                        cy.request({
                            method: 'POST',
                            url: this._relativeBackOfficePath + '/backoffice/umbracoApi/media/DeleteById?id=' + mediaNameId,
                            followRedirect: false,
                            headers: {
                                ContentType: 'application/json',
                                'X-UMB-XSRF-TOKEN': token.value,
                            },
                        }).then((resp) => {
                            //Clears the Recycle Bin
                            cy.request({
                                method: 'POST',
                                url: this._relativeBackOfficePath + '/backoffice/umbracoApi/media/EmptyRecycleBin',
                                followRedirect: false,
                                headers: {
                                    ContentType: 'application/json',
                                    'X-UMB-XSRF-TOKEN': token.value,
                                },
                            })
                            return
                        });
                    }
                }
            });
        });
    }
}
