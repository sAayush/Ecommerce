import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../product/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  @Output() productAdded = new EventEmitter<Product>();

  id = 0;
  name = '';
  price = 0;
  description = '';
  category = '';

  addProduct() {
    const product = {
      id: this.id,
      name: this.name,
      price: this.price,
      description: this.description,
      category: this.category
    }
    this.id += 1;
    this.productAdded.emit(product);
  }
  constructor() { }
}
