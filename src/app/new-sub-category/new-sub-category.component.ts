import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SubproductsService } from "../service/subcategory.service";

@Component({
  selector: "app-new-sub",
  templateUrl: "./new-sub-category.component.html",

})

export class NewSubCategory {
  subproducts: {
    SubCategory: string;
    Numeric: string;
    droppedItems: {
      field: string;
      model: 'Category' | 'Numeric' | 'Textarea';
      value: string;
    }[];
    disabled?: boolean;
  }[] = [];

  constructor(private subproductService: SubproductsService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    const storedProducts = localStorage.getItem('subproducts');
    this.subproducts = storedProducts ? JSON.parse(storedProducts) : [];
 }

  editProduct(product: {
    SubCategory: string;
    Numeric: string;
    droppedItems: {
      field: string;
      model: 'Category' | 'Numeric' | 'Textarea';
      value: string;
    }[];
  }) {
    this.router.navigate(['/child-sub'], {
      state: { product }
    });
  }

  cloneProduct(product: {
    SubCategory: string;
    Numeric: string;
    droppedItems: {
      field: string;
      model: 'Category' | 'Numeric' | 'Textarea';
      value: string;
    }[];
  }) {
    let baseName = product.SubCategory + '.copy';
    let newName = baseName;
    let index = 1;

    const productList = this.subproductService.getsubproducts();

    while (productList.some(prod => prod.SubCategory === newName && prod.SubCategory !== product.SubCategory)) {
      newName = `${baseName} ${index}`;
      index++;
    }

    const clonedProduct = {
      SubCategory: newName,  // Corrected field name
      Numeric: product.Numeric,
      droppedItems: product.droppedItems.map(item => ({ ...item }))
    };
    this.subproductService.addProduct(clonedProduct);
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
      const index = this.subproducts.indexOf(this.productToDisable);
      if (index > -1) {
        this.subproducts[index].disabled = true;
        localStorage.setItem('products', JSON.stringify(this.subproducts));
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

