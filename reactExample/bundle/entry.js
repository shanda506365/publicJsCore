webpackJsonp([11],{

/***/ 350:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalStore = undefined;

var _redux = __webpack_require__(51);

var _reduxForm = __webpack_require__(226);

var _Reducer = __webpack_require__(372);

var reducer = (0, _redux.combineReducers)({
  counterReducer: _Reducer.counterReducer,
  form: _reduxForm.reducer });
// Store
var store = (0, _redux.createStore)(reducer);

exports.GlobalStore = store;

/***/ }),

/***/ 353:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jquery = __webpack_require__(261);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.$ = _jquery2.default;
window.jQuery = _jquery2.default;
exports.default = _jquery2.default;

/***/ }),

/***/ 371:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(102);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = __webpack_require__(51);

var _reactRedux = __webpack_require__(43);

var _reactRouter = __webpack_require__(103);

var _Store = __webpack_require__(350);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Main from './Main'
// import Counter from './Counter'
// import Test from './Test'
// import Quote from './Quote'
// import ReduxForm from './ReduxForm' 

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: _Store.GlobalStore },
  _react2.default.createElement(
    _reactRouter.Router,
    { history: _reactRouter.hashHistory },
    _react2.default.createElement(
      _reactRouter.Route,
      { path: '/', getComponents: function getComponents(nextState, callback) {
          __webpack_require__.e/* require.ensure */(3).then((function (require) {
            callback(null, __webpack_require__(367).default);
          }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
        } },
      _react2.default.createElement(_reactRouter.IndexRoute, { getComponents: function getComponents(nextState, callback) {
          __webpack_require__.e/* require.ensure */(7).then((function (require) {
            callback(null, __webpack_require__(366).default);
          }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
        }, onEnter: function onEnter(nextState, replace) {
          console.log('onEnter', nextState, _Store.GlobalStore.getState());
        },
        onLeave: function onLeave(prevState) {
          //console.log(prevState) 
        } }),
      _react2.default.createElement(_reactRouter.Route, { path: '/Test', getComponents: function getComponents(nextState, callback) {
          __webpack_require__.e/* require.ensure */(5).then((function (require) {
            callback(null, __webpack_require__(370).default);
          }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
        } }),
      _react2.default.createElement(_reactRouter.Route, { path: '/Quote', getComponents: function getComponents(nextState, callback) {
          __webpack_require__.e/* require.ensure */(4).then((function (require) {
            callback(null, __webpack_require__(368).default);
          }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
        } }),
      _react2.default.createElement(_reactRouter.Route, { path: '/ReduxForm', getComponents: function getComponents(nextState, callback) {
          __webpack_require__.e/* require.ensure */(0).then((function (require) {
            callback(null, __webpack_require__(369).default);
          }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
        } })
    )
  )
), document.getElementById('root'));

/***/ }),

/***/ 372:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalState = exports.counterReducer = undefined;

var _jqueryVendor = __webpack_require__(353);

var _jqueryVendor2 = _interopRequireDefault(_jqueryVendor);

var _immutable = __webpack_require__(223);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
//import merge from 'merge'
// import deepAssign from 'deep-assign'
// 


var GlobalState = (0, _immutable.fromJS)({
  count: 0,
  title: '消息',
  buttonText: '消息计数',
  tabIndex: 0,
  pro_state: 'Resolved', //Pending,Rejected
  Quote: {
    tabIndex: 0,
    title: 'Quote'
  },

  SimpleFormData: {
    firstName: 'Jane',
    lastName: 'Doe',
    age: 44,
    sex: 'female',
    employed: true,
    favoriteColor: 'Blue',
    bio: 'Born to write amazing Redux code.',
    radio1: '1',
    checkbox1: ['1'],
    roles: [],
    radios2: ''
  },
  SyncValidationFormData: {
    username: 11,
    tagSels: []
  }
});
// Reducer
function counterReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : GlobalState;
  var action = arguments[1];

  var tstate = state; //JSON.parse(JSON.stringify(state));
  console.log('statestate', state.toJSON(), GlobalState.toJSON());
  var rObj = void 0;
  switch (action.type) {
    case 'increase':
      console.log('=====1111', tstate.get('Quote').get('tabIndex'));
      rObj = tstate.mergeDeep({
        count: tstate.get('count') + 1,
        title: '消息' + tstate.get('count')
      });
      return rObj;
    case 'increaseTest':
      //$('button').text('Do it hahahaha' + count)
      console.log('increaseTest', action.filter);
      rObj = tstate.mergeDeep({
        count: tstate.get('count') + 1,
        title: '消息' + tstate.get('count')
      });
      return rObj;
    case 'navbarClick':
      console.log('navbarClick', action);
      rObj = tstate.set('tabIndex', action.index);
      return rObj;
    case 'quote_tabbarClick':
      rObj = tstate.setIn(['Quote', 'tabIndex'], action.index);
      console.log('quote_tabbarClick', rObj);
      return rObj;
    case 'pro_stateClick':
      console.log('pro_stateClick', action);
      rObj = tstate.set('pro_state', action.state);
      return rObj;
    case 'formSubmit':
      console.log('formSubmit', action);
      rObj = tstate.set('pro_state', action.state).mergeDeep(_defineProperty({}, action.formDataName, action.values));
      return rObj;
    case 'simpleFormLoad':
      console.log('simpleFormLoad', action);
      rObj = tstate.setIn(['SimpleFormData', 'lastName'], 'count:' + tstate.get('count'));
      return rObj;
    case 'tagSelect':
      console.log('tagSelect', action);
      rObj = tstate.setIn(['SyncValidationFormData', 'tagSels'], action.tagSels);
      console.log('tagSelect', rObj.getIn(['SyncValidationFormData', 'tagSels']));
      return rObj;
    default:
      console.log(state);
      return state;
  }
}

exports.counterReducer = counterReducer;
exports.GlobalState = GlobalState;

/***/ })

},[371]);