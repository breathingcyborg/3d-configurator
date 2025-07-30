import { fromTraffic } from '@mswjs/source/traffic'
import type Har from 'har-format';

import traffic from './traffic.json'

// api base url in traffic file
const TRAFFIC_FILE_API_BASE = 'http://localhost:3000/api'

// Serves recorded traffic from traffic.json
// But modifies url so it works for github pages
const harHandler = fromTraffic(
    traffic as Har.Har,
    (entry) => {
        const requestUrl = entry.request.url;

        // Ignore other urls
        if (!requestUrl.startsWith(TRAFFIC_FILE_API_BASE)) {
            return
        }

        // change base url from traffic file to current base url
        entry.request.url = replaceBaseUrl(requestUrl);

        // return updated entry
        return entry;
    }
);

/** replaces base url of recorded traffic to current api base url */
function replaceBaseUrl(requestUrl: string) {
    return requestUrl.replace(
        TRAFFIC_FILE_API_BASE, 
        import.meta.env.VITE_API_BASE    
    );
}

export const handlers = [
    ...harHandler
]