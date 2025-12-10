// 简单 AI 服务（前端调用后端 /api/ai）
export async function runAIRecommendation(student, preferences, schools) {
  try {
    const payload = {
      intent: "school_analysis",
      provider: "bailian", // or openai, depends on server端配置
      payload: { userProfile: { student, preferences } },
      // 不要在前端放置长期 key；若需要临时 key，前端可输入一次性 key（谨慎）
    };
    const resp = await fetch('/api/ai', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
    if (!resp.ok) {
      const text = await resp.text();
      return { error: 'AI service error: ' + resp.status + ' ' + text };
    }
    const json = await resp.json();
    // 期望返回结构化结果（后端需保证）
    if (json.top_recommendations) {
      return json.top_recommendations.map(r => ({
        id: r.id || r.name,
        schoolName: r.name,
        school: r,
        scores: r.scores || {},
        matchScore: r.matchScore || r.score || 0,
        warnings: r.warnings || []
      }));
    }
    // fallback: return text
    return [{ id: 'ai-raw', schoolName: 'AI 结果（未解析）', school: {}, scores:{}, matchScore: 0, raw: json }];
  } catch (e) {
    return { error: String(e) };
  }
}
