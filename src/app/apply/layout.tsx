import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply to join the 90-day chiropractic coaching intensive.",
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
