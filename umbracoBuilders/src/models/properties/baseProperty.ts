/**
 * Creates a property object used in document types etc
 *
 * @param  {string} name Name of the property
 * @param  {string} alias Optional alias of the property
 */
export class BaseProperty {
  public id: string;
  public alias: string;
  public name: string;
  constructor(name: string, alias?: string) {
    if(alias !== undefined) {
      this.alias = alias;
    }
    this.name = name;
  }
}
