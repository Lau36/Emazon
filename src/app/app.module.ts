import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AtomsModule } from './components/design/atoms/atoms.module';
import { MoleculesModule } from './components/design/molecules/molecules.module';
import { CategoryService } from './components/core/services/category.service';
import { ModulesModule} from './components/modules/modules.module';
import {TokenInterceptor} from './components/auth/token.interceptor';
import { OrganismsModule } from './components/design/organisms/organisms.module';
import { CreateUserAuxPageComponent } from './components/pages/user/create-user-aux-page/create-user-aux-page.component';
import { PagesModule } from './components/pages/pages.module';


@NgModule({
  declarations: [
    AppComponent,
    CreateUserAuxPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AtomsModule,
    MoleculesModule,
    OrganismsModule,
    ModulesModule,
    PagesModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
