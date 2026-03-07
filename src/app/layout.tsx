import type { Metadata } from "next";
import { Lato, Montserrat } from "next/font/google";
import "./globals.css";
import { PWARegistration } from "@/components/layout/pwa-registration";
import { AdminQuickAccess } from "@/components/admin/admin-quick-access";

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
  title: "Master NeuroChiro Mastermind",
  description: "The elite growth ecosystem for Nervous-System-First Chiropractors.",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo-dark.png",
    apple: "/logo-dark.png",
  },
  openGraph: {
    title: "Master NeuroChiro Mastermind",
    description: "The elite growth ecosystem for Nervous-System-First Chiropractors.",
    images: ["/logo-dark.png"],
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
        <AdminQuickAccess />
        {children}
      </body>
    </html>
  );
}
