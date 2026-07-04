"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { checkoutPaymentSchema, type CheckoutPaymentInput } from "@/lib/validations";

export function StepPayment({
  defaultValues,
  onNext,
  onBack,
  isSubmitting,
}: {
  defaultValues: CheckoutPaymentInput;
  onNext: (values: CheckoutPaymentInput) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}) {
  const form = useForm<CheckoutPaymentInput>({
    resolver: zodResolver(checkoutPaymentSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-5">
        <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <Lock className="size-3.5" /> This is a demo checkout — no real payment is processed.
        </p>
        <FormField
          control={form.control}
          name="cardName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name on card</FormLabel>
              <FormControl>
                <Input autoComplete="cc-name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Card number</FormLabel>
              <FormControl>
                <Input inputMode="numeric" autoComplete="cc-number" placeholder="4242 4242 4242 4242" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="expiry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiry</FormLabel>
                <FormControl>
                  <Input autoComplete="cc-exp" placeholder="MM/YY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cvc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVC</FormLabel>
                <FormControl>
                  <Input inputMode="numeric" autoComplete="cc-csc" placeholder="123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="billingSameAsShipping"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel className="font-normal">Billing address same as shipping</FormLabel>
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <Button type="button" variant="outline" size="lg" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" size="lg" className="flex-1 sm:flex-none" disabled={isSubmitting}>
            Review Order
          </Button>
        </div>
      </form>
    </Form>
  );
}
