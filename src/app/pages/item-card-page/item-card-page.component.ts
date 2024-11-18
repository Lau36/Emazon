import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-card-page',
  templateUrl: './item-card-page.component.html',
  styleUrls: ['./item-card-page.component.scss']
})
export class ItemCardPageComponent implements OnInit {

  header: {elementName: string, path:string}[] =
  [
    {elementName: '', path: ''},
  ];

  constructor(private  readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.header = this.route.snapshot.data['header']
  }

}
