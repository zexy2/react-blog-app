/**
 * AI Assistant Configuration
 * Yapay zeka asistanı için sabitler ve konfigürasyon
 */

export const AI_CONFIG = {
  // Feature flags
  FEATURES: {
    GHOST_COMPLETION: true,
    GRAMMAR_CHECK: false, // Phase 2
    SLASH_COMMANDS: false, // Phase 2
    SENTENCE_VARIATIONS: false, // Phase 2
  },

  // Timing (ms)
  DEBOUNCE: {
    COMPLETION: 800, // ms before requesting completion
    GRAMMAR: 2000, // ms before grammar check
    ADAPTIVE_MIN: 500, // minimum debounce (when user accepts often)
    ADAPTIVE_MAX: 2000, // maximum debounce (when user rejects often)
  },

  // Limits
  LIMITS: {
    MAX_COMPLETION_TOKENS: 50, // tokens for completion
    MAX_CONTEXT_CHARS: 500, // characters sent to API as context
    MAX_COMPLETION_WORDS: 20, // words in a single completion
    MIN_TRIGGER_CHARS: 20, // minimum chars before triggering completion
  },

  // UI Configuration
  UI: {
    GHOST_TEXT_OPACITY: 0.4,
    SUGGESTION_FADE_IN: 200, // ms
    COOLDOWN_AFTER_DISMISS: 2000, // ms before showing new suggestion
  },

  // API Configuration
  API: {
    PROVIDER: 'openai', // 'openai' | 'anthropic' | 'local'
    MODEL: 'gpt-4o-mini',
    TEMPERATURE: 0.7,
    TIMEOUT: 5000,
    MAX_RETRIES: 2,
  },

  // Storage keys
  STORAGE_KEYS: {
    AI_PREFERENCES: 'postify_ai_prefs',
    AI_ANALYTICS: 'postify_ai_analytics',
    AI_ENABLED: 'postify_ai_enabled',
  },
};

/**
 * AI Blocklist - Words and phrases to NEVER generate
 * Bu kelimeler "AI tarafından yazıldı" hissi verir
 */
export const AI_BLOCKLIST = [
  // Typical AI-isms
  'certainly',
  'absolutely',
  'definitely',
  'obviously',
  'clearly',
  "I'd be happy to",
  "I'm happy to",
  'As an AI',
  'as a language model',

  // Overused transitions
  "It's worth noting",
  "It's important to note",
  'In conclusion',
  'To summarize',
  'At the end of the day',
  'needless to say',
  'First and foremost',
  'Last but not least',
  'Having said that',

  // Corporate jargon
  'game-changer',
  'cutting-edge',
  'leverage',
  'synergy',
  'paradigm shift',
  'best practices',
  'value-add',
  'actionable insights',
  'move the needle',
  'circle back',
  'low-hanging fruit',

  // Filler phrases
  'In today\'s world',
  'In this day and age',
  'When it comes to',
  'At its core',
  'The fact of the matter is',
  'It goes without saying',
];

/**
 * Tone detection keywords
 * Kullanıcının yazım tonunu algılamak için
 */
export const TONE_INDICATORS = {
  formal: [
    'therefore',
    'consequently',
    'furthermore',
    'moreover',
    'thus',
    'hence',
    'regarding',
    'concerning',
  ],
  casual: [
    'hey',
    'cool',
    'awesome',
    'yeah',
    'gonna',
    'wanna',
    'kinda',
    'pretty much',
    'btw',
  ],
  technical: [
    'function',
    'implementation',
    'algorithm',
    'parameter',
    'interface',
    'component',
    'API',
    'database',
  ],
  creative: [
    'imagine',
    'picture',
    'dream',
    'wonder',
    'magical',
    'journey',
    'adventure',
    'story',
  ],
};

/**
 * Supported languages for AI
 */
export const AI_LANGUAGES = {
  en: 'English',
  tr: 'Türkçe',
};
