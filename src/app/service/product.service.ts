import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class secondproductervice {
  private secondproduct: any[] = [];

  constructor() {
    const storedsecondproduct = localStorage.getItem('secondproduct');
    this.secondproduct = storedsecondproduct ? JSON.parse(storedsecondproduct) : [];
  }

  getsecondproduct() {
    return this.secondproduct;
  }

  addProduct(product: any) {
    this.secondproduct.push(product);
    localStorage.setItem('secondproduct', JSON.stringify(this.secondproduct)); // Saves under 'secondproduct' key
  }

  updateProduct(index: number, updatedProduct: any) {
    if (index >= 0 && index < this.secondproduct.length) {
      this.secondproduct[index] = updatedProduct;
      localStorage.setItem('secondproduct', JSON.stringify(this.secondproduct));
    }
  }
}
