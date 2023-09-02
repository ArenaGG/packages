const mongoose = require("mongoose");
const uniqid = require("uniqid");


const jackpotSchema = mongoose.Schema({
    round_id: {
        type: String, 
        default: uniqid(), 
        required: true, 
    },
    createdAt: {
        type: Date, 
        required: true, 
        default: Date.now
    },

    closedAt: {
        type: Date,
    },

    startedAt: {
        type: Number, 
    }, 

    roundSecret: {
        type: String, 
        required: true,
    }, 

    random_org_hash: {
        type: String,
    },

    random_org_obj: {
        type: String
    },

    roundSecretHash: {
        type: String, 
    },
    
    winningPercentage: {
        type: Number, 
        // required: true, 
        // first 5 characters of the secret hash, converted into decimal then divided by 10K 
    },
    publicHash: {
        type: String, 
        required: true, 
        // SHA-256 roundSecret + winningPercentage
    },

    finalHash: {
        type: String, 
    },

    winningTicket: {
        type: Number, 
    },

    winningDepositIndex: {
        type: Number, 
    },

    deposits: [{
        uid: {
            type: String, 
            required: true,
        }, 

        user: {
            type: String,
            required: true, 
            index: true, 
        },

        nonce: {
            type: Number,
        },

        amount: {
            type: Number, 
            required: true, 
        }, 

        user_avatar: {
            type: String, 
        }, 

        ticketRangeMin: {
            type: Number, 
            required: true, 
        }, 

        ticketRangeMax: {
            type: Number, 
            required: true, 
        },

        referral: {type: String},
        timestamp: {type: Date}, 
        timestamp_readable: {type: String}
    }],

    total: {
        type: Number,
        required: true, 
        default: 0, 
    },

    totalTickets: {
        type: Number, 
        default: 0, 
    }, 

    winner: {
        type: String, 
        default: "",
        index: true, 
    },

    winner_avatar: {
        type: String,
    },

    active: {
        type: Boolean, 
        default: true, 
        required: true, 
    },

    open: {
        type: Boolean, 
        required: true,
        default: true,  
    },

    roundTime: {
        type: Number, 
        // default: potConfig.potLength, 
        default: 20000, 
    },

    success: {
        type: Boolean,
    },

    fee: {
        type: Number, 
        default: 0.05
    },

    finalRotation: {
        type: Number,
    }

})

module.exports = mongoose.model("Jackpot", jackpotSchema)