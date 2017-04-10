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
  mapStateToProps
} from './lib/MapStateToProps'
import {
  mapDispatchToProps
} from './lib/MapDispatchToProps'

import 'weui'
import "!style!css!less!../node_modules/jquery-weui/dist/css/jquery-weui.css"

import Jweui from '../node_modules/jquery-weui/dist/js/jquery-weui'


const Quote = React.createClass({
	render() {
		return (
			<div className='rc_quote'>
			</div>
		);
	}
})


export default Quote