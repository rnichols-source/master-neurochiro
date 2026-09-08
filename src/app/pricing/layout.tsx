import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing & Enrollment | Above Atlas",
  description: "View pricing and apply for Above Atlas. Secure your seat in the next cohort of high-performing nervous-system-first chiropractors.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}