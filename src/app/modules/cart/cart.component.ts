import { Component} from '@angular/core';
import { Cart } from '../../shared/models/cart';
import { CartPagination } from '../../shared/models/pagination';
import { BrandService } from '../../shared/services/brand.service';
import { CartService } from '../../shared/services/cart.service';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cartDataSimulated: Cart = {
    items: [
      {
        id: 1,
        name: "Laptop Pro 15",
        description: "Laptop de alto rendimiento con pantalla de 15 pulgadas.",
        quantityInCart: 2,
        quantityInStock: 5,
        areStock: true,
        nextSupplyDate: "2024-12-15",
        price: 1500,
        categories: [
          { id: 101, name: "Electronics" },
          { id: 102, name: "Laptops" }
        ],
        brand: { id: 1, name: "TechBrand" }
      },
      {
        id: 2,
        name: "Wireless Mouse",
        description: "Mouse inalámbrico ergonómico con batería de larga duración.",
        quantityInCart: 1,
        quantityInStock: 15,
        areStock: true,
        nextSupplyDate: "2024-11-20",
        price: 50,
        categories: [
          { id: 103, name: "Accessories" },
          { id: 104, name: "Peripherals" }
        ],
        brand: { id: 2, name: "GadgetWorld" }
      },
      {
        id: 3,
        name: "Monitor 4K Ultra HD",
        description: "Monitor con resolución 4K y pantalla de 27 pulgadas.",
        quantityInCart: 1,
        quantityInStock: 0,
        areStock: false,
        nextSupplyDate: "2024-12-05",
        price: 400,
        categories: [
          { id: 101, name: "Electronics" },
          { id: 105, name: "Monitors" }
        ],
        brand: { id: 3, name: "DisplayMaster" }
      }
    ],
    totalPrice: 3.450,
    currentPage: 1,
    totalPages: 1,
    totalElements: 3
  };

  cartPagination: CartPagination = {
    page: 0,
    size: 5,
    sort: 'name',
    sortDirection: 'asc',
    filter: 'brandName',
    filterName: 'apple'
  }

  cartResponse: Cart = {
    items: [],
    totalPrice: 0,
    currentPage: 0,
    totalPages: 0,
    totalElements: 0
  }

  categories: string[] = [''];
  brands: string[] = [''];

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

  onPageFilterByCategoryNameSelected(option: string){
    this.cartPagination.filter = 'categoryName';
    this.cartPagination.filterName = option;
  }

  onPageFilterByBrandNameSelected(option: string){
    this.cartPagination.filter = 'brandName';
    this.cartPagination.filterName = option;
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
