const Ajv = require("ajv");
const ajv = new Ajv();

const regionSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3, },
    city_id: { type: "integer" },
  },
  required: ["name", "city_id"],
  additionalProperties: false,
};

ajv.compile(regionSchema);
module.exports = regionSchema;