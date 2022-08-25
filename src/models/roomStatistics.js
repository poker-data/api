const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomStatistics = new Schema({
    username: {
        type: String,
    },
    room: {
        type: String,
    },
    profile: {
        type: String,
    },
    profit: {
        type: String,
    },
    avprofit: {
        type: String,
    },
    totalroi: {
        type: String,
    },
    avroi: {
        type: String,
    },
    activedays: {
        type: String,
    },
    itm: {
        type: String,
    },
    avgamesday: {
        type: String,
    },
    ability: {
        type: String,
    },
    turbo: {
        type: String,
    },
    hyper: {
        type: String,
    },
    itmpercent: {
        type: String,
    },
    reqbankroll: {
        type: String,
    },
    winningdays: {
        type: String,
    },
    losingdays: {
        type: String,
    },
    delete: {
        type: Boolean,
        default: false,
        required: false,
    },
});

module.exports = mongoose.model("roomStatistics", roomStatistics);
