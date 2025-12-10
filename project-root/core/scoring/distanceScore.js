import { clamp } from "../utils.js";

// 简化的区位估算：仅以区作为单位判断距离
export function calcDistanceScore(student, school) {
  const userDistrict = (student.district || "").trim();
  const schoolDistrict = (school.district || "").trim();
  if (!userDistrict || !schoolDistrict) return 40;
  if (userDistrict === schoolDistrict) return 100;
  // 这里可扩展邻区表，目前默认中等
  return 60;
}
