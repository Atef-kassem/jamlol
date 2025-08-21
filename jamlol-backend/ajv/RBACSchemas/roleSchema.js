const Ajv = require("ajv").default;
const ajv = new Ajv();

const roleSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 2 },
    permissions: {
      type: "array",
      items: {
        oneOf: [
          { type: "string", minLength: 1 },
          { 
            type: "object",
            // Allow any properties with boolean values
            additionalProperties: { type: "boolean" },
            minProperties: 1
          }
        ]
      }
    }
  },
  required: ["name"],
  // Allow additional properties to be more flexible
  additionalProperties: false,
};

module.exports = roleSchema;
