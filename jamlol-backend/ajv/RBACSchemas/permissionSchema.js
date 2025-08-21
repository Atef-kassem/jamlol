const Ajv = require("ajv");
const ajv = new Ajv();

const permissionSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    slug: { type: "string" },
    management_id: { type: "integer" },
  },
  required: ["name", "slug", "management_id"],
  additionalProperties: false,
};

ajv.compile(permissionSchema);
module.exports = permissionSchema;
