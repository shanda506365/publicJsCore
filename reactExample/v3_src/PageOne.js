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
	mapStateToProps_PageOne
} from './lib/States/mapStateToProps_PageOne'
import {
	mapDispatchToProps_PageOne
} from './lib/Dispathes/mapDispatchToProps_PageOne'

 

import common, {
	Ajax,
	API
} from './lib/common'
import {
	fromJS,
	is
} from 'immutable'


 
import TabBar_Bottom from './components/TabBar_Bottom'

import {
  DatePicker,
  message,
  Button 
} from 'antd'

class PageOne extends Component {
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
		  <div style={{ width: 400, margin: '10px auto' }}>
            <DatePicker onChange={(value) => {
              message.info('您选择的日期是: ' + value.toString()); 
            }} />
          <div style={{ marginTop: 20 }}>当前日期：</div>
          <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="danger">Danger</Button>
       </div>
			Page 1  one 1<p> <Link className='weui-btn weui-btn_default' to="/Quote">tttt</Link>afasdfsadfasdfasdf</p>
                    <br/><br/><br/><br/>2<br/><br/><br/>2<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <p> 234234213412341234</p>
					<div className="weui-grids">
					    <a href="javascript:;" className="weui-grid">
					        <div className="weui-grid__icon">
					            <span className='iconfont icon-fuzhi weui-tabbar__icon'/>
					        </div>
					        <p className="weui-grid__label">
					            Button
					        </p>
					    </a>
					    <a href="javascript:;" className="weui-grid">
					        <div className="weui-grid__icon">
					            <img src="./images/icon_nav_cell.png" alt=""/>
					        </div>
					        <p className="weui-grid__label">
					            Cell
					        </p>
					    </a>
					    <a href="javascript:;" className="weui-grid">
					        <div className="weui-grid__icon">
					            <img src="./images/icon_nav_cell.png" alt=""/>
					        </div>
					        <p className="weui-grid__label">
					            Cell
					        </p>
					    </a>
					    <a href="javascript:;" className="weui-grid">
					        <div className="weui-grid__icon">
					            <img src="./images/icon_nav_cell.png" alt=""/>
					        </div>
					        <p className="weui-grid__label">
					            Cell
					        </p>
					    </a>
					</div>
                    </div>)

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
			<div className='v3_main weui-tab' onTouchMove={()=>{console.log('onTouchMove')}}> 
				<div className="weui-tab__panel">
				 	{barPanelDom}
			    </div>
			    <TabBar_Bottom items={tabbar_bottom_items} onTabClick={onMain_TabbarClick}
			     itemIndex={0}/>
			</div>
		);
	}
}

const con_PageOne = connect(
	mapStateToProps_PageOne,
	mapDispatchToProps_PageOne
)(PageOne)

export {
	PageOne,
	con_PageOne
}
export default con_PageOne