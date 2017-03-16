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
// Map Redux state to component props
export function mapStateToProps(state, ownProps) {
  console.log('mapStateToProps', ownProps)
  return {
    count: state.count,
    title: state.title
  }
}