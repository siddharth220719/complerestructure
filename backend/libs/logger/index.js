/* eslint-disable no-console */
module.exports = () => {
  const info = (data) => {
    console.log(data);
  };
  const error = (data) => {
    console.log(data);
  };

  return {
    error,
    info,
  };
};
