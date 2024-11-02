import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { CREATE, INVALID_FORM, USER_CREATED } from '../../shared/constants/constants';
import { userCreatedResponse } from '../../shared/interfaces/user';
import { user } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';
import { handleResponse } from '../../utils/helpers/handleResponse';
import { hideToast } from '../../utils/helpers/hideToast';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  @Input() formTitle: string = '';
  @Input() createService: (data: user) => Observable<userCreatedResponse> =
  (data: user) => of({ message: '', email: '' });

  @Input() infoLink: {showLink: boolean, info: string, pathLink: string, contentLink: string} =
  {
    showLink: false,
    info: '',
    pathLink: '',
    contentLink: ''
  }


  contentButton: string = CREATE;

  form!: FormGroup;
  isLoading: boolean = false;
  showToast: boolean = false;
  mistakeOcurred: boolean = false;
  message: string = '';
  formFields: any[] = []

  createUser: user = {
    name: '',
    lastName: '',
    identification: 0,
    phoneNumber: '',
    birthDate: '',
    email: '',
    password: ''
  }

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('',  Validators.required),
      lastName: new FormControl('',  Validators.required),
      identification: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(13)]),
      birthDate: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

    this.formFields = [
      {
        typeField: 'input',
        content: 'Nombre',
        placeholder: 'Escriba aquí',
        control: this.name,
        width: '23.5rem',
        height: '1rem',
        fontSize: '0.8rem',
        type: "text"
      },
      {
        typeField: 'input',
        content: 'Apellido',
        placeholder: 'Escriba aquí',
        control: this.lastName,
        width: '23.5rem',
        height: '1rem',
        fontSize: '0.8rem',
        type: "text"
      },
      {
        typeField: 'input',
        content: 'Número de cédula',
        placeholder: 'Escriba aquí',
        control: this.identification,
        width: '23.5rem',
        height: '1rem',
        fontSize: '0.8rem',
        type: "number"
      },
      {
        typeField: 'input',
        content: 'Celular',
        placeholder: 'Escriba aquí',
        control: this.phoneNumber,
        width: '23.5rem',
        height: '1rem',
        fontSize: '0.8rem',
        type: "text"
      },
      {
        typeField: 'input',
        content: 'Fecha de nacimiento',
        placeholder: 'Escriba aquí',
        control: this.birthDate,
        width: '23.5rem',
        height: '1rem',
        fontSize: '0.8rem',
        type: "date"
      },
      {
        typeField: 'input',
        content: 'Correo electronico',
        placeholder: 'Escriba aquí',
        control: this.email,
        width: '23.5rem',
        height: '1rem',
        fontSize: '0.8rem',
        type: "text"
      },
      {
        typeField: 'input',
        content: 'Contraseña',
        placeholder: 'Escriba aquí',
        control: this.password,
        width: '23.5rem',
        height: '1rem',
        fontSize: '0.8rem',
        type: "password"
      }
    ]
  }

  get name() {
    return this.form.get('name') as FormControl;
  }

  get lastName() {
    return this.form.get('lastName') as FormControl;
  }

  get identification() {
    return this.form.get('identification') as FormControl;
  }

  get phoneNumber() {
    return this.form.get('phoneNumber') as FormControl;
  }

  get birthDate() {
    return this.form.get('birthDate') as FormControl;
  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }




  onSubmit() {
    if (this.form.valid) {
      this.createUser = {
        name: this.name.value,
        lastName: this.lastName.value,
        identification: this.identification.value,
        phoneNumber: this.phoneNumber.value,
        birthDate: this.birthDate.value,
        email: this.email.value,
        password: this.password.value
      }
      this.isLoading = true;
      this.handleServiceCreateUserCall(this.createService.bind(this.userService), this.createUser, USER_CREATED);
    }else{
      this.showToast = true;
      this.message = INVALID_FORM;
      hideToast(this.showToast);
    }
  }

  handleServiceCreateUserCall(service: (data: user) => Observable<userCreatedResponse>, data: user, successMessage: string) {
    this.isLoading = true;
    service(data).subscribe({
      next: () => {
        handleResponse(this,  successMessage, true);
        hideToast(this.showToast)
        this.form.reset();
      },
      error: (error) => {
        handleResponse(this,  error.error.message, false);
        hideToast(this.showToast)
      }
    });
  }

}
