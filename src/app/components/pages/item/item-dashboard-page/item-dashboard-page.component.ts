import { Component, OnInit } from '@angular/core';
import { listElementsNavAdmin } from 'src/app/components/utils/adminHeader';

@Component({
  selector: 'app-item-dashboard-page',
  templateUrl: './item-dashboard-page.component.html',
  styleUrls: ['./item-dashboard-page.component.scss']
})
export class ItemDashboardPageComponent implements OnInit {
  header = listElementsNavAdmin;

  constructor() { }

  ngOnInit(): void {
  }

}
