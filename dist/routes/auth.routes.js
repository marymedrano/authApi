"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _user = require("../controllers/user.controller");

var _validateJWT = _interopRequireDefault(require("../middlewares/validateJWT"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/signup', _user.signUp);
router.post('/signin', _user.signIn);
router.post('/', _validateJWT["default"], _user.renewUserToken); //  router.put('/updateUser',updateUser);

router.get('/getUser', _user.getUser);
var _default = router;
exports["default"] = _default;