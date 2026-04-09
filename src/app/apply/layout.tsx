import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply to join the 8-week chiropractic coaching program.",
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
