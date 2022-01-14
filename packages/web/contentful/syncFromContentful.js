const dotenv = require('dotenv').config();
const contentful = require('contentful');
const del = require('del');
const fs = require('fs');

const CONFIG = {
  space: process.env.CONTENTFUL_SPACE ? process.env.CONTENTFUL_SPACE : dotenv.parsed.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    ? process.env.CONTENTFUL_ACCESS_TOKEN
    : dotenv.parsed.CONTENTFUL_ACCESS_TOKEN,
  previewAccessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : dotenv.parsed.CONTENTFUL_ACCESS_TOKEN,
};

contentfulClient = contentful.createClient({
  host: process.env.NODE_ENV === 'production' ? 'cdn.contentful.com' : 'preview.contentful.com',
  space: CONFIG.space,
  accessToken: process.env.NODE_ENV === 'production' ? CONFIG.accessToken : CONFIG.previewAccessToken,
});

syncContentfulEntries();

async function syncContentfulEntries() {
  await cleanup();
  getContentfulEntries({ locale: '*', limit: 1000, skip: 0 });
  // Max 8MB per contentfulClient.getEntries call, reduce limit if requests get too big.
}

function getContentfulEntries(query) {
  contentfulClient.getEntries(query).then((entries) => {
    entries.items.forEach((item) => {
      fs.writeFileSync(`dist/entries/${item.sys.id}.json`, createFileContentFromEntry(item));
    });
    // If there are more entries left to get from Contentful, recursively call getContentfulEntries
    if (entries.total > query.limit + query.skip) {
      console.log(`Recursive: ${entries.total}, ${query.limit}, ${query.skip}`);
      query.skip = query.skip + query.limit;
      getContentfulEntries(query);
    }
  });
}

function createFileContentFromEntry(entry) {
  return `${JSON.stringify(entry)}`;
}

function cleanup() {
  return del(['dist/entries/**/*.json'], { force: true });
}
