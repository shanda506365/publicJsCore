webpackJsonp([1],{

/***/ 732:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.con_Test = exports.Test = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(64);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(94);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRedux = __webpack_require__(253);

	var _reactRouter = __webpack_require__(272);

	var _MapStateToProps = __webpack_require__(538);

	var _MapDispatchToProps = __webpack_require__(545);

	var _MapDispatchToProps2 = _interopRequireDefault(_MapDispatchToProps);

	__webpack_require__(733);

	var _mockData = __webpack_require__(559);

	var _immutable = __webpack_require__(532);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Test = function (_Component) {
		_inherits(Test, _Component);

		function Test() {
			_classCallCheck(this, Test);

			return _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).apply(this, arguments));
		}

		_createClass(Test, [{
			key: 'shouldComponentUpdate',
			value: function shouldComponentUpdate(nextProps, nextState) {
				var thisProps = this.props || {},
				    thisState = this.state || {};
				var map1 = (0, _immutable.fromJS)(thisProps['counterReducer'].count);
				var map2 = (0, _immutable.fromJS)(nextProps['counterReducer'].count);

				console.log('shouldComponentUpdate', map1, map2, !(0, _immutable.is)(map1, map2));
				return !(0, _immutable.is)(map1, map2);
			}
		}, {
			key: 'render',
			value: function render() {

				// function Node(data, left, right) {
				// 	this.data = data;
				// 	this.left = left;
				// 	this.right = right;
				// 	this.show = show;
				// }

				// function show() {
				// 	return this.data;
				// }

				// function BST() {
				// 	this.root = null;
				// 	this.insert = insert;
				// 	this.inOrder = inOrder;
				// }

				// function insert(data) {
				// 	var n = new Node(data, null, null)
				// 	if (this.root == null) {
				// 		this.root = n;
				// 	} else {
				// 		var current = this.root;
				// 		var parent;
				// 		while (true) {
				// 			parent = current;
				// 			if (data < current.data) {
				// 				current = current.left;
				// 				if (current == null) {
				// 					parent.left = n;
				// 					break;
				// 				};
				// 			} else {
				// 				current = current.right;
				// 				if (current == null) {
				// 					parent.right = n;
				// 					break;
				// 				};
				// 			}
				// 		}
				// 	}
				// }

				// function inOrder(node) {

				// 	if (!(node == null)) {
				// 		inOrder(node.left);
				// 		console.log(node,node.show())
				// 		inOrder(node.right)
				// 	};
				// }
				// var nums = new BST()
				// nums.insert(23)
				// nums.insert(45)
				// nums.insert(16)
				// nums.insert(37)
				// nums.insert(3)
				// nums.insert(99)
				// nums.insert(22)
				// inOrder(nums.root)
				// console.log('inOrderinOrder', nums.root)
				// 

				var _props = this.props,
				    onIncreaseTestClick = _props.onIncreaseTestClick,
				    onPro_stateChange = _props.onPro_stateChange,
				    _props$counterReducer = _props.counterReducer,
				    count = _props$counterReducer.count,
				    title = _props$counterReducer.title,
				    buttonText = _props$counterReducer.buttonText;

				console.log('Test==', this.props);
				var liDom = [];
				console.log(_mockData.mData);
				$.each(_mockData.mData.data, function (ix, item) {
					liDom.push(_react2.default.createElement(
						'li',
						{ className: 'children',
							onClick: function onClick(e) {
								console.log($(e.target).width());
							} },
						' ',
						item.name,
						' '
					));
				});
				//for (let tt of mData.data) { 
				// }; 
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'h4',
						null,
						'TEST111 ',
						count,
						'  ',
						title
					),
					_react2.default.createElement(
						'ul',
						{ className: 'rongqi', onClick: function onClick() {
								$('.rongqi').scrollLeft($('.rongqi').scrollLeft() + 50);
							} },
						liDom
					),
					_react2.default.createElement('input', { type: 'text' }),
					_react2.default.createElement(
						'div',
						{ className: 'weui-flex' },
						_react2.default.createElement(
							'div',
							{ className: 'weui-flex__item' },
							_react2.default.createElement(
								'button',
								{ className: 'weui-btn weui-btn_primary h100', onClick: onIncreaseTestClick },
								buttonText
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'weui-flex__item' },
							_react2.default.createElement(
								_reactRouter.Link,
								{ className: 'weui-btn weui-btn_default', to: '/' },
								'\u8BA1\u6570\u8BA1\u6570\u8BA1\u6570\u8BA1\u6570\u8BA1\u6570'
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'weui-flex__item' },
							_react2.default.createElement(
								_reactRouter.Link,
								{ className: 'weui-btn weui-btn_default h100', to: '/Quote' },
								'\u62A5\u4EF7'
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'weui-flex__item' },
							_react2.default.createElement(
								_reactRouter.Link,
								{ className: 'weui-btn weui-btn_default h100', to: '/ReduxForm' },
								'ReduxForm'
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'weui-flex' },
						_react2.default.createElement(
							'div',
							{ className: 'weui-flex__item' },
							_react2.default.createElement(
								'button',
								{ className: 'weui-btn weui-btn_primary', onClick: function onClick() {
										return onPro_stateChange('Rejected');
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
										return onPro_stateChange('Pending');
									} },
								'Pending'
							)
						)
					)
				);
			}
		}]);

		return Test;
	}(_react.Component);

	var con_Test = (0, _reactRedux.connect)(_MapStateToProps.mapStateToProps_Test, _MapDispatchToProps.mapDispatchToProps_Test)(Test);

	exports.Test = Test;
	exports.con_Test = con_Test;
	exports.default = con_Test;

/***/ }),

/***/ 733:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(734);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(537)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/less-loader/index.js!./test.less", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/less-loader/index.js!./test.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 734:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(536)();
	// imports


	// module
	exports.push([module.id, ".rongqi {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  width: 162px;\n  height: 30px;\n}\n.children {\n  display: inline-block;\n}\n", ""]);

	// exports


/***/ })

});