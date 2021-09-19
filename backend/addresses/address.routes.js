const express = require('express');

const routes = express.Router({ mergeParams: true });
const addressController = require('./address.controller');

routes.post('/addAddress', addressController.addAddress);
routes.get('/address/:id', addressController.getAddress);
routes.put('/updateAddress/:id', addressController.updateAddressById);
routes.delete('/deleteAddress/:id', addressController.deleteAddressById);

module.exports = routes;
