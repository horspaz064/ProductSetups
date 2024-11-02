import { Component } from "@angular/core";
import { ProductService } from "../service/product.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-new-template',
  templateUrl: './new-template.component.html',
  styleUrl: './new-template.component.css'
})

export class NewTemplateComponent {
  Category: string = '';
  Subcategory: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  addProduct() {
    const newProduct = { Category: this.Category, Subcategory: this.Subcategory };
    this.productService.addProduct(newProduct); 
    this.Category = '';
    this.Subcategory = '';
    this.router.navigate(['/creatednewproducttemplate']); 
  }
}