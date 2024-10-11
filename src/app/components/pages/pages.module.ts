import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { MoleculesModule } from '../molecules/molecules.module';
import { AtomsModule } from '../atoms/atoms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { CreateBranchComponent } from './create-brand/create-brand.component';
import { ListBrandsComponent } from './list-brands/list-brands.component';

@NgModule({
  declarations: [CreateCategoryComponent, ListCategoriesComponent, CreateBranchComponent, ListBrandsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MoleculesModule,
    AtomsModule
  ],
  exports: [CreateCategoryComponent, ListCategoriesComponent, CreateBranchComponent, ListBrandsComponent]
})
export class PagesModule {}
