"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renewUserToken = exports.signIn = exports.signUp = void 0;

require("regenerator-runtime/runtime");

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _validation = require("../helpers/validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function createToken(user) {
  return _jsonwebtoken["default"].sign({
    id: user._id
  }, process.env.TOKEN_SECRET, {
    expiresIn: 86400
  });
}

var signUp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _registerValidation, error, emailExist, salt, hashedPassword, user, savedUser;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Validate the data
            _registerValidation = (0, _validation.registerValidation)(req.body), error = _registerValidation.error;

            if (!error) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).send(error.details[0].message));

          case 3:
            _context.next = 5;
            return _User["default"].findOne({
              email: req.body.email
            });

          case 5:
            emailExist = _context.sent;

            if (!emailExist) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.status(400).send('Email already exist'));

          case 8:
            _context.next = 10;
            return _bcryptjs["default"].genSalt(10);

          case 10:
            salt = _context.sent;
            _context.next = 13;
            return _bcryptjs["default"].hash(req.body.password, salt);

          case 13:
            hashedPassword = _context.sent;
            // Create a new user
            user = new _User["default"]({
              name: req.body.name,
              email: req.body.email,
              password: hashedPassword,
              role: req.body.role
            });
            _context.prev = 15;
            _context.next = 18;
            return user.save();

          case 18:
            savedUser = _context.sent;
            return _context.abrupt("return", res.status(201).json({
              user: savedUser,
              token: createToken(savedUser)
            }));

          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](15);
            return _context.abrupt("return", res.status(400).send(_context.t0));

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[15, 22]]);
  }));

  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signUp = signUp;

var signIn = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _loginValidation, error, user, validPass;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // Validate the data
            _loginValidation = (0, _validation.loginValidation)(req.body), error = _loginValidation.error;

            if (!error) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(400).send(error.details[0].message));

          case 3:
            _context2.next = 5;
            return _User["default"].findOne({
              name: req.body.user
            });

          case 5:
            user = _context2.sent;

            if (user) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.status(400).send('User or password are wrong'));

          case 8:
            _context2.next = 10;
            return _bcryptjs["default"].compare(req.body.password, user.password);

          case 10:
            validPass = _context2.sent;

            if (validPass) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", res.status(400).send('User or password are wrong'));

          case 13:
            return _context2.abrupt("return", res.status(200).json({
              role: user.role,
              token: createToken(user)
            }));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function signIn(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signIn = signIn;

var renewUserToken = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", res.status(200).json({
              role: req.user.role,
              token: createToken(req.user)
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function renewUserToken(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.renewUserToken = renewUserToken;