import { NEXT, BACK } from '../../../shared/constants/constants';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddCart } from 'src/app/shared/models/cart';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Output() previousPageAction = new EventEmitter<void>();
  @Output() nextPageAction = new EventEmitter<void>();
  @Input() data: unknown[] = []
  @Input() tableColumns: {field:string, header:string}[] = [];
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Input() totalElements: number = 0;
  @Output() changePageSizeAction = new EventEmitter<number>();
  @Output() changePageSortDirectionAction = new EventEmitter<string>();
  @Output() changePageSortByAction = new EventEmitter<string>();
  @Input() tableContainerHeight: string = '20%';

  @Input() showItems: boolean = false;
  @Input() items: {id: number, name: string, description: string, quantityInStock: number,
    price: number, categories: {id: number, name: string}[], brand:{id: number, name: string}, quantity: number
    }[] = []
  @Input() showTable: boolean = true;
  @Input() showSortBy: boolean = false;
  @Input() optionsShortBytoShow: [] = [];
  @Input() optionsShortBy: {id: string, name:string}[]  = [];

  @Input() height:string = '50vh'

  @Output() addItemToCartAction = new EventEmitter<AddCart>();



  optionsSize: number[] = [5, 10, 15, 20];
  optionsSort: string[] = ['asc', 'desc'];
  back = BACK;
  next = NEXT;



  onPageSizeSelected(option: number){
    this.changePageSizeAction.emit(option);
  }

  onPageSortDirectionSelected(option: string){
    this.changePageSortDirectionAction.emit(option);
  }

  onPageSortBySelected(option: string){
    this.changePageSortByAction.emit(option);
  }

  addItemToCart(item: AddCart){
    this.addItemToCartAction.emit(item);
  }

  previousPage(){
    this.previousPageAction.emit();
  }

  nextPage(){
    this.nextPageAction.emit();
  }

  constructor() { }

}
