/**
 * Run this script to filter request entries in har file.
 * To save server cost this is deployed with mock responses.
 */
const har = require('./traffic.json');

console.log("Filtering traffic entries from HAR file");

let entries = har.log.entries.filter(entry => {
    const url = new URL(entry.request.url);
    return url.host === "localhost:3000";
}).filter(entry => entry.response?.content?.mimeType === "application/json")
.map(e => {
    e._initiator = null;
    return e
});

har.log.entries = entries;

const fs = require('fs');
fs.writeFileSync('filtered-traffic.json', JSON.stringify(har, null, 0));

console.log("Filtered HAR file written to filtered-traffic.json");