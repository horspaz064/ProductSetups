import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../service/category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './new-category.component.html',
})
export class NewCategoryComponent implements OnInit {
  products: {
    Category: string;
    Numeric: string;
    droppedItems: {
      field: string;
      model: 'Category' | 'Numeric' | 'Textarea';
      value: string;
    }[];
    disabled?: boolean;
  }[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getProducts();
  }

  editProduct(product: {
    Category: string;
    Numeric: string;
    droppedItems: {
      field: string;
      model: 'Category' | 'Numeric' | 'Textarea';
      value: string;
    }[];
  }) {
    this.router.navigate(['/createnewcategory'], {
      state: { product }
    });
  }

  cloneProduct(product: {
    Category: string;
    Numeric: string;
    droppedItems: {
      field: string;
      model: 'Category' | 'Numeric' | 'Textarea';
      value: string;
    }[];
  }) {
    let baseName = product.Category + '.copy';
    let newName = baseName;
    let index = 1;

    const productList = this.productService.getProducts();

    while (productList.some(prod => prod.Category === newName && prod.Category !== product.Category)) {
      newName = `${baseName} ${index}`;
      index++;
    }

    const clonedProduct = {
      Category: newName,
      Numeric: product.Numeric,
      droppedItems: product.droppedItems.map(item => ({ ...item }))
    };

    this.productService.addProduct(clonedProduct);
    this.loadProducts();
  }

  isDisableModalVisible = false;
  productNameToDisable: string = '';
  productToDisable: any;

  disableProduct(product: any) {
    this.productToDisable = product;
    this.isDisableModalVisible = true;
  }

  confirmDisable() {
    if (this.productNameToDisable === this.productToDisable.Category) {
      const index = this.products.indexOf(this.productToDisable);
      if (index > -1) {
        this.products[index].disabled = true;
        localStorage.setItem('products', JSON.stringify(this.products));
      }
      this.resetDisableModal();
    } else {
      alert('Product name does not match. Please type the correct product name to disable.');
    }
  }

  resetDisableModal() {
    this.isDisableModalVisible = false;
    this.productNameToDisable = '';
    this.productToDisable = null;
  }
}
