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

const con_Test = connect(
  mapStateToProps,
  mapDispatchToProps
)(Test)

export {Test as Test,con_Test as con_Test}
export default con_Test