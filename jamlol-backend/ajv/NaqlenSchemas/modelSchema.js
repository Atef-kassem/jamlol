const Ajv = require("ajv").default;
const ajv = new Ajv();

const modelSchema = {
  type: "object",
  properties: {
    title: { 
      type: "string", 
      minLength: 2, 
    }
  },
  required: ["title"],
  additionalProperties: false,
};

ajv.compile(modelSchema);
module.exports = modelSchema;
