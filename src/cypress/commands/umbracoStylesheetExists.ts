import UmbracoFileExists from './umbracoFileExists';

export default class UmbracoStyleSheetExists extends UmbracoFileExists {
    _commandName = 'umbracoStylesheetExists';
    _endPoint = '/BackOffice/Api/StylesheetsTree/GetNodes?id=-1';
}