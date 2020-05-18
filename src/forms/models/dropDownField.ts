import { FormField } from './formField';

export class DropDownField extends FormField {
  constructor(
    id: string,
    public alias?: string,
    public caption?: string,
    public value?: string,
    containsSensitiveData?: boolean,
    mandatory?: boolean,
    requiredErrorMessage?: string,
    regex?: string,
    public prevalueSourceId?: string,
    public preValues?: string[],
  ) {
    super(id, containsSensitiveData, mandatory, requiredErrorMessage, regex);
  }
}
