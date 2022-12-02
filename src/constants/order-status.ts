import { IOrder } from '@/types/Order';

export const ORDER_STATUS: Record<
  IOrder['status'],
  { icon: string; title: string }
> = {
  DONE: { icon: '✅', title: 'Pronto!' },
  IN_PRODUCTION: { icon: '👩🏾‍🍳', title: 'Em preparação' },
  WAITING: { icon: '🕒', title: 'Fila de espera' },
};
