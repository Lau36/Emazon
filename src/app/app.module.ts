import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateCategoryComponent } from './components/pages/create-category/create-category.component';
import { CategoryService } from './services/category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextComponentComponent } from './components/atoms/text-component/text-component.component';
import { HeaderComponent } from './components/molecules/header/header/header.component';
import { ButtonComponent } from './components/atoms/button/button/button.component';
import { FormCreateComponent } from './components/molecules/form-create/form-create/form-create.component';
import { InputComponent } from './components/atoms/input/input/input.component';
import { IconComponent } from './components/atoms/icon/icon/icon.component';
import { FooterComponent } from './components/molecules/footer/footer.component';
import { IconsComponent } from './components/atoms/icons/icons.component';
import { ToastComponent } from './components/atoms/toast/toast.component';
import { LoaderComponent } from './components/atoms/loader/loader.component';
import { TextareaComponent } from './components/atoms/textarea/textarea.component';
import { ListCategoriesComponent } from './components/pages/list-categories/list-categories.component';
import { TableComponent } from './components/atoms/table/table.component';
import { PaginationComponent } from './components/molecules/pagination/pagination.component';
import { DropdownComponent } from './components/atoms/dropdown/dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateCategoryComponent,
    TextComponentComponent,
    HeaderComponent,
    ButtonComponent,
    FormCreateComponent,
    InputComponent,
    IconComponent,
    FooterComponent,
    IconsComponent,
    ToastComponent,
    LoaderComponent,
    TextareaComponent,
    ListCategoriesComponent,
    PaginationComponent,
    TableComponent,
    DropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
