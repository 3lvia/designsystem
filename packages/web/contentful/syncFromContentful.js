const dotenv = require('dotenv').config();
const contentful = require('contentful');
const del = require('del');
const fs = require('fs');

const CONFIG = {
  space: process.env.CONTENTFUL_SPACE ? process.env.CONTENTFUL_SPACE : dotenv.parsed.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    ? process.env.CONTENTFUL_ACCESS_TOKEN
    : dotenv.parsed.CONTENTFUL_ACCESS_TOKEN,
  previewAccessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
};

contentfulClient = contentful.createClient({
  host: process.env.NODE_ENV === 'production' ? 'cdn.contentful.com' : 'preview.contentful.com',
  space: CONFIG.space,
  accessToken: process.env.NODE_ENV === 'production' ? CONFIG.accessToken : CONFIG.previewAccessToken,
});

syncContentfulData();

// Syncs all entries from contentful
async function syncContentfulData() {
  await cleanup();
  contentfulClient.getEntries({ locale: '*', limit: 1000 }).then((entries) => {
    entries.items.forEach((item) => {
      fs.writeFileSync(`dist/entries/${item.sys.id}.json`, createFileContentFromEntry(item));
    });
  });
}
module.exports = { syncContentfulData };

function createFileContentFromEntry(entry) {
  return `${JSON.stringify(entry)}`;
}

function cleanup() {
  return del(['dist/entries/**/*.json'], { force: true });
}
