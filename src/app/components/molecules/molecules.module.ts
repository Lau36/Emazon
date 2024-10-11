import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header/header.component';
import { FormCreateComponent } from './form-create/form-create/form-create.component';
import { FooterComponent } from './footer/footer.component';
import { AtomsModule } from '../atoms/atoms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FormCreateComponent,
    FooterComponent,
    PaginationComponent
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
    PaginationComponent
  ]
})
export class MoleculesModule {}
