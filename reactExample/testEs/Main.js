'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.con_Main = exports.Main = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

require('!style!css!less!../less/index.less');

var _mapStateToProps_Main = require('./lib/States/mapStateToProps_Main');

var _mapDispatchToProps_Main = require('./lib/Dispathes/mapDispatchToProps_Main');

require('./../css/iconfont.css');

var _common = require('./lib/common');

var _common2 = _interopRequireDefault(_common);

var _mockData = require('./mockData/mockData');

var _mockData2 = _interopRequireDefault(_mockData);

require('!style!css!less!../node_modules/weui/src/style/weui.less');

require('!style!css!less!../node_modules/jquery-weui/dist/css/jquery-weui.css');

var _jqueryWeui = require('../node_modules/jquery-weui/dist/js/jquery-weui');

var _jqueryWeui2 = _interopRequireDefault(_jqueryWeui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import FastClick from '../node_modules/jquery-weui/dist/lib/fastclick'

// React component
var Main = function (_Component) {
  _inherits(Main, _Component);

  function Main() {
    _classCallCheck(this, Main);

    return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
  }

  _createClass(Main, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var me = this;
      // FastClick.attach(document.body); 
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          onPro_stateChange = _props.onPro_stateChange,
          pro_state = _props.V3DemoReducer.pro_state,
          me = this;

      return _react2.default.createElement(
        'div',
        { className: 'h100' },
        this.props.children,
        _react2.default.createElement(
          'div',
          { className: pro_state == 'Pending' ? 'showLoading' : 'hide' },
          _react2.default.createElement('div', { className: 'weui-mask_transparent' }),
          _react2.default.createElement(
            'div',
            { className: 'weui-toast' },
            _react2.default.createElement('i', { className: 'weui-loading weui-icon_toast' }),
            _react2.default.createElement(
              'p',
              { className: 'weui-toast__content' },
              '\u6570\u636E\u52A0\u8F7D\u4E2D'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: pro_state == 'Rejected' ? 'showDialog' : 'hide' },
          _react2.default.createElement('div', { className: 'weui-mask' }),
          _react2.default.createElement(
            'div',
            { className: 'weui-dialog' },
            _react2.default.createElement(
              'div',
              { className: 'weui-dialog__hd' },
              _react2.default.createElement(
                'strong',
                { className: 'weui-dialog__title' },
                '\u5F39\u7A97\u6807\u9898'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'weui-dialog__bd' },
              '\u5F39\u7A97\u5185\u5BB9\uFF0C\u544A\u77E5\u5F53\u524D\u9875\u9762\u4FE1\u606F\u7B49'
            ),
            _react2.default.createElement(
              'div',
              { className: 'weui-dialog__ft' },
              _react2.default.createElement(
                'a',
                { href: 'javascript:;',
                  className: 'weui-dialog__btn weui-dialog__btn_primary', onClick: function onClick() {
                    return onPro_stateChange('Resolved');
                  } },
                '\u786E\u5B9A'
              )
            )
          )
        )
      );
    }
  }]);

  return Main;
}(_react.Component);

var con_Main = (0, _reactRedux.connect)(_mapStateToProps_Main.mapStateToProps_Main, _mapDispatchToProps_Main.mapDispatchToProps_Main)(Main);

exports.Main = Main;
exports.con_Main = con_Main;
exports.default = con_Main;