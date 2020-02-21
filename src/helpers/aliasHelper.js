import camelize from "camelize";

export default class AliasHelper
{
  static toSafeAlias(text) {
    return "a"+ camelize(text) + "a";
  }

  static toAlias(text) {
    return this.toCamelCase(text);
  }

  static capitalize(text) {
    if (typeof text !== 'string') return '';
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  static toCamelCase(sentenceCase) {
    var out = "";
    sentenceCase.split(" ").forEach(function (el, idx) {
      var add = el.toLowerCase();
      out += (idx === 0 ? add : add[0].toUpperCase() + add.slice(1));
    });
    return out;
  }
}
