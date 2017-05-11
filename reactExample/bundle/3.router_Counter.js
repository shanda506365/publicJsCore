webpackJsonp([3],{

/***/ 538:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mapStateToProps_ReduxForm = exports.mapStateToProps_Quote = exports.mapStateToProps_Test = exports.mapStateToProps_Counter = exports.mapStateToProps_Main = undefined;

	var _Action = __webpack_require__(539);

	var _Action2 = _interopRequireDefault(_Action);

	var _immutable = __webpack_require__(532);

	var _mapStateToProps_Main = __webpack_require__(540);

	var _mapStateToProps_Main2 = _interopRequireDefault(_mapStateToProps_Main);

	var _mapStateToProps_Counter = __webpack_require__(541);

	var _mapStateToProps_Counter2 = _interopRequireDefault(_mapStateToProps_Counter);

	var _mapStateToProps_Test = __webpack_require__(542);

	var _mapStateToProps_Test2 = _interopRequireDefault(_mapStateToProps_Test);

	var _mapStateToProps_Quote = __webpack_require__(543);

	var _mapStateToProps_Quote2 = _interopRequireDefault(_mapStateToProps_Quote);

	var _mapStateToProps_ReduxForm = __webpack_require__(544);

	var _mapStateToProps_ReduxForm2 = _interopRequireDefault(_mapStateToProps_ReduxForm);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapStateToProps = {
	  mapStateToProps_Main: _mapStateToProps_Main2.default,
	  mapStateToProps_Counter: _mapStateToProps_Counter2.default,
	  mapStateToProps_Test: _mapStateToProps_Test2.default,
	  mapStateToProps_Quote: _mapStateToProps_Quote2.default,
	  mapStateToProps_ReduxForm: _mapStateToProps_ReduxForm2.default
	};

	exports.mapStateToProps_Main = _mapStateToProps_Main2.default;
	exports.mapStateToProps_Counter = _mapStateToProps_Counter2.default;
	exports.mapStateToProps_Test = _mapStateToProps_Test2.default;
	exports.mapStateToProps_Quote = _mapStateToProps_Quote2.default;
	exports.mapStateToProps_ReduxForm = _mapStateToProps_ReduxForm2.default;
	exports.default = mapStateToProps;

/***/ }),

/***/ 539:
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// Action
	var Action = {
		increaseAction: {
			type: 'increase'
		},
		increaseTestAction: {
			type: 'increaseTest'
		},
		navbarClickAction: {
			type: 'navbarClick'
		},
		quote_tabbarClickAction: {
			type: 'quote_tabbarClick'
		},
		pro_stateClickAction: {
			type: 'pro_stateClick'
		},
		formSubmitAction: {
			type: 'formSubmit'
		},
		simpleFormLoadAction: {
			type: 'simpleFormLoad'
		},
		tagSelectAction: {
			type: 'tagSelect'
		}
	};

	exports.default = Action;

/***/ }),

/***/ 540:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Action = __webpack_require__(539);

	var _Action2 = _interopRequireDefault(_Action);

	var _immutable = __webpack_require__(532);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapStateToProps_Main = function mapStateToProps_Main(state, ownProps) {
	  console.log('mapStateToProps_Main', state, ownProps);
	  var rObj = (0, _immutable.fromJS)(state).mergeDeep({
	    stateFlag: 'mapStateToProps_Main'
	  });
	  return rObj.toJSON();
	};

	exports.default = mapStateToProps_Main;

/***/ }),

/***/ 541:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Action = __webpack_require__(539);

	var _Action2 = _interopRequireDefault(_Action);

	var _immutable = __webpack_require__(532);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapStateToProps_Counter = function mapStateToProps_Counter(state, ownProps) {
	  console.log('mapStateToProps_Counter', ownProps);
	  var rObj = (0, _immutable.fromJS)(state).mergeDeep({
	    stateFlag: 'mapStateToProps_Counter'
	  });
	  return rObj.toJSON();
	};

	exports.default = mapStateToProps_Counter;

/***/ }),

/***/ 542:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Action = __webpack_require__(539);

	var _Action2 = _interopRequireDefault(_Action);

	var _immutable = __webpack_require__(532);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapStateToProps_Test = function mapStateToProps_Test(state, ownProps) {
	  console.log('mapStateToProps_Test', ownProps);
	  var rObj = (0, _immutable.fromJS)(state).mergeDeep({
	    stateFlag: 'mapStateToProps_Test'
	  });
	  return rObj.toJSON();
	};

	exports.default = mapStateToProps_Test;

/***/ }),

