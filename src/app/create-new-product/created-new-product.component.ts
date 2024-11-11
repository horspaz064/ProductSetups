import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router";
import { secondproductervice } from "../service/product.service";

@Component({
  selector: "created-new-product",
  templateUrl: "./created-new-product.component.html",
  styleUrl: './created-new-product.component.css'
})
export class CreatenewproductComponent implements OnInit {
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


  constructor(private secondproduct: secondproductervice, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.secondproduct.getsecondproduct();
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
    this.router.navigate(['/created-new-product-page'], {
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

    const productList = this.secondproduct. getsecondproduct();

    while (productList.some(prod => prod.Category === newName && prod.Category !== product.Category)) {
      newName = `${baseName} ${index}`;
      index++;
    }

    const clonedProduct = {
      Category: newName,
      Numeric: product.Numeric,
      droppedItems: product.droppedItems.map(item => ({ ...item }))
    };

    this.secondproduct.addProduct(clonedProduct);
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