  import React, {
  	Component,
  	PropTypes
  } from 'react'
   
  import ReactDOM from 'react-dom';
  import bootstrapLess from "!style!css!less!../node_modules/bootstrap/less/bootstrap.less";
  import bootstrapValidatorCss from "../css/bootstrapValidator.css";
  import loadmaskLess from "!style!css!less!../less1/loadmask.less";


  import $ from './jquery-vendor.js';
  import common from './common';
  import bootstrap from '../node_modules/bootstrap/dist/js/bootstrap.min';
  import bootstrapValidator from './bootstrapValidator.sea';
  import loadMask from './LoadMask';


  import Alert from './Alert';



  import H5FIleUpload from './H5FIleUpload';
 
  class Customer_info extends Component {
  	constructor(props) {
  		super(props);
  		let customer = JSON.parse($('.htmlbody').attr('data-customer'));
  		this.showAlert = this.showAlert.bind(this);
  		this.state = {
  			title: '消息',
  			message: '...',
  			headPicFile: customer.picture,
  			business_licence_image: customer.business_licence_image,
  			organization_code_image: customer.organization_code_image
  		};
  	}
  	showAlert() {
  		console.log($(this.refs.myModal));
  		$(this.refs.myModal).modal();
  	}
  	componentDidMount() {
  		var me = this;
  		$('.customer_infoForm').bootstrapValidator({
  			message: common.regex.fail_text,
  			feedbackIcons: {
  				valid: common.feedbackIcons.valid,
  				invalid: common.feedbackIcons.invalid,
  				validating: common.feedbackIcons.validating
  			}
  		});
  		var form = $('.customer_infoForm').data('bootstrapValidator');
  		//form.validate();
  		$('.submit').click(function() {
  			//$(this).attr('disabled','disabled');
  			if (me.state.business_licence_image.length == 0) {
  				me.setState({
  					title: '消息',
  					message: '请上传营业执照'
  				});
  				me.showAlert();
  				return;
  			};
  			if (me.state.organization_code_image.length == 0) {
  				me.setState({
  					title: '消息',
  					message: '请上传组织机构代码'
  				});
  				me.showAlert();
  				return;
  			};
  			form.validate();
  			if (form.isValid()) {
  				var arr = form.$form.serializeArray();
  				$.ajax({
  					type: 'POST',
  					url: common.createUrl($('.htmlbody').attr('data-ajax-submit')),
  					data: arr,
  					beforeSend: function() {
  						$('.customer_info').loadingOverlay();
  					},
  					success: function(data) {
  						$('.customer_info').loadingOverlay('remove');

  						if (data.suc) {
  							me.setState({
  								title: '消息',
  								message: '修改成功'
  							});
  							me.showAlert();
  						} else {
  							me.setState({
  								title: '消息',
  								message: data.msg
  							});
  							me.showAlert();
  						}
  					},
  					error: function(XMLHttpRequest, textStatus) {
  						$('.customer_info').loadingOverlay('remove');
  						me.setState({
  							title: textStatus,
  							message: JSON.stringify(XMLHttpRequest)
  						});
  						me.showAlert();
  					},
  					dataType: "json"
  				});

  			} else {
  				document.documentElement.scrollTop = document.body.scrollTop = 300;
  			}

  		});
  		let customer = JSON.parse($('.htmlbody').attr('data-customer'));
  		//如有表单填写默认值 
  		if (customer) {
  			for (var key in customer) {

  				if (name == 'files') {

  				} else {
  					$('[name=' + key + ']').val(customer[key]);
  				}
  			}
  		};
  	}
  	 
  	render() {
  		var me = this;


  		let customer = JSON.parse($('.htmlbody').attr('data-customer'));
  		let headPicFile = me.state.headPicFile;
  		let business_licence_image = me.state.business_licence_image;
  		let organization_code_image = me.state.organization_code_image;

  		let company_typeDom = [];
  		let company_type = ["私营企业", "合资企业", "事业单位", "国营企业", "其他"];
  		$.each(company_type, function(index, item) {
  			if (item == customer.company_type) {
  				company_typeDom.push(<option key={index} value={item} selected='selected'>{item}</option>);
  			} else {
  				company_typeDom.push(<option key={index} value={item}>{item}</option>);
  			}

  		});

  		let fileUploadExDom = [];
  		fileUploadExDom.push(<div className="inline-block fileUploadExDom">
									<div className="inline-block control-tip">可上传 JPG,PNG,GIF</div>
				 					 <div className="inline-block">
										<span className="glyphicon glyphicon-question-sign question" 
											data-toggle="tooltip" data-placement="bottom" 
											title="可上传 JPG,PNG,GIF等图片格式的文件，大小限制10m"></span>
									</div>
								</div>);
  		return (
  			<div>
				 
					<div className="customer_info container">	
						 
						 
						 	<form className="customer_infoForm form-horizontal  center-block">
								 
						     
						       
						         <div className="form-group"> 
						         
						        	 <img ref='headPic' src="" alt=""/>
						        		 
							            <H5FIleUpload  
					 					 data-size='2000000'  data-acceptFileTypes='images'
					 					 data-count='1' data-files={headPicFile}
					 					 data-url={$('.htmlbody').attr('data-upload-headPic')}
					 					 data-sucFun={function(files){  
					 					 		me.refs.headPic.src = decodeURI(files[0].url);
					 					 		me.setState({
					 					 			headPic:files
					 					 		});
					 					 }}
					 					 
					 					 data-errorFun={function(msg){me.setState({
													title: '错误',
													message: msg
												});
												me.showAlert();}}
										/>  
						        	
						        </div>		
						        
						        </form>
						        </div>
					 

				 
					
					<div className="modal fade" ref='myModal'   tabIndex="-1" role="dialog">
						<Alert title={this.state.title} message={this.state.message} />
					</div>
				</div>
  		);
  	}
  }

  $(function() {
  	ReactDOM.render(
  		<Customer_info />,
  		$('.htmlbody').get(0)
  	);
  });