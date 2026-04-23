import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuItems = [
    { label: 'Dashboard', icon: 'fa-chart-pie',    route: '/dashboard' },
    { label: 'Orders',    icon: 'fa-shopping-cart', route: '/orders' },
    { label: 'Products',  icon: 'fa-box',           route: '/products' },
    { label: 'Revenue',   icon: 'fa-chart-line',    route: '/revenue' },
    { label: 'Settings',  icon: 'fa-cog',           route: '/settings' },
  ];
}
