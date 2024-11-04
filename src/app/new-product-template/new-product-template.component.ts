import { Component, OnInit } from "@angular/core";
import { ProductService } from "../service/product.service";


@Component({
  selector: 'app-new-product-template',
  templateUrl: './new-product-template.component.html',
  styleUrl: './new-product-template.component.css'
})

export class NewProductTemplateComponent implements OnInit {
  products: { Category: string; Subcategory: string }[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getProducts();
  }
}