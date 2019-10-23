export default class JsonHelper
{
  static getBody(response) {
    return JSON.parse(response.body.substr(6));
  }
}
