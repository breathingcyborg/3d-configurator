import { fromTraffic } from '@mswjs/source/traffic'
import type Har from 'har-format';

import traffic from './traffic.json'

const TRAFFIC_FILE_API_HOST = 'localhost:3000'

const harHandler = fromTraffic(
    traffic as Har.Har,
    (entry) => {
        console.debug("harHandler");
        const url = new URL(entry.request.url)

        if (url.host !== TRAFFIC_FILE_API_HOST) {
            // console.debug(url);
            return
        }

                
        console.debug(url.host);
        console.debug(entry.response.content.text);
        console.debug(entry.response.status);
        console.debug(entry.response.statusText);
        console.debug("here")
        
        const response = new Response(entry.response.content.text, {
            status: entry.response.status,
            statusText: entry.response.statusText,
            headers: {
                'Content-Type': 'application/json',
            },
        })    
        console.debug("there")

        console.debug("resp", response)
        
        // // console.debug(entry.request.url)
        // if (url.host === TRAFFIC_FILE_API_HOST) {
        //     url.host = import.meta.env.VITE_API_BASE
        //     // entry.request.url = url.href
        //     // console.debug(entry);
        // }
        // console.debug(entry);
        return entry;
    }
);

console.debug(harHandler)

export const handlers = [
    ...harHandler
]