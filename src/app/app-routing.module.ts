import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './components/pages/create-category/create-category.component';
import { ListCategoriesComponent } from './components/pages/list-categories/list-categories.component';
import { CreateBranchComponent } from './components/pages/create-brand/create-brand.component';

const routes: Routes = [
  {path: "Admin/Category", component: ListCategoriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
