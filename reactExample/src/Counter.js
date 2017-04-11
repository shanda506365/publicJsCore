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
  mapStateToProps_Counter
} from './lib/MapStateToProps'
import {
  mapDispatchToProps_Count
} from './lib/MapDispatchToProps'

import 'weui'
import "!style!css!less!../node_modules/jquery-weui/dist/css/jquery-weui.css"



import Jweui from '../node_modules/jquery-weui/dist/js/jquery-weui'

// import WeuiJs from 'weui.js'
 

// React component
class Counter extends Component {
  contextTypes: {
    router: React.PropTypes.object
  }
  componentDidMount() {
    let me = this;
    
    $('.tabItem').pullToRefresh().on('pull-to-refresh', function(done) {
      var self = this
      console.log('refresh')
      setTimeout(function() {
        $(self).pullToRefreshDone();
      }, 2000)
    })
  }
  domInit(navbarHeadDom, tabItemDom, tabIndex, count, onNavbarClick, onIncreaseClick, onTestValClick) {

    for (var i = 0; i < 3; i++) {
      let cls = 'weui-navbar__item',
        tabCls = 'weui-tab__content tabItem  weui-pull-to-refresh h100';
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
                   <h4>{count}</h4>
                    <div className="weui-flex">
                       <div className="weui-flex__item">
                        <button className='weui-btn weui-btn_primary' onClick={onIncreaseClick}>计数</button>
                       </div>
                       <div className="weui-flex__item">
                        <Link className='weui-btn weui-btn_default' to="/Test">消息计数</Link>
                       </div>
                       <div className="weui-flex__item">
                        <button className='weui-btn weui-btn_primary' onClick={onTestValClick}>testVal</button> 
                       </div>
                       <div className="weui-flex__item">
                        <button className='weui-btn weui-btn_primary' onClick={()=>{ 
                                $.alert('alert');
                              }}>alert</button>
                       </div>
                       <div className="weui-flex__item">
                        <button className='weui-btn weui-btn_primary' onClick={()=>{ 
                           test 
                          }}>testError</button>
                       </div> 
                      
                  </div>
                  <div className="content-padded">
                    <p> adsfadfadsfitasdfadfasdfa</p>
                    <p> afasdfsadfasdfasdf</p>
                    <br/><br/><br/><br/>2<br/><br/><br/>2<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <p> 234234213412341234</p>
                  </div>
              </div>)
    };
  }
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
    me.domInit(navbarHeadDom, tabItemDom, tabIndex, count, onNavbarClick, onIncreaseClick, onTestValClick)

    return (
      <div className='h100' >  
        
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
}


const con_Counter = connect(
  mapStateToProps_Counter,
  mapDispatchToProps_Count
)(Counter)

export {
  Counter as Counter, con_Counter as con_Counter
}
export default con_Counter