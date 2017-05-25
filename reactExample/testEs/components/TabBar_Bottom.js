'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabBar_Bottom = function (_Component) {
  _inherits(TabBar_Bottom, _Component);

  function TabBar_Bottom() {
    _classCallCheck(this, TabBar_Bottom);

    return _possibleConstructorReturn(this, (TabBar_Bottom.__proto__ || Object.getPrototypeOf(TabBar_Bottom)).apply(this, arguments));
  }

  _createClass(TabBar_Bottom, [{
    key: 'choseBarItemCls',
    value: function choseBarItemCls(flag) {
      return "weui-tabbar__item " + (flag ? 'weui-bar__item_on' : '');
    }
  }, {
    key: 'TabBar',
    value: function TabBar() {
      var me = this,
          arry = me.props.items || [];
      var itemIndex = me.props.itemIndex || 0;
      return arry.map(function (item, index, all) {
        return _react2.default.createElement(
          'a',
          { href: 'javascript:;', className: me.choseBarItemCls(index == itemIndex),
            onClick: function onClick(e) {
              return me.props.onTabClick(e, index);
            } },
          _react2.default.createElement('span', { className: item.iconCls }),
          _react2.default.createElement(
            'p',
            { className: 'weui-tabbar__label' },
            item.label
          )
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'weui-tabbar' },
        this.TabBar()
      );
    }
  }]);

  return TabBar_Bottom;
}(_react.Component);

exports.default = TabBar_Bottom;