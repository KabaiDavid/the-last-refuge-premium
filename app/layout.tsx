import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Libre_Caslon_Display, Libre_Caslon_Text } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/content/site";
import { venueJsonLd } from "@/lib/seo";
import "./globals.css";

const display = Libre_Caslon_Display({ weight: "400", subsets: ["latin"], variable: "--font-caslon-display", display: "swap" });
const text = Libre_Caslon_Text({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-caslon-text",
  display: "swap",
  preload: false,
});
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "The Last Refuge · A High Church of Bourbon in Louisville",
    template: "%s · The Last Refuge, Louisville",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "The Last Refuge at dusk, its stained glass lit above the courtyard" }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#14110f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${display.variable} ${text.variable} ${sans.variable}`}>
      <body>
        {/* The lancet arch, as a reusable clip path (objectBoundingBox units). */}
        <svg width="0" height="0" aria-hidden className="absolute">
          <defs>
            <clipPath id="lancet-clip" clipPathUnits="objectBoundingBox">
              <path d="M0,1 L0,0.34 C0,0.16 0.22,0.04 0.5,0 C0.78,0.04 1,0.16 1,0.34 L1,1 Z" />
            </clipPath>
          </defs>
        </svg>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <MotionRoot />
        <JsonLd data={venueJsonLd()} />
        <Script id="gtm" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.analytics.gtm}');`}
        </Script>
      </body>
    </html>
  );
}
