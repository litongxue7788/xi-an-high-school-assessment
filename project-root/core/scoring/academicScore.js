import { clamp, includesIgnoreCase } from "../utils.js";

export function calcAcademicScore(student, school) {
  let score = 50;
  const highlights = (student.highlights || "").toLowerCase();

  // 学术能力关键词
  if (highlights.includes("学科") || highlights.includes("学业") || highlights.includes("成绩")) {
    score += 10;
  }
  if (highlights.includes("数学") && school.features && school.features.some(f => /理科|竞赛|数学/i.test(f))) {
    score += 20;
  }
  if (highlights.includes("竞赛") && school.features && school.features.some(f => /竞赛|竞赛强校/i.test(f))) {
    score += 20;
  }
  if (highlights.includes("科创") && school.features && school.features.some(f => /科创|信息|创客/i.test(f))) {
    score += 15;
  }

  return clamp(score, 0, 100);
}
