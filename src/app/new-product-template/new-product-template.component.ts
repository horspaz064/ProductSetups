import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { templateproductService } from "../service/templatecategory.service";

@Component({
  selector: 'app-new-product-template',
  templateUrl: './new-product-template.component.html',
  styleUrls: ['./new-product-template.component.css']
})
export class NewProductTemplateComponent implements OnInit {
  templateproducts: {
    templatecategory: string;
    Numeric: string;
    droppedItems: {
      field: string;
      model: 'Category' | 'Numeric' | 'Textarea';
      value: string;
    }[];
    disabled?: boolean;
  }[] = [];

  isDisableModalVisible: boolean = false;
  productNameToDisable: string = '';
  productToDisable: any;

  constructor(
    private templatecategoryService: templateproductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.templateproducts = this.templatecategoryService.getCategoryData();
  }

  editProduct(templateproduct: {
    templatecategory: string;
    Numeric: string;
    droppedItems: {
      field: string;
      model: 'Category' | 'Numeric' | 'Textarea';
      value: string;
    }[];
  }) {
    this.router.navigate(['/newtemplatedpage'], {
      state: { templateproduct }  // Make sure this matches `templateproduct` key
    });
  }

  cloneProduct(templateproduct: {
    templatecategory: string;
    Numeric: string;
    droppedItems: {
      field: string;
      model: 'Category' | 'Numeric' | 'Textarea';
      value: string;
    }[];
  }) {
    const baseName = templateproduct.templatecategory + '.copy';
    let newName = baseName;
    let index = 1;

    const productList = this.templatecategoryService.getCategoryData();
    while (productList.some(prod => prod.templatecategory === newName)) {
      newName = `${baseName} ${index}`;
      index++;
    }

    const clonedProduct = {
      ...templateproduct,
      templatecategory: newName,
      droppedItems: templateproduct.droppedItems.map((item) => ({ ...item }))
    };

    this.templatecategoryService.addCategory(clonedProduct);
    this.loadProducts();
  }

  disableProduct(templateproduct: any) {
    this.productToDisable = templateproduct;
    this.isDisableModalVisible = true;
  }

  confirmDisable() {
    if (this.productNameToDisable === this.productToDisable?.templatecategory) {
      const index = this.templateproducts.findIndex(
        (product) => product.templatecategory === this.productToDisable.templatecategory
      );
      if (index > -1) {
        this.templateproducts[index].disabled = true;
        this.templatecategoryService.updateCategory(index, this.templateproducts[index]);
        this.loadProducts(); // Refresh the product list to reflect the disabled status
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
