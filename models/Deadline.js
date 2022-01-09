const { Schema, model } = require("mongoose");

const DeadlineSchema = Schema({
  weeks: {
    type: Number,
    required: true,
    unique: true,
  },
  normalRate: {
    type: Number,
    required: true,
  },
  punctualRate: {
    type: Number,
    required: true,
  },
});

module.exports = model("Deadline", DeadlineSchema);
