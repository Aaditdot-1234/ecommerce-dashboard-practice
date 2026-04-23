import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: any = {};
  loading = true;
  recentOrders: any[] = [];

  // BUG-001: Chart type is wrong - 'bar' should be used here but 'radar' is set
  public salesChartType: any = 'radar'; // BUG-001: should be 'bar'

  public salesChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [42000, 55000, 48000, 61000, 73000, 68000],
      label: 'Revenue',
      backgroundColor: 'rgba(102,126,234,0.3)',
      borderColor: '#667eea',
      borderWidth: 2
    }]
  };

  public salesChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#a0aec0' } } },
    scales: {
      x: { ticks: { color: '#718096' }, grid: { color: '#2d3148' } },
      y: { ticks: { color: '#718096' }, grid: { color: '#2d3148' } }
    }
  };

  // BUG-002: Doughnut chart has empty data array
  public statusChartData: ChartData<'doughnut'> = {
    labels: ['Completed', 'Pending', 'Cancelled', 'Refunded'],
    datasets: [{ data: [], backgroundColor: ['#48bb78','#f6ad55','#fc8181','#63b3ed'] }] // BUG-002: data should be [65, 20, 10, 5]
  };

  public doughnutChartType: any = 'doughnut';
  public doughnutOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom', labels: { color: '#a0aec0' } } }
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getDashboardStats().subscribe(data => {
      this.stats = data;
      this.loading = false;
    });
    this.dataService.getOrders().subscribe(orders => {
      this.recentOrders = orders.slice(0, 5);
    });
  }

  getBadgeClass(status: string): string {
    const map: any = { Completed: 'badge-success', Pending: 'badge-warning', Cancelled: 'badge-danger', Refunded: 'badge-info' };
    return map[status] || '';
  }

  formatCurrency(val: number): string {
    return '₹' + val.toLocaleString('en-IN');
  }
}

// Add this method to the class
