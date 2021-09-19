const {
    PgManager,
  } = require('../libs/managers');
  const config = require('../config');
  
  const pgManager = PgManager(config.pgsql);
  
  module.exports = {
    pgManager,
  };
  