const asyncHandler = require('express-async-handler');
const { UserModel } = require('../models/userModel');
const validator = require('validator');
const bcrypt = require('bcrypt');
const createToken = require('../utils/createToken');

const createUser = asyncHandler(async (req, res) => {
    const { user } = req.body;

    if (!user.name || !user.email || !user.password) {
        res.status(400);
        throw new Error('Please fill all required fields.');
    }

    if (!validator.isEmail(user.email)) {
        res.status(400);
        throw new Error('Invalid email');
    }
    if (!validator.isStrongPassword(user.password)) {
        res.status(400);
        throw new Error('Password not strong enough.');
    }
    const userExists = await UserModel.findOne({ email: user.email });
    if (userExists) {
        res.status(400);
        throw new Error('Email already registered.');
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const newUser = await UserModel.create({
        name: user.name,
        email: user.email,
        password: hashPassword,
        profilePic: user.profilePic
    });
    if (!newUser) {
        res.status(400);
        throw new Error('Failed to create user.');
    }
    const token = createToken(newUser._id, newUser.email);
    //console.log(newUser);
    return res.status(201).json({
        name:newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic, 
        token });

});

const loginUser = asyncHandler(
    async (req, res) => {
        const { user } = req.body;
        if (!user.email || !user.password) {
            res.status(400);
            throw new Error('Please fill all required fields.');
        }
        if (!validator.isEmail(user.email)) {
            res.status(400);
            throw new Error('Invalid email');
        }
        const userExists = await UserModel.findOne({ email: user.email });
        if (!userExists) {
            res.status(400);
            throw new Error('Email not registered.');
        }
        const passMatch = await bcrypt.compare(user.password, userExists.password);
        if(!passMatch){
            res.status(400);
            throw new Error('Incorrect password.');
        }
        const token = createToken(userExists._id, userExists.email);
        return res.status(200).json({
            name:userExists.name,
            email: userExists.email,
            profilePic: userExists.profilePic,
            token });
    }
)


module.exports = {
    createUser,
    loginUser
}