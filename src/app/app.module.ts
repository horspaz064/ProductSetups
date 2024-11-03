import { Input, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { NewCategoryComponent } from './new-category/new-category.component';
import { CreateNewCategoryComponent } from './new-category/create-new-category/create-new-category.component';
import { NewProductTemplateComponent } from './new-product-template/new-product-template.component';
import { NewTemplateComponent } from './new-product-template/new-template/new-template.component';
import { NewSubCategory } from './new-sub-category/new-sub-category.component';
import { ChildNewSubCategory } from './new-sub-category/child-sub-category/child-sub-category.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,NavbarComponent,
    NewCategoryComponent,CreateNewCategoryComponent,
    NewSubCategory, ChildNewSubCategory,
    NewProductTemplateComponent,NewTemplateComponent
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    CommonModule,
    FormsModule,

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
