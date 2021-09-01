/**
 * Validate JSON for elvia-components.config.js
 * https://json-schema.org/understanding-json-schema/reference/
 */

const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
const data = require('../elvia-components.config');

async function validateElviaComponentsConfig() {
    const schema = {
        type: "array",
        items: {
            type: "object",
            additionalProperties: false,
            properties: {
                name: { type: "string", pattern: "(elvis-)([a-zA-Z0-9])+" },
                elementName: { type: "string", pattern: "(elvia-)([a-zA-Z0-9])+" },
                attributes: {
                    type: "array",
                    items: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                            name: { type: "string" },
                            type: { type: "string", pattern: "^(string|number|object|boolean|Date)$" },
                            propType: { type: "string" }
                        },
                        required: ["name", "type", "propType"]
                    }
                },
                reactName: { type: "string", pattern: "([A-Z0-9]){1}([a-zA-Z0-9])+" },
                useWrapper: { type: "boolean" },
                wrapperStyle: {
                    type: "object", propertyNames: {
                        pattern: "^[A-Za-z_][A-Za-z0-9_]*$",
                    }
                },
                slotItems: { type: "boolean" },
                elementStyle: { type: "string" },
                conditionalElementStyle: {
                    type: "object",
                    propertyNames: {
                        pattern: "^[A-Za-z_][A-Za-z0-9_]*$"
                    }
                }
            },
            required: ["name", "elementName", "attributes", "reactName", "useWrapper", "slotItems"]
        }
    }

    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
        console.log("\nJSON Validation - Error\n\nErrors elvia-components.config.js:");
        console.error(validate.errors);
        return Promise.resolve(false);
    } else {
        return Promise.resolve(true);
    }
}

exports.validateElviaComponentsConfig = validateElviaComponentsConfig;
