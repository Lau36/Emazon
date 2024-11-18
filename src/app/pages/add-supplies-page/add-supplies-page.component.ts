import { Component } from '@angular/core';
import { listElementsNavWarehouseAssistant } from '../../utils/warehouse-assistant-header';
@Component({
  selector: 'app-add-supplies-page',
  templateUrl: './add-supplies-page.component.html',
  styleUrls: ['./add-supplies-page.component.scss']
})
export class AddSuppliesPageComponent {

  header = listElementsNavWarehouseAssistant;

  constructor() { }


}
