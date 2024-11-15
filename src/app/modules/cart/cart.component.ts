import { Component} from '@angular/core';
import { Cart } from '../../shared/models/cart';
import { CartPagination } from '../../shared/models/pagination';
import { BrandService } from '../../shared/services/brand.service';
import { CartService } from '../../shared/services/cart.service';
import { CategoryService } from '../../shared/services/category.service';
import { BRAND_AND_CATEGORY_NAME, BRAND_NAME, CATEGORY_NAME,  NONE } from '../../shared/constants/filter';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cartPagination: CartPagination = {
    page: 0,
    size: 5,
    sort: 'name',
    sortDirection: 'asc',
    filter: 'none',
    filterName: 'none'
  }

  cartResponse: Cart = {
    items: [],
    totalPrice: 0,
    currentPage: 0,
    totalPages: 0,
    totalElements: 0
  }

  categories: string[] = [];
  brands: string[] = [];
  selectedCategory: string = '';
  selectedBrand: string = '';

  constructor(private categoryService: CategoryService, private brandService: BrandService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartPaginated();
    this.getAllCategories();
    this.getAllBrands();
  }

  getCartPaginated(){
    this.cartService.viewCart(this.cartPagination).subscribe({
      next: (response) => {
        this.cartResponse = {
          items: response.items,
          totalPrice: response.totalPrice,
          currentPage: response.currentPage,
          totalPages: response.totalPages,
          totalElements: response.totalElements
        }
      },
      error: (error) => {
        console.error("Ocurrió un error", error);
      }
    });
  }

  getAllCategories(){
    this.categoryService.listCategories().subscribe({
      next: (response) => {
        this.categories.push(...response.map(category => category.categoryName));
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getAllBrands(){
    this.brandService.listBrands().subscribe({
      next: (response) => {
        this.brands.push(...response.map(brand => brand.name))
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onPageSizeChange(newSize: number): void {
    this.cartPagination.size = newSize;
    this.cartPagination.page = 0;
    this.getCartPaginated();
  }

  onPageSortDirectionChange(newSortDirection: string): void {
    this.cartPagination.sortDirection = newSortDirection;
    this.cartPagination.page = 0;
    this.getCartPaginated();
  }

  onPageFilterByCategoryNameSelected(option: string) {
    this.selectedCategory = option;
    this.updateFilters();
  }

  onPageFilterByBrandNameSelected(option: string) {
    this.selectedBrand = option;
    this.updateFilters();
  }

  updateFilters() {
    if (this.selectedCategory && this.selectedBrand) {
      this.cartPagination.filter = BRAND_AND_CATEGORY_NAME;
      this.cartPagination.filterName = `${this.selectedCategory},${this.selectedBrand}`;
    }
    else if (this.selectedCategory ){
      this.cartPagination.filter = CATEGORY_NAME;
      this.cartPagination.filterName = this.selectedCategory;
    }
    else if (this.selectedBrand ){
      this.cartPagination.filter = BRAND_NAME;
      this.cartPagination.filterName = this.selectedBrand;
    }
    else {
      this.cartPagination.filter = NONE;
    }
    this.getCartPaginated();
  }

  previusPage(){
    if(this.cartPagination.page > 0){
      this.cartPagination.page = this.cartPagination.page - 1;
      this.getCartPaginated();
    }
  }

  nextPage(){
    if(this.cartResponse.currentPage < this.cartResponse.totalPages){
      this.cartPagination.page = this.cartPagination.page += 1;
      this.getCartPaginated();
    }
  }
}
