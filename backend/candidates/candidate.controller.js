// const AWS = require('aws-sdk');
const candidateService = require('./candidate.service');
const { successHandler, errorHandler } = require('../common/handlers');

const { errorUtils } = require('../common/utils');
const { addCandidateValidation, updateCandidateValidation } = require('./candidate.validation');

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });
// const logger = require('../libs/logger')();

const addCandidate = async (req, res, next) => {
  try {
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
      created_by,
    } = req.body;
    await addCandidateValidation.validateAsync({
      first_name,
      last_name,
      email,
      phone_no,
    });

    const data = await candidateService.addCandidate({
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
      created_by,
    });
    return successHandler(data, req, res);
  } catch (err) {
    errorHandler(err, req, res);
    return next(err);
  }
};

const getCandidates = async (req, res, next) => {
  try {
    const { query } = req;
    const data = await candidateService.getCandidates({ ...query });
    if (!data || data.length === 0) {
      errorUtils.throwNotFound();
    }
    return successHandler(data, req, res);
  } catch (err) {
    errorHandler(err, req, res);
    return next(err);
  }
};
const getCandidateById = async (req, res, next) => {
  try {
    const data = await candidateService.getCandidateById({
      ...req.params,
    });
    if (data.length === 0) {
      errorUtils.throwNotFound();
    }
    return successHandler(data[0], req, res);
  } catch (err) {
    errorHandler(err, req, res);
    return next(err);
  }
};
const updateCandidateById = async (req, res, next) => {
  try {
    const updates = Object.keys(req.body);
    updates.forEach(async (update) => {
      try {
        await updateCandidateValidation.validateAsync({ [update]: req.body[update] });
      } catch (err) {
        errorHandler(err, req, res);
        next(err);
      }
    });
    const data = await candidateService.updateCandidateById(
      {
        ...req.params,
      },
      req.body,
    );
    return successHandler(data, req, res);
  } catch (err) {
    errorHandler(err, req, res);
    return next(err);
  }
};

const deleteCandidateById = async (req, res, next) => {
  try {
    const { params } = req;
    const data = await candidateService.deleteCandidateById({ ...params });
    return successHandler(data, req, res);
  } catch (err) {
    errorHandler(err, req, res);
    return next(err);
  }
};
const uploadDocument = async (req, res, next) => {
  try {
    // const params = {
    //   Bucket: 'testBucket', // pass your bucket name
    //   Key: req.file.orginalname, // file will be saved as testBucket/contacts.csv
    //   Body: req.file.buffer,
    // };
    // s3.upload(params, (s3Err, data) => {
    //   if (s3Err) throw s3Err;
    //   logger.info(`File uploaded successfully at ${data.Location}`);
    // });

    return successHandler(req.file.buffer, req, res);
  } catch (err) {
    errorHandler(err, req, res);
    return next(err);
  }
};

module.exports = {
  addCandidate,
  getCandidates,
  getCandidateById,
  updateCandidateById,
  deleteCandidateById,
  uploadDocument,
};
