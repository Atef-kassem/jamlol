const Ajv = require("ajv");
const ajv = new Ajv();

const countrySchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3, },
  },
  required: ["name"],
  additionalProperties: false,
};

ajv.compile(countrySchema);
module.exports = countrySchema;