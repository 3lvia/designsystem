const contentful = require('contentful');
const safeJsonStringify = require('safe-json-stringify');

exports.handler = async (event) => {
  const client = contentful.createClient({
    host: 'preview.contentful.com',
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  });
  return await client
    .getEntry(event.queryStringParameters.id, { locale: '*', include: 10 })
    .then((entryResult) => {
      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
        body: safeJsonStringify(entryResult),
      };
    })
    .catch(console.error);
};
