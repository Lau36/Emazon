import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './components/pages/create-category/create-category.component';

const routes: Routes = [
  {path: "Admin/Category", component: CreateCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
