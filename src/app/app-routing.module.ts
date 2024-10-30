import { CreateUserAuxPageComponent } from './pages/create-user-aux-page/create-user-aux-page.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { BrandDashboardPageComponent } from './pages/brand-dashboard-page/brand-dashboard-page.component';
import { CategoryDashboardPageComponent } from './pages/category-dashboard-page/category-dashboard-page.component';
import { ItemDashboardPageComponent } from './pages/item-dashboard-page/item-dashboard-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';
import { ROLE_ADMIN } from './shared/constants/Roles';



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
