'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.fetchUser = fetchUser;
exports.default = root;

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

var _Action = require('../Action');

var _API = require('../API');

require('isomorphic-fetch');

var _marked = [fetchUser, mySaga, fetchTabData, onMain_TabbarClick, authorize, testTake, root].map(regeneratorRuntime.mark);

// import '../../mockData/fetchMock'

function fetchUser(action) {
  var user;
  return regeneratorRuntime.wrap(function fetchUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(action);
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.put)(_Action.Action.pro_stateClickAction('Pending'));

        case 4:
          _context.next = 6;
          return (0, _effects.call)(_reduxSaga.delay, 3000);

        case 6:
          _context.next = 8;
          return (0, _effects.call)(function () {

            return fetch(_API.API.login, {
              method: 'POST',
              // headers: {
              //   'Content-Type': 'application/json'
              // },
              body: JSON.stringify(action)
            }).then(function (response) {
              if (response.status >= 400) {
                throw new Error("Bad response from server");
              }
              return response.json();
            }).then(function (json) {
              console.log(json);
              return json.data.map(function (item) {
                return item;
              });
            });
          }, action.payload.tabIndex);

        case 8:
          user = _context.sent;

         // console.log(user);
          _context.next = 12;
          return (0, _effects.put)(_Action.Action.pro_stateClickAction('Rejected', user));

        case 12:
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context['catch'](1);
          _context.next = 18;
          return (0, _effects.put)({
            type: "USER_FETCH_FAILED",
            message: _context.t0.message
          });

        case 18:
          _context.prev = 18;
          _context.next = 21;
          return (0, _effects.put)(_Action.Action.pro_stateClickAction('Rejected'));

        case 21:
          return _context.finish(18);

        case 22:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this, [[1, 14, 18, 22]]);
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function mySaga() {
  return regeneratorRuntime.wrap(function mySaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeEvery)("USER_FETCH_REQUESTED", fetchUser);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function fetchTabData(action) {
  var _ref, _ref2, data, data1, ownProps;

  return regeneratorRuntime.wrap(function fetchTabData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log(action);

          _context3.prev = 1;
          _context3.next = 4;
          return (0, _effects.all)([(0, _effects.call)(function () {
            console.log(arguments);
            return fetch(_API.API.login, {
              method: 'POST'
            }).then(function (response) {
              return response.json();
            });
          }, action), (0, _effects.call)(function () {
            console.log(arguments);
            return fetch(_API.API.announcement, {
              method: 'POST'
            }).then(function (response) {
              return response.json();
            });
          }, action)]);

        case 4:
          _ref = _context3.sent;
          _ref2 = _slicedToArray(_ref, 2);
          data = _ref2[0];
          data1 = _ref2[1];

          console.log('data1', data, data1);
          ownProps = action.ownProps;

          if (!data.suc) {
            _context3.next = 26;
            break;
          }

          _context3.t0 = action.index;
          _context3.next = _context3.t0 === 0 ? 14 : _context3.t0 === 1 ? 16 : _context3.t0 === 2 ? 18 : _context3.t0 === 3 ? 20 : 22;
          break;

        case 14:
          ownProps.router.push({
            pathname: '/'
          });
          return _context3.abrupt('return');

        case 16:
          ownProps.router.push({
            pathname: '/PageTwo'
          });
          return _context3.abrupt('return');

        case 18:
          ownProps.router.push({
            pathname: '/Quote'
          });
          return _context3.abrupt('return');

        case 20:
          ownProps.router.push({
            pathname: '/PageFour'
          });
          return _context3.abrupt('return');

        case 22:
          ownProps.router.push({
            pathname: '/'
          });
          return _context3.abrupt('return');

        case 24:
          _context3.next = 28;
          break;

        case 26:
          _context3.next = 28;
          return (0, _effects.put)(_Action.Action.pro_stateClickAction('Resolved'));

        case 28:
          _context3.next = 34;
          break;

        case 30:
          _context3.prev = 30;
          _context3.t1 = _context3['catch'](1);
          _context3.next = 34;
          return (0, _effects.put)({
            type: "USER_FETCH_FAILED",
            message: _context3.t1.message
          });

        case 34:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this, [[1, 30]]);
}

function onMain_TabbarClick() {
  return regeneratorRuntime.wrap(function onMain_TabbarClick$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _effects.takeEvery)("onMain_TabbarClick_saga", fetchTabData);

        case 2:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[3], this);
}

function authorize(user, password) {
  var token;
  return regeneratorRuntime.wrap(function authorize$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return (0, _effects.call)(function () {
            return fetch(_API.API.login, {
              method: 'POST'
            }).then(function (response) {
              return response.json();
            });
          }, user, password);

        case 3:
          token = _context5.sent;
          _context5.next = 6;
          return (0, _effects.put)({
            type: 'LOGIN_SUCCESS',
            token: token
          });

        case 6:
          console.log('tokentoken', token);
          //yield call(Api.storeItem, token)

          _context5.next = 13;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5['catch'](0);
          _context5.next = 13;
          return (0, _effects.put)({
            type: 'LOGIN_ERROR',
            error: _context5.t0
          });

        case 13:
          _context5.prev = 13;
          _context5.next = 16;
          return (0, _effects.cancelled)();

        case 16:
          if (!_context5.sent) {
            _context5.next = 17;
            break;
          }

        case 17:
          return _context5.finish(13);

        case 18:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked[4], this, [[0, 9, 13, 18]]);
}

function testTake() {
  var token, action;
  return regeneratorRuntime.wrap(function testTake$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;

        case 1:
          if (!true) {
            _context6.next = 25;
            break;
          }

          _context6.next = 4;
          return (0, _effects.take)('onMain_TabbarClick_saga');

        case 4:
          console.log('tagke');
          _context6.next = 7;
          return (0, _effects.fork)(authorize, 'ddd', 'ddd');

        case 7:
          token = _context6.sent;


          console.log('takelogout', token, token.result());
          _context6.next = 11;
          return (0, _effects.take)(['LOGOUT', 'LOGIN_ERROR', 'LOGIN_SUCCESS']);

        case 11:
          action = _context6.sent;

          if (!(action.type === 'LOGIN_ERROR')) {
            _context6.next = 16;
            break;
          }

          console.log('takelogout', token, token.result());
          _context6.next = 16;
          return (0, _effects.cancel)(token);

        case 16:
          if (!(action.type === 'LOGIN_SUCCESS')) {
            _context6.next = 21;
            break;
          }

          console.log('3333', token, token.result());
          _context6.next = 20;
          return (0, _effects.cancel)(token);

        case 20:
          console.log('3333', token, token.result());

        case 21:
          _context6.next = 23;
          return (0, _effects.put)({
            type: "1111"
          });

        case 23:
          _context6.next = 1;
          break;

        case 25:
          _context6.next = 31;
          break;

        case 27:
          _context6.prev = 27;
          _context6.t0 = _context6['catch'](0);
          _context6.next = 31;
          return (0, _effects.put)({
            type: "222",
            message: _context6.t0.message
          });

        case 31:
        case 'end':
          return _context6.stop();
      }
    }
  }, _marked[5], this, [[0, 27]]);
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
function root() {
  return regeneratorRuntime.wrap(function root$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _effects.fork)(mySaga);

        case 2:
          _context7.next = 4;
          return (0, _effects.fork)(onMain_TabbarClick);

        case 4:
          _context7.next = 6;
          return (0, _effects.fork)(testTake);

        case 6:
        case 'end':
          return _context7.stop();
      }
    }
  }, _marked[6], this);
}
//export default mySaga;