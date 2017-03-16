import React, {
	Component,
	PropTypes
} from 'react'
import ReactDOM from 'react-dom'
import {
	createStore
} from 'redux'
import {
	Provider,
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

const Test = React.createClass({
	contextTypes: {
		router: React.PropTypes.object
	},
	 
	render() {
		 const {
		      nextVal,
		      onIncreaseTestClick
		    } = this.props
		console.log('Test',this.props)
		return (
			<div>TEST {Val}  {nextVal}
				<button onClick={onIncreaseTestClick}>Increase</button>
			 	<Link to="/">Counter</Link>
			</div>
		);
	}
})


export default Test