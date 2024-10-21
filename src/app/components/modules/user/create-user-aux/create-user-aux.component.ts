import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CREATE, USER_CREATED } from '../../../shared/constants';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { userAux } from '../../../core/models/interfaces';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-create-user-aux',
  templateUrl: './create-user-aux.component.html',
  styleUrls: ['./create-user-aux.component.scss']
})
export class CreateUserAuxComponent implements OnInit {

  @Output() userCreated: EventEmitter<void> = new EventEmitter<void>();

  title: string = "Crear usuario";
  contentButton: string = CREATE;

  form!: FormGroup;
  isLoading: boolean = false;
  showToast: boolean = false;
  mistakeOcurred: boolean = false;
  message: string = '';
  formFields: any[] = []

  createUser: userAux = {
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

      this.userService.createUserAux(this.createUser).subscribe({
        next: () => {
          this.isLoading = false;
          this.mistakeOcurred = false;
          this.showToast = true;
          this.message = USER_CREATED;
          setTimeout(() => {
            this.showToast = false;
            this.userCreated.emit();
          }, 3000);
          this.form.reset();
        },
        error: (error) => {
          this.isLoading = false;
          this.mistakeOcurred = true;
          this.showToast = true;
          this.message = error.error.message;
          setTimeout(() => {
            this.showToast = false;
          }, 3000);
        }
      });
    }
  }

}
