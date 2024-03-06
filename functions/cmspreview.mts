import type { Handler } from '@netlify/functions';
import contentful from 'contentful';
import safeJsonStringify from 'safe-json-stringify';

export const handler: Handler = async (event) => {
  const space = process.env.CONTENTFUL_SPACE;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  if (!space || !accessToken) {
    return {
      statusCode: 500,
      body: 'Missing environment variables',
    };
  }

  const { id } = event.queryStringParameters ?? {};
  if (!id) {
    return {
      statusCode: 400,
      body: 'Missing id',
    };
  }

  const client = contentful.createClient({
    host: 'preview.contentful.com',
    space: space,
    accessToken: accessToken,
  });
  const result = await client
    .getEntry(id, { locale: '*', include: 10 })
    .then((entryResult) => {
      return {
        statusCode: 200,
        body: safeJsonStringify(entryResult),
      };
    })
    .catch(console.error);

  if (!result) {
    return {
      statusCode: 404,
      body: 'Not found',
    };
  }

  return result;
};
