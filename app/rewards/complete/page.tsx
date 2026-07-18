import type { Metadata } from "next";
import { RewardsPageShell } from "@/components/RewardsPageShell";

export const metadata: Metadata = {
  title: "Activating Reward Access",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RewardsCompletePage() {
  return <RewardsPageShell completed />;
}
