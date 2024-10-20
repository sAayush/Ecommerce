import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Stores the cart items
  private cartItems: Product[] = this.loadCartFromLocalStorage() || [];

  // BehaviorSubject to track cart changes
  private cartItemsSubject = new BehaviorSubject<Product[]>(this.cartItems);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() { }

  // Adds a product to the cart
  addToCart(product: Product): void {
    this.cartItems.push(product);
    this.cartItemsSubject.next(this.cartItems); // Update the cart
    this.saveCartToLocalStorage(); // Save to local storage
  }

  // Removes a product from the cart
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.cartItemsSubject.next(this.cartItems); // Update the cart
    this.saveCartToLocalStorage(); // Save to local storage
  }

  // Clears the entire cart
  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
    this.saveCartToLocalStorage();
  }

  // Get the current items in the cart
  getCartItems(): Observable<Product[]> {
    return this.cartItems$;
  }

  // Load cart items from localStorage
  private loadCartFromLocalStorage(): Product[] | null {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : null;
  }

  // Save cart items to localStorage
  private saveCartToLocalStorage(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}