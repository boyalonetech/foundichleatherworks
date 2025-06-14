"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

const ScrollToProducts = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const hasSearch = searchParams.get("search") || searchParams.get("name");

  useEffect(() => {
    if (hasSearch && ref.current) {
      setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
      }, 300); // Delay for render
    }
  }, [hasSearch]);

  return <div ref={ref}>{children}</div>;
};

export default ScrollToProducts;
