import { Component, Input, OnInit } from "@angular/core"
import { Router } from "@angular/router";
import { secondproductervice } from "../../service/product.service";
import { ProductService } from "../../service/category.service";
import { SubproductsService } from "../../service/subcategory.service";
import { templateproductService } from "../../service/templatecategory.service";
declare var $:any
@Component({
  selector: "created-new-product-page",
  templateUrl: "./created-new-product-page.component.html",
  styleUrl: "./created-new-product-page.component.css"
})
export class CreatednewproductpageComponent implements OnInit {
   
  
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

  selectedCategories: string = '' 

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

  @Input() templateproducts: {
    templatecategory: string ;
    Numeric: string;
    droppedItems: { 
      field: string; 
      model: 'templatecategory' | 'Numeric' | 'Textarea'; 
      value: string 
    }[];
    disabled?: boolean;
    isSelected: boolean
  }[] = [];

  selectedTemplateCategories: string = ''


  Category: string = '';
  Numeric: string = '';
  category1: any []= [];
  subcategory2: string = '';

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

  constructor(
    private secondproduct: secondproductervice,
    private productService: ProductService,
    private subproductService: SubproductsService,
    private templatecategoryService: templateproductService,
    private router: Router) {}

  ngOnInit() {
    const state = history.state;
    if (state && state.product) {
      this.Category = state.product.Category;
      this.Numeric = state.product.Numeric;
      this.isEditMode = true;
      this.productIndex = this.secondproduct. getsecondproduct().findIndex(prod =>
        prod.Category === this.Category && prod.Numeric === this.Numeric
      );
    }
    this.jquery();
    this.loaditem();
  }

  loaditem(){
    this.products = this.productService.getProducts(),
    this.subproducts = this.subproductService.getsubproducts(),
    this.templateproducts = this.templatecategoryService.getCategoryData()
  }
  addProduct() {
    this.submitted = true;

    if (this.Category === '') {
      return;
    }

    const isDuplicate = !this.isEditMode && this.secondproduct.getsecondproduct().some(prod => prod.Category === this.Category);

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


  updateSelectedTemplateCategories(): void {
    const selectedTemplateCategoryNames = this.templateproducts
      .filter(templateproducts => templateproducts.isSelected)  // Only include checked items
      .map(templateproducts => templateproducts.templatecategory);  // Extract the category names
    this.selectedTemplateCategories = selectedTemplateCategoryNames.join(', ');  // Join them as a string
  }

  // Call this method whenever a product is selected/deselected
  toggleTemplateProductSelection(templateproducts: any): void {
    templateproducts.isSelected = !templateproducts.isSelected;
    this.updateSelectedCategories();  // Update the selected categories list
  }

}
