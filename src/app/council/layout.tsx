import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Council",
  description: "Ongoing coaching for chiropractors who want consistent growth.",
};

export default function CouncilLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
