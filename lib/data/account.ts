import type { Address, Customer, Order, SavedVehicle } from "@/types";
import { products } from "./products";

export const demoCustomer: Customer = {
  id: "customer-demo",
  name: "Alex Rivera",
  email: "alex.rivera@example.com",
  phone: "(303) 555-0148",
  avatarInitial: "A",
  memberSince: "2023-06-14",
};

export const demoAddresses: Address[] = [
  {
    id: "address-1",
    label: "Home",
    fullName: "Alex Rivera",
    line1: "482 Larkspur Lane",
    city: "Denver",
    state: "CO",
    zip: "80202",
    country: "United States",
    phone: "(303) 555-0148",
    isDefault: true,
  },
  {
    id: "address-2",
    label: "Work",
    fullName: "Alex Rivera",
    line1: "1900 16th Street, Suite 400",
    city: "Denver",
    state: "CO",
    zip: "80202",
    country: "United States",
    phone: "(303) 555-0199",
    isDefault: false,
  },
];

export const demoSavedVehicles: SavedVehicle[] = [
  { id: "saved-1", year: 2022, make: "Toyota", model: "RAV4", trim: "XLE", size: "225/60R18", nickname: "Family SUV" },
  { id: "saved-2", year: 2019, make: "Honda", model: "Civic", trim: "Sport", size: "235/40R18", nickname: "Commuter" },
];

function buildDemoOrders(): Order[] {
  const sample = products.slice(0, 6);
  const address = demoAddresses[0];

  return [
    {
      id: "ORD-10482",
      customerId: demoCustomer.id,
      items: [
        { productId: sample[0].id, name: sample[0].name, slug: sample[0].slug, image: sample[0].images[0].url, quantity: 4, price: sample[0].price, size: `${sample[0].spec.width}/${sample[0].spec.aspectRatio}R${sample[0].spec.diameter}` },
      ],
      status: "delivered",
      subtotal: sample[0].price * 4,
      shipping: 0,
      tax: Math.round(sample[0].price * 4 * 0.0825 * 100) / 100,
      discount: 0,
      total: Math.round((sample[0].price * 4 * 1.0825) * 100) / 100,
      shippingAddress: address,
      createdAt: "2026-03-02",
      trackingNumber: "1Z999AA10123456784",
    },
    {
      id: "ORD-10617",
      customerId: demoCustomer.id,
      items: [
        { productId: sample[2].id, name: sample[2].name, slug: sample[2].slug, image: sample[2].images[0].url, quantity: 2, price: sample[2].price, size: `${sample[2].spec.width}/${sample[2].spec.aspectRatio}R${sample[2].spec.diameter}` },
        { productId: sample[3].id, name: sample[3].name, slug: sample[3].slug, image: sample[3].images[0].url, quantity: 2, price: sample[3].price, size: `${sample[3].spec.width}/${sample[3].spec.aspectRatio}R${sample[3].spec.diameter}` },
      ],
      status: "shipped",
      subtotal: sample[2].price * 2 + sample[3].price * 2,
      shipping: 14.99,
      tax: 22.4,
      discount: 15,
      total: sample[2].price * 2 + sample[3].price * 2 + 14.99 + 22.4 - 15,
      installation: { installerId: "installer-1", installerName: "Summit Auto Care", date: "2026-06-28", slot: "10:00 AM" },
      shippingAddress: address,
      createdAt: "2026-06-20",
      trackingNumber: "1Z999AA10123456999",
    },
    {
      id: "ORD-10733",
      customerId: demoCustomer.id,
      items: [
        { productId: sample[5].id, name: sample[5].name, slug: sample[5].slug, image: sample[5].images[0].url, quantity: 4, price: sample[5].price, size: `${sample[5].spec.width}/${sample[5].spec.aspectRatio}R${sample[5].spec.diameter}` },
      ],
      status: "processing",
      subtotal: sample[5].price * 4,
      shipping: 0,
      tax: Math.round(sample[5].price * 4 * 0.0825 * 100) / 100,
      discount: 0,
      total: Math.round((sample[5].price * 4 * 1.0825) * 100) / 100,
      shippingAddress: address,
      createdAt: "2026-07-01",
    },
  ];
}

export const demoOrders: Order[] = buildDemoOrders();

export function getOrderById(id: string) {
  return demoOrders.find((o) => o.id === id);
}
