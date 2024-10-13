import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoriesComponent } from './components/pages/list-categories/list-categories.component';
import { ListBrandsComponent } from './components/pages/list-brands/list-brands.component';

const routes: Routes = [
  {path: "Admin/Category", component: ListCategoriesComponent},
  {path: "Admin/Brand", component: ListBrandsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
