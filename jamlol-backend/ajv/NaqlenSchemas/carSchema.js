const Ajv = require("ajv").default;
const ajv = new Ajv();

const carSchema = {
  type: "object",
  properties: {
    plate_num: { 
      type: "integer", 
      minimum: 1,
    },
    license_number: { 
      type: "integer", 
      minimum: 1,
    },
    license_end_date: { 
      type: "string", 
    },
    insurance_end_date: { 
      type: "string", 
    },
    year: { 
      type: "integer", 
    },
    driver_id: { 
      type: "integer", 
      minimum: 1
    },
    model_id: { 
      type: "integer", 
      minimum: 1
    },
    naqel_id: { 
      type: "integer", 
      minimum: 1
    },
    allowed_cars_num: { 
      type: "integer", 
      minimum: 1,
    },
    allowed_drivers_num: { 
      type: "integer", 
      minimum: 1,
    }
  },
  required: [
    "plate_num", 
    "license_number", 
    "license_end_date", 
    "insurance_end_date", 
    "year", 
    "driver_id", 
    "model_id", 
    "naqel_id", 
    "allowed_cars_num", 
    "allowed_drivers_num"
  ],
  additionalProperties: false,
};

ajv.compile(carSchema);
module.exports = carSchema;
