import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NeuroChiro Live Adelaide 2026 | Chiropractic Immersion Event",
  description: "Join Dr. Raymond Nichols live in Adelaide, Australia for a 2-day immersion into Nervous System Chiropractic and high-performance clinic systems.",
};

export default function LiveEventLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}