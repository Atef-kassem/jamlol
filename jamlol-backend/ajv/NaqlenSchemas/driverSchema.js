const Ajv = require("ajv").default;
const ajv = new Ajv();

const driverSchema = {
  type: "object",
  properties: {
    driver_name: { type: "string" },
    naqel_id: { type: "number" },
    license_num: { type: "number" },
    license_end_date: { type: "string" },
  },
  required: ["driver_name", "naqel_id", "license_num", "license_end_date"],
  additionalProperties: false,
};
ajv.compile(driverSchema);
module.exports = driverSchema;
