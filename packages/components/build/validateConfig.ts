/**
 * Validate JSON for elvia-components.config.js
 * https://json-schema.org/understanding-json-schema/reference/
 */

import Ajv from 'ajv';
const ajv = new Ajv({ allErrors: true });
const data = require('../elvia-components.config');

async function validateElviaComponentsConfig() {
  const schema = {
    type: 'array',
    items: {
      type: 'object',
      additionalProperties: false,
      properties: {
        reactName: { type: 'string', pattern: '([A-Z0-9]){1}([a-zA-Z0-9])+' },
        attributes: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              name: { type: 'string' },
              type: { type: 'string', pattern: '^(string|number|object|boolean|Date|function)$' },
            },
            required: ['name', 'type'],
          },
        },
        subComponents: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              reactName: { type: 'string', pattern: '([A-Z0-9]){1}([a-zA-Z0-9])+' },
              attributes: {
                type: 'array',
                items: {
                  type: 'object',
                  additionalProperties: false,
                  properties: {
                    name: { type: 'string' },
                    type: { type: 'string', pattern: '^(string|number|object|boolean|Date|function)$' },
                  },
                  required: ['name', 'type'],
                },
              },
            },
          },
        },
      },
      required: ['reactName', 'attributes'],
    },
  };

  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    console.log('\nJSON Validation - Error\n\nErrors elvia-components.config.js:');
    console.error(validate.errors);
    return Promise.resolve(false);
  } else {
    return Promise.resolve(true);
  }
}

export default validateElviaComponentsConfig;
