import { FormField } from './formField';

export class FileUploadField extends FormField {
  constructor(
    id: string,
    public alias?: string,
    public caption?: string,
    containsSensitiveData?: boolean,
    mandatory?: boolean,
    requiredErrorMessage?: string,
    regex?: string,
  ) {
    super(id, containsSensitiveData, mandatory, requiredErrorMessage, regex);
  }
}
