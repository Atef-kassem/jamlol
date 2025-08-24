const Ajv = require("ajv").default;
const ajv = new Ajv();

const supplierSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    supplier_type: { type: "string", enum: ["person", "company"] },
    identification_number: { type: "string" },
    identification_type: { type: "string", enum: ["card", "sgl"] },
    jwal: { type: "string", pattern: "^(\\+?\\d{1,3}[-.\\s]?)?\\d{7,15}$", minLength: 7, maxLength: 15 },
    address: { type: "string" },
    region_id: { type: "integer" },
    active: { type: "string", enum: ["active", "inactive"] },
  },
  required: ["name", "supplier_type", "identification_number", "region_id", "jwal", "address"],
  additionalProperties: false,
};
ajv.compile(supplierSchema);
module.exports = supplierSchema;
