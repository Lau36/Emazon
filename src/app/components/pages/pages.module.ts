import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { MoleculesModule } from '../molecules/molecules.module';
import { AtomsModule } from '../atoms/atoms.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateCategoryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MoleculesModule
  ],
  exports: [CreateCategoryComponent]
})
export class PagesModule {}
