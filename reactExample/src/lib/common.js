   import $ from './jquery-vendor.js'
   import cookie from 'js-cookie'

   var common = {
        getNagavVersion: function() {

         //Google Chrome 20 +
         //Apple Safari 4.0+
         //Mozilla Firefox 5.0+
         //Opera 11.0+
         //Microsoft Internet Explorer 9.0+ 
         //Edge

         var Sys = {};
         var ua = navigator.userAgent.toLowerCase();

         var s;
         (s = ua.match(/msie ([\d.]+)/)) ? Sys.isIE = s[1]:
             (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.isGecko = s[1] :
             (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.isWebkit = s[1] :
             (s = ua.match(/opera.([\d.]+)/)) ? Sys.IsOpera = s[1] :
             (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.isSafari = s[1] :
             (s = ua.match(/iphone os ([\d.]+)/)) ? Sys.isIOS = s[1] :
             (s = ua.match(/rv:([\d.]+)/)) ? Sys.isEdge = s[1] : 0;
         return Sys;
     },
      createUrl: function(url) {
         var d = (new Date()).getTime()
         var keyword = 'randomD'
            // if (url.indexOf(keyword) != -1)
            //var re = /(\w+)=(\w+)/ig
         var re = new RegExp("(" + keyword + ")+=(\\w+)", "gi")
         var mc = url.match(re)

         if (mc && mc.length > 0) url = url.replace(re, '')

         if (url.indexOf('?') == -1) {
            return url + "?" + keyword + "=" + d
         } else {
            return url + "&" + keyword + "=" + d
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
         remark_ph: '不能超过20个字',
      },
      feedbackIcons: {
         valid: 'glyphicon glyphicon-ok',
         invalid: 'glyphicon glyphicon-remove',
         validating: 'glyphicon glyphicon-refresh'
      },
      isValidField: function(form, filedName) {
         var validators = form.options.fields[filedName].validators
         var flag = true
         for (var v in validators) {
            var temp = form.getFieldElements(filedName).data('bv.result.' + v)
            if (temp == 'INVALID') {
               return false
            }
         }
         return flag
      },
      initDragScroll() {
         var _y
         var scrolling = false
         document.onmousedown = function(e) {
            var e = window.event || e
            _y = e.clientY
            scrolling = true
         }
         document.onmousemove = function(e) {
            if (!scrolling) return
            var e = window.event || e
            var move = (e.clientY - _y) / 4
            if ($('.mdivR .fixed-table-body').length > 0) {
               var scrollTop = $('.fixed-table-body').scrollTop()
               $('.fixed-table-body').scrollTop(scrollTop + move)
            } else {
               var scrollTop = $('.mdivR').scrollTop()
               $('.mdivR').scrollTop(scrollTop + move)
            }

         }

         document.onmouseup = function() {
            scrolling = false
         }
      },
      layout() {
         if ($('.htmlbody').width() <= 768) {
            $('.htmlbody').css({
               overflow: 'auto'
            })
            $('.mdivL,.mdivR').css({
               'height': '100%',
               overflow: 'hidden'
            })
            if ($('.mdivR .fixed-table-container').length > 0) {
               let height = '100%' //- 500
                  //dd
               $('.mdivR').css({
                  'height': height + $('.fixed-table-container').data('mheight'),
                  overflow: 'hidden'
               })
               $('.fixed-table-container').css('height', height)
               let options = $('#table').bootstrapTable('getOptions')
               options.height = height
               $('#table').bootstrapTable('refreshOptions', options)
            }

         } else {
            $('.htmlbody').css({
               overflow: 'hidden'
            })
            $('.mdivL,.mdivR').css({
               'height': document.documentElement.clientHeight, //- 200,
               overflow: 'auto'
            })
            if ($('.mdivR .fixed-table-container').length > 0) {
               $('.mdivL,.mdivR').css({
                  'height': document.documentElement.clientHeight, //- 200,
                  overflow: 'hidden'
               })
               let height = document.documentElement.clientHeight - $('.fixed-table-container').data('mheight')
               $('.fixed-table-container').css('height', height)
               let options = $('#table').bootstrapTable('getOptions')
               options.height = height
               $('#table').bootstrapTable('refreshOptions', options)
               $('#table').bootstrapTable('resetWidth')
            }
         }

      },

   }
   Array.prototype.clone = function() {
      return this.slice(0)
   }
   Array.prototype.remove = function(val) {
      var index = this.indexOf(val)
      if (index > -1) {
         this.splice(index, 1)
      }
   }
   Array.prototype.removeObj = function(objVal, srcKey) {
      let ix = -1
      for (var i = 0; i < this.length; i++) {
         if (this[i][srcKey] == objVal) {
            ix = i
         }
      }
      this.splice(ix, 1)
   }
   Array.prototype.replaceObj = function(srcKey, newItem) {
      let ix = -1
      for (var i = 0; i < this.length; i++) {
         if (this[i][srcKey] == newItem[srcKey]) {
            ix = i
            this[i] = newItem
         }
      }
   }
   String.prototype.trim = function() {　　
      return this.replace(/(^\s*)|(\s*$)/g, "")　　
   }　　
   String.prototype.ltrim = function() {　　
      return this.replace(/(^\s*)/g, "")　　
   }　　
   String.prototype.rtrim = function() {　　
      return this.replace(/(\s*$)/g, "")　　
   }
   Date.prototype.format = function(format) {
      var o = {
         "M+": this.getMonth() + 1, //month
         "d+": this.getDate(), //day
         "h+": this.getHours(), //hour
         "m+": this.getMinutes(), //minute
         "s+": this.getSeconds(), //second
         "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
         "S": this.getMilliseconds() //millisecond
      }

      if (/(y+)/.test(format)) {
         format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
      }

      for (var k in o) {
         if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))
         }
      }
      return format
   }

   //异常日志
   var Console_URL = $('head link[rel="console"]').attr('href');
   if (Console_URL) {
      window.onerror = function(iMessage, iURL, iLine, iColumn, iError) {
         window.setTimeout(function() {

            var iData = {
               message: iMessage,
               url: iURL,
               line: iLine,
               column: iColumn || (window.event && window.event.errorCharacter) || 0
            };

            if (iError && iError.stack) iData.stack = (iError.stack || iError.stacktrace).toString();

            if (Console_URL) {
               if (iData.stack) $.post(Console_URL, iData);
               else $.get(Console_URL, iData);
            }
         }, 0);
         return true;
      };
      //window.console = function(){}
   };


   export function Ajax({
      url,
      data,
      method,
      doneFun,
      failFun,
      alwaysFun,
      context
   }, jdom) {

      $.ajax({
            method: method || "POST",
            url: url,
            beforeSend: function(xhr) {
               if (jdom != false) {
                  var dom = jdom || $('body')
                  dom.loadingOverlay()
               }

            },
            data: data || {}
         })
         .done(function(msg) {
            let data = JSON.parse(msg)
               //登录信息验证
            if (data.code == '99') {
               cookie.remove('hasLogin')
               context.router.push({
                  pathname: `/`,
                  state: {
                     backurl: context.router.getCurrentLocation().pathname
                  }
               })
               return
            }
            if (doneFun && typeof doneFun === 'function') {
               doneFun(msg)
            }
         }).fail(function(jqXHR, textStatus, errorThrown) {

            if (failFun && typeof failFun === 'function') {
               failFun(jqXHR, textStatus, errorThrown)
            }
         }).always(function() {
            if (alwaysFun && typeof alwaysFun === 'function') {
               alwaysFun()
            }

            if (jdom != false) {
               var dom = jdom || $('body')
               dom.loadingOverlay('remove')
            }
         })
   }

   export function CheckLogin(nextState, replace) {
      let ck = cookie.get('hasLogin')
      if (typeof ck == 'undefined' || ck == false) {
         replace({
            pathname: '/Login',
            state: {
               backurl: nextState.location.pathname
            }
         })
      }
   }
   // const apiPreFix = 'http://mp2.ai.com/' //'/'// 
   const apiPreFix = '/' // 
   const iAPI = {
      login: apiPreFix + "common/login/check",
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
      sendAllMes: apiPreFix + 'pushMessage/push',
   }
   export {
      iAPI as API
   }
   export default common

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