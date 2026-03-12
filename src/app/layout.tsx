import type { Metadata } from "next";
import { Lato, Montserrat } from "next/font/google";
import "./globals.css";
import { PWARegistration } from "@/components/layout/pwa-registration";
import { AdminQuickAccess } from "@/components/admin/admin-quick-access";
import { StealthFounderTrigger } from "@/components/admin/StealthFounderTrigger";

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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://neurochiromastermind.com"),
  title: {
    default: "NeuroChiro | The Elite Chiropractic Mastermind & Coaching",
    template: "%s | NeuroChiro Mastermind",
  },
  description: "The elite 8-week chiropractic mastermind and coaching program. Master patient communication, clinical certainty, and practice growth.",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo-dark.png",
    apple: "/logo-dark.png",
  },
  openGraph: {
    title: "NeuroChiro | The Elite Chiropractic Mastermind & Coaching",
    description: "The elite 8-week chiropractic mastermind and coaching program. Master patient communication, clinical certainty, and practice growth.",
    images: ["/logo-dark.png"],
    type: "website",
  }
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
        <StealthFounderTrigger />
        {children}
      </body>
    </html>
  );
}
