import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() name: string = '';
  @Input() description: string = '';
  @Input() price: number = 0;
  @Input() quantityInStock: number = 0;
  @Input() categories: {id:number, name: string}[] = [];
  @Input() brand: {id:number, name:string} = {id: 0, name:''};

  constructor() { }


}
