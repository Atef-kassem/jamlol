const Ajv = require("ajv").default;
const ajv = new Ajv();

const roleSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 2 },
  },
  required: ["name"],
  additionalProperties: false,
};

module.exports = roleSchema;
