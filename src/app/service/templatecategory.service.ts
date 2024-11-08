import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class templateproductService {
  private templateproducts: any[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  // Load from localStorage on service initialization
  private loadFromLocalStorage() {
    const storedTemplateProducts = localStorage.getItem('templateproducts');
    this.templateproducts = storedTemplateProducts ? JSON.parse(storedTemplateProducts) : [];
  }

  // Get a fresh copy of the data
  getCategoryData() {
    return this.templateproducts;
  }

  // Add a new category and save to localStorage
  addCategory(newCategory: any) {
    this.templateproducts.push(newCategory);
    this.saveToLocalStorage();
  }

  // Update an existing category
  updateCategory(index: number, updatedProduct: any) {
    this.templateproducts[index] = updatedProduct;
    this.saveToLocalStorage();
  }

  // Save the current list to localStorage
  private saveToLocalStorage() {
    localStorage.setItem('templateproducts', JSON.stringify(this.templateproducts));
  }
}
