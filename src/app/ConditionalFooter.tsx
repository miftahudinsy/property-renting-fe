"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isTenantRoute = pathname?.startsWith("/tenant");
  const isProfileRoute = pathname === "/profile";

  if (isTenantRoute || isProfileRoute) {
    return null;
  }

  return <Footer />;
}
