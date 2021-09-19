const express = require('express');
const { errorUtils } = require('./common/utils');
const logger = require('./libs/logger')();

const { userRoutes } = require('./users');
const { candidateRoutes } = require('./candidates');
const { addressRoutes } = require('./addresses');

const apiRoutes = express.Router({ mergeParams: true });

apiRoutes.use('/users', userRoutes);
apiRoutes.use('/candidates', candidateRoutes);
apiRoutes.use('/address', addressRoutes);

apiRoutes.use('*', (req, res, next) => {
  try {
    return errorUtils.throwNotFound('Route');
  } catch (e) {
    return next(e);
  }
});

module.exports = apiRoutes;
