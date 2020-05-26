export class FormField {
  constructor(
    public id: string,
    public containsSensitiveData: boolean = false,
    public mandatory: boolean = false,
    public requiredErrorMessage: string = '',
    public regex: string = '',
  ) {}
}
