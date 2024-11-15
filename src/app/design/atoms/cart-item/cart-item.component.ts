import { Component, EventEmitter, Input, Output} from '@angular/core';
import { ItemInCart } from '../../../shared/models/item'

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
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

  @Input() contentButton: string = ''
  @Output() removeItemAction = new EventEmitter<number>();

  handleRemoveItem(itemId: number): void{
    this.removeItemAction.emit(itemId)
  }

  constructor() { }

}
