const express = require('express');

const routes = express.Router({ mergeParams: true });
const multer = require('multer');
const candidateController = require('./candidate.controller');

const upload = multer();

routes.post('/addCandidate', candidateController.addCandidate);
routes.get('/getCandidates', candidateController.getCandidates);
routes.get('/getCandidate/:id', candidateController.getCandidateById);
routes.put('/updateCandidate/:id', candidateController.updateCandidateById);
routes.delete('/deleteCandidate/:id', candidateController.deleteCandidateById);
routes.post('/uploadProfilePicture', upload.single('upload'), candidateController.uploadDocument);

module.exports = routes;
