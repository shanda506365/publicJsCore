'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.API = undefined;
exports.Ajax = Ajax;
exports.CheckLogin = CheckLogin;

var _jqueryVendor = require('./jquery-vendor.js');

var _jqueryVendor2 = _interopRequireDefault(_jqueryVendor);

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _immutable = require('immutable');

var _Action = require('./Action');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var common = {
   getNagavVersion: function getNagavVersion() {

      //Google Chrome 20 +
      //Apple Safari 4.0+
      //Mozilla Firefox 5.0+
      //Opera 11.0+
      //Microsoft Internet Explorer 9.0+ 
      //Edge

      var Sys = {};
      var ua = navigator.userAgent.toLowerCase();

      var s;
      (s = ua.match(/msie ([\d.]+)/)) ? Sys.isIE = s[1] : (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.isGecko = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.isWebkit = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? Sys.IsOpera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.isSafari = s[1] : (s = ua.match(/iphone os ([\d.]+)/)) ? Sys.isIOS = s[1] : (s = ua.match(/rv:([\d.]+)/)) ? Sys.isEdge = s[1] : 0;
      return Sys;
   },
   createUrl: function createUrl(url) {
      var d = new Date().getTime();
      var keyword = 'randomD';
      // if (url.indexOf(keyword) != -1)
      //var re = /(\w+)=(\w+)/ig
      var re = new RegExp("(" + keyword + ")+=(\\w+)", "gi");
      var mc = url.match(re);

      if (mc && mc.length > 0) url = url.replace(re, '');

      if (url.indexOf('?') == -1) {
         return url + "?" + keyword + "=" + d;
      } else {
         return url + "&" + keyword + "=" + d;
      }
   },
   regex: {
      fail_text: '验证失败',
      empty_text: '不能为空',
      telephone: /^(\d{11}|((\d{3,4}\-)|)\d{7,8}(|([-\u8f6c]{1}\d{1,5})))$/, //^(\d{11})$|^(\+\d{13})$/,
      telephone_partten: '^(\\d{11}||((\\d{3,4}\\-)|)\\d{7,8}(|([-\\u8f6c]{1}\\d{1,5})))$', //'^(\\d{11})$|^(\\+\\d{13})$',
      telephone_text: '请输入正确的手机或座机号码',
      random: /^[0-9]{4}$/,
      random_partten: '^[0-9]{4}$',
      random_text: '请输入正确的授权码',
      password: /^[0-9a-zA-Z]{6,15}$/,
      password_partten: '^[0-9a-zA-Z]{6,15}$',
      password_text: '请输入6到15位密码',
      identical_text: '两次密码不一致',
      repassword_text: '确认密码',
      email_text: '邮箱格式不正确',
      nickname: /^([\w\W]){2,25}$/,
      nickname_partten: '^([\\w\\W]){2,25}$',
      nickname_text: '请输入2到8个字',
      nickname_ph: '2到8个字，建议使用真实姓名，以方便朋友查找',
      company: /^([\w\W]){2,20}$/,
      company_partten: '^([\\w\\W]){2,20}$',
      company_text: '请输入2到20个字',
      company_ph: '2到20个字',
      productName: /^([\w\W]){2,60}$/,
      productName_partten: '^([\\w\\W]){2,150}$',
      productName_text: '请输入2到150个字',
      productName_ph: '2到150个字',
      productTagName: /^([\w\W]){2,16}$/,
      productTagName_partten: '^([\\w\\W]){2,16}$',
      productTagName_text: '请输入2到16个字',
      productTagName_ph: '2到16个字',
      price: /^(0|(0(\.\d{1,2})?)|(([1-6]|\d){0,6}(\.\d{1,2})?))$/,
      price_partten: '^(0|(0(\\.\\d{1,2})?)|(([1-6]|\\d){0,6}(\\.\\d{1,2})?))$',
      price_text: '整数最多6位,若有小数,最多2位',
      price_ph: '正确格式的价格0.00',
      remark: /^([\w\W]){0,100}$/,
      remark_partten: '^([\\w\\W]){0,20}$',
      remark_text: '请输入少于20个字',
      remark_ph: '不能超过20个字'
   },
   feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
   },
   isValidField: function isValidField(form, filedName) {
      var validators = form.options.fields[filedName].validators;
      var flag = true;
      for (var v in validators) {
         var temp = form.getFieldElements(filedName).data('bv.result.' + v);
         if (temp == 'INVALID') {
            return false;
         }
      }
      return flag;
   },
   initDragScroll: function initDragScroll() {
      var _y;
      var scrolling = false;
      document.onmousedown = function (e) {
         var e = window.event || e;
         _y = e.clientY;
         scrolling = true;
      };
      document.onmousemove = function (e) {
         if (!scrolling) return;
         var e = window.event || e;
         var move = (e.clientY - _y) / 4;
         if ((0, _jqueryVendor2.default)('.mdivR .fixed-table-body').length > 0) {
            var scrollTop = (0, _jqueryVendor2.default)('.fixed-table-body').scrollTop();
            (0, _jqueryVendor2.default)('.fixed-table-body').scrollTop(scrollTop + move);
         } else {
            var scrollTop = (0, _jqueryVendor2.default)('.mdivR').scrollTop();
            (0, _jqueryVendor2.default)('.mdivR').scrollTop(scrollTop + move);
         }
      };

      document.onmouseup = function () {
         scrolling = false;
      };
   },
   layout: function layout() {
      if ((0, _jqueryVendor2.default)('.htmlbody').width() <= 768) {
         (0, _jqueryVendor2.default)('.htmlbody').css({
            overflow: 'auto'
         });
         (0, _jqueryVendor2.default)('.mdivL,.mdivR').css({
            'height': '100%',
            overflow: 'hidden'
         });
         if ((0, _jqueryVendor2.default)('.mdivR .fixed-table-container').length > 0) {
            var height = '100%'; //- 500
            //dd
            (0, _jqueryVendor2.default)('.mdivR').css({
               'height': height + (0, _jqueryVendor2.default)('.fixed-table-container').data('mheight'),
               overflow: 'hidden'
            });
            (0, _jqueryVendor2.default)('.fixed-table-container').css('height', height);
            var options = (0, _jqueryVendor2.default)('#table').bootstrapTable('getOptions');
            options.height = height;
            (0, _jqueryVendor2.default)('#table').bootstrapTable('refreshOptions', options);
         }
      } else {
         (0, _jqueryVendor2.default)('.htmlbody').css({
            overflow: 'hidden'
         });
         (0, _jqueryVendor2.default)('.mdivL,.mdivR').css({
            'height': document.documentElement.clientHeight, //- 200,
            overflow: 'auto'
         });
         if ((0, _jqueryVendor2.default)('.mdivR .fixed-table-container').length > 0) {
            (0, _jqueryVendor2.default)('.mdivL,.mdivR').css({
               'height': document.documentElement.clientHeight, //- 200,
               overflow: 'hidden'
            });
            var _height = document.documentElement.clientHeight - (0, _jqueryVendor2.default)('.fixed-table-container').data('mheight');
            (0, _jqueryVendor2.default)('.fixed-table-container').css('height', _height);
            var _options = (0, _jqueryVendor2.default)('#table').bootstrapTable('getOptions');
            _options.height = _height;
            (0, _jqueryVendor2.default)('#table').bootstrapTable('refreshOptions', _options);
            (0, _jqueryVendor2.default)('#table').bootstrapTable('resetWidth');
         }
      }
   }
};
Array.prototype.clone = function () {
   return this.slice(0);
};
Array.prototype.remove = function (val) {
   var index = this.indexOf(val);
   if (index > -1) {
      this.splice(index, 1);
   }
};
Array.prototype.removeObj = function (objVal, srcKey) {
   var ix = -1;
   for (var i = 0; i < this.length; i++) {
      if (this[i][srcKey] == objVal) {
         ix = i;
      }
   }
   this.splice(ix, 1);
};
Array.prototype.replaceObj = function (srcKey, newItem) {
   var ix = -1;
   for (var i = 0; i < this.length; i++) {
      if (this[i][srcKey] == newItem[srcKey]) {
         ix = i;
         this[i] = newItem;
      }
   }
};
String.prototype.trim = function () {
   return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.ltrim = function () {
   return this.replace(/(^\s*)/g, "");
};
String.prototype.rtrim = function () {
   return this.replace(/(\s*$)/g, "");
};
Date.prototype.format = function (format) {
   var o = {
      "M+": this.getMonth() + 1, //month
      "d+": this.getDate(), //day
      "h+": this.getHours(), //hour
      "m+": this.getMinutes(), //minute
      "s+": this.getSeconds(), //second
      "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
      "S": this.getMilliseconds() //millisecond
   };

   if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
   }

   for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
         format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
   }
   return format;
};

