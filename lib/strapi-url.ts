/**
 * Centralized Strapi URL provider
 * Handles different environments and provides fallbacks
 */

function getStrapiBaseUrl(): string {
    // First, try the environment variable
    if (process.env.NEXT_PUBLIC_STRAPI_API_URL) {
        return process.env.NEXT_PUBLIC_STRAPI_API_URL;
    }

    // Fallback based on environment
    if (process.env.NODE_ENV === 'production') {
        // In production, you should set your production Strapi URL
        // This is a fallback - you should always set the env variable in production
        throw new Error(
            'NEXT_PUBLIC_STRAPI_API_URL must be set in production environment'
        );
    }

    // Development fallback
    return 'http://localhost:1337';
}

/**
 * Get the base URL for Strapi API calls
 */
export function getStrapiUrl(): string {
    return getStrapiBaseUrl();
}

/**
 * Get full URL for a Strapi image
 */
export function getImageUrl(image: { url: string }): string {
    const baseUrl = getStrapiBaseUrl();

    // If the URL is already absolute, return as is
    if (image.url.startsWith('http://') || image.url.startsWith('https://')) {
        return image.url;
    }

    // Otherwise, prepend the base URL
    return `${baseUrl}${image.url}`;
}

/**
 * Build a full API endpoint URL
 */
export function buildApiUrl(endpoint: string): string {
    const baseUrl = getStrapiBaseUrl();
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${baseUrl}/api${cleanEndpoint}`;
}
