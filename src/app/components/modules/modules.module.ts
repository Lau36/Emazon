import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoleculesModule } from '../design/molecules/molecules.module';
import { AtomsModule } from '../design/atoms/atoms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateBrandComponent } from './brand/pages/create-brand/create-brand.component';
import { CreateCategoryComponent } from './category/pages/create-category/create-category.component';
import { ListCategoriesComponent } from './category/pages/list-categories/list-categories.component';
import { ListBrandsComponent } from './brand/pages/list-brands/list-brands.component';
import { CreateItemComponent } from './item/pages/create-item/create-item.component';
import { ListItemsComponent } from './item/pages/list-items/list-items.component';
import { OrganismsModule } from "../design/organisms/organisms.module";
import { CreateUserAuxComponent } from './user/create-user-aux/create-user-aux.component';


@NgModule({
  declarations: [CreateCategoryComponent, ListCategoriesComponent, CreateBrandComponent, ListBrandsComponent, CreateItemComponent, ListItemsComponent, CreateUserAuxComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MoleculesModule,
    AtomsModule,
    OrganismsModule
],
  exports: [CreateCategoryComponent, ListCategoriesComponent, CreateBrandComponent, ListBrandsComponent, CreateItemComponent, CreateUserAuxComponent]
})
export class ModulesModule {}
