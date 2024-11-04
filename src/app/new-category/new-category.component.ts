import { Component, OnInit } from "@angular/core";
import { ProductService } from "../service/product.service";

declare var  $:any
@Component({
  selector:'app-new-category',
  templateUrl:'./new-category.component.html',
  styleUrl:'./new-category.component.css'
})
export class NewCategoryComponent implements OnInit {
  products: { Category: string; Subcategory: string }[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getProducts();
  }

  
}