import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";
import UtmCapture from "@/components/UtmCapture";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://www.virellisystems.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Virelli Systems | AI Reception — Never miss the call that becomes the opportunity",
  description:
    "Virelli Systems' AI Reception answers your business calls 24/7, handles enquiries, qualifies leads and books appointments — even when you can't. See a free personalised demo.",
  openGraph: {
    title: "Virelli Systems | AI Reception",
    description:
      "Never miss the call that becomes the opportunity. Virelli answers, qualifies and books — 24/7.",
    url: siteUrl,
    siteName: "Virelli Systems",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Virelli Systems | AI Reception",
    description:
      "Never miss the call that becomes the opportunity. Hear a free demo built for your business.",
  },
  icons: {
    // Placeholder favicon — replace public/favicon.ico with your Virelli mark.
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={`${sora.variable} ${inter.variable}`}>
      <body>
        {/* Fires PageView + carries the pixel base code. See components/MetaPixel.tsx */}
        <MetaPixel />
        {/* Captures utm_source/medium/campaign/content/term + fbclid into sessionStorage
            so they can be attached to the lead form on submit. See lib/utm.ts */}
        <UtmCapture />
        {children}
      </body>
    </html>
  );
}
