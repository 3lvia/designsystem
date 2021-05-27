const dotenv = require('dotenv').config();
const content = require('./content.config');
const contentful = require('contentful');
const packageJson = require('./package.json');

if (!dotenv.parsed.CONTENTFUL_SPACE || !dotenv.parsed.CONTENTFUL_ACCESS_TOKEN) {
    console.error(`ERROR: ${packageJson.name} - Missing ENV variable`);
    return;
}

const CONFIG = {
    space: dotenv.parsed.CONTENTFUL_SPACE,
    accessToken: dotenv.parsed.CONTENTFUL_ACCESS_TOKEN
}




contentfulClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken
});


console.log(content);
console.log(dotenv);


function getDataFromContentful() {

}
// TODO: Request data from contentful
