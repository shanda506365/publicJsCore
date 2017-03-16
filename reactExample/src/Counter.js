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
import Test from './Test'

// React component
const Counter = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  render() {
    const {
      count,
      onIncreaseClick
    } = this.props
    console.log('Counter', this.context, this.props)
    return ( 
      <div> 
       <span>{count}</span>
        <button onClick={onIncreaseClick}>计数</button> 
        <Link to="/Test">消息计数</Link>
      </div>
    )
  }
})

export default Counter