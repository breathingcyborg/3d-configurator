export function getAssetUrl(url: string) {
    /**
     * when env.VITE_MOCK_API is true, we use serve files from public/mock-uploads
     * 
     */
    if (import.meta.env.VITE_MOCK_API === 'true') {
        const urlWithoutCollectionName = url.replace(/^\/uploads\//, '');
        const mockUrl = `/mock-uploads/${urlWithoutCollectionName}`;
        const baseUrl = import.meta.env.BASE_URL;
        if (!baseUrl || baseUrl === '/') {
            return mockUrl;
        }   
        const assetUrl = new URL(mockUrl, baseUrl);
        return assetUrl.toString();
    }

    const assetUrl = new URL(url, import.meta.env.VITE_ASSET_BASE);
    return assetUrl.toString();
}