'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _Store = require('./lib/Store');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.hashHistory, _Store.V3Store);

// history.listen((location) => console.log('pathname',location))  

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: _Store.V3Store },
  _react2.default.createElement(
    _reactRouter.Router,
    { history: history },
    _react2.default.createElement(
      _reactRouter.Route,
      { path: '/', getComponents: function getComponents(nextState, callback) {
          require.ensure([], function (require) {
            callback(null, require("./Main").default);
          }, "router_V3_Main");
        } },
      _react2.default.createElement(_reactRouter.IndexRoute, { getComponents: function getComponents(nextState, callback) {
          require.ensure([], function (require) {
            callback(null, require("./PageOne").default);
          }, "router_V3_PageOne");
        }, onEnter: function onEnter(nextState, replace) {
          console.log('onEnter', nextState, _Store.V3Store.getState());
        },
        onLeave: function onLeave(prevState) {
          //console.log(prevState) 
        } }),
      _react2.default.createElement(_reactRouter.Route, { path: '/Quote', getComponents: function getComponents(nextState, callback) {
          require.ensure([], function (require) {
            callback(null, require("./Quote").default);
          }, "router_V3_Quote");
        } }),
      _react2.default.createElement(_reactRouter.Route, { path: '/PageTwo', getComponents: function getComponents(nextState, callback) {
          require.ensure([], function (require) {
            callback(null, require("./PageTwo").default);
          }, "router_V3_PageTwo");
        } }),
      _react2.default.createElement(_reactRouter.Route, { path: '/PageFour', getComponents: function getComponents(nextState, callback) {
          require.ensure([], function (require) {
            callback(null, require("./PageFour").default);
          }, "router_V3_PageFour");
        } })
    )
  )
), document.getElementById('root'));