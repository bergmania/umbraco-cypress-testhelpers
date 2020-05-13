import { BaseProperty } from './baseProperty';
import { threadId } from 'worker_threads';

export class TextBoxProperty extends BaseProperty {
  public value: string;
  public maxChars: number;
  constructor(name: string, alias: string, maxChars: number, value?: string) {
    super(name, alias);
    this.value = value;
    this.maxChars = maxChars;
  }
}
