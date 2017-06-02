'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeColorSaga = exports.changeUI = exports.chooseColor = exports.CHANGE_UI = exports.CHOOSE_COLOR = undefined;

var _effects = require('redux-saga/effects');

var _marked = [changeColorSaga].map(regeneratorRuntime.mark);

var CHOOSE_COLOR = 'CHOOSE_COLOR';
var CHANGE_UI = 'CHANGE_UI';

var chooseColor = function chooseColor(color) {
  return {
    type: CHOOSE_COLOR,
    payload: {
      color: color
    }
  };
};

var changeUI = function changeUI(color) {
  return {
    type: CHANGE_UI,
    payload: {
      color: color
    }
  };
};

function changeColorSaga() {
  var action;
  return regeneratorRuntime.wrap(function changeColorSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.take)(CHOOSE_COLOR);

        case 2:
          action = _context.sent;
          _context.next = 5;
          return (0, _effects.put)(changeUI(action.payload.color));

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

exports.CHOOSE_COLOR = CHOOSE_COLOR;
exports.CHANGE_UI = CHANGE_UI;
exports.chooseColor = chooseColor;
exports.changeUI = changeUI;
exports.changeColorSaga = changeColorSaga;