//异常日志
var Console_URL = (0, _jqueryVendor2.default)('head link[rel="console"]').attr('href');
if (Console_URL) {
   window.onerror = function (iMessage, iURL, iLine, iColumn, iError) {
      window.setTimeout(function () {

         var iData = {
            message: iMessage,
            url: iURL,
            line: iLine,
            column: iColumn || window.event && window.event.errorCharacter || 0
         };

         if (iError && iError.stack) iData.stack = (iError.stack || iError.stacktrace).toString();

         if (Console_URL) {
            if (iData.stack) _jqueryVendor2.default.post(Console_URL, iData);else _jqueryVendor2.default.get(Console_URL, iData);
         }
      }, 0);
      return true;
   };
   //window.console = function(){}
};

function Ajax(_ref, loadmask) {
   var url = _ref.url,
       data = _ref.data,
       method = _ref.method,
       doneFun = _ref.doneFun,
       failFun = _ref.failFun,
       alwaysFun = _ref.alwaysFun,
       context = _ref.context,
       props = _ref.props;


   _jqueryVendor2.default.ajax({
      method: method || "POST",
      url: url,
      beforeSend: function beforeSend(xhr) {
         if (loadmask != false) {
            if (typeof props == 'function') {
               props(_Action.Action.pro_stateClickAction({ state: 'Pending' }));
            } else {
               props.onPro_stateChange('Pending');
            }
         }
      },
      data: data || {}
   }).done(function (msg) {
      var data = JSON.parse(msg);
      //登录信息验证
      if (data.code == '99') {
         _jsCookie2.default.remove('hasLogin');
         if (typeof props == 'function') {
            props((0, _immutable.fromJS)(_Action.Action.pro_stateClickAction).mergeDeep({
               state: 'Rejected'
            }).toJSON());
         } else {
            props.onPro_stateChange('Rejected');
         }
         return;
      }
      if (doneFun && typeof doneFun === 'function') {
         doneFun(msg);
      }
   }).fail(function (jqXHR, textStatus, errorThrown) {

      if (failFun && typeof failFun === 'function') {
         failFun(jqXHR, textStatus, errorThrown);
      }
   }).always(function () {
      if (alwaysFun && typeof alwaysFun === 'function') {
         alwaysFun();
      }

      if (loadmask != false) {
         if (typeof props == 'function') {
            props(_Action.Action.pro_stateClickAction({ state: 'Resolved' }));
         } else {
            props.onPro_stateChange('Resolved');
         }
      }
   });
}

