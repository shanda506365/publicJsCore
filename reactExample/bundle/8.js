webpackJsonp([8],{

/***/ 1053:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDispatchToProps_Common = undefined;

var _Action = __webpack_require__(352);

var _immutable = __webpack_require__(223);

var _common = __webpack_require__(994);

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchToProps_Common = function mapDispatchToProps_Common(dispatch, ownProps) {
  return {
    onMain_TabbarClick: function onMain_TabbarClick(e, index) {
      dispatch({
        type: 'onMain_TabbarClick_saga',
        e: e,
        index: index,
        ownProps: ownProps
      });
    },
    onMain_TabbarClickOld: function onMain_TabbarClickOld(e, index) {
      dispatch(_Action.Action.Main_TabbarClickAction(e, index));
      (0, _common.Ajax)({
        url: _common.API.login,
        doneFun: function doneFun(msg) {
          var data = JSON.parse(msg);
          if (data.suc) {
            dispatch(_Action.Action.Main_TabbarClickAction(e, index));

            switch (index) {
              case 0:
                ownProps.router.push({
                  pathname: '/'
                });
                return;
              case 1:
                ownProps.router.push({
                  pathname: '/PageTwo'
                });
                return;
              case 2:
                ownProps.router.push({
                  pathname: '/Quote'
                });
                return;
              case 3:
                ownProps.router.push({
                  pathname: '/PageFour'
                });
                return;
              default:
                ownProps.router.push({
                  pathname: '/'
                });
                return;

            }
          } else {
            setTimeout(function () {
              dispatch(_Action.Action.pro_stateClickAction('Resolved'));
            }, 1);
          }
        },
        failFun: function failFun(jqXHR, textStatus) {},
        alwaysFun: function alwaysFun() {},
        props: dispatch
      });
    },
    onPro_stateChange: function onPro_stateChange(state) {
      return dispatch(_Action.Action.pro_stateClickAction(state));
    },
    dispatch: dispatch
  };
};

exports.mapDispatchToProps_Common = mapDispatchToProps_Common;
exports.default = mapDispatchToProps_Common;

/***/ }),

/***/ 1285:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(102);

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

/***/ }),

/***/ 1782:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDispatchToProps_Quote = undefined;

var _Action = __webpack_require__(352);

var _immutable = __webpack_require__(223);

var _mapDispatchToProps_Common = __webpack_require__(1053);

var mapDispatchToProps_Quote = function mapDispatchToProps_Quote(dispatch, ownProps) {
  return (0, _mapDispatchToProps_Common.mapDispatchToProps_Common)(dispatch, ownProps);
  // return fromJS({
  // 	onMain_TabbarClick: (e, index) => dispatch(fromJS(Action.Main_TabbarClickAction).mergeDeep({
  // 		e,
  // 		index
  // 	}).toJSON())
  // }).mergeDeep(mapDispatchToProps_Common(dispatch, ownProps)()).toJSON()
};
exports.mapDispatchToProps_Quote = mapDispatchToProps_Quote;
exports.default = mapDispatchToProps_Quote;

/***/ }),

/***/ 1787:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps_Quote = undefined;

var _immutable = __webpack_require__(223);

var mapStateToProps_Quote = function mapStateToProps_Quote(state, ownProps) {
  var rObj = (0, _immutable.fromJS)(state).mergeDeep({
    stateFlag: 'mapStateToProps_Quote'
  });
  return rObj.toJSON();
};

exports.mapStateToProps_Quote = mapStateToProps_Quote;
exports.default = mapStateToProps_Quote;

/***/ }),

/***/ 377:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.con_Quote = exports.Quote = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(102);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(43);

var _reactRouter = __webpack_require__(103);

var _mapStateToProps_Quote = __webpack_require__(1787);

var _mapDispatchToProps_Quote = __webpack_require__(1782);

var _immutable = __webpack_require__(223);

var _TabBar_Bottom = __webpack_require__(1285);

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

/***/ }),

/***/ 975:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.1.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (true) {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));


/***/ }),

/***/ 994:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.API = undefined;
exports.Ajax = Ajax;
exports.CheckLogin = CheckLogin;

var _jqueryVendor = __webpack_require__(358);

var _jqueryVendor2 = _interopRequireDefault(_jqueryVendor);

var _jsCookie = __webpack_require__(975);

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _immutable = __webpack_require__(223);

