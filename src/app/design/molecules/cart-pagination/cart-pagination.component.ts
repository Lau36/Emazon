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
  @Output() changePageSizeAction = new EventEmitter<number>();
  @Output() changePageSortDirectionAction = new EventEmitter<string>();
  @Output() filterByCategoryNameAction = new EventEmitter<string>();
  @Output() filterByBrandNameAction = new EventEmitter<string>();
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


  onPageSizeSelected(option: number){
    this.changePageSizeAction.emit(option);
  }

  onPageSortDirectionSelected(option: string){
    this.changePageSortDirectionAction.emit(option);
  }

  onPageFilterByCategoryNameSelected(option: string){
    this.filterByCategoryNameAction.emit(option);
  }

  onPageFilterByBrandNameSelected(option: string){
    this.filterByBrandNameAction.emit(option);
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
