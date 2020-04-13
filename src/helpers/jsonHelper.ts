export class JsonHelper {
  static getBody(response) {
    const junk = ")]}',\n";
    let json = response.body;

    if (json.length === 0) {
      return null;
    }

    if (json.startsWith(junk)) {
      json = json.substr(junk.length);
    }
    return JSON.parse(json);
  }
}