/***/ 543:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Action = __webpack_require__(539);

	var _Action2 = _interopRequireDefault(_Action);

	var _immutable = __webpack_require__(532);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapStateToProps_Quote = function mapStateToProps_Quote(state, ownProps) {
	  console.log('mapStateToProps_Quote', ownProps);
	  var rObj = (0, _immutable.fromJS)(state).mergeDeep({
	    stateFlag: 'mapStateToProps_Quote'
	  });
	  return rObj.toJSON();
	};

	exports.default = mapStateToProps_Quote;

/***/ }),

/***/ 544:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Action = __webpack_require__(539);

	var _Action2 = _interopRequireDefault(_Action);

	var _immutable = __webpack_require__(532);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapStateToProps_ReduxForm = function mapStateToProps_ReduxForm(state, ownProps) {
	  console.log('mapStateToProps_ReduxForm', state, ownProps);
	  var rObj = (0, _immutable.fromJS)(state).mergeDeep({
	    stateFlag: 'mapStateToProps_ReduxForm'
	  });
	  return rObj.toJSON();
	};

	exports.default = mapStateToProps_ReduxForm;

/***/ }),

/***/ 545:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mapDispatchToProps_ReduxForm = exports.mapDispatchToProps_Quote = exports.mapDispatchToProps_Test = exports.mapDispatchToProps_Count = exports.mapDispatchToProps_Main = exports.mapDispatchToProps_Common = undefined;

	var _Action = __webpack_require__(539);

	var _Action2 = _interopRequireDefault(_Action);

	var _immutable = __webpack_require__(532);

	var _mapDispatchToProps_Common = __webpack_require__(546);

	var _mapDispatchToProps_Common2 = _interopRequireDefault(_mapDispatchToProps_Common);

	var _mapDispatchToProps_Main = __webpack_require__(547);

	var _mapDispatchToProps_Main2 = _interopRequireDefault(_mapDispatchToProps_Main);

	var _mapDispatchToProps_Count = __webpack_require__(548);

	var _mapDispatchToProps_Count2 = _interopRequireDefault(_mapDispatchToProps_Count);

	var _mapDispatchToProps_Test = __webpack_require__(549);

	var _mapDispatchToProps_Test2 = _interopRequireDefault(_mapDispatchToProps_Test);

	var _mapDispatchToProps_Quote = __webpack_require__(550);

	var _mapDispatchToProps_Quote2 = _interopRequireDefault(_mapDispatchToProps_Quote);

	var _mapDispatchToProps_ReduxForm = __webpack_require__(551);

	var _mapDispatchToProps_ReduxForm2 = _interopRequireDefault(_mapDispatchToProps_ReduxForm);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.mapDispatchToProps_Common = _mapDispatchToProps_Common2.default;
	exports.mapDispatchToProps_Main = _mapDispatchToProps_Main2.default;
	exports.mapDispatchToProps_Count = _mapDispatchToProps_Count2.default;
	exports.mapDispatchToProps_Test = _mapDispatchToProps_Test2.default;
	exports.mapDispatchToProps_Quote = _mapDispatchToProps_Quote2.default;
	exports.mapDispatchToProps_ReduxForm = _mapDispatchToProps_ReduxForm2.default;

	var mapDispatchToProps = {
	  mapDispatchToProps_Common: _mapDispatchToProps_Common2.default,
	  mapDispatchToProps_Main: _mapDispatchToProps_Main2.default,
	  mapDispatchToProps_Count: _mapDispatchToProps_Count2.default,
	  mapDispatchToProps_Test: _mapDispatchToProps_Test2.default,
	  mapDispatchToProps_Quote: _mapDispatchToProps_Quote2.default,
	  mapDispatchToProps_ReduxForm: _mapDispatchToProps_ReduxForm2.default
	};
	exports.default = mapDispatchToProps;

/***/ }),

/***/ 546:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Action = __webpack_require__(539);

	var _Action2 = _interopRequireDefault(_Action);

	var _immutable = __webpack_require__(532);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapDispatchToProps_Common = function mapDispatchToProps_Common(dispatch, ownProps) {
	  return {
	    onPro_stateChange: function onPro_stateChange(state) {
	      return dispatch((0, _immutable.fromJS)(_Action2.default.pro_stateClickAction).mergeDeep({
	        state: state
	      }).toJSON());
	    }
	  };
	};

	exports.default = mapDispatchToProps_Common;

/***/ }),

/***/ 547:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Action = __webpack_require__(539);

	var _Action2 = _interopRequireDefault(_Action);

	var _immutable = __webpack_require__(532);

	var _mapDispatchToProps_Common = __webpack_require__(546);

	var _mapDispatchToProps_Common2 = _interopRequireDefault(_mapDispatchToProps_Common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapDispatchToProps_Main = function mapDispatchToProps_Main(dispatch, ownProps) {
	  return (0, _mapDispatchToProps_Common2.default)(dispatch, ownProps);
	};

	exports.default = mapDispatchToProps_Main;

/***/ }),

