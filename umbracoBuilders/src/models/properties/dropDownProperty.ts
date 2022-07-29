import { BaseProperty } from './baseProperty';

/**
 * @param  {string} name Property name
 * @param  {string} alias Property alias
 * @param  {boolean} multiSelect Bool if Dropdown values can be multi selected
 * @param  {string[]} values Optional string array of values in the dropdown
 */
export class DropDownProperty extends BaseProperty {
  public values: string[];
  public multiSelect: boolean;
  constructor(name: string, alias: string, multiSelect = false, values?: string[]) {
    super(name, alias);
    if(values !== undefined) {
      this.values = values;
    }
    this.multiSelect = multiSelect;
  }
}
