"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCmsStore } from "@/store/cms-store";

const cmsSchema = z.object({
  heroEyebrow: z.string().min(2, "Enter a short label"),
  heroHeadline: z.string().min(5, "Enter a headline"),
  heroSubheadline: z.string().min(10, "Enter a subheadline"),
});

export default function AdminCmsPage() {
  const { heroEyebrow, heroHeadline, heroSubheadline, setContent, reset } = useCmsStore();
  const form = useForm<z.infer<typeof cmsSchema>>({
    resolver: zodResolver(cmsSchema),
    values: { heroEyebrow, heroHeadline, heroSubheadline },
  });

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Content Management</h1>
        <p className="text-muted-foreground text-sm">Edit homepage hero content. Changes reflect on the storefront immediately.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Homepage Hero</CardTitle>
          <CardDescription>
            Wrap a word in asterisks (e.g. *precisely*) to highlight it in the accent color.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => {
                setContent(values);
                toast.success("Homepage content updated");
              })}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="heroEyebrow"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eyebrow label</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="heroHeadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Headline</FormLabel>
                    <FormControl>
                      <Textarea rows={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="heroSubheadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subheadline</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit">Publish Changes</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    reset();
                    toast.success("Reset to defaults");
                  }}
                >
                  <RotateCcw className="size-4" /> Reset to Default
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
