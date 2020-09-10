import UmbracoFileExists from './umbracoFileExists';

export default class UmbracoPartialViewExists extends UmbracoFileExists {
  _commandName = 'umbracoPartialViewExists';
  _endPoint = '/backoffice/UmbracoTrees/PartialViewsTree/GetNodes?id=-1';
}
