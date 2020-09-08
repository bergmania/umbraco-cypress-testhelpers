import UmbracoFileExists from './umbracoFileExists';

export default class UmbracoMacroExists extends UmbracoFileExists {
  _commandName = 'umbracoMacroExists';
  _endPoint = '/backoffice/UmbracoTrees/MacrosTree/GetNodes?id=-1';
}