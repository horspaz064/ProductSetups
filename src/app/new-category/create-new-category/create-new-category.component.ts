import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../service/product.service";
import { ActivatedRoute, Router } from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-create-new-category',
  templateUrl: './create-new-category.component.html',
  styleUrl: './create-new-category.component.css'
})
export class CreateNewCategoryComponent implements OnInit {
  Category: string = '';
  Subcategory: string = '';
  category: string = '';
  subcategory: string = '';
  isEditMode: boolean = false;
  isNameEmpty: boolean = false;


  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    
    const controls = document.querySelectorAll('.control');
    controls.forEach((control) => {
      control.addEventListener('dragstart', (event) => this.onDragStart(event as DragEvent));
    });

    const productTemplate = document.getElementById('product-template');
    if (productTemplate) {
      productTemplate.addEventListener('dragover', (event) => this.onDragOver(event as DragEvent));
      productTemplate.addEventListener('drop', (event) => this.onDrop(event as DragEvent));
    }

    // Get query parameters to check if in edit mode
    this.route.queryParams.subscribe(params => {
      this.category = params['category'] || '';
      this.subcategory = params['subcategory'] || '';
      this.isEditMode = !!this.category; // Set edit mode based on category availability

      // Load product templates if editing an existing product, else clear template section for new product
      if (this.isEditMode) {
        this.loadProductTemplates(this.category);
      } else {
        if (productTemplate) {
          productTemplate.innerHTML = ''; // Clear the product template for a new product
        }
      }
    });
  }
  initializeDragAndDrop() {
    throw new Error("Method not implemented.");
  }

  checkNameField() {
    this.isNameEmpty = !this.Category.trim();
  }

  addProduct() {
    if (!this.Category.trim()) {
      this.isNameEmpty = true; // Set the flag to show error styling
      return; // Stop the function if the field is empty
    }

    const newProduct = { Category: this.Category, Subcategory: this.Subcategory };
    this.productService.addProduct(newProduct);

    // Clear input fields after saving
    this.Category = '';
    this.Subcategory = '';

    const productTemplate = document.getElementById('product-template');
    if (productTemplate) {
      const templateHTML = productTemplate.innerHTML;
      const key = this.category;

      let productTemplates: string[] = JSON.parse(localStorage.getItem(key) || '[]');
      productTemplates.push(templateHTML);

      localStorage.setItem(key, JSON.stringify(productTemplates));
    }
    this.router.navigate(['/creatednewcategory']);
  }

  loadProductTemplates(category: string) {
    const existingTemplates = localStorage.getItem(category);
    const productTemplateDiv = document.getElementById('product-template');

    if (productTemplateDiv && existingTemplates) {
      const productTemplates: string[] = JSON.parse(existingTemplates);
      productTemplateDiv.innerHTML = ''; // Clear existing content

      productTemplates.forEach((template: string) => {
        const templateElement = document.createElement('div');
        templateElement.classList.add('template-item');
        templateElement.innerHTML = template;
        productTemplateDiv.appendChild(templateElement);
      });
    }
  }

  private onDragStart(event: DragEvent): void {
    const target = event.target as HTMLElement;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      event.dataTransfer?.setData('text/plain', target.getAttribute('data-type') || '');
    }
  }

  private onDragOver(event: DragEvent): void {
    event.preventDefault(); // Prevent default to allow drop
  }

  private onDrop(event: DragEvent): void {
    event.preventDefault(); // Prevent default action
    const controlType = event.dataTransfer?.getData('text/plain');
    if (controlType) {
      this.addFieldToTemplate(controlType);
    }
  }

  private addFieldToTemplate(controlType: string): void {
    let newField = '';
    switch (controlType) {
      case 'textbox':
        newField = `<div class="card mb-3 template">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="card-title">${this.Category}</h5>
              <button class="btn btn-danger btn-sm click1">&times;</button>
            </div>
            <div class="form-group">
              <label for="name1">Name</label>
              <input type="text" class="form-control" id="name1" placeholder="Enter name" value="${this.Category}">
            </div>
            <div class="form-group">
              <label for="type1">Type</label>
              <select class="form-control" id="type1">
                <option>Textbox</option>
                <option>Numeric</option>
              </select>
            </div>
          </div>
        </div>`;
        break;
      case 'numeric':
        newField = `<div class="card mb-3 template">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="card-title">Field 2</h5>
              <button class="btn btn-danger btn-sm click1">&times;</button>
            </div>
            <div class="form-group">
              <label for="name1">Name</label>
              <input type="text" class="form-control" id="name1" placeholder="Enter number">
            </div>
            <div class="form-group">
              <label for="type1">Type</label>
              <select class="form-control" id="type1">
                <option>Numeric</option>
              </select>
            </div>
          </div>
        </div>`;
        break;
      case 'date':
        newField = `<div class="card mb-3 template">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="card-title">Field 3</h5>
              <button class="btn btn-danger btn-sm click1">&times;</button>
            </div>
            <div class="form-group">
              <label for="name1">Date</label>
              <input type="date" class="form-control" />
            </div>
            <div class="form-group">
              <label for="type1">Type</label>
              <select class="form-control" id="type1">
                <option>Date</option>
              </select>
            </div>
          </div>
        </div>`;
        break;
      case 'textarea':
        newField = `<div class="card mb-3 template">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="card-title">Field 4</h5>
              <button class="btn btn-danger btn-sm click1">&times;</button>
            </div>
            <div class="form-group">
              <label for="name1">Textarea</label>
              <textarea class="form-control"></textarea>
            </div>
            <div class="form-group">
              <label for="type1">Type</label>
              <select class="form-control" id="type1">
                <option>Textarea</option>
              </select>
            </div>
          </div>
        </div>`;
        break;
      case 'button':
        newField = `<div class="form-group"><button class="btn btn-primary">Button</button></div>`;
        break;
    }

    const productTemplate = document.getElementById('product-template');
    if (productTemplate) {
      productTemplate.insertAdjacentHTML('beforeend', newField);
    }

    $(".click1").click(function (this: HTMLElement) {
      $(".template").on("click", function (this: HTMLElement) {
        $(this).remove();
      });
    });
  }

}
