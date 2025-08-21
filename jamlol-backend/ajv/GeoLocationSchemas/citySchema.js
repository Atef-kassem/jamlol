const Ajv = require("ajv");
const ajv = new Ajv();

const citySchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3, },
    country_id: { type: "integer" },
  },
  required: ["name", "country_id"],
  additionalProperties: false,
};

ajv.compile(citySchema);
module.exports = citySchema;