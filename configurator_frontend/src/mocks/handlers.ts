import { fromTraffic } from '@mswjs/source/traffic'
import type Har from 'har-format';

import traffic from './traffic.json'

const TRAFFIC_FILE_API_HOST = 'localhost:3000'

// Serves recorded traffic from traffic.json
// But modifies url so it works for github pages
const harHandler = fromTraffic(
    traffic as Har.Har,
    (entry) => {
        const url = new URL(entry.request.url)
        if (url.host !== TRAFFIC_FILE_API_HOST) {
            return
        }
        
        // Current api base url
        const apiBase = new URL(import.meta.env.VITE_API_BASE)

        // update host
        url.host = apiBase.host

        // update pathname
        url.pathname = url.pathname.replace(/^\/api/, apiBase.pathname)

        // update port
        if (apiBase.port) {
            url.port = apiBase.port
        }
        
        // update request url
        entry.request.url = url.href

        return entry;
    }
);

export const handlers = [
    ...harHandler
]