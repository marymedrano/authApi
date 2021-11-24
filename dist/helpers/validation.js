"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginValidation = exports.registerValidation = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Validation
// Register Validation
var registerValidation = function registerValidation(data) {
  var schema = _joi["default"].object({
    name: _joi["default"].string().min(6).required(),
    email: _joi["default"].string().min(6).required().email(),
    password: _joi["default"].string().min(6).required(),
    role: _joi["default"].required()
  });

  return schema.validate(data);
}; // Login Validation


exports.registerValidation = registerValidation;

var loginValidation = function loginValidation(data) {
  var schema = _joi["default"].object({
    user: _joi["default"].string().min(6).required(),
    password: _joi["default"].string().min(6).required()
  });

  return schema.validate(data);
};

exports.loginValidation = loginValidation;