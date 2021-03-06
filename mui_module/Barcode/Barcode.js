 import React, {
   Component,
   PropTypes
 } from 'react'
 import ReactDOM from 'react-dom';
 import muiCss from "../css/mui.css";
 import iconfontCss from "../css/iconfont.css";
 import barcodeLess from "!style!css!less!../less/barcode.less";
 import mui from "./mui";

 var ws = null,
   wo = null;
 var scan = null,
   domready = false;

 class Barcode extends Component {
   constructor(props) {

     super(props);
     this.goback = this.goback.bind(this);
     this.scanPicture = this.scanPicture.bind(this);
     this.onmarked = this.onmarked.bind(this);
   }
   goback() {
       // var ws = plus.webview.currentWebview(); 
       // plus.webview.show('subpages/appsetting.html');
       // plus.webview.hide(ws.id);
       mui.back();

     }
     // 从相册中选择二维码图片 
   scanPicture() {
       var me = this;
       plus.gallery.pick(function(path) {
         plus.barcode.scan(path, me.onmarked, function(error) {
           plus.nativeUI.alert("无法识别此图片");
         });
       }, function(err) {
         plus.nativeUI.alert("Failed: " + err.message);
       });
     }
     // 二维码扫描成功
   onmarked(type, result, file) {
     switch (type) {
       case plus.barcode.QR:
         type = "QR";
         break;
       case plus.barcode.EAN13:
         type = "EAN13";
         break;
       case plus.barcode.EAN8:
         type = "EAN8";
         break;
       default:
         type = "其它" + type;
         break;
     }
     result = result.replace(/\n/g, '');
     mui.fire(wo, 'scaned', {
       t: type,
       r: result,
       f: file
     });
     console.log("scaned('" + type + "','" + result + "','" + file + "');");
     mui.back();
   }
   componentDidMount() {
     var me = this;

     // 获取窗口对象
     ws = plus.webview.currentWebview();
     wo = plus.webview.getWebviewById('mainform.html');

     // 开始扫描
     ws.addEventListener('show', function() {
       scan = new plus.barcode.Barcode('bcid');
       console.log(scan);
       scan.onmarked = me.onmarked;
       scan.start({
         conserve: true,
         filename: "_doc/barcode/"
       });
     });
   }
   render() {
     var me = this;
     return (<div className="barcode">
					 <header className="mui-bar mui-bar-nav">
			            <a className=" mui-icon mui-icon-back mui-icon-left-nav mui-pull-left" onClick={me.goback}></a>
			            <h1 className="mui-title">扫码</h1>
			        </header>
			        <div className="mui-content" style={{height:' 100%'}}>
			            <div id="bcid" className='bcid'>
			                <div style={{height:'40%'}}></div>
			                <p className="tip">...载入中...</p>
			              
			            </div>
			            <footer>
		                    <div className="fbt" onClick={me.goback}>取　 消</div>
		                    <div className="fbt" onClick={me.scanPicture}>从相册选择二维码</div>
		                </footer>
			        </div>
				</div>);
   }
 }
 mui.plusReady(function() {
   ReactDOM.render(
     <Barcode />,
     mui('.container')[0]
   );

 });