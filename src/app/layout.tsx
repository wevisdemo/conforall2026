import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const fcMinimal = localFont({
  src: [
    {
      path: "../../public/fonts/FC Minimal Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-fc-minimal",
});

const ibmPlexSansThaiLooped = localFont({
  src: [
    {
      path: "../../public/fonts/IBMPlexSansThaiLooped-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/IBMPlexSansThaiLooped-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-ibm-plex-sans-thai-looped",
});

// TODO: Replace with your actual production domain
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://conforall.com/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "เส้นทางสู่ประชามติรัฐธรรมนูญใหม่ ต้องการคุณ",
  description:
    "ร่วมเป็นส่วนหนึ่งในการประชามติรัฐธรรมนูญใหม่ ค้นหาจุดรณรงค์ สมัครเป็นจุดรณรงค์ และติดตามข้อมูลข่าวสารล่าสุด",
  keywords: ["ประชามติ", "รัฐธรรมนูญ", "Referendum", "Thailand"],
  openGraph: {
    title: "เส้นทางสู่ประชามติรัฐธรรมนูญใหม่ ต้องการคุณ",
    description:
      "ร่วมเป็นส่วนหนึ่งในการประชามติรัฐธรรมนูญใหม่ ค้นหาจุดรณรงค์ สมัครเป็นจุดรณรงค์ และติดตามข้อมูลข่าวสารล่าสุด",
    type: "website",
    locale: "th_TH",
    siteName: "Referendum",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "เส้นทางสู่ประชามติรัฐธรรมนูญใหม่",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "เส้นทางสู่ประชามติรัฐธรรมนูญใหม่ ต้องการคุณ",
    description:
      "ร่วมเป็นส่วนหนึ่งในการประชามติรัฐธรรมนูญใหม่ ค้นหาจุดรณรงค์ สมัครเป็นจุดรณรงค์ และติดตามข้อมูลข่าวสารล่าสุด",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${fcMinimal.variable} ${ibmPlexSansThaiLooped.variable} antialiased`}
      >
        {children}
        <Script
          defer
          data-domain="conforall.com"
          src="https://analytics.punchup.world/js/script.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
