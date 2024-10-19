import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoriesComponent } from './components/design/pages/list-categories/list-categories.component';
import { ListBrandsComponent } from './components/design/pages/list-brands/list-brands.component';
import { CreateItemComponent } from './components/design/pages/create-item/create-item.component';
import { ListItemsComponent } from './components/design/pages/list-items/list-items.component';

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
