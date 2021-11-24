"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var validateJWT = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var tokenreq, token, _jwt$verify, id, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tokenreq = req.headers.authorization;

            if (tokenreq) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              msg: 'There is no token on the request'
            }));

          case 3:
            _context.prev = 3;
            token = tokenreq.slice(7);
            _jwt$verify = _jsonwebtoken["default"].verify(token, process.env.TOKEN_SECRET), id = _jwt$verify.id;
            _context.next = 8;
            return _User["default"].findById(id);

          case 8:
            user = _context.sent;

            if (!user) {
              res.status(401).json({
                msg: 'Invalid token'
              });
            }

            req.user = user;
            next();
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](3);
            res.status(401).json({
              msg: 'Invalid token'
            });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 14]]);
  }));

  return function validateJWT(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = validateJWT;
exports["default"] = _default;