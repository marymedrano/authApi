"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var userSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  role: {
    name: {
      type: String,
      required: true,
      max: 255,
      min: 4
    },
    permissions: {
      type: _mongoose.Schema.Types.Mixed,
      require: true
    }
  },
  date: {
    type: Date,
    "default": Date.now
  }
});

var _default = (0, _mongoose.model)('User', userSchema);

exports["default"] = _default;