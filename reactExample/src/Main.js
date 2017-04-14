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

// import FastClick from '../node_modules/jquery-weui/dist/lib/fastclick'


import common, {
  Ajax,
  API
} from './lib/common'

import mockData from './mockData/mockData'


// React component
class Main extends Component {
  contextTypes: {
    router: React.PropTypes.object
  }
  componentDidMount() {
    let me = this;
    // FastClick.attach(document.body); 
  }
  render() {
    const {
      onPro_stateChange,
    } = this.props, {
      pro_state
    } = this.props.counterReducer, me = this;
    console.log('Main', this.context, this.props)
    return (
      <div className='h100' > 
        {this.props.children}
        <div className={pro_state=='Pending'?'showLoading':'hide'}>
            <div className="weui-mask_transparent"></div>
            <div className="weui-toast">
                <i className="weui-loading weui-icon_toast"></i>
                <p className="weui-toast__content">数据加载中</p>
            </div>
        </div>
        <div className={pro_state=='Rejected'?'showDialog':'hide'}>
            <div className="weui-mask"></div>
            <div className="weui-dialog">
                <div className="weui-dialog__hd"><strong className="weui-dialog__title">弹窗标题</strong></div>
                <div className="weui-dialog__bd">弹窗内容，告知当前页面信息等</div>
                <div className="weui-dialog__ft">
                    <a href="javascript:;" 
                    className="weui-dialog__btn weui-dialog__btn_primary" onClick={()=>onPro_stateChange('Resolved')}>确定</a>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

const con_Main = connect(
  mapStateToProps_Main,
  mapDispatchToProps_Main
)(Main)

export {
  Main as Main, con_Main as con_Main
}
export default con_Main