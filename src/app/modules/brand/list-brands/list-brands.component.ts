import { BrandsPaginatedResponse } from './../../../shared/interfaces/brand';
import { BrandService } from '../../../shared/services/brand.service';
import { Component, Input, OnInit } from '@angular/core';
import { Pagination } from '../../../shared/models/pagination';

@Component({
  selector: 'app-list-brands',
  templateUrl: './list-brands.component.html',
  styleUrls: ['./list-brands.component.scss']
})
export class ListBrandsComponent implements OnInit {

  @Input() showCreateBrand: boolean = false;

  brandList: {id:number, name:string, description:string}[] = [];

  isModalVisible: boolean = false;

  tableColumns = [
    { field: 'name', header: 'Nombre de la marca' },
    { field: 'description', header: 'Descripción' }
  ];

  pagination: Pagination  = {
    page: 0,
    size: 5,
    sort: 'name',
    sortDirection: 'asc'
  }

  responsePaginatedBrands: BrandsPaginatedResponse = {
    brands: [],
    currentPage: 0,
    totalPages: 0,
    totalElements: 0
  }

  constructor(
    private readonly brandService: BrandService
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
