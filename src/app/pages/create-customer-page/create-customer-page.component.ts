import { Component} from '@angular/core';
import { HAVE_ACCOUNT, LOGIN } from '../../shared/constants/login';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-create-customer-page',
  templateUrl: './create-customer-page.component.html',
  styleUrls: ['./create-customer-page.component.scss']
})
export class CreateCustomerPageComponent{

  constructor(
    private  readonly userService: UserService
  ) { }

  service = this.userService.createCustomerUser;

  infoLink: {showLink: boolean, info: string, pathLink: string, contentLink: string} =
  {
    showLink: true,
    info: HAVE_ACCOUNT,
    pathLink: 'login',
    contentLink: LOGIN
  }

}
