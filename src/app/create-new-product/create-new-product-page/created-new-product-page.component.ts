import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router";
import { secondproductervice } from "../../service/product.service";

@Component({
  selector: "created-new-product-page",
  templateUrl: "./created-new-product-page.component.html"
})
export class CreatednewproductpageComponent implements OnInit {

  Category: string = '';
  Numeric: string = '';
  droppedItems: { field: string; model: 'Category' | 'Numeric' | 'Textarea'; value: string }[] = [];
  isEditMode = false;
  productIndex: number | null = null;
  submitted: boolean = false;
  duplicateCategory: boolean = false;

  controlItems = [
    { name: 'Category' },
    { name: 'Numeric' },
    { name: 'Textarea' }
  ];

  constructor(private secondproduct: secondproductervice, private router: Router) {}

  ngOnInit() {
    const state = history.state;
    if (state && state.product) {
      this.Category = state.product.Category;
      this.Numeric = state.product.Numeric;
      this.droppedItems = state.product.droppedItems || [];
      this.isEditMode = true;
      this.productIndex = this.secondproduct. getsecondproduct().findIndex(prod =>
        prod.Category === this.Category && prod.Numeric === this.Numeric
      );
    }
  }

  onDragStart(event: DragEvent, control: { name: string }) {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', control.name);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const fieldName = event.dataTransfer?.getData('text/plain') as "Category" | "Numeric" | "Textarea";

    if (fieldName) {
      let value = '';
      if (fieldName === 'Category') value = this.Category;
      if (fieldName === 'Numeric' || fieldName === 'Textarea') value = this.Numeric;

      this.droppedItems.push({ field: fieldName, model: fieldName, value });

      localStorage.setItem(this.getDroppedItemsKey(), JSON.stringify(this.droppedItems));
    }
  }

  addProduct() {
    this.submitted = true;

    if (this.Category === '') {
      return;
    }

    const isDuplicate = !this.isEditMode && this.secondproduct. getsecondproduct().some(prod => prod.Category === this.Category);

    if (isDuplicate) {
      this.duplicateCategory = true;
      alert("Category name is already taken");
      return;
    } else {
      this.duplicateCategory = false;
    }

    const newProduct = {
      Category: this.Category,
      Numeric: this.Numeric,
      droppedItems: this.droppedItems
    };

    if (this.isEditMode && this.productIndex !== null) {
      this.secondproduct.updateProduct(this.productIndex, newProduct);
    } else {
      this.secondproduct.addProduct(newProduct);
    }

    localStorage.setItem(this.getDroppedItemsKey(), JSON.stringify(this.droppedItems));

    this.resetForm();
    this.router.navigate(['/product-template-field']);
  }

  getDroppedItemsKey() {
    return `droppedItems_${this.Category}_${this.Numeric}`;
  }

  removeItem(index: number) {
    this.droppedItems.splice(index, 1);
    localStorage.setItem(this.getDroppedItemsKey(), JSON.stringify(this.droppedItems));
  }

  resetForm() {
    this.Category = '';
    this.Numeric = '';
    this.droppedItems = [];
    this.submitted = false;
    this.duplicateCategory = false;
    localStorage.removeItem(this.getDroppedItemsKey());
  }
}
