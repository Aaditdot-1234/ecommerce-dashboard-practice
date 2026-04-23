import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Product } from '../shared/models/models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory = '';
  categories: string[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
      // BUG-008: Categories filter is broken - extracts categories but comparison fails
      this.categories = [...new Set(products.map(p => p.category))];
    });
  }

  filterByCategory(): void {
    if (!this.selectedCategory) {
      this.filteredProducts = this.products;
      return;
    }
    // BUG-008: Wrong property comparison - compares category to name instead of category
    this.filteredProducts = this.products.filter(p => p.name === this.selectedCategory);
  }

  getStockClass(stock: number): string {
    if (stock <= 10) return 'stock-low';
    if (stock <= 30) return 'stock-medium';
    return 'stock-good';
  }

  getRatingStars(rating: number): string {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  }
}
