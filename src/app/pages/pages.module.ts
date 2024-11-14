import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesModule } from '../modules/modules.module';
import { CreateUserAuxPageComponent } from './create-user-aux-page/create-user-aux-page.component';
import { MoleculesModule } from '../design/molecules/molecules.module';
import { ItemDashboardPageComponent } from './item-dashboard-page/item-dashboard-page.component';
import { BrandDashboardPageComponent } from './brand-dashboard-page/brand-dashboard-page.component';
import { CategoryDashboardPageComponent } from './category-dashboard-page/category-dashboard-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AddSuppliesPageComponent } from './add-supplies-page/add-supplies-page.component';
import { CreateCustomerPageComponent } from './create-customer-page/create-customer-page.component';
import { ItemCardPageComponent } from './item-card-page/item-card-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';



@NgModule({
  declarations: [
    CreateUserAuxPageComponent,
    ItemDashboardPageComponent,
    BrandDashboardPageComponent,
    CategoryDashboardPageComponent,
    LoginPageComponent,
    AddSuppliesPageComponent,
    CreateCustomerPageComponent,
    ItemCardPageComponent,
    CartPageComponent
  ],
  imports: [
    CommonModule,
    ModulesModule,
    MoleculesModule
  ]
})
export class PagesModule { }
