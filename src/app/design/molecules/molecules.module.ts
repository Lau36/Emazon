import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AtomsModule } from '../atoms/atoms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { ModalComponent } from './modal/modal.component';
import { FormCreateItemComponent } from './form-create-item/form-create-item.component';
import { ItemsComponent } from './items/items.component';
import { FormDynamicComponent } from './form-dynamic/form-dynamic.component';
import { CartPaginationComponent } from './cart-pagination/cart-pagination.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PaginationComponent,
    ModalComponent,
    FormCreateItemComponent,
    ItemsComponent,
    FormDynamicComponent,
    CartPaginationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AtomsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PaginationComponent,
    ModalComponent,
    FormCreateItemComponent,
    FormDynamicComponent,
    CartPaginationComponent
  ]
})
export class MoleculesModule {}
