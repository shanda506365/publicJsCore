import React, {
  Component,
  PropTypes
} from 'react'
import ReactDOM from 'react-dom'
 
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
const Main = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  render() {
    
    console.log('Main', this.context, this.props)
    return ( 
      <div> 
        {this.props.children}
      </div>
    )
  }
})

export default Main