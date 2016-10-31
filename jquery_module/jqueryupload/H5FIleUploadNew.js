  import React, {
 	Component,
 	PropTypes
 } from 'react'
 import ReactDOM from 'react-dom';
 import $ from './jquery-vendor.js';

	let common = require('./common'); 
	require('./jquery.ui.widget');
	require('./jquery.iframe-transport');
	require('./jquery.fileupload');
	require('./jquery.fileupload-process');
	require('./jquery.fileupload-validate');

	var H5FIleUpload = React.createClass({
		componentDidMount: function() {
			let me = this;

			let url = me.props["data-url"]?me.props["data-url"]:'/upload1/server/php/';
			let types = me.props["data-acceptFileTypes"];
			let typesMsg = '*';
			if (types) {
				if (types == 'images') {
					types = /(\.|\/)(gif|jpe?g|png)$/i;
					typesMsg = 'gif|jpg|png';
				};
			} else {
				types = /(\.|\/)(\w*)$/i;
			}
			let dataErrorFun = me.props["data-errorFun"];
			let dataSucFun =  me.props["data-sucFun"];
			let maxNumberOfFiles = me.props['data-count'];
			let options = {
				url: url,
				dataType: 'json',
				acceptFileTypes: types, ///(\.|\/)(gif|jpe?g|png)$/i,
				typesMsg:typesMsg,
				maxFileSize: me.props["data-size"] ? me.props["data-size"] : 10000000,
				maxNumberOfFiles: maxNumberOfFiles ? parseInt(maxNumberOfFiles) : 100,
				singleFileUploads: maxNumberOfFiles ? false : true //,
					// getNumberOfFiles:function(ddd){
					// 	var count = 100;
					// 	if (maxNumberOfFiles) {
					// 		count=parseInt(maxNumberOfFiles)
					// 	}
					// 	console.log(ddd);
					// 	return count;
					// } 
			};
			$(me.refs.h5fileupload_input).fileupload(options).on('fileuploadprogress', function(e, data) { 
			}).on('fileuploadprogressall', function(e, data) { 
					$(me.refs.progress_bar).css(
							'width',
							 '1%'
						);
					var progress = parseInt(data.loaded / data.total * 100, 10);
				 

					setTimeout(function(){ 
					
						$(me.refs.progress_bar).css(
							'width',
							progress + '%'
						);
					},1000)

					
				}).on('fileuploaddone', function(e, data) {
					// console.log(e);
					// console.log(data.result);
					 
					// $.each(data.result.files, function(index, file) {
					// 	$('<div />').text(file.name).appendTo(me.refs.files);
					// });
					if (data.result.suc) {

						let arr = me.state.files; 
						if (options.singleFileUploads) {
							Array.prototype.push.apply(arr, data.result.data);
						} else {
							arr = data.result.data;
						} 
						me.setState({
							files: arr
						});
						if (dataSucFun) {
							dataSucFun(arr);
						};
					}else {
						if (dataErrorFun) {
							dataErrorFun(data.result.msg);
						};
					}
					
				}).on('fileuploadprocessalways', function(e, data) {
					var index = data.index,
						file = data.files[index];  
					if (file.error) { 
						if (dataErrorFun) {
							dataErrorFun(file.error);
						};
					}

				}).prop('disabled', !$.support.fileInput)
				.parent().addClass($.support.fileInput ? undefined : 'disabled');

		},
		deleteFile: function(url,fid) {
			var me = this;
			let dataErrorFun = me.props["data-errorFun"];
			$.ajax({
				type: 'POST',
				url: url,
				data: {},
				beforeSend: function() {
					$('body').loadingOverlay();
				},
				success: function(data) {
					$('body').loadingOverlay('remove');
					if (data.suc) {
						let arr = me.state.files,
							newArr = [];
						$.each(arr, function(index, file) {
							if (file.file_id != fid) {
								newArr.push(file);
							};
						});
						me.setState({
							files: newArr
						});
					} else {
						if (dataErrorFun) {
							dataErrorFun(data.msg);
						}
					}
				},
				error: function(XMLHttpRequest, textStatus) {
					$('body').loadingOverlay('remove'); 
					if (dataErrorFun) {
						dataErrorFun(JSON.stringify(XMLHttpRequest));
					}
				},
				dataType: "json"
			});
		},
		getInitialState: function() {
			let files = [];
			if (this.props['data-files'] && this.props['data-files'].length > 0) {
				files = this.props['data-files'];
			};
			return {
				files: files
			};
		},
		render: function() {
			let me = this;
			let text = me.props['data-inputText'] ? me.props['data-inputText'] : '上传';
			let dataFileUploadExDom = me.props['data-fileUploadExDom'];
			
			let dataNofilesdom = me.props['data-nofilesdom'];
			let filesDom = [];
			if (dataNofilesdom) {

			}else {
				$.each(me.state.files, function(index, file) {
					filesDom.push(<div><a href={file.link} target='_blank'><span className="glyphicon glyphicon-paperclip"></span>  {file.file_name} </a> ({file.size})<a style={{marginLeft:'10px'}} href="###" onClick={function(){
						me.deleteFile(file.delete_url,file.file_id);
					}}>删除</a></div>);
				});
			}
			
			let mSize = (me.props["data-size"] / 1000 / 1000).toFixed(2);
			return (
				<div className="h5fileupload">  
					<span  className="btn btn-base fileinput-button">
						<i className="glyphicon glyphicon-plus"></i>
						<span style={{marginLeft:'5px'}}>{text}</span>
						<input ref='h5fileupload_input' className="h5fileupload_input" type="file" name="files[]" multiple />
					</span>
					{dataFileUploadExDom} 
					<div className='sizeTip'>每个上传文件限制{mSize}M</div>  
					<div ref="progress" className="progress">
						<div ref='progress_bar' className="progress-bar progress-bar-success"></div>
					</div>
					<div ref="files" className="files">
						{filesDom}
					</div>
					<br/>
		 		</div>
			);
		}
	});

	module.exports = H5FIleUpload;
 