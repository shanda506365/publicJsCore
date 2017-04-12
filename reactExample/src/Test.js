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

import {mapStateToProps_Test} from './lib/MapStateToProps'
import {mapDispatchToProps_Test} from './lib/MapDispatchToProps' 

import '!style!css!less!../less/test.less'

import {mData} from './mockData/mockData'

class Test extends Component {
	contextTypes: {
		router: React.PropTypes.object
	} 
	render() {
		 const {
		      count,
		      title,
		      onIncreaseTestClick,
		      buttonText
		    } = this.props
		console.log('Test',this.props)
		let liDom=[] 
		console.log(mData)
		$.each(mData.data,function(ix,item){
			liDom.push(<li className='children' onClick={(e)=>{
			    		console.log($(e.target).width())
			    	}}>{item.name}</li>)
		})
		return (
			<div><h4>TEST {count}  {title}</h4>
			    <ul className='rongqi' onClick={()=>{$('.rongqi').scrollLeft($('.rongqi').scrollLeft()+50)}}>
			    	   {liDom}
			    </ul>
				<div className="weui-flex">
					<div className="weui-flex__item">
						<button className='weui-btn weui-btn_primary' onClick={onIncreaseTestClick}>
						{buttonText}</button>
					</div>
					<div className="weui-flex__item">
							<Link className='weui-btn weui-btn_default' to="/">计数</Link>
					</div>
					<div className="weui-flex__item">
						<Link className='weui-btn weui-btn_default' to="/Quote">报价</Link>
					</div>
				</div>
				 <div className='showLoading'>
				    <div className="weui-mask_transparent"></div>
				    <div className="weui-toast">
				        <i className="weui-loading weui-icon_toast"></i>
				        <p className="weui-toast__content">数据加载中</p>
				    </div>
				</div>
			 	<div className="showDialog">
				    <div className="weui-mask"></div>
				    <div className="weui-dialog">
				        <div className="weui-dialog__hd"><strong className="weui-dialog__title">弹窗标题</strong></div>
				        <div className="weui-dialog__bd">弹窗内容，告知当前页面信息等</div>
				        <div className="weui-dialog__ft">
				            <a href="javascript:;" className="weui-dialog__btn weui-dialog__btn_primary">确定</a>
				        </div>
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

export {Test as Test,con_Test as con_Test}
export default con_Test