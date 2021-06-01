const dotenv = require('dotenv').config();
const contentful = require('contentful');
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

// Syncs all entries from contentful
function syncData() {
    contentfulClient.getEntries({ locale: '*' }).then(entries => entries.items.forEach(item => {
        console.log(item);
        fs.writeFileSync(`dist/entries/${item.sys.id}.json`, createFileContentFromEntry(item));
    }));
}

function createFileContentFromEntry(entry) {
    return `${JSON.stringify(entry)}`;
}
