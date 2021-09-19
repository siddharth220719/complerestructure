const addressRoutes = require('./address.routes');
const addressController = require('./address.controller');
const addressService = require('./address.service');

module.exports = {
  addressService, addressRoutes, addressController,
};
