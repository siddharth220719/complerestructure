/* eslint-disable camelcase */
const Joi = require('joi');

const address_line_1 = Joi.string().label('address_line1');
const user_id = Joi.number().required().label('user_id');
const address_line_2 = Joi.string().label('address_line2');
const city = Joi.string().label('city');
const state = Joi.string().label('state');
const zip = Joi.number().label('zip');
const created_by = Joi.string().label('created_by');
const updated_by = Joi.string().label('updated_by');

const addAddressValidation = Joi.object({
  user_id,
  address_line_1,
  address_line_2,
  city,
  state,
  zip,
  created_by,
  updated_by,
});
const updateAddressValidation = Joi.object({
  address_line_1,
  address_line_2,
  city,
  state,
  zip,
  created_by,
  updated_by,
});

module.exports = {
  addAddressValidation, updateAddressValidation,
};
