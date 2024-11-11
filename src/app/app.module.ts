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
import { CreateNewItemComponent } from './create-new-item/create-new-item.component';
import { AddImagePageComponent } from './create-new-item/add-image-page/add-image-page.component';
import { NotForSaleComponent } from './create-new-item/not-for-sale-popup/not-for-sale-popup.component';
import { CreatenewproductComponent } from './create-new-product/created-new-product.component';
import { CreatednewproductpageComponent } from './create-new-product/create-new-product-page/created-new-product-page.component';
import { ProducttemplatefieldComponent } from './create-new-product/create-new-product-page/product-template-field/product-template-field.component';
import { ProductpictureComponent } from './create-new-product/create-new-product-page/product-template-field/product-picture/product-picture.component';
import { ProductvarianComponent } from './create-new-product/create-new-product-page/product-template-field/product-picture/product-varian/product-varian.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewCategoryComponent,
    CreateNewCategoryComponent,
    NewSubCategory,
    ChildNewSubCategory,
    NewProductTemplateComponent,
    NewTemplateComponent,
    CreateNewItemComponent,
    AddImagePageComponent,
    NotForSaleComponent,
    CreatenewproductComponent,
    CreatednewproductpageComponent,
    ProducttemplatefieldComponent,
    ProductpictureComponent,
    ProductvarianComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    CommonModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
