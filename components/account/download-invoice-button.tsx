"use client";

import { Download } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function DownloadInvoiceButton({ invoiceId }: { invoiceId: string }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => toast.success(`Invoice ${invoiceId}.pdf downloaded`)}
    >
      <Download className="size-3.5" /> PDF
    </Button>
  );
}
