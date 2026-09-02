"use client";

import { useEffect } from "react";
import { captureUtmParams } from "@/lib/utm";

// Runs once on mount to store any ad attribution params present in the URL.
// Renders nothing — this is a tracking-only component.
export default function UtmCapture() {
  useEffect(() => {
    captureUtmParams();
  }, []);

  return null;
}
