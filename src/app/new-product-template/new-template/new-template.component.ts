import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { templateproductService } from "../../service/templatecategory.service";
import { SubproductsService } from "../../service/subcategory.service";
import { ProductService } from "../../service/category.service";
declare var $:any

@Component({
  selector: 'app-new-template',
  templateUrl: './new-template.component.html',
  styleUrls: ['./new-template.component.css']
})

export class NewTemplateComponent implements OnInit {
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
 

  @Input() subproducts: {
    SubCategory: string;
    Numeric: string;
    droppedItems: {
      field: string;
      model: 'Category' | 'Numeric' | 'Textarea';
      value: string;
    }[];
    disabled?: boolean;
    isSelected: boolean;
  }[] = [];

  selectedSubCategories: string = ''


  templatecategory: string = '';
  Numeric: string = '';
  droppedItems: { field: string; model: 'templatecategory' | 'Numeric' | 'Textarea'; value: string }[] = [];
  isEditMode = false;
  productIndex: number | null = null;
  submitted: boolean = false;
  duplicatetemplatecategory: boolean = false;

  controlItems = [
    { name: 'templatecategory' },
    { name: 'Numeric' },
    { name: 'Textarea' }
  ];

  constructor(
    private templatecategoryService: templateproductService,
    private router: Router,
    private productService: ProductService,
    private subproductService: SubproductsService,
  ) {}


  ngOnInit() {
    const state = history.state;
    if (state && state.templateproduct) { // Change to state.templateproduct
      this.templatecategory = state.templateproduct.templatecategory;
      this.Numeric = state.templateproduct.Numeric;
      this.droppedItems = state.templateproduct.droppedItems || [];
      this.isEditMode = true;
      this.productIndex = this.templatecategoryService.getCategoryData().findIndex(prod =>
        prod.templatecategory === this.templatecategory && prod.Numeric === this.Numeric
      );
    } else {
      this.loadDroppedItemsFromLocalStorage();
      this.products = this.productService.getProducts();
      this.subproducts = this.subproductService.getsubproducts();
    }
    this.jquery();
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
    const fieldName = event.dataTransfer?.getData('text/plain') as "templatecategory" | "Numeric" | "Textarea";

    if (fieldName) {
      let value = '';
      if (fieldName === 'templatecategory') value = this.templatecategory;
      if (fieldName === 'Numeric' || fieldName === 'Textarea') value = this.Numeric;

      this.droppedItems.push({ field: fieldName, model: fieldName, value });
      this.saveDroppedItemsToLocalStorage();
     
    }
  }


  addCategory() {
    this.submitted = true;
  
    if (this.templatecategory === '') {
      return;
    }
  
    const isDuplicate = !this.isEditMode && this.templatecategoryService.getCategoryData()
      .some(prod => prod.templatecategory === this.templatecategory);
  
    if (isDuplicate) {
      this.duplicatetemplatecategory = true;
      alert("Template category name is already taken");
      return;
    } else {
      this.duplicatetemplatecategory = false;
    }
  
    const newtemplateProduct = {
      templatecategory: this.templatecategory,
      Numeric: this.Numeric,
      droppedItems: this.droppedItems
    };
  
    if (this.isEditMode && this.productIndex !== null) {
      this.templatecategoryService.updateCategory(this.productIndex, newtemplateProduct);
    } else {
      this.templatecategoryService.addCategory(newtemplateProduct);
    }
  
    this.saveDroppedItemsToLocalStorage();
    this.resetForm();
  
    this.router.navigate(['/creatednewproducttemplate']);
  }
  

  getDroppedItemsKey() {
    return `droppedItems_${this.templatecategory}_${this.Numeric}`;
  }

  removeItem(index: number) {
    this.droppedItems.splice(index, 1);
    this.saveDroppedItemsToLocalStorage();
  }

  resetForm() {
    this.templatecategory = '';
    this.Numeric = '';
    this.droppedItems = [];
    this.submitted = false;
    this.duplicatetemplatecategory = false;
    localStorage.removeItem(this.getDroppedItemsKey());
  }

  saveDroppedItemsToLocalStorage() {
    localStorage.setItem(this.getDroppedItemsKey(), JSON.stringify(this.droppedItems));
  }

  loadDroppedItemsFromLocalStorage() {
    const storedItems = localStorage.getItem(this.getDroppedItemsKey());
    if (storedItems) {
      this.droppedItems = JSON.parse(storedItems);
    }
  }

  jquery() {
    $(document).ready(function () {
      $(".btn").click(function () {
        $(".dropdown").slideToggle(0);
      })
    })
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



  updateSelectedSubCategories(): void {
    const selectedSubCategoryNames = this.subproducts
      .filter(subproducts => subproducts.isSelected)  // Only include checked items
      .map(subproducts => subproducts.SubCategory);  // Extract the category names
    this.selectedSubCategories = selectedSubCategoryNames.join(', ');  // Join them as a string
  }

  // Call this method whenever a product is selected/deselected
  toggleSubProductSelection(subproducts: any): void {
    subproducts.isSelected = !subproducts.isSelected;
    this.updateSelectedCategories();  // Update the selected categories list
  }
}
