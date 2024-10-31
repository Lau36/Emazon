import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoleculesModule } from '../design/molecules/molecules.module';
import { AtomsModule } from '../design/atoms/atoms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateBrandComponent } from './brand/create-brand/create-brand.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { ListCategoriesComponent } from './category/list-categories/list-categories.component';
import { ListBrandsComponent } from './brand/list-brands/list-brands.component';
import { CreateItemComponent } from './item/create-item/create-item.component';
import { ListItemsComponent } from './item/list-items/list-items.component';
import { CreateUserAuxComponent } from './warehouse-assistant/create-user-aux/create-user-aux.component';
import { LoginComponent } from './login/login.component';
import { OrganismsModule } from '../design/organisms/organisms.module';
import { AddSuppliesComponent } from './warehouse-assistant/add-supplies/add-supplies.component';


@NgModule({
  declarations: [CreateCategoryComponent, ListCategoriesComponent, CreateBrandComponent, ListBrandsComponent, CreateItemComponent, ListItemsComponent, CreateUserAuxComponent, LoginComponent, AddSuppliesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MoleculesModule,
    AtomsModule,
    OrganismsModule
],
  exports: [CreateCategoryComponent, ListCategoriesComponent, CreateBrandComponent, ListBrandsComponent, ListItemsComponent, CreateItemComponent, CreateUserAuxComponent, LoginComponent, AddSuppliesComponent]
})
export class ModulesModule {}
