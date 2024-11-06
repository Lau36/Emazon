import {categoriesListresponse } from '../../../shared/interfaces/category';
import { pagination } from '../../../shared/models/pagination';
import { CategoryService } from '../../../shared/services/category.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent implements OnInit {

  @Input() showCreateCategory: boolean = false;

  categoriesList: {id: number, categoryName: string, categoryDescription: string}[] = [];

  isModalVisible: boolean = false;

  tableColumns = [
    { field: 'categoryName', header: 'Nombre de la categoría' },
    { field: 'categoryDescription', header: 'Descripción' }
  ];

  listCategories: pagination = {
    page: 0,
    size: 5,
    sort: 'categoryName',
    sortDirection: 'asc'
  }

  responseListCategories: categoriesListresponse = {
    categories: [],
    currentPage: 0,
    totalPages: 0,
    totalElements: 0
  }

  constructor(
    private CategoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.CategoryService.listCategoriesPaginated(this.listCategories).subscribe({
      next: (response) => {
        this.categoriesList = response.categories
        this.responseListCategories = {
          categories: response.categories,
          currentPage: response.currentPage,
          totalPages: response.totalPages,
          totalElements: response.totalElements
        }
      },
      error: (error) => {
        console.error("Ocurrió un error", error);
      }
    }
    )
  }

  onPageSizeChange(newSize: number): void {
    this.listCategories.size = newSize;
    this.listCategories.page = 0;
    this.getCategories();
  }

  onPageSortDirectionChange(newSortDirection: string): void {
    this.listCategories.sortDirection = newSortDirection;
    this.listCategories.page = 0;
    this.getCategories();
  }

  previusPage(){
    if(this.listCategories.page > 0){
      this.listCategories.page = this.listCategories.page - 1;
      this.getCategories();
    }
  }

  nextPage(){
    if(this.responseListCategories.currentPage < this.responseListCategories.totalPages){
      this.listCategories.page = this.listCategories.page += 1;
      this.getCategories();
    }
  }

  openModal(){
    this.isModalVisible = true;
  }

  closeModal(){
    this.isModalVisible = false;
    this.getCategories();
  }


}
