"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CarFront } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  getAvailableYears,
  getMakesForYear,
  getModelsForMake,
  getTrimsForModel,
  resolveVehicleSelection,
} from "@/lib/data/vehicles";
import { vehicleSearchSchema, type VehicleSearchInput } from "@/lib/validations";

export function VehicleSearchWidget({
  compact = false,
  onResolve,
}: {
  compact?: boolean;
  onResolve?: (selection: { year: string; makeId: string; modelId: string; trimId: string }) => void;
}) {
  const router = useRouter();
  const years = React.useMemo(() => getAvailableYears(), []);
  const form = useForm<VehicleSearchInput>({
    resolver: zodResolver(vehicleSearchSchema),
    defaultValues: { year: "", makeId: "", modelId: "", trimId: "" },
  });

  const year = form.watch("year");
  const makeId = form.watch("makeId");
  const modelId = form.watch("modelId");

  const makes = React.useMemo(() => (year ? getMakesForYear() : []), [year]);
  const models = React.useMemo(() => (makeId ? getModelsForMake(makeId) : []), [makeId]);
  const trims = React.useMemo(() => (makeId && modelId ? getTrimsForModel(makeId, modelId) : []), [makeId, modelId]);

  const onSubmit = (values: VehicleSearchInput) => {
    const resolved = resolveVehicleSelection(values.makeId, values.modelId, values.trimId);
    if (!resolved) return;
    if (onResolve) {
      onResolve(values);
      return;
    }
    const params = new URLSearchParams(values);
    router.push(`/shop-by-vehicle?${params.toString()}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={compact ? "flex flex-wrap items-end gap-3" : "grid gap-4 sm:grid-cols-4"}
      >
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem className="min-w-[7rem] flex-1">
              <FormLabel>Year</FormLabel>
              <Select
                onValueChange={(v) => {
                  field.onChange(v);
                  form.resetField("makeId");
                  form.resetField("modelId");
                  form.resetField("trimId");
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={String(y)}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="makeId"
          render={({ field }) => (
            <FormItem className="min-w-[8rem] flex-1">
              <FormLabel>Make</FormLabel>
              <Select
                onValueChange={(v) => {
                  field.onChange(v);
                  form.resetField("modelId");
                  form.resetField("trimId");
                }}
                value={field.value}
                disabled={!year}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Make" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {makes.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="modelId"
          render={({ field }) => (
            <FormItem className="min-w-[8rem] flex-1">
              <FormLabel>Model</FormLabel>
              <Select
                onValueChange={(v) => {
                  field.onChange(v);
                  form.resetField("trimId");
                }}
                value={field.value}
                disabled={!makeId}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {models.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="trimId"
          render={({ field }) => (
            <FormItem className="min-w-[8rem] flex-1">
              <FormLabel>Trim</FormLabel>
              <Select onValueChange={field.onChange} value={field.value} disabled={!modelId}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Trim" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {trims.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg">
          <CarFront className="size-4" /> Find My Tires
        </Button>
      </form>
    </Form>
  );
}
