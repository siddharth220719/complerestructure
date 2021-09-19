/* eslint-disable camelcase */
const { pgManager } = require('../managers');
const config = require('../config');
// const logger = require('../libs/logger')();

const addAddress = async ({
  user_id,
  address_line_1,
  address_line_2,
  city,
  state,
  zip,
  created_by,
  updated_by,
}) => {
  const conn = await pgManager.getConnection();

  const query = `INSERT INTO ${config.pgsql.schema}.address(user_id,
    address_line_1,
    address_line_2,
    city,
    state,
    zip,
    created_by,
    updated_by) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING*`;
  const params = [
    user_id,
    address_line_1,
    address_line_2,
    city,
    state,
    zip,
    created_by,
    updated_by,
  ];

  const { rows } = await conn.query(query, params);

  return rows;
};

const getAddress = async ({ id }) => {
  const conn = await pgManager.getConnection();
  const params = [id];
  const query = `SELECT* FROM ${config.pgsql.schema}.address where user_id=$1`;
  const { rows } = await conn.query(query, params);

  return rows;
};
const updateAddress = async ({ id }, body) => {
  const updates = Object.keys(body);
  const setArray = [];
  updates.forEach((update) => {
    setArray.push(`${update}='${body[update]}'`);
  });
  const setString = setArray.join(',');
  const conn = await pgManager.getConnection();
  const params = [id];
  const query = `UPDATE ${config.pgsql.schema}.address set ${setString} where address_id=$1 RETURNING*`;
  const { rows } = await conn.query(query, params);

  return rows;
};

const deleteAddressById = async ({ id }) => {
  const conn = await pgManager.getConnection();
  const params = [id];
  const query = `UPDATE ${config.pgsql.schema}.address set is_deleted=1 where address_id=$1 RETURNING*`;
  const { rows } = await conn.query(query, params);

  return rows;
};
module.exports = {
  addAddress,
  getAddress,
  updateAddress,
  deleteAddressById,
};
