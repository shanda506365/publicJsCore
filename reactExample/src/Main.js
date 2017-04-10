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
  mapStateToProps_Main
} from './lib/MapStateToProps'
import {
  mapDispatchToProps_Main
} from './lib/MapDispatchToProps'

import FastClick from '../node_modules/jquery-weui/dist/lib/fastclick'
import Test from './Test'

import common,{Ajax,API} from './lib/common' 

import mockData from './mockData/mockData'


// React component
const Main = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  componentDidMount() {
    let me = this;
    FastClick.attach(document.body);
    
    Ajax({
      url: API.login,
      doneFun: function(msg) {
        let data = JSON.parse(msg)


        console.log(data)
      },
      failFun: function(jqXHR, textStatus) {
        
      },
      alwaysFun: function() {}, 
      context: me.context
    }, false)

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
  mapStateToProps_Main,
  mapDispatchToProps_Main
)(Main)

export {
  Main as Main, con_Main as con_Main
}
export default con_Main