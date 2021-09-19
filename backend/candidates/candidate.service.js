/* eslint-disable camelcase */
const { pgManager } = require('../managers');
const config = require('../config');
const logger = require('../libs/logger')();
const userService = require('../users/user.service');

const addCandidate = async (data) => {
  const {
    first_name,
    last_name,
    email,
    phone_no,
    location,
    notice_period,
    expected_ctc,
    current_ctc,
    alt_phone_no,
    notes,
    type = 'CANDIDATE',
  } = data;
  const { user_id } = await userService.insertUser({
    first_name,
    last_name,
    email,
    phone_no,
    type,
  });
  const conn = await pgManager.getConnection();

  const query = `INSERT INTO ${config.pgsql.schema}.candidates(user_id,
    first_name,
    last_name,
    email,
    phone_no,
    location,
    notice_period,
    expected_ctc,
    current_ctc,
    alt_phone_no,
    notes) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING first_name,
    last_name,
    email,
    phone_no,
    location,
    notice_period,
    expected_ctc,
    current_ctc,
    alt_phone_no,
    notes,
    created_by,
    created_at,
    updated_at,
    is_deleted`;
  const params = [
    user_id,
    first_name,
    last_name,
    email,
    phone_no,
    location,
    notice_period,
    expected_ctc,
    current_ctc,
    alt_phone_no,
    notes,
  ];

  const { rows } = await conn.query(query, params);

  return rows;
};

const getCandidates = async ({
  candidate_id, first_name, last_name, is_deleted, sort_by, sort_direction = 'asc', limit, skip,
}) => {
  const conn = await pgManager.getConnection();
  const params = [];
  const whereArray = [];
  let i = 1;
  if (first_name !== undefined) {
    whereArray.push(`first_name = $${i}`);
    params.push(first_name);
    i++;
  }
  if (candidate_id !== undefined) {
    whereArray.push(`candidate_id = $${i}`);
    params.push(candidate_id);
    i++;
  }
  if (last_name !== undefined) {
    whereArray.push(`last_name = $${i}`);
    params.push(last_name);
    i++;
  }
  if (is_deleted !== undefined) {
    whereArray.push(`is_deleted = $${i}`);
    params.push(is_deleted);
    i++;
  }
  const whereString = whereArray.length > 0 ? `WHERE ${whereArray.join(' AND ')}` : '';
  const sortingString = sort_by && sort_direction ? `ORDER BY ${sort_by} ${sort_direction}` : '';
  const pagingString = limit && skip ? `LIMIT ${limit} OFFSET ${skip}` : '';
  const query = `
    SELECT * FROM ${config.pgsql.schema}.candidates ${whereString} ${sortingString} ${pagingString}
    `;
  logger.info({
    function_name: 'getEmployeeList',
    query,
  });
  const { rows } = await conn.query(query, params);
  return rows;
};
const getCandidateById = async ({ id }) => {
  const conn = await pgManager.getConnection();
  const params = [id];
  const query = `SELECT* FROM ${config.pgsql.schema}.candidates where candidate_id=$1`;
  const { rows } = await conn.query(query, params);

  return rows;
};
const updateCandidateById = async ({ id }, body) => {
  const updates = Object.keys(body);
  const setArray = [];
  updates.forEach((update) => {
    setArray.push(`${update}='${body[update]}'`);
  });
  const setString = setArray.join(',');
  const conn = await pgManager.getConnection();
  const params = [id];
  const query = `UPDATE ${config.pgsql.schema}.candidates set ${setString} where candidate_id=$1 RETURNING*`;
  const { rows } = await conn.query(query, params);

  return rows;
};

const deleteCandidateById = async ({ id }) => {
  const conn = await pgManager.getConnection();
  const params = [id];
  const query = `UPDATE ${config.pgsql.schema}.candidates set is_deleted=1 where candidate_id=$1 RETURNING*`;
  const { rows } = await conn.query(query, params);

  return rows;
};
module.exports = {
  addCandidate,
  getCandidates,
  getCandidateById,
  updateCandidateById,
  deleteCandidateById,
};
