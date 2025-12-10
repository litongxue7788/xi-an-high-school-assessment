import { clamp } from "../utils.js";

export function calcPreferenceScore(preferences, school) {
  let score = 50;
  // 学校类型匹配
  if (preferences.type && preferences.type !== "不限" && school.type && preferences.type === school.type) {
    score += 30;
  }
  // 寄宿匹配（简单依据字段）
  if (preferences.boarding) {
    const need = preferences.boarding === "需要";
    const hasBoarding = !!(school.facilities && school.facilities.boarding);
    if ((need && hasBoarding) || (!need && !hasBoarding)) score += 20;
  }
  // 特色优先级
  if (preferences.featurePriority) {
    const prefs = preferences.featurePriority.split(",").map(s => s.trim()).filter(Boolean);
    let matched = 0;
    if (Array.isArray(school.features) && school.features.length) {
      prefs.forEach(p => {
        if (school.features.some(f => f.includes(p))) matched++;
      });
    }
    score += Math.min(30, matched * 10);
  }
  return clamp(score, 0, 100);
}
