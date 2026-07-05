export const chestOutcomes = [
  { id: "try_again", label: "0 días", probability: "34.9%", rarity: "Try Again", color: "#ec4899", position: "0% 0%", weight: 3490, days: 0 },
  { id: "common_15d", label: "15 días", probability: "40.1%", rarity: "Common", color: "#4f7cff", position: "50% 0%", weight: 4010, days: 15 },
  { id: "rare_30d", label: "30 días", probability: "17%", rarity: "Rare", color: "#22d3ee", position: "100% 0%", weight: 1700, days: 30 },
  { id: "epic_2m", label: "2 meses", probability: "6%", rarity: "Epic", color: "#b94cff", position: "0% 100%", weight: 600, days: 60 },
  { id: "legendary_7m", label: "7 meses", probability: "1.5%", rarity: "Legendary", color: "#ff9d1c", position: "50% 100%", weight: 150, days: 210 },
  { id: "jackpot_lifetime", label: "Lifetime", probability: "0.5%", rarity: "Jackpot", color: "#ffd21c", position: "100% 100%", weight: 50, days: null },
] as const;

export type ChestOutcome = (typeof chestOutcomes)[number];

export type ChestResult = {
  id: string;
  prizeId: string;
  label: string;
  rarity: string;
  probability: number;
  licenseKey: string | null;
  paidUntil: string | null;
  combinedDurationDays?: number | null;
  combinedLifetime?: boolean;
};

export function getChestOutcome(prizeId: string): ChestOutcome {
  return chestOutcomes.find((outcome) => outcome.id === prizeId) ?? chestOutcomes[0];
}

export function summarizeChestResults(results: ChestResult[]) {
  const winningOutcomes = results
    .map((result) => getChestOutcome(result.prizeId))
    .filter((outcome) => outcome.days !== 0);
  const lifetime = winningOutcomes.some((outcome) => outcome.days === null);
  const totalDays = lifetime
    ? null
    : winningOutcomes.reduce((total, outcome) => total + Number(outcome.days || 0), 0);
  const awardedKeys = [...new Set(
    results.flatMap((result) => result.licenseKey ? [result.licenseKey] : []),
  )];

  return {
    awardedKeys,
    lifetime,
    totalDays,
    winningLabels: winningOutcomes.map((outcome) => outcome.label),
    paidUntil: results.find((result) => result.paidUntil)?.paidUntil ?? null,
  };
}
