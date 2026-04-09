import type { Metadata, Viewport } from "next";
import { Lato, Montserrat } from "next/font/google";
import "./globals.css";
import { PWARegistration } from "@/components/layout/pwa-registration";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover" as const,
  themeColor: "#0F172A",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://neurochiromastermind.com"),
  title: {
    default: "NeuroChiro Mastermind | The Elite Chiropractic Coaching Program",
    template: "%s | NeuroChiro Mastermind",
  },
  description: "The premier 8-week chiropractic mastermind and coaching program. Master patient communication, clinical certainty, report of findings architecture, and practice growth.",
  keywords: ["chiropractic coaching", "chiropractic mastermind", "chiropractic mentorship", "chiropractic business coaching", "chiropractic practice management", "report of findings training", "chiropractic patient communication"],
  manifest: "/manifest.json",
  icons: {
    icon: "/logo-dark.png",
    apple: "/logo-dark.png",
  },
  openGraph: {
    title: "NeuroChiro Mastermind | Elite Chiropractic Coaching",
    description: "Join the elite 8-week chiropractic mastermind. Master patient communication, clinical certainty, and practice growth.",
    url: "https://neurochiromastermind.com",
    siteName: "NeuroChiro Mastermind",
    images: [
      {
        url: "/logo-dark.png",
        width: 1200,
        height: 630,
        alt: "NeuroChiro Mastermind Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuroChiro Mastermind | Elite Chiropractic Coaching",
    description: "The elite 8-week chiropractic mastermind for modern chiropractors.",
    images: ["/logo-dark.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <PWARegistration />
        {children}
      </body>
    </html>
  );
}
