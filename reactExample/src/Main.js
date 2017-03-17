import React, {
  Component,
  PropTypes
} from 'react'
import ReactDOM from 'react-dom'
import { 
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

import {mapStateToProps} from './lib/MapStateToProps'
import {mapDispatchToProps} from './lib/MapDispatchToProps'
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

const con_Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

export {Main as Main,con_Main as con_Main} 
export default con_Main