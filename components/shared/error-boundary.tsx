"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: (reset: () => void) => React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Caught by ErrorBoundary:", error);
  }

  reset = () => this.setState({ hasError: false });

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback(this.reset);
      return (
        <div className="flex flex-col items-center gap-3 rounded-xl border py-16 text-center">
          <AlertTriangle className="text-destructive size-8" aria-hidden />
          <p className="font-display font-semibold">Something went wrong</p>
          <p className="text-muted-foreground max-w-sm text-sm">
            We hit a snag loading this section. Please try again.
          </p>
          <Button variant="outline" onClick={this.reset}>
            Try again
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
