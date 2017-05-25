'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDispatchToProps_Common = undefined;

var _Action = require('../Action');

var _immutable = require('immutable');

var _common = require('../common');

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapDispatchToProps_Common = function mapDispatchToProps_Common(dispatch, ownProps) {
  return {
    onMain_TabbarClick: function onMain_TabbarClick(e, index) {
      dispatch({
        type: 'onMain_TabbarClick_saga',
        e: e,
        index: index,
        ownProps: ownProps
      });
    },
    onMain_TabbarClickOld: function onMain_TabbarClickOld(e, index) {
      dispatch(_Action.Action.Main_TabbarClickAction(e, index));
      (0, _common.Ajax)({
        url: _common.API.login,
        doneFun: function doneFun(msg) {
          var data = JSON.parse(msg);
          if (data.suc) {
            dispatch(_Action.Action.Main_TabbarClickAction(e, index));

            switch (index) {
              case 0:
                ownProps.router.push({
                  pathname: '/'
                });
                return;
              case 1:
                ownProps.router.push({
                  pathname: '/PageTwo'
                });
                return;
              case 2:
                ownProps.router.push({
                  pathname: '/Quote'
                });
                return;
              case 3:
                ownProps.router.push({
                  pathname: '/PageFour'
                });
                return;
              default:
                ownProps.router.push({
                  pathname: '/'
                });
                return;

            }
          } else {
            setTimeout(function () {
              dispatch(_Action.Action.pro_stateClickAction('Resolved'));
            }, 1);
          }
        },
        failFun: function failFun(jqXHR, textStatus) {},
        alwaysFun: function alwaysFun() {},
        props: dispatch
      });
    },
    onPro_stateChange: function onPro_stateChange(state) {
      return dispatch(_Action.Action.pro_stateClickAction(state));
    },
    dispatch: dispatch
  };
};

exports.mapDispatchToProps_Common = mapDispatchToProps_Common;
exports.default = mapDispatchToProps_Common;