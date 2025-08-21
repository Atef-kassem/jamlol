const Ajv = require("ajv").default;
const ajv = new Ajv();

const RegisterSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    username: { type: "string" },
    phone:  { 
      type: "string", 
      pattern: "^(\\+?\\d{1,3}[-.\\s]?)?\\d{7,15}$", 
      minLength: 7, 
      maxLength: 15 
    },
    email: { type: "string", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
    photo: { type: "string" },
    address: { type: "string" },
    password: {
      type: "string",
      minLength: 8,
      pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
    },
    person_type: { type: "string", enum: ["supplier", "client", "carrier", "admin"] },
    approval_code: { type: "string" },
    status: { type: "string", enum: ["active", "inActive"] },
    role_id: { type: "integer" },
  },
  required: ["name", "username", "email", "password", "person_type"],
  additionalProperties: false,
};
ajv.compile(RegisterSchema);
module.exports = RegisterSchema;
