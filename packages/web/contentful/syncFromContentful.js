// const dotenv = require('dotenv').config();
const dotenv = require('dotenv').config({ path: '../.env' });
const contentful = require('contentful');
const del = require('del');
const fs = require('fs');

const CONFIG = {
  space: process.env.CONTENTFUL_SPACE ? process.env.CONTENTFUL_SPACE : dotenv.parsed.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ? process.env.CONTENTFUL_ACCESS_TOKEN : dotenv.parsed.CONTENTFUL_ACCESS_TOKEN,
  previewAccessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
}

function createOptions(preview) {
  const options = {
    host: 'preview.contentful.com',
    space: CONFIG.space,
    accessToken: CONFIG.previewAccessToken
  }
  if(process.env.NODE_ENV === 'production' && !preview) {
    options.host = 'cdn.contentful.com',
    options.accessToken = CONFIG.accessToken
  }
  return options;
};

syncContentfulData(false);

// Syncs all entries from contentful
async function syncContentfulData(preview) {
  const options = createOptions(preview);
  const contentfulClient = contentful.createClient(options);

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
