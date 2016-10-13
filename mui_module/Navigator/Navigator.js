 import React, {
 	Component,
 	PropTypes
 } from 'react'
 import ReactDOM from 'react-dom';

 class Navigator extends Component{

 	componentDidMount() {
 		var me = this;



 		var self = plus.webview.currentWebview();
 		var aniShow = {};
 		this.props.subpages.forEach(function(element, index) {
 			var temp = {};

 			if (index > 0) {
 				var sub = plus.webview.create(element.url, element.url, element.styles);
 				sub.hide();
 				self.append(sub);
 			} else {
 				temp[element.url] = "true";
 				mui.extend(aniShow, temp);
 			}

 		});

 		//选项卡点击事件
 		mui('.mui-bar-tab').on('tap', 'a', function(e) {
 			var activeTab = plus.storage.getItem('activeTab');
 			var targetTab = this.getAttribute('href');
 			if (targetTab == activeTab) {
 				return;
 			}

 			//显示目标选项卡
 			//若为iOS平台或非首次显示，则直接显示
 			if (mui.os.ios || aniShow[targetTab]) {
 				plus.webview.show(targetTab);
 			} else {
 				//否则，使用fade-in动画，且保存变量
 				var temp = {};
 				temp[targetTab] = "true";
 				mui.extend(aniShow, temp);
 				plus.webview.show(targetTab, "fade-in", 300);
 			}
 			//隐藏当前;
 			plus.webview.hide(activeTab);
 			//更改当前活跃的选项卡
 			plus.storage.setItem('activeTab', targetTab);
 		});



 	}

 	render() {
 		var me = this;
 		var navItems = [];
 		this.props.subpages.forEach(function(item, index) {
 			var iconClass = `mui-icon ${item.icon}`;
 			let tabClass = `mui-tab-item`;
 			if (index == 0) {
 				tabClass = `mui-tab-item mui-active`;
 			};
 			if (item.tip) {
 				var countDom = [];
 				if (me.state.count > 0) {
 					countDom.push(<span className="mui-badge">{me.state.count}</span>);
 				};
 				navItems.push(<a className={tabClass}
						href={item.url}>
						<span className={iconClass}>{countDom}</span>
						<span className="mui-tab-label">{item.title}</span>
					</a>);
 			} else {
 				navItems.push(<a  className={tabClass} 
						href={item.url}>
						<span className={iconClass}></span>
						<span className="mui-tab-label">{item.title}</span>
					</a>);
 			}
 		});
 		return (
 			<nav className="mui-bar mui-bar-tab">
				 {navItems}
			</nav>
 		);
 	}
 };

export default Navigator;