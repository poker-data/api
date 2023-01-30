const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const networksByZoneSchema = new Schema({
  zones: {
    type: Array,
    required: true,
   },
  networks: {
    type: String,
    required: true,
  },
  delete: {
    type: Boolean,
    default: false,
    required: false,
  },
});

module.exports = mongoose.model('networksByZone', networksByZoneSchema);
