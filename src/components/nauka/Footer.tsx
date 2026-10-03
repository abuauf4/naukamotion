"use client";
import { StudioFooter } from "@/components/studio/StudioFooter";
import { useLocale } from "@/lib/locale-context";
export function Footer() {
  const { locale } = useLocale();
  return <StudioFooter locale={locale} />;
}
