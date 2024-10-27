import { Component, OnInit } from '@angular/core';
import { listElementsNavAdmin } from '../../../utils/adminHeader';

@Component({
  selector: 'app-category-dashboard-page',
  templateUrl: './category-dashboard-page.component.html',
  styleUrls: ['./category-dashboard-page.component.scss']
})
export class CategoryDashboardPageComponent implements OnInit {
  header = listElementsNavAdmin;

  constructor() { }

  ngOnInit(): void {
  }

}
