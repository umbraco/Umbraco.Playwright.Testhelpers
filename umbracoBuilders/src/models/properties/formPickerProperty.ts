import { BaseProperty } from './baseProperty';

/**
 * @param  {string} name Property name
 * @param  {string} alias Property alias
 * @param  {string} value Property value of form picker - this stores a UUID of the picked form ID/key
 * @param  {string[]} allowedFormIds Optional string array of UUIDs of form ID/keys that are allowed to be picked
 */
export class FormPickerProperty extends BaseProperty {
  allowedFormIds: string[];
  value: string;
  constructor(name: string, alias: string, value: string, allowedFormIds?: string[]) {
    super(name, alias);
    if(allowedFormIds !== undefined){
      this.allowedFormIds = allowedFormIds;
    }
    this.value = value;
  }
}
