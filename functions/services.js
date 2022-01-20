const contentful = require('contentful')

function installDeps(functionDir, cb) {
	cp.exec("npm i", {cwd: functionDir}, cb)
}

exports.handler = async (event, context) => {

	console.log(event)

	console.log("request received")

	const client = contentful.createClient({
		space: process.env.CONTENTFUL_SPACE,
		accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
		host: 'preview.contentful.com'
	})

	client.getEntry(event.queryStringParameters.id)
	.then((entry) => {return {statusCode: 200, body: 'Hello Magnus'}})
	.catch(console.error)

};