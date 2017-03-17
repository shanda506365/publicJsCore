import React, {
  Component,
  PropTypes
} from 'react'
import ReactDOM from 'react-dom'
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

import {mapStateToProps} from './lib/MapStateToProps'
import {mapDispatchToProps} from './lib/MapDispatchToProps'

import '../node_modules/weui/dist/style/weui.css'
//import "!style!css!less!../node_modules/jquery-weui/dist/css/jquery-weui.css"


//import Jweui from '../node_modules/jquery-weui/dist/js/jquery-weui'
import Weuijs from 'weui.js'
import FastClick from '../node_modules/jquery-weui/dist/lib/fastclick'
import Test from './Test'


// React component
const Counter = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  componentDidMount() {
    FastClick.attach(document.body);
    console.log('FastClick', FastClick)
    Weuijs.alert('alert');
    Weuijs.tab('.weui-tab', {
      defaultIndex: 0,
      onChange: function(index) {
        console.log(index);
      }
    });
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

        <div className="weui-tab">
          <div className="weui-navbar">
            <div className='weui-navbar__item'>选项一</div>
            <div className='weui-navbar__item'>选项二</div>
            <div className='weui-navbar__item'>选项三</div>  
          </div>
          <div className="weui-tab__panel">
              <div className="weui-tab__content">
                  <h1>页面一</h1>
                  <br/><br/><br/><br/><br/><br/><br/>

                  <br/><br/><br/><br/><br/><br/><br/>
                  <br/><br/><br/><br/><br/><br/><br/>
                  <br/><br/><br/><br/><br/><br/><br/>
                  1123123
              </div>
              <div className="weui-tab__content">
                  <h1>页面二</h1>
              </div>
              <div className="weui-tab__content">
                  <h1>页面三</h1>
              </div>
        </div>
    </div>
      </div>
    )
  }
})


const con_Counter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

export {Counter as Counter,con_Counter as con_Counter}
export default con_Counter