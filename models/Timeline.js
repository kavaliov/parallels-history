const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
  shared: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  owner: { type: Types.ObjectId, ref: "User" }
});

module.exports = model("Timeline", schema);
