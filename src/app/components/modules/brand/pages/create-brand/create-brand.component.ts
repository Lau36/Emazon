import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BRAND_CREATED, CREATE, CREATE_BRAND, DESCRIPTION, EXCEEDES_MAXIMUN_CHARACTERS_BRAND_DESCRIPTION, EXCEEDES_MAXIMUN_CHARACTERS_BRAND_NAME, NAME, PLACEHOLDER_REGULAR_INPUT, REQUIRED_FIELD } from '../../../../shared/constants';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { createBrand } from '../../../../core/models/interfaces';
import { BrandService } from '../../../../core/services/brand.service';

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
  categoryNameValidation: string = EXCEEDES_MAXIMUN_CHARACTERS_BRAND_NAME;
  categoryDescriptionValidation: string = EXCEEDES_MAXIMUN_CHARACTERS_BRAND_DESCRIPTION;
  required: string = REQUIRED_FIELD;

  createBrach: createBrand = {
    name: '',
    description: ''
  }

  constructor(
    private fb: FormBuilder,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(120)]),
    });
  }

  get name() {
    return this.form.get('name') as FormControl;
  }

  get description() {
    return this.form.get('description') as FormControl;
  }

  onSubmit() {
    if (this.form.valid) {
      this.createBrach.name = this.name.value;
      this.createBrach.description = this.description.value;
      this.isLoading = true;

      this.brandService.createBrand(this.createBrach).subscribe({
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
