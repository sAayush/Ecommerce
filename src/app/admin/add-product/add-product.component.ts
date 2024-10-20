import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { Category } from '../../enum/category.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  categories = Object.values(Category); 
  selectedCategory: Category = Category.Grocery;  // Default selected value

  id = 4;
  name = '';
  price = 0;
  description = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  addProduct() {
    const product = {
      id: this.id,
      name: this.name,
      price: this.price,
      description: this.description,
      category: this.selectedCategory  
    };
    this.id += 1;
    this.name = '';
    this.price = 0;
    this.description = '';
    this.selectedCategory = Category.Grocery; 
    this.productService.addProduct(product);
    this.router.navigate(['/admin/products']);
  }
}