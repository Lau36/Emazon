import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulesModule } from '../modules/modules.module';
import { CreateUserAuxPageComponent } from './user/create-user-aux-page/create-user-aux-page.component';
import { MoleculesModule } from '../design/molecules/molecules.module';
import { ItemDashboardPageComponent } from './item/item-dashboard-page/item-dashboard-page.component';
import { BrandDashboardPageComponent } from './brand/brand-dashboard-page/brand-dashboard-page.component';
import { CategoryDashboardPageComponent } from './category/category-dashboard-page/category-dashboard-page.component';
import { LoginPageComponent } from './login-page/login-page.component';



@NgModule({
  declarations: [
    CreateUserAuxPageComponent,
    ItemDashboardPageComponent,
    BrandDashboardPageComponent,
    CategoryDashboardPageComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    ModulesModule,
    MoleculesModule
  ]
})
export class PagesModule { }
