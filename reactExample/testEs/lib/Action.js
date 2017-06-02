'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
//v3
var Action = {
  Main_TabbarClickAction: function Main_TabbarClickAction(e, index) {
    return {
      type: 'Main_TabbarClick',
      e: e,
      index: index
    };
  },
  pro_stateClickAction: function pro_stateClickAction(state, user) {
    return {
      type: 'pro_stateClick',
      state: state,
      user: user
    };
  },
  onSomeButtonClickedAction: function onSomeButtonClickedAction() {
    return {
      type: 'onSomeButtonClicked'
    };
  },
  onInputChange: function onInputChange(payload) {
    return {
      type: 'onInputChange',
      payload: payload
    };
  }
};

exports.Action = Action;
exports.default = Action;