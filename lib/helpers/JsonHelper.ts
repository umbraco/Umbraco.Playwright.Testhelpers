export class JsonHelper {
    /**
     * Expects the HTTP body response to be JSON
     * This will remove the `)]}',\n` if present
     * and return the correct JSON data as an object
     *
     * @param response The raw HTTP response from the server
     * @returns The JSON data in the body of the response as an object
     */
    static async getBody(response) {
      let json =  (await response.body()).toString();
      return this.parseString(json);
    }
    
    static async parseString(json : string) {
      const junk = ")]}',\n";

      if(json.length === 0){
        return null;
      }

      if (json.startsWith(junk)) {
        json = json.substr(junk.length);
      }

      return JSON.parse(json);
    }
}