function CheckLogin(nextState, replace) {
   var ck = _jsCookie2.default.get('hasLogin');
   if (typeof ck == 'undefined' || ck == false) {
      replace({
         pathname: '/Login',
         state: {
            backurl: nextState.location.pathname
         }
      });
   }
}
var apiPreFix = 'http://192.168.91.33/'; //'/'// 
// const apiPreFix = '/' // 
var iAPI = {
   login: apiPreFix + "quote/init",
   announcement: apiPreFix + 'announcement/getLatest',
   getBarcode: apiPreFix + "common/login/getQRcodePng",
   logout: apiPreFix + "common/logout",
   productIndex: apiPreFix + 'product/index',
   productAdd: apiPreFix + 'product/add',
   productEdit: apiPreFix + 'product/update',
   productDel: apiPreFix + 'product/delete',
   productBatchDel: apiPreFix + 'product/deleteBatch',
   productSort: apiPreFix + 'product/sort',
   productDownload: apiPreFix + 'product/download',
   productLog: apiPreFix + 'product/log',
   productExport: apiPreFix + 'product/export',
   clearData: apiPreFix + 'productTag/deleteAll',
   productDownloadTemplate: apiPreFix + 'images/aibaojia.csv',
   productUpload: apiPreFix + 'product/upload',
   productTagIndex: apiPreFix + 'productTag/index',
   productTagAdd: apiPreFix + 'productTag/add',
   productTagEdit: apiPreFix + 'productTag/update',
   productTagDel: apiPreFix + 'productTag/delete',
   productTagBatchDel: apiPreFix + 'productTag/deleteBatch',
   productTagSort: apiPreFix + 'productTag/sort',
   productTag: apiPreFix + 'productTag/all',
   customerIndex: apiPreFix + 'clientUser/index',
   customerEdit: apiPreFix + 'clientUser/update',
   customerDel: apiPreFix + 'clientUser/delete',
   customerBatchDel: apiPreFix + 'clientUser/deleteBatch',
   customerBatchLevel: apiPreFix + 'clientUser/batchUpdateClientLevel',
   customerSort: apiPreFix + 'clientUser/sort',
   userIndex: apiPreFix + 'userInfo/index',
   companyEdit: apiPreFix + 'company/update',
   userEdit: apiPreFix + 'userInfo/update',
   addaccountIndex: apiPreFix + 'company/searchUser',
   addaccountAdd: apiPreFix + 'company/addUserToCompany',
   accountIndex: apiPreFix + 'company/users',
   accountEdit: apiPreFix + 'company/setAdmin',
   accountDel: apiPreFix + 'company/outCompany',
   sendAllMes: apiPreFix + 'pushMessage/push'
};
exports.API = iAPI;
exports.default = common;

// 	(function(w) {
// 		w.getNagavVersion = function() {
// 			var Sys = {}
// 			var ua = navigator.userAgent.toLowerCase()
// 			var s
// 			(s = ua.match(/msie ([\d.]+)/)) ? Sys.isIE = s[1]:
// 				(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.isGecko = s[1] :
// 				(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.isWebkit = s[1] :
// 				(s = ua.match(/opera.([\d.]+)/)) ? Sys.IsOpera = s[1] :
// 				(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.isSafari = s[1] :
// 				(s = ua.match(/rv:([\d.]+)/)) ? Sys.isEdge = s[1] : 0

// 			return Sys
// 		}
// 	})(window)

// }