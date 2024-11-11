import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProductTemplateComponent } from './new-product-template/new-product-template.component';
import { NewSubCategory } from './new-sub-category/new-sub-category.component';
import { NewTemplateComponent } from './new-product-template/new-template/new-template.component';
import { ChildNewSubCategory } from './new-sub-category/child-sub-category/child-sub-category.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { CreateNewCategoryComponent } from './new-category/create-new-category/create-new-category.component';
import { CreateNewItemComponent } from './create-new-item/create-new-item.component';
import { CreateItemPageComponent } from './create-new-item/create-item-page/create-item-page.component';
import { CreatenewproductComponent } from './create-new-product/created-new-product.component';
import { CreatednewproductpageComponent } from './create-new-product/create-new-product-page/created-new-product-page.component';
import { ProducttemplatefieldComponent } from './create-new-product/create-new-product-page/product-template-field/product-template-field.component';
import { ProductpictureComponent } from './create-new-product/create-new-product-page/product-template-field/product-picture/product-picture.component';
import { ProductvarianComponent } from './create-new-product/create-new-product-page/product-template-field/product-picture/product-varian/product-varian.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'creatednewcategory',
    pathMatch: 'full'
  },
  {
    path: 'creatednewcategory',
    component: NewCategoryComponent
  },
  {
    path: "createnewcategory",
    component: CreateNewCategoryComponent
  },
  {
    path: "child-sub",
    component: ChildNewSubCategory
  },
  {
    path: "creatednewsubcategory",
    component: NewSubCategory
  },
  {
    path: 'creatednewproducttemplate',
    component:NewProductTemplateComponent
  },
  {
    path: 'newtemplatedpage',
    component: NewTemplateComponent
  },
  {
    path: "items",
    component: CreateNewItemComponent
  },
  {
    path: "createitempage",
    component: CreateItemPageComponent
  },
  {
    path: "created-new-product",
    component: CreatenewproductComponent
  },
  {
    path: "created-new-product-page",
    component: CreatednewproductpageComponent
  },
  {
    path: "product-template-field",
    component: ProducttemplatefieldComponent
  },
  {
    path: "product-picture",
    component: ProductpictureComponent
  },
  {
    path: "product-varian",
    component: ProductvarianComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
