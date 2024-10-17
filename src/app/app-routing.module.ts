import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoriesComponent } from './components/pages/list-categories/list-categories.component';
import { ListBrandsComponent } from './components/pages/list-brands/list-brands.component';
import { CreateItemComponent } from './components/pages/create-item/create-item.component';
import { ListItemsComponent } from './components/pages/list-items/list-items.component';

const routes: Routes = [
  {path: "admin/categorias", component: ListCategoriesComponent},
  {path: "admin/marcas", component: ListBrandsComponent},
  {path: "admin/articulos", component: ListItemsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
