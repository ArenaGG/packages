const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const chance = require('chance').Chance();
const Decimal = require("decimal.js");

const userSchema = mongoose.Schema({
    active: {
        type: Boolean,
        default: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        unique: true,
        index: true,
        sparse: true,
    },

    privacy: {
        email: {
            type: Boolean, 
            default: false, 
        },

        stats: {
            type: Boolean, 
            default: false, 
        }
    },

    friends: {
        sent: {
            required: true,
            default: [],
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
        },
        received: {
            required: true,
            default: [],
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
        },
        accepted: {
            required: true,
            default: [], 
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
        },
    },

    two_factor_secret: {},
    two_factor_enabled: { default: false, type: Boolean },
    recovery_codes: {
        generated_timestamp: Date,
        codes: [{
            code: String,
            used: Boolean,
        }]
    },

    email_confirmation: {
        code: {
            type: String,
            default: chance.hash({ length: 20 })
        },

        set: {
            type: Boolean,
            default: false,
        },

        confirmed: {
            type: Boolean,
            default: false,
        }
    },

    password: {
        type: String,
        required: true,
    },

    privilege: {
        type: String,
        required: true,
        default: "member",
    },

    role: {
        type: String,
        default: "member",
    },

    roles: {
        type: Array,
        default: [],
    },

    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    uid: {
        type: String,
        default: chance.hash(),
        required: true,
    },

    connectedWallets: {
        type: [String],
        default: [],
    },

    referral: {
        id: {
            type: String,
            default: "btcarena-" + chance.string({
                pool: "abcdefghijklmnopqrstuvwxyz0123456789",
                length: 15,
            }),
        },

        overwrite: {
            active: { type: Boolean, default: false },
            rank: { type: String }
        },

        // Number of times referral has been claimed
        n: {
            type: Number,
            default: 0
        },

        ids: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],

        // Number of times a WAGER with this referral has been placed
        n_wagered: {
            type: Number,
            default: 0,
        },

        // Amount in bitcoin wagered using this referral code
        amount_wagered: {
            type: Number, // Amount in MBTC
            default: 0,
        },

        commissions: {
            type: Number,
            default: 0,
        },

        tier: {
            type: String,
            default: "BRONZE",
        },

        clicks: {
            n: {
                type: Number,
                default: 0,
            },

            // stores ip's of users who've clicked the link
            ips: [],
        },

        // This is the data to do with the code THIS user has claimed THEMSELVES
        used: {
            code: { type: String, default: "" },
            amount: { type: Number, default: 0 },
            claimed: { type: Date }
        },

    },

    avatar_url: {
        type: String,
        default: "https://avatars.dicebear.com/v2/jdenticon/" + chance.hash() + ".svg"
    },

    avatar: {
        data: String,
        filetype: String,
    },

    // Discord Data
    discord: {
        authorized: {
            type: Boolean,
            default: false,
        },
        id: Number,
        fullid: { type: String },
        timestamp: { type: Date, required: true, default: Date.now }
    },

    /* This is the list of pot deposits */
    deposits: [],
    wins: [],
    tips: [],
    wagered: {
        type: Number,
        default: 0,
    },

    // Notification format
    /*  
        {
            * title
            * message
            * read
        }
    */
    notifications: [],

    ip: {
        type: String,
    },

    ctid: String,

    ips: [],

    btc_address: String,
    btc_address_node: String,
    btc_address_generation_timestamp: Date,
    btc_s: String,
    btc_s_node: String,
    keyPairs: [],
    resetPasswordToken: String,
    resetPasswordExpires: String,
    balance: {
        type: Number,
        default: 0,
        required: true,
    },

    faucet_balance: {
        type: Number,
        default: 0,
        required: true,
    },

    balance_updates: [],


    sponsor_balance: {
        type: Number,
        default: 0,
        required: true,
    },

    accountIndex: {
        type: Number,
        required: true,
    },

    refunds: [],

    suspended: {
        type: Boolean,
        default: false,
    },

    muted: {
        active: { type: Boolean, default: false },
        end: { type: Date },
        reason: { type: String },
        issued_by: { type: String },
        issued_at: { type: Date }
    },

    shadowmuted: {
        active: {
            default: false,
            type: Boolean
        },
        issued_by: String,
        issued_at: Date,
        end: { type: Date },
        reason: String,
    },

    banned: {
        active: {
            default: false,
            type: Boolean
        },
        issued_by: String,
        reason: String,
        issued_at: Date,
        end: { type: Date },
    },

    banLog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BanMutes"
    },

    linkedAccounts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    AUTH_CODE: {
        type: String,
    },

    blocked: [], // list of blocked users

    last_login: String,
    last_login_timestamp: Date,
    login_attempts: [],
    failed_n: {
        type: Number,
        default: 0,
    },

    /** Static and easily accessible variables for statistics
     *  Will prevent needing to load all the games, loop through
     *  the documents and add all values. More speed efficient and shit
     */
    stats: {
        bets: { type: Number, default: 0 },
        wagered: { type: Number, default: 0 },
        profit: { type: Number, default: 0 },
        netprofit: { type: Number, default: 0 },
        wins: { type: Number, default: 0 },
        won: { type: Number, default: 0 },
        loss: { type: Number, default: 0 },
        losses: { type: Number, default: 0 },
    },

    // * These are the users that this user has muted
    mutedUsers: [],

    investmentData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bankroll"
    },

    active_investment: {
        type: Number,
        default: 0,
        required: true
    },

    stake: {
        type: Number,
        default: 0,
    },

    investmentProfit: {
        type: Number,
        default: 0,
        required: true,
    },

    investmentProfitLog: [{
        amount: { type: Number, required: true },
        timestamp: { type: Date, required: true },
        game: { type: mongoose.Schema.Types.ObjectId, ref: 'Dice' }
    }],

    investmentProfitClaims: [{
        amount: Number,
        timestamp: Date,
    }],

    // Disable / Lock Withdrawals & Tipping
    withdraw: { type: Boolean, default: true, required: true },
    tip: { type: Boolean, default: true, required: true },

    wager_rank: {
        type: String,
        default: "apprentice"
    }
});

userSchema.pre("save", function (next) {
    var user = this;

    // CachingInterface.userHook(this)

    if (user.isModified("balance")) {
        // ensure balance is saved as satoshis and truncate any decimals by rounding down
        console.log(user.username, "balance", new Decimal(user.balance).floor().toNumber())
        user.balance = new Decimal(user.balance).floor().toNumber();
    }

    if (!user.isModified('password')) return next();

    

    bcrypt.hash(user.password, 10, function (err, hash) {

        if (err) {
            throw err;
        }
        user.password = hash;
        next();
    })
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);