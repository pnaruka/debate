const asyncHandler = require('express-async-handler');
const { DebateModel } = require('../models/debateModel');

const createDebate = asyncHandler(async (req, res) => {
    const {debateName} = req.body;
    const organiser = req.user._id;

    if (!debateName) {
        //console.log('Debate not provided');
        return res.status(400).send("Debate name not provided");
    }

    const debateData = {
        debateName: debateName,
        organiser: organiser
    };
    try {
        const createdDebate = await DebateModel.create(debateData);
        const fullDebate = await DebateModel.find({ _id: createdDebate._id })
        .populate("participants", "-password")
        .populate("organiser","-password");
        return res.status(200).json(fullDebate);
    } catch (error) {
        return res.status(500).json(error);
    }
});

const getDebates = asyncHandler(async (req, res) => {
    
    try {
        const debates = await DebateModel.find({})
        .populate("participants", "-password")
        .populate("organiser","-password");

        if (!debates) {
            return res.status(204).send("No debates to show.");
        }
        
        return res.status(200).json(debates);
    } catch (error) {
        return res.status(500).json(error);
    }

})

const addParticipant =  async(debateId, userId)=>{
    const added = await DebateModel.findByIdAndUpdate(
        debateId,
        {
            $push: {participants: userId}
        },
        {new: true}
    ).populate("users", "-password")
     .populate("participants", "-password");

     if(!added){
        throw new Error("Could not add user");
     }
     else{
        return added;
     }
};

module.exports = {
    createDebate,
    getDebates,
    addParticipant
}