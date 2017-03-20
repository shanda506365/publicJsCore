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

import "!style!css!less!../less/index.less"

import {
  mapStateToProps
} from './lib/MapStateToProps'
import {
  mapDispatchToProps
} from './lib/MapDispatchToProps'

import FastClick from '../node_modules/jquery-weui/dist/lib/fastclick'
import Test from './Test'

import common from './lib/common'

// React component
const Main = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  componentDidMount() {
    FastClick.attach(document.body);
    
  },
  render() {

    console.log('Main', this.context, this.props)
    return (
      <div className='h100' > 
        {this.props.children}
      </div>
    )
  }
})

const con_Main = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

export {
  Main as Main, con_Main as con_Main
}
export default con_Main