import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ItemInCart } from '../../../shared/models/item'

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit{
  @Input() item: ItemInCart = {
    id: 0,
    name: '',
    description: '',
    quantityInCart: 0,
    quantityInStock: 0,
    areStock: true,
    nextSupplyDate: '',
    price: 0,
    categories: [{id: 0, name: ''}],
    brand: {id: 0, name: ''},
  };

  date: string = ''

  @Input() contentButton: string = ''
  @Output() removeItemAction = new EventEmitter<number>();

  handleRemoveItem(itemId: number): void{
    this.removeItemAction.emit(itemId)
  }

  refactorDate(): void{
    const newDate = this.item.nextSupplyDate.split('T')[0]
    this.item.nextSupplyDate = newDate
  }

  constructor() { }

  ngOnInit(): void {
    this.refactorDate();
  }

}
