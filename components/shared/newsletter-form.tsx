"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { newsletterSchema, type NewsletterInput } from "@/lib/validations";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className }: { className?: string }) {
  const form = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = form.handleSubmit((values) => {
    toast.success(`You're subscribed! Confirmation sent to ${values.email}`);
    form.reset();
  });

  return (
    <form onSubmit={onSubmit} className={cn("space-y-1.5", className)}>
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="you@example.com"
          aria-label="Email address"
          className="bg-secondary/50"
          {...form.register("email")}
        />
        <Button type="submit" variant="accent" size="icon" aria-label="Subscribe">
          <Send className="size-4" />
        </Button>
      </div>
      {form.formState.errors.email && (
        <p className="text-destructive text-xs">{form.formState.errors.email.message}</p>
      )}
    </form>
  );
}
