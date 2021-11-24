"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

_mongoose["default"].connect(process.env.DB_CONNECT, dbOptions);

_mongoose["default"].connection.once('open', function () {
  console.log('Database Connection stablished');
});

_mongoose["default"].connection.on('error', function (err) {
  console.log(err);
  process.exit(0);
});