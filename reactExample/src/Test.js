import React, {
	Component,
	PropTypes
} from 'react'
import ReactDOM from 'react-dom'
 
import {
	Router,
	Route,
	Link,
	hashHistory,
	IndexRoute,
	IndexLink
} from 'react-router'

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


export default Test