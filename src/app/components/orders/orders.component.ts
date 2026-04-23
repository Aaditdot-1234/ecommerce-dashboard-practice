import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  searchTerm = '';
  statusFilter = '';
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  loading = true;
  currentPage = 1;
  pageSize = 8;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getOrders().subscribe(data => {
      this.orders = data;
      this.filteredOrders = data;
      this.loading = false;
    });
  }

  // BUG-003: Filter is broken — uses wrong field name 'name' instead of 'customer'
  applyFilter(): void {
    this.filteredOrders = this.orders.filter(order => {
      const matchSearch = (order as any).name?.toLowerCase().includes(this.searchTerm.toLowerCase()) // BUG-003: should be order.customer
        || order.id.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchStatus = this.statusFilter ? order.status === this.statusFilter : true;
      return matchSearch && matchStatus;
    });
    this.currentPage = 1;
  }

  // BUG-003b: Sort does nothing - comparison returns 0 always
  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.filteredOrders.sort((a, b) => {
      return 0; // BUG-003b: always returns 0, no actual sorting happens
    });
  }

  get paginatedOrders(): Order[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredOrders.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredOrders.length / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  getBadgeClass(status: string): string {
    const map: any = { Completed: 'badge-success', Pending: 'badge-warning', Cancelled: 'badge-danger', Refunded: 'badge-info' };
    return map[status] || '';
  }
}
