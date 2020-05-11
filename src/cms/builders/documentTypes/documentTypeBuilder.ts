import faker from 'faker';
import DocumentTypeGroupBuilder from './documentTypeGroupBuilder';
import { AliasHelper } from '../../../helpers/aliasHelper';

export class DocumentTypeBuilder {
  compositeContentTypes;
  isContainer;
  allowAsRoot;
  allowedTemplates;
  allowedContentTypes;
  alias;
  description;
  thumbnail;
  name;
  id;
  icon;
  trashed;
  key;
  parentId;
  path;
  allowCultureVariant;
  isElement;
  defaultTemplate;
  lockedCompositeContentTypes: any[];

  documentTypeGroupBuilders;

  constructor() {
    this.isContainer = false;
    this.allowAsRoot = false;
    this.documentTypeGroupBuilders = [];
  }

  withAllowAsRoot(allowAsRoot) {
    this.allowAsRoot = allowAsRoot;
    return this;
  }
  withDefaultTemplate(defaultTemplate) {
    this.defaultTemplate = defaultTemplate;
    return this;
  }
  withAlias(alias) {
    this.alias = alias;
    return this;
  }
  withName(name) {
    this.name = name;
    return this;
  }
  withLockedCompositeContentTypes(types: any[]) {
    this.lockedCompositeContentTypes = types;
    return this;
  }
  addGroup() {
    const builder = new DocumentTypeGroupBuilder(this);

    this.documentTypeGroupBuilders.push(builder);

    return builder;
  }

  build() {
    const key = this.key || faker.random.uuid();
    const name = this.name || key;
    const alias = this.alias || AliasHelper.toSafeAlias(name);

    return {
      compositeContentTypes: this.compositeContentTypes || [],
      isContainer: this.isContainer || false,
      allowAsRoot: this.allowAsRoot || false,
      allowedTemplates: this.allowedTemplates || [],
      allowedContentTypes: this.allowedContentTypes || [],
      alias,
      description: this.description || null,
      thumbnail: this.thumbnail || 'folder.png',
      name,
      id: this.id || -1,
      icon: this.icon || 'icon-document',
      trashed: this.trashed || false,
      key,
      parentId: this.parentId || -1,
      path: this.path || null,
      allowCultureVariant: this.allowCultureVariant || false,
      isElement: this.isElement || false,
      defaultTemplate: this.defaultTemplate || null,
      lockedCompositeContentTypes: this.lockedCompositeContentTypes || null,
      groups: this.documentTypeGroupBuilders.map((builder) => {
        return builder.build();
      }),
    };
  }
}
