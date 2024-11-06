import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ROLE_ADMIN } from '../../shared/constants/Roles';

@Component({
  selector: 'app-category-dashboard-page',
  templateUrl: './category-dashboard-page.component.html',
  styleUrls: ['./category-dashboard-page.component.scss']
})
export class CategoryDashboardPageComponent implements OnInit {
  header: {elementName: string, path:string}[] =
  [
    {elementName: '', path: ''},
  ];

  role: string = '';
  showCreateCategory: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.header = this.route.snapshot.data['header']
    this.role = this.route.snapshot.data['expectedRole']
    this.showCreateCategory = this.role === ROLE_ADMIN;
  }



}
