const Ajv = require("ajv").default;
const ajv = new Ajv();

const naqlenSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    naqlen_type: { type: "string", enum: ["person", "company"] },
    identification_number: { type: "string" },
    identification_type: { type: "string", enum: ["card", "sgl"] },
    jwal: { type: "string", pattern: "^(\\+?\\d{1,3}[-.\\s]?)?\\d{7,15}$", minLength: 7, maxLength: 15 },
    address: { type: "string" },
    active: { type: "string", enum: ["active", "inactive"]},
    regions: { type: "array", items: { type: "number" } ,minItems: 1},
  },
  required: ["name", "naqlen_type", "identification_number","regions","jwal","address"],
  additionalProperties: false,
};
ajv.compile(naqlenSchema);
module.exports = naqlenSchema;
