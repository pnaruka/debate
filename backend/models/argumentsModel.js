const mongoose = require('mongoose');

const argumentSchema = mongoose.Schema({
    participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        trim: true
    },
    argType:{
        type: String,
        enum: ["FAVOUR","AGAINST"]
    },
    debate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Debate'
    }
},
    {timestamps: true}
);

const ArgumentModel = mongoose.model('Argument',argumentSchema);

module.exports = {
    ArgumentModel
}