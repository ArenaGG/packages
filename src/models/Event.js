const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    source: String,
    sourceId: String,
    amount: Number,
    userId: mongoose.Types.ObjectId,
    timestamp: {
        type: Date, 
        default: Date.now(),
    },
    metadata: {},
})

module.exports = mongoose.model("Event", EventSchema);