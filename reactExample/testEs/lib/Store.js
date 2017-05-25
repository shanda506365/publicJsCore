'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.V3Store = undefined;

var _redux = require('redux');

var _reduxForm = require('redux-form');

var _Reducer = require('./Reducer');

var _reactRouterRedux = require('react-router-redux');

var _reduxLogger = require('redux-logger');

require('babel-polyfill');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _mySaga = require('./sagas/mySaga');

var _mySaga2 = _interopRequireDefault(_mySaga);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//V3


// import thunk from 'redux-thunk'
var combineV3DemoReducer = (0, _redux.combineReducers)({
  V3DemoReducer: _Reducer.V3DemoReducer,
  form: _reduxForm.reducer, // mounted under "form"
  routing: _reactRouterRedux.routerReducer
});
var logger = (0, _reduxLogger.createLogger)();
var sagaMiddleware = (0, _reduxSaga2.default)();

var V3Store = (0, _redux.createStore)(combineV3DemoReducer, (0, _redux.applyMiddleware)(logger, sagaMiddleware));
sagaMiddleware.run(_mySaga2.default);

exports.V3Store = V3Store;