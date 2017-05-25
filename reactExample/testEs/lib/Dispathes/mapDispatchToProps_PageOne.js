'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDispatchToProps_PageOne = undefined;

var _Action = require('../Action');

var _immutable = require('immutable');

var _mapDispatchToProps_Common = require('./mapDispatchToProps_Common');

var mapDispatchToProps_PageOne = function mapDispatchToProps_PageOne(dispatch, ownProps) {
  return (0, _immutable.fromJS)((0, _mapDispatchToProps_Common.mapDispatchToProps_Common)(dispatch, ownProps)).mergeDeep({}).toJSON();

  // return mapDispatchToProps_Common(dispatch, ownProps)
};
exports.mapDispatchToProps_PageOne = mapDispatchToProps_PageOne;
exports.default = mapDispatchToProps_PageOne;