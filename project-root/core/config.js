// 配置：权重、阈值、关键字
export const SCORE_WEIGHTS = {
  distance: 0.25,
  academic: 0.30,
  preference: 0.20,
  cost: 0.15,
  reputation: 0.10
};

export const MAX_RECOMMENDATIONS = 10;
export const DEFAULT_BUDGET_UNIT = "CNY"; // 保留字段
