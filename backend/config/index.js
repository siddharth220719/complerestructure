const dotenv = require('dotenv');

dotenv.config();

const environment = process.env.ENVIRONMENT;
module.exports = {
  pgsql: {
    environment,
    host: 'mumbai-flolite-db.c0uta0ghdiza.ap-south-1.rds.amazonaws.com',
    user: 'flolite',
    password: 'flolite123',
    database: 'flolite',
    port: 5432,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
    debug: false,
    schema: 'Siddharth4',
  },
};
