import camelize from "camelize";

export default class AliasHelper
{
  static toSafeAlias(text) {
    return "a" + camelize(text) + "a";
  }

  static capitalize(text) {
    if (typeof text !== 'string') return '';
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
}
