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

import {
  mapStateToProps
} from './lib/MapStateToProps'
import {
  mapDispatchToProps
} from './lib/MapDispatchToProps'

import '../node_modules/weui/dist/style/weui.css'
import "!style!css!less!../node_modules/jquery-weui/dist/css/jquery-weui.css"


import Jweui from '../node_modules/jquery-weui/dist/js/jquery-weui'
import Weuijs from 'weui.js'

import Test from './Test'


// React component
const Counter = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  componentDidMount() {
    Weuijs.tab('.weui-tab', {
      defaultIndex: 0,
      onChange: function(index) {
        console.log(index);
      }
    });

    $('.weui-tab__content').pullToRefresh().on('pull-to-refresh', function(done) {
      var self = this
      setTimeout(function() {
        $(self).pullToRefreshDone();
      }, 2000)
    })
  },
  render() {
    const {
      count,
      onIncreaseClick
    } = this.props
    console.log('Counter', this.context, this.props)
    return (
      <div style={{height:'100%'}} > 
       <span>{count}</span>
        <button onClick={onIncreaseClick}>计数</button> 
        <Link to="/Test">消息计数</Link>
        <button onClick={()=>{
                   Weuijs.alert('alert');
                }}>alert</button>
        <div className="weui-tab" >
          <div className="weui-navbar">
            <div className='weui-navbar__item'>选项一</div>
            <div className='weui-navbar__item'>选项二</div>
            <div className='weui-navbar__item'>选项三</div>  
          </div>
          <div className="weui-tab__panel" >
               <div className="weui-tab__content weui-tab__bd-item weui-tab__bd-item--active  weui-pull-to-refresh">
                  <div className="weui-pull-to-refresh__layer">
                    <div className='weui-pull-to-refresh__arrow'></div>
                    <div className='weui-pull-to-refresh__preloader'></div>
                    <div className="down">下拉刷新</div>
                    <div className="up">释放刷新</div>
                    <div className="refresh">正在刷新</div>
                  </div>
                  <h1 className="doc-head">页面一</h1>
                  <div className="content-padded">
                    <p>  a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. If you're new to jQuery, we recommend that you check out the jQuery Learning Center.</p>
                    <p> is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. If you're new to jQuery, we recommend that you check out the jQuery Learning Center.</p>
                    <p>  is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. If you're new to jQuery, we recommend that you check out the jQuery Learning Center.</p>
                  </div>
              </div>
              <div className="weui-tab__content weui-tab__bd-item  weui-pull-to-refresh">
                  <div className="weui-pull-to-refresh__layer">
                      <div className='weui-pull-to-refresh__arrow'></div>
                      <div className='weui-pull-to-refresh__preloader'></div>
                      <div className="down">下拉刷新</div>
                      <div className="up">释放刷新</div>
                      <div className="refresh">正在刷新</div>
                    </div>
                    <h1 className="doc-head">页面二</h1>
                    <div className="content-padded">
                      <p>A great way to get introduced to AngularJS is to work through this tutorial, which walks you through the construction of an AngularJS web app. The app you will build is a catalog that displays a list of Android devices, lets you filter the list to see only devices that interest you, and then view details for any device.</p>
                      <p>A great way to get introduced to AngularJS is to work through this tutorial, which walks you through the construction of an AngularJS web app. The app you will build is a catalog that displays a list of Android devices, lets you filter the list to see only devices that interest you, and then view details for any device.</p>
                      <p>A great way to get introduced to AngularJS is to work through this tutorial, which walks you through the construction of an AngularJS web app. The app you will build is a catalog that displays a list of Android devices, lets you filter the list to see only devices that interest you, and then view details for any device.</p>
                      <p>A great way to get introduced to AngularJS is to work through this tutorial, which walks you through the construction of an AngularJS web app. The app you will build is a catalog that displays a list of Android devices, lets you filter the list to see only devices that interest you, and then view details for any device.</p>
                    </div>
              </div>
              <div className="weui-tab__content weui-tab__bd-item   weui-pull-to-refresh">
                   <div className="weui-pull-to-refresh__layer">
                      <div className='weui-pull-to-refresh__arrow'></div>
                      <div className='weui-pull-to-refresh__preloader'></div>
                      <div className="down">下拉刷新</div>
                      <div className="up">释放刷新</div>
                      <div className="refresh">正在刷新</div>
                    </div>
                    <div className="content-padded">
                      <h1 className="doc-head">页面三</h1>
                      <p>Lots of people use   as the V in MVC. Since   makes no assumptions about the rest of your technology stack, it's easy to try it out on a small feature in an existing project.</p>
                      <p>Lots of people use   as the V in MVC. Since   makes no assumptions about the rest of your technology stack, it's easy to try it out on a small feature in an existing project.</p>
                      <p>Lots of people use   as the V in MVC. Since   makes no assumptions about the rest of your technology stack, it's easy to try it out on a small feature in an existing project.</p>
                    </div>
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

export {
  Counter as Counter, con_Counter as con_Counter
}
export default con_Counter