const Ajv = require("ajv").default;
const ajv = new Ajv();

const managementSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3},
  },
  required: ["name"],
  additionalProperties: false,
};
ajv.compile(managementSchema);
module.exports = managementSchema;
