const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
  from: { type: Number, required: true },
  to: { type: Number, default: 0 },
  description: { type: String, default: "" },
  timeline: { type: Types.ObjectId, ref: "Timeline" },
  owner: { type: Types.ObjectId, ref: "User" }
});

module.exports = model("Period", schema);
