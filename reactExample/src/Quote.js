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

import 'weui'
//import "!style!css!less!../node_modules/jquery-weui/dist/css/jquery-weui.css"

//import Jweui from '../node_modules/jquery-weui/dist/js/jquery-weui'


const Quote = React.createClass({
	contextTypes: {
		router: React.PropTypes.object
	},
	componentDidMount() {
		let me = this;

		$('.tabItem').pullToRefresh().on('pull-to-refresh', function(done) {
			var self = this
			console.log('refresh')
			setTimeout(function() {
				$(self).pullToRefreshDone();
			}, 2000)
		})
	},
	choseBarItemCls(index){
		const {
		 	Quote
		} = this.props,me=this; 
		return "weui-tabbar__item "+(Quote.tabIndex==index?'weui-bar__item_on':'')
	},
	choseBarPanelCls(index){
		const {
		 	Quote
		} = this.props,me=this; 
		return Quote.tabIndex==index?'':'hide'
	},
	domInit(param) {
		const me=this; 
		param.barItemDom.push(<a href="javascript:;" className={me.choseBarItemCls(0)} onClick={e=>param.onTabbarClick(e,0)}>
			            <img src="./images/icon_tabbar.png" alt="" className="weui-tabbar__icon"/>
			            <p className="weui-tabbar__label">微信</p>
			        </a>)
		param.barItemDom.push(<a href="javascript:;" className={me.choseBarItemCls(1)} onClick={e=>param.onTabbarClick(e,1)}>
			            <img src="./images/icon_tabbar.png" alt="" className="weui-tabbar__icon"/>
			            <p className="weui-tabbar__label">通讯录</p>
			        </a>)
		param.barItemDom.push(<a href="javascript:;" className={me.choseBarItemCls(2)} onClick={e=>param.onTabbarClick(e,2)}>
			            <img src="./images/icon_tabbar.png" alt="" className="weui-tabbar__icon"/>
			            <p className="weui-tabbar__label">发现</p>
			        </a>)
		param.barItemDom.push(<a href="javascript:;" className={me.choseBarItemCls(3)} onClick={e=>param.onTabbarClick(e,3)}>
			            <img src="./images/icon_tabbar.png" alt="" className="weui-tabbar__icon"/>
			            <p className="weui-tabbar__label">我</p>
			        </a>)


		param.barPanelDom.push(<div className={me.choseBarPanelCls(0)}>Page 1<Link className='weui-btn weui-btn_default' to="/">计数</Link></div>)
		param.barPanelDom.push(<div className={me.choseBarPanelCls(1)}>Page 2<Link className='weui-btn weui-btn_default' to="/">计数</Link></div>)
		param.barPanelDom.push(<div className={me.choseBarPanelCls(2)}>Page 3<Link className='weui-btn weui-btn_default' to="/">计数</Link></div>)
		param.barPanelDom.push(<div className={me.choseBarPanelCls(3)}>Page 4<Link className='weui-btn weui-btn_default' to="/">计数</Link></div>)
	},
	render() {
		const {
			Quote,
			onTabbarClick  
		} = this.props,me=this;
		console.log('Quote===',this.props)
		let barItemDom = [],
			barPanelDom = []
		me.domInit({
			Quote,
			onTabbarClick,
			barItemDom,
			barPanelDom 
		})

		return (
			<div className='rc_quote weui-tab'>
				<div className="weui-tab__panel">
					 {barPanelDom}
			    </div>
			    <div className="weui-tabbar">
			        {barItemDom}
			    </div>
			</div>
		);
	}
})

const con_Quote = connect(
	mapStateToProps_Quote,
	mapDispatchToProps_Quote
)(Quote)

export {
	Quote as Quote, con_Quote as con_Quote
}
export default con_Quote