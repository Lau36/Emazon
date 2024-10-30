import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AtomsModule } from './design/atoms/atoms.module';
import { MoleculesModule } from './design/molecules/molecules.module';
import { CategoryService } from './shared/services/category.service';
import { ModulesModule} from './modules/modules.module';
import {TokenInterceptor} from './shared/interceptor/token.interceptor';
import { OrganismsModule } from './design/organisms/organisms.module';
import { PagesModule } from './pages/pages.module';


@NgModule({
  declarations: [
    AppComponent,
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
