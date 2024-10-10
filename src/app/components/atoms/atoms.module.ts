import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button/button.component';
import { IconComponent } from './icon/icon/icon.component';
import { InputComponent } from './input/input/input.component';
import { LoaderComponent } from './loader/loader.component';
import { TextComponentComponent } from './text-component/text-component.component';
import { TextareaComponent } from './textarea/textarea.component';
import { ToastComponent } from './toast/toast.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ButtonComponent,
    IconComponent,
    IconComponent,
    InputComponent,
    LoaderComponent,
    TextComponentComponent,
    TextareaComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule],
  exports: [
    ButtonComponent,
    IconComponent,
    IconComponent,
    InputComponent,
    LoaderComponent,
    TextComponentComponent,
    TextareaComponent,
    ToastComponent
  ]
})
export class AtomsModule {}