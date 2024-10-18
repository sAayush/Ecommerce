import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../product/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      description: 'Product 1 description',
      category: 'Category 1'
    },
    {
      id: 2,
      name: 'Product 1',
      price: 100,
      description: 'Product 1 description',
      category: 'Category 1'
    },
    {
      id: 3,
      name: 'Product 1',
      price: 100,
      description: 'Product 1 description',
      category: 'Category 1'
    }
  ]

  addProduct(product: Product) {
    this.products.push(product)
  }

  removeProduct(product: Product) {
    this.products = this.products.filter(p => p !== product)
  }
  editProduct(product: Product) {
    const index = this.products.findIndex(p => p === product)
    this.products[index] = product
  }
}
