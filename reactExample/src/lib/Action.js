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

// Action
const Action = {
  increaseAction: {
    type: 'increase'
  },
  increaseTestAction :{
    type: 'increaseTest'
  }
} 

export default Action