const mongoose = require("mongoose")

const User = require("./models/User");
const Coinflip = require("./models/Coinflip");
const Jackpot = require("./models/Jackpot");

let isConnected = false;

exports.connectToDb = async (uri, options = {}) => {
    if (isConnected) return;
    await mongoose.connect(uri, {...options})
} 

exports.models = {
    User, 
    Coinflip, 
    Jackpot
}

exports.utils = {
    convertDenomination: require("./utils/denomination")
}