export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id?: string;
  buyer: {
    name: string;
    phone: string;
    email: string;
  };
  items: CartItem[];
  total: number;
  date: Date;
  status: string;
}