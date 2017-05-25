'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.V3GlobalState = exports.V3DemoReducer = undefined;

var _jqueryVendor = require('./jquery-vendor.js');

var _jqueryVendor2 = _interopRequireDefault(_jqueryVendor);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//v3
var V3GlobalState = (0, _immutable.fromJS)({
  pro_state: 'Resolved',
  V3_Main: {
    tabIndex: 0,
    title: 'V3_Main',
    tabbar_bottom_items: [{
      label: '微信',
      iconCls: 'iconfont icon-fuzhi weui-tabbar__icon'
    }, {
      label: '通讯录',
      iconCls: 'iconfont icon-qiandai weui-tabbar__icon'
    }, {
      label: '发现',
      iconCls: 'iconfont icon-icon weui-tabbar__icon'
    }, {
      label: '我',
      iconCls: 'iconfont icon-15 weui-tabbar__icon'
    }]
  }
});
//import merge from 'merge'
// import deepAssign from 'deep-assign'
// 


function V3DemoReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : V3GlobalState;
  var action = arguments[1];

  var rObj = void 0;
  switch (action.type) {
    case 'Main_TabbarClick':
      rObj = state.setIn(['V3_Main', 'tabIndex'], action.index);
      return rObj;
    case 'pro_stateClick':
      rObj = state.set('pro_state', action.state);
      return rObj;
    // case 'USER_FETCH_REQUESTED':
    // alert(11)
    //   rObj = state;
    //   return rObj
    default:
      return state;
  }
}

exports.V3DemoReducer = V3DemoReducer;
exports.V3GlobalState = V3GlobalState;