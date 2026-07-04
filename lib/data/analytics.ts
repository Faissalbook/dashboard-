import { demoOrders } from "./account";
import { products } from "./products";
import { seededRandom } from "./prng";

export function getAdminStats() {
  const totalRevenue = demoOrders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = demoOrders.length;
  const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0;
  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.stock > 0 && p.stock < 20);
  const outOfStockProducts = products.filter((p) => p.stock === 0);

  return { totalRevenue, totalOrders, avgOrderValue, totalProducts, lowStockProducts, outOfStockProducts };
}

const MONTHS = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];

export function getRevenueTrend() {
  const rand = seededRandom("admin-revenue-trend");
  let base = 18000;
  return MONTHS.map((month) => {
    base += (rand() - 0.3) * 4000;
    return { month, revenue: Math.max(6000, Math.round(base)) };
  });
}

export function getTopProducts(limit = 5) {
  return [...products]
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    .slice(0, limit);
}
