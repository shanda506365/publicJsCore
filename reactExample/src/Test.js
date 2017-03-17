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
		      onIncreaseTestClick
		    } = this.props
		console.log('Test',this.props)
		return (
			<div>TEST {count}  {title}
				<button onClick={onIncreaseTestClick}>消息计数</button>
			 	<Link to="/">计数</Link>
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