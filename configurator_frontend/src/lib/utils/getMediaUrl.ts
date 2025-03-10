import { Media } from "@/payload-types";
import { getAssetUrl } from "./getAssetUrl";

export function getMediaUrl(media: Media, thumb: boolean = false) {
    const thumbUrl = media?.sizes?.admin_thumbnail?.url;
    const fullUrl = media?.url;

    let url = fullUrl;
    if (thumb) {
        url = thumbUrl || fullUrl;
    }
    url = url || '';
    return getAssetUrl(url);
}