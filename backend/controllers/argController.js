const asyncHandler = require('express-async-handler');
const { ArgumentModel } = require('../models/argumentsModel');
const { addParticipant } = require('./debateController');
const { UserModel } = require('../models/userModel');

const createArg = asyncHandler(async (req, res) => {
    const { content, argType, debate } = req.body;
    if (!content || !argType || !debate) {
        return res.status(400).send("All fields are required");
    }
    const argData = {
        participant: req.user._id,
        content,
        argType,
        debate
    };
    //console.log(argData);
    try {
        await addParticipant(debate, req.user._id);
        //console.log('here');
        const createdArg = await ArgumentModel.create(argData);
        const fullArg = await ArgumentModel.findOne({ _id: createdArg._id })
            .populate("participant", "-password");

        return res.status(200).json(fullArg);
    } catch (error) {
        return res.status(500).json(error);
    }
});

const getArgs = asyncHandler(async (req, res) => {
    const { debateId } = req.query;
    //console.log(req.body);
    try {
        const args = await ArgumentModel.find({ debate: debateId })
            .populate("participant", "-password")
            .populate("debate");
        const argsWithOrg = await UserModel.populate(args,{
            path: "debate.organiser",
            select: "name pic email"
        })

        if (!argsWithOrg) {
            return res.status(204).send("No arguments yet.");
        }

        return res.status(200).json(argsWithOrg);
    } catch (error) {
        return res.status(500).json(error);
    }

});

module.exports = {
    createArg,
    getArgs
}