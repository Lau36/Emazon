import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BRAND_CREATED, CREATE, CREATE_BRAND, DESCRIPTION, NAME, PLACEHOLDER_REGULAR_INPUT, REQUIRED_FIELD } from '../../../shared/constants/constants';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateBrand } from '../../../shared/models/brand';
import { BrandService } from '../../../shared/services/brand.service';
import { formFields } from '../../../shared/interfaces/interfaces';

@Component({
  selector: 'app-create-branch',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss']
})
export class CreateBrandComponent implements OnInit {

  @Output() brandCreated: EventEmitter<void> = new EventEmitter<void>();

  title: string = CREATE_BRAND;
  textName: string = NAME;
  textDescription: string = DESCRIPTION;
  placeholder: string = PLACEHOLDER_REGULAR_INPUT;
  contentButton: string = CREATE;

  form!: FormGroup;
  isLoading: boolean = false;
  showToast: boolean = false;
  mistakeOcurred: boolean = false;
  message: string = '';
  required: string = REQUIRED_FIELD;

  formFields: formFields[] = [];

  createBrand: CreateBrand = {
    name: '',
    description: ''
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(120)]),
    });

    this.formFields = [
      {
        typeField: 'input',
        content: 'Nombre de la marca',
        placeholder: 'Escriba aquí',
        control: this.name,
        width: '23.5rem',
        height: '1rem',
        fontSize: '0.8rem',
        type: "text"
      },
      {
        typeField: 'textarea',
        content: 'Descripción de marca',
        placeholder: 'Escriba aquí',
        control: this.description,
        width: "23.5rem",
        height: "3rem",
        fontSize: "0.9rem"
      }
    ]
  }

  get name() {
    return this.form.get('name') as FormControl;
  }

  get description() {
    return this.form.get('description') as FormControl;
  }

  onSubmit() {
    if (this.form.valid) {
      this.createBrand.name = this.name.value;
      this.createBrand.description = this.description.value;
      this.isLoading = true;

      this.brandService.createBrand(this.createBrand).subscribe({
        next: () => {
          this.isLoading = false;
          this.mistakeOcurred = false;
          this.showToast = true;
          this.message = BRAND_CREATED;
          setTimeout(() => {
            this.showToast = false;
            this.brandCreated.emit();
          }, 3000);
          this.form.reset();
        },
        error: (error) => {
          this.isLoading = false;
          this.mistakeOcurred = true;
          this.showToast = true;
          this.message = error.error.message;
          setTimeout(() => {
            this.showToast = false;
          }, 3000);
        }
      });
    }
  }

}
