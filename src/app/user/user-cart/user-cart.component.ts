import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-cart.component.html',
  styleUrl: './user-cart.component.css'
})
export class UserCartComponent implements OnInit {
  total: number = 0;
  cartItems: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Subscribe to cart items from the cart service
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  // Remove an item from the cart
  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  // Clear all items in the cart
  clearCart(): void {
    this.cartService.clearCart();
  }
  
  getTotal(): number {
    for (let i = 0; i < this.cartItems.length; i++) {
      this.total += this.cartItems[i].price;
    }
    return this.total;
  }
}