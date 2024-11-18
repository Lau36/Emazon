import { ItemService } from '../../../shared/services/item.service'
import { Component, Input, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/models/pagination';
import { ItemsPaginatedResponse } from '../../../shared/interfaces/item';
import { AddCart } from '../../../shared/models/cart';
import { CartService } from '../../../shared/services/cart.service';
import { hideToast2 } from '../../../utils/helpers/hideToast';
import { SUCCESSFULLY_ITEM_ADDED_TO_CART } from '../../../shared/constants/cart';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {

  @Input() showCreateItem: boolean = false;
  @Input() showItemsCard: boolean = false;
  @Input() showItemsTable: boolean = true;
  showToast: boolean = false;
  message: string = "";
  mistakeOcurred: boolean = false;

  items: {id: number, name: string, description: string, quantityInStock: number,
    price: number, categories: {id: number, name: string}[], brand:{id: number, name: string}, quantity: number
    }[] = []

  data: unknown[] = [];

  response: unknown[] = [];

  isModalVisible: boolean = false;

  pagination: Pagination  = {
    page: 0,
    size: 5,
    sort: 'name',
    sortDirection: 'asc'
  }

  tableColumns =
  [ {field: "name", header: "Nombre"},
    {field: "description", header: "Descripción"},
    {field: "price", header: "Precio", render: (price: number) => `$${price.toFixed(2)}`},
    {field: "quantityInStock", header: "Cantidad"},
    {field: "brandName", header: "Marca"},
    {field: "categories", header: "Categorias"}
  ]

  responsePaginatedItems: ItemsPaginatedResponse = {
    items: [],
    currentPage: 0,
    totalPages: 0,
    totalElements: 0
  }

  options: {id: string, name:string}[] = [
    {id: 'itemName', name:'Nombre de articulo'},
    {id: 'brandName', name:'Nombre de marca'},
    {id: 'categoryName', name:'Nombre de categoría'}
  ]

  constructor(private readonly itemService: ItemService, private readonly cartService: CartService){}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(){
    this.itemService.listItemsPaginated(this.pagination).subscribe({
      next: (response) => {
        this.items = response.items.map (item => ({
          ...item,
          quantity: 1
        }));
        this.data = this.items.map( item => ({
          ...item,
          brandName: item.brand.name,
          categories: item.categories
        }));

        this.responsePaginatedItems = {
          items: response.items,
          currentPage: response.currentPage,
          totalPages: response.totalPages,
          totalElements: response.totalElements
        };
      },
      error: (error) => {
        console.error("Ocurrió un error", error);
      }
    }
    )
  }

  onPageSizeChange(newSize: number): void {
    this.pagination.size = newSize;
    this.pagination.page = 0;
    this.getItems();
  }

  onPageSortDirectionChange(newSortDirection: string): void {
    this.pagination.sortDirection = newSortDirection;
    this.pagination.page = 0;
    this.getItems();
  }

  onPageSortByChange(newSortBy: string): void {
    this.pagination.sort = newSortBy;
    this.pagination.page = 0;
    this.getItems();
  }

  previusPage(){
    if(this.pagination.page > 0){
      this.pagination.page = this.pagination.page - 1;
      this.getItems();
    }
  }

  nextPage(){
    if(this.responsePaginatedItems.currentPage < this.responsePaginatedItems.totalPages){
      this.pagination.page = this.pagination.page += 1;
      this.getItems();
    }
  }

  openModal(){
    this.isModalVisible = true;
  }

  closeModal(){
    this.isModalVisible = false;
    this.getItems();
  }

  addItemToCart(item: AddCart){
    this.cartService.addItemToCart(item).subscribe(
      {
        next: () => {
          this.showToast = true;
          this.message = SUCCESSFULLY_ITEM_ADDED_TO_CART
          this.mistakeOcurred = false;
          hideToast2(() => {
            this.showToast = false;
          });
        },
        error: (error) => {
          this.showToast = true;
          this.mistakeOcurred = true;
          let errorMessage = error.error.message;
          const dateMatch = errorMessage.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d+/);
          if (dateMatch) {
            const datePart = dateMatch[0].split('T')[0];
            errorMessage = errorMessage.replace(dateMatch[0], datePart);
          }
          this.message = errorMessage;
          hideToast2(() => {
            this.showToast = false;
          });
        }
      }
    )
  }

}
