import { CreateUserAuxPageComponent } from './pages/create-user-aux-page/create-user-aux-page.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { BrandDashboardPageComponent } from './pages/brand-dashboard-page/brand-dashboard-page.component';
import { CategoryDashboardPageComponent } from './pages/category-dashboard-page/category-dashboard-page.component';
import { ItemDashboardPageComponent } from './pages/item-dashboard-page/item-dashboard-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';
import { ROLE_ADMIN, ROLE_AUX } from './shared/constants/Roles';
import { AddSuppliesPageComponent } from './pages/add-supplies-page/add-supplies-page.component';



function addPermissions(path: string, component: any, role: string): Route {
  return {
    path: path,
    component: component,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: role }
  };
}



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginPageComponent },

  addPermissions('admin/categorias', CategoryDashboardPageComponent, ROLE_ADMIN),
  addPermissions('admin/marcas', BrandDashboardPageComponent, ROLE_ADMIN),
  addPermissions('admin/articulos', ItemDashboardPageComponent, ROLE_ADMIN),
  addPermissions('admin/crear/usuario/aux', CreateUserAuxPageComponent, ROLE_ADMIN),
  addPermissions('aux-bodega/añadir/suministro', AddSuppliesPageComponent, ROLE_AUX),

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
