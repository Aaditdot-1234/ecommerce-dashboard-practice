import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DashboardStats, Order } from '../shared/models/models';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stats!: DashboardStats;
  recentOrders: Order[] = [];
  isLoading = true;

  // BUG-002: Chart labels and data arrays are mismatched in length causing chart to render incorrectly
  public barChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [125000, 148000, 162000, 139000, 175000, 198000], // BUG-002: Only 4 values for 6 labels
        label: 'Revenue',
        backgroundColor: '#3b82f6',
        borderRadius: 6,
      }
    ]
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Monthly Revenue' }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  // BUG-003: Pie chart has wrong color array - only 2 colors for 4 data points
  public pieChartData: ChartData<'pie'> = {
    labels: ['Electronics', 'Clothing', 'Footwear', 'Accessories'],
    datasets: [{
      data: [45, 25, 20, 10],
      backgroundColor: ['#3b82f6', '#10b981', '#8b5cf6', '#f97316'] // BUG-003: Missing colors for Footwear and Accessories
    }]
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'right' }
    }
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.stats = this.dataService.getDashboardStats();
    console.log(this.stats);
    this.dataService.getOrders().subscribe(orders => {
      // BUG-005: slice(0,5) should show recent 5 but orders aren't sorted by date first
      this.recentOrders = orders.slice(0, 5);
      this.isLoading = false;
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
