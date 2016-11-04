  import React, {
    Component,
    PropTypes
  } from 'react'

  import ReactDOM from 'react-dom';

  import h5fileuploadLess from "!style!css!less!../less/h5fileupload.less";

  import $ from './jquery-vendor.js';

  import common from './common';
  import juWidget from './jquery.ui.widget';
  import jfTransport from './jquery.iframe-transport';
  import jFileupload from './jquery.fileupload';
  import jfProcess from './jquery.fileupload-process';
  import jfValidate from './jquery.fileupload-validate';

  class H5FIleUpload extends Component {
    constructor(props) {
      super(props);
      this.deleteFile = this.deleteFile.bind(this);
      this.progressDis = this.progressDis.bind(this);
      let types = this.props["data-acceptFileTypes"];
      let fileAccept = this.props['fileAccept'];
      let typesMsg = '*';
      if (types) {
        if (types == 'images') {
          types = /(\.|\/)(gif|jpe?g|png)$/i;
          typesMsg = 'gif|jpg|png';
          fileAccept = '.gif,.jpeg,.jpg,.png';
        } else if (types == 'csv') {
          types = /(\.|\/)(csv)$/i;
          typesMsg = 'csv';
          fileAccept = '.csv';
        }
      }

      this.state = {
        files: this.props['data-files'],
        fileAccept: fileAccept,
        typesMsg: typesMsg,
        types: types
      };
    }
    progressDis(e, data) {
      var me = this;
      $(me.refs.progress_bar).css(
        'width',
        '1%'
      ).text('');

      let progress = parseInt(data.loaded / data.total * 100, 10); 
      setTimeout(function() {

        $(me.refs.progress_bar).css(
          'width',
          progress + '%'
        ).text(progress + '%');
      }, 1000)
    }
    componentDidMount() {
      let me = this;

      let url = me.props["data-url"];


      //    else {
      // 	types = /(\.|\/)(\w*)$/i;
      // }
      let dataErrorFun = me.props["data-errorFun"];
      let dataSucFun = me.props["data-sucFun"];
      let maxNumberOfFiles = parseInt(me.props['data-count']);
       
      let options = {
        url: url,
        dataType: 'json',
        acceptFileTypes: me.state.types, ///(\.|\/)(gif|jpe?g|png)$/i,
        typesMsg: me.state.typesMsg,
        maxFileSize: me.props["data-size"],
        maxNumberOfFiles:maxNumberOfFiles,
        singleFileUploads: maxNumberOfFiles<=1 ? true : false //,
          // getNumberOfFiles:function(ddd){
          // 	var count = 100;
          // 	if (maxNumberOfFiles) {
          // 		count=parseInt(maxNumberOfFiles)
          // 	}
          // 	console.log(ddd);
          // 	return count;
          // } 
      }; 
      $(me.refs.h5fileupload_input).fileupload(options)
        .on('fileuploadadd', function(e, data) {})
        .on('fileuploadprogress', function(e, data) {
 
        })
        .on('fileuploadprogressall', function(e, data) { 
            me.progressDis(e, data); 
        }).on('fileuploaddone', function(e, data) {
          // console.log(e);
          // console.log(data.result);

          // $.each(data.result.files, function(index, file) {
          // 	$('<div />').text(file.name).appendTo(me.refs.files);
          // });
          if (data.result.files) {

            let arr = me.state.files;
            if (options.singleFileUploads) {
              Array.prototype.push.apply(arr, data.result.files);
            } else {
              arr = data.result.files;
            }
            me.setState({
              files: arr
            });
            if (dataSucFun) {
              dataSucFun(arr);
            };
          } else {
            if (dataErrorFun) {
              dataErrorFun(data.result);
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

        })
        .on('fileuploadchunksend', function(e, data) {
          console.log(111);
        })
        .prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');

    }
    deleteFile(url, fid) {
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
    }
    customProp(props, propName, componentName) {
      if (!/matchme/.test(props[propName])) {
        return new Error('Validation failed!');
      }
    }

    render() {
      let me = this;

      let text = me.props['data-inputText']; //? me.props['data-inputText'] : '上传';
      let dataFileUploadExDom = me.props['data-fileUploadExDom'];

      let dataNofilesdom = me.props['data-nofilesdom'];
      let filesDom = [];
      if (dataNofilesdom) {

      } else {
        $.each(me.state.files, function(index, file) {
          filesDom.push(<div key={index}><a href={file.link} target='_blank'><span className="glyphicon glyphicon-paperclip"></span>  {file.file_name} </a> ({file.size})<a style={{marginLeft:'10px'}} href="###" onClick={function(){
						me.deleteFile(file.delete_url,file.file_id);
					}}>删除</a></div>);
        });
      }

      let mSize = (me.props["data-size"] / 1000 / 1000).toFixed(2);
      return (
        <div className="h5fileupload">  
					<span  className="btn btn-primary fileinput-button">
						<i className="glyphicon glyphicon-plus"></i>
						<span style={{marginLeft:'5px'}}>{text}</span>
						<input ref='h5fileupload_input' className="h5fileupload_input" type="file" name="files[]" accept={me.state.fileAccept} multiple />
					</span>
					{dataFileUploadExDom} 
					<div className='sizeTip'>每个上传文件限制{mSize}M</div>  
					<div ref="progress" className="progress">
						<div ref='progress_bar' className="progress-bar progress-bar-success"> 
            </div>
					</div>
					<div ref="files" className="files">
						{filesDom}
					</div>
					<br/>
		 		</div>
      );
    }
  };

  H5FIleUpload.defaultProps = {
    'data-inputText': '上传', //按钮text
    'data-nofilesdom': true, //上传的文件是否添加删除展示
    'data-files': [], //已经上传的文件arr
    'data-url': '/upload/server/php/', //上传service 
    'data-size': '10000000', //上传大小限制 默认10m
    'data-count': 100, //多选最大选择数目,默认100
    'data-acceptFileTypes': /(\.|\/)(\w*)$/i, //允许上传的类型,默认所有
    'data-errorFun': function() {
      return false
    }, //上传错误回调
    'data-sucFun': function() {
      return true
    }, //上传成功回调
    'dataFileUploadExDom': [], //上传拓展显示的dom
    fileuploadaddFun: function() {
      return true;
    }, //上传添加完成后回调 
    fileAccept: '*', //默认选择类型
  };
  H5FIleUpload.propTypes = {
    'data-inputText': PropTypes.string.isRequired,
    'data-size': PropTypes.string.isRequired
  };
  export default H5FIleUpload;