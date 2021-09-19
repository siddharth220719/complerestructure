const addressService = require('./address.service');
const { successHandler, errorHandler } = require('../common/handlers');

const { errorUtils } = require('../common/utils');
const { addAddressValidation, updateAddressValidation } = require('./address.validation');
// const logger = require('../libs/logger')();
// const logger = require('../libs/logger')();

const addAddress = async (req, res, next) => {
  const {
    user_id,
    address_line_1,
    address_line_2,
    city,
    state,
    zip,
    created_by,
    updated_by,
  } = req.body;
  try {
    await addAddressValidation.validateAsync({
      user_id,
      address_line_1,
      address_line_2,
      city,
      state,
      zip,
      created_by,
      updated_by,
    });
    const data = await addressService.addAddress({
      user_id,
      address_line_1,
      address_line_2,
      city,
      state,
      zip,
      created_by,
      updated_by,
    });

    return successHandler(data, req, res);
  } catch (err) {
    errorHandler(err, req, res);
    return next(err);
  }
};
const getAddress = async (req, res, next) => {
  try {
    const data = await addressService.getAddress({
      ...req.params,
    });
    if (data.length === 0) {
      errorUtils.throwNotFound();
    }
    return successHandler(data, req, res);
  } catch (err) {
    errorHandler(err, req, res);
    return next(err);
  }
};

const updateAddressById = async (req, res, next) => {
  try {
    const updates = Object.keys(req.body);
    updates.forEach(async (update) => {
      try {
        await updateAddressValidation.validateAsync({ [update]: req.body[update] });
      } catch (err) {
        errorHandler(err, req, res);
        next(err);
      }
    });
    const data = await addressService.updateAddress(
      {
        ...req.params,
      },
      req.body,
    );
    return successHandler(data, req, res);
  } catch (err) {
    errorHandler(err, req, res);
    return next(err);
  }
};

const deleteAddressById = async (req, res, next) => {
  try {
    const { params } = req;
    const data = await addressService.deleteAddressById({ ...params });
    return successHandler(data, req, res);
  } catch (err) {
    errorHandler(err, req, res);
    return next(err);
  }
};

module.exports = {
  addAddress, getAddress, updateAddressById, deleteAddressById,
};
