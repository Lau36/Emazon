import { Component, OnInit } from '@angular/core';
import { listElementsNavAdmin } from '../../utils/adminHeader';
import { ActivatedRoute } from '@angular/router';
import { ROLE_ADMIN } from '../../shared/constants/Roles';

@Component({
  selector: 'app-item-dashboard-page',
  templateUrl: './item-dashboard-page.component.html',
  styleUrls: ['./item-dashboard-page.component.scss']
})
export class ItemDashboardPageComponent implements OnInit {
  header: {elementName: string, path:string}[] =
  [
    {elementName: '', path: ''},
  ];

  role: string = '';
  showCreateItem: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.header = this.route.snapshot.data['header']
    this.role = this.route.snapshot.data['expectedRole']
    this.showCreateItem = this.role === ROLE_ADMIN;
  }

}
