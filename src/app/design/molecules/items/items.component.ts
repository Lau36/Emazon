import { Component, Input, OnInit } from '@angular/core';

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

  quantity: number = 0;

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
      console.log("Aumentando cantidad", item.quantity);
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
      console.log("Disminuyendo cantidad", item.quantity);
    }
  }

}
