import { Component, OnInit } from '@angular/core';
import { listElementsNavAdmin } from '../../utils/adminHeader';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-create-user-aux-page',
  templateUrl: './create-user-aux-page.component.html',
  styleUrls: ['./create-user-aux-page.component.scss']
})
export class CreateUserAuxPageComponent implements OnInit {
  header = listElementsNavAdmin;

  constructor(
    private userService: UserService
  ) { }

  service = this.userService.createAuxUser;

  ngOnInit(): void {
  }

}
