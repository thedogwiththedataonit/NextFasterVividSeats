/**
 * Cache configuration constants
 * Safe to import in both server and client components
 */
export const CACHE_CONFIG = {
    TOP_PICKS_DURATION: 600, // 10 minutes
    PRODUCTIONS_DURATION: 300, // 5 minutes  
    PERFORMER_ASSETS_DURATION: 1800, // 30 minutes
} as const;

/**
 * Cache tags used throughout the application
 */
export const CACHE_TAGS = {
    TOP_PICKS: 'top-picks',
} as const; 