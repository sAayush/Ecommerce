import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      description: 'Product 1 description',
      category: 'Category 1'
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      description: 'Product 2 description',
      category: 'Category 2'
    },
    {
      id: 3,
      name: 'Product 3',
      price: 300,
      description: 'Product 3 description',
      category: 'Category 3'
    }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  products$ = this.productsSubject.asObservable();

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  addProduct(product: Product): void {
    this.products.push(product);
    this.productsSubject.next(this.products); // Update the products observable
  }

  removeProduct(productId: number): void {
    this.products = this.products.filter(p => p.id !== productId);
    this.productsSubject.next(this.products); // Update the products observable
  }

  editProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.productsSubject.next(this.products); // Update the products observable
    }
  }
}
