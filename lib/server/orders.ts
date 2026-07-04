import { randomBytes } from "crypto";

import type { Address, Order } from "@/types";
import { demoOrders, demoCustomer } from "@/lib/data/account";
import { getProductById } from "@/lib/data/products";
import { computeCartTotals, type CartLineInput } from "@/lib/server/pricing";

declare global {
  var __obsidianOrders: Order[] | undefined;
}

function getStore() {
  if (!globalThis.__obsidianOrders) globalThis.__obsidianOrders = [...demoOrders];
  return globalThis.__obsidianOrders;
}

export interface CreateOrderInput {
  customerId?: string;
  lines: CartLineInput[];
  couponCode?: string;
  shippingAddress: Address;
  shippingMethod?: "standard" | "expedited" | "overnight";
  installation?: { installerId: string; installerName: string; date: string; slot: string };
}

export function listOrders(customerId = demoCustomer.id) {
  return getStore()
    .filter((o) => o.customerId === customerId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function findOrder(id: string) {
  return getStore().find((o) => o.id === id);
}

export function createOrder(input: CreateOrderInput): Order {
  const totals = computeCartTotals({
    lines: input.lines,
    couponCode: input.couponCode,
    zip: input.shippingAddress.zip,
    shippingMethod: input.shippingMethod,
  });

  const order: Order = {
    id: `ORD-${randomBytes(3).toString("hex").toUpperCase()}`,
    customerId: input.customerId ?? demoCustomer.id,
    items: input.lines.map((line) => {
      const product = getProductById(line.productId);
      return {
        productId: line.productId,
        name: product?.name ?? "Unknown product",
        slug: product?.slug ?? "",
        image: product?.images[0]?.url ?? "",
        quantity: line.quantity,
        price: product?.price ?? 0,
        size: product ? `${product.spec.width}/${product.spec.aspectRatio}R${product.spec.diameter}` : "",
      };
    }),
    status: "processing",
    subtotal: totals.subtotal,
    shipping: totals.shipping,
    tax: totals.tax,
    discount: totals.discount,
    total: totals.total,
    installation: input.installation,
    shippingAddress: input.shippingAddress,
    createdAt: new Date().toISOString(),
  };

  getStore().unshift(order);
  return order;
}
