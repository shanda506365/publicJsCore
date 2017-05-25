'use strict';

require('babel-polyfill');

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _tt = require('./tt.js');

var _Action = require('./lib/Action');

var _mySaga = require('./lib/sagas/mySaga');

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log((0, _effects.put)({
  type: 'MY_CRAZY_ACTION'
}));

(0, _tape2.default)('change color saga', function (assert) {
  var gen = (0, _tt.changeColorSaga)();

  assert.deepEqual(gen.next().value, (0, _effects.take)(_tt.CHOOSE_COLOR), 'it should wait for a user to choose a color');

  var color = 'red';
  assert.deepEqual(gen.next((0, _tt.chooseColor)(color)).value, (0, _effects.put)((0, _tt.changeUI)(color)), 'it should dispatch an action to change the ui');

  assert.deepEqual(gen.next().done, true, 'it should be done');

  assert.end();
});

(0, _tape2.default)('fetchUser saga', function (assert) {
  var action = { payload: { tabIndex: 1 } };
  var gen = (0, _mySaga.fetchUser)(action);

  assert.deepEqual(gen.next().value, (0, _effects.put)(_Action.Action.pro_stateClickAction('Pending')), 'put action pro_stateClickAction');

  assert.deepEqual(gen.next().value, (0, _effects.call)(_reduxSaga.delay, 3000), 'delay 3000');
  gen.next();
  assert.skip('call login');

  assert.deepEqual(gen.next().value, (0, _effects.put)(_Action.Action.pro_stateClickAction('Rejected')), 'put action pro_stateClickAction');
  assert.deepEqual(gen.next().value, (0, _effects.put)(_Action.Action.pro_stateClickAction('Rejected')), 'put action pro_stateClickAction');
  assert.deepEqual(gen.next().done, true, 'it should be done');

  assert.end();
});