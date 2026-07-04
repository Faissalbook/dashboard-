"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { getFilterFacets } from "@/lib/data/query";
import { tireSearchSchema, type TireSearchInput } from "@/lib/validations";

export function TireSizeSearch({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const facets = React.useMemo(() => getFilterFacets(), []);
  const form = useForm<TireSearchInput>({
    resolver: zodResolver(tireSearchSchema),
    defaultValues: { width: "", aspectRatio: "", diameter: "" },
  });

  const onSubmit = (values: TireSearchInput) => {
    const params = new URLSearchParams({
      width: values.width,
      aspectRatio: values.aspectRatio,
      diameter: values.diameter,
    });
    router.push(`/tires?${params.toString()}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={compact ? "flex flex-wrap items-end gap-3" : "grid gap-4 sm:grid-cols-4"}
      >
        <FormField
          control={form.control}
          name="width"
          render={({ field }) => (
            <FormItem className="min-w-[7rem] flex-1">
              <FormLabel>Width</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="e.g. 225" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {facets.widths.map((w) => (
                    <SelectItem key={w} value={String(w)}>
                      {w}
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
          name="aspectRatio"
          render={({ field }) => (
            <FormItem className="min-w-[7rem] flex-1">
              <FormLabel>Aspect Ratio</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="e.g. 45" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {facets.aspectRatios.map((a) => (
                    <SelectItem key={a} value={String(a)}>
                      {a}
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
          name="diameter"
          render={({ field }) => (
            <FormItem className="min-w-[7rem] flex-1">
              <FormLabel>Diameter</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="e.g. 18" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {facets.diameters.map((d) => (
                    <SelectItem key={d} value={String(d)}>
                      {d}&quot;
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className={compact ? "" : "sm:col-span-1"}>
          <Search className="size-4" /> Search Tires
        </Button>
      </form>
    </Form>
  );
}
