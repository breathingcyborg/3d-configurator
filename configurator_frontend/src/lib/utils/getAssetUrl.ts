import { removeTrailingSlash, removeLeadingSlash } from "./urlUtils";

export function getAssetUrl(url: string) {
    const assetsBaseUrl = removeTrailingSlash(import.meta.env.VITE_ASSET_BASE as unknown as string || '');

    /**
     * when env.VITE_MOCK_API is true, we use serve files from public/mock-uploads
     * 
     */
    if (import.meta.env.VITE_MOCK_API === 'true') {
        const urlWithoutCollectionName = url.replace(/^\/uploads\//, '');
        url = `mock-uploads/${urlWithoutCollectionName}`;
    }

    url = removeLeadingSlash(url);
    return `${assetsBaseUrl}/${url}`;
}