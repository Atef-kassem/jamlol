const Ajv = require("ajv").default;
const ajv = new Ajv();

const clientSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    jwal: { type: "string", pattern: "^(\\+?\\d{1,3}[-.\\s]?)?\\d{7,15}$", minLength: 7, maxLength: 15 },
    address: { type: "string" },
    region_id: { type: "integer" },
    active: { type: "string", enum: ["active", "inactive"] },
  },
  required: ["name", "region_id"],
  additionalProperties: false,
};
ajv.compile(clientSchema);
module.exports = clientSchema;
