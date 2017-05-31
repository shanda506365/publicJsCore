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
	mapStateToProps_PageFour
} from './lib/States/mapStateToProps_PageFour'
import {
	mapDispatchToProps_PageFour
} from './lib/Dispathes/MapDispatchToProps_PageFour'



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


class PageFour extends Component {
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
		// onSomeButtonClicked() {
		// 	const {
		// 		V3DemoReducer: {
		// 			V3_Main: {
		// 				tabIndex 
		// 			}
		// 		},
		// 		dispatch
		// 	} = this.props
		// 	dispatch({
		// 		type: 'USER_FETCH_REQUESTED',
		// 		payload: {
		// 			tabIndex
		// 		}
		// 	})
		// }
	domInit(param) {
		console.log('ddd',this.props)
		const me = this,
			{
				props: {
					router,
					V3DemoReducer:{
						PageFour
					},
					dispatch
				},
				
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
			 <input type="text" value={PageFour.value} onChange={(e)=>{
			 	dispatch({
			 		type:'myInputChange',
			 		payload:{e}
			 	})
			 }}

			 // {(e)=>{
				//  	if (!/\D/.test(e.target.value)){

				//  	}else{

				//  	}
			 // 		console.log('change',e.target.value)
			 // 	}
			 // } 
			 //onKeyDown={(e)=>{
			 
			 	 //e.preventDefault()
			//  	  var keynum;
			// 	    var keychar;
   // console.log(e.keyCode,e.which)
			// 	    keynum = window.event ? e.keyCode : e.which;
			// 	     if (e.which == 68) {e.preventDefault()};
			// 	    keychar = String.fromCharCode(keynum); 
			//  	 return false
			// }} onKeyUp={(e)=>{
// if (e.which == 68) {e.preventDefault()};
// 			 	 console.log(e.keyCode,e.which)

			 	//return false
			 //  
			  style={{"ime-mode":"disabled"}}/>
				<button className='weui-btn weui-btn_primary' onClick={(e)=>param.onSomeButtonClicked(e,param.tabIndex)}>
						onSomeButtonClicked</button>
						<button className='weui-btn weui-btn_primary' onClick={()=>param.onPro_stateChange('Rejected')}>
						Rejected</button>
					</div>
					<div className="weui-flex__item">
						<button className='weui-btn weui-btn_primary' onClick={()=>param.onPro_stateChange('Pending')}>
						Pending</button>
					</div>
					</div>
			Page 4<p> <Link className='weui-btn weui-btn_default' to="/Quote">tttt</Link>afasdfsadfasdfasdf</p>
                    <br/><br/><br/><br/>2<br/><br/><br/>2<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <p> 234234213412341234</p></div>)

	}
	render() {
		//  
		// setTimeout(function() {
		// 	hashHistory.push({
		// 		pathname:'/Quote'
		// 	})
		// },2000)
		// function* numbers() {
		//     console.log('function start.');

		//     var v1 = yield 0;
		//     console.log('v1 = ' + v1);

		//     var v2 = yield 1;
		//     console.log('v2 = ' + v2);

		//     return 5;
		// }

		// var nums = numbers();
		// console.log(nums.next(nums.next(nums.next().value).value).value);  
		const {
			onMain_TabbarClick,
			onPro_stateChange,
			onSomeButtonClicked,
			V3DemoReducer: {
				V3_Main: {
					tabIndex,
					tabbar_bottom_items
				}
			}
		} = this.props, me = this;
		let barPanelDom = []
		me.domInit({
			onMain_TabbarClick,
			barPanelDom,
			onPro_stateChange,
			onSomeButtonClicked,
			tabIndex
		})


		return (
			<div className='v3_main weui-tab' onTouchMove={()=>{console.log('onTouchMove')}}> 
				<div className="weui-tab__panel">
				 	{barPanelDom}
			    </div>
			    <TabBar_Bottom items={tabbar_bottom_items} onTabClick={onMain_TabbarClick}
			     itemIndex={3}/>
			</div>
		);
	}
}

const con_PageFour = connect(
	mapStateToProps_PageFour,
	mapDispatchToProps_PageFour
)(PageFour)

export {
	PageFour,
	con_PageFour
}
export default con_PageFour