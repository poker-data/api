const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const excludedKeywordsSchema = new Schema({
  keyword: {
    type: String,
    required: true,
    unique: true,
   },
  delete: {
    type: Boolean,
    default: false,
    required: false,
  },
});

module.exports = mongoose.model('excludedKeywords', excludedKeywordsSchema);
