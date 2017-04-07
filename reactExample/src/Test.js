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

import {mapStateToProps} from './lib/MapStateToProps'
import {mapDispatchToProps} from './lib/MapDispatchToProps' 

import '!style!css!less!../less/test.less'

const Test = React.createClass({
	contextTypes: {
		router: React.PropTypes.object
	},
	 
	render() {
		 const {
		      count,
		      title,
		      onIncreaseTestClick,
		      buttonText
		    } = this.props
		console.log('Test',this.props)
		return (
			<div><h4>TEST {count}  {title}</h4>
			    <ul className='rongqi' onClick={()=>{$('.rongqi').scrollLeft($('.rongqi').scrollLeft()+50)}}>
			    	<li className='children'>123123123</li>   
			    	<li className='children'>123123123</li>   
			    	<li className='children'>123123123</li>   
			    	<li className='children'>123123123</li>   
			    	<li className='children'>123123123</li>   
			    	<li className='children'>123123123</li>   
			    	<li className='children'>123123123</li>   
			    </ul>
				<div className="weui-flex">
					<div className="weui-flex__item">
						<button className='weui-btn weui-btn_primary' onClick={onIncreaseTestClick}>{buttonText}</button>
					</div>
					<div className="weui-flex__item">
							<Link className='weui-btn weui-btn_default' to="/">计数</Link>
					</div>
				</div>
				
			 
			</div>
		);
	}
})
console.log(mapStateToProps)
const con_Test = connect(
  mapStateToProps['mapStateToProps_Test'],
  mapDispatchToProps['mapDispatchToProps_Test']
)(Test)

export {Test as Test,con_Test as con_Test}
export default con_Test