const contentful = require('contentful')

function installDeps(functionDir, cb) {
	cp.exec("npm i", {cwd: functionDir}, cb)
}

exports.handler = async (event, context) => {
	const client = contentful.createClient({
		host: 'preview.contentful.com',
		space: process.env.CONTENTFUL_SPACE,
		accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
		resolveLinks: false
	})
	const entry = await client.getEntry(event.queryStringParameters.id, { locale: '*', include: 10 })
		.then((entry) => {
				return {
					statusCode: 200, 
					headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true}, 
					body: JSON.stringify(entry)
				};
			})
		.catch(console.error)
	return entry;
};