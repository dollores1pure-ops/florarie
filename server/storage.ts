import { randomUUID } from "crypto";
import type { Order } from "@shared/schema";

export type StoredOrder = Order & {
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice: string;
  }>;
};

export interface SaveOrderInput {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  total: string;
  status?: Order["status"];
  stripeSessionId?: string | null;
  items?: StoredOrder["items"];
}

export interface IStorage {
  createOrder(data: SaveOrderInput): Promise<StoredOrder>;
  updateOrderByStripeSession(
    stripeSessionId: string,
    updates: Partial<Omit<StoredOrder, "id">>,
  ): Promise<StoredOrder | undefined>;
  getOrderByStripeSession(stripeSessionId: string): Promise<StoredOrder | undefined>;
}

export class MemStorage implements IStorage {
  private orders: Map<string, StoredOrder>;

  constructor() {
    this.orders = new Map();
  }

  async createOrder(data: SaveOrderInput): Promise<StoredOrder> {
    const id = randomUUID();
    const stripeSessionId = data.stripeSessionId ?? id;
    const order: StoredOrder = {
      id,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      deliveryAddress: data.deliveryAddress,
      total: data.total,
      status: data.status ?? "pending",
      stripeSessionId,
      items: data.items ?? [],
    };

    this.orders.set(stripeSessionId, order);
    return order;
  }

  async updateOrderByStripeSession(
    stripeSessionId: string,
    updates: Partial<Omit<StoredOrder, "id">>,
  ): Promise<StoredOrder | undefined> {
    const existing = this.orders.get(stripeSessionId);
    if (!existing) {
      return undefined;
    }

    const updated: StoredOrder = {
      ...existing,
      ...updates,
      items: updates.items ?? existing.items,
    };

    this.orders.set(stripeSessionId, updated);
    return updated;
  }

  async getOrderByStripeSession(stripeSessionId: string): Promise<StoredOrder | undefined> {
    return this.orders.get(stripeSessionId);
  }
}

export const storage = new MemStorage();
