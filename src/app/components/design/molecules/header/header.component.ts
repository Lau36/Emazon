import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ADMIN } from '../../../shared/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {



  userName: string = ADMIN;
  // listElementsNav: {navName: string, path:string}[] = []
  listElementsNav: {elementName: string, path:string}[] = [
    {elementName: "Categorias", path:"/admin/categorias"},
    {elementName: "Marcas", path:"/admin/marcas"},
    {elementName: "Artículos", path:"/admin/articulos"}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
