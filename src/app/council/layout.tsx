import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Inner Circle",
  description: "Ongoing bi-weekly coaching for Mastermind graduates who want consistent growth.",
};

export default function CouncilLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
