'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.con_Quote = exports.Quote = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _mapStateToProps_Quote = require('./lib/States/mapStateToProps_Quote');

var _mapDispatchToProps_Quote = require('./lib/Dispathes/mapDispatchToProps_Quote');

var _immutable = require('immutable');

var _TabBar_Bottom = require('./components/TabBar_Bottom');

var _TabBar_Bottom2 = _interopRequireDefault(_TabBar_Bottom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Quote = function (_Component) {
  _inherits(Quote, _Component);

  function Quote() {
    _classCallCheck(this, Quote);

    return _possibleConstructorReturn(this, (Quote.__proto__ || Object.getPrototypeOf(Quote)).apply(this, arguments));
  }

  _createClass(Quote, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          onMain_TabbarClick = _props.onMain_TabbarClick,
          onPro_stateChange = _props.onPro_stateChange,
          me = this;

      $('.barpanel').pullToRefresh().on('pull-to-refresh', function (done) {
        var self = this;
        console.log('refresh');
        setTimeout(function () {
          $(self).pullToRefreshDone();
        }, 2000);
      });
      $('.weui-tab__panel').css('height', document.body.clientHeight - 50);
    }
  }, {
    key: 'choseBarItemCls',
    value: function choseBarItemCls(index) {
      var tabIndex = this.props.V3DemoReducer.V3_Main.tabIndex,
          me = this;
      return "weui-tabbar__item " + (tabIndex == index ? 'weui-bar__item_on' : '');
    }
  }, {
    key: 'choseBarPanelCls',
    value: function choseBarPanelCls(index) {
      return 0 == index ? 'barpanel weui-pull-to-refresh' : 'barpanel hide weui-pull-to-refresh';
    }
  }, {
    key: 'domInit',
    value: function domInit(param) {
      var me = this;

      var pullDiv = [_react2.default.createElement(
        'div',
        { className: 'weui-pull-to-refresh__layer' },
        _react2.default.createElement('div', { className: 'weui-pull-to-refresh__arrow' }),
        _react2.default.createElement('div', { className: 'weui-pull-to-refresh__preloader' }),
        _react2.default.createElement(
          'div',
          { className: 'down' },
          '\u4E0B\u62C9\u5237\u65B0'
        ),
        _react2.default.createElement(
          'div',
          { className: 'up' },
          '\u91CA\u653E\u5237\u65B0'
        ),
        _react2.default.createElement(
          'div',
          { className: 'refresh' },
          '\u6B63\u5728\u5237\u65B0'
        )
      )];
      param.barPanelDom.push(_react2.default.createElement(
        'div',
        { className: me.choseBarPanelCls(0) },
        pullDiv,
        _react2.default.createElement(
          'div',
          { className: 'weui-flex' },
          _react2.default.createElement(
            'div',
            { className: 'weui-flex__item' },
            _react2.default.createElement(
              'button',
              { className: 'weui-btn weui-btn_primary', onClick: function onClick() {
                  return param.onPro_stateChange('Rejected');
                } },
              'Rejected'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'weui-flex__item' },
            _react2.default.createElement(
              'button',
              { className: 'weui-btn weui-btn_primary', onClick: function onClick() {
                  return param.onPro_stateChange('Pending');
                } },
              'Pending'
            )
          )
        ),
        'Page 3',
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            _reactRouter.Link,
            { className: 'weui-btn weui-btn_default', to: '/' },
            'tttt'
          ),
          'afasdfsadfasdfasdf'
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        '2',
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        '2',
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          'p',
          null,
          ' 234234213412341234'
        )
      ));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          onMain_TabbarClick = _props2.onMain_TabbarClick,
          onPro_stateChange = _props2.onPro_stateChange,
          _props2$V3DemoReducer = _props2.V3DemoReducer.V3_Main,
          tabIndex = _props2$V3DemoReducer.tabIndex,
          tabbar_bottom_items = _props2$V3DemoReducer.tabbar_bottom_items,
          me = this;

      var barPanelDom = [];
      me.domInit({
        onMain_TabbarClick: onMain_TabbarClick,
        barPanelDom: barPanelDom,
        onPro_stateChange: onPro_stateChange
      });

      return _react2.default.createElement(
        'div',
        { className: 'v3_quote weui-tab' },
        _react2.default.createElement(
          'div',
          { className: 'weui-tab__panel' },
          barPanelDom
        ),
        _react2.default.createElement(_TabBar_Bottom2.default, { items: tabbar_bottom_items, onTabClick: onMain_TabbarClick,
          itemIndex: 2 })
      );
    }
  }]);

  return Quote;
}(_react.Component);

var con_Quote = (0, _reactRedux.connect)(_mapStateToProps_Quote.mapStateToProps_Quote, _mapDispatchToProps_Quote.mapDispatchToProps_Quote)(Quote);

exports.Quote = Quote;
exports.con_Quote = con_Quote;
exports.default = con_Quote;