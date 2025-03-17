import { fromTraffic } from '@mswjs/source/traffic'
import type Har from 'har-format';

import traffic from './traffic.json'

const TRAFFIC_FILE_API_HOST = 'localhost:3000'

const harHandler = fromTraffic(
    traffic as Har.Har,
    (entry) => {
        const url = new URL(entry.request.url)
        if (url.host !== TRAFFIC_FILE_API_HOST) {
            return
        }

        url.host = new URL(import.meta.env.VITE_API_BASE).host
        entry.request.url = url.href

        return entry;
    }
);

export const handlers = [
    ...harHandler
]