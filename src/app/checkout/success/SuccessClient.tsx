"use client";

import { useEffect } from "react";
import { track } from "@/lib/funnel";
import { useCart } from "@/components/CartContext";

export function SuccessClient() {
  const { clear } = useCart();

  useEffect(() => {
    track("purchase");
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
