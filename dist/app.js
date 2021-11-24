"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('dotenv').config();

// Initializations
var app = (0, _express["default"])(); // Settings

app.set('port', process.env.PORT); // Middlewares

app.use(_express["default"].json());
app.use((0, _cors["default"])()); // Route Middlewares

app.use('/api/user', _auth["default"]);
var _default = app;
exports["default"] = _default;