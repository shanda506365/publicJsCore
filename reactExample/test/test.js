import 'babel-polyfill';
import {
  call,
  put,
  fork,
  takeEvery,
  takeLatest,
  select,
  take,
  task,
  cancel,
  cancelled,
  all 
} from 'redux-saga/effects'
import {
  delay
} from 'redux-saga'
import {
  CHOOSE_COLOR,
  CHANGE_UI,
  chooseColor,
  changeUI,
  changeColorSaga
} from './tt.js'

import {
  Action
} from './lib/Action'
import {fetchUser} from './lib/sagas/mySaga'

import test from 'tape'
console.log(put({ type: 'MY_CRAZY_ACTION' }));

 


test('change color saga', assert => {
  const gen = changeColorSaga();

  assert.deepEqual(
    gen.next().value,
    take(CHOOSE_COLOR),
    'it should wait for a user to choose a color'
  );

  const color = 'red';
  assert.deepEqual(
    gen.next(chooseColor(color)).value,
    put(changeUI(color)),
    'it should dispatch an action to change the ui'
  );

  assert.deepEqual(
    gen.next().done,
    true,
    'it should be done'
  );

  assert.end();
});


test('fetchUser saga', assert => {
  const gen = fetchUser();

  assert.deepEqual( 
    gen.next().value,
    put(Action.pro_stateClickAction('Pending')),
    'put action pro_stateClickAction'
  );
 
  assert.deepEqual(
    gen.next().value,
    call(delay,3000),
    'delay 3000'
  );

  // assert.deepEqual(
  //   gen.next().done,
  //   true,
  //   'it should be done'
  // );

  assert.end();
});