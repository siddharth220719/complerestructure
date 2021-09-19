const { Pool } = require('pg');

module.exports = ({
  host, port, user, password, database, waitForConnections, connectionLimit, queueLimit, debug,
}) => {
  const connection = new Pool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections,
    connectionLimit,
    queueLimit,
    debug,
  });

  const getConnection = async () => connection;

  const getTransactionalConnection = async () => connection.getConnection();

  return {
    getConnection,
    getTransactionalConnection,
  };
};
