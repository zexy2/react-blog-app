/**
 * Prompt Builder for AI Assistant
 * Doğal ve insan gibi çıktılar üreten prompt'lar
 */

import { AI_BLOCKLIST, TONE_INDICATORS } from '../../../constants/ai';

/**
 * Detect the writing tone from text
 * @param {string} text - User's text to analyze
 * @returns {string} - Detected tone: 'formal' | 'casual' | 'technical' | 'creative' | 'neutral'
 */
export const detectTone = (text) => {
  if (!text || text.length < 50) return 'neutral';

  const lowerText = text.toLowerCase();
  const scores = {};

  Object.entries(TONE_INDICATORS).forEach(([tone, keywords]) => {
    scores[tone] = keywords.reduce((count, keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = lowerText.match(regex);
      return count + (matches ? matches.length : 0);
    }, 0);
  });

  const maxTone = Object.entries(scores).reduce(
    (max, [tone, score]) => (score > max.score ? { tone, score } : max),
    { tone: 'neutral', score: 0 }
  );

  return maxTone.score >= 2 ? maxTone.tone : 'neutral';
};

/**
 * Get average sentence length from text
 * @param {string} text 
 * @returns {number}
 */
export const getAverageSentenceLength = (text) => {
  if (!text) return 15;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length === 0) return 15;
  const totalWords = sentences.reduce(
    (count, s) => count + s.trim().split(/\s+/).length,
    0
  );
  return Math.round(totalWords / sentences.length);
};

/**
 * Build the blocklist instruction for prompts
 * @returns {string}
 */
const buildBlocklistInstruction = () => {
  const sampleBlocklist = AI_BLOCKLIST.slice(0, 15).map((w) => `"${w}"`).join(', ');
  return `NEVER use these words/phrases: ${sampleBlocklist}, or similar AI-sounding language.`;
};

/**
 * Build completion prompt for ghost text
 * @param {Object} options
 * @param {string} options.context - Recent text (last 500 chars)
 * @param {string} options.cursorContext - Text immediately before cursor
 * @param {string} options.tone - Detected tone
 * @param {number} options.avgSentenceLength - Average sentence length
 * @param {string} options.language - 'en' or 'tr'
 * @returns {Object} - { system, user } prompts
 */
export const buildCompletionPrompt = ({
  context,
  cursorContext,
  tone = 'neutral',
  avgSentenceLength = 15,
  language = 'en',
}) => {
  const toneInstructions = {
    formal: 'Use professional, academic language. Avoid contractions.',
    casual: 'Be conversational and friendly. Contractions are okay.',
    technical: 'Use precise technical terminology appropriate to the context.',
    creative: 'Be expressive and engaging. Use vivid language.',
    neutral: 'Match the existing style naturally.',
  };

  const languageInstructions = {
    en: 'Write in English.',
    tr: 'Türkçe yaz. Doğal ve akıcı Türkçe kullan.',
  };

  const system = `You are a subtle writing assistant that completes sentences naturally.
Your completions should feel like they came from the same author.

CRITICAL RULES:
1. ${buildBlocklistInstruction()}
2. Keep completions under ${Math.min(avgSentenceLength, 20)} words
3. ${toneInstructions[tone] || toneInstructions.neutral}
4. ${languageInstructions[language] || languageInstructions.en}
5. Only complete the current thought - don't start new paragraphs
6. Match the punctuation style already used
7. If context is unclear, give a neutral continuation
8. Never start with "I think", "Perhaps", "Maybe" unless the user does
9. Sound human, not like a template

OUTPUT FORMAT:
- Return ONLY the continuation text
- No quotes, no explanations
- Just the words that come next`;

  const user = `Continue this text naturally (max ${Math.min(avgSentenceLength, 20)} words):

"""
${context}
"""

The cursor is right after: "${cursorContext}"

Completion:`;

  return { system, user };
};

/**
 * Build grammar check prompt
 * @param {string} text - Text to check
 * @param {string} language - 'en' or 'tr'
 * @returns {Object} - { system, user } prompts
 */
export const buildGrammarPrompt = (text, language = 'en') => {
  const system = `You are a gentle grammar assistant. Only flag clear errors, not style preferences.
Be conservative - when in doubt, don't flag.

Respond in JSON format:
{
  "issues": [
    {
      "original": "exact text with issue",
      "suggestion": "corrected text",
      "type": "grammar|spelling|punctuation",
      "explanation": "brief, friendly explanation (max 10 words)"
    }
  ]
}

If no issues found, return: { "issues": [] }
Only output valid JSON, nothing else.`;

  const user = `Check this ${language === 'tr' ? 'Turkish' : 'English'} text for grammar issues:

"""
${text}
"""`;

  return { system, user };
};

/**
 * Build sentence variation prompt
 * @param {string} sentence - Sentence to rephrase
 * @param {string} tone - Current tone
 * @param {string} language - 'en' or 'tr'
 * @returns {Object} - { system, user } prompts
 */
export const buildVariationsPrompt = (sentence, tone = 'neutral', language = 'en') => {
  const system = `Generate 3 alternative phrasings for the given sentence.
Each variation should:
- Keep the same meaning
- Vary sentence structure and word choice
- Match the tone: ${tone}
- Be similar length (±20%)
- Sound natural, not templated

${buildBlocklistInstruction()}

Respond with exactly 3 alternatives, one per line.
No numbering, no quotes, no explanations.`;

  const user = `Rephrase this ${language === 'tr' ? 'Turkish' : 'English'} sentence 3 different ways:

"${sentence}"`;

  return { system, user };
};

/**
 * Build continue writing prompt
 * @param {string} context - Full document context
 * @param {string} tone - Detected tone
 * @param {string} language - 'en' or 'tr'
 * @returns {Object} - { system, user } prompts
 */
export const buildContinuePrompt = (context, tone = 'neutral', language = 'en') => {
  const system = `You are a thoughtful writing partner who helps continue drafts.
Write the next paragraph that naturally follows the given text.

RULES:
1. Match the author's voice and style exactly
2. Continue the logical flow of ideas
3. Keep the same tone: ${tone}
4. Write 2-4 sentences (one paragraph)
5. ${buildBlocklistInstruction()}
6. Don't summarize what was said - move the narrative forward
7. End at a natural stopping point

${language === 'tr' ? 'Türkçe yaz.' : 'Write in English.'}`;

  const user = `Continue this text with the next paragraph:

"""
${context}
"""

Next paragraph:`;

  return { system, user };
};

export default {
  buildCompletionPrompt,
  buildGrammarPrompt,
  buildVariationsPrompt,
  buildContinuePrompt,
  detectTone,
  getAverageSentenceLength,
};
