import { clamp } from "../utils.js";

export function calcReputationScore(school) {
  let score = 50;
  if (school.ratings && typeof school.ratings.overall === "number") {
    const r = school.ratings.overall;
    score += (r - 3) * 10; // 3 为基线
  }
  if (school.achievements && typeof school.achievements.high_school_admission_rate === "number") {
    score += Math.min(20, (school.achievements.high_school_admission_rate / 100) * 20);
  }
  if (school.category && /示范|重点|名校|省级|市级/i.test(school.category)) score += 15;
  return clamp(Math.round(score), 0, 100);
}
