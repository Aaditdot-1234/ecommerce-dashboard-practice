export interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Cancelled' | 'Refunded';
  date: string;
  city: string;
}
