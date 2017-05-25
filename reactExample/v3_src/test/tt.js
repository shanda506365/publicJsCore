 
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
const CHOOSE_COLOR = 'CHOOSE_COLOR';
const CHANGE_UI = 'CHANGE_UI';

const chooseColor = (color) => ({
  type: CHOOSE_COLOR,
  payload: {
    color,
  },
});

const changeUI = (color) => ({
  type: CHANGE_UI,
  payload: {
    color,
  },
});


function* changeColorSaga() {
  const action = yield take(CHOOSE_COLOR);
  yield put(changeUI(action.payload.color));
}

export {
  CHOOSE_COLOR,
  CHANGE_UI,
  chooseColor,
  changeUI,
  changeColorSaga
}