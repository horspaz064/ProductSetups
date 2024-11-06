import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProductTemplateComponent } from './new-product-template/new-product-template.component';
import { NewSubCategory } from './new-sub-category/new-sub-category.component';
import { NewTemplateComponent } from './new-product-template/new-template/new-template.component';
import { ChildNewSubCategory } from './new-sub-category/child-sub-category/child-sub-category.component';
import { CreateNewProductComponent } from './create-new-product/create-new-product.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { CreateNewCategoryComponent } from './new-category/create-new-category/create-new-category.component';

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
    component: ChildNewSubCategory,
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
    path:'createnewproduct',
    component:CreateNewProductComponent
  },


    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
