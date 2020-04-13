export class ResponseHelper {
  static getResponseBody(response) {
    return JSON.parse(response.body.substr(6));
  }
}
