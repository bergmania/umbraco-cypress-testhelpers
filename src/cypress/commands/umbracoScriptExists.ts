import UmbracoFileExists from './umbracoFileExists';

export default class UmbracoScriptExists extends UmbracoFileExists {
  _commandName = 'umbracoScriptExists';
  _endPoint = '/BackOffice/Api/ScriptsTree/GetNodes?id=-1';
}
