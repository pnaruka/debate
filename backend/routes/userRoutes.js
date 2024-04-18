const express = require('express');
const { createUser, loginUser } = require('../controllers/userController');

const UserRouter = express.Router();

UserRouter.post('/login',loginUser);
UserRouter.post('/signup',createUser);

module.exports = UserRouter;