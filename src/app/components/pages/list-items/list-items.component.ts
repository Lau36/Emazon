import { ItemService } from 'src/app/services/item.service';
import { Component, OnInit } from '@angular/core';
import { pagination, responsePaginatedItems } from 'src/app/models/interfaces';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {

  items: any[] = [];

  response: any[] = [];

  isModalVisible: boolean = false;

  pagination: pagination  = {
    page: 0,
    size: 5,
    sort: 'name',
    sortDirection: 'asc'
  }

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
  ) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.itemService.listItemsPaginated(this.pagination).subscribe({
      next: (response) => {
        this.items = response.items;
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
    this.getBrands();
  }

  onPageSortDirectionChange(newSortDirection: string): void {
    this.pagination.sortDirection = newSortDirection;
    this.pagination.page = 0;
    this.getBrands();
  }

  onPageSortByChange(newSortBy: string): void {
    this.pagination.sort = newSortBy;
    this.pagination.page = 0;
    this.getBrands();
  }

  previusPage(){
    if(this.pagination.page > 0){
      this.pagination.page = this.pagination.page - 1;
      this.getBrands();
    }
  }

  nextPage(){
    if(this.responsePaginatedItems.currentPage < this.responsePaginatedItems.totalPages){
      this.pagination.page = this.pagination.page += 1;
      this.getBrands();
    }
  }

  openModal(){
    this.isModalVisible = true;
  }

  closeModal(){
    this.isModalVisible = false;
    this.getBrands();
  }

}
