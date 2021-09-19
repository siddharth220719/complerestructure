const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./libs/logger')();
const routes = require('./index.routes');
const { errorHandler } = require('./common/handlers');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(routes);

app.use((err, req, res, next) => {
  const { name: errorName, message, stack } = err;
  logger.error({
    err: {
      name: errorName,
      message,
      stack,
    },
    message,
    function_name: 'errorHandler',
  });
  errorHandler(err, req, res, next);
});

app.listen(PORT, () => logger.info(`server running on ${PORT}`));
