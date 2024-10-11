import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './components/pages/create-category/create-category.component';
import { ListCategoriesComponent } from './components/pages/list-categories/list-categories.component';
import { CreateBranchComponent } from './components/pages/create-brand/create-brand.component';
import { ListBrandsComponent } from './components/pages/list-brands/list-brands.component';

const routes: Routes = [
  {path: "Admin/Category", component: CreateCategoryComponent},
  {path: "Admin/Category/List", component: ListCategoriesComponent},
  {path: "Admin/Brand/List", component: ListBrandsComponent},
  {path: "Admin/Brand", component: CreateBranchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
