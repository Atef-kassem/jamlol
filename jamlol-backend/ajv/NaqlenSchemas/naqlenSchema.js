const Ajv = require("ajv").default;
const ajv = new Ajv();

const naqlenSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    naqlen_type: { type: "string", enum: ["person", "company"] },
    card_number: { type: "integer" },
    sgl_number: { type: "integer" },
    jwal: { type: "string", pattern: "^(\\+?\\d{1,3}[-.\\s]?)?\\d{7,15}$", minLength: 7, maxLength: 15 },
    address: { type: "string" },
    region_id: { type: "integer" },
    active: { type: "boolean" },
  },
  required: ["name", "naqlen_type", "region_id"],
  additionalProperties: false,
};
ajv.compile(naqlenSchema);
module.exports = naqlenSchema;
