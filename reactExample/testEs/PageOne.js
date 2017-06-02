'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.con_PageOne = exports.PageOne = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _mapStateToProps_PageOne = require('./lib/States/mapStateToProps_PageOne');

var _mapDispatchToProps_PageOne = require('./lib/Dispathes/mapDispatchToProps_PageOne');

var _common = require('./lib/common');

var _common2 = _interopRequireDefault(_common);

var _immutable = require('immutable');

var _TabBar_Bottom = require('./components/TabBar_Bottom');

var _TabBar_Bottom2 = _interopRequireDefault(_TabBar_Bottom);

var _antd = require('antd');

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
				_react2.default.createElement(
					'div',
					{ style: { width: 400, margin: '10px auto' } },
					_react2.default.createElement(_antd.DatePicker, { onChange: function onChange(value) {
							_antd.message.info('您选择的日期是: ' + value.toString());
						} }),
					_react2.default.createElement(
						'div',
						{ style: { marginTop: 20 } },
						'\u5F53\u524D\u65E5\u671F\uFF1A'
					),
					_react2.default.createElement(
						_antd.Button,
						{ type: 'primary' },
						'Primary'
					),
					_react2.default.createElement(
						_antd.Button,
						null,
						'Default'
					),
					_react2.default.createElement(
						_antd.Button,
						{ type: 'dashed' },
						'Dashed'
					),
					_react2.default.createElement(
						_antd.Button,
						{ type: 'danger' },
						'Danger'
					)
				),
				'Page 1  one 1',
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