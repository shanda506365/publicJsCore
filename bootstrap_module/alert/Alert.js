  import React, {
  	Component,
  	PropTypes
  } from 'react'
  import ReactDOM from 'react-dom';
  import $ from './jquery-vendor.js';

  class Alert extends Component {
  	constructor(props) {
  	  super(props);
  	
  	  this.state = {};
  	}
  	render() {
  		var me = this;
  		let buttonDom = [];

  		if (me.props.prompt) {

  			buttonDom.push(<button type="button" className={me.props.okCls} onClick={me.props.proFun}>确定</button>);
  			buttonDom.push(<button type="button" className={me.props.cancelCls} data-dismiss="modal">取消</button>);
  		} else {
  			buttonDom.push(<button type="button" className={me.props.okCls} onClick={me.props.proFun} data-dismiss="modal">确定</button>);
  		}
  		return (

  			<div className="modal-dialog" role="document">
				    <div className="modal-content">
				      <div className="modal-header">
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 className="modal-title" id="myModalLabel">{this.props.title}</h4>
				      </div>
				      <div className="modal-body" style={{maxHeight:"400px","overflow":"auto","fontSize":"1.4rem"}}>
				       {this.props.message}
				      </div>
				      <div className="modal-footer">
				        {buttonDom}
				      </div>
				    </div>
				  </div>

  		);
  	}
  };
 Alert.defaultProps = {
    'prompt': false, //是否是确认提示框
    proFun:function(){},//确认按钮回调方法
    'data-nofilesdom': true, //上传的文件是否添加删除展示
    'title':'消息',//提示框 title
    message:'',//提示框 文本消息
    okCls:'btn btn-primary',//ok按钮样式
    cancelCls:'btn btn-base',//cancel按钮样式
     
  };
  module.exports = Alert;