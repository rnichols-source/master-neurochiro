import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chiropractic Growth Case Studies & Results | NeuroChiro Mastermind",
  description: "See how chiropractors are doubling revenue, installing clinical certainty, and scaling their practices with the NeuroChiro Operating System.",
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}