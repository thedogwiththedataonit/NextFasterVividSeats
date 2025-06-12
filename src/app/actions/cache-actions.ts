'use server';

import { revalidateTag } from 'next/cache';
import { CACHE_TAGS } from '@/utils/cache-management';

/**
 * Server action to manually invalidate the TopPicks cache
 * Call this function when you need to force refresh the cache
 * (e.g., when new events are added or data needs immediate update)
 * 
 * Usage in server components or API routes:
 * import { invalidateTopPicksCache } from '@/app/actions/cache-actions';
 * await invalidateTopPicksCache();
 */
export async function invalidateTopPicksCache() {
    try {
        revalidateTag(CACHE_TAGS.TOP_PICKS);
        return { success: true, message: 'TopPicks cache invalidated successfully' };
    } catch (error) {
        console.error('Failed to invalidate TopPicks cache:', error);
        return { success: false, message: 'Failed to invalidate cache' };
    }
} 