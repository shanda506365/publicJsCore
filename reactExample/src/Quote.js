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
} from './lib/MapStateToProps'
import {
	mapDispatchToProps_Quote
} from './lib/MapDispatchToProps'

 
import '../css/iconfont.css'

import common, {
	Ajax,
	API
} from './lib/common'
 import { 
   fromJS, is
 } from 'immutable'
class Quote extends Component {
	contextTypes: {
		router: React.PropTypes.object
	}
	shouldComponentUpdate(nextProps, nextState) {
		const thisProps = this.props || {},
			thisState = this.state || {};
		const map1 = fromJS(thisProps['counterReducer'].Quote)
		const map2 = fromJS(nextProps['counterReducer'].Quote)
	 
		console.log('shouldComponentUpdate', !is(map1, map2))
		return !is(map1, map2)
	}
	componentDidMount() {
		const {
			onTabbarClick,
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

		Ajax({
			url: API.login,
			doneFun: function(msg) {
				let data = JSON.parse(msg)
				console.log('API.login', data)
				if (data.suc) {
					onTabbarClick(null, 2)
				} else {
					setTimeout(function() {
						onPro_stateChange('Rejected')
					}, 1)

				}
			},
			failFun: function(jqXHR, textStatus) {

			},
			alwaysFun: function() {},
			context: me.props.context,
			props: me.props
		})
	}
	choseBarItemCls(index) {
		const {
			Quote
		} = this.props.counterReducer, me = this;
		return "weui-tabbar__item " + (Quote.tabIndex == index ? 'weui-bar__item_on' : '')
	}
	choseBarPanelCls(index) {
		const {
			Quote
		} = this.props.counterReducer, me = this;
		return Quote.tabIndex == index ? 'barpanel weui-pull-to-refresh' : 'barpanel hide weui-pull-to-refresh'
	}
	domInit(param) {
		const me = this;

		param.barItemDom.push(<a href="javascript:;" className={me.choseBarItemCls(0)} onClick={e=>param.onTabbarClick(e,0)}>
			            <span className="iconfont icon-fuzhi weui-tabbar__icon"></span>
			            <p className="weui-tabbar__label">微信</p>
			        </a>)
		param.barItemDom.push(<a href="javascript:;" className={me.choseBarItemCls(1)} onClick={e=>param.onTabbarClick(e,1)}>
			            <span className="iconfont icon-qiandai weui-tabbar__icon"></span>
			            <p className="weui-tabbar__label">通讯录</p>
			        </a>)
		param.barItemDom.push(<a href="javascript:;" className={me.choseBarItemCls(2)} onClick={e=>param.onTabbarClick(e,2)}>
			            <span className="iconfont icon-icon weui-tabbar__icon"></span>
			            <p className="weui-tabbar__label">发现</p>
			        </a>)
		param.barItemDom.push(<a href="javascript:;" className={me.choseBarItemCls(3)} onClick={e=>param.onTabbarClick(e,3)}>
			            <span className="iconfont icon-15 weui-tabbar__icon"></span>
			            <p className="weui-tabbar__label">我</p>
			        </a>)

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
			Page 1<Link className='weui-btn weui-btn_default' to="/">消息计数{param.count}</Link><p> afasdfsadfasdfasdf</p>
                    <br/><br/><br/><br/>2<br/><br/><br/>2<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <p> 234234213412341234</p></div>)

		param.barPanelDom.push(<div className={me.choseBarPanelCls(1)}>
			{pullDiv}Page 2<Link className='weui-btn weui-btn_primary' to="/">消息计数{param.count}</Link>
			<p> afasdfsadfasdfasdf</p>
                    <br/><br/><br/><br/>2<br/><br/><br/>2<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <p> 234234213412341234</p></div>)
		param.barPanelDom.push(<div className={me.choseBarPanelCls(2)}>{pullDiv}Page 3<Link className='weui-btn weui-btn_default' to="/">消息计数{param.count}</Link></div>)
		param.barPanelDom.push(<div className={me.choseBarPanelCls(3)}>
			{pullDiv}Page 4<Link className='weui-btn weui-btn_primary' to="/">消息计数{param.count}</Link></div>)
	}
	render() {
		const {
			onTabbarClick,
			onPro_stateChange,
			counterReducer: {
				count
			}
		} = this.props, me = this;
		console.log('Quote===', this.props)
		let barItemDom = [],
			barPanelDom = []
		me.domInit({
			count,
			onTabbarClick,
			barItemDom,
			barPanelDom,
			onPro_stateChange
		})


		return (
			<div className='rc_quote weui-tab' onTouchMove={()=>{console.log('onTouchMove')}}> 
				<div className="weui-tab__panel">
				 	{barPanelDom}
			    </div>
			    <div className="weui-tabbar">
			        {barItemDom}
			    </div> 
			</div>
		);
	}
}

const con_Quote = connect(
	mapStateToProps_Quote,
	mapDispatchToProps_Quote
)(Quote)

export {
	Quote as Quote, con_Quote as con_Quote
}
export default con_Quote