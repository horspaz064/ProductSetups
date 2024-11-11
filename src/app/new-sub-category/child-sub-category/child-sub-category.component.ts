import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubproductsService } from '../../service/subcategory.service';
import { ProductService } from '../../service/category.service';


declare var $: any;

@Component({
  selector: 'app-child-new-sub',
  templateUrl: './child-sub-category.component.html',
  styleUrls: ['./child-sub-category.component.css']
})
export class ChildNewSubCategory implements OnInit {

  @Input() products: {
    Category: string;
    Numeric: string;
    droppedItems: {
      field: string;
      model: 'Category' | 'Numeric' | 'Textarea';
      value: string;
    }[];
    disabled?: boolean;
    isSelected: boolean;
  }[] = [];

  selectedCategories: string = '';  // Store the selected categories as a string

  SubCategory: string = '';
  Numeric: string = '';
  droppedItems: { field: string; model: 'Textbox' | 'Numeric' | 'Textarea'; value: string }[] = [];
  isEditMode = false;
  productIndex: number | null = null;
  submitted: boolean = false;
  duplicateCategory: boolean = false;

  controlItems = [
    { name: 'Textbox' },
    { name: 'Numeric' },
    { name: 'Textarea' }
  ];

  constructor(
    private subproductService: SubproductsService,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
    const state = history.state;
    if (state && state.product) {
      this.SubCategory = state.product.SubCategory;
      this.Numeric = state.product.Numeric;
      this.droppedItems = state.product.droppedItems || [];
      this.products = state.product.products || [];  // Load saved products with isSelected status
      this.isEditMode = true;
      this.productIndex = this.subproductService.getsubproducts().findIndex(prod =>
        prod.SubCategory === this.SubCategory && prod.Numeric === this.Numeric
      );
    }
    this.jquery();
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getProducts();
  }

  updateSelectedCategories(): void {
    const selectedCategoryNames = this.products
      .filter(product => product.isSelected)  // Only include checked items
      .map(product => product.Category);  // Extract the category names
    this.selectedCategories = selectedCategoryNames.join(', ');  // Join them as a string
  }

  // Call this method whenever a product is selected/deselected
  toggleProductSelection(product: any): void {
    product.isSelected = !product.isSelected;
    this.updateSelectedCategories();  // Update the selected categories list
  }

  addProduct() {
    this.submitted = true;
    if (this.SubCategory === '') {
      return;
    }
  
    const existingProduct = this.subproductService.getsubproducts().find(
      prod => prod.SubCategory === this.SubCategory && prod.Numeric === this.Numeric
    );
  
    if (existingProduct && !this.isEditMode) {
      this.duplicateCategory = true;
      alert("Name is already taken!");
      return;
    } else {
      this.duplicateCategory = false;
    }
  
    // Filter selected categories and map subcategories
    const selectedProducts = this.products
      .filter(product => product.isSelected)
      .map(product => ({
        Category: product.Category,
        SubCategory: this.SubCategory,
        Numeric: product.Numeric
      }));
  
    // Save selected categories to localStorage
    localStorage.setItem('selectedCategories', JSON.stringify(selectedProducts));
  
    // Create a new product with the selected categories
    const newProduct = {
      SubCategory: this.SubCategory,
      Numeric: this.Numeric,
      droppedItems: this.droppedItems,
      selectedProducts
    };
  
    // Update or add the product
    if (this.isEditMode && this.productIndex !== null) {
      this.subproductService.updateProduct(this.productIndex, newProduct);
    } else {
      this.subproductService.addProduct(newProduct);
    }
  
    // Clear selected categories
    this.selectedCategories = '';
    this.products.forEach(product => product.isSelected = false);
  
    // Reset the form
    this.resetForm();
    this.router.navigate(['/creatednewsubcategory']);
  }
  


  removeItem(index: number) {
    this.droppedItems.splice(index, 1);
    localStorage.setItem(this.getDroppedItemsKey(), JSON.stringify(this.droppedItems));
  }

  resetForm() {
    this.SubCategory = '';
    this.Numeric = '';
    this.droppedItems = [];
    this.submitted = false;
    this.duplicateCategory = false;
    localStorage.removeItem(this.getDroppedItemsKey());
  }

  jquery() {
    $(document).ready(function () {
      $(".btn").click(function () {
        $(".dropdown").slideToggle(0);
      })
    })
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
    const fieldName = event.dataTransfer?.getData('text/plain') as "Textbox" | "Numeric" | "Textarea";

    if (fieldName) {
      let value = '';
      if (fieldName === 'Textbox') value = this.SubCategory;
      if (fieldName === 'Numeric' || fieldName === 'Textarea') value = this.Numeric;

      this.droppedItems.push({ field: fieldName, model: fieldName, value });

      localStorage.setItem(this.getDroppedItemsKey(), JSON.stringify(this.droppedItems));
    }
  }

  getDroppedItemsKey() {
    return `droppedItems_${this.SubCategory}_${this.Numeric}`;
  }
}








