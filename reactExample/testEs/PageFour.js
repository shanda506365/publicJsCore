'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.con_PageFour = exports.PageFour = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _mapStateToProps_PageFour = require('./lib/States/mapStateToProps_PageFour');

var _MapDispatchToProps_PageFour = require('./lib/Dispathes/MapDispatchToProps_PageFour');

var _common = require('./lib/common');

var _common2 = _interopRequireDefault(_common);

var _immutable = require('immutable');

var _mockData = require('./mockData/mockData');

var _mockData2 = _interopRequireDefault(_mockData);

var _TabBar_Bottom = require('./components/TabBar_Bottom');

var _TabBar_Bottom2 = _interopRequireDefault(_TabBar_Bottom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageFour = function (_Component) {
	_inherits(PageFour, _Component);

	function PageFour() {
		_classCallCheck(this, PageFour);

		return _possibleConstructorReturn(this, (PageFour.__proto__ || Object.getPrototypeOf(PageFour)).apply(this, arguments));
	}

	_createClass(PageFour, [{
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
		// onSomeButtonClicked() {
		// 	const {
		// 		V3DemoReducer: {
		// 			V3_Main: {
		// 				tabIndex 
		// 			}
		// 		},
		// 		dispatch
		// 	} = this.props
		// 	dispatch({
		// 		type: 'USER_FETCH_REQUESTED',
		// 		payload: {
		// 			tabIndex
		// 		}
		// 	})
		// }

	}, {
		key: 'domInit',
		value: function domInit(param) {
			console.log('ddd', this.props);
			var me = this,
			    _props2 = this.props,
			    router = _props2.router,
			    PageFour = _props2.V3DemoReducer.PageFour,
			    dispatch = _props2.dispatch;


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
						_react2.default.createElement('input', { type: 'text', value: PageFour.value, onChange: function onChange(e) {
								dispatch({
									type: 'myInputChange',
									payload: { e: e }
								});
							}

							// {(e)=>{
							//  	if (!/\D/.test(e.target.value)){

							//  	}else{

							//  	}
							// 		console.log('change',e.target.value)
							// 	}
							// } 
							//onKeyDown={(e)=>{

							//e.preventDefault()
							//  	  var keynum;
							// 	    var keychar;
							// console.log(e.keyCode,e.which)
							// 	    keynum = window.event ? e.keyCode : e.which;
							// 	     if (e.which == 68) {e.preventDefault()};
							// 	    keychar = String.fromCharCode(keynum); 
							//  	 return false
							// }} onKeyUp={(e)=>{
							// if (e.which == 68) {e.preventDefault()};
							// 			 	 console.log(e.keyCode,e.which)

							//return false
							//  
							, style: { "ime-mode": "disabled" } }),
						_react2.default.createElement(
							'button',
							{ className: 'weui-btn weui-btn_primary', onClick: function onClick(e) {
									return param.onSomeButtonClicked(e, param.tabIndex);
								} },
							'onSomeButtonClicked'
						),
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
				'Page 4',
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
				)
			));
		}
	}, {
		key: 'render',
		value: function render() {
			//  
			// setTimeout(function() {
			// 	hashHistory.push({
			// 		pathname:'/Quote'
			// 	})
			// },2000)
			// function* numbers() {
			//     console.log('function start.');

			//     var v1 = yield 0;
			//     console.log('v1 = ' + v1);

			//     var v2 = yield 1;
			//     console.log('v2 = ' + v2);

			//     return 5;
			// }

			// var nums = numbers();
			// console.log(nums.next(nums.next(nums.next().value).value).value);  
			var _props3 = this.props,
			    onMain_TabbarClick = _props3.onMain_TabbarClick,
			    onPro_stateChange = _props3.onPro_stateChange,
			    onSomeButtonClicked = _props3.onSomeButtonClicked,
			    _props3$V3DemoReducer = _props3.V3DemoReducer.V3_Main,
			    tabIndex = _props3$V3DemoReducer.tabIndex,
			    tabbar_bottom_items = _props3$V3DemoReducer.tabbar_bottom_items,
			    me = this;

			var barPanelDom = [];
			me.domInit({
				onMain_TabbarClick: onMain_TabbarClick,
				barPanelDom: barPanelDom,
				onPro_stateChange: onPro_stateChange,
				onSomeButtonClicked: onSomeButtonClicked,
				tabIndex: tabIndex
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
					itemIndex: 3 })
			);
		}
	}]);

	return PageFour;
}(_react.Component);

var con_PageFour = (0, _reactRedux.connect)(_mapStateToProps_PageFour.mapStateToProps_PageFour, _MapDispatchToProps_PageFour.mapDispatchToProps_PageFour)(PageFour);

exports.PageFour = PageFour;
exports.con_PageFour = con_PageFour;
exports.default = con_PageFour;