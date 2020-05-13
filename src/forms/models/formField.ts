export class FormField {
  constructor(
    public containsSensitiveData: boolean = false,
    public mandatory: boolean = false,
    public requiredErrorMessage: string = '',
    public regex: string = '',
  ) {}
}
