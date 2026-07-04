"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { checkoutShippingSchema, type CheckoutShippingInput } from "@/lib/validations";

const SHIPPING_METHODS = [
  { value: "standard", label: "Standard", detail: "5–7 business days", price: "Free over $150" },
  { value: "expedited", label: "Expedited", detail: "2–3 business days", price: "+$19.99" },
  { value: "overnight", label: "Overnight", detail: "Next business day", price: "+$44.99" },
] as const;

export function StepShipping({
  defaultValues,
  onNext,
  onBack,
}: {
  defaultValues: CheckoutShippingInput;
  onNext: (values: CheckoutShippingInput) => void;
  onBack: () => void;
}) {
  const form = useForm<CheckoutShippingInput>({
    resolver: zodResolver(checkoutShippingSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-5">
        <FormField
          control={form.control}
          name="line1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street address</FormLabel>
              <FormControl>
                <Input autoComplete="address-line1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="line2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
              <FormControl>
                <Input autoComplete="address-line2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input autoComplete="address-level2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input autoComplete="address-level1" maxLength={2} placeholder="CO" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ZIP code</FormLabel>
                <FormControl>
                  <Input autoComplete="postal-code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input autoComplete="country-name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shippingMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipping method</FormLabel>
              <FormControl>
                <RadioGroup value={field.value} onValueChange={field.onChange} className="gap-3">
                  {SHIPPING_METHODS.map((method) => (
                    <Label
                      key={method.value}
                      htmlFor={`ship-${method.value}`}
                      className="hover:border-ember/50 flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-3 font-normal has-[[data-state=checked]]:border-ember"
                    >
                      <span className="flex items-center gap-3">
                        <RadioGroupItem value={method.value} id={`ship-${method.value}`} />
                        <span>
                          <span className="block font-medium">{method.label}</span>
                          <span className="text-muted-foreground block text-xs">{method.detail}</span>
                        </span>
                      </span>
                      <span className="text-muted-foreground text-sm">{method.price}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <Button type="button" variant="outline" size="lg" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" size="lg" className="flex-1 sm:flex-none">
            Continue to Installation
          </Button>
        </div>
      </form>
    </Form>
  );
}
