const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  timelines: [{ type: Types.ObjectId, ref: "Timeline" }]
});

module.exports = model("User", schema);
