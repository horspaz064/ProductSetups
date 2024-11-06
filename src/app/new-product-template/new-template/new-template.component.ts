import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProductService } from "../../service/product.service";
declare var $:any;


@Component({
  selector: 'app-new-template',
  templateUrl: './new-template.component.html',
  styleUrl: './new-template.component.css'
})

export class NewTemplateComponent implements OnInit{


  constructor(private productService: ProductService, private router: Router) {
 
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
        newField = `<div class="card mb-3 template">
  <div class="card-body">
    <div class="d-flex justify-content-between align-items-center">
      <h5 class="card-title">Field 1</h5>
     <button class="btn btn-danger btn-sm click1">&times;</button>
    </div>
    <div class="form-group">
      <label for="name1">Name</label>
      <input type="text" class="form-control" id="name1" placeholder="Enter name">
    </div>
    <div class="form-group">
      <label for="type1">Type</label>
      <select class="form-control" id="type1">
        <option>TextBox</option>
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
      <input type="text" class="form-control" id="name1" placeholder="Enter name">
    </div>
    <div class="form-group">
      <label for="type1">Type</label>
      <select class="form-control" id="type1">
        <option>TextBox</option>
        <option>Numeric</option>
      </select>
    </div>
  </div>
</div>`;
        break;
      case 'date':
        newField = `
        <div class="card mb-3 template">
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
</div>
        
        `;
        break;
      case 'textarea':
        newField = `
        <div class="card mb-3 template">
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

    // Append the new field to the product template area
    const productTemplate = document.getElementById('product-template');
    if (productTemplate) {
      productTemplate.insertAdjacentHTML('beforeend', newField);
    }

    $(".click1").click(function(this: HTMLElement) {
      $(".template").on("click", function(this: HTMLElement){
        $(this).remove()
      })
    })



  }
 
  
 

}