'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps_PageOne = undefined;

var _immutable = require('immutable');

var mapStateToProps_PageOne = function mapStateToProps_PageOne(state, ownProps) {
  var rObj = (0, _immutable.fromJS)(state).mergeDeep({
    stateFlag: 'mapStateToProps_PageOne'
  });

  return rObj.toJSON();
};

exports.mapStateToProps_PageOne = mapStateToProps_PageOne;
exports.default = mapStateToProps_PageOne;