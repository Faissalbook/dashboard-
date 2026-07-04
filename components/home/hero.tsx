"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Truck } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TireSizeSearch } from "@/components/search/tire-size-search";
import { VehicleSearchWidget } from "@/components/search/vehicle-search-widget";
import { parseAccentText, useCmsStore } from "@/store/cms-store";

const TRUST_POINTS = [
  { icon: Truck, label: "Free shipping over $150" },
  { icon: ShieldCheck, label: "Certified installer network" },
  { icon: Sparkles, label: "Price-match guarantee" },
];

export function Hero() {
  const heroEyebrow = useCmsStore((s) => s.heroEyebrow);
  const heroHeadline = useCmsStore((s) => s.heroHeadline);
  const heroSubheadline = useCmsStore((s) => s.heroSubheadline);
  const headlineParts = parseAccentText(heroHeadline);

  return (
    <section className="dark relative overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-ember/20 absolute top-[-10%] right-[-5%] size-[32rem] rounded-full blur-3xl" />
        <div className="absolute bottom-[-15%] left-[-10%] size-[28rem] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="container-edge relative grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <span className="border-ember/40 text-ember inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="size-3.5" /> {heroEyebrow}
          </span>
          <h1 className="font-display text-4xl leading-[1.05] font-bold text-balance sm:text-5xl lg:text-6xl">
            {headlineParts.map((part, i) =>
              part.accent ? (
                <span key={i} className="text-ember">
                  {part.text}
                </span>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </h1>
          <p className="text-muted-foreground max-w-lg text-base sm:text-lg">{heroSubheadline}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
            {TRUST_POINTS.map((point) => (
              <div key={point.label} className="text-muted-foreground flex items-center gap-2 text-sm">
                <point.icon className="text-ember size-4" />
                {point.label}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="glass rounded-2xl p-5 sm:p-6"
        >
          <Tabs defaultValue="size">
            <TabsList className="mb-5 grid w-full grid-cols-2">
              <TabsTrigger value="size">By Tire Size</TabsTrigger>
              <TabsTrigger value="vehicle">By Vehicle</TabsTrigger>
            </TabsList>
            <TabsContent value="size">
              <TireSizeSearch />
            </TabsContent>
            <TabsContent value="vehicle">
              <VehicleSearchWidget />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
