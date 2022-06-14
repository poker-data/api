const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  concepts: {
    type: Array,
    default: [],
  },
  title: {
    type: String,
    ref: "title",
  },
  cost: {
    type: Number,
    ref: "cost",
  },
  customertId: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    ref: "work",
  }, 
  delete: {
    type: Boolean,
    default: false,
    required: false,
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
