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

import 'weui'
import "!style!css!less!../node_modules/jquery-weui/dist/css/jquery-weui.css"



import Jweui from '../node_modules/jquery-weui/dist/js/jquery-weui'

// import WeuiJs from 'weui.js'

import Test from './Test'


// React component
const Counter = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  componentDidMount() {

    $('.tabItem').pullToRefresh().on('pull-to-refresh', function(done) {
      var self = this
      setTimeout(function() {
        $(self).pullToRefreshDone();
      }, 2000)
    })
  },
  domInit(navbarHeadDom,tabItemDom,tabIndex,onNavbarClick) {
    
    for (var i = 0; i < 3; i++) {
      let cls = 'weui-navbar__item',
        tabCls = 'weui-tab__content tabItem  weui-pull-to-refresh';
      if (i == tabIndex) {
        cls += ' weui-bar__item_on'
        tabCls = tabCls.replace(/weui-tab__content/g, '')
      };
      let index = i;
      navbarHeadDom.push(<div className={cls} onClick={e=>onNavbarClick(e,index)}>选项{i}</div>)
      tabItemDom.push(<div className={tabCls}>
                  <div className="weui-pull-to-refresh__layer">
                    <div className='weui-pull-to-refresh__arrow'></div>
                    <div className='weui-pull-to-refresh__preloader'></div>
                    <div className="down">下拉刷新</div>
                    <div className="up">释放刷新</div>
                    <div className="refresh">正在刷新</div>
                  </div>
                  <h1 className="doc-head">页面{i}</h1>
                  <div className="content-padded">
                    <p>  a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. If you're new to jQuery, we recommend that you check out the jQuery Learning Center.</p>
                    <p> is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. If you're new to jQuery, we recommend that you check out the jQuery Learning Center.</p>
                    <p>  is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. If you're new to jQuery, we recommend that you check out the jQuery Learning Center.</p>
                  </div>
              </div>)
    };
  },
  render() {
    let me = this;
    const {
      count,
      onIncreaseClick,
      onTestValClick,
      tabIndex,
      onNavbarClick
    } = this.props
    console.log('Counter', this.context, this.props)
    let navbarHeadDom = [],
      tabItemDom = [];
    me.domInit(navbarHeadDom,tabItemDom,tabIndex,onNavbarClick)

    return (
      <div className='h100' > 
       <span>{count}</span>
        <button onClick={onIncreaseClick}>计数</button> 
        <Link to="/Test">消息计数</Link>

        <button onClick={onTestValClick}>testVal</button> 
        <button onClick={()=>{ 
                  $.alert('alert');
                }}>alert</button>

        <button onClick={()=>{ 
         test 
        }}>testError</button>
        <div className="weui-tab" >
              <div className="weui-navbar">
                {navbarHeadDom}
              </div>
              <div className="weui-tab__panel" >
                  {tabItemDom}
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