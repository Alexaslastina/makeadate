import { FavoriteItem } from './favoritesService';

export interface OrderItem extends FavoriteItem {
  quantity?: number;
  reservationDate?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  paymentDetails: {
    cardLastFour: string;
    paymentDate: string;
  };
  billingInfo: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  status: 'completed' | 'pending' | 'cancelled';
  createdAt: string;
}

const ORDERS_STORAGE_KEY = 'makeadate_orders';

export function getOrders(userId: string): Order[] {
  try {
    const ordersJson = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!ordersJson) return [];
    
    const allOrders: Order[] = JSON.parse(ordersJson);
    return allOrders.filter(order => order.userId === userId);
  } catch (error) {
    console.error('Failed to parse orders from localStorage', error);
    return [];
  }
}

export function createOrder(order: Omit<Order, 'id' | 'createdAt' | 'status'>): Order {
  try {
    const ordersJson = localStorage.getItem(ORDERS_STORAGE_KEY);
    const allOrders: Order[] = ordersJson ? JSON.parse(ordersJson) : [];
    
    const newOrder: Order = {
      ...order,
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: 'completed',
      createdAt: new Date().toISOString(),
    };
    
    allOrders.push(newOrder);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(allOrders));
    
    return newOrder;
  } catch (error) {
    console.error('Failed to create order', error);
    throw new Error('Failed to create order');
  }
}

export function getOrderById(orderId: string, userId: string): Order | null {
  const orders = getOrders(userId);
  return orders.find(order => order.id === orderId) || null;
}

export function calculateTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
    const quantity = item.quantity || 1;
    return sum + (price * quantity);
  }, 0);
}

export function calculateTax(subtotal: number, taxRate: number = 0.18): number {
  return subtotal * taxRate;
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

