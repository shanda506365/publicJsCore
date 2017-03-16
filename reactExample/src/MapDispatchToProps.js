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
import Action from './Action'
// Map Redux actions to component props  
export function mapDispatchToProps(dispatch, ownProps) {
  return {
    onIncreaseClick: () => dispatch(Action.increaseAction),
    onIncreaseTestClick: () => dispatch({
      type: 'increaseTest',
      filter: ownProps
    })
  }
}