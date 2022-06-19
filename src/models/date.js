const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const date = new Schema({
    name: {
        type: String,
        ref: "name",
    },
    day: {
        type: Date,
        ref: "day",
        required: true
    },
    schedule: {
        type: String,
        ref: "schedule",
        required: true
    },
    service: {
        type: String,
        ref: "service",
        required: true
    },
    receiver: {
        type: String,
        ref: "receiver",
        required: true
    },
    email: {
        type: String,
        ref: "email",
    },
    phone: {
        type: String,
        ref: "phone",
    },
    amount: {
        type: Number,
        ref: "amount",
        required: true
    },
    delete: {
        type: Boolean,
        default: false,
        required: false,
    },
});

module.exports = mongoose.model("Date", date);
