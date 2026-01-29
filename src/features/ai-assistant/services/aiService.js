/**
 * AI Service - API abstraction layer
 * OpenAI ve diğer sağlayıcılar için birleşik arayüz
 */

import { AI_CONFIG, AI_BLOCKLIST } from '../../../constants/ai';
import {
  buildCompletionPrompt,
  buildGrammarPrompt,
  buildVariationsPrompt,
  buildContinuePrompt,
  detectTone,
  getAverageSentenceLength,
} from './promptBuilder';

/**
 * Filter out AI-sounding words from response
 * @param {string} text - AI response to filter
 * @returns {string} - Filtered text
 */
const filterBlocklistedWords = (text) => {
  if (!text) return text;

  let filtered = text;
  AI_BLOCKLIST.forEach((phrase) => {
    const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
    filtered = filtered.replace(regex, '');
  });

  // Clean up double spaces
  filtered = filtered.replace(/\s+/g, ' ').trim();

  return filtered;
};

/**
 * Get API key from environment or localStorage
 * @returns {string|null}
 */
const getApiKey = () => {
  // First check environment variable
  if (import.meta.env.VITE_OPENAI_API_KEY) {
    return import.meta.env.VITE_OPENAI_API_KEY;
  }

  // Then check localStorage (user can set their own key)
  const stored = localStorage.getItem('postify_openai_key');
  return stored || null;
};

/**
 * Check if AI service is available
 * @returns {boolean}
 */
export const isAIAvailable = () => {
  return !!getApiKey();
};

/**
 * OpenAI API call
 * @param {Object} params
 * @returns {Promise<string>}
 */
const callOpenAI = async ({ system, user, maxTokens = 50, temperature = 0.7 }) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AI_CONFIG.API.TIMEOUT);

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: AI_CONFIG.API.MODEL,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
        max_tokens: maxTokens,
        temperature,
        n: 1,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim();

    if (!content) {
      throw new Error('Empty response from API');
    }

    return filterBlocklistedWords(content);
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};

/**
 * Get ghost text completion
 * @param {Object} options
 * @param {string} options.text - Full editor text
 * @param {number} options.cursorPosition - Cursor position in text
 * @param {string} options.language - 'en' or 'tr'
 * @param {AbortSignal} options.signal - Abort signal for cancellation
 * @returns {Promise<{completion: string, confidence: number}>}
 */
export const getCompletion = async ({ text, cursorPosition, language = 'en', signal }) => {
  if (!isAIAvailable()) {
    return { completion: '', confidence: 0 };
  }

  // Get context around cursor
  const contextStart = Math.max(0, cursorPosition - AI_CONFIG.LIMITS.MAX_CONTEXT_CHARS);
  const context = text.slice(contextStart, cursorPosition);

  // Get the last 50 chars for immediate context
  const cursorContext = context.slice(-50);

  // Detect tone and style
  const tone = detectTone(text);
  const avgSentenceLength = getAverageSentenceLength(text);

  // Build prompt
  const { system, user } = buildCompletionPrompt({
    context,
    cursorContext,
    tone,
    avgSentenceLength,
    language,
  });

  try {
    // Check if request was cancelled
    if (signal?.aborted) {
      return { completion: '', confidence: 0 };
    }

    const completion = await callOpenAI({
      system,
      user,
      maxTokens: AI_CONFIG.LIMITS.MAX_COMPLETION_TOKENS,
      temperature: AI_CONFIG.API.TEMPERATURE,
    });

    // Don't return if completion is too short or just punctuation
    if (!completion || completion.length < 2 || /^[.,!?;:]+$/.test(completion)) {
      return { completion: '', confidence: 0 };
    }

    // Calculate confidence based on response length and context match
    const confidence = Math.min(1, completion.length / 50);

    return { completion, confidence };
  } catch (error) {
    console.warn('AI completion failed:', error.message);
    return { completion: '', confidence: 0 };
  }
};

/**
 * Check grammar in text
 * @param {string} text - Text to check
 * @param {string} language - 'en' or 'tr'
 * @returns {Promise<Array>} - Array of grammar issues
 */
export const checkGrammar = async (text, language = 'en') => {
  if (!isAIAvailable() || !text || text.length < 20) {
    return [];
  }

  const { system, user } = buildGrammarPrompt(text, language);

  try {
    const response = await callOpenAI({
      system,
      user,
      maxTokens: 200,
      temperature: 0.3, // Lower temperature for consistency
    });

    const parsed = JSON.parse(response);
    return parsed.issues || [];
  } catch (error) {
    console.warn('Grammar check failed:', error.message);
    return [];
  }
};

/**
 * Get sentence variations
 * @param {string} sentence - Sentence to rephrase
 * @param {string} context - Surrounding context for tone detection
 * @param {string} language - 'en' or 'tr'
 * @returns {Promise<string[]>} - Array of variations
 */
export const getVariations = async (sentence, context = '', language = 'en') => {
  if (!isAIAvailable() || !sentence) {
    return [];
  }

  const tone = detectTone(context || sentence);
  const { system, user } = buildVariationsPrompt(sentence, tone, language);

  try {
    const response = await callOpenAI({
      system,
      user,
      maxTokens: 200,
      temperature: 0.8, // Higher temperature for variety
    });

    const variations = response
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && line !== sentence);

    return variations.slice(0, 3);
  } catch (error) {
    console.warn('Variations failed:', error.message);
    return [];
  }
};

/**
 * Continue writing from current point
 * @param {string} text - Current document text
 * @param {string} language - 'en' or 'tr'
 * @returns {Promise<string>} - Next paragraph
 */
export const continueWriting = async (text, language = 'en') => {
  if (!isAIAvailable() || !text) {
    return '';
  }

  const tone = detectTone(text);
  const { system, user } = buildContinuePrompt(text, tone, language);

  try {
    const response = await callOpenAI({
      system,
      user,
      maxTokens: 150,
      temperature: 0.7,
    });

    return filterBlocklistedWords(response);
  } catch (error) {
    console.warn('Continue writing failed:', error.message);
    return '';
  }
};

/**
 * Set custom API key
 * @param {string} key - OpenAI API key
 */
export const setApiKey = (key) => {
  if (key) {
    localStorage.setItem('postify_openai_key', key);
  } else {
    localStorage.removeItem('postify_openai_key');
  }
};

/**
 * Clear stored API key
 */
export const clearApiKey = () => {
  localStorage.removeItem('postify_openai_key');
};

export default {
  isAIAvailable,
  getCompletion,
  checkGrammar,
  getVariations,
  continueWriting,
  setApiKey,
  clearApiKey,
};
