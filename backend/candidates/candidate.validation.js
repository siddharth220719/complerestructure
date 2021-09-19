/* eslint-disable camelcase */
const Joi = require('joi');

const first_name = Joi.string().label('first_name');

const last_name = Joi.string().label('last_name');

const email = Joi.string()
  .label('email')
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });

const phone_no = Joi.string()
  .label('phone_no')
  .trim()
  .regex(/^[0-9]{7,10}$/);

const addCandidateValidation = Joi.object({
  first_name,
  last_name,
  email,
  phone_no,
});
const updateCandidateValidation = Joi.object({
  first_name,
  last_name,
  email,
  phone_no,
});

module.exports = {
  addCandidateValidation, updateCandidateValidation,
};
