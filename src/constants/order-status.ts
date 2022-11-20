import { Order } from '@/types/Order';

export const ORDER_STATUS: Record<Order['status'], { icon: string; title: string }> = {
  DONE: { icon: '✅', title: 'Pronto!' },
  IN_PRODUCTION: { icon: '👩🏾‍🍳', title: 'Em preparação' },
  WAITING: { icon: '🕒', title: 'Fila de espera' },
};
