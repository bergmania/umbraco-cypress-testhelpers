import faker from 'faker';

import camelize from 'camelize';

export default class TemplateBuilder {
  id;
  name;
  key;
  alias;
  content;
  path;
  virtualPath;
  masterTemplateAlias;
  isMasterTemplate;
  notifications;

  withId(id) {
    this.id = id;
    return this;
  }
  withKey(key) {
    this.key = key;
    return this;
  }
  withName(name) {
    this.name = name;
    return this;
  }
  withAlias(alias) {
    this.alias = alias;
    return this;
  }
  withContent(content) {
    this.content = content;
    return this;
  }
  withPath(path) {
    this.path = path;
    return this;
  }
  withVirtualPath(virtualPath) {
    this.virtualPath = virtualPath;
    return this;
  }
  withMasterTemplateAlias(masterTemplateAlias) {
    this.masterTemplateAlias = masterTemplateAlias;
    return this;
  }
  withIsMasterTemplate(isMasterTemplate) {
    this.isMasterTemplate = isMasterTemplate;
    return this;
  }
  withNotifications(notifications) {
    this.notifications = notifications;
    return this;
  }

  build() {
    const name = this.name || faker.random.uuid();
    const key = this.key || faker.random.uuid();
    const alias = this.alias || 'a' + camelize(name);
    const virtualPath = this.virtualPath || '/Views/' + alias + '.cshtml';

    return {
      id: this.id || 0,
      name,
      alias,
      key,
      content:
        this.content ||
        '@inherits Umbraco.Web.Mvc.UmbracoViewPage\r\n@{\r\n\tLayout = null;\r\n}\r\n\r\n@* the fun starts here *@\r\n\r\n',
      path: this.path || '-1',
      virtualPath,
      masterTemplateAlias: this.masterTemplateAlias || null,
      isMasterTemplate: this.isMasterTemplate || false,
      notifications: this.notifications || null,
    };
  }
}
