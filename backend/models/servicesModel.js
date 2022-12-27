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
});

module.exports = mongoose.model("Services", servicesSchema);
