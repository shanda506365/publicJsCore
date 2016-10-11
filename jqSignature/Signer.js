 const React = require('react');
 const ReactDOM = require('react-dom');
 let $ = require('jquery');
 require('./jq-signature');
 var Signer = React.createClass({
 	clearCanvas: function() {
 		var me = this;
 		$(me.refs.signature).html('<p><em>预览</em></p>');
 		$('.js-signature').eq(0).jqSignature('clearCanvas');
 		$(me.refs.saveBtn).attr('disabled', true);
 	},
 	saveSignature: function() {
 		var me = this;
 		$(me.refs.signature).empty();
 		var dataUrl = $('.js-signature').eq(0).jqSignature('getDataURL');
 		var img = $('<img>').attr('src', dataUrl);
 		$(me.refs.signature).append($('<p>').text("签名预览:"));
 		$(me.refs.signature).append(img);
 	},
 	componentDidMount: function() {
 		var me = this;
 		$('.js-signature').eq(0).on('jq.signature.changed', function() {
 			$(me.refs.saveBtn).attr('disabled', false);
 		});
 		if ($('.js-signature').length) {
 			$('.js-signature').jqSignature();
 		}
 	},
 	render: function() {
 		var me = this;
 		return (
 			<div className="signer">
					<div className="js-signature" data-width="100%" data-height="100" data-border="1px solid black" data-line-color="#bc0000" data-auto-fit="true">
					</div>
					<p><button ref="clearBtn" className="btn btn-default" onClick={me.clearCanvas}>清除</button>
					&nbsp;<button ref="saveBtn" className="btn btn-default" onClick={me.saveSignature} >保存签名</button>
					</p>
					<div ref="signature">
						<p><em>预览</em></p>
					</div> 
				</div>
 		);
 	}
 });

 module.exports = Signer;