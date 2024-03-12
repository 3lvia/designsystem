import contentful from 'contentful';
import dotenv from 'dotenv';
import { mkdir, rm, writeFile } from 'fs/promises';
import safeJsonStringify from 'safe-json-stringify';

dotenv.config();

const CONFIG = {
  space: process.env.CONTENTFUL_SPACE ? process.env.CONTENTFUL_SPACE : dotenv.parsed.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    ? process.env.CONTENTFUL_ACCESS_TOKEN
    : dotenv.parsed.CONTENTFUL_ACCESS_TOKEN,
  previewAccessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : dotenv.parsed.CONTENTFUL_ACCESS_TOKEN,
};

const contentfulClient = contentful.createClient({
  host: process.env.NODE_ENV === 'production' ? 'cdn.contentful.com' : 'preview.contentful.com',
  space: CONFIG.space,
  accessToken: process.env.NODE_ENV === 'production' ? CONFIG.accessToken : CONFIG.previewAccessToken,
});

syncContentfulEntries();

async function syncContentfulEntries() {
  await cleanup();
  await createDistFolder();
  await getContentfulEntries({ locale: '*', limit: 1000, skip: 0, include: 10 });
  console.log('Successfully synced contentful entries');
  // Max 8MB per contentfulClient.getEntries call, reduce limit if requests get too big.
  // https://stackoverflow.com/questions/57532345/react-application-requiring-access-to-3000-entries-from-contentful-api
  // https://www.contentfulcommunity.com/t/contentful-api-how-to-get-all-entries-from-a-contenttype/2847/2
}

async function getContentfulEntries(query) {
  return contentfulClient
    .getEntries(query)
    .then(async (entries) => {
      await Promise.all(
        entries.items.map(async (item) => {
          writeFile(`dist/entries/${item.sys.id}.json`, createFileContentFromEntry(item));
        }),
      );
      // If there are more entries left to get from Contentful, recursively call getContentfulEntries
      if (entries.total > query.limit + query.skip) {
        query.skip = query.skip + query.limit;
        getContentfulEntries(query);
      }
      return Promise.resolve();
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
}

function createFileContentFromEntry(entry) {
  return `${safeJsonStringify(entry)}`;
}

function cleanup() {
  return rm('dist/entries', { force: true, recursive: true });
}

async function createDistFolder() {
  await mkdir('dist/entries', { recursive: true });
}
