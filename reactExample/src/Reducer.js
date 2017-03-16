import React, {
  Component,
  PropTypes
} from 'react'
import ReactDOM from 'react-dom'
import {
  createStore
} from 'redux'
import {
  Provider,
  connect
} from 'react-redux'
import {
  Router,
  Route,
  Link,
  hashHistory,
  IndexRoute,
  IndexLink
} from 'react-router'

import $ from './jquery-vendor.js'


// Reducer
function counterReducer(state = {
  count: 0,
  title: '消息'
}, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return {
        count: count + 1,
        title: '消息' + count
      }
    case 'increaseTest':
      $('button').text('Do it'+count)
      return {
        count: count + 1,
        title: '消息' + count
      }
    default:
      return state
  }
}

export {
  counterReducer as counterReducer
}