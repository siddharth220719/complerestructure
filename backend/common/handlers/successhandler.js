/* eslint-disable max-len */
const { payloadUtils } = require('../utils');

module.exports = (data, req, res) => res.status(200).send(payloadUtils.getSuccessPayload(data));
