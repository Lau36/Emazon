import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() columns: {field:string, header:string, render?:any}[] = [];

  constructor() { }

  isAnArray(array: []){
    return Array.isArray(array);
  }


}
