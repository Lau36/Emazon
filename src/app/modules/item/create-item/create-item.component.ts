import { AMOUNT, CREATE, DESCRIPTION, EXCEEDES_MAXIMUN_CHARACTERS_BRAND_DESCRIPTION, EXCEEDES_MAXIMUN_CHARACTERS_BRAND_NAME, ITEM_CREATED, NAME, PLACEHOLDER_REGULAR_INPUT, PRICE, REQUIRED_FIELD } from '../../../shared/constants/constants';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CREATE_ITEM } from '../../../shared/constants/constants';
import { createItem } from '../../../shared/models/item';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../../../shared/services/item.service'
import { CategoryService } from '../../../shared/services/category.service';
import { BrandService } from '../../../shared/services/brand.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

  @Output() itemCreated: EventEmitter<void> = new EventEmitter<void>();

  title: string = CREATE_ITEM;
  textName: string = NAME;
  textDescription: string = DESCRIPTION;
  textPrice: string = PRICE;
  textAmount: string = AMOUNT;
  textCategories: string = "Selecciona las categorías";
  textBrand: string = "Selecciona una marca";

  placeholder: string = PLACEHOLDER_REGULAR_INPUT;
  contentButton: string = CREATE;

  form!: FormGroup;
  isLoading: boolean = false;
  categoriesDisabled: boolean = false;
  showToast: boolean = false;
  mistakeOcurred: boolean = false;
  message: string = '';
  nameValidation: string = EXCEEDES_MAXIMUN_CHARACTERS_BRAND_NAME;
  descriptionValidation: string = EXCEEDES_MAXIMUN_CHARACTERS_BRAND_DESCRIPTION;
  required: string = REQUIRED_FIELD;

  createItem: createItem ={
    name: '',
    description: '',
    price: 0,
    amount: 0,
    idCategories: [],
    idBrand: 0
  }

  maxCategories = 3;
  brands: {id:number, name:string, description:string}[] = [];
  categories: {id:number, categoryName:string, categoryDescription:string, isDisabled:boolean}[] = [];
  selectedBrand: number = 0;
  selectedCategories: number[] = [];

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private categoryService: CategoryService,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(90)]),
      price: new FormControl('', [Validators.required, Validators.maxLength(90)]),
      amount: new FormControl('', [Validators.required, Validators.maxLength(90)]),
      brand: new FormControl([''], Validators.required),
      categories: new FormControl([[]], Validators.required)
    });

    this.loadBrands();
    this.loadCategories();
  }

  get name() {
    return this.form.get('name') as FormControl;
  }

  get description() {
    return this.form.get('description') as FormControl;
  }

  get price() {
    return this.form.get('price') as FormControl;
  }

  get amount() {
    return this.form.get('amount') as FormControl;
  }

  onBrandSelected(brandId: number){
    this.selectedBrand = brandId;
  }

  onCategorieSelected(categoryId: number){
    const index = this.selectedCategories.indexOf(categoryId)
    if(index === -1){
      if(this.selectedCategories.length < this.maxCategories){
        this.selectedCategories.push(categoryId)
      }
    }else{
      this.selectedCategories.splice(index, 1)
    }

    this.form.get('categories')?.setValue(this.selectedCategories);

    this.categories = this.categories.map(category => {
      if (this.selectedCategories.length >= this.maxCategories) {
        return {
          ...category,
          isDisabled: !this.selectedCategories.includes(category.id)
        };
      } else {
        return { ...category, isDisabled: false};
      }
    });

  }

  loadCategories(){
    this.categoryService.listCategories().subscribe({
    next: (response) =>{
      this.categories = response.map(category => ({
        ...category,
        isDisabled: false
      }));
    },
    error: (error) =>{
      console.log("Ocurrio un error", error)
    }
    })
  }

  loadBrands(){
    this.brandService.listBrands().subscribe({
    next: (respose) =>{
      this.brands = respose;
    },
    error: (error) =>{
      console.log("Ocurrio un error", error)
    }
    })
  }

  onSubmit(){
    this.createItem = {
      name: this.name.value,
      description: this.description.value,
      price: Number(this.price.value),
      amount: Number(this.amount.value),
      idBrand: this.selectedBrand,
      idCategories: this.selectedCategories
    }

    if (this.form.valid) {
      this.isLoading = true;
      this.itemService.createItem(this.createItem).subscribe({
        next: () => {
          this.isLoading = false;
          this.mistakeOcurred = false;
          this.showToast = true;
          this.message = ITEM_CREATED;
          setTimeout(() => {
            this.showToast = false;
            this.itemCreated.emit();
          }, 3000);
          this.loadBrands();
          this.loadCategories();
          this.form.reset({
          name: '',
          description: '',
          price: '',
          amount:'',
          brand: [''],
          categories: [[]],
          });
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
