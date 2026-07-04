"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CalendarClock, MapPin, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { checkoutInstallationSchema, type CheckoutInstallationInput } from "@/lib/validations";
import { installers } from "@/lib/data/installers";

const TIME_SLOTS = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

export function StepInstallation({
  defaultValues,
  onNext,
  onBack,
}: {
  defaultValues: CheckoutInstallationInput;
  onNext: (values: CheckoutInstallationInput) => void;
  onBack: () => void;
}) {
  const form = useForm<CheckoutInstallationInput>({
    resolver: zodResolver(checkoutInstallationSchema),
    defaultValues,
  });

  const wantsInstallation = form.watch("wantsInstallation");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-5">
        <FormField
          control={form.control}
          name="wantsInstallation"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-3 rounded-lg border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1">
                <FormLabel>Book professional installation</FormLabel>
                <p className="text-muted-foreground text-sm">
                  Skip the appointment hassle — we&apos;ll schedule a certified installer near you.
                </p>
              </div>
            </FormItem>
          )}
        />

        {wantsInstallation && (
          <div className="space-y-5 rounded-lg border p-4">
            <FormField
              control={form.control}
              name="installerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose an installer</FormLabel>
                  <FormControl>
                    <RadioGroup value={field.value} onValueChange={field.onChange} className="gap-3">
                      {installers.map((installer) => (
                        <Label
                          key={installer.id}
                          htmlFor={`installer-${installer.id}`}
                          className="hover:border-ember/50 flex cursor-pointer items-start gap-3 rounded-lg border p-3 font-normal has-[[data-state=checked]]:border-ember"
                        >
                          <RadioGroupItem value={installer.id} id={`installer-${installer.id}`} className="mt-0.5" />
                          <span className="flex-1">
                            <span className="flex items-center justify-between">
                              <span className="font-medium">{installer.name}</span>
                              <span className="text-muted-foreground flex items-center gap-1 text-xs">
                                <Star className="fill-ember text-ember size-3.5" /> {installer.rating}
                              </span>
                            </span>
                            <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                              <MapPin className="size-3.5 shrink-0" />
                              {installer.addressLine}, {installer.city} · {installer.distanceMiles} mi
                            </span>
                            <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                              <CalendarClock className="size-3.5 shrink-0" />
                              Next available: {installer.nextAvailable}
                            </span>
                          </span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred date</FormLabel>
                    <FormControl>
                      <input
                        type="date"
                        className="border-input h-10 w-full rounded-md border bg-transparent px-3 text-sm shadow-sm"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred time</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TIME_SLOTS.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button type="button" variant="outline" size="lg" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" size="lg" className="flex-1 sm:flex-none">
            Continue to Payment
          </Button>
        </div>
      </form>
    </Form>
  );
}
