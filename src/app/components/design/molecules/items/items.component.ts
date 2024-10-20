import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  @Input() items: {id: number, name: string, description: string, quantityInStock: number,
                  price: number, categories: {id: number, name: string}[], brand:{id: number, name: string}
                  }[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
