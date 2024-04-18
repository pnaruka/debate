const express = require('express');
const { createDebate, getDebates } = require('../controllers/debateController');
const requireAuth = require('../middlewares/requireAuth');

const DebateRouter = express.Router();

DebateRouter.post('/create', requireAuth, createDebate);
DebateRouter.get('/show', getDebates);

module.exports = DebateRouter;