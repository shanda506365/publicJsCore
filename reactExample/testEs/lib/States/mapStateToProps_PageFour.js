'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps_PageFour = undefined;

var _immutable = require('immutable');

var mapStateToProps_PageFour = function mapStateToProps_PageFour(state, ownProps) {
  var rObj = (0, _immutable.fromJS)(state).mergeDeep({
    stateFlag: 'mapStateToProps_PageFour'
  });

  return rObj.toJSON();
};

exports.mapStateToProps_PageFour = mapStateToProps_PageFour;
exports.default = mapStateToProps_PageFour;