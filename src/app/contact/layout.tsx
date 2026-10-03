import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kontak",
  description:
    "Hubungi Nauka Motion untuk diskusi proyek. WhatsApp, email, atau kirim brief melalui form.",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
