const dotenv = require('dotenv').config();
const content = require('./content.config');
const contentful = require('contentful');
const packageJson = require('./package.json');
const fs = require('fs');

const CONFIG = {
    space: process.env.CONTENTFUL_SPACE ? process.env.CONTENTFUL_SPACE : dotenv.parsed.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ? process.env.CONTENTFUL_ACCESS_TOKEN : dotenv.parsed.CONTENTFUL_ACCESS_TOKEN
}

contentfulClient = contentful.createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken
});

syncData();

// Syncs data 5 request per second
function syncData() {
    const timer = setInterval((throttledSync), 200);
    function throttledSync() {
        if (content.length === 0) {
            console.log(`SUCCESS: ${packageJson.name} - Finished syncing from contentful`);
            clearInterval(timer);
            return;
        }
        const item = content.pop();
        syncEntry(item, item.contentful.entry_id);
    }
}

function saveEntry(entry, contentfulEntry) {
    //console.log(entry, contentfulEntry);
    fs.writeFileSync(`dist/${entry.path}.js`, createFileContentFromEntry(contentfulEntry));
}

function createFileContentFromEntry(entry) {
    return `
        module.exports = ${JSON.stringify(entry)}
    
    `
}

function syncEntry(entry, entryId) {
    contentfulClient
        .getEntry(entryId)
        .then(contentfulEntry => saveEntry(entry, contentfulEntry))
        .catch(err => console.log(err));
}
/* console.log(CONFIG);
console.log(content);
console.log(dotenv);
 */
