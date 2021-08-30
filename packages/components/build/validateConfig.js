/**
 * Validate JSON for elvia-components.config.js
 */

const Ajv = require("ajv");
const ajv = new Ajv();
const data = require('../elvia-components.config');

function validateElviaComponentsConfig() {
    const schema = {
        type: "array",
        items: {
            type: "object",
            properties: {
                "name": { type: "string" },
                "elementName": { type: "string" },
                "attributes": {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            "name": { type: "string" },
                            "type": { type: "string" }
                        }
                    }
                },
                "reactName": { type: "string" },
                "useWrapper": { type: "boolean" },
                "slotItems": { type: "boolean" },
                "elementStyle": { type: "string" },
                "conditionalElementStyle": {
                    type: "object",
                    propertyNames: {
                        "pattern": "^[A-Za-z_][A-Za-z0-9_]*$"
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
        console.log(validate.errors);
        return false;
    } else {
        console.log("\nJSON Validation - Successfully validated elvia-components.config.js\n")
        return true;
    }
}

exports.validateElviaComponentsConfig = validateElviaComponentsConfig;
