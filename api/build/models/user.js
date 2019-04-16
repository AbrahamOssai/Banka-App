"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
  function User() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        firstName = _ref.firstName,
        lastName = _ref.lastName,
        email = _ref.email,
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? 'user' : _ref$type,
        _ref$isAdmin = _ref.isAdmin,
        isAdmin = _ref$isAdmin === void 0 ? false : _ref$isAdmin;

    _classCallCheck(this, User);

    this.id = null;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.type = type;
    this.isAdmin = isAdmin;
  }

  _createClass(User, [{
    key: "getId",
    value: function getId() {
      return this.id;
    }
  }, {
    key: "setId",
    value: function setId(id) {
      this.id = id;
    }
  }]);

  return User;
}();

var _default = User;
exports["default"] = _default;