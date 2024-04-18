const mongoose = require('mongoose');

const debateSchema = mongoose.Schema({
    debateName: {
        type: String,
        required: true,
        trim: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    organiser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status:{
        type: String,
        default: "In progress"
    },
    conclusion:{
        type: String,
        required: false
    }
},
    {timestamps: true}
);

const DebateModel = mongoose.model('Chat',debateSchema);

module.exports = {
    DebateModel
};