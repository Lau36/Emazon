import { listElementsNavAdmin } from './../../../utils/adminHeader';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-dashboard-page',
  templateUrl: './brand-dashboard-page.component.html',
  styleUrls: ['./brand-dashboard-page.component.scss']
})
export class BrandDashboardPageComponent implements OnInit {

  header = listElementsNavAdmin;

  constructor() { }

  ngOnInit(): void {
  }

}
