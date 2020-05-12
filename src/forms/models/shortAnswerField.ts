import { FormField } from './formField';

export class ShortAnswerField {
  constructor(
    public id: string,
    public alias?: string,
    public caption?: string,
    public value?: string,
    public containsSensitiveData?: boolean,
    public mandatory?: boolean,
    public requiredErrorMessage?: string,
    public regex?: string,
  ) {}
}
