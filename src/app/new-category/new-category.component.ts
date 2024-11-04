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
    // Create a new product object with .copy appended to the name
    const clonedProduct = {
      Category: product.Category + '.copy',
      Subcategory: product.Subcategory // Adjust if necessary
    };

    // Add the cloned product to the product service
    this.productService.addProduct(clonedProduct);

    // Optionally, update the local product list to reflect the change
    this.loadProducts();
  }

  editProduct(product: { Category: string; Subcategory: string }) {
    this.router.navigate(['/createnewcategory'], { queryParams: { category: product.Category, subcategory: product.Subcategory } });
    this.isEditMode = true;
  }

}