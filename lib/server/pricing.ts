import { getProductById } from "@/lib/data/products";
import { getCouponByCode } from "@/lib/data/coupons";
import { computeDiscount } from "@/lib/pricing";
import { seededRandom } from "@/lib/data/prng";

export interface CartLineInput {
  productId: string;
  quantity: number;
}

const FREE_SHIPPING_THRESHOLD = 150;
const BASE_SHIPPING_RATE = 14.99;

export function getTaxRateForZip(zip?: string) {
  if (!zip) return 0.0725;
  const rand = seededRandom(zip);
  return Math.round((0.055 + rand() * 0.035) * 10000) / 10000;
}

export function computeCartTotals({
  lines,
  couponCode,
  zip,
  shippingMethod = "standard",
}: {
  lines: CartLineInput[];
  couponCode?: string;
  zip?: string;
  shippingMethod?: "standard" | "expedited" | "overnight";
}) {
  const resolvedLines = lines
    .map((line) => {
      const product = getProductById(line.productId);
      if (!product) return null;
      return { product, quantity: Math.max(1, line.quantity) };
    })
    .filter((l): l is { product: NonNullable<ReturnType<typeof getProductById>>; quantity: number } => !!l);

  const subtotal = resolvedLines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);

  const coupon = couponCode ? getCouponByCode(couponCode) ?? null : null;
  const discount = computeDiscount(subtotal, coupon);

  let shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : BASE_SHIPPING_RATE;
  if (coupon?.type === "free-shipping" && subtotal >= coupon.minSubtotal) shipping = 0;
  if (shippingMethod === "expedited") shipping += 19.99;
  if (shippingMethod === "overnight") shipping += 44.99;

  const taxRate = getTaxRateForZip(zip);
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Math.round(taxableAmount * taxRate * 100) / 100;

  const total = Math.round((subtotal - discount + shipping + tax) * 100) / 100;

  return {
    lines: resolvedLines.map((l) => ({
      productId: l.product.id,
      name: l.product.name,
      price: l.product.price,
      quantity: l.quantity,
      lineTotal: Math.round(l.product.price * l.quantity * 100) / 100,
    })),
    subtotal: Math.round(subtotal * 100) / 100,
    discount: Math.round(discount * 100) / 100,
    shipping: Math.round(shipping * 100) / 100,
    taxRate,
    tax,
    total,
    coupon,
  };
}
