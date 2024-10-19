import { ItemService } from '../../../../core/services/item.service'
import { Component, OnInit } from '@angular/core';
import { pagination, responsePaginatedItems } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {

  items: any[] = [];

  data: any[] = [];

  response: any[] = [];

  isModalVisible: boolean = false;

  pagination: pagination  = {
    page: 0,
    size: 5,
    sort: 'name',
    sortDirection: 'asc'
  }

  tableColumns =
  [ {field: "name", header: "Nombre"},
    {field: "description", header: "Descripción"},
    {field: "price", header: "Precio"},
    {field: "quantityInStock", header: "Cantidad"},
    {field: "brandName", header: "Marca"},
    {field: "categories", header: "Categorias"},
  ]

  responsePaginatedItems: responsePaginatedItems = {
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

  constructor(
    private itemService: ItemService
  ){}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(){
    this.itemService.listItemsPaginated(this.pagination).subscribe({
      next: (response) => {
        this.items = response.items;
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

}
