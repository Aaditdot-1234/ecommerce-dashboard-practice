import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit {
  loading = true;
  error = false;
  errorMessage = '';

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Monthly Revenue (₹)',
      borderColor: '#667eea',
      backgroundColor: 'rgba(102,126,234,0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: '#667eea'
    }]
  };

  public lineChartType: any = 'line';
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#a0aec0' } } },
    scales: {
      x: { ticks: { color: '#718096' }, grid: { color: '#2d3148' } },
      y: { ticks: { color: '#718096' }, grid: { color: '#2d3148' } }
    }
  };

  revenueStats = [
    { label: 'Q1 Revenue', value: '₹1,45,000', change: '+8%' },
    { label: 'Q2 Revenue', value: '₹2,02,000', change: '+39%' },
    { label: 'Q3 Revenue', value: '₹2,35,000', change: '+16%' },
    { label: 'Q4 Revenue', value: '₹2,75,000', change: '+17%' },
    { label: 'Best Month', value: 'December',  change: '₹95,000' },
    { label: 'Avg Monthly', value: '₹71,000',  change: '' },
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // BUG-004: Calls broken API that always fails
    this.dataService.getRevenueData().subscribe({
      next: (data) => {
        this.lineChartData.labels = data.labels;
        this.lineChartData.datasets[0].data = data.monthly;
        this.loading = false;
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
        this.errorMessage = 'Failed to load revenue data. API unreachable.'; // BUG-004
      }
    });
  }
}
