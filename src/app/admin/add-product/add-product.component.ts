import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  id = 4;  // Keep track of the product IDs manually for now
  name = '';
  price = 0;
  description = '';
  category = '';

  constructor(private productService: ProductService) {}

  addProduct() {
    const product: Product = {
      id: this.id,
      name: this.name,
      price: this.price,
      description: this.description,
      category: this.category
    };

    this.productService.addProduct(product);  // Add the product via the service
    this.id += 1; 
    this.name = '';
    this.price = 0;
    this.description = '';
    this.category = '';
  }
}
