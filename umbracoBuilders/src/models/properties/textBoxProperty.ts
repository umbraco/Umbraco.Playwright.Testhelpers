import { BaseProperty } from './baseProperty';

export class TextBoxProperty extends BaseProperty {
  public value: string;
  public maxChars: number;
  constructor(name: string, alias: string, maxChars: number, value?: string) {
    super(name, alias);
    if(value !== undefined){
      this.value = value;
    }
    this.maxChars = maxChars;
  }
}
