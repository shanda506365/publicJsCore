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
  Action
} from '../Action'
import common, {
  Ajax,
  API
} from '../common'

import 'isomorphic-fetch'
import '../../mockData/fetchMock'

export function* fetchUser(action) {
  console.log(action)
  try {
    yield put(Action.pro_stateClickAction('Pending'));
   yield delay(3000)
    const user = yield call(function() {

      return fetch(API.login, {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'application/json'
          // },
          body: JSON.stringify(action)
        })
        .then(response => { 
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json()
        })
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
  }finally {
    yield put(Action.pro_stateClickAction('Rejected'));
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
    const [data, data1] = yield all([call(function() {
      console.log(arguments)
      return fetch(API.login, {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'application/json'
          // },
          //body: action.index
        })
        .then(response => {
          return response.json()
        })
    }, action), call(function() {
      console.log(arguments)
      return fetch(API.announcement, {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'application/json'
          // },
          //body: action.index
        })
        .then(response => {
          return response.json()
        })
    }, action)]);
    console.log('data1', data, data1)
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

function* authorize(user, password) {
  try {
    const token = yield call(function() {
      return fetch(API.login, {
          method: 'POST',
          // headers: {
          //   'Content-Type': 'application/json'
          // },
          //body: action.index
        })
        .then(response => {
          return response.json()
        })
    }, user, password)
    yield put({
      type: 'LOGIN_SUCCESS',
      token
    })
    console.log('tokentoken', token)
      //yield call(Api.storeItem, token)

  } catch (error) {
    yield put({
      type: 'LOGIN_ERROR',
      error
    })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

function* testTake() {
    try {
      while (true) {
        yield take('onMain_TabbarClick_saga')
        console.log('tagke')
        const token = yield fork(authorize, 'ddd', 'ddd')

        console.log('takelogout', token, token.result())
        const action = yield take(['LOGOUT', 'LOGIN_ERROR', 'LOGIN_SUCCESS'])

        if (action.type === 'LOGIN_ERROR') {
          console.log('takelogout', token, token.result())
          yield cancel(token)
        }
        if (action.type === 'LOGIN_SUCCESS') {
          console.log('3333', token, token.result())
          yield cancel(token)
          console.log('3333', token, token.result())
        }

        //yield call(Api.clearItem, 'token')
        yield put({
          type: "1111"
        });
      }
    } catch (e) {
      yield put({
        type: "222",
        message: e.message
      });
    }

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
    yield fork(testTake)
      // yield fork(nextRedditChange)
      // yield fork(invalidateReddit)
  }
  //export default mySaga;