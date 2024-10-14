import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header/header.component';
import { FormCreateComponent } from './form-create/form-create/form-create.component';
import { FooterComponent } from './footer/footer.component';
import { AtomsModule } from '../atoms/atoms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { ModalComponent } from './modal/modal.component';
import { FormCreateItemComponent } from './form-create-item/form-create-item.component';
import { ItemsComponent } from './items/items.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FormCreateComponent,
    FooterComponent,
    PaginationComponent,
    ModalComponent,
    FormCreateItemComponent,
    ItemsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AtomsModule
  ],
  exports: [
    HeaderComponent,
    FormCreateComponent,
    FooterComponent,
    PaginationComponent,
    ModalComponent,
    FormCreateItemComponent
  ]
})
export class MoleculesModule {}
