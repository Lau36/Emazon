import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: {field:string, header:string, render?:any}[] = [];

  constructor() { }

  isAnArray(array: []){
    return Array.isArray(array);
  }

  ngOnInit(): void {
  }

}
