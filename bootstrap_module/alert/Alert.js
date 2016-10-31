  import React, {
 	Component,
 	PropTypes
 } from 'react'
 import ReactDOM from 'react-dom'; 
 import $ from './jquery-vendor.js';

	var Alert = React.createClass({
		 
		render: function() {
			var me = this;
			let buttonDom = [];

			if (me.props.prompt) {

				buttonDom.push(<button type="button" className="btn btn-base" onClick={function(){if (me.props.proFun) {me.props.proFun()};}}>确定</button> );
				buttonDom.push(<button type="button" className="btn btn-default" data-dismiss="modal">取消</button> );
			}else {
				buttonDom.push(<button type="button" className="btn btn-default" data-dismiss="modal">确定</button> );
			}
			return ( 
				
				  <div className="modal-dialog" role="document">
				    <div className="modal-content">
				      <div className="modal-header">
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 className="modal-title" id="myModalLabel">{this.props.title}</h4>
				      </div>
				      <div className="modal-body" style={{maxHeight:"400px","overflow":"auto"}}>
				       {this.props.message}
				      </div>
				      <div className="modal-footer">
				        {buttonDom}
				      </div>
				    </div>
				  </div>
				
			);
		}
	});

	module.exports = Alert;
 