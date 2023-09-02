const User = require("./models/User");
const Coinflip = require("./models/Coinflip");
const Jackpot = require("./models/Jackpot");

exports.models = {
    User, 
    Coinflip, 
    Jackpot
}

exports.utils = {
    convertDenomination: require("./utils/denomination")
}