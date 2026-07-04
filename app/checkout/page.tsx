"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CheckoutStepper } from "@/components/checkout/checkout-stepper";
import { StepCustomer } from "@/components/checkout/step-customer";
import { StepShipping } from "@/components/checkout/step-shipping";
import { StepInstallation } from "@/components/checkout/step-installation";
import { StepPayment } from "@/components/checkout/step-payment";
import { StepReview } from "@/components/checkout/step-review";
import { EmptyState } from "@/components/shared/empty-state";
import { ShoppingBag } from "lucide-react";
import { demoCustomer, demoAddresses } from "@/lib/data/account";
import { useCartStore } from "@/store/cart-store";
import type {
  CheckoutCustomerInput,
  CheckoutInstallationInput,
  CheckoutPaymentInput,
  CheckoutShippingInput,
} from "@/lib/validations";

const STEPS = [
  { key: "customer", label: "Customer" },
  { key: "shipping", label: "Shipping" },
  { key: "installation", label: "Installation" },
  { key: "payment", label: "Payment" },
  { key: "review", label: "Review" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const lines = useCartStore((s) => s.lines);
  const coupon = useCartStore((s) => s.coupon);
  const clearCart = useCartStore((s) => s.clear);

  const [stepIndex, setStepIndex] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [customer, setCustomer] = React.useState<CheckoutCustomerInput>(() => {
    const [firstName, ...restName] = demoCustomer.name.split(" ");
    return { email: demoCustomer.email, firstName, lastName: restName.join(" "), phone: demoCustomer.phone };
  });
  const [shipping, setShipping] = React.useState<CheckoutShippingInput>({
    line1: demoAddresses[0].line1,
    line2: demoAddresses[0].line2 ?? "",
    city: demoAddresses[0].city,
    state: demoAddresses[0].state,
    zip: demoAddresses[0].zip,
    country: demoAddresses[0].country,
    shippingMethod: "standard",
  });
  const [installation, setInstallation] = React.useState<CheckoutInstallationInput>({
    wantsInstallation: false,
    installerId: undefined,
    date: undefined,
    slot: undefined,
  });
  const [payment, setPayment] = React.useState<CheckoutPaymentInput>({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    billingSameAsShipping: true,
  });

  async function handlePlaceOrder() {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          shipping,
          installation,
          payment,
          lines: lines.map((l) => ({ productId: l.productId, quantity: l.quantity })),
          couponCode: coupon?.code,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Unable to place order");
      }

      const data = await res.json();
      clearCart();
      router.push(`/checkout/confirmation/${data.order.id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong placing your order");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="container-edge py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add tires to your cart before checking out."
          action={
            <Button asChild>
              <Link href="/tires">Browse Tires</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container-edge max-w-3xl py-8">
      <h1 className="font-display mb-8 text-3xl font-semibold">Checkout</h1>
      <CheckoutStepper steps={STEPS} currentIndex={stepIndex} />

      <div className="mt-10">
        {stepIndex === 0 && (
          <StepCustomer
            defaultValues={customer}
            onNext={(values) => {
              setCustomer(values);
              setStepIndex(1);
            }}
          />
        )}
        {stepIndex === 1 && (
          <StepShipping
            defaultValues={shipping}
            onBack={() => setStepIndex(0)}
            onNext={(values) => {
              setShipping(values);
              setStepIndex(2);
            }}
          />
        )}
        {stepIndex === 2 && (
          <StepInstallation
            defaultValues={installation}
            onBack={() => setStepIndex(1)}
            onNext={(values) => {
              setInstallation(values);
              setStepIndex(3);
            }}
          />
        )}
        {stepIndex === 3 && (
          <StepPayment
            defaultValues={payment}
            onBack={() => setStepIndex(2)}
            onNext={(values) => {
              setPayment(values);
              setStepIndex(4);
            }}
          />
        )}
        {stepIndex === 4 && (
          <StepReview
            customer={customer}
            shipping={shipping}
            installation={installation}
            payment={payment}
            onBack={() => setStepIndex(3)}
            onPlaceOrder={handlePlaceOrder}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
