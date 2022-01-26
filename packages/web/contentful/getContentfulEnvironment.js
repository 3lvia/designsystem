/**
 * This file is used to generate TS types for all Contentful models.
 * It is used by contentful-typescript-codegen.
 */
const contentfulManagement = require('contentful-management');
const dotenv = require('dotenv').config();

const CONFIG = {
  space: process.env.CONTENTFUL_SPACE ? process.env.CONTENTFUL_SPACE : dotenv.parsed.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_CONTENT_MANAGEMENT_TOKEN
    ? process.env.CONTENTFUL_CONTENT_MANAGEMENT_TOKEN
    : dotenv.parsed.CONTENTFUL_CONTENT_MANAGEMENT_TOKEN,
};

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: CONFIG.accessToken,
  });
  return contentfulClient
    .getSpace(CONFIG.space)
    .then((space) => space.getEnvironment('master'))
    .catch((err) => console.log(err));
};
