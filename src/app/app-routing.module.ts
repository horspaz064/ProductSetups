import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCategoryComponent } from './new-category/new-category.component';
import { NewProductTemplateComponent } from './new-product-template/new-product-template.component';
import { NewSubCategory } from './new-sub-category/new-sub-category.component';
import { NewTemplateComponent } from './new-product-template/new-template/new-template.component';

const routes: Routes = [
  {
    path: 'creatednewcategory',
    component: NewCategoryComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
