export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  status: 'Active' | 'Out of Stock' | 'Discontinued';
}
