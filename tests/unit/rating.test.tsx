import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Rating } from "@/components/shared/rating";

describe("Rating", () => {
  it("renders an accessible label with the numeric value", () => {
    render(<Rating value={4.2} count={186} />);
    expect(screen.getByRole("img", { name: /rated 4.2 out of 5 stars/i })).toBeInTheDocument();
    expect(screen.getByText(/4\.2 \(186\)/)).toBeInTheDocument();
  });

  it("omits the count when not provided", () => {
    render(<Rating value={3.5} />);
    expect(screen.queryByText(/\(/)).not.toBeInTheDocument();
  });
});
