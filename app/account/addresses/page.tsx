"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MapPin, Plus, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EmptyState } from "@/components/shared/empty-state";
import { addressSchema, type AddressInput } from "@/lib/validations";
import { useAddressStore } from "@/store/address-store";

function AddAddressDialog() {
  const [open, setOpen] = React.useState(false);
  const addAddress = useAddressStore((s) => s.addAddress);
  const form = useForm<AddressInput>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: "",
      fullName: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
      phone: "",
      isDefault: false,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    addAddress({ ...values, isDefault: values.isDefault ?? false });
    toast.success("Address added");
    form.reset();
    setOpen(false);
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" /> Add Address
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new address</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input placeholder="Home, Work…" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="line1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street address</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                      <Input {...field} />
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
                      <Input maxLength={2} {...field} />
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
                    <FormLabel>ZIP</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="font-normal">Set as default address</FormLabel>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save Address</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function AddressesPage() {
  const addresses = useAddressStore((s) => s.addresses);
  const removeAddress = useAddressStore((s) => s.removeAddress);
  const setDefault = useAddressStore((s) => s.setDefault);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Addresses</h1>
        <AddAddressDialog />
      </div>

      {addresses.length === 0 ? (
        <EmptyState icon={MapPin} title="No saved addresses" description="Add an address to speed up checkout." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{address.label}</p>
                  {address.isDefault ? (
                    <span className="text-ember flex items-center gap-1 text-xs font-medium">
                      <Star className="fill-ember size-3.5" /> Default
                    </span>
                  ) : (
                    <button
                      onClick={() => setDefault(address.id)}
                      className="text-muted-foreground hover:text-foreground text-xs"
                    >
                      Set as default
                    </button>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">{address.fullName}</p>
                <p className="text-muted-foreground text-sm">
                  {address.line1}
                  {address.line2 ? `, ${address.line2}` : ""}
                </p>
                <p className="text-muted-foreground text-sm">
                  {address.city}, {address.state} {address.zip}
                </p>
                <p className="text-muted-foreground text-sm">{address.phone}</p>
                <button
                  onClick={() => removeAddress(address.id)}
                  aria-label={`Remove ${address.label} address`}
                  className="text-muted-foreground hover:text-destructive flex items-center gap-1 pt-1 text-xs"
                >
                  <Trash2 className="size-3.5" /> Remove
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
