import { BrandService } from '../../../core/services/brand.service';
import { pagination, responsePaginatedBrands } from '../../../core/models/interfaces';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-brands',
  templateUrl: './list-brands.component.html',
  styleUrls: ['./list-brands.component.scss']
})
export class ListBrandsComponent implements OnInit {

  brandList: any[] = [];

  response: any[] = [];

  isModalVisible: boolean = false;

  tableColumns = [
    { field: 'name', header: 'Nombre de la marca' },
    { field: 'description', header: 'Descripción' }
  ];

  pagination: pagination  = {
    page: 0,
    size: 5,
    sort: 'name',
    sortDirection: 'asc'
  }

  responsePaginatedBrands: responsePaginatedBrands = {
    brands: [],
    currentPage: 0,
    totalPages: 0,
    totalElements: 0
  }

  constructor(
    private brandService: BrandService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.listBrandsPaginated(this.pagination).subscribe({
      next: (response) => {
        this.brandList = response.brands;
        this.responsePaginatedBrands = {
          brands: response.brands,
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

  previusPage(){
    if(this.pagination.page > 0){
      this.pagination.page = this.pagination.page - 1;
      this.getBrands();
    }
  }

  nextPage(){
    if(this.responsePaginatedBrands.currentPage < this.responsePaginatedBrands.totalPages){
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
