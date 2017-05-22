webpackJsonp([8],{

/***/ 1161:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mapDispatchToProps_Common = undefined;

	var _Action = __webpack_require__(1056);

	var _immutable = __webpack_require__(532);

	var _common = __webpack_require__(1057);

	var _common2 = _interopRequireDefault(_common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapDispatchToProps_Common = function mapDispatchToProps_Common(dispatch, ownProps) {
	  return {
	    onMain_TabbarClick: function onMain_TabbarClick(e, index) {
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

/***/ 1162:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.con_PageOne = exports.PageOne = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(64);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(94);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRedux = __webpack_require__(253);

	var _reactRouter = __webpack_require__(272);

	var _mapStateToProps_PageOne = __webpack_require__(1163);

	var _mapDispatchToProps_PageOne = __webpack_require__(1164);

	var _common = __webpack_require__(1057);

	var _common2 = _interopRequireDefault(_common);

	var _immutable = __webpack_require__(532);

	var _mockData = __webpack_require__(1157);

	var _mockData2 = _interopRequireDefault(_mockData);

	var _TabBar_Bottom = __webpack_require__(1165);

	var _TabBar_Bottom2 = _interopRequireDefault(_TabBar_Bottom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PageOne = function (_Component) {
		_inherits(PageOne, _Component);

		function PageOne() {
			_classCallCheck(this, PageOne);

			return _possibleConstructorReturn(this, (PageOne.__proto__ || Object.getPrototypeOf(PageOne)).apply(this, arguments));
		}

		_createClass(PageOne, [{
			key: 'componentDidMount',

			// shouldComponentUpdate(nextProps, nextState) {
			// 	const thisProps = this.props || {},
			// 		thisState = this.state || {};
			// 	const map1 = fromJS(thisProps['V3DemoReducer'].V3_Main)
			// 	const map2 = fromJS(nextProps['V3DemoReducer'].V3_Main)

			// 	console.log('shouldComponentUpdate', !is(map1, map2))
			// 	return !is(map1, map2)
			// }
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

				// Ajax({
				// 	url: API.login,
				// 	doneFun: function(msg) {
				// 		let data = JSON.parse(msg)
				// 		console.log('API.login', data)
				// 		if (data.suc) {
				// 			//onMain_TabbarClick(null, 2)
				// 		} else {
				// 			setTimeout(function() {
				// 				onPro_stateChange('Rejected')
				// 			}, 1)

				// 		}
				// 	},
				// 	failFun: function(jqXHR, textStatus) {

				// 	},
				// 	alwaysFun: function() {}, 
				// 	props: me.props
				// })
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
				var me = this,
				    router = this.props.router;

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
					'Page 1',
					_react2.default.createElement(
						'p',
						null,
						' ',
						_react2.default.createElement(
							_reactRouter.Link,
							{ className: 'weui-btn weui-btn_default', to: '/Quote' },
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
					),
					_react2.default.createElement(
						'div',
						{ className: 'weui-grids' },
						_react2.default.createElement(
							'a',
							{ href: 'javascript:;', className: 'weui-grid' },
							_react2.default.createElement(
								'div',
								{ className: 'weui-grid__icon' },
								_react2.default.createElement('span', { className: 'iconfont icon-fuzhi weui-tabbar__icon' })
							),
							_react2.default.createElement(
								'p',
								{ className: 'weui-grid__label' },
								'Button'
							)
						),
						_react2.default.createElement(
							'a',
							{ href: 'javascript:;', className: 'weui-grid' },
							_react2.default.createElement(
								'div',
								{ className: 'weui-grid__icon' },
								_react2.default.createElement('img', { src: './images/icon_nav_cell.png', alt: '' })
							),
							_react2.default.createElement(
								'p',
								{ className: 'weui-grid__label' },
								'Cell'
							)
						),
						_react2.default.createElement(
							'a',
							{ href: 'javascript:;', className: 'weui-grid' },
							_react2.default.createElement(
								'div',
								{ className: 'weui-grid__icon' },
								_react2.default.createElement('img', { src: './images/icon_nav_cell.png', alt: '' })
							),
							_react2.default.createElement(
								'p',
								{ className: 'weui-grid__label' },
								'Cell'
							)
						),
						_react2.default.createElement(
							'a',
							{ href: 'javascript:;', className: 'weui-grid' },
							_react2.default.createElement(
								'div',
								{ className: 'weui-grid__icon' },
								_react2.default.createElement('img', { src: './images/icon_nav_cell.png', alt: '' })
							),
							_react2.default.createElement(
								'p',
								{ className: 'weui-grid__label' },
								'Cell'
							)
						)
					)
				));
			}
		}, {
			key: 'render',
			value: function render() {
				// setTimeout(function() {
				// 	hashHistory.push({
				// 		pathname:'/Quote'
				// 	})
				// },2000) 
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
					{ className: 'v3_main weui-tab', onTouchMove: function onTouchMove() {
							console.log('onTouchMove');
						} },
					_react2.default.createElement(
						'div',
						{ className: 'weui-tab__panel' },
						barPanelDom
					),
					_react2.default.createElement(_TabBar_Bottom2.default, { items: tabbar_bottom_items, onTabClick: onMain_TabbarClick,
						itemIndex: 0 })
				);
			}
		}]);

		return PageOne;
	}(_react.Component);

	var con_PageOne = (0, _reactRedux.connect)(_mapStateToProps_PageOne.mapStateToProps_PageOne, _mapDispatchToProps_PageOne.mapDispatchToProps_PageOne)(PageOne);

	exports.PageOne = PageOne;
	exports.con_PageOne = con_PageOne;
	exports.default = con_PageOne;

/***/ }),

/***/ 1163:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mapStateToProps_PageOne = undefined;

	var _immutable = __webpack_require__(532);

	var mapStateToProps_PageOne = function mapStateToProps_PageOne(state, ownProps) {
	  var rObj = (0, _immutable.fromJS)(state).mergeDeep({
	    stateFlag: 'mapStateToProps_PageOne'
	  });

	  return rObj.toJSON();
	};

	exports.mapStateToProps_PageOne = mapStateToProps_PageOne;
	exports.default = mapStateToProps_PageOne;

/***/ }),

/***/ 1164:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mapDispatchToProps_PageOne = undefined;

	var _Action = __webpack_require__(1056);

	var _immutable = __webpack_require__(532);

	var _mapDispatchToProps_Common = __webpack_require__(1161);

	var mapDispatchToProps_PageOne = function mapDispatchToProps_PageOne(dispatch, ownProps) {
	  return (0, _immutable.fromJS)((0, _mapDispatchToProps_Common.mapDispatchToProps_Common)(dispatch, ownProps)).mergeDeep({}).toJSON();

	  // return mapDispatchToProps_Common(dispatch, ownProps)
	};
	exports.mapDispatchToProps_PageOne = mapDispatchToProps_PageOne;
	exports.default = mapDispatchToProps_PageOne;

/***/ }),

/***/ 1165:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(64);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(94);

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

/***/ })

});