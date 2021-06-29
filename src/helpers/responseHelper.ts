export class ResponseHelper {

  /**
   * This strips the first 6 characters of the response body
   * as it assumes it will **always** contain the junk json data `)]}',\n`
   * 
   * It would be better to use jsonHelper.getBody() 
   * as it checks for its presence of the data 
   * 
   * @param response The raw HTTP response from the server
   * @returns The JSON data in the body of the response as an object 
   * @deprecated Please use jsonHelper.getBody instead
   * @see jsonHelper.getBody()
   */
  static getResponseBody(response) {
    return JSON.parse(response.body.substr(6));
  }
}
