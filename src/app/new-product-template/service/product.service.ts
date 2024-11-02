import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This makes the service available application-wide
})
export class ProductService {
  private products: { Category: string; Subcategory: string }[] = [];

  constructor() {
    this.loadProducts(); // Load existing products from localStorage when the service is initialized
  }

  // Load products from localStorage
  loadProducts() {
    const storedProducts = localStorage.getItem('products');
    this.products = storedProducts ? JSON.parse(storedProducts) : [];
  }

  // Retrieve the list of products
  getProducts() {
    return this.products;
  }

  // Add a new product to the list and save it
  addProduct(product: { Category: string; Subcategory: string }) {
    this.products.push(product);
    this.saveProducts(); // Save to localStorage after adding
  }

  // Save the current product list to localStorage
  saveProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }
}
