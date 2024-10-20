import { NEXT } from '../../../shared/constants';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BACK } from '../../../shared/constants';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Output() previousPageAction = new EventEmitter<void>();
  @Output() nextPageAction = new EventEmitter<void>();
  @Input() data: string[] = []
  @Input() tableColumns: {field:string, header:string}[] = [];
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Input() totalElements: number = 0;
  @Output() changePageSizeAction = new EventEmitter<any>();
  @Output() changePageSortDirectionAction = new EventEmitter<any>();
  @Output() changePageSortByAction = new EventEmitter<any>();
  @Input() tableContainerHeight: string = '20%';

  @Input() showItems: boolean = false;
  @Input() items: {id: number, name: string, description: string, quantityInStock: number,
    price: number, categories: {id: number, name: string}[], brand:{id: number, name: string}
    }[] = []
  @Input() showTable: boolean = true;
  @Input() showSortBy: boolean = false;
  @Input() optionsShortBytoShow: [] = [];
  @Input() optionsShortBy: {id: string, name:string}[]  = [];



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

  onPageSortBySelected(option: any){
    this.changePageSortByAction.emit(String(option));
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
