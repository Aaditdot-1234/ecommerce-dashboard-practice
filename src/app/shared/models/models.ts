export interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  rating: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
}
