import { Component, OnInit } from "@angular/core";
import { ProductService } from "../service/product.service";
import { Router } from "@angular/router";

declare var $: any
@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.css'
})
export class NewCategoryComponent implements OnInit {
  products: { Category: string; Subcategory: string }[] = [];
  isEditMode = false;
  currentProductIndex: number | null = null;


  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getProducts();
  }

  cloneProduct(product: { Category: string; Subcategory: string }) {
    const clonedProduct = {
      Category: product.Category + '.copy',
      Subcategory: product.Subcategory 
    };
    this.productService.addProduct(clonedProduct);
    this.loadProducts();
  }

  editProduct(product: { Category: string; Subcategory: string }) {
    this.router.navigate(['/createnewcategory'], { queryParams: { category: product.Category, subcategory: product.Subcategory } });
    this.isEditMode = true;
  }

}