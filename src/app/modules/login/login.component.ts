import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenPayload } from '../../shared/models/tokenPayLoad';
import { AuthService } from '../../shared/services/auth.service';
import { ROLE_ADMIN, ROLE_AUX, ROLE_CUSTOMER } from '../../shared/constants/Roles';
import { PLACEHOLDER_REGULAR_INPUT } from '../../shared/constants/constants';
import { CORRECT_LOGIN, DONT_HAVE_ACCOUNT, EMAIL, LOGIN, PASSWORD, REGISTER } from '../../shared/constants/login';
import { jwtDecode } from 'jwt-decode';
import { hideToast } from '../../utils/helpers/hideToast';
import { Auth } from '../../shared/models/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private  readonly router: Router
  ) { }

  title: string = LOGIN;
  form!: FormGroup;
  isLoading: boolean = false;
  showToast: boolean = false;
  mistakeOcurred: boolean = false;
  contentButton: string = LOGIN;
  message: string = '';
  createAccountMessageLink: string = REGISTER;
  dontHaveAccountMessage: string = DONT_HAVE_ACCOUNT

  formFields: any[] = [];

  login: Auth = {
    email: '',
    password: ''
  };

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    this.formFields = [
      {
        typeField: 'input',
        content: EMAIL,
        placeholder: PLACEHOLDER_REGULAR_INPUT,
        control: this.email,
        width: '20rem',
        height: '1rem',
        fontSize: '0.8rem',
        type: "text"
      },
      {
        typeField: 'input',
        content: PASSWORD,
        placeholder: PLACEHOLDER_REGULAR_INPUT,
        control: this.password,
        width: '20rem',
        height: "1rem",
        fontSize: "0.8rem",
        type: 'password'
      }
    ]
  }

  get email(){
    return this.form.get('email') as FormControl;
  }

  get password(){
    return this.form.get('password') as FormControl;
  }

  onSubmit(){
    if(this.form.valid){
      this.login = {
        email: this.email.value,
        password: this.password.value
      }
      this.isLoading = true;
      this.authService.auth(this.login).subscribe({
        next: (response) => {
          this.authService.setToken(response.token);
          this.isLoading = false;
          this.showToast = true;
          this.message = CORRECT_LOGIN
          this.decodeTokenToNavigate();
          this.mistakeOcurred = false;
          hideToast(this.showToast);
        },
        error: (error) => {
          this.isLoading = false;
          this.mistakeOcurred = true;
          this.showToast = true;
          this.message = error.error.message;
          hideToast(this.showToast);
        }
      });

    }
  }


  navigation(role: string){
    switch(role){
      case ROLE_ADMIN:
        this.router.navigate(['/admin/categorias']);
      break;

      case ROLE_AUX:
        this.router.navigate(['/aux-bodega/categorias']);
      break;

      case ROLE_CUSTOMER:
        this.router.navigate(['/cliente/articulos']);
      break;
    }
  }

  decodeTokenToNavigate(){
    const token = this.authService.getToken();
    if(token){
      const tokenDecoded = jwtDecode<TokenPayload>(token);
      this.navigation(tokenDecoded.role)
    }
  }
}
