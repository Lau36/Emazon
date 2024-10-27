import { CreateUserAuxPageComponent } from './components/pages/user/create-user-aux-page/create-user-aux-page.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { BrandDashboardPageComponent } from './components/pages/brand/brand-dashboard-page/brand-dashboard-page.component';
import { CategoryDashboardPageComponent } from './components/pages/category/category-dashboard-page/category-dashboard-page.component';
import { ItemDashboardPageComponent } from './components/pages/item/item-dashboard-page/item-dashboard-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { AuthGuard } from './components/guards/auth.guard';
import { RoleGuard } from './components/guards/role.guard';
import { ROLE_ADMIN } from './components/shared/Roles';



function createAdminRoute(path: string, component: any): Route {
  return {
    path: path,
    component: component,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: ROLE_ADMIN }
  };
}

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginPageComponent },

  createAdminRoute('admin/categorias', CategoryDashboardPageComponent),
  createAdminRoute('admin/marcas', BrandDashboardPageComponent),
  createAdminRoute('admin/articulos', ItemDashboardPageComponent),
  createAdminRoute('admin/crear/usuario/aux', CreateUserAuxPageComponent),

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
