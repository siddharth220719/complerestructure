const jwt = require('jsonwebtoken');

module.exports = () => {
  const sign = async (data) => await jwt.sign({ data }, 'mysecretkey');
  const info = (data) => {
  };

  return {
    sign,
    info,
  };
};