var _Action = __webpack_require__(352);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var common = {
   getNagavVersion: function getNagavVersion() {

      //Google Chrome 20 +
      //Apple Safari 4.0+
      //Mozilla Firefox 5.0+
      //Opera 11.0+
      //Microsoft Internet Explorer 9.0+ 
      //Edge

      var Sys = {};
      var ua = navigator.userAgent.toLowerCase();

      var s;
      (s = ua.match(/msie ([\d.]+)/)) ? Sys.isIE = s[1] : (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.isGecko = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.isWebkit = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? Sys.IsOpera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.isSafari = s[1] : (s = ua.match(/iphone os ([\d.]+)/)) ? Sys.isIOS = s[1] : (s = ua.match(/rv:([\d.]+)/)) ? Sys.isEdge = s[1] : 0;
      return Sys;
   },
   createUrl: function createUrl(url) {
      var d = new Date().getTime();
      var keyword = 'randomD';
      // if (url.indexOf(keyword) != -1)
      //var re = /(\w+)=(\w+)/ig
      var re = new RegExp("(" + keyword + ")+=(\\w+)", "gi");
      var mc = url.match(re);

      if (mc && mc.length > 0) url = url.replace(re, '');

      if (url.indexOf('?') == -1) {
         return url + "?" + keyword + "=" + d;
      } else {
         return url + "&" + keyword + "=" + d;
      }
   },
   regex: {
      fail_text: '验证失败',
      empty_text: '不能为空',
      telephone: /^(\d{11}|((\d{3,4}\-)|)\d{7,8}(|([-\u8f6c]{1}\d{1,5})))$/, //^(\d{11})$|^(\+\d{13})$/,
      telephone_partten: '^(\\d{11}||((\\d{3,4}\\-)|)\\d{7,8}(|([-\\u8f6c]{1}\\d{1,5})))$', //'^(\\d{11})$|^(\\+\\d{13})$',
      telephone_text: '请输入正确的手机或座机号码',
      random: /^[0-9]{4}$/,
      random_partten: '^[0-9]{4}$',
      random_text: '请输入正确的授权码',
      password: /^[0-9a-zA-Z]{6,15}$/,
      password_partten: '^[0-9a-zA-Z]{6,15}$',
      password_text: '请输入6到15位密码',
      identical_text: '两次密码不一致',
      repassword_text: '确认密码',
      email_text: '邮箱格式不正确',
      nickname: /^([\w\W]){2,25}$/,
      nickname_partten: '^([\\w\\W]){2,25}$',
      nickname_text: '请输入2到8个字',
      nickname_ph: '2到8个字，建议使用真实姓名，以方便朋友查找',
      company: /^([\w\W]){2,20}$/,
      company_partten: '^([\\w\\W]){2,20}$',
      company_text: '请输入2到20个字',
      company_ph: '2到20个字',
      productName: /^([\w\W]){2,60}$/,
      productName_partten: '^([\\w\\W]){2,150}$',
      productName_text: '请输入2到150个字',
      productName_ph: '2到150个字',
      productTagName: /^([\w\W]){2,16}$/,
      productTagName_partten: '^([\\w\\W]){2,16}$',
      productTagName_text: '请输入2到16个字',
      productTagName_ph: '2到16个字',
      price: /^(0|(0(\.\d{1,2})?)|(([1-6]|\d){0,6}(\.\d{1,2})?))$/,
      price_partten: '^(0|(0(\\.\\d{1,2})?)|(([1-6]|\\d){0,6}(\\.\\d{1,2})?))$',
      price_text: '整数最多6位,若有小数,最多2位',
      price_ph: '正确格式的价格0.00',
      remark: /^([\w\W]){0,100}$/,
      remark_partten: '^([\\w\\W]){0,20}$',
      remark_text: '请输入少于20个字',
      remark_ph: '不能超过20个字'
   },
   feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
   },
   isValidField: function isValidField(form, filedName) {
      var validators = form.options.fields[filedName].validators;
      var flag = true;
      for (var v in validators) {
         var temp = form.getFieldElements(filedName).data('bv.result.' + v);
         if (temp == 'INVALID') {
            return false;
         }
      }
      return flag;
   },
   initDragScroll: function initDragScroll() {
      var _y;
      var scrolling = false;
      document.onmousedown = function (e) {
         var e = window.event || e;
         _y = e.clientY;
         scrolling = true;
      };
      document.onmousemove = function (e) {
         if (!scrolling) return;
         var e = window.event || e;
         var move = (e.clientY - _y) / 4;
         if ((0, _jqueryVendor2.default)('.mdivR .fixed-table-body').length > 0) {
            var scrollTop = (0, _jqueryVendor2.default)('.fixed-table-body').scrollTop();
            (0, _jqueryVendor2.default)('.fixed-table-body').scrollTop(scrollTop + move);
         } else {
            var scrollTop = (0, _jqueryVendor2.default)('.mdivR').scrollTop();
            (0, _jqueryVendor2.default)('.mdivR').scrollTop(scrollTop + move);
         }
      };

      document.onmouseup = function () {
         scrolling = false;
      };
   },
   layout: function layout() {
      if ((0, _jqueryVendor2.default)('.htmlbody').width() <= 768) {
         (0, _jqueryVendor2.default)('.htmlbody').css({
            overflow: 'auto'
         });
         (0, _jqueryVendor2.default)('.mdivL,.mdivR').css({
            'height': '100%',
            overflow: 'hidden'
         });
         if ((0, _jqueryVendor2.default)('.mdivR .fixed-table-container').length > 0) {
            var height = '100%'; //- 500
            //dd
            (0, _jqueryVendor2.default)('.mdivR').css({
               'height': height + (0, _jqueryVendor2.default)('.fixed-table-container').data('mheight'),
               overflow: 'hidden'
            });
            (0, _jqueryVendor2.default)('.fixed-table-container').css('height', height);
            var options = (0, _jqueryVendor2.default)('#table').bootstrapTable('getOptions');
            options.height = height;
            (0, _jqueryVendor2.default)('#table').bootstrapTable('refreshOptions', options);
         }
      } else {
         (0, _jqueryVendor2.default)('.htmlbody').css({
            overflow: 'hidden'
         });
         (0, _jqueryVendor2.default)('.mdivL,.mdivR').css({
            'height': document.documentElement.clientHeight, //- 200,
            overflow: 'auto'
         });
         if ((0, _jqueryVendor2.default)('.mdivR .fixed-table-container').length > 0) {
            (0, _jqueryVendor2.default)('.mdivL,.mdivR').css({
               'height': document.documentElement.clientHeight, //- 200,
               overflow: 'hidden'
            });
            var _height = document.documentElement.clientHeight - (0, _jqueryVendor2.default)('.fixed-table-container').data('mheight');
            (0, _jqueryVendor2.default)('.fixed-table-container').css('height', _height);
            var _options = (0, _jqueryVendor2.default)('#table').bootstrapTable('getOptions');
            _options.height = _height;
            (0, _jqueryVendor2.default)('#table').bootstrapTable('refreshOptions', _options);
            (0, _jqueryVendor2.default)('#table').bootstrapTable('resetWidth');
         }
      }
   }
};
Array.prototype.clone = function () {
   return this.slice(0);
};
Array.prototype.remove = function (val) {
   var index = this.indexOf(val);
   if (index > -1) {
      this.splice(index, 1);
   }
};
Array.prototype.removeObj = function (objVal, srcKey) {
   var ix = -1;
   for (var i = 0; i < this.length; i++) {
      if (this[i][srcKey] == objVal) {
         ix = i;
      }
   }
   this.splice(ix, 1);
};
Array.prototype.replaceObj = function (srcKey, newItem) {
   var ix = -1;
   for (var i = 0; i < this.length; i++) {
      if (this[i][srcKey] == newItem[srcKey]) {
         ix = i;
         this[i] = newItem;
      }
   }
};
String.prototype.trim = function () {
   return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.ltrim = function () {
   return this.replace(/(^\s*)/g, "");
};
String.prototype.rtrim = function () {
   return this.replace(/(\s*$)/g, "");
};
Date.prototype.format = function (format) {
   var o = {
      "M+": this.getMonth() + 1, //month
      "d+": this.getDate(), //day
      "h+": this.getHours(), //hour
      "m+": this.getMinutes(), //minute
      "s+": this.getSeconds(), //second
      "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
      "S": this.getMilliseconds() //millisecond
   };

   if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
   }

   for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
         format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
   }
   return format;
};

