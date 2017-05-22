import {
  call,
  put,
  fork,
  takeEvery,
  takeLatest
} from 'redux-saga/effects'
 
 import {
  Action
 } from '../Action'
 import common, {
  Ajax,
  API
 } from '../common'
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
import 'isomorphic-fetch'
import '../../mockData/fetchMock'
function* fetchUser(action) {
   console.log(action)
  try {
    const user = yield call(function(){
            return  fetch(API.login,{
              method:'POST',
              // headers: {
              //   'Content-Type': 'application/json'
              // },
              body: JSON.stringify(action)
            })
            .then(response => response.json())
            .then(json => {console.log(json);return json.data.map((item)=>{return item})} )
    }, action.payload.tabIndex);
    console.log(user)
    yield put(Action.pro_stateClickAction('Rejected',user));
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
  // yield fork(nextRedditChange)
  // yield fork(invalidateReddit)
}
//export default mySaga;