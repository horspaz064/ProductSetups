import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: any[] = [];

  constructor() {
    const storedProducts = localStorage.getItem('products');
    this.products = storedProducts ? JSON.parse(storedProducts) : [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(product: any) {
    this.products.push(product);
    localStorage.setItem('products', JSON.stringify(this.products)); // Saves under 'products' key
  }

  updateProduct(index: number, updatedProduct: any) {
    if (index >= 0 && index < this.products.length) {
      this.products[index] = updatedProduct;
      localStorage.setItem('products', JSON.stringify(this.products));
    }
  }
}
