import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { Category } from '../../enum/category.enum';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private localStorageKey = 'productsData'; // Key to use for localStorage
  
  cat = Category;

  // Load products from localStorage if available, else use default products
  private products: Product[] = this.loadProductsFromLocalStorage() || [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 120.00,
      description: 'High-quality wireless headphones with noise cancellation.',
      category: Category.Tech
    },
    {
      id: 2,
      name: 'Organic Bananas',
      price: 1.50,
      description: 'Fresh organic bananas sourced from sustainable farms.',
      category: Category.Grocery
    },
    {
      id: 3,
      name: 'Gaming Laptop',
      price: 1500.00,
      description: 'High-performance gaming laptop with top-tier specs.',
      category: Category.Tech
    }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  products$ = this.productsSubject.asObservable();
  
  constructor() {
    this.saveProductsToLocalStorage(); // Save initial products to localStorage
  }

  // Load products from localStorage
  private loadProductsFromLocalStorage(): Product[] | null {
    const storedProducts = localStorage.getItem(this.localStorageKey);
    return storedProducts ? JSON.parse(storedProducts) : null;
  }

  // Save products to localStorage
  private saveProductsToLocalStorage(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.products));
  }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  addProduct(product: Product): void {
    this.products.push(product);
    this.productsSubject.next(this.products); // Update the products observable
    this.saveProductsToLocalStorage(); // Save changes to localStorage
  }

  removeProduct(productId: number): void {
    this.products = this.products.filter(p => p.id !== productId);
    this.productsSubject.next(this.products); // Update the products observable
    this.saveProductsToLocalStorage(); // Save changes to localStorage
  }

  editProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.productsSubject.next(this.products); // Update the products observable
      this.saveProductsToLocalStorage(); // Save changes to localStorage
    }
  }
}
