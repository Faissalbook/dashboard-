"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OrderSummary } from "@/components/cart/order-summary";
import { TireVisual } from "@/components/shared/tire-visual";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type {
  CheckoutCustomerInput,
  CheckoutInstallationInput,
  CheckoutPaymentInput,
  CheckoutShippingInput,
} from "@/lib/validations";
import { installers } from "@/lib/data/installers";

export function StepReview({
  customer,
  shipping,
  installation,
  payment,
  onBack,
  onPlaceOrder,
  isSubmitting,
}: {
  customer: CheckoutCustomerInput;
  shipping: CheckoutShippingInput;
  installation: CheckoutInstallationInput;
  payment: CheckoutPaymentInput;
  onBack: () => void;
  onPlaceOrder: () => void;
  isSubmitting: boolean;
}) {
  const lines = useCartStore((s) => s.lines);
  const installer = installers.find((i) => i.id === installation.installerId);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1 rounded-lg border p-4">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">Contact</p>
          <p className="text-sm">
            {customer.firstName} {customer.lastName}
          </p>
          <p className="text-muted-foreground text-sm">{customer.email}</p>
          <p className="text-muted-foreground text-sm">{customer.phone}</p>
        </div>
        <div className="space-y-1 rounded-lg border p-4">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">Shipping Address</p>
          <p className="text-sm">{shipping.line1}{shipping.line2 ? `, ${shipping.line2}` : ""}</p>
          <p className="text-muted-foreground text-sm">
            {shipping.city}, {shipping.state} {shipping.zip}
          </p>
          <p className="text-muted-foreground text-sm capitalize">{shipping.shippingMethod} shipping</p>
        </div>
        <div className="space-y-1 rounded-lg border p-4">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">Installation</p>
          {installation.wantsInstallation && installer ? (
            <>
              <p className="text-sm">{installer.name}</p>
              <p className="text-muted-foreground text-sm">
                {installation.date} at {installation.slot}
              </p>
            </>
          ) : (
            <p className="text-muted-foreground text-sm">No installation booked — self install or local shop.</p>
          )}
        </div>
        <div className="space-y-1 rounded-lg border p-4">
          <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">Payment</p>
          <p className="text-sm">{payment.cardName}</p>
          <p className="text-muted-foreground text-sm">Card ending in {payment.cardNumber.slice(-4)}</p>
        </div>
      </div>

      <div className="rounded-xl border p-4">
        <p className="mb-3 text-sm font-semibold">Items ({lines.reduce((n, l) => n + l.quantity, 0)})</p>
        <div className="space-y-3">
          {lines.map((line) => (
            <div key={line.productId} className="flex items-center gap-3">
              <TireVisual url={line.image} label={line.name} className="size-12 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">{line.name}</p>
                <p className="text-muted-foreground text-xs">
                  Qty {line.quantity} · {line.size}
                </p>
              </div>
              <p className="text-sm font-medium">{formatCurrency(line.price * line.quantity)}</p>
            </div>
          ))}
        </div>
      </div>

      <OrderSummary showCheckoutButton={false} />

      <Separator />

      <div className="flex gap-3">
        <Button type="button" variant="outline" size="lg" onClick={onBack} disabled={isSubmitting}>
          Back
        </Button>
        <Button size="lg" variant="accent" className="flex-1 sm:flex-none" onClick={onPlaceOrder} disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Place Order
        </Button>
      </div>
    </div>
  );
}
