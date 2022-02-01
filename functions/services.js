const contentful = require('contentful')
const safeJsonStringify = require('safe-json-stringify');

exports.handler = async (event, context) => {
	const client = contentful.createClient({
		host: 'preview.contentful.com',
		space: process.env.CONTENTFUL_SPACE,
		accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
	})
	const entry = await client.getEntry(event.queryStringParameters.id, { locale: '*', include: 10 })
		.then((entry) => {
				return {
					statusCode: 200, 
					headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true}, 
					body: safeJsonStringify(entry)
				};
			})
		.catch(console.error)
	return entry;
};