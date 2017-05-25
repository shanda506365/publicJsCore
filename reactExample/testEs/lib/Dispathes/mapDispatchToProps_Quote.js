'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDispatchToProps_Quote = undefined;

var _Action = require('../Action');

var _immutable = require('immutable');

var _mapDispatchToProps_Common = require('./mapDispatchToProps_Common');

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