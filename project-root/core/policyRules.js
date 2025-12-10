// 政策规则：根据户籍/随迁/学区等提供加分或风险提示
export function applyPolicyAdjustments(student, school) {
  let bonus = 0;
  try {
    const hukou = (student.hukouType || "").toLowerCase();
    const adm = school.admission || {};
    if (hukou.includes("户籍") && adm.method && adm.method.includes("学区")) {
      if (Array.isArray(adm.street_scope) && student.street && adm.street_scope.includes(student.street)) {
        bonus += 5; // 学区对口加分
      }
    }
  } catch (e) {
    console.warn("[policyRules] applyPolicyAdjustments err", e);
  }
  return bonus;
}

export function getPolicyWarnings(student, school) {
  const warnings = [];
  const hukou = (student.hukouType || "").toLowerCase();
  const adm = school.admission || {};
  if (adm.method && adm.method.includes("摇号")) {
    warnings.push("民办/部分学校可能采用摇号或面试，存在中签风险");
  }
  if (hukou.includes("随迁") && adm.method && adm.method.includes("学区")) {
    warnings.push("随迁生需按当地政策提交证明材料，存在审核风险");
  }
  return warnings;
}
