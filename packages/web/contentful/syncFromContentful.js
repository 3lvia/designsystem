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

console.log('ENVIRONMENT: ', process.env.NODE_ENV)
contentfulClient = contentful.createClient({
  host: process.env.NODE_ENV === 'production' ? 'cdn.contentful.com' : 'preview.contentful.com',
  space: CONFIG.space,
  accessToken: process.env.NODE_ENV === 'production' ? CONFIG.accessToken : CONFIG.previewAccessToken,
});

syncContentfulEntries();

async function syncContentfulEntries() {
  await cleanup();
  getContentfulEntries({ locale: '*', limit: 1000, skip: 0, include: 10 });
  // Max 8MB per contentfulClient.getEntries call, reduce limit if requests get too big.
  // https://stackoverflow.com/questions/57532345/react-application-requiring-access-to-3000-entries-from-contentful-api
  // https://www.contentfulcommunity.com/t/contentful-api-how-to-get-all-entries-from-a-contenttype/2847/2
}

function getContentfulEntries(query) {
  contentfulClient.getEntries(query).then((entries) => {
    entries.items.forEach((item) => {
      fs.writeFileSync(`dist/entries/${item.sys.id}.json`, createFileContentFromEntry(item));
    });
    // If there are more entries left to get from Contentful, recursively call getContentfulEntries
    if (entries.total > query.limit + query.skip) {
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
