const mongodb = require("mongodb");
const mongoose = require("mongoose");

const admin_schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  useremail: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Admin", admin_schema);
