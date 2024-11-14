import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddCart } from 'src/app/shared/models/cart';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent{

  @Input() items:
  {
  id: number,
  name: string,
  description: string,
  quantityInStock: number,
  price: number,
  categories:{id: number, name: string}[],
  brand:{id: number, name: string},
  quantity: number
  }[] = []
  @Output() addItem = new EventEmitter<AddCart>();

  item: AddCart = {
    itemId: 0,
    quantity: 0
  }

  increaseQuantity(item: {
    id: number,
    name: string,
    description: string,
    quantityInStock: number,
    price: number,
    categories:{id: number, name: string}[],
    brand:{id: number, name: string},
    quantity: number
    }){
      item.quantity = item.quantity + 1;
  }

  decreaseQuantity(item: {
    id: number,
    name: string,
    description: string,
    quantityInStock: number,
    price: number,
    categories:{id: number, name: string}[],
    brand:{id: number, name: string},
    quantity: number
    }){
    if(item.quantity > 1){
      item.quantity--;
    }
  }

  addItemToCart(itemId: number, quantity: number){
    this.item = {
      itemId: itemId,
      quantity: quantity
    }
    this.addItem.emit(this.item);
  }

}
