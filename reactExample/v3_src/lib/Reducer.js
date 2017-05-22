 import $ from './jquery-vendor.js'
 //import merge from 'merge'
 // import deepAssign from 'deep-assign'
 // 
 import {
   fromJS,
   Map
 } from 'immutable'



 //v3
 const V3GlobalState = fromJS({
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
 })

 function V3DemoReducer(state = V3GlobalState, action) {
   let rObj;
   switch (action.type) {
     case 'Main_TabbarClick':
       rObj = state.setIn(['V3_Main', 'tabIndex'], action.index);
       return rObj
     case 'pro_stateClick':
       rObj = state.set('pro_state', action.state);
       return rObj
     case 'USER_FETCH_REQUESTED':
       rObj = state;
       return rObj
     default:
       return state;
   }
 }


 export {
   V3DemoReducer,
   V3GlobalState
 }