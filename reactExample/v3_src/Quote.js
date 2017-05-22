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
  mapStateToProps_Quote
} from './lib/States/mapStateToProps_Quote'
import {
  mapDispatchToProps_Quote
} from './lib/Dispathes/mapDispatchToProps_Quote'
 
import {
  fromJS,
  is
} from 'immutable'
import TabBar_Bottom from './components/TabBar_Bottom'

class Quote extends Component {
  componentDidMount() {
    const {
      onMain_TabbarClick,
      onPro_stateChange
    } = this.props, me = this;
    $('.barpanel').pullToRefresh().on('pull-to-refresh', function(done) {
      var self = this
      console.log('refresh')
      setTimeout(function() {
        $(self).pullToRefreshDone();
      }, 2000)
    })
    $('.weui-tab__panel').css('height', document.body.clientHeight - 50);
     
    
  }
  choseBarItemCls(index) {
    const {
      V3DemoReducer: {
        V3_Main: {
          tabIndex
        }
      }
    } = this.props, me = this;
    return "weui-tabbar__item " + (tabIndex == index ? 'weui-bar__item_on' : '')
  }
  choseBarPanelCls(index) { 
    return 0 == index ? 'barpanel weui-pull-to-refresh' : 'barpanel hide weui-pull-to-refresh'
  }
  domInit(param) {
    const me = this;

   

    const pullDiv = [<div className="weui-pull-to-refresh__layer">
                    <div className='weui-pull-to-refresh__arrow'></div>
                    <div className='weui-pull-to-refresh__preloader'></div>
                    <div className="down">下拉刷新</div>
                    <div className="up">释放刷新</div>
                    <div className="refresh">正在刷新</div>
                  </div>]
    param.barPanelDom.push(<div className={me.choseBarPanelCls(0)}>
      {pullDiv}
      <div className="weui-flex">
      <div className="weui-flex__item">
            <button className='weui-btn weui-btn_primary' onClick={()=>param.onPro_stateChange('Rejected')}>
            Rejected</button>
          </div>
          <div className="weui-flex__item">
            <button className='weui-btn weui-btn_primary' onClick={()=>param.onPro_stateChange('Pending')}>
            Pending</button>
          </div>
          </div>
      Page 3<p>  {JSON.stringify(this.props)}
                <Link className='weui-btn weui-btn_default' to="/">tttt</Link>afasdfsadfasdfasdf</p>
                    <br/><br/><br/><br/>2<br/><br/><br/>2<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <p> 234234213412341234</p></div>)

  }
  render() { 
 
    const {
      onMain_TabbarClick,
      onPro_stateChange,
      V3DemoReducer: {
        V3_Main: {
          tabIndex,
          tabbar_bottom_items
        }
      }
    } = this.props, me = this;
    let  barPanelDom = []
    me.domInit({
      onMain_TabbarClick, 
      barPanelDom,
      onPro_stateChange
    })

     
    return (
      <div className="v3_quote weui-tab">
          <div className="weui-tab__panel">
          {barPanelDom}
         
          </div>
          <TabBar_Bottom items={tabbar_bottom_items} onTabClick={onMain_TabbarClick}
           itemIndex={2}/>
                
         </div>
    )
  }
}


const con_Quote = connect(
  mapStateToProps_Quote,
  mapDispatchToProps_Quote
)(Quote)

export {
  Quote,
  con_Quote
}
export default con_Quote