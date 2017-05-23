import {
  call,
  put,
  fork,
  takeEvery,
  takeLatest,
  select
} from 'redux-saga/effects'

import {
  Action
} from '../Action'
import common, {
  Ajax,
  API
} from '../common'

import 'isomorphic-fetch'
import '../../mockData/fetchMock'

function* fetchUser(action) {
  console.log(action)
  try {
    const user = yield call(function() {
      return fetch(API.login, {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'application/json'
          // },
          body: JSON.stringify(action)
        })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          return json.data.map((item) => {
            return item
          })
        })
    }, action.payload.tabIndex);
    console.log(user)
    yield put(Action.pro_stateClickAction('Rejected', user));
    //yield select(state=>console.log(state.V3DemoReducer.toJSON()));
  } catch (e) {
    yield put({
      type: "USER_FETCH_FAILED",
      message: e.message
    });
  }
}


/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

function* fetchTabData(action) {
  console.log(action)
  try {
    const data = yield call(function() {
      console.log(arguments)
      return fetch(API.login, {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'application/json'
          // },
          //body: action.index
        })
        .then(response => {return response.json()}) 
    }, action);

    let ownProps = action.ownProps 
    if (data.suc) {

      switch (action.index) {
        case 0:
          ownProps.router.push({
            pathname: '/'
          })
          return
        case 1:
          ownProps.router.push({
            pathname: '/PageTwo'
          })
          return
        case 2:
          ownProps.router.push({
            pathname: '/Quote'
          })
          return
        case 3:
          ownProps.router.push({
            pathname: '/PageFour'
          })
          return
        default:
          ownProps.router.push({
            pathname: '/'
          })
          return

      }


    } else {
      yield put(Action.pro_stateClickAction('Resolved'));
    }

  } catch (e) {
    yield put({
      type: "USER_FETCH_FAILED",
      message: e.message
    });
  }
}

function* onMain_TabbarClick() {
  yield takeEvery("onMain_TabbarClick_saga", fetchTabData);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
// function* mySaga() {
//   yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
// }
export default function* root() {
    yield fork(mySaga)
    yield fork(onMain_TabbarClick)
      // yield fork(nextRedditChange)
      // yield fork(invalidateReddit)
  }
  //export default mySaga;