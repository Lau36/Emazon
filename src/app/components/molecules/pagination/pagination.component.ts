import { NEXT } from './../../utils/constants';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BACK } from '../../utils/constants';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Output() previousPageAction = new EventEmitter<void>();
  @Output() nextPageAction = new EventEmitter<void>();
  @Input() data: any[] = []
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Input() totalElements: number = 0;
  @Output() changePageSizeAction = new EventEmitter<any>();
  @Output() changePageSortDirectionAction = new EventEmitter<any>();

  tableColumns = [
    { field: 'categoryName', header: 'Nombre de la categoría' },
    { field: 'categoryDescription', header: 'Descripción' }
  ];

  optionsSize: number[] = [5, 10, 15, 20];
  optionsSort: string[] = ['asc', 'desc'];
  back = BACK;
  next = NEXT;



  onPageSizeSelected(option: any){
    this.changePageSizeAction.emit(Number(option));
  }

  onPageSortDirectionSelected(option: any){
    this.changePageSortDirectionAction.emit(String(option));
  }

  previousPage(){
    this.previousPageAction.emit();
  }

  nextPage(){
    this.nextPageAction.emit();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
