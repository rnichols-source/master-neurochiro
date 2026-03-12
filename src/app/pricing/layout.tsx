import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Enrollment | NeuroChiro Chiropractic Mastermind",
  description: "View pricing and apply for the NeuroChiro Mastermind. Secure your seat in the next cohort of high-performing nervous-system-first chiropractors.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}