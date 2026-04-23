import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RevenueData } from '../shared/models/models';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {

  revenueData: RevenueData[] = [];
  // BUG-004: Error state never shown to user — just empty screen
  isLoading = true;
  hasError = false;

  totalRevenue = 0;
  totalExpenses = 0;
  totalProfit = 0;

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // BUG-004: getRevenueData() randomly throws error, but error is not handled
    this.dataService.getRevenueData().subscribe({
      next: (data) => {
        this.revenueData = data;
        this.isLoading = false;
        this.calculateTotals();
        this.buildChart();
      },
      // BUG-004: Error handler exists but hasError flag is never set, so error UI never shows
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        // Missing: this.hasError = true;
      }
    });
  }

  calculateTotals(): void {
    this.totalRevenue = this.revenueData.reduce((sum, d) => sum + d.revenue, 0);
    this.totalExpenses = this.revenueData.reduce((sum, d) => sum + d.expenses, 0);
    this.totalProfit = this.revenueData.reduce((sum, d) => sum + d.profit, 0);
  }

  buildChart(): void {
    this.lineChartData = {
      labels: this.revenueData.map(d => d.month),
      datasets: [
        { data: this.revenueData.map(d => d.revenue), label: 'Revenue', borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)', fill: true, tension: 0.4 },
        { data: this.revenueData.map(d => d.expenses), label: 'Expenses', borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)', fill: true, tension: 0.4 },
        { data: this.revenueData.map(d => d.profit), label: 'Profit', borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.1)', fill: true, tension: 0.4 },
      ]
    };
  }
}
