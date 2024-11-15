import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  header: {elementName: string, path:string, icon?: string}[] =
  [
    {elementName: '', path: '', icon: ''},
  ];

  role: string = '';
  showCreateItem: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.header = this.route.snapshot.data['header']
  }

}
