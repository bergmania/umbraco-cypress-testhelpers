import camelize from 'camelize';

export class AliasHelper {
  static toSafeAlias(text) {
    return 'a' + camelize(text) + 'a';
  }

  static toAlias(text) {
    return this.toCamelCase(text);
  }

  static capitalize(text) {
    if (typeof text !== 'string') return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  static toCamelCase(sentenceCase) {
    let out = '';
    sentenceCase.split(' ').forEach((el, idx) => {
      const add = el.toLowerCase();
      out += idx === 0 ? add : add[0].toUpperCase() + add.slice(1);
    });
    return out;
  }
}
