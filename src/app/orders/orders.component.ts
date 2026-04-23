import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Order } from '../shared/models/models';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];
  filteredOrders: Order[] = [];
  searchTerm = '';
  selectedStatus = '';
  sortColumn = '';
  // BUG-006: sortDirection never toggles — always sorts ascending
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getOrders().subscribe(orders => {
      this.orders = orders;
      this.filteredOrders = orders;
    });
  }

  onSearch(): void {
    this.applyFilters();
  }

  onStatusFilter(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let result = [...this.orders];

    if (this.searchTerm) {
      // BUG-007: Search only checks customer name, ignores product and order ID
      result = result.filter(o =>
        o.customer.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.selectedStatus) {
      result = result.filter(o => o.status === this.selectedStatus);
    }

    this.filteredOrders = result;
  }

  sortBy(column: string): void {
    this.sortColumn = column;
    // BUG-006: Missing toggle — direction never changes
    // Should be: this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.filteredOrders.sort((a: any, b: any) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'delivered': 'status-delivered',
      'processing': 'status-processing',
      'shipped': 'status-shipped',
      'pending': 'status-pending',
      'cancelled': 'status-cancelled'
    };
    return classes[status] || '';
  }
}
