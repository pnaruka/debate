const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const { createArg, getArgs } = require('../controllers/argController');

const ArgRouter = express.Router();

ArgRouter.post('/create', requireAuth, createArg);
ArgRouter.get('/show', getArgs);

module.exports = ArgRouter;