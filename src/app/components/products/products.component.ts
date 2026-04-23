import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categoryFilter = '';
  loading = true;
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  categories = ['Footwear', 'Fitness', 'Nutrition', 'Electronics', 'Accessories'];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
      this.loading = false;
    });
  }

  // BUG-006: Category filter uses wrong comparison — case mismatch always fails
  applyFilter(): void {
    this.filteredProducts = this.products.filter(p => {
      return this.categoryFilter
        ? p.category.toUpperCase() === this.categoryFilter // BUG-006: categoryFilter is mixed case, toUpperCase() will never match
        : true;
    });
  }

  sortBy(col: keyof Product): void {
    if (this.sortColumn === col) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = col;
      this.sortDirection = 'asc';
    }
    this.filteredProducts.sort((a, b) => {
      const valA = a[col];
      const valB = b[col];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return this.sortDirection === 'asc' ? valA - valB : valB - valA;
      }
      return this.sortDirection === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }

  getStockClass(stock: number): string {
    if (stock === 0) return 'badge-danger';
    if (stock < 20) return 'badge-warning';
    return 'badge-success';
  }

  getStatusClass(status: string): string {
    const map: any = { 'Active': 'badge-success', 'Out of Stock': 'badge-danger', 'Discontinued': 'badge-warning' };
    return map[status] || '';
  }
}
