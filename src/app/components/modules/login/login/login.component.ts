import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { auth, TokenPayload } from '../../../core/models/interfaces';
import { AuthService } from '../../../core/services/auth.service';
import { ROLE_ADMIN, ROLE_AUX, ROLE_CUSTOMER } from '../../../shared/Roles';
import { PLACEHOLDER_REGULAR_INPUT } from '../../../shared/constants';
import { CORRECT_LOGIN, EMAIL, LOGIN, PASSWORD } from '../../../shared/constants/login';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  title: string = LOGIN;
  form!: FormGroup;
  isLoading: boolean = false;
  showToast: boolean = false;
  mistakeOcurred: boolean = false;
  contentButton: string = LOGIN;
  message: string = '';

  formFields: any[] = [];

  login: auth = {
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
        width: '23.5rem',
        height: '1rem',
        fontSize: '0.8rem',
        type: "text"
      },
      {
        typeField: 'input',
        content: PASSWORD,
        placeholder: PLACEHOLDER_REGULAR_INPUT,
        control: this.password,
        width: "23.5rem",
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
          this.isLoading = false;
          this.mistakeOcurred = false;
          this.showToast = true;
          this.message = CORRECT_LOGIN
          setTimeout(() => {
            localStorage.setItem('token', response.token)
            this.tokenDecoded();
            this.showToast = false;
          }, 2000);
          this.form.reset();
        },
        error: (error) => {
          this.isLoading = false;
          this.mistakeOcurred = true;
          this.showToast = true;
          this.message = error.error.message;
          setTimeout(() => {
            this.showToast = false;
          }, 2000);
        }
      })
    }
  }

  navigation(role: string){
    if(role === ROLE_ADMIN){
      this.router.navigate(['/admin/categorias'])
    }
    if(role === ROLE_CUSTOMER){
      this.router.navigate(['/'])
    }
    if(role === ROLE_AUX){
      this.router.navigate(['/warehouse'])
    }
  }

  tokenDecoded(){
    const token = localStorage.getItem('token')
    if(token){
      const tokenDecoded = jwtDecode<TokenPayload>(token);
      this.navigation(tokenDecoded.role)
    }
  }

}
