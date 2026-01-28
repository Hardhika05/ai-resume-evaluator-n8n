/**
 * parse_ai_output.js
 * -------------------
 * Parses streamed / noisy LLM output and extracts structured ATS data
 */

function parseAIOutput(rawText) {
  if (!rawText) {
    throw new Error("Empty AI response");
  }

  // Extract score (1–100)
  const scoreMatch = rawText.match(/\b(\d{1,3})\b/);
  const score = scoreMatch ? Number(scoreMatch[1]) : null;

  // Detect shortlist decision
  const shortlist =
    rawText.toLowerCase().includes("true") ||
    rawText.toLowerCase().includes("shortlist");

  // Extract reason text
  let reason = null;
  const reasonIndex = rawText.toLowerCase().indexOf("reason");
  if (reasonIndex !== -1) {
    reason = rawText.slice(reasonIndex).replace(/["{}\n]/g, "").trim();
  }

  return {
    score,
    shortlist,
    reason,
  };
}

// Export for reuse
module.exports = {
  parseAIOutput,
};
