import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class DataService {
  private orders: Order[] = [
    { id: 'ORD-001', customer: 'Rahul Sharma',   email: 'rahul@gmail.com',  product: 'Running Shoes',    amount: 2499, status: 'Completed', date: '2024-01-15', city: 'Mumbai' },
    { id: 'ORD-002', customer: 'Priya Patel',    email: 'priya@gmail.com',  product: 'Yoga Mat',         amount: 899,  status: 'Pending',   date: '2024-01-16', city: 'Delhi' },
    { id: 'ORD-003', customer: 'Amit Singh',     email: 'amit@gmail.com',   product: 'Protein Powder',   amount: 1599, status: 'Completed', date: '2024-01-17', city: 'Bangalore' },
    { id: 'ORD-004', customer: 'Sneha Reddy',    email: 'sneha@gmail.com',  product: 'Smartwatch',       amount: 8999, status: 'Cancelled', date: '2024-01-18', city: 'Hyderabad' },
    { id: 'ORD-005', customer: 'Vikram Mehta',   email: 'vikram@gmail.com', product: 'Laptop Stand',     amount: 1299, status: 'Completed', date: '2024-01-19', city: 'Pune' },
    { id: 'ORD-006', customer: 'Ananya Iyer',    email: 'ananya@gmail.com', product: 'Wireless Earbuds', amount: 3499, status: 'Pending',   date: '2024-01-20', city: 'Chennai' },
    { id: 'ORD-007', customer: 'Rohan Gupta',    email: 'rohan@gmail.com',  product: 'Backpack',         amount: 1899, status: 'Completed', date: '2024-01-21', city: 'Kolkata' },
    { id: 'ORD-008', customer: 'Divya Nair',     email: 'divya@gmail.com',  product: 'Water Bottle',     amount: 499,  status: 'Refunded',  date: '2024-01-22', city: 'Kochi' },
    { id: 'ORD-009', customer: 'Karan Malhotra', email: 'karan@gmail.com',  product: 'Gym Gloves',       amount: 699,  status: 'Completed', date: '2024-01-23', city: 'Jaipur' },
    { id: 'ORD-010', customer: 'Meera Joshi',    email: 'meera@gmail.com',  product: 'Resistance Bands', amount: 799,  status: 'Pending',   date: '2024-01-24', city: 'Ahmedabad' },
    { id: 'ORD-011', customer: 'Arjun Verma',    email: 'arjun@gmail.com',  product: 'Foam Roller',      amount: 1099, status: 'Completed', date: '2024-01-25', city: 'Surat' },
    { id: 'ORD-012', customer: 'Pooja Desai',    email: 'pooja@gmail.com',  product: 'Jump Rope',        amount: 399,  status: 'Cancelled', date: '2024-01-26', city: 'Nagpur' },
  ];

  private products: Product[] = [
    { id: 'PRD-001', name: 'Running Shoes',    category: 'Footwear',    price: 2499, stock: 45,  sold: 230, status: 'Active' },
    { id: 'PRD-002', name: 'Yoga Mat',         category: 'Fitness',     price: 899,  stock: 0,   sold: 180, status: 'Out of Stock' },
    { id: 'PRD-003', name: 'Protein Powder',   category: 'Nutrition',   price: 1599, stock: 22,  sold: 310, status: 'Active' },
    { id: 'PRD-004', name: 'Smartwatch',       category: 'Electronics', price: 8999, stock: 8,   sold: 95,  status: 'Active' },
    { id: 'PRD-005', name: 'Laptop Stand',     category: 'Electronics', price: 1299, stock: 67,  sold: 142, status: 'Active' },
    { id: 'PRD-006', name: 'Wireless Earbuds', category: 'Electronics', price: 3499, stock: 15,  sold: 278, status: 'Active' },
    { id: 'PRD-007', name: 'Backpack',         category: 'Accessories', price: 1899, stock: 0,   sold: 89,  status: 'Out of Stock' },
    { id: 'PRD-008', name: 'Water Bottle',     category: 'Fitness',     price: 499,  stock: 200, sold: 450, status: 'Active' },
    { id: 'PRD-009', name: 'Gym Gloves',       category: 'Fitness',     price: 699,  stock: 33,  sold: 167, status: 'Active' },
    { id: 'PRD-010', name: 'Resistance Bands', category: 'Fitness',     price: 799,  stock: 0,   sold: 203, status: 'Discontinued' },
  ];

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return of(this.orders).pipe(delay(300));
  }

  getProducts(): Observable<Product[]> {
    return of(this.products).pipe(delay(300));
  }

  // BUG-004: API call always fails - wrong URL intentionally
  getRevenueData(): Observable<any> {
    return this.http.get('https://api.shoptrack.fake/revenue/monthly');
  }

  getDashboardStats(): Observable<any> {
    return of({
      totalRevenue: 485230, totalOrders: 1284,
      totalProducts: 48, totalCustomers: 932,
      revenueChange: 12.5, ordersChange: 8.3,
      productsChange: -2.1, customersChange: 15.7
    }).pipe(delay(200));
  }
}
