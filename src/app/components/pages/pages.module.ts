import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { MoleculesModule } from '../molecules/molecules.module';
import { AtomsModule } from '../atoms/atoms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { CreateBrandComponent } from './create-brand/create-brand.component';
import { ListBrandsComponent } from './list-brands/list-brands.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { ListItemsComponent } from './list-items/list-items.component';

@NgModule({
  declarations: [CreateCategoryComponent, ListCategoriesComponent, CreateBrandComponent, ListBrandsComponent, CreateItemComponent, ListItemsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MoleculesModule,
    AtomsModule
  ],
  exports: [CreateCategoryComponent, ListCategoriesComponent, CreateBrandComponent, ListBrandsComponent, CreateItemComponent]
})
export class PagesModule {}