//异常日志
var Console_URL = (0, _jqueryVendor2.default)('head link[rel="console"]').attr('href');
if (Console_URL) {
   window.onerror = function (iMessage, iURL, iLine, iColumn, iError) {
      window.setTimeout(function () {

         var iData = {
            message: iMessage,
            url: iURL,
            line: iLine,
            column: iColumn || window.event && window.event.errorCharacter || 0
         };

         if (iError && iError.stack) iData.stack = (iError.stack || iError.stacktrace).toString();

         if (Console_URL) {
            if (iData.stack) _jqueryVendor2.default.post(Console_URL, iData);else _jqueryVendor2.default.get(Console_URL, iData);
         }
      }, 0);
      return true;
   };
   //window.console = function(){}
};

function Ajax(_ref, loadmask) {
   var url = _ref.url,
       data = _ref.data,
       method = _ref.method,
       doneFun = _ref.doneFun,
       failFun = _ref.failFun,
       alwaysFun = _ref.alwaysFun,
       context = _ref.context,
       props = _ref.props;


   _jqueryVendor2.default.ajax({
      method: method || "POST",
      url: url,
      beforeSend: function beforeSend(xhr) {
         if (loadmask != false) {
            if (typeof props == 'function') {
               props(_Action.Action.pro_stateClickAction({ state: 'Pending' }));
            } else {
               props.onPro_stateChange('Pending');
            }
         }
      },
      data: data || {}
   }).done(function (msg) {
      var data = JSON.parse(msg);
      //登录信息验证
      if (data.code == '99') {
         _jsCookie2.default.remove('hasLogin');
         if (typeof props == 'function') {
            props((0, _immutable.fromJS)(_Action.Action.pro_stateClickAction).mergeDeep({
               state: 'Rejected'
            }).toJSON());
         } else {
            props.onPro_stateChange('Rejected');
         }
         return;
      }
      if (doneFun && typeof doneFun === 'function') {
         doneFun(msg);
      }
   }).fail(function (jqXHR, textStatus, errorThrown) {

      if (failFun && typeof failFun === 'function') {
         failFun(jqXHR, textStatus, errorThrown);
      }
   }).always(function () {
      if (alwaysFun && typeof alwaysFun === 'function') {
         alwaysFun();
      }

      if (loadmask != false) {
         if (typeof props == 'function') {
            props(_Action.Action.pro_stateClickAction({ state: 'Resolved' }));
         } else {
            props.onPro_stateChange('Resolved');
         }
      }
   });
}

