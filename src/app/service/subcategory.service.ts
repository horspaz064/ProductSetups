import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SubproductsService {
  private subproducts: any[] = [];

  constructor() {
    const storedSubproducts = localStorage.getItem('subproducts');
    this.subproducts = storedSubproducts ? JSON.parse(storedSubproducts) : [];
  }

  getsubproducts() {
    return this.subproducts;
  }

  addProduct(product: any) {
    this.subproducts.push(product);
    localStorage.setItem('subproducts', JSON.stringify(this.subproducts)); // Saves under 'subproducts' key
  }

  updateProduct(index: number, updatedProduct: any) {
    if (index >= 0 && index < this.subproducts.length) {
      this.subproducts[index] = updatedProduct;
      localStorage.setItem('subproducts', JSON.stringify(this.subproducts));
    }
  }
}
