'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps_Quote = undefined;

var _immutable = require('immutable');

var mapStateToProps_Quote = function mapStateToProps_Quote(state, ownProps) {
  var rObj = (0, _immutable.fromJS)(state).mergeDeep({
    stateFlag: 'mapStateToProps_Quote'
  });
  return rObj.toJSON();
};

exports.mapStateToProps_Quote = mapStateToProps_Quote;
exports.default = mapStateToProps_Quote;