function CheckLogin(nextState, replace) {
   var ck = _jsCookie2.default.get('hasLogin');
   if (typeof ck == 'undefined' || ck == false) {
      replace({
         pathname: '/Login',
         state: {
            backurl: nextState.location.pathname
         }
      });
   }
}
var apiPreFix = 'http://192.168.91.33/'; //'/'// 
// const apiPreFix = '/' // 
var iAPI = {
   login: apiPreFix + "quote/init",
   announcement: apiPreFix + 'announcement/getLatest',
   getBarcode: apiPreFix + "common/login/getQRcodePng",
   logout: apiPreFix + "common/logout",
   productIndex: apiPreFix + 'product/index',
   productAdd: apiPreFix + 'product/add',
   productEdit: apiPreFix + 'product/update',
   productDel: apiPreFix + 'product/delete',
   productBatchDel: apiPreFix + 'product/deleteBatch',
   productSort: apiPreFix + 'product/sort',
   productDownload: apiPreFix + 'product/download',
   productLog: apiPreFix + 'product/log',
   productExport: apiPreFix + 'product/export',
   clearData: apiPreFix + 'productTag/deleteAll',
   productDownloadTemplate: apiPreFix + 'images/aibaojia.csv',
   productUpload: apiPreFix + 'product/upload',
   productTagIndex: apiPreFix + 'productTag/index',
   productTagAdd: apiPreFix + 'productTag/add',
   productTagEdit: apiPreFix + 'productTag/update',
   productTagDel: apiPreFix + 'productTag/delete',
   productTagBatchDel: apiPreFix + 'productTag/deleteBatch',
   productTagSort: apiPreFix + 'productTag/sort',
   productTag: apiPreFix + 'productTag/all',
   customerIndex: apiPreFix + 'clientUser/index',
   customerEdit: apiPreFix + 'clientUser/update',
   customerDel: apiPreFix + 'clientUser/delete',
   customerBatchDel: apiPreFix + 'clientUser/deleteBatch',
   customerBatchLevel: apiPreFix + 'clientUser/batchUpdateClientLevel',
   customerSort: apiPreFix + 'clientUser/sort',
   userIndex: apiPreFix + 'userInfo/index',
   companyEdit: apiPreFix + 'company/update',
   userEdit: apiPreFix + 'userInfo/update',
   addaccountIndex: apiPreFix + 'company/searchUser',
   addaccountAdd: apiPreFix + 'company/addUserToCompany',
   accountIndex: apiPreFix + 'company/users',
   accountEdit: apiPreFix + 'company/setAdmin',
   accountDel: apiPreFix + 'company/outCompany',
   sendAllMes: apiPreFix + 'pushMessage/push'
};
exports.API = iAPI;
exports.default = common;

// 	(function(w) {
// 		w.getNagavVersion = function() {
// 			var Sys = {}
// 			var ua = navigator.userAgent.toLowerCase()
// 			var s
// 			(s = ua.match(/msie ([\d.]+)/)) ? Sys.isIE = s[1]:
// 				(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.isGecko = s[1] :
// 				(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.isWebkit = s[1] :
// 				(s = ua.match(/opera.([\d.]+)/)) ? Sys.IsOpera = s[1] :
// 				(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.isSafari = s[1] :
// 				(s = ua.match(/rv:([\d.]+)/)) ? Sys.isEdge = s[1] : 0

// 			return Sys
// 		}
// 	})(window)

// }

/***/ })

});