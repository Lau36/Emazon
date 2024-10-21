import { CreateUserAuxPageComponent } from './components/pages/user/create-user-aux-page/create-user-aux-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoriesComponent } from './components/modules/category/list-categories/list-categories.component';
import { ListItemsComponent } from './components/modules/item/list-items/list-items.component';
import { BrandDashboardPageComponent } from './components/pages/brand/brand-dashboard-page/brand-dashboard-page.component';
import { CategoryDashboardPageComponent } from './components/pages/category/category-dashboard-page/category-dashboard-page.component';
import { ItemDashboardPageComponent } from './components/pages/item/item-dashboard-page/item-dashboard-page.component';

const routes: Routes = [
  {path: 'admin/categorias', component: CategoryDashboardPageComponent},
  {path: 'admin/marcas', component: BrandDashboardPageComponent},
  {path: 'admin/articulos', component: ItemDashboardPageComponent},
  {path: 'admin/crear/usuario/aux', component: CreateUserAuxPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
