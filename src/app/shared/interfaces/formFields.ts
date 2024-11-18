import { FormControl } from "@angular/forms";

export interface formFields {
  typeField: string,
  content: string,
  placeholder: string,
  control: FormControl,
  width: string,
  height: string,
  fontSize: string,
  type?: string
}