/***/ 548:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Action = __webpack_require__(539);

	var _Action2 = _interopRequireDefault(_Action);

	var _immutable = __webpack_require__(532);

	var _mapDispatchToProps_Common = __webpack_require__(546);

	var _mapDispatchToProps_Common2 = _interopRequireDefault(_mapDispatchToProps_Common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapDispatchToProps_Count = function mapDispatchToProps_Count(dispatch, ownProps) {
	  return {
	    onIncreaseClick: function onIncreaseClick() {
	      return dispatch(_Action2.default.increaseAction);
	    },
	    onTestValClick: function onTestValClick() {
	      return dispatch({
	        type: ''
	      });
	    },
	    onNavbarClick: function onNavbarClick(e, index) {
	      return dispatch((0, _immutable.fromJS)(_Action2.default.navbarClickAction).mergeDeep({
	        e: e,
	        index: index
	      }).toJSON());
	    }
	  };
	};

	exports.default = mapDispatchToProps_Count;

/***/ }),

/***/ 549:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Action = __webpack_require__(539);

	var _Action2 = _interopRequireDefault(_Action);

	var _immutable = __webpack_require__(532);

	var _mapDispatchToProps_Common = __webpack_require__(546);

	var _mapDispatchToProps_Common2 = _interopRequireDefault(_mapDispatchToProps_Common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapDispatchToProps_Test = function mapDispatchToProps_Test(dispatch, ownProps) {
	  return (0, _immutable.fromJS)({
	    onIncreaseTestClick: function onIncreaseTestClick() {
	      return dispatch({
	        type: 'increaseTest',
	        filter: ownProps
	      });
	    }
	  }).mergeDeep((0, _mapDispatchToProps_Common2.default)(dispatch, ownProps)).toJSON();
	};

	exports.default = mapDispatchToProps_Test;

/***/ }),

/***/ 550:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Action = __webpack_require__(539);

	var _Action2 = _interopRequireDefault(_Action);

	var _immutable = __webpack_require__(532);

	var _mapDispatchToProps_Common = __webpack_require__(546);

	var _mapDispatchToProps_Common2 = _interopRequireDefault(_mapDispatchToProps_Common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapDispatchToProps_Quote = function mapDispatchToProps_Quote(dispatch, ownProps) {
	  return (0, _immutable.fromJS)({
	    onTabbarClick: function onTabbarClick(e, index) {
	      return dispatch((0, _immutable.fromJS)(_Action2.default.quote_tabbarClickAction).mergeDeep({
	        e: e,
	        index: index
	      }).toJSON());
	    }
	  }).mergeDeep((0, _mapDispatchToProps_Common2.default)(dispatch, ownProps)).toJSON();
	};

	exports.default = mapDispatchToProps_Quote;

/***/ }),

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Action = __webpack_require__(539);

	var _Action2 = _interopRequireDefault(_Action);

	var _immutable = __webpack_require__(532);

	var _mapDispatchToProps_Common = __webpack_require__(546);

	var _mapDispatchToProps_Common2 = _interopRequireDefault(_mapDispatchToProps_Common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapDispatchToProps_ReduxForm = function mapDispatchToProps_ReduxForm(dispatch, ownProps) {
	  return (0, _immutable.fromJS)({
	    onFormSubmit: function onFormSubmit(e, values, state, formDataName) {
	      return dispatch((0, _immutable.fromJS)(_Action2.default.formSubmitAction).mergeDeep({
	        e: e,
	        values: values,
	        state: state,
	        formDataName: formDataName
	      }).toJSON());
	    },
	    onSimpleFormLoad: function onSimpleFormLoad() {
	      return dispatch(_Action2.default.simpleFormLoadAction);
	    },
	    onTagSelect: function onTagSelect(e, tagSels) {
	      return dispatch((0, _immutable.fromJS)(_Action2.default.tagSelectAction).mergeDeep({
	        e: e,
	        tagSels: tagSels
	      }).toJSON());
	    }
	  }).mergeDeep((0, _mapDispatchToProps_Common2.default)(dispatch, ownProps)).toJSON();
	};

	exports.default = mapDispatchToProps_ReduxForm;

/***/ }),

