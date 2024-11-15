import { ItemInCart } from './../../../shared/models/item';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BACK, NEXT } from '../../../shared/constants/constants';

@Component({
  selector: 'app-cart-pagination',
  templateUrl: './cart-pagination.component.html',
  styleUrls: ['./cart-pagination.component.scss']
})
export class CartPaginationComponent{

  @Output() previousPageAction = new EventEmitter<void>();
  @Output() nextPageAction = new EventEmitter<void>();
  @Output() changePageSizeAction = new EventEmitter<any>();
  @Output() changePageSortDirectionAction = new EventEmitter<any>();
  @Output() filterByCategoryNameAction = new EventEmitter<any>();
  @Output() filterByBrandNameAction = new EventEmitter<any>();
  @Output() removeItemFromCartAction = new EventEmitter<number>();

  @Input() tableContainerHeight: string = '20%';
  @Input() currentPage: number = 0;
  @Input() totalPages: number = 0;
  @Input() totalElements: number = 0;
  @Input() itemsInCart: ItemInCart[] = []
  @Input() optionsCategories: string[] = [''];
  @Input() optionsBrands: string[] = [''];
  @Input() contentButton: string = '';

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

  onPageFilterByCategoryNameSelected(option: any){
    this.filterByCategoryNameAction.emit(String(option));
  }

  onPageFilterByBrandNameSelected(option: any){
    this.filterByBrandNameAction.emit(String(option));
  }

  previousPage(){
    this.previousPageAction.emit();
  }

  nextPage(){
    this.nextPageAction.emit();
  }

  handleRemoveItem(itemId: number){
    this.removeItemFromCartAction.emit(itemId)
  }

  constructor() { }

}
