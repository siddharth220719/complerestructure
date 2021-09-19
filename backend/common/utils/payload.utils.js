const getSuccessPayload = (data) => data;

const getErrorPayload = (error) => ({
  error: {
    message: error.message || error,
  },
});

const getJoiErrorPayload = (error) => {
  const response = {
    error: {
      message: '',
      fields: [],
    },
  };

  error.details.forEach((e) => {
    response.error.fields.push({
      key: e.context.key,
      type: e.type,
      message: e.message,
    });
  });

  response.error.message = response.error.fields.map((field) => field.message).join(', ');
  return response;
};

module.exports = {
  getSuccessPayload,
  getErrorPayload,
  getJoiErrorPayload,
};
