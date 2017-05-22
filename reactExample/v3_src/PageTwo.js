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
	mapStateToProps_PageTwo
} from './lib/States/mapStateToProps_PageTwo'
import {
	mapDispatchToProps_PageTwo
} from './lib/Dispathes/mapDispatchToProps_PageTwo'

 

import common, {
	Ajax,
	API
} from './lib/common'
import {
	fromJS,
	is
} from 'immutable'


import mockData from './mockData/mockData'
import TabBar_Bottom from './components/TabBar_Bottom'
 

class PageTwo extends Component {
	// shouldComponentUpdate(nextProps, nextState) {
	// 	const thisProps = this.props || {},
	// 		thisState = this.state || {};
	// 	const map1 = fromJS(thisProps['V3DemoReducer'].V3_Main)
	// 	const map2 = fromJS(nextProps['V3DemoReducer'].V3_Main)

	// 	console.log('shouldComponentUpdate', !is(map1, map2))
	// 	return !is(map1, map2)
	// }
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
		 
		// Ajax({
		// 	url: API.login,
		// 	doneFun: function(msg) {
		// 		let data = JSON.parse(msg)
		// 		console.log('API.login', data)
		// 		if (data.suc) {
		// 			//onMain_TabbarClick(null, 2)
		// 		} else {
		// 			setTimeout(function() {
		// 				onPro_stateChange('Rejected')
		// 			}, 1)

		// 		}
		// 	},
		// 	failFun: function(jqXHR, textStatus) {

		// 	},
		// 	alwaysFun: function() {}, 
		// 	props: me.props
		// })
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
		const me = this,{
			props: {
				router
			}
		} = this;

	 

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
			Page 2<p> <Link className='weui-btn weui-btn_default' to="/Quote">tttt</Link>afasdfsadfasdfasdf</p>
                    <br/><br/><br/><br/>2<br/><br/><br/>2<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <p> 234234213412341234</p></div>)

	}
	render() {
		// setTimeout(function() {
		// 	hashHistory.push({
		// 		pathname:'/Quote'
		// 	})
		// },2000)
 
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
			<div className='v3_main weui-tab' > 
				<div className="weui-tab__panel">
				 	{barPanelDom}
			    </div>
			    <TabBar_Bottom items={tabbar_bottom_items} onTabClick={onMain_TabbarClick}
			     itemIndex={1}/>
			</div>
		);
	}
}

const con_PageTwo = connect(
	mapStateToProps_PageTwo,
	mapDispatchToProps_PageTwo
)(PageTwo)

export {
	PageTwo,
	con_PageTwo
}
export default con_PageTwo