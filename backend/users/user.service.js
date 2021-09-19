/* eslint-disable camelcase */
const { pgManager } = require('../managers');
const config = require('../config');
const logger = require('../libs/logger')();

const loginUser = async ({ email, password }) => {
  const conn = await pgManager.getConnection();
  const query = `
    SELECT* FROM ${config.pgsql.schema}.login_users where email=$1 and password=$2`;
  const params = [email, password];

  const { rows } = await conn.query(query, params);

  return rows[0];
};
const insertUser = async ({
  first_name,
  last_name,
  email,
  phone_no,
  type,
}) => {
  const conn = await pgManager.getConnection();
  const query = `INSERT INTO ${config.pgsql.schema}.users(first_name,last_name,email,phone_no,type) VALUES($1,$2,$3,$4,$5) RETURNING user_id`;
  const params = [
    first_name,
    last_name,
    email,
    phone_no,
    type,
  ];

  const { rows } = await conn.query(query, params);
  return rows[0];
};

module.exports = {
  loginUser,
  insertUser,
};
