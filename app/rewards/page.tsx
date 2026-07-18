import type { Metadata } from "next";
import { RewardsPageShell } from "@/components/RewardsPageShell";

export const metadata: Metadata = {
  title: "Zentux Rewards | Free 24H Zentux Access",
  description:
    "Complete sponsored LootLabs tasks through Zentux Rewards and unlock 24 hours of free Zentux access.",
  alternates: {
    canonical: "/rewards",
  },
  openGraph: {
    title: "Zentux Rewards | Free 24H Zentux Access",
    description:
      "Complete sponsored LootLabs tasks through Zentux Rewards and unlock 24 hours of free Zentux access.",
    url: "https://zentux.gg/rewards",
  },
};

export default function RewardsPage() {
  return <RewardsPageShell />;
}
