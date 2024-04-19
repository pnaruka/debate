const express = require('express');
const { createDebate, getDebates, getThisDebate } = require('../controllers/debateController');
const requireAuth = require('../middlewares/requireAuth');

const DebateRouter = express.Router();

DebateRouter.post('/create', requireAuth, createDebate);
DebateRouter.get('/show', getDebates);
DebateRouter.get('/showThis',getThisDebate);

module.exports = DebateRouter;