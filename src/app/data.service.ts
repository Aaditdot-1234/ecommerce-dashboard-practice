import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Order, Product, RevenueData, DashboardStats } from './shared/models/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private orders: Order[] = [
    { id: 'ORD-001', customer: 'Rahul Sharma', product: 'Nike Air Max', amount: 4999, status: 'delivered', date: '2024-01-15', quantity: 2 },
    { id: 'ORD-002', customer: 'Priya Patel', product: 'Samsung Galaxy S23', amount: 54999, status: 'processing', date: '2024-01-18', quantity: 1 },
    { id: 'ORD-003', customer: 'Amit Singh', product: 'Levi\'s Jeans', amount: 2499, status: 'shipped', date: '2024-01-20', quantity: 3 },
    { id: 'ORD-004', customer: 'Sneha Rao', product: 'Apple AirPods', amount: 14999, status: 'pending', date: '2024-01-22', quantity: 1 },
    { id: 'ORD-005', customer: 'Vikram Nair', product: 'Adidas Hoodie', amount: 3499, status: 'cancelled', date: '2024-01-23', quantity: 2 },
    { id: 'ORD-006', customer: 'Deepa Menon', product: 'Sony Headphones', amount: 8999, status: 'delivered', date: '2024-01-25', quantity: 1 },
    { id: 'ORD-007', customer: 'Rohan Gupta', product: 'Puma Shoes', amount: 3999, status: 'processing', date: '2024-01-26', quantity: 2 },
    { id: 'ORD-008', customer: 'Ananya Das', product: 'Titan Watch', amount: 12999, status: 'shipped', date: '2024-01-27', quantity: 1 },
    { id: 'ORD-009', customer: 'Karan Mehta', product: 'HP Laptop Bag', amount: 1999, status: 'delivered', date: '2024-01-28', quantity: 4 },
    { id: 'ORD-010', customer: 'Pooja Iyer', product: 'Canon Camera', amount: 45999, status: 'pending', date: '2024-01-29', quantity: 1 },
    { id: 'ORD-011', customer: 'Arjun Kumar', product: 'Nike Air Max', amount: 4999, status: 'delivered', date: '2024-02-01', quantity: 1 },
    { id: 'ORD-012', customer: 'Meera Shah', product: 'OnePlus Nord', amount: 28999, status: 'processing', date: '2024-02-03', quantity: 1 },
  ];

  private products: Product[] = [
    { id: 'PRD-001', name: 'Nike Air Max', category: 'Footwear', price: 4999, stock: 45, sold: 120, rating: 4.5 },
    { id: 'PRD-002', name: 'Samsung Galaxy S23', category: 'Electronics', price: 54999, stock: 12, sold: 45, rating: 4.8 },
    { id: 'PRD-003', name: 'Levi\'s Jeans', category: 'Clothing', price: 2499, stock: 78, sold: 200, rating: 4.2 },
    { id: 'PRD-004', name: 'Apple AirPods', category: 'Electronics', price: 14999, stock: 30, sold: 89, rating: 4.7 },
    { id: 'PRD-005', name: 'Adidas Hoodie', category: 'Clothing', price: 3499, stock: 55, sold: 145, rating: 4.3 },
    { id: 'PRD-006', name: 'Sony Headphones', category: 'Electronics', price: 8999, stock: 25, sold: 67, rating: 4.6 },
    { id: 'PRD-007', name: 'Puma Shoes', category: 'Footwear', price: 3999, stock: 60, sold: 110, rating: 4.1 },
    { id: 'PRD-008', name: 'Titan Watch', category: 'Accessories', price: 12999, stock: 20, sold: 55, rating: 4.4 },
    { id: 'PRD-009', name: 'HP Laptop Bag', category: 'Accessories', price: 1999, stock: 90, sold: 180, rating: 3.9 },
    { id: 'PRD-010', name: 'Canon Camera', category: 'Electronics', price: 45999, stock: 8, sold: 22, rating: 4.9 },
  ];

  private revenueData: RevenueData[] = [
    { month: 'Jan', revenue: 125000, expenses: 80000, profit: 45000 },
    { month: 'Feb', revenue: 148000, expenses: 92000, profit: 56000 },
    { month: 'Mar', revenue: 162000, expenses: 88000, profit: 74000 },
    { month: 'Apr', revenue: 139000, expenses: 95000, profit: 44000 },
    { month: 'May', revenue: 175000, expenses: 102000, profit: 73000 },
    { month: 'Jun', revenue: 198000, expenses: 110000, profit: 88000 },
    { month: 'Jul', revenue: 210000, expenses: 115000, profit: 95000 },
    { month: 'Aug', revenue: 195000, expenses: 108000, profit: 87000 },
    { month: 'Sep', revenue: 220000, expenses: 120000, profit: 100000 },
    { month: 'Oct', revenue: 245000, expenses: 130000, profit: 115000 },
    { month: 'Nov', revenue: 280000, expenses: 145000, profit: 135000 },
    { month: 'Dec', revenue: 320000, expenses: 160000, profit: 160000 },
  ];

  getOrders(): Observable<Order[]> {
    return of(this.orders);
  }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getRevenueData(): Observable<RevenueData[]> {
    // BUG-004: API randomly fails - throws error instead of returning data
    if (Math.random() > 0.5) {
      return throwError(() => new Error('Network Error: Failed to fetch revenue data'));
    }
    return of(this.revenueData);
  }

  getDashboardStats(): DashboardStats {
    return {
      totalRevenue: this.orders.reduce((sum, order) => sum + order.amount, 0),
      totalOrders: this.orders.length,
      totalProducts: this.products.length,
      totalCustomers: new Set(this.orders.map(o => o.customer)).size
    };
  }

  getRevenueChartData() {
    return this.revenueData;
  }
}
