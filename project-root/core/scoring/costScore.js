import { clamp, safeParseNumber } from "../utils.js";

export function calcCostScore(preferences, school) {
  const budget = safeParseNumber(preferences.budget);
  const fee = (school.fees && (school.fees.tuition || school.fees_number)) || null;
  if (!fee) return 70; // 未标注费用，给个中上分

  if (!budget) return 50;
  const ratio = fee / budget;
  if (ratio <= 0.5) return 100;
  if (ratio <= 1) return 80;
  if (ratio <= 1.5) return 50;
  return 20;
}
