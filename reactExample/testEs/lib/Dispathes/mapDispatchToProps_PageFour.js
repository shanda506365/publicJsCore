'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDispatchToProps_PageFour = undefined;

var _Action = require('../Action');

var _immutable = require('immutable');

var _mapDispatchToProps_Common = require('./mapDispatchToProps_Common');

var mapDispatchToProps_PageFour = function mapDispatchToProps_PageFour(dispatch, ownProps) {
  return (0, _immutable.fromJS)((0, _mapDispatchToProps_Common.mapDispatchToProps_Common)(dispatch, ownProps)).mergeDeep({
    onSomeButtonClicked: function onSomeButtonClicked(e, tabIndex) {
      dispatch({
        type: 'USER_FETCH_REQUESTED',
        payload: {
          tabIndex: tabIndex
        }
      });
    }
  }).toJSON();

  // return mapDispatchToProps_Common(dispatch, ownProps)
};
exports.mapDispatchToProps_PageFour = mapDispatchToProps_PageFour;
exports.default = mapDispatchToProps_PageFour;