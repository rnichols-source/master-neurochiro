import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Vision Behind NeuroChiro | Principled Chiropractic Mentorship",
  description: "Learn why Dr. Raymond Nichols created the NeuroChiro Mastermind to bridge the gap between technical training and practical leadership for chiropractors.",
};

export default function VisionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}