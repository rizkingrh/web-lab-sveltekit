// src/lib/profile-cache.ts

interface UserData {
    nim: string | null;
    email: string | null;
    role: string | null;
}

interface CacheEntry {
    data: UserData;
    timestamp: number;
}

// Shared profile cache instance
const profileCache = new Map<string, CacheEntry>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function getCachedProfile(userId: string): UserData | null {
    const cached = profileCache.get(userId);
    const now = Date.now();

    if (cached && (now - cached.timestamp < CACHE_DURATION)) {
        return cached.data;
    }

    return null;
}

export function setCachedProfile(userId: string, userData: UserData): void {
    profileCache.set(userId, {
        data: userData,
        timestamp: Date.now()
    });
}

export function clearCachedProfile(userId: string): void {
    profileCache.delete(userId);
}

export function clearAllProfiles(): void {
    profileCache.clear();
}

// Clean up expired cache entries
export function cleanupExpiredCache(): void {
    const now = Date.now();
    for (const [key, value] of profileCache.entries()) {
        if (now - value.timestamp > CACHE_DURATION) {
            profileCache.delete(key);
        }
    }
}

// Auto cleanup every 10 minutes
if (typeof setInterval !== 'undefined') {
    setInterval(cleanupExpiredCache, 10 * 60 * 1000);
}

export type { UserData };