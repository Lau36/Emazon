import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { IconComponent } from './icon/icon.component';
import { InputComponent } from './input/input.component';
import { LoaderComponent } from './loader/loader.component';
import { TextComponentComponent } from './text-component/text-component.component';
import { TextareaComponent } from './textarea/textarea.component';
import { ToastComponent } from './toast/toast.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    ButtonComponent,
    IconComponent,
    IconComponent,
    InputComponent,
    LoaderComponent,
    TextComponentComponent,
    TextareaComponent,
    ToastComponent,
    TableComponent,
    DropdownComponent,
    CardComponent
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
    ToastComponent,
    TableComponent,
    DropdownComponent,
    CardComponent
  ]
})
export class AtomsModule {}
