export function removeTrailingSlash(url: string) {
    return url.replace(/\/$/, '');
}

export function removeLeadingSlash(url: string) {
    return url.replace(/^\//, '');
}

export function getPublicUrl(url: string) {
    url = removeLeadingSlash(url);
    const prefix = removeTrailingSlash(import.meta.env.VITE_PREFIX);
    return `${prefix}/${url}`;
}