/***/ 561:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.con_Counter = exports.Counter = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(64);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(94);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRedux = __webpack_require__(253);

	var _reactRouter = __webpack_require__(272);

	var _MapStateToProps = __webpack_require__(538);

	var _MapDispatchToProps = __webpack_require__(545);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// import WeuiJs from 'weui.js'


	// React component
	var Counter = function (_Component) {
	  _inherits(Counter, _Component);

	  function Counter() {
	    _classCallCheck(this, Counter);

	    return _possibleConstructorReturn(this, (Counter.__proto__ || Object.getPrototypeOf(Counter)).apply(this, arguments));
	  }

	  _createClass(Counter, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var me = this;

	      $('.tabItem').pullToRefresh().on('pull-to-refresh', function (done) {
	        var self = this;
	        console.log('refresh');
	        setTimeout(function () {
	          $(self).pullToRefreshDone();
	        }, 2000);
	      });
	    }
	  }, {
	    key: 'domInit',
	    value: function domInit(navbarHeadDom, tabItemDom, tabIndex, count, onNavbarClick, onIncreaseClick, onTestValClick) {
	      var _loop = function _loop() {
	        var cls = 'weui-navbar__item',
	            tabCls = 'weui-tab__content tabItem  weui-pull-to-refresh h100';
	        if (i == tabIndex) {
	          cls += ' weui-bar__item_on';
	          tabCls = tabCls.replace(/weui-tab__content/g, '');
	        };
	        var index = i;
	        navbarHeadDom.push(_react2.default.createElement(
	          'div',
	          { className: cls, onClick: function onClick(e) {
	              return onNavbarClick(e, index);
	            } },
	          '\u9009\u9879',
	          i
	        ));
	        tabItemDom.push(_react2.default.createElement(
	          'div',
	          { className: tabCls },
	          _react2.default.createElement(
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
	          ),
	          _react2.default.createElement(
	            'h1',
	            { className: 'doc-head' },
	            '\u9875\u9762',
	            i
	          ),
	          _react2.default.createElement(
	            'h4',
	            null,
	            count
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'weui-flex' },
	            _react2.default.createElement(
	              'div',
	              { className: 'weui-flex__item' },
	              _react2.default.createElement(
	                'button',
	                { className: 'weui-btn weui-btn_primary', onClick: onIncreaseClick },
	                '\u8BA1\u6570'
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'weui-flex__item' },
	              _react2.default.createElement(
	                _reactRouter.Link,
	                { className: 'weui-btn weui-btn_default', to: '/Test' },
	                '\u6D88\u606F\u8BA1\u6570'
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'weui-flex__item' },
	              _react2.default.createElement(
	                'button',
	                { className: 'weui-btn weui-btn_primary', onClick: onTestValClick },
	                'testVal'
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'weui-flex__item' },
	              _react2.default.createElement(
	                'button',
	                { className: 'weui-btn weui-btn_primary', onClick: function onClick() {
	                    $.alert('alert');
	                  } },
	                'alert'
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'weui-flex__item' },
	              _react2.default.createElement(
	                'button',
	                { className: 'weui-btn weui-btn_primary', onClick: function onClick() {
	                    test;
	                  } },
	                'testError'
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'content-padded' },
	            _react2.default.createElement(
	              'p',
	              null,
	              ' adsfadfadsfitasdfadfasdfa'
	            ),
	            _react2.default.createElement(
	              'p',
	              null,
	              ' afasdfsadfasdfasdf'
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
	          )
	        ));
	      };

	      for (var i = 0; i < 3; i++) {
	        _loop();
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var me = this;
	      var _props = this.props,
	          onIncreaseClick = _props.onIncreaseClick,
	          onTestValClick = _props.onTestValClick,
	          onNavbarClick = _props.onNavbarClick,
	          _props$counterReducer = _props.counterReducer,
	          tabIndex = _props$counterReducer.tabIndex,
	          count = _props$counterReducer.count;

	      console.log('Counter', this.props);

	      var navbarHeadDom = [],
	          tabItemDom = [];
	      me.domInit(navbarHeadDom, tabItemDom, tabIndex, count, onNavbarClick, onIncreaseClick, onTestValClick);

	      return _react2.default.createElement(
	        'div',
	        { className: 'h100' },
	        _react2.default.createElement(
	          'div',
	          { className: 'weui-tab' },
	          _react2.default.createElement(
	            'div',
	            { className: 'weui-navbar' },
	            navbarHeadDom
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'weui-tab__panel' },
	            tabItemDom
	          )
	        )
	      );
	    }
	  }]);

	  return Counter;
	}(_react.Component);

	var con_Counter = (0, _reactRedux.connect)(_MapStateToProps.mapStateToProps_Counter, _MapDispatchToProps.mapDispatchToProps_Count)(Counter);

	exports.Counter = Counter;
	exports.con_Counter = con_Counter;
	exports.default = con_Counter;

/***/ })

});