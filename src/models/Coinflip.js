const mongoose = require("mongoose");
const chance = require('chance').Chance();

const coinflipSchema = mongoose.Schema({
    round_id: {
        type: String, 
        default: chance.string(), 
        required: true, 
        // unique: true, 
    },

    createdAt: {
        type: Date, 
        default: Date.now(), 
        required: true, 
    },

    expiresAt: {
        type: Date, 
        required: true
    },

    startedAt: {
        type: Date,
    },

    secret: {
        type: String,
        required: true, 
    },

    publicHash: {
        type: String, 
        required: true,
        unique: true, 
    },

    finalHash: {
        type: String, 
    },

    winningPercentage: {
        type: Number,
    },

    // add validation to prevent more than 2 bets
    participants: [],

    creator: {
        // type: Object, required: true,
        user: {
            type: String, 
            required: true, 
        }, 

        side: {
            type: String, 
            required: true
        },

        user_avatar: {
            type: String, 
        }
    },

    opponent: {
        user: String, 
        side: String, 
        user_avatar: String, 
    },

    amount: {
        type: Number, 
        required: true, 
    },

    winner: {
        user: {type: String},
        user_id: {type: String},
        side: {type: String},
        avatar_url: String,
    },

    joinable: {
        type: Boolean, 
        default: true,
    }, 

    roundTime: {
        type: Number, 
        default: 10
    },

    random_org_hash: {
        type: String,
    },

    random_org_obj: {
        type: String
    },

    fee: {
        type: Number, 
        // default: potConfig.coinflipFee
        default: 0.1
    },

    status: {
        type: String,
    }
})

module.exports = mongoose.model("Coinflip", coinflipSchema)