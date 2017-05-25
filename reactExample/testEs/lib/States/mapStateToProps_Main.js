'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStateToProps_Main = undefined;

var _immutable = require('immutable');

var mapStateToProps_Main = function mapStateToProps_Main(state, ownProps) {
  var rObj = (0, _immutable.fromJS)(state).mergeDeep({
    stateFlag: 'mapStateToProps_Main'
  });
  return rObj.toJSON();
};
exports.mapStateToProps_Main = mapStateToProps_Main;
exports.default = mapStateToProps_Main;