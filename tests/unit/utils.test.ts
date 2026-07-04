import { describe, expect, it, vi } from "vitest";

import { clamp, debounce, formatCurrency, range, slugify } from "@/lib/utils";

describe("formatCurrency", () => {
  it("formats a number as USD currency", () => {
    expect(formatCurrency(199.9)).toBe("$199.90");
  });

  it("rounds to two decimal places", () => {
    expect(formatCurrency(19.999)).toBe("$20.00");
  });
});

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Aravon Velocis GT 225/40R18")).toBe("aravon-velocis-gt-225-40r18");
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugify("  --Hello World--  ")).toBe("hello-world");
  });
});

describe("range", () => {
  it("produces an inclusive range", () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("supports a custom step", () => {
    expect(range(0, 10, 5)).toEqual([0, 5, 10]);
  });
});

describe("clamp", () => {
  it("clamps below the minimum", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it("clamps above the maximum", () => {
    expect(clamp(50, 0, 10)).toBe(10);
  });

  it("returns the value when within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });
});

describe("debounce", () => {
  it("only invokes the function once after the delay", () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debounced = debounce(fn, 200);

    debounced();
    debounced();
    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});
