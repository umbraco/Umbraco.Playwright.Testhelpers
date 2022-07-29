/**
 * An Umbraco Document Type
 *
 * @param  {string} name Name of Document Type
 * @param  {string} alias Alias of Document type
 * @param  {number} id Optional integer ID of document type
 */
export class CmsDocumentType {
  constructor(public name: string, public alias: string, public id?: number) {}
}
