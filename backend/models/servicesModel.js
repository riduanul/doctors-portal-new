const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const servicesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slots: [
    {
      type: String,
      required: true,
    },
  ],
  price: {
    type: Number,
    default: 99,
  },
});

module.exports = mongoose.model("Services", servicesSchema);
