const Joi = require("joi");

const first_name = Joi.string().required().label("first_name");

const last_name = Joi.string().required().label("last_name");

const email = Joi.string()
  .required()
  .label("email")
  .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } });

const phone_no = Joi.string()
  .label("phone_no")
  .trim()
  .regex(/^[0-9]{7,10}$/)
  .required();
const type = Joi.string().required().label("candidate");
const created_at = Joi.date().required().label("created_at");
const created_by = Joi.string().required().label("created_by");
const is_deleted = Joi.boolean().required().label("is_deleted");

const insertUserValidation = Joi.object({
  first_name,
  last_name,
  email,
  phone_no,
  created_at,
  created_by,
  is_deleted,
  type,
});
const loginUserValidation = Joi.object({
  email
});

module.exports = {
  insertUserValidation,loginUserValidation
};
