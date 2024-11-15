import { Component} from '@angular/core';
import { Cart } from '../../shared/models/cart';
import { CartPagination } from '../../shared/models/pagination';
import { BrandService } from '../../shared/services/brand.service';
import { CartService } from '../../shared/services/cart.service';
import { CategoryService } from '../../shared/services/category.service';
import { BRAND_AND_CATEGORY_NAME, BRAND_NAME, CATEGORY_NAME,  NONE } from '../../shared/constants/filter';
import { SUCCESSFULY_ITEM_REMOVED } from '../../shared/constants/cart';
import { hideToast2 } from '../../utils/helpers/hideToast';
import { AN_ERROR_OCCURRED, UNKNOW_ERROR } from '../../shared/constants/constants';

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

  // items = [{
  //   id: 101,
  //   name: "Laptop X100",
  //   description: "A high-performance laptop suitable for gaming and professional work.",
  //   quantityInCart: 2,
  //   quantityInStock: 10,
  //   areStock: true,
  //   nextSupplyDate: "2024-12-01",
  //   price: 1200.00,
  //   categories: [
  //     {
  //       id: 1,
  //       name: "Electronics"
  //     },
  //     {
  //       id: 2,
  //       name: "Computers"
  //     }
  //   ],
  //   brand: {
  //     id: 5,
  //     name: "TechBrand"
  //   }
  // },
  // {
  //   id: 101,
  //   name: "Laptop X100",
  //   description: "A high-performance laptop suitable for gaming and professional work.",
  //   quantityInCart: 2,
  //   quantityInStock: 10,
  //   areStock: true,
  //   nextSupplyDate: "2024-12-01",
  //   price: 1200.00,
  //   categories: [
  //     {
  //       id: 1,
  //       name: "Electronics"
  //     },
  //     {
  //       id: 2,
  //       name: "Computers"
  //     }
  //   ],
  //   brand: {
  //     id: 5,
  //     name: "TechBrand"
  //   }
  // },
  // {
  //   id: 101,
  //   name: "Laptop X100",
  //   description: "A high-performance laptop suitable for gaming and professional work.",
  //   quantityInCart: 2,
  //   quantityInStock: 10,
  //   areStock: true,
  //   nextSupplyDate: "2024-12-01",
  //   price: 1200.00,
  //   categories: [
  //     {
  //       id: 1,
  //       name: "Electronics"
  //     },
  //     {
  //       id: 2,
  //       name: "Computers"
  //     }
  //   ],
  //   brand: {
  //     id: 5,
  //     name: "TechBrand"
  //   }
  // }]

  categories: string[] = [];
  brands: string[] = [];
  selectedCategory: string = '';
  selectedBrand: string = '';
  showToast: boolean = false;
  message: string = "";
  mistakeOcurred: boolean = false;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
    private readonly cartService: CartService) { }

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
        console.error(AN_ERROR_OCCURRED, error);
      }
    });
  }

  getAllCategories(){
    this.categoryService.listCategories().subscribe({
      next: (response) => {
        this.categories.push(...response.map(category => category.categoryName));
      },
      error: (error) => {
        console.error(AN_ERROR_OCCURRED, error);
      }
    });
  }

  getAllBrands(){
    this.brandService.listBrands().subscribe({
      next: (response) => {
        this.brands.push(...response.map(brand => brand.name))
      },
      error: (error) => {
        console.error(AN_ERROR_OCCURRED, error);
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

  removeItemFromCart(itemId: number): void {
    this.cartService.removeItemFromCart(itemId).subscribe({
      next: () => {
        this.showToast = true;
        this.message = SUCCESSFULY_ITEM_REMOVED
        this.mistakeOcurred = false;
        hideToast2(() => {
          this.showToast = false;
        });
        this.getCartPaginated();
      },
      error: (error) => {
        console.log("Error", error)
        this.showToast = true;
        this.mistakeOcurred = true;
        this.message = error.error?.message || UNKNOW_ERROR;
        hideToast2(() => {
          this.showToast = false;
        });
      }
    })
  }
}
