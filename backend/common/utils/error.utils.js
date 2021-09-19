const ERROR = {
  SYNTAX_ERROR: 'SyntaxError',
  BAD_REQUEST: 'BadRequest',
  VALIDATION_ERROR: 'ValidationError',
  UNAUTHORIZED: 'Unauthorized',
  ACCESS_CONTROL_ERROR: 'AccessControlError',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'NotFound',
  DUPLICATE: 'Duplicate',
  PRECONDITION_FAILED: 'PreconditionFailed',
  UNPROCESSABLE_ENTITY: 'UnprocessableEntity',
  TOO_MANY_REQUESTS: 'TooManyRequests',
  INTERNAL_SERVER_ERROR: 'InternalServerError',
  SETTLEMENT_PROCESSING_ERROR: 'SettlementProcessingError',
  PARTNER_ERROR: 'PartnerError',
  SETTLEMENT_FAILED_ERROR: 'SettlementFailedError',
  CURRENCY_CLOUD_ERROR: 'CurrencyCloudError',
};

const throwBadRequest = (message = 'Bad Request') => {
  const err = new Error(message);
  err.name = ERROR.BAD_REQUEST;
  throw err;
};

const throwCustomJoiValidationError = (message = 'ValidationError', field_name) => {
  const err = new Error(message);
  err.name = ERROR.VALIDATION_ERROR;
  err.details = [];
  err.details.push({
    context: { key: field_name },
    type: 'custom',
    message,
  });
  throw err;
};

const throwUnauthorized = (message = 'Unauthorized') => {
  const err = new Error(message);
  err.name = ERROR.UNAUTHORIZED;
  throw err;
};

const throwForbidden = (message = 'Forbidden') => {
  const err = new Error(message);
  err.name = ERROR.FORBIDDEN;
  throw err;
};

const throwNotFound = (itemName = 'Item') => {
  const err = new Error(`${itemName} Not Found`);
  err.name = ERROR.NOT_FOUND;
  throw err;
};

const throwDuplicate = (itemName = 'Item') => {
  const err = new Error(`${itemName} Already Exists`);
  err.name = ERROR.DUPLICATE;
  throw err;
};

const throwPreconditionFailed = (message = 'Precondition Failed') => {
  const err = new Error(message);
  err.name = ERROR.PRECONDITION_FAILED;
  throw err;
};

const throwUnprocessableEntity = (message = 'Unprocessable Entity') => {
  const err = new Error(message);
  err.name = ERROR.UNPROCESSABLE_ENTITY;
  throw err;
};

const throwTooManyRequests = (message = 'Too Many Requests') => {
  const err = new Error(message);
  err.name = ERROR.TOO_MANY_REQUESTS;
  throw err;
};

const throwSettlementProcessingError = (message = 'Settlement Processing Error', partner_code) => {
  const err = new Error(message);
  err.name = ERROR.SETTLEMENT_PROCESSING_ERROR;
  err.partner_code = partner_code;
  throw err;
};

const throwPartnerError = (message = 'Partner Error', partner_code) => {
  const err = new Error(message);
  err.name = ERROR.PARTNER_ERROR;
  err.partner_code = partner_code;
  throw err;
};

const throwSettlementFailedError = (message = 'Settlement Failed Error', partner_code) => {
  const err = new Error(message);
  err.name = ERROR.SETTLEMENT_FAILED_ERROR;
  err.partner_code = partner_code;
  throw err;
};

const throwInternalServerError = (message = 'Internal Server Error') => {
  const err = new Error(message);
  err.name = ERROR.INTERNAL_SERVER_ERROR;
  throw err;
};

module.exports = {
  ERROR,
  throwBadRequest,
  throwCustomJoiValidationError,
  throwUnauthorized,
  throwForbidden,
  throwNotFound,
  throwDuplicate,
  throwPreconditionFailed,
  throwUnprocessableEntity,
  throwTooManyRequests,
  throwInternalServerError,
  throwSettlementProcessingError,
  throwPartnerError,
  throwSettlementFailedError,
};
