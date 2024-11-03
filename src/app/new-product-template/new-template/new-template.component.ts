import { Component, OnInit } from "@angular/core";
import { ProductService } from "../service/product.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-new-template',
  templateUrl: './new-template.component.html',
  styleUrl: './new-template.component.css'
})

export class NewTemplateComponent implements OnInit{
  Category: string = '';
  Subcategory: string = '';

  constructor(private productService: ProductService, private router: Router) {}

  addProduct() {
    const newProduct = { Category: this.Category, Subcategory: this.Subcategory };
    this.productService.addProduct(newProduct); 
    this.Category = '';
    this.Subcategory = '';
    this.router.navigate(['/creatednewproducttemplate']); 
  }

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

  // Function to add fields based on control type
  private addFieldToTemplate(controlType: string): void {
    let newField = '';
    switch (controlType) {
      case 'textbox':
        newField = `<div class="form-group">Field<br><label>Text</label><input type="text" class="form-control" /><label>Type</label><input value="text" class="form-control"></div>`;
        break;
      case 'numeric':
        newField = `<div class="form-group"><label>Number</label><input type="number" class="form-control" /></div>`;
        break;
      case 'date':
        newField = `<div class="form-group"><label>Date</label><input type="date" class="form-control" /></div>`;
        break;
      case 'textarea':
        newField = `<div class="form-group"><label>Textarea</label><textarea class="form-control"></textarea></div>`;
        break;
      case 'button':
        newField = `<div class="form-group"><button class="btn btn-primary">Button</button></div>`;
        break;
    }

    // Append the new field to the product template area
    const productTemplate = document.getElementById('product-template');
    if (productTemplate) {
      productTemplate.insertAdjacentHTML('beforeend', newField);
    }
  }


}