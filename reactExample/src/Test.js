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
	mapStateToProps_Test
} from './lib/MapStateToProps'
import {
	mapDispatchToProps_Test
} from './lib/MapDispatchToProps'

import '!style!css!less!../less/test.less'

import {
	mData
} from './mockData/mockData'
import { 
	Map,
	is,
	fromJS
} from 'immutable'
class Test extends Component {
	contextTypes: {
		router: React.PropTypes.object
	}
	shouldComponentUpdate(nextProps, nextState) {
		const thisProps = this.props || {},
			thisState = this.state || {};
		const map1 = fromJS(thisProps['counterReducer'].count)
		const map2 = fromJS(nextProps['counterReducer'].count)

		console.log('shouldComponentUpdate', map1, map2, is(map1, map2))
		return !is(map1, map2)
	}
	render() {
		const {
			onIncreaseTestClick,
			onPro_stateChange,
			counterReducer: {
				count,
				title,
				buttonText
			}
		} = this.props
		console.log('Test==', this.props)
		let liDom = []
		console.log(mData)
		$.each(mData.data, function(ix, item) {
				liDom.push( <li className = 'children'
					onClick = {
						(e) => {
							console.log($(e.target).width())
						}
					} > {
						item.name
					} </li>)
				})
			//for (let tt of mData.data) { 
			// }; 
			return (
				<div><h4>TEST111 {count}  {title}</h4>
			    <ul className='rongqi' onClick={()=>{$('.rongqi').scrollLeft($('.rongqi').scrollLeft()+50)}}>
			    	   {liDom}
			    </ul>
		  <input type="text"/>
			   
				<div className="weui-flex">
					<div className="weui-flex__item">
						<button className='weui-btn weui-btn_primary h100' onClick={onIncreaseTestClick}>
						{buttonText}</button>
					</div>
					<div className="weui-flex__item">
							<Link className='weui-btn weui-btn_default' to="/">计数计数计数计数计数</Link>
					</div>
					<div className="weui-flex__item">
						<Link className='weui-btn weui-btn_default h100' to="/Quote">报价</Link>
					</div>
					<div className="weui-flex__item">
						<Link className='weui-btn weui-btn_default h100' to="/ReduxForm">ReduxForm</Link>
					</div>
					
				</div>
				<div className="weui-flex">
					<div className="weui-flex__item">
						<button className='weui-btn weui-btn_primary' onClick={()=>onPro_stateChange('Rejected')}>
						Rejected</button>
					</div>
					<div className="weui-flex__item">
						<button className='weui-btn weui-btn_primary' onClick={()=>onPro_stateChange('Pending')}>
						Pending</button>
					</div>
				</div>
				
			</div>
			);
		}
	}
	const con_Test = connect(
		mapStateToProps_Test,
		mapDispatchToProps_Test
	)(Test)

	export {
		Test as Test, con_Test as con_Test
	}
	export default con_Test