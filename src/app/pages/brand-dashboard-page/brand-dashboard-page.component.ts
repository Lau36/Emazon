import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ROLE_ADMIN } from '../../shared/constants/Roles';

@Component({
  selector: 'app-brand-dashboard-page',
  templateUrl: './brand-dashboard-page.component.html',
  styleUrls: ['./brand-dashboard-page.component.scss']
})
export class BrandDashboardPageComponent implements OnInit {

  header: {elementName: string, path:string}[] =
  [
    {elementName: '', path: ''},
  ];

  role: string = '';
  showCreateBrand: boolean = false;

  constructor(private  readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.header = this.route.snapshot.data['header']
    this.role = this.route.snapshot.data['expectedRole']
    this.showCreateBrand = this.role === ROLE_ADMIN;
  }

}
