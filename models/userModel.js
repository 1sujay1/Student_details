const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema(
  {
    name: String,
    // email: { type: String, unique: true },
    // mobile: { type: String, unique: true },
    totalMarks: Number,
    // img_url: String,
    roles: [],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", UsersSchema);
