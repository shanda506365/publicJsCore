'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps_PageTwo = undefined;

var _immutable = require('immutable');

var mapStateToProps_PageTwo = function mapStateToProps_PageTwo(state, ownProps) {
  var rObj = (0, _immutable.fromJS)(state).mergeDeep({
    stateFlag: 'mapStateToProps_PageTwo'
  });

  return rObj.toJSON();
};

exports.mapStateToProps_PageTwo = mapStateToProps_PageTwo;
exports.default = mapStateToProps_PageTwo;