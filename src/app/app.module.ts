import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AtomsModule } from './components/design/atoms/atoms.module';
import { MoleculesModule } from './components/design/molecules/molecules.module';
import { CategoryService } from './components/core/services/category.service';
import { PagesModule } from './components/modules/modules.module';
import {TokenInterceptor} from './components/auth/token.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AtomsModule,
    MoleculesModule,
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
