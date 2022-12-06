import api from '@/api';
import { IOrder, OrderStatus } from '@/types/Order';

class Orders {
  async getAll() {
    try {
      const data = await api.get<IOrder[]>('/orders');
      return data;
    } catch {
      throw new Error('Unable to load orders!');
    }
  }

  async delete(orderId: string) {
    try {
      const data = await api.delete(`/orders/${orderId}`);
      return data;
    } catch {
      throw new Error(`Unable to delete order with id: ${orderId}`);
    }
  }

  async changeStatus(orderId: string, status: OrderStatus) {
    try {
      const data = await api.patch(`/orders/${orderId}`, { status });
      return data;
    } catch {
      throw new Error(`Unable to change status from order with id: ${orderId}`);
    }
  }
}

export const OrdersService = new Orders();
