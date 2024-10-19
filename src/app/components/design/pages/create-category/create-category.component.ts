import { createCategory } from '../../../../core/models/interfaces';
import { CategoryService } from '../../../../core/services/category.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CREATE, CREATE_CATEGORY, DESCRIPTION, NAME, PLACEHOLDER_REGULAR_INPUT, CATEGORY_CREATED, EXCEEDES_MAXIMUN_CHARACTERS_CATEGORY_NAME, EXCEEDES_MAXIMUN_CHARACTERS_CATEGORY_DESCRIPTION, REQUIRED_FIELD } from '../../../shared/constants';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  @Output() categoryCreated: EventEmitter<void> = new EventEmitter<void>();

  title: string = CREATE_CATEGORY;
  textName: string = NAME;
  textDescription: string = DESCRIPTION;
  placeholder: string = PLACEHOLDER_REGULAR_INPUT;
  contentButton: string = CREATE;

  form!: FormGroup;
  isLoading: boolean = false;
  showToast: boolean = false;
  mistakeOcurred: boolean = false;
  message: string = '';
  categoryNameValidation: string = EXCEEDES_MAXIMUN_CHARACTERS_CATEGORY_NAME;
  categoryDescriptionValidation: string = EXCEEDES_MAXIMUN_CHARACTERS_CATEGORY_DESCRIPTION;
  required: string = REQUIRED_FIELD;

  createCategory: createCategory = {
    categoryName: '',
    categoryDescription: ''
  }

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      categoryName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      categoryDescription: new FormControl('', [Validators.required, Validators.maxLength(90)]),
    });
  }

  get categoryName() {
    return this.form.get('categoryName') as FormControl;
  }

  get categoryDescription() {
    return this.form.get('categoryDescription') as FormControl;
  }

  onSubmit() {
    if (this.form.valid) {
      this.createCategory.categoryName = this.categoryName.value;
      this.createCategory.categoryDescription = this.categoryDescription.value;
      this.isLoading = true;

      this.categoryService.createCategory(this.createCategory).subscribe({
        next: () => {
          this.isLoading = false;
          this.mistakeOcurred = false;
          this.showToast = true;
          this.message = CATEGORY_CREATED;
          setTimeout(() => {
            this.showToast = false;
            this.categoryCreated.emit();
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
