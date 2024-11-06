import { CreateUserAuxPageComponent } from './pages/create-user-aux-page/create-user-aux-page.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { BrandDashboardPageComponent } from './pages/brand-dashboard-page/brand-dashboard-page.component';
import { CategoryDashboardPageComponent } from './pages/category-dashboard-page/category-dashboard-page.component';
import { ItemDashboardPageComponent } from './pages/item-dashboard-page/item-dashboard-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';
import { ROLE_ADMIN, ROLE_AUX, ROLE_CUSTOMER } from './shared/constants/Roles';
import { AddSuppliesPageComponent } from './pages/add-supplies-page/add-supplies-page.component';
import { CreateCustomerPageComponent } from './pages/create-customer-page/create-customer-page.component';
import { listElementsNavAdmin } from './utils/adminHeader';
import { listElementsNavWarehouseAssistant } from './utils/warehouse-assistant-header';
import { listNavCustomerHeader } from './utils/customer-header';



function addPermissions(path: string, component: any, role: string, header: { elementName: string; path: string; }[]): Route {
  return {
    path: path,
    component: component,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: role, header: header }
  };
}



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginPageComponent },
  {path: 'register', component: CreateCustomerPageComponent },

  addPermissions('admin/categorias', CategoryDashboardPageComponent, ROLE_ADMIN, listElementsNavAdmin),
  addPermissions('admin/marcas', BrandDashboardPageComponent, ROLE_ADMIN, listElementsNavAdmin),
  addPermissions('admin/articulos', ItemDashboardPageComponent, ROLE_ADMIN, listElementsNavAdmin),
  addPermissions('admin/crear/usuario/aux', CreateUserAuxPageComponent, ROLE_ADMIN, listElementsNavAdmin),

  addPermissions('aux-bodega/añadir/suministro', AddSuppliesPageComponent, ROLE_AUX, listElementsNavWarehouseAssistant),
  addPermissions('aux-bodega/categorias', CategoryDashboardPageComponent, ROLE_AUX, listElementsNavWarehouseAssistant),
  addPermissions('aux-bodega/marcas', BrandDashboardPageComponent, ROLE_AUX, listElementsNavWarehouseAssistant),
  addPermissions('aux-bodega/articulos', ItemDashboardPageComponent, ROLE_AUX, listElementsNavWarehouseAssistant),

  addPermissions('cliente/categorias', CategoryDashboardPageComponent, ROLE_CUSTOMER, listNavCustomerHeader),
  addPermissions('cliente/marcas', BrandDashboardPageComponent, ROLE_CUSTOMER, listNavCustomerHeader),
  addPermissions('cliente/articulos', ItemDashboardPageComponent, ROLE_CUSTOMER, listNavCustomerHeader),

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
