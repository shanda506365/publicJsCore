webpackJsonp([7],{

/***/ 534:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(535);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(537)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/less-loader/index.js!./index.less", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/less-loader/index.js!./index.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 535:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(536)();
	// imports


	// module
	exports.push([module.id, "html {\n  font-size: 62.5%;\n  height: 100%;\n}\nbody {\n  font-size: 1.4rem;\n  height: 100%;\n  font-family: \"Helvetica Neue\", Helvetica, Microsoft Yahei, Hiragino Sans GB, WenQuanYi Micro Hei, sans-serif;\n}\n#root {\n  height: 100%;\n}\n#root .h100 {\n  height: 100%;\n}\n#root .weui-tab__bd-item {\n  height: 100%;\n}\n#root .hide {\n  display: none;\n}\n#root .showLoading .weui-toast {\n  opacity: 1;\n  visibility: visible;\n}\n#root .showDialog .weui-mask {\n  opacity: 1;\n  visibility: visible;\n}\n#root .showDialog .weui-dialog {\n  opacity: 1;\n  visibility: visible;\n}\n", ""]);

	// exports


/***/ }),

/***/ 536:
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),

/***/ 537:
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),

/***/ 553:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * JavaScript Cookie v2.1.4
	 * https://github.com/js-cookie/js-cookie
	 *
	 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
	 * Released under the MIT license
	 */
	;(function (factory) {
		var registeredInModuleLoader = false;
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
			registeredInModuleLoader = true;
		}
		if (true) {
			module.exports = factory();
			registeredInModuleLoader = true;
		}
		if (!registeredInModuleLoader) {
			var OldCookies = window.Cookies;
			var api = window.Cookies = factory();
			api.noConflict = function () {
				window.Cookies = OldCookies;
				return api;
			};
		}
	}(function () {
		function extend () {
			var i = 0;
			var result = {};
			for (; i < arguments.length; i++) {
				var attributes = arguments[ i ];
				for (var key in attributes) {
					result[key] = attributes[key];
				}
			}
			return result;
		}

		function init (converter) {
			function api (key, value, attributes) {
				var result;
				if (typeof document === 'undefined') {
					return;
				}

				// Write

				if (arguments.length > 1) {
					attributes = extend({
						path: '/'
					}, api.defaults, attributes);

					if (typeof attributes.expires === 'number') {
						var expires = new Date();
						expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
						attributes.expires = expires;
					}

					// We're using "expires" because "max-age" is not supported by IE
					attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

					try {
						result = JSON.stringify(value);
						if (/^[\{\[]/.test(result)) {
							value = result;
						}
					} catch (e) {}

					if (!converter.write) {
						value = encodeURIComponent(String(value))
							.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
					} else {
						value = converter.write(value, key);
					}

					key = encodeURIComponent(String(key));
					key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
					key = key.replace(/[\(\)]/g, escape);

					var stringifiedAttributes = '';

					for (var attributeName in attributes) {
						if (!attributes[attributeName]) {
							continue;
						}
						stringifiedAttributes += '; ' + attributeName;
						if (attributes[attributeName] === true) {
							continue;
						}
						stringifiedAttributes += '=' + attributes[attributeName];
					}
					return (document.cookie = key + '=' + value + stringifiedAttributes);
				}

				// Read

				if (!key) {
					result = {};
				}

				// To prevent the for loop in the first place assign an empty array
				// in case there are no cookies at all. Also prevents odd result when
				// calling "get()"
				var cookies = document.cookie ? document.cookie.split('; ') : [];
				var rdecode = /(%[0-9A-Z]{2})+/g;
				var i = 0;

				for (; i < cookies.length; i++) {
					var parts = cookies[i].split('=');
					var cookie = parts.slice(1).join('=');

					if (cookie.charAt(0) === '"') {
						cookie = cookie.slice(1, -1);
					}

					try {
						var name = parts[0].replace(rdecode, decodeURIComponent);
						cookie = converter.read ?
							converter.read(cookie, name) : converter(cookie, name) ||
							cookie.replace(rdecode, decodeURIComponent);

						if (this.json) {
							try {
								cookie = JSON.parse(cookie);
							} catch (e) {}
						}

						if (key === name) {
							result = cookie;
							break;
						}

						if (!key) {
							result[name] = cookie;
						}
					} catch (e) {}
				}

				return result;
			}

			api.set = api;
			api.get = function (key) {
				return api.call(api, key);
			};
			api.getJSON = function () {
				return api.apply({
					json: true
				}, [].slice.call(arguments));
			};
			api.defaults = {};

			api.remove = function (key, attributes) {
				api(key, '', extend(attributes, {
					expires: -1
				}));
			};

			api.withConverter = init;

			return api;
		}

		return init(function () {});
	}));


/***/ }),

/***/ 561:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(562);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(537)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../css-loader/index.js!../../../less-loader/index.js!./weui.less", function() {
				var newContent = require("!!../../../css-loader/index.js!../../../less-loader/index.js!./weui.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 562:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(536)();
	// imports


	// module
	exports.push([module.id, "html {\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\nbody {\n  line-height: 1.6;\n  font-family: -apple-system-font, \"Helvetica Neue\", sans-serif;\n}\n* {\n  margin: 0;\n  padding: 0;\n}\na img {\n  border: 0;\n}\na {\n  text-decoration: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n@font-face {\n  font-weight: normal;\n  font-style: normal;\n  font-family: \"weui\";\n  src: url('data:application/octet-stream;base64,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') format('truetype');\n}\n[class^=\"weui-icon-\"],\n[class*=\" weui-icon-\"] {\n  display: inline-block;\n  vertical-align: middle;\n  font: normal normal normal 14px/1 \"weui\";\n  font-size: inherit;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n}\n[class^=\"weui-icon-\"]:before,\n[class*=\" weui-icon-\"]:before {\n  display: inline-block;\n  margin-left: .2em;\n  margin-right: .2em;\n}\n.weui-icon-circle:before {\n  content: \"\\EA01\";\n}\n/* '' */\n.weui-icon-download:before {\n  content: \"\\EA02\";\n}\n/* '' */\n.weui-icon-info:before {\n  content: \"\\EA03\";\n}\n/* '' */\n.weui-icon-safe-success:before {\n  content: \"\\EA04\";\n}\n/* '' */\n.weui-icon-safe-warn:before {\n  content: \"\\EA05\";\n}\n/* '' */\n.weui-icon-success:before {\n  content: \"\\EA06\";\n}\n/* '' */\n.weui-icon-success-circle:before {\n  content: \"\\EA07\";\n}\n/* '' */\n.weui-icon-success-no-circle:before {\n  content: \"\\EA08\";\n}\n/* '' */\n.weui-icon-waiting:before {\n  content: \"\\EA09\";\n}\n/* '' */\n.weui-icon-waiting-circle:before {\n  content: \"\\EA0A\";\n}\n/* '' */\n.weui-icon-warn:before {\n  content: \"\\EA0B\";\n}\n/* '' */\n.weui-icon-info-circle:before {\n  content: \"\\EA0C\";\n}\n/* '' */\n.weui-icon-cancel:before {\n  content: \"\\EA0D\";\n}\n/* '' */\n.weui-icon-search:before {\n  content: \"\\EA0E\";\n}\n/* '' */\n.weui-icon-clear:before {\n  content: \"\\EA0F\";\n}\n/* '' */\n.weui-icon-back:before {\n  content: \"\\EA10\";\n}\n/* '' */\n.weui-icon-delete:before {\n  content: \"\\EA11\";\n}\n/* '' */\n[class^=\"weui-icon_\"]:before,\n[class*=\" weui-icon_\"]:before {\n  margin: 0;\n}\n.weui-icon-success {\n  font-size: 23px;\n  color: #09BB07;\n}\n.weui-icon-waiting {\n  font-size: 23px;\n  color: #10AEFF;\n}\n.weui-icon-warn {\n  font-size: 23px;\n  color: #F43530;\n}\n.weui-icon-info {\n  font-size: 23px;\n  color: #10AEFF;\n}\n.weui-icon-success-circle {\n  font-size: 23px;\n  color: #09BB07;\n}\n.weui-icon-success-no-circle {\n  font-size: 23px;\n  color: #09BB07;\n}\n.weui-icon-waiting-circle {\n  font-size: 23px;\n  color: #10AEFF;\n}\n.weui-icon-circle {\n  font-size: 23px;\n  color: #C9C9C9;\n}\n.weui-icon-download {\n  font-size: 23px;\n  color: #09BB07;\n}\n.weui-icon-info-circle {\n  font-size: 23px;\n  color: #09BB07;\n}\n.weui-icon-safe-success {\n  color: #09BB07;\n}\n.weui-icon-safe-warn {\n  color: #FFBE00;\n}\n.weui-icon-cancel {\n  color: #F43530;\n  font-size: 22px;\n}\n.weui-icon-search {\n  color: #B2B2B2;\n  font-size: 14px;\n}\n.weui-icon-clear {\n  color: #B2B2B2;\n  font-size: 14px;\n}\n.weui-icon-delete.weui-icon_gallery-delete {\n  color: #FFFFFF;\n  font-size: 22px;\n}\n.weui-icon_msg {\n  font-size: 93px;\n}\n.weui-icon_msg.weui-icon-warn {\n  color: #F76260;\n}\n.weui-icon_msg-primary {\n  font-size: 93px;\n}\n.weui-icon_msg-primary.weui-icon-warn {\n  color: #FFBE00;\n}\n.weui-btn {\n  position: relative;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 14px;\n  padding-right: 14px;\n  box-sizing: border-box;\n  font-size: 18px;\n  text-align: center;\n  text-decoration: none;\n  color: #FFFFFF;\n  line-height: 2.55555556;\n  border-radius: 5px;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  overflow: hidden;\n}\n.weui-btn:after {\n  content: \" \";\n  width: 200%;\n  height: 200%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  transform: scale(0.5);\n  transform-origin: 0 0;\n  box-sizing: border-box;\n  border-radius: 10px;\n}\n.weui-btn_inline {\n  display: inline-block;\n}\n.weui-btn_default {\n  color: #000000;\n  background-color: #F8F8F8;\n}\n.weui-btn_default:not(.weui-btn_disabled):visited {\n  color: #000000;\n}\n.weui-btn_default:not(.weui-btn_disabled):active {\n  color: rgba(0, 0, 0, 0.6);\n  background-color: #DEDEDE;\n}\n.weui-btn_primary {\n  background-color: #1AAD19;\n}\n.weui-btn_primary:not(.weui-btn_disabled):visited {\n  color: #FFFFFF;\n}\n.weui-btn_primary:not(.weui-btn_disabled):active {\n  color: rgba(255, 255, 255, 0.6);\n  background-color: #179B16;\n}\n.weui-btn_warn {\n  background-color: #E64340;\n}\n.weui-btn_warn:not(.weui-btn_disabled):visited {\n  color: #FFFFFF;\n}\n.weui-btn_warn:not(.weui-btn_disabled):active {\n  color: rgba(255, 255, 255, 0.6);\n  background-color: #CE3C39;\n}\n.weui-btn_disabled {\n  color: rgba(255, 255, 255, 0.6);\n}\n.weui-btn_disabled.weui-btn_default {\n  color: rgba(0, 0, 0, 0.3);\n  background-color: #F7F7F7;\n}\n.weui-btn_disabled.weui-btn_primary {\n  background-color: #9ED99D;\n}\n.weui-btn_disabled.weui-btn_warn {\n  background-color: #EC8B89;\n}\n.weui-btn_loading .weui-loading {\n  margin: -0.2em 0.34em 0 0;\n}\n.weui-btn_loading.weui-btn_primary,\n.weui-btn_loading.weui-btn_warn {\n  color: rgba(255, 255, 255, 0.6);\n}\n.weui-btn_loading.weui-btn_primary {\n  background-color: #179B16;\n}\n.weui-btn_loading.weui-btn_warn {\n  background-color: #CE3C39;\n}\n.weui-btn_plain-primary {\n  color: #1aad19;\n  border: 1px solid #1aad19;\n}\n.weui-btn_plain-primary:not(.weui-btn_plain-disabled):active {\n  color: rgba(26, 173, 25, 0.6);\n  border-color: rgba(26, 173, 25, 0.6);\n}\n.weui-btn_plain-primary:after {\n  border-width: 0;\n}\n.weui-btn_plain-default {\n  color: #353535;\n  border: 1px solid #353535;\n}\n.weui-btn_plain-default:not(.weui-btn_plain-disabled):active {\n  color: rgba(53, 53, 53, 0.6);\n  border-color: rgba(53, 53, 53, 0.6);\n}\n.weui-btn_plain-default:after {\n  border-width: 0;\n}\n.weui-btn_plain-disabled {\n  color: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.2);\n}\nbutton.weui-btn,\ninput.weui-btn {\n  width: 100%;\n  border-width: 0;\n  outline: 0;\n  -webkit-appearance: none;\n}\nbutton.weui-btn:focus,\ninput.weui-btn:focus {\n  outline: 0;\n}\nbutton.weui-btn_inline,\ninput.weui-btn_inline,\nbutton.weui-btn_mini,\ninput.weui-btn_mini {\n  width: auto;\n}\nbutton.weui-btn_plain-primary,\ninput.weui-btn_plain-primary,\nbutton.weui-btn_plain-default,\ninput.weui-btn_plain-default {\n  border-width: 1px;\n  background-color: transparent;\n}\n.weui-btn_mini {\n  display: inline-block;\n  padding: 0 1.32em;\n  line-height: 2.3;\n  font-size: 13px;\n}\n/*gap between btn*/\n.weui-btn + .weui-btn {\n  margin-top: 15px;\n}\n.weui-btn.weui-btn_inline + .weui-btn.weui-btn_inline {\n  margin-top: auto;\n  margin-left: 15px;\n}\n.weui-btn-area {\n  margin: 1.17647059em 15px 0.3em;\n}\n.weui-btn-area_inline {\n  display: flex;\n}\n.weui-btn-area_inline .weui-btn {\n  margin-top: auto;\n  margin-right: 15px;\n  width: 100%;\n  flex: 1;\n}\n.weui-btn-area_inline .weui-btn:last-child {\n  margin-right: 0;\n}\n/*\nz-index:\n0: .weui-swiped-btn\n1: .weui-cell_swiped .weui-cell__bd\n2: .weui-cells和.weui-cell的1px线\n*/\n.weui-cells {\n  margin-top: 1.17647059em;\n  background-color: #FFFFFF;\n  line-height: 1.47058824;\n  font-size: 17px;\n  overflow: hidden;\n  position: relative;\n}\n.weui-cells:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #e5e5e5;\n  color: #e5e5e5;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n  z-index: 2;\n}\n.weui-cells:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #e5e5e5;\n  color: #e5e5e5;\n  transform-origin: 0 100%;\n  transform: scaleY(0.5);\n  z-index: 2;\n}\n.weui-cells__title {\n  margin-top: .77em;\n  margin-bottom: .3em;\n  padding-left: 15px;\n  padding-right: 15px;\n  color: #999999;\n  font-size: 14px;\n}\n.weui-cells__title + .weui-cells {\n  margin-top: 0;\n}\n.weui-cells__tips {\n  margin-top: .3em;\n  color: #999999;\n  padding-left: 15px;\n  padding-right: 15px;\n  font-size: 14px;\n}\n.weui-cell {\n  padding: 10px 15px;\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.weui-cell:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #e5e5e5;\n  color: #e5e5e5;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n  left: 15px;\n  z-index: 2;\n}\n.weui-cell:first-child:before {\n  display: none;\n}\n.weui-cell_primary {\n  align-items: flex-start;\n}\n.weui-cell__bd {\n  flex: 1;\n}\n.weui-cell__ft {\n  text-align: right;\n  color: #999999;\n}\n.weui-cell_swiped {\n  display: block;\n  padding: 0;\n}\n.weui-cell_swiped > .weui-cell__bd {\n  position: relative;\n  z-index: 1;\n  background-color: #FFFFFF;\n}\n.weui-cell_swiped > .weui-cell__ft {\n  position: absolute;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: flex;\n  color: #FFFFFF;\n}\n.weui-swiped-btn {\n  display: block;\n  padding: 10px 1em;\n  line-height: 1.47058824;\n  color: inherit;\n}\n.weui-swiped-btn_default {\n  background-color: #C7C7CC;\n}\n.weui-swiped-btn_warn {\n  background-color: #FF3B30;\n}\n.weui-cell_access {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  color: inherit;\n}\n.weui-cell_access:active {\n  background-color: #ECECEC;\n}\n.weui-cell_access .weui-cell__ft {\n  padding-right: 13px;\n  position: relative;\n}\n.weui-cell_access .weui-cell__ft:after {\n  content: \" \";\n  display: inline-block;\n  height: 6px;\n  width: 6px;\n  border-width: 2px 2px 0 0;\n  border-color: #C8C8CD;\n  border-style: solid;\n  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\n  position: relative;\n  top: -2px;\n  position: absolute;\n  top: 50%;\n  margin-top: -4px;\n  right: 2px;\n}\n.weui-cell_link {\n  color: #586C94;\n  font-size: 14px;\n}\n.weui-cell_link:first-child:before {\n  display: block;\n}\n.weui-check__label {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.weui-check__label:active {\n  background-color: #ECECEC;\n}\n.weui-check {\n  position: absolute;\n  left: -9999em;\n}\n.weui-cells_radio .weui-cell__ft {\n  padding-left: 0.35em;\n}\n.weui-cells_radio .weui-check:checked + .weui-icon-checked:before {\n  display: block;\n  content: '\\EA08';\n  color: #09BB07;\n  font-size: 16px;\n}\n.weui-cells_checkbox .weui-cell__hd {\n  padding-right: 0.35em;\n}\n.weui-cells_checkbox .weui-icon-checked:before {\n  content: '\\EA01';\n  color: #C9C9C9;\n  font-size: 23px;\n  display: block;\n}\n.weui-cells_checkbox .weui-check:checked + .weui-icon-checked:before {\n  content: '\\EA06';\n  color: #09BB07;\n}\n.weui-label {\n  display: block;\n  width: 105px;\n  word-wrap: break-word;\n  word-break: break-all;\n}\n.weui-input {\n  width: 100%;\n  border: 0;\n  outline: 0;\n  -webkit-appearance: none;\n  background-color: transparent;\n  font-size: inherit;\n  color: inherit;\n  height: 1.47058824em;\n  line-height: 1.47058824;\n}\n.weui-input::-webkit-outer-spin-button,\n.weui-input::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n.weui-textarea {\n  display: block;\n  border: 0;\n  resize: none;\n  width: 100%;\n  color: inherit;\n  font-size: 1em;\n  line-height: inherit;\n  outline: 0;\n}\n.weui-textarea-counter {\n  color: #B2B2B2;\n  text-align: right;\n}\n.weui-cell_warn .weui-textarea-counter {\n  color: #E64340;\n}\n.weui-toptips {\n  display: none;\n  position: fixed;\n  transform: translateZ(0);\n  top: 0;\n  left: 0;\n  right: 0;\n  padding: 5px;\n  font-size: 14px;\n  text-align: center;\n  color: #FFF;\n  z-index: 5000;\n  word-wrap: break-word;\n  word-break: break-all;\n}\n.weui-toptips_warn {\n  background-color: #E64340;\n}\n.weui-cells_form .weui-cell__ft {\n  font-size: 0;\n}\n.weui-cells_form .weui-icon-warn {\n  display: none;\n}\n.weui-cells_form input,\n.weui-cells_form textarea,\n.weui-cells_form label[for] {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.weui-cell_warn {\n  color: #E64340;\n}\n.weui-cell_warn .weui-icon-warn {\n  display: inline-block;\n}\n.weui-form-preview {\n  position: relative;\n  background-color: #FFFFFF;\n}\n.weui-form-preview:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #e5e5e5;\n  color: #e5e5e5;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n}\n.weui-form-preview:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #e5e5e5;\n  color: #e5e5e5;\n  transform-origin: 0 100%;\n  transform: scaleY(0.5);\n}\n.weui-form-preview__hd {\n  position: relative;\n  padding: 10px 15px;\n  text-align: right;\n  line-height: 2.5em;\n}\n.weui-form-preview__hd:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #e5e5e5;\n  color: #e5e5e5;\n  transform-origin: 0 100%;\n  transform: scaleY(0.5);\n  left: 15px;\n}\n.weui-form-preview__hd .weui-form-preview__value {\n  font-style: normal;\n  font-size: 1.6em;\n}\n.weui-form-preview__bd {\n  padding: 10px 15px;\n  font-size: .9em;\n  text-align: right;\n  color: #999999;\n  line-height: 2;\n}\n.weui-form-preview__ft {\n  position: relative;\n  line-height: 50px;\n  display: flex;\n}\n.weui-form-preview__ft:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D5D5D6;\n  color: #D5D5D6;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n}\n.weui-form-preview__item {\n  overflow: hidden;\n}\n.weui-form-preview__label {\n  float: left;\n  margin-right: 1em;\n  min-width: 4em;\n  color: #999999;\n  text-align: justify;\n  text-align-last: justify;\n}\n.weui-form-preview__value {\n  display: block;\n  overflow: hidden;\n  word-break: normal;\n  word-wrap: break-word;\n}\n.weui-form-preview__btn {\n  position: relative;\n  display: block;\n  flex: 1;\n  color: #3CC51F;\n  text-align: center;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\nbutton.weui-form-preview__btn {\n  background-color: transparent;\n  border: 0;\n  outline: 0;\n  line-height: inherit;\n  font-size: inherit;\n}\n.weui-form-preview__btn:active {\n  background-color: #EEEEEE;\n}\n.weui-form-preview__btn:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 1px;\n  bottom: 0;\n  border-left: 1px solid #D5D5D6;\n  color: #D5D5D6;\n  transform-origin: 0 0;\n  transform: scaleX(0.5);\n}\n.weui-form-preview__btn:first-child:after {\n  display: none;\n}\n.weui-form-preview__btn_default {\n  color: #999999;\n}\n.weui-form-preview__btn_primary {\n  color: #0BB20C;\n}\n.weui-cell_select {\n  padding: 0;\n}\n.weui-cell_select .weui-select {\n  padding-right: 30px;\n}\n.weui-cell_select .weui-cell__bd:after {\n  content: \" \";\n  display: inline-block;\n  height: 6px;\n  width: 6px;\n  border-width: 2px 2px 0 0;\n  border-color: #C8C8CD;\n  border-style: solid;\n  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\n  position: relative;\n  top: -2px;\n  position: absolute;\n  top: 50%;\n  right: 15px;\n  margin-top: -4px;\n}\n.weui-select {\n  -webkit-appearance: none;\n  border: 0;\n  outline: 0;\n  background-color: transparent;\n  width: 100%;\n  font-size: inherit;\n  height: 45px;\n  line-height: 45px;\n  position: relative;\n  z-index: 1;\n  padding-left: 15px;\n}\n.weui-cell_select-before {\n  padding-right: 15px;\n}\n.weui-cell_select-before .weui-select {\n  width: 105px;\n  box-sizing: border-box;\n}\n.weui-cell_select-before .weui-cell__hd {\n  position: relative;\n}\n.weui-cell_select-before .weui-cell__hd:after {\n  content: \" \";\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 1px;\n  bottom: 0;\n  border-right: 1px solid #e5e5e5;\n  color: #e5e5e5;\n  transform-origin: 100% 0;\n  transform: scaleX(0.5);\n}\n.weui-cell_select-before .weui-cell__hd:before {\n  content: \" \";\n  display: inline-block;\n  height: 6px;\n  width: 6px;\n  border-width: 2px 2px 0 0;\n  border-color: #C8C8CD;\n  border-style: solid;\n  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);\n  position: relative;\n  top: -2px;\n  position: absolute;\n  top: 50%;\n  right: 15px;\n  margin-top: -4px;\n}\n.weui-cell_select-before .weui-cell__bd {\n  padding-left: 15px;\n}\n.weui-cell_select-before .weui-cell__bd:after {\n  display: none;\n}\n.weui-cell_select-after {\n  padding-left: 15px;\n}\n.weui-cell_select-after .weui-select {\n  padding-left: 0;\n}\n.weui-cell_vcode {\n  padding-top: 0;\n  padding-right: 0;\n  padding-bottom: 0;\n}\n.weui-vcode-img {\n  margin-left: 5px;\n  height: 45px;\n  vertical-align: middle;\n}\n.weui-vcode-btn {\n  display: inline-block;\n  height: 45px;\n  margin-left: 5px;\n  padding: 0 0.6em 0 0.7em;\n  border-left: 1px solid #E5E5E5;\n  line-height: 45px;\n  vertical-align: middle;\n  font-size: 17px;\n  color: #3CC51F;\n}\nbutton.weui-vcode-btn {\n  background-color: transparent;\n  border-top: 0;\n  border-right: 0;\n  border-bottom: 0;\n  outline: 0;\n}\n.weui-vcode-btn:active {\n  color: #52a341;\n}\n.weui-gallery {\n  display: none;\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: #000000;\n  z-index: 1000;\n}\n.weui-gallery__img {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 60px;\n  left: 0;\n  background: center center no-repeat;\n  background-size: contain;\n}\n.weui-gallery__opr {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: #0D0D0D;\n  color: #FFFFFF;\n  line-height: 60px;\n  text-align: center;\n}\n.weui-gallery__del {\n  display: block;\n}\n.weui-cell_switch {\n  padding-top: 6.5px;\n  padding-bottom: 6.5px;\n}\n.weui-switch {\n  appearance: none;\n}\n.weui-switch,\n.weui-switch-cp__box {\n  position: relative;\n  width: 52px;\n  height: 32px;\n  border: 1px solid #DFDFDF;\n  outline: 0;\n  border-radius: 16px;\n  box-sizing: border-box;\n  background-color: #DFDFDF;\n  transition: background-color 0.1s, border 0.1s;\n}\n.weui-switch:before,\n.weui-switch-cp__box:before {\n  content: \" \";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 50px;\n  height: 30px;\n  border-radius: 15px;\n  background-color: #FDFDFD;\n  transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);\n}\n.weui-switch:after,\n.weui-switch-cp__box:after {\n  content: \" \";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  background-color: #FFFFFF;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);\n  transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);\n}\n.weui-switch:checked,\n.weui-switch-cp__input:checked ~ .weui-switch-cp__box {\n  border-color: #04BE02;\n  background-color: #04BE02;\n}\n.weui-switch:checked:before,\n.weui-switch-cp__input:checked ~ .weui-switch-cp__box:before {\n  transform: scale(0);\n}\n.weui-switch:checked:after,\n.weui-switch-cp__input:checked ~ .weui-switch-cp__box:after {\n  transform: translateX(20px);\n}\n.weui-switch-cp__input {\n  position: absolute;\n  left: -9999px;\n}\n.weui-switch-cp__box {\n  display: block;\n}\n.weui-uploader__hd {\n  display: flex;\n  padding-bottom: 10px;\n  align-items: center;\n}\n.weui-uploader__title {\n  flex: 1;\n}\n.weui-uploader__info {\n  color: #B2B2B2;\n}\n.weui-uploader__bd {\n  margin-bottom: -4px;\n  margin-right: -9px;\n  overflow: hidden;\n}\n.weui-uploader__files {\n  list-style: none;\n}\n.weui-uploader__file {\n  float: left;\n  margin-right: 9px;\n  margin-bottom: 9px;\n  width: 79px;\n  height: 79px;\n  background: no-repeat center center;\n  background-size: cover;\n}\n.weui-uploader__file_status {\n  position: relative;\n}\n.weui-uploader__file_status:before {\n  content: \" \";\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n}\n.weui-uploader__file_status .weui-uploader__file-content {\n  display: block;\n}\n.weui-uploader__file-content {\n  display: none;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  color: #FFFFFF;\n}\n.weui-uploader__file-content .weui-icon-warn {\n  display: inline-block;\n}\n.weui-uploader__input-box {\n  float: left;\n  position: relative;\n  margin-right: 9px;\n  margin-bottom: 9px;\n  width: 77px;\n  height: 77px;\n  border: 1px solid #D9D9D9;\n}\n.weui-uploader__input-box:before,\n.weui-uploader__input-box:after {\n  content: \" \";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: #D9D9D9;\n}\n.weui-uploader__input-box:before {\n  width: 2px;\n  height: 39.5px;\n}\n.weui-uploader__input-box:after {\n  width: 39.5px;\n  height: 2px;\n}\n.weui-uploader__input-box:active {\n  border-color: #999999;\n}\n.weui-uploader__input-box:active:before,\n.weui-uploader__input-box:active:after {\n  background-color: #999999;\n}\n.weui-uploader__input {\n  position: absolute;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.weui-msg {\n  padding-top: 36px;\n  text-align: center;\n}\n.weui-msg__icon-area {\n  margin-bottom: 30px;\n}\n.weui-msg__text-area {\n  margin-bottom: 25px;\n  padding: 0 20px;\n}\n.weui-msg__text-area a {\n  color: #586C94;\n}\n.weui-msg__title {\n  margin-bottom: 5px;\n  font-weight: 400;\n  font-size: 20px;\n}\n.weui-msg__desc {\n  font-size: 14px;\n  color: #999999;\n}\n.weui-msg__opr-area {\n  margin-bottom: 25px;\n}\n.weui-msg__extra-area {\n  margin-bottom: 15px;\n  font-size: 14px;\n  color: #999999;\n}\n.weui-msg__extra-area a {\n  color: #586C94;\n}\n@media screen and (min-height: 438px) {\n  .weui-msg__extra-area {\n    position: fixed;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n    text-align: center;\n  }\n}\n.weui-article {\n  padding: 20px 15px;\n  font-size: 15px;\n}\n.weui-article section {\n  margin-bottom: 1.5em;\n}\n.weui-article h1 {\n  font-size: 18px;\n  font-weight: 400;\n  margin-bottom: .9em;\n}\n.weui-article h2 {\n  font-size: 16px;\n  font-weight: 400;\n  margin-bottom: .34em;\n}\n.weui-article h3 {\n  font-weight: 400;\n  font-size: 15px;\n  margin-bottom: .34em;\n}\n.weui-article * {\n  max-width: 100%;\n  box-sizing: border-box;\n  word-wrap: break-word;\n}\n.weui-article p {\n  margin: 0 0 .8em;\n}\n.weui-tabbar {\n  display: flex;\n  position: absolute;\n  z-index: 500;\n  bottom: 0;\n  width: 100%;\n  background-color: #F7F7FA;\n}\n.weui-tabbar:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #C0BFC4;\n  color: #C0BFC4;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n}\n.weui-tabbar__item {\n  display: block;\n  flex: 1;\n  padding: 5px 0 0;\n  font-size: 0;\n  color: #999999;\n  text-align: center;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,\n.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i,\n.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {\n  color: #09BB07;\n}\n.weui-tabbar__icon {\n  display: inline-block;\n  width: 27px;\n  height: 27px;\n}\ni.weui-tabbar__icon,\n.weui-tabbar__icon > i {\n  font-size: 24px;\n  color: #999999;\n}\n.weui-tabbar__icon img {\n  width: 100%;\n  height: 100%;\n}\n.weui-tabbar__label {\n  text-align: center;\n  color: #999999;\n  font-size: 10px;\n  line-height: 1.8;\n}\n.weui-navbar {\n  display: flex;\n  position: absolute;\n  z-index: 500;\n  top: 0;\n  width: 100%;\n  background-color: #FAFAFA;\n}\n.weui-navbar:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #CCCCCC;\n  color: #CCCCCC;\n  transform-origin: 0 100%;\n  transform: scaleY(0.5);\n}\n.weui-navbar + .weui-tab__panel {\n  padding-top: 50px;\n  padding-bottom: 0;\n}\n.weui-navbar__item {\n  position: relative;\n  display: block;\n  flex: 1;\n  padding: 13px 0;\n  text-align: center;\n  font-size: 15px;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n.weui-navbar__item:active {\n  background-color: #EDEDED;\n}\n.weui-navbar__item.weui-bar__item_on {\n  background-color: #EAEAEA;\n}\n.weui-navbar__item:after {\n  content: \" \";\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 1px;\n  bottom: 0;\n  border-right: 1px solid #CCCCCC;\n  color: #CCCCCC;\n  transform-origin: 100% 0;\n  transform: scaleX(0.5);\n}\n.weui-navbar__item:last-child:after {\n  display: none;\n}\n.weui-tab {\n  position: relative;\n  height: 100%;\n}\n.weui-tab__panel {\n  box-sizing: border-box;\n  height: 100%;\n  padding-bottom: 50px;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.weui-tab__content {\n  display: none;\n}\n.weui-progress {\n  display: flex;\n  align-items: center;\n}\n.weui-progress__bar {\n  background-color: #EBEBEB;\n  height: 3px;\n  flex: 1;\n}\n.weui-progress__inner-bar {\n  width: 0;\n  height: 100%;\n  background-color: #09BB07;\n}\n.weui-progress__opr {\n  display: block;\n  margin-left: 15px;\n  font-size: 0;\n}\n.weui-panel {\n  background-color: #FFFFFF;\n  margin-top: 10px;\n  position: relative;\n  overflow: hidden;\n}\n.weui-panel:first-child {\n  margin-top: 0;\n}\n.weui-panel:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #E5E5E5;\n  color: #E5E5E5;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n}\n.weui-panel:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #E5E5E5;\n  color: #E5E5E5;\n  transform-origin: 0 100%;\n  transform: scaleY(0.5);\n}\n.weui-panel__hd {\n  padding: 14px 15px 10px;\n  color: #999999;\n  font-size: 13px;\n  position: relative;\n}\n.weui-panel__hd:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #E5E5E5;\n  color: #E5E5E5;\n  transform-origin: 0 100%;\n  transform: scaleY(0.5);\n  left: 15px;\n}\n.weui-media-box {\n  padding: 15px;\n  position: relative;\n}\n.weui-media-box:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #E5E5E5;\n  color: #E5E5E5;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n  left: 15px;\n}\n.weui-media-box:first-child:before {\n  display: none;\n}\na.weui-media-box {\n  color: #000000;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\na.weui-media-box:active {\n  background-color: #ECECEC;\n}\n.weui-media-box__title {\n  font-weight: 400;\n  font-size: 17px;\n  width: auto;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  word-wrap: normal;\n  word-wrap: break-word;\n  word-break: break-all;\n}\n.weui-media-box__desc {\n  color: #999999;\n  font-size: 13px;\n  line-height: 1.2;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n}\n.weui-media-box__info {\n  margin-top: 15px;\n  padding-bottom: 5px;\n  font-size: 13px;\n  color: #CECECE;\n  line-height: 1em;\n  list-style: none;\n  overflow: hidden;\n}\n.weui-media-box__info__meta {\n  float: left;\n  padding-right: 1em;\n}\n.weui-media-box__info__meta_extra {\n  padding-left: 1em;\n  border-left: 1px solid #CECECE;\n}\n.weui-media-box_text .weui-media-box__title {\n  margin-bottom: 8px;\n}\n.weui-media-box_appmsg {\n  display: flex;\n  align-items: center;\n}\n.weui-media-box_appmsg .weui-media-box__hd {\n  margin-right: .8em;\n  width: 60px;\n  height: 60px;\n  line-height: 60px;\n  text-align: center;\n}\n.weui-media-box_appmsg .weui-media-box__thumb {\n  width: 100%;\n  max-height: 100%;\n  vertical-align: top;\n}\n.weui-media-box_appmsg .weui-media-box__bd {\n  flex: 1;\n  min-width: 0;\n}\n.weui-media-box_small-appmsg {\n  padding: 0;\n}\n.weui-media-box_small-appmsg .weui-cells {\n  margin-top: 0;\n}\n.weui-media-box_small-appmsg .weui-cells:before {\n  display: none;\n}\n.weui-grids {\n  position: relative;\n  overflow: hidden;\n}\n.weui-grids:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n}\n.weui-grids:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 1px;\n  bottom: 0;\n  border-left: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  transform-origin: 0 0;\n  transform: scaleX(0.5);\n}\n.weui-grid {\n  position: relative;\n  float: left;\n  padding: 20px 10px;\n  width: 33.33333333%;\n  box-sizing: border-box;\n}\n.weui-grid:before {\n  content: \" \";\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 1px;\n  bottom: 0;\n  border-right: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  transform-origin: 100% 0;\n  transform: scaleX(0.5);\n}\n.weui-grid:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  transform-origin: 0 100%;\n  transform: scaleY(0.5);\n}\n.weui-grid:active {\n  background-color: #ECECEC;\n}\n.weui-grid__icon {\n  width: 28px;\n  height: 28px;\n  margin: 0 auto;\n}\n.weui-grid__icon img {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n.weui-grid__icon + .weui-grid__label {\n  margin-top: 5px;\n}\n.weui-grid__label {\n  display: block;\n  text-align: center;\n  color: #000000;\n  font-size: 14px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.weui-footer {\n  color: #999999;\n  font-size: 14px;\n  text-align: center;\n}\n.weui-footer a {\n  color: #586C94;\n}\n.weui-footer_fixed-bottom {\n  position: fixed;\n  bottom: .52em;\n  left: 0;\n  right: 0;\n}\n.weui-footer__links {\n  font-size: 0;\n}\n.weui-footer__link {\n  display: inline-block;\n  vertical-align: top;\n  margin: 0 .62em;\n  position: relative;\n  font-size: 14px;\n}\n.weui-footer__link:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 1px;\n  bottom: 0;\n  border-left: 1px solid #C7C7C7;\n  color: #C7C7C7;\n  transform-origin: 0 0;\n  transform: scaleX(0.5);\n  left: -0.65em;\n  top: .36em;\n  bottom: .36em;\n}\n.weui-footer__link:first-child:before {\n  display: none;\n}\n.weui-footer__text {\n  padding: 0 .34em;\n  font-size: 12px;\n}\n.weui-flex {\n  display: flex;\n}\n.weui-flex__item {\n  flex: 1;\n}\n.weui-dialog {\n  position: fixed;\n  z-index: 5000;\n  width: 80%;\n  max-width: 300px;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background-color: #FFFFFF;\n  text-align: center;\n  border-radius: 3px;\n  overflow: hidden;\n}\n.weui-dialog__hd {\n  padding: 1.3em 1.6em 0.5em;\n}\n.weui-dialog__title {\n  font-weight: 400;\n  font-size: 18px;\n}\n.weui-dialog__bd {\n  padding: 0 1.6em 0.8em;\n  min-height: 40px;\n  font-size: 15px;\n  line-height: 1.3;\n  word-wrap: break-word;\n  word-break: break-all;\n  color: #999999;\n}\n.weui-dialog__bd:first-child {\n  padding: 2.7em 20px 1.7em;\n  color: #353535;\n}\n.weui-dialog__ft {\n  position: relative;\n  line-height: 48px;\n  font-size: 18px;\n  display: flex;\n}\n.weui-dialog__ft:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D5D5D6;\n  color: #D5D5D6;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n}\n.weui-dialog__btn {\n  display: block;\n  flex: 1;\n  color: #3CC51F;\n  text-decoration: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  position: relative;\n}\n.weui-dialog__btn:active {\n  background-color: #EEEEEE;\n}\n.weui-dialog__btn:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 1px;\n  bottom: 0;\n  border-left: 1px solid #D5D5D6;\n  color: #D5D5D6;\n  transform-origin: 0 0;\n  transform: scaleX(0.5);\n}\n.weui-dialog__btn:first-child:after {\n  display: none;\n}\n.weui-dialog__btn_default {\n  color: #353535;\n}\n.weui-dialog__btn_primary {\n  color: #0BB20C;\n}\n.weui-skin_android .weui-dialog {\n  text-align: left;\n  box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);\n}\n.weui-skin_android .weui-dialog__title {\n  font-size: 21px;\n}\n.weui-skin_android .weui-dialog__hd {\n  text-align: left;\n}\n.weui-skin_android .weui-dialog__bd {\n  color: #999999;\n  padding: 0.25em 1.6em 2em;\n  font-size: 17px;\n  text-align: left;\n}\n.weui-skin_android .weui-dialog__bd:first-child {\n  padding: 1.6em 1.6em 2em;\n  color: #353535;\n}\n.weui-skin_android .weui-dialog__ft {\n  display: block;\n  text-align: right;\n  line-height: 42px;\n  font-size: 16px;\n  padding: 0 1.6em 0.7em;\n}\n.weui-skin_android .weui-dialog__ft:after {\n  display: none;\n}\n.weui-skin_android .weui-dialog__btn {\n  display: inline-block;\n  vertical-align: top;\n  padding: 0 .8em;\n}\n.weui-skin_android .weui-dialog__btn:after {\n  display: none;\n}\n.weui-skin_android .weui-dialog__btn:active {\n  background-color: rgba(0, 0, 0, 0.06);\n}\n.weui-skin_android .weui-dialog__btn:visited {\n  background-color: rgba(0, 0, 0, 0.06);\n}\n.weui-skin_android .weui-dialog__btn:last-child {\n  margin-right: -0.8em;\n}\n.weui-skin_android .weui-dialog__btn_default {\n  color: #808080;\n}\n@media screen and (min-width: 1024px) {\n  .weui-dialog {\n    width: 35%;\n  }\n}\n.weui-toast {\n  position: fixed;\n  z-index: 5000;\n  width: 7.6em;\n  min-height: 7.6em;\n  top: 180px;\n  left: 50%;\n  margin-left: -3.8em;\n  background: rgba(17, 17, 17, 0.7);\n  text-align: center;\n  border-radius: 5px;\n  color: #FFFFFF;\n}\n.weui-icon_toast {\n  margin: 22px 0 0;\n  display: block;\n}\n.weui-icon_toast.weui-icon-success-no-circle:before {\n  color: #FFFFFF;\n  font-size: 55px;\n}\n.weui-icon_toast.weui-loading {\n  margin: 30px 0 0;\n  width: 38px;\n  height: 38px;\n  vertical-align: baseline;\n}\n.weui-toast__content {\n  margin: 0 0 15px;\n}\n.weui-mask {\n  position: fixed;\n  z-index: 1000;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.6);\n}\n.weui-mask_transparent {\n  position: fixed;\n  z-index: 1000;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n}\n.weui-actionsheet {\n  position: fixed;\n  left: 0;\n  bottom: 0;\n  transform: translate(0, 100%);\n  backface-visibility: hidden;\n  z-index: 5000;\n  width: 100%;\n  background-color: #EFEFF4;\n  transition: transform .3s;\n}\n.weui-actionsheet__title {\n  position: relative;\n  height: 65px;\n  padding: 0 20px;\n  line-height: 1.4;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  text-align: center;\n  font-size: 14px;\n  color: #888;\n  background: #FCFCFD;\n}\n.weui-actionsheet__title:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #e5e5e5;\n  color: #e5e5e5;\n  transform-origin: 0 100%;\n  transform: scaleY(0.5);\n}\n.weui-actionsheet__title .weui-actionsheet__title-text {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n}\n.weui-actionsheet__menu {\n  background-color: #FCFCFD;\n}\n.weui-actionsheet__action {\n  margin-top: 6px;\n  background-color: #FCFCFD;\n}\n.weui-actionsheet__cell {\n  position: relative;\n  padding: 10px 0;\n  text-align: center;\n  font-size: 18px;\n}\n.weui-actionsheet__cell:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #e5e5e5;\n  color: #e5e5e5;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n}\n.weui-actionsheet__cell:active {\n  background-color: #ECECEC;\n}\n.weui-actionsheet__cell:first-child:before {\n  display: none;\n}\n.weui-skin_android .weui-actionsheet {\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  bottom: auto;\n  transform: translate(-50%, -50%);\n  width: 274px;\n  box-sizing: border-box;\n  backface-visibility: hidden;\n  background: transparent;\n  transition: transform .3s;\n}\n.weui-skin_android .weui-actionsheet__action {\n  display: none;\n}\n.weui-skin_android .weui-actionsheet__menu {\n  border-radius: 2px;\n  box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);\n}\n.weui-skin_android .weui-actionsheet__cell {\n  padding: 13px 24px;\n  font-size: 16px;\n  line-height: 1.4;\n  text-align: left;\n}\n.weui-skin_android .weui-actionsheet__cell:first-child {\n  border-top-left-radius: 2px;\n  border-top-right-radius: 2px;\n}\n.weui-skin_android .weui-actionsheet__cell:last-child {\n  border-bottom-left-radius: 2px;\n  border-bottom-right-radius: 2px;\n}\n.weui-actionsheet_toggle {\n  transform: translate(0, 0);\n}\n.weui-loadmore {\n  width: 65%;\n  margin: 1.5em auto;\n  line-height: 1.6em;\n  font-size: 14px;\n  text-align: center;\n}\n.weui-loadmore__tips {\n  display: inline-block;\n  vertical-align: middle;\n}\n.weui-loadmore_line {\n  border-top: 1px solid #E5E5E5;\n  margin-top: 2.4em;\n}\n.weui-loadmore_line .weui-loadmore__tips {\n  position: relative;\n  top: -0.9em;\n  padding: 0 .55em;\n  background-color: #FFFFFF;\n  color: #999999;\n}\n.weui-loadmore_dot .weui-loadmore__tips {\n  padding: 0 .16em;\n}\n.weui-loadmore_dot .weui-loadmore__tips:before {\n  content: \" \";\n  width: 4px;\n  height: 4px;\n  border-radius: 50%;\n  background-color: #E5E5E5;\n  display: inline-block;\n  position: relative;\n  vertical-align: 0;\n  top: -0.16em;\n}\n.weui-badge {\n  display: inline-block;\n  padding: .15em .4em;\n  min-width: 8px;\n  border-radius: 18px;\n  background-color: #F43530;\n  color: #FFFFFF;\n  line-height: 1.2;\n  text-align: center;\n  font-size: 12px;\n  vertical-align: middle;\n}\n.weui-badge_dot {\n  padding: .4em;\n  min-width: 0;\n}\n.weui-search-bar {\n  position: relative;\n  padding: 8px 10px;\n  display: flex;\n  box-sizing: border-box;\n  background-color: #EFEFF4;\n}\n.weui-search-bar:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #D7D6DC;\n  color: #D7D6DC;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n}\n.weui-search-bar:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #D7D6DC;\n  color: #D7D6DC;\n  transform-origin: 0 100%;\n  transform: scaleY(0.5);\n}\n.weui-search-bar.weui-search-bar_focusing .weui-search-bar__cancel-btn {\n  display: block;\n}\n.weui-search-bar.weui-search-bar_focusing .weui-search-bar__label {\n  display: none;\n}\n.weui-search-bar__form {\n  position: relative;\n  flex: auto;\n  background-color: #EFEFF4;\n}\n.weui-search-bar__form:after {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 200%;\n  height: 200%;\n  transform: scale(0.5);\n  transform-origin: 0 0;\n  border-radius: 10px;\n  border: 1px solid #E6E6EA;\n  box-sizing: border-box;\n  background: #FFFFFF;\n}\n.weui-search-bar__box {\n  position: relative;\n  padding-left: 30px;\n  padding-right: 30px;\n  height: 100%;\n  width: 100%;\n  box-sizing: border-box;\n  z-index: 1;\n}\n.weui-search-bar__box .weui-search-bar__input {\n  padding: 4px 0;\n  width: 100%;\n  height: 1.42857143em;\n  border: 0;\n  font-size: 14px;\n  line-height: 1.42857143em;\n  box-sizing: content-box;\n  background: transparent;\n}\n.weui-search-bar__box .weui-search-bar__input:focus {\n  outline: none;\n}\n.weui-search-bar__box .weui-icon-search {\n  position: absolute;\n  left: 10px;\n  top: 0;\n  line-height: 28px;\n}\n.weui-search-bar__box .weui-icon-clear {\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 0 10px;\n  line-height: 28px;\n}\n.weui-search-bar__label {\n  position: absolute;\n  top: 1px;\n  right: 1px;\n  bottom: 1px;\n  left: 1px;\n  z-index: 2;\n  border-radius: 3px;\n  text-align: center;\n  color: #9B9B9B;\n  background: #FFFFFF;\n}\n.weui-search-bar__label span {\n  display: inline-block;\n  font-size: 14px;\n  vertical-align: middle;\n}\n.weui-search-bar__label .weui-icon-search {\n  margin-right: 5px;\n}\n.weui-search-bar__cancel-btn {\n  display: none;\n  margin-left: 10px;\n  line-height: 28px;\n  color: #09BB07;\n  white-space: nowrap;\n}\n.weui-search-bar__input:not(:valid) ~ .weui-icon-clear {\n  display: none;\n}\ninput[type=\"search\"]::-webkit-search-decoration,\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-results-button,\ninput[type=\"search\"]::-webkit-search-results-decoration {\n  display: none;\n}\n.weui-picker {\n  position: fixed;\n  width: 100%;\n  left: 0;\n  bottom: 0;\n  z-index: 5000;\n  backface-visibility: hidden;\n  transform: translate(0, 100%);\n  transition: transform .3s;\n}\n.weui-picker__hd {\n  display: flex;\n  padding: 9px 15px;\n  background-color: #fff;\n  position: relative;\n  text-align: center;\n  font-size: 17px;\n}\n.weui-picker__hd:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #E5E5E5;\n  color: #E5E5E5;\n  transform-origin: 0 100%;\n  transform: scaleY(0.5);\n}\n.weui-picker__action {\n  display: block;\n  flex: 1;\n  color: #8a1212;\n}\n.weui-picker__action:first-child {\n  text-align: left;\n  color: #888;\n}\n.weui-picker__action:last-child {\n  text-align: right;\n}\n.weui-picker__bd {\n  display: flex;\n  position: relative;\n  background-color: #fff;\n  height: 238px;\n  overflow: hidden;\n}\n.weui-picker__group {\n  flex: 1;\n  position: relative;\n  height: 100%;\n}\n.weui-picker__mask {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  margin: 0 auto;\n  z-index: 3;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));\n  background-position: top, bottom;\n  background-size: 100% 102px;\n  background-repeat: no-repeat;\n  transform: translateZ(0);\n}\n.weui-picker__indicator {\n  width: 100%;\n  height: 34px;\n  position: absolute;\n  left: 0;\n  top: 102px;\n  z-index: 3;\n}\n.weui-picker__indicator:before {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 1px;\n  border-top: 1px solid #E5E5E5;\n  color: #E5E5E5;\n  transform-origin: 0 0;\n  transform: scaleY(0.5);\n}\n.weui-picker__indicator:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 1px;\n  border-bottom: 1px solid #E5E5E5;\n  color: #E5E5E5;\n  transform-origin: 0 100%;\n  transform: scaleY(0.5);\n}\n.weui-picker__content {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n}\n.weui-picker__item {\n  padding: 0;\n  height: 34px;\n  line-height: 34px;\n  text-align: center;\n  color: #000;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n}\n.weui-picker__item_disabled {\n  color: #999999;\n}\n@keyframes slideUp {\n  from {\n    transform: translate3d(0, 100%, 0);\n  }\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n}\n.weui-animate-slide-up {\n  animation: slideUp ease .3s forwards;\n}\n@keyframes slideDown {\n  from {\n    transform: translate3d(0, 0, 0);\n  }\n  to {\n    transform: translate3d(0, 100%, 0);\n  }\n}\n.weui-animate-slide-down {\n  animation: slideDown ease .3s forwards;\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.weui-animate-fade-in {\n  animation: fadeIn ease .3s forwards;\n}\n@keyframes fadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n.weui-animate-fade-out {\n  animation: fadeOut ease .3s forwards;\n}\n.weui-agree {\n  display: block;\n  padding: .5em 15px;\n  font-size: 13px;\n}\n.weui-agree a {\n  color: #586C94;\n}\n.weui-agree__text {\n  color: #999999;\n}\n.weui-agree__checkbox {\n  appearance: none;\n  outline: 0;\n  font-size: 0;\n  border: 1px solid #D1D1D1;\n  background-color: #FFFFFF;\n  border-radius: 3px;\n  width: 13px;\n  height: 13px;\n  position: relative;\n  vertical-align: 0;\n  top: 2px;\n}\n.weui-agree__checkbox:checked:before {\n  font-family: \"weui\";\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  text-align: center;\n  speak: none;\n  display: inline-block;\n  vertical-align: middle;\n  text-decoration: inherit;\n  content: \"\\EA08\";\n  color: #09BB07;\n  font-size: 13px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -48%) scale(0.73);\n}\n.weui-agree__checkbox:disabled {\n  background-color: #E1E1E1;\n}\n.weui-agree__checkbox:disabled:before {\n  color: #ADADAD;\n}\n.weui-loading {\n  width: 20px;\n  height: 20px;\n  display: inline-block;\n  vertical-align: middle;\n  animation: weuiLoading 1s steps(12, end) infinite;\n  background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;\n  background-size: 100%;\n}\n.weui-loading.weui-loading_transparent,\n.weui-btn_loading.weui-btn_primary .weui-loading,\n.weui-btn_loading.weui-btn_warn .weui-loading {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect xmlns='http://www.w3.org/2000/svg' width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.56)' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.5)' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.43)' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.38)' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.32)' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.28)' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.25)' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.2)' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.17)' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.14)' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.1)' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.03)' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E\");\n}\n@-webkit-keyframes weuiLoading {\n  0% {\n    transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\n@keyframes weuiLoading {\n  0% {\n    transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\n.weui-slider {\n  padding: 15px 18px;\n  user-select: none;\n}\n.weui-slider__inner {\n  position: relative;\n  height: 2px;\n  background-color: #E9E9E9;\n}\n.weui-slider__track {\n  height: 2px;\n  background-color: #8a1212;\n  width: 0;\n}\n.weui-slider__handler {\n  position: absolute;\n  left: 0;\n  top: 50%;\n  width: 28px;\n  height: 28px;\n  margin-left: -14px;\n  margin-top: -14px;\n  border-radius: 50%;\n  background-color: #FFFFFF;\n  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);\n}\n.weui-slider-box {\n  display: flex;\n  align-items: center;\n}\n.weui-slider-box .weui-slider {\n  flex: 1;\n}\n.weui-slider-box__value {\n  margin-left: .5em;\n  min-width: 24px;\n  color: #888888;\n  text-align: center;\n  font-size: 14px;\n}\n", ""]);

	// exports


/***/ }),

/***/ 563:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(564);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(537)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../css-loader/index.js!../../../less-loader/index.js!./jquery-weui.css", function() {
				var newContent = require("!!../../../css-loader/index.js!../../../less-loader/index.js!./jquery-weui.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 564:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(536)();
	// imports


	// module
	exports.push([module.id, "/** \n* jQuery WeUI V1.0.1 \n* By 言川\n* http://lihongxun945.github.io/jquery-weui/\n */\n.preloader {\n  width: 20px;\n  height: 20px;\n  -webkit-transform-origin: 50%;\n  transform-origin: 50%;\n  -webkit-animation: preloader-spin 1s steps(12, end) infinite;\n  animation: preloader-spin 1s steps(12, end) infinite;\n}\n.preloader:after {\n  display: block;\n  width: 100%;\n  height: 100%;\n  content: \"\";\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n  background-repeat: no-repeat;\n  background-position: 50%;\n  background-size: 100%;\n}\n@-webkit-keyframes preloader-spin {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n@keyframes preloader-spin {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n/*\n.hairline(@position, @color) when (@position = top) {\n  border-top: 1px solid @color;\n}\n.hairline(@position, @color) when (@position = left) {\n  border-left: 1px solid @color;\n}\n.hairline(@position, @color) when (@position = bottom) {\n  border-bottom: 1px solid @color;\n}\n.hairline(@position, @color) when (@position = right) {\n  border-right: 1px solid @color;\n}\n// For right and bottom\n.hairline-remove(@position) when not (@position = left) and not (@position = top) {\n  border-left: 0;\n  border-bottom: 0;\n}\n// For left and top\n.hairline-remove(@position) when not (@position = right) and not (@position = bottom) {\n  border-right: 0;\n  border-top: 0;\n}\n// For right and bottom\n.hairline-color(@position, @color) when not (@position = left) and not (@position = top) {\n  border-right-color: @color;\n  border-bottom-color: @color;\n}\n// For left and top\n.hairline-color(@position, @color) when not (@position = right) and not (@position = bottom) {\n  border-left-color: @color;\n  border-top-color: @color;\n}\n*/\nlabel > * {\n  pointer-events: none;\n}\nhtml {\n  font-size: 20px;\n}\nbody {\n  font-size: 16px;\n}\n@media only screen and (min-width: 400px) {\n  html {\n    font-size: 21.33333333px !important;\n  }\n}\n@media only screen and (min-width: 414px) {\n  html {\n    font-size: 22.08px !important;\n  }\n}\n@media only screen and (min-width: 480px) {\n  html {\n    font-size: 25.6px !important;\n  }\n}\n.weui_navbar {\n  z-index: 10;\n}\n.weui-popup-overlay,\n.weui-popup-container {\n  z-index: 1000;\n}\n.weui-mask {\n  z-index: 1000;\n}\n/* === Grid === */\n.weui-row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  -webkit-justify-content: space-between;\n  justify-content: space-between;\n  -webkit-box-lines: multiple;\n  -moz-box-lines: multiple;\n  -webkit-flex-wrap: wrap;\n  -ms-flex-wrap: wrap;\n  flex-wrap: wrap;\n  -webkit-box-align: start;\n  -ms-flex-align: start;\n  -webkit-align-items: flex-start;\n  align-items: flex-start;\n}\n.weui-row > [class*=\"col-\"] {\n  box-sizing: border-box;\n}\n.weui-row .col-auto {\n  width: 100%;\n}\n.weui-row .weui-col-100 {\n  width: 100%;\n  width: calc(100%);\n}\n.weui-row.weui-no-gutter .weui-col-100 {\n  width: 100%;\n}\n.weui-row .weui-col-95 {\n  width: 95%;\n  width: calc(94.25%);\n}\n.weui-row.weui-no-gutter .weui-col-95 {\n  width: 95%;\n}\n.weui-row .weui-col-90 {\n  width: 90%;\n  width: calc(88.5%);\n}\n.weui-row.weui-no-gutter .weui-col-90 {\n  width: 90%;\n}\n.weui-row .weui-col-85 {\n  width: 85%;\n  width: calc(82.75%);\n}\n.weui-row.weui-no-gutter .weui-col-85 {\n  width: 85%;\n}\n.weui-row .weui-col-80 {\n  width: 80%;\n  width: calc(77%);\n}\n.weui-row.weui-no-gutter .weui-col-80 {\n  width: 80%;\n}\n.weui-row .weui-col-75 {\n  width: 75%;\n  width: calc(71.25%);\n}\n.weui-row.weui-no-gutter .weui-col-75 {\n  width: 75%;\n}\n.weui-row .weui-col-66 {\n  width: 66.66666666666666%;\n  width: calc(61.66666667%);\n}\n.weui-row.weui-no-gutter .weui-col-66 {\n  width: 66.66666666666666%;\n}\n.weui-row .weui-col-60 {\n  width: 60%;\n  width: calc(54%);\n}\n.weui-row.weui-no-gutter .weui-col-60 {\n  width: 60%;\n}\n.weui-row .weui-col-50 {\n  width: 50%;\n  width: calc(42.5%);\n}\n.weui-row.weui-no-gutter .weui-col-50 {\n  width: 50%;\n}\n.weui-row .weui-col-40 {\n  width: 40%;\n  width: calc(31%);\n}\n.weui-row.weui-no-gutter .weui-col-40 {\n  width: 40%;\n}\n.weui-row .weui-col-33 {\n  width: 33.333333333333336%;\n  width: calc(23.33333333%);\n}\n.weui-row.weui-no-gutter .weui-col-33 {\n  width: 33.333333333333336%;\n}\n.weui-row .weui-col-25 {\n  width: 25%;\n  width: calc(13.75%);\n}\n.weui-row.weui-no-gutter .weui-col-25 {\n  width: 25%;\n}\n.weui-row .weui-col-20 {\n  width: 20%;\n  width: calc(8%);\n}\n.weui-row.weui-no-gutter .weui-col-20 {\n  width: 20%;\n}\n.weui-row .weui-col-15 {\n  width: 15%;\n  width: calc(2.25%);\n}\n.weui-row.weui-no-gutter .weui-col-15 {\n  width: 15%;\n}\n.weui-row .weui-col-10 {\n  width: 10%;\n  width: calc(-3.5%);\n}\n.weui-row.weui-no-gutter .weui-col-10 {\n  width: 10%;\n}\n.weui-row .weui-col-5 {\n  width: 5%;\n  width: calc(-9.25%);\n}\n.weui-row.weui-no-gutter .weui-col-5 {\n  width: 5%;\n}\n.weui-row .weui-col-auto:nth-last-child(1),\n.weui-row .weui-col-auto:nth-last-child(1) ~ .weui-col-auto {\n  width: 100%;\n  width: calc(100%);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(1),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(1) ~ .weui-col-auto {\n  width: 100%;\n}\n.weui-row .weui-col-auto:nth-last-child(2),\n.weui-row .weui-col-auto:nth-last-child(2) ~ .weui-col-auto {\n  width: 50%;\n  width: calc(42.5%);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(2),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(2) ~ .weui-col-auto {\n  width: 50%;\n}\n.weui-row .weui-col-auto:nth-last-child(3),\n.weui-row .weui-col-auto:nth-last-child(3) ~ .weui-col-auto {\n  width: 33.33333333%;\n  width: calc(23.33333333%);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(3),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(3) ~ .weui-col-auto {\n  width: 33.33333333%;\n}\n.weui-row .weui-col-auto:nth-last-child(4),\n.weui-row .weui-col-auto:nth-last-child(4) ~ .weui-col-auto {\n  width: 25%;\n  width: calc(13.75%);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(4),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(4) ~ .weui-col-auto {\n  width: 25%;\n}\n.weui-row .weui-col-auto:nth-last-child(5),\n.weui-row .weui-col-auto:nth-last-child(5) ~ .weui-col-auto {\n  width: 20%;\n  width: calc(8%);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(5),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(5) ~ .weui-col-auto {\n  width: 20%;\n}\n.weui-row .weui-col-auto:nth-last-child(6),\n.weui-row .weui-col-auto:nth-last-child(6) ~ .weui-col-auto {\n  width: 16.66666667%;\n  width: calc(4.16666667%);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(6),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(6) ~ .weui-col-auto {\n  width: 16.66666667%;\n}\n.weui-row .weui-col-auto:nth-last-child(7),\n.weui-row .weui-col-auto:nth-last-child(7) ~ .weui-col-auto {\n  width: 14.28571429%;\n  width: calc(1.42857143%);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(7),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(7) ~ .weui-col-auto {\n  width: 14.28571429%;\n}\n.weui-row .weui-col-auto:nth-last-child(8),\n.weui-row .weui-col-auto:nth-last-child(8) ~ .weui-col-auto {\n  width: 12.5%;\n  width: calc(-0.625%);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(8),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(8) ~ .weui-col-auto {\n  width: 12.5%;\n}\n.weui-row .weui-col-auto:nth-last-child(9),\n.weui-row .weui-col-auto:nth-last-child(9) ~ .weui-col-auto {\n  width: 11.11111111%;\n  width: calc(-2.22222222%);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(9),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(9) ~ .weui-col-auto {\n  width: 11.11111111%;\n}\n.weui-row .weui-col-auto:nth-last-child(10),\n.weui-row .weui-col-auto:nth-last-child(10) ~ .weui-col-auto {\n  width: 10%;\n  width: calc(-3.5%);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(10),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(10) ~ .weui-col-auto {\n  width: 10%;\n}\n.weui-row .weui-col-auto:nth-last-child(11),\n.weui-row .weui-col-auto:nth-last-child(11) ~ .weui-col-auto {\n  width: 9.09090909%;\n  width: calc(-4.54545455%);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(11),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(11) ~ .weui-col-auto {\n  width: 9.09090909%;\n}\n.weui-row .weui-col-auto:nth-last-child(12),\n.weui-row .weui-col-auto:nth-last-child(12) ~ .weui-col-auto {\n  width: 8.33333333%;\n  width: calc(-5.41666667%);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(12),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(12) ~ .weui-col-auto {\n  width: 8.33333333%;\n}\n.weui-row .weui-col-auto:nth-last-child(13),\n.weui-row .weui-col-auto:nth-last-child(13) ~ .weui-col-auto {\n  width: 7.69230769%;\n  width: calc(-6.15384615%);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(13),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(13) ~ .weui-col-auto {\n  width: 7.69230769%;\n}\n.weui-row .weui-col-auto:nth-last-child(14),\n.weui-row .weui-col-auto:nth-last-child(14) ~ .weui-col-auto {\n  width: 7.14285714%;\n  width: calc(-6.78571429%);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(14),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(14) ~ .weui-col-auto {\n  width: 7.14285714%;\n}\n.weui-row .weui-col-auto:nth-last-child(15),\n.weui-row .weui-col-auto:nth-last-child(15) ~ .weui-col-auto {\n  width: 6.66666667%;\n  width: calc(-7.33333333%);\n}\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(15),\n.weui-row.weui-no-gutter .weui-col-auto:nth-last-child(15) ~ .weui-col-auto {\n  width: 6.66666667%;\n}\n@media all and (min-width: 768px) {\n  .row .tablet-100 {\n    width: 100%;\n    width: calc(100%);\n  }\n  .row.no-gutter .tablet-100 {\n    width: 100%;\n  }\n  .row .tablet-95 {\n    width: 95%;\n    width: calc(94.25%);\n  }\n  .row.no-gutter .tablet-95 {\n    width: 95%;\n  }\n  .row .tablet-90 {\n    width: 90%;\n    width: calc(88.5%);\n  }\n  .row.no-gutter .tablet-90 {\n    width: 90%;\n  }\n  .row .tablet-85 {\n    width: 85%;\n    width: calc(82.75%);\n  }\n  .row.no-gutter .tablet-85 {\n    width: 85%;\n  }\n  .row .tablet-80 {\n    width: 80%;\n    width: calc(77%);\n  }\n  .row.no-gutter .tablet-80 {\n    width: 80%;\n  }\n  .row .tablet-75 {\n    width: 75%;\n    width: calc(71.25%);\n  }\n  .row.no-gutter .tablet-75 {\n    width: 75%;\n  }\n  .row .tablet-66 {\n    width: 66.66666666666666%;\n    width: calc(61.66666667%);\n  }\n  .row.no-gutter .tablet-66 {\n    width: 66.66666666666666%;\n  }\n  .row .tablet-60 {\n    width: 60%;\n    width: calc(54%);\n  }\n  .row.no-gutter .tablet-60 {\n    width: 60%;\n  }\n  .row .tablet-50 {\n    width: 50%;\n    width: calc(42.5%);\n  }\n  .row.no-gutter .tablet-50 {\n    width: 50%;\n  }\n  .row .tablet-40 {\n    width: 40%;\n    width: calc(31%);\n  }\n  .row.no-gutter .tablet-40 {\n    width: 40%;\n  }\n  .row .tablet-33 {\n    width: 33.333333333333336%;\n    width: calc(23.33333333%);\n  }\n  .row.no-gutter .tablet-33 {\n    width: 33.333333333333336%;\n  }\n  .row .tablet-25 {\n    width: 25%;\n    width: calc(13.75%);\n  }\n  .row.no-gutter .tablet-25 {\n    width: 25%;\n  }\n  .row .tablet-20 {\n    width: 20%;\n    width: calc(8%);\n  }\n  .row.no-gutter .tablet-20 {\n    width: 20%;\n  }\n  .row .tablet-15 {\n    width: 15%;\n    width: calc(2.25%);\n  }\n  .row.no-gutter .tablet-15 {\n    width: 15%;\n  }\n  .row .tablet-10 {\n    width: 10%;\n    width: calc(-3.5%);\n  }\n  .row.no-gutter .tablet-10 {\n    width: 10%;\n  }\n  .row .tablet-5 {\n    width: 5%;\n    width: calc(-9.25%);\n  }\n  .row.no-gutter .tablet-5 {\n    width: 5%;\n  }\n  .row .tablet-auto:nth-last-child(1),\n  .row .tablet-auto:nth-last-child(1) ~ .col-auto {\n    width: 100%;\n    width: calc(100%);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(1),\n  .row.no-gutter .tablet-auto:nth-last-child(1) ~ .tablet-auto {\n    width: 100%;\n  }\n  .row .tablet-auto:nth-last-child(2),\n  .row .tablet-auto:nth-last-child(2) ~ .col-auto {\n    width: 50%;\n    width: calc(42.5%);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(2),\n  .row.no-gutter .tablet-auto:nth-last-child(2) ~ .tablet-auto {\n    width: 50%;\n  }\n  .row .tablet-auto:nth-last-child(3),\n  .row .tablet-auto:nth-last-child(3) ~ .col-auto {\n    width: 33.33333333%;\n    width: calc(23.33333333%);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(3),\n  .row.no-gutter .tablet-auto:nth-last-child(3) ~ .tablet-auto {\n    width: 33.33333333%;\n  }\n  .row .tablet-auto:nth-last-child(4),\n  .row .tablet-auto:nth-last-child(4) ~ .col-auto {\n    width: 25%;\n    width: calc(13.75%);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(4),\n  .row.no-gutter .tablet-auto:nth-last-child(4) ~ .tablet-auto {\n    width: 25%;\n  }\n  .row .tablet-auto:nth-last-child(5),\n  .row .tablet-auto:nth-last-child(5) ~ .col-auto {\n    width: 20%;\n    width: calc(8%);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(5),\n  .row.no-gutter .tablet-auto:nth-last-child(5) ~ .tablet-auto {\n    width: 20%;\n  }\n  .row .tablet-auto:nth-last-child(6),\n  .row .tablet-auto:nth-last-child(6) ~ .col-auto {\n    width: 16.66666667%;\n    width: calc(4.16666667%);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(6),\n  .row.no-gutter .tablet-auto:nth-last-child(6) ~ .tablet-auto {\n    width: 16.66666667%;\n  }\n  .row .tablet-auto:nth-last-child(7),\n  .row .tablet-auto:nth-last-child(7) ~ .col-auto {\n    width: 14.28571429%;\n    width: calc(1.42857143%);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(7),\n  .row.no-gutter .tablet-auto:nth-last-child(7) ~ .tablet-auto {\n    width: 14.28571429%;\n  }\n  .row .tablet-auto:nth-last-child(8),\n  .row .tablet-auto:nth-last-child(8) ~ .col-auto {\n    width: 12.5%;\n    width: calc(-0.625%);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(8),\n  .row.no-gutter .tablet-auto:nth-last-child(8) ~ .tablet-auto {\n    width: 12.5%;\n  }\n  .row .tablet-auto:nth-last-child(9),\n  .row .tablet-auto:nth-last-child(9) ~ .col-auto {\n    width: 11.11111111%;\n    width: calc(-2.22222222%);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(9),\n  .row.no-gutter .tablet-auto:nth-last-child(9) ~ .tablet-auto {\n    width: 11.11111111%;\n  }\n  .row .tablet-auto:nth-last-child(10),\n  .row .tablet-auto:nth-last-child(10) ~ .col-auto {\n    width: 10%;\n    width: calc(-3.5%);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(10),\n  .row.no-gutter .tablet-auto:nth-last-child(10) ~ .tablet-auto {\n    width: 10%;\n  }\n  .row .tablet-auto:nth-last-child(11),\n  .row .tablet-auto:nth-last-child(11) ~ .col-auto {\n    width: 9.09090909%;\n    width: calc(-4.54545455%);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(11),\n  .row.no-gutter .tablet-auto:nth-last-child(11) ~ .tablet-auto {\n    width: 9.09090909%;\n  }\n  .row .tablet-auto:nth-last-child(12),\n  .row .tablet-auto:nth-last-child(12) ~ .col-auto {\n    width: 8.33333333%;\n    width: calc(-5.41666667%);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(12),\n  .row.no-gutter .tablet-auto:nth-last-child(12) ~ .tablet-auto {\n    width: 8.33333333%;\n  }\n  .row .tablet-auto:nth-last-child(13),\n  .row .tablet-auto:nth-last-child(13) ~ .col-auto {\n    width: 7.69230769%;\n    width: calc(-6.15384615%);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(13),\n  .row.no-gutter .tablet-auto:nth-last-child(13) ~ .tablet-auto {\n    width: 7.69230769%;\n  }\n  .row .tablet-auto:nth-last-child(14),\n  .row .tablet-auto:nth-last-child(14) ~ .col-auto {\n    width: 7.14285714%;\n    width: calc(-6.78571429%);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(14),\n  .row.no-gutter .tablet-auto:nth-last-child(14) ~ .tablet-auto {\n    width: 7.14285714%;\n  }\n  .row .tablet-auto:nth-last-child(15),\n  .row .tablet-auto:nth-last-child(15) ~ .col-auto {\n    width: 6.66666667%;\n    width: calc(-7.33333333%);\n  }\n  .row.no-gutter .tablet-auto:nth-last-child(15),\n  .row.no-gutter .tablet-auto:nth-last-child(15) ~ .tablet-auto {\n    width: 6.66666667%;\n  }\n}\n.weui-cell__hd img {\n  display: block;\n  margin-right: 5px;\n}\n.weui-dialog,\n.weui-toast {\n  -webkit-transition-duration: .2s;\n  transition-duration: .2s;\n  opacity: 0;\n  -webkit-transform: scale(0.9) translate(-50%, -50%);\n  transform: scale(0.9) translate(-50%, -50%);\n  -webkit-transform-origin: 0 0;\n  transform-origin: 0 0;\n  visibility: hidden;\n  margin: 0;\n  top: 45%;\n  z-index: 2000;\n}\n.weui-dialog .weui-dialog__btn.default,\n.weui-toast .weui-dialog__btn.default {\n  color: #5f646e;\n}\n.weui-dialog .weui-dialog__btn + .weui-dialog__btn,\n.weui-toast .weui-dialog__btn + .weui-dialog__btn {\n  position: relative;\n}\n.weui-dialog .weui-dialog__btn + .weui-dialog__btn:after,\n.weui-toast .weui-dialog__btn + .weui-dialog__btn:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 1px;\n  height: 100%;\n  border-left: 1px solid #D5D5D6;\n  color: #D5D5D6;\n  -webkit-transform-origin: 0 0;\n  transform-origin: 0 0;\n  -webkit-transform: scaleX(0.5);\n  transform: scaleX(0.5);\n}\n.weui-dialog.weui-dialog--visible,\n.weui-toast.weui-dialog--visible,\n.weui-dialog.weui-toast--visible,\n.weui-toast.weui-toast--visible {\n  opacity: 1;\n  visibility: visible;\n  -webkit-transform: scale(1) translate(-50%, -50%);\n  transform: scale(1) translate(-50%, -50%);\n}\n.weui-toast_forbidden {\n  color: #F76260;\n}\n.weui-toast_cancel .weui-icon-toast:before {\n  content: \"\\EA0D\";\n}\n.weui-toast_forbidden .weui-icon-toast:before {\n  content: \"\\EA0B\";\n  color: #F76260;\n}\n.weui-toast_text {\n  min-height: 1em;\n  width: auto;\n  height: 45px;\n  border-radius: 25px;\n  margin-left: 0;\n  -webkit-transform: scale(0.9) translate3d(-50%, 0, 0);\n  transform: scale(0.9) translate3d(-50%, 0, 0);\n  -webkit-transform-origin: left;\n  transform-origin: left;\n}\n.weui-toast_text.weui-toast--visible {\n  -webkit-transform: scale(1) translate3d(-50%, 0, 0);\n  transform: scale(1) translate3d(-50%, 0, 0);\n}\n.weui-toast_text .weui-icon-toast {\n  display: none;\n}\n.weui-toast_text .weui-toast_content {\n  margin: 10px 15px;\n}\n.weui-mask {\n  opacity: 0;\n  -webkit-transition-duration: .3s;\n  transition-duration: .3s;\n  visibility: hidden;\n}\n.weui-mask.weui-mask--visible {\n  opacity: 1;\n  visibility: visible;\n}\n.weui-prompt-input {\n  padding: 4px 6px;\n  border: 1px solid #ccc;\n  box-sizing: border-box;\n  height: 2em;\n  width: 80%;\n  margin-top: 10px;\n}\n.weui-pull-to-refresh {\n  margin-top: -50px;\n  -webkit-transition: -webkit-transform 0.4s;\n  transition: -webkit-transform 0.4s;\n  transition: transform .4s;\n  transition: transform 0.4s, -webkit-transform 0.4s;\n}\n.weui-pull-to-refresh.refreshing {\n  -webkit-transform: translate3d(0, 50px, 0);\n  transform: translate3d(0, 50px, 0);\n}\n.weui-pull-to-refresh.touching {\n  -webkit-transition-duration: 0s;\n  transition-duration: 0s;\n}\n.weui-pull-to-refresh__layer {\n  height: 30px;\n  line-height: 30px;\n  padding: 10px;\n  text-align: center;\n}\n.weui-pull-to-refresh__layer .down {\n  display: inline-block;\n}\n.weui-pull-to-refresh__layer .up,\n.weui-pull-to-refresh__layer .refresh {\n  display: none;\n}\n.weui-pull-to-refresh__layer .weui-pull-to-refresh__arrow {\n  display: inline-block;\n  z-index: 10;\n  width: 20px;\n  height: 20px;\n  margin-right: 4px;\n  vertical-align: -4px;\n  background: no-repeat center;\n  background-size: 13px 20px;\n  -webkit-transition-duration: 300ms;\n  transition-duration: 300ms;\n  -webkit-transform: rotate(0deg) translate3d(0, 0, 0);\n  transform: rotate(0deg) translate3d(0, 0, 0);\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2026%2040'%3E%3Cpolygon%20points%3D'9%2C22%209%2C0%2017%2C0%2017%2C22%2026%2C22%2013.5%2C40%200%2C22'%20fill%3D'%238c8c8c'%2F%3E%3C%2Fsvg%3E\");\n}\n.weui-pull-to-refresh__layer .weui-pull-to-refresh__preloader {\n  display: none;\n  vertical-align: -4px;\n  margin-right: 4px;\n  width: 20px;\n  height: 20px;\n  -webkit-transform-origin: 50%;\n  transform-origin: 50%;\n  -webkit-animation: preloader-spin 1s steps(12, end) infinite;\n  animation: preloader-spin 1s steps(12, end) infinite;\n}\n.weui-pull-to-refresh__layer .weui-pull-to-refresh__preloader:after {\n  display: block;\n  width: 100%;\n  height: 100%;\n  content: \"\";\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n  background-repeat: no-repeat;\n  background-position: 50%;\n  background-size: 100%;\n}\n.pull-up .weui-pull-to-refresh__layer .down,\n.refreshing .weui-pull-to-refresh__layer .down {\n  display: none;\n}\n.pull-up .weui-pull-to-refresh__layer .weui-pull-to-refresh__arrow {\n  display: inline-block;\n  -webkit-transform: rotate(180deg) translate3d(0, 0, 0);\n  transform: rotate(180deg) translate3d(0, 0, 0);\n}\n.pull-up .weui-pull-to-refresh__layer .up {\n  display: inline-block;\n}\n.pull-down .weui-pull-to-refresh__layer .weui-pull-to-refresh__arrow {\n  display: inline-block;\n}\n.pull-down .weui-pull-to-refresh__layer .down {\n  display: inline-block;\n}\n.refreshing .weui-pull-to-refresh__layer .weui-pull-to-refresh__arrow {\n  display: none;\n}\n.refreshing .weui-pull-to-refresh__layer .weui-pull-to-refresh__preloader {\n  display: inline-block;\n}\n.refreshing .weui-pull-to-refresh__layer .refresh {\n  display: inline-block;\n}\n@keyframes preloader-spin {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n.weui-tab__bd-item.weui-pull-to-refresh {\n  position: absolute;\n  top: 50px;\n}\n.weui-tabbar__item {\n  position: relative;\n}\n.weui-tabbar__item.weui-bar__item--on .weui-tabbar__label {\n  color: #04BE02;\n}\n.weui-navbar__item {\n  color: #888;\n}\n.weui-navbar__item.weui-bar__item--on {\n  color: #666;\n  background-color: #f1f1f1;\n}\n.weui-tab__bd {\n  box-sizing: border-box;\n  height: 100%;\n}\n.weui-tab__bd .weui-tab__bd-item {\n  display: none;\n  height: 100%;\n  overflow: auto;\n}\n.weui-tab__bd .weui-tab__bd-item.weui-tab__bd-item--active {\n  display: block;\n}\n.weui-navbar + .weui-tab__bd {\n  padding-top: 50px;\n}\n.toolbar {\n  position: relative;\n  width: 100%;\n  font-size: .85rem;\n  line-height: 1.5;\n  color: #3d4145;\n  background: #f7f7f8;\n}\n.toolbar:before {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: auto;\n  right: auto;\n  height: 1px;\n  width: 100%;\n  background-color: #d9d9d9;\n  display: block;\n  z-index: 15;\n  -webkit-transform-origin: 50% 0%;\n  transform-origin: 50% 0%;\n}\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n  .toolbar:before {\n    -webkit-transform: scaleY(0.5);\n    transform: scaleY(0.5);\n  }\n}\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n  .toolbar:before {\n    -webkit-transform: scaleY(0.33);\n    transform: scaleY(0.33);\n  }\n}\n.toolbar .toolbar-inner {\n  height: 2.2rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  text-align: center;\n}\n.toolbar .title {\n  position: absolute;\n  display: block;\n  width: 100%;\n  padding: 0;\n  font-size: .85rem;\n  font-weight: normal;\n  line-height: 2.2rem;\n  color: #3d4145;\n  text-align: center;\n  white-space: nowrap;\n}\n.toolbar .picker-button {\n  position: absolute;\n  right: 0;\n  box-sizing: border-box;\n  height: 2.2rem;\n  line-height: 2.2rem;\n  color: #04BE02;\n  z-index: 1;\n  padding: 0 .5rem;\n}\n/* === Columns Picker === */\n.weui-picker-modal {\n  width: 100%;\n  position: absolute;\n  bottom: 0;\n  text-align: center;\n  border-radius: 0;\n  opacity: 0.6;\n  color: #3d4145;\n  -webkit-transition-duration: .3s;\n  transition-duration: .3s;\n  height: 13rem;\n  background: #EFEFF4;\n  -webkit-transform: translate3d(0, 100%, 0);\n  transform: translate3d(0, 100%, 0);\n  -webkit-transition-property: opacity, -webkit-transform;\n  transition-property: opacity, -webkit-transform;\n  transition-property: transform, opacity;\n  transition-property: transform, opacity, -webkit-transform;\n}\n.weui-picker-modal.picker-modal-inline {\n  height: 10.8rem;\n  opacity: 1;\n  position: static;\n  -webkit-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n}\n.weui-picker-modal.picker-modal-inline .toolbar {\n  display: none;\n}\n.weui-picker-modal.picker-columns-single .picker-items-col {\n  width: 100%;\n}\n.weui-picker-modal.weui-picker-modal-visible {\n  opacity: 1;\n  -webkit-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n}\n.weui-picker-modal .picker-modal-inner {\n  position: relative;\n  height: 10.8rem;\n}\n.weui-picker-modal .picker-columns {\n  width: 100%;\n  height: 13rem;\n  z-index: 11500;\n}\n.weui-picker-modal .picker-columns.picker-modal-inline,\n.popover .weui-picker-modal .picker-columns {\n  height: 10rem;\n}\n@media (orientation: landscape) and (max-height: 415px) {\n  .weui-picker-modal .picker-columns:not(.picker-modal-inline) {\n    height: 10rem;\n  }\n}\n.weui-picker-modal .popover.popover-picker-columns {\n  width: 14rem;\n}\n.weui-picker-modal .picker-items {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n  width: 100%;\n  padding: 0;\n  text-align: right;\n  font-size: 1rem;\n  font-weight: normal;\n  -webkit-mask-box-image: -webkit-linear-gradient(bottom, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent);\n  -webkit-mask-box-image: linear-gradient(to top, transparent, transparent 5%, white 20%, white 80%, transparent 95%, transparent);\n}\n.weui-picker-modal .bar + .picker-items {\n  height: 10.8rem;\n}\n.weui-picker-modal .picker-items-col {\n  overflow: hidden;\n  position: relative;\n  max-height: 100%;\n}\n.weui-picker-modal .picker-items-col.picker-items-col-left {\n  text-align: left;\n}\n.weui-picker-modal .picker-items-col.picker-items-col-center {\n  text-align: center;\n}\n.weui-picker-modal .picker-items-col.picker-items-col-right {\n  text-align: right;\n}\n.weui-picker-modal .picker-items-col.picker-items-col-divider {\n  color: #3d4145;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  -webkit-align-items: center;\n  align-items: center;\n}\n.weui-picker-modal .picker-items-col-wrapper {\n  -webkit-transition: 300ms;\n  transition: 300ms;\n  -webkit-transition-timing-function: ease-out;\n  transition-timing-function: ease-out;\n}\n.weui-picker-modal .picker-item {\n  height: 32px;\n  line-height: 32px;\n  padding: 0 10px;\n  white-space: nowrap;\n  position: relative;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: #9b9b9b;\n  left: 0;\n  top: 0;\n  width: 100%;\n  box-sizing: border-box;\n  -webkit-transition: 300ms;\n  transition: 300ms;\n}\n.picker-items-col-absolute .weui-picker-modal .picker-item {\n  position: absolute;\n}\n.weui-picker-modal .picker-item.picker-item-far {\n  pointer-events: none;\n}\n.weui-picker-modal .picker-item.picker-selected {\n  color: #3d4145;\n  -webkit-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n  -webkit-transform: rotateX(0deg);\n  transform: rotateX(0deg);\n}\n.weui-picker-modal .picker-center-highlight {\n  height: 32px;\n  box-sizing: border-box;\n  position: absolute;\n  left: 0;\n  width: 100%;\n  top: 50%;\n  margin-top: -16px;\n  pointer-events: none;\n}\n.weui-picker-modal .picker-center-highlight:before {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: auto;\n  right: auto;\n  height: 1px;\n  width: 100%;\n  background-color: #D9D9D9;\n  display: block;\n  z-index: 15;\n  -webkit-transform-origin: 50% 0%;\n  transform-origin: 50% 0%;\n}\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n  .weui-picker-modal .picker-center-highlight:before {\n    -webkit-transform: scaleY(0.5);\n    transform: scaleY(0.5);\n  }\n}\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n  .weui-picker-modal .picker-center-highlight:before {\n    -webkit-transform: scaleY(0.33);\n    transform: scaleY(0.33);\n  }\n}\n.weui-picker-modal .picker-center-highlight:after {\n  content: '';\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: auto;\n  top: auto;\n  height: 1px;\n  width: 100%;\n  background-color: #D9D9D9;\n  display: block;\n  z-index: 15;\n  -webkit-transform-origin: 50% 100%;\n  transform-origin: 50% 100%;\n}\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n  .weui-picker-modal .picker-center-highlight:after {\n    -webkit-transform: scaleY(0.5);\n    transform: scaleY(0.5);\n  }\n}\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n  .weui-picker-modal .picker-center-highlight:after {\n    -webkit-transform: scaleY(0.33);\n    transform: scaleY(0.33);\n  }\n}\n.weui-picker-modal .picker-3d .picker-items {\n  overflow: hidden;\n  -webkit-perspective: 1200px;\n  perspective: 1200px;\n}\n.weui-picker-modal .picker-3d .picker-items-col,\n.weui-picker-modal .picker-3d .picker-items-col-wrapper,\n.weui-picker-modal .picker-3d .picker-item {\n  -webkit-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n}\n.weui-picker-modal .picker-3d .picker-items-col {\n  overflow: visible;\n}\n.weui-picker-modal .picker-3d .picker-item {\n  -webkit-transform-origin: center center -110px;\n  transform-origin: center center -110px;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -webkit-transition-timing-function: ease-out;\n  transition-timing-function: ease-out;\n}\n.weui-picker-overlay,\n.weui-picker-container {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 0;\n  width: 100%;\n  z-index: 1000;\n}\n.city-picker .picker-items-col {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  max-width: 7rem;\n}\n.weui-picker-container .weui-cells {\n  margin: 0;\n  text-align: left;\n}\n.datetime-picker .picker-item {\n  text-overflow: initial;\n}\n.weui-select-modal {\n  height: auto;\n}\n.weui-select-modal .weui-cells {\n  margin: 0;\n  text-align: left;\n  overflow-y: auto;\n  overflow-x: hidden;\n  max-height: 16rem;\n}\n.weui-select-modal .weui-cells:after {\n  display: none;\n}\n/* === Calendar === */\n.weui-picker-calendar {\n  background: #fff;\n  height: 15rem;\n  width: 100%;\n  overflow: hidden;\n}\n.weui-picker-calendar .picker-modal-inner {\n  overflow: hidden;\n  height: 12.8rem;\n}\n.picker-calendar-week-days {\n  height: .9rem;\n  background: #f7f7f8;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  font-size: 11px;\n  box-sizing: border-box;\n  position: relative;\n}\n.picker-calendar-week-days:after {\n  content: '';\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: auto;\n  top: auto;\n  height: 1px;\n  width: 100%;\n  background-color: #c4c4c4;\n  display: block;\n  z-index: 15;\n  -webkit-transform-origin: 50% 100%;\n  transform-origin: 50% 100%;\n}\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n  .picker-calendar-week-days:after {\n    -webkit-transform: scaleY(0.5);\n    transform: scaleY(0.5);\n  }\n}\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n  .picker-calendar-week-days:after {\n    -webkit-transform: scaleY(0.33);\n    transform: scaleY(0.33);\n  }\n}\n.picker-calendar-week-days .picker-calendar-week-day {\n  -ms-flex: 0 1 auto;\n  -webkit-flex-shrink: 1;\n  -ms-flex-negative: 1;\n  flex-shrink: 1;\n  width: 14.28571429%;\n  width: calc(14.28571429%);\n  line-height: 17px;\n  text-align: center;\n}\n.picker-calendar-week-days + .picker-calendar-months {\n  height: 11.9rem;\n}\n.picker-calendar-months {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  position: relative;\n}\n.picker-calendar-months-wrapper {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  -webkit-transition: 300ms;\n  transition: 300ms;\n}\n.picker-calendar-month {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -ms-flex-direction: column;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n.picker-calendar-row {\n  height: 16.66666667%;\n  height: calc(16.66666667%);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -ms-flex: 0 1 auto;\n  -webkit-flex-shrink: 1;\n  -ms-flex-negative: 1;\n  flex-shrink: 1;\n  width: 100%;\n  position: relative;\n}\n.picker-calendar-row:after {\n  content: '';\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  right: auto;\n  top: auto;\n  height: 1px;\n  width: 100%;\n  background-color: #ccc;\n  display: block;\n  z-index: 15;\n  -webkit-transform-origin: 50% 100%;\n  transform-origin: 50% 100%;\n}\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n  .picker-calendar-row:after {\n    -webkit-transform: scaleY(0.5);\n    transform: scaleY(0.5);\n  }\n}\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n  .picker-calendar-row:after {\n    -webkit-transform: scaleY(0.33);\n    transform: scaleY(0.33);\n  }\n}\n.weui-picker-modal .picker-calendar-row:last-child:after {\n  display: none;\n}\n.picker-calendar-day {\n  -ms-flex: 0 1 auto;\n  -webkit-flex-shrink: 1;\n  -ms-flex-negative: 1;\n  flex-shrink: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  -webkit-align-items: center;\n  align-items: center;\n  box-sizing: border-box;\n  width: 14.28571429%;\n  width: calc(14.28571429%);\n  text-align: center;\n  color: #3d4145;\n  font-size: 15px;\n  cursor: pointer;\n}\n.picker-calendar-day.picker-calendar-day-prev,\n.picker-calendar-day.picker-calendar-day-next {\n  color: #ccc;\n}\n.picker-calendar-day.picker-calendar-day-disabled {\n  color: #d4d4d4;\n  cursor: auto;\n}\n.picker-calendar-day.picker-calendar-day-today span {\n  background: #e3e3e3;\n}\n.picker-calendar-day.picker-calendar-day-selected span {\n  background: #04BE02;\n  color: #fff;\n}\n.picker-calendar-day span {\n  display: inline-block;\n  border-radius: 100%;\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n}\n.picker-calendar-month-picker,\n.picker-calendar-year-picker {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  -webkit-align-items: center;\n  align-items: center;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  -webkit-justify-content: space-between;\n  justify-content: space-between;\n  width: 50%;\n  max-width: 200px;\n  -ms-flex: 0 10 auto;\n  -webkit-flex-shrink: 10;\n  -ms-flex-negative: 10;\n  flex-shrink: 10;\n}\n.picker-calendar-month-picker a.icon-only,\n.picker-calendar-year-picker a.icon-only {\n  min-width: 36px;\n}\n.picker-calendar-month-picker span,\n.picker-calendar-year-picker span {\n  -ms-flex: 0 1 auto;\n  -webkit-flex-shrink: 1;\n  -ms-flex-negative: 1;\n  flex-shrink: 1;\n  position: relative;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.popover .picker-calendar .picker-calendar-week-days,\n.picker-calendar.picker-modal-inline .picker-calendar-week-days {\n  background: none;\n}\n.popover .picker-calendar .toolbar:before,\n.picker-calendar.picker-modal-inline .toolbar:before,\n.popover .picker-calendar .picker-calendar-week-days:before,\n.picker-calendar.picker-modal-inline .picker-calendar-week-days:before {\n  display: none;\n}\n.popover .picker-calendar .toolbar:after,\n.picker-calendar.picker-modal-inline .toolbar:after,\n.popover .picker-calendar .picker-calendar-week-days:after,\n.picker-calendar.picker-modal-inline .picker-calendar-week-days:after {\n  display: none;\n}\n.popover .picker-calendar .toolbar ~ .picker-modal-inner .picker-calendar-months:before,\n.picker-calendar.picker-modal-inline .toolbar ~ .picker-modal-inner .picker-calendar-months:before,\n.popover .picker-calendar .picker-calendar-week-days ~ .picker-calendar-months:before,\n.picker-calendar.picker-modal-inline .picker-calendar-week-days ~ .picker-calendar-months:before {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: auto;\n  right: auto;\n  height: 1px;\n  width: 100%;\n  background-color: #c4c4c4;\n  display: block;\n  z-index: 15;\n  -webkit-transform-origin: 50% 0%;\n  transform-origin: 50% 0%;\n}\n@media only screen and (-webkit-min-device-pixel-ratio: 2) {\n  .popover .picker-calendar .toolbar ~ .picker-modal-inner .picker-calendar-months:before,\n  .picker-calendar.picker-modal-inline .toolbar ~ .picker-modal-inner .picker-calendar-months:before,\n  .popover .picker-calendar .picker-calendar-week-days ~ .picker-calendar-months:before,\n  .picker-calendar.picker-modal-inline .picker-calendar-week-days ~ .picker-calendar-months:before {\n    -webkit-transform: scaleY(0.5);\n    transform: scaleY(0.5);\n  }\n}\n@media only screen and (-webkit-min-device-pixel-ratio: 3) {\n  .popover .picker-calendar .toolbar ~ .picker-modal-inner .picker-calendar-months:before,\n  .picker-calendar.picker-modal-inline .toolbar ~ .picker-modal-inner .picker-calendar-months:before,\n  .popover .picker-calendar .picker-calendar-week-days ~ .picker-calendar-months:before,\n  .picker-calendar.picker-modal-inline .picker-calendar-week-days ~ .picker-calendar-months:before {\n    -webkit-transform: scaleY(0.33);\n    transform: scaleY(0.33);\n  }\n}\n.picker-calendar-month-picker,\n.picker-calendar-year-picker {\n  display: block;\n  line-height: 2.2rem;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n}\n.picker-calendar-month-picker a.icon-only,\n.picker-calendar-year-picker a.icon-only {\n  float: left;\n  width: 25%;\n  height: 2.2rem;\n  line-height: 2rem;\n}\n.picker-calendar-month-picker .current-month-value,\n.picker-calendar-year-picker .current-month-value,\n.picker-calendar-month-picker .current-year-value,\n.picker-calendar-year-picker .current-year-value {\n  float: left;\n  width: 50%;\n  height: 2.2rem;\n}\ni.icon {\n  display: inline-block;\n  vertical-align: middle;\n  background-size: 100% auto;\n  background-position: center;\n  background-repeat: no-repeat;\n  font-style: normal;\n  position: relative;\n}\ni.icon.icon-next,\ni.icon.icon-prev {\n  width: 0.75rem;\n  height: 0.75rem;\n}\ni.icon.icon-next {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2015%2015'%3E%3Cg%3E%3Cpath%20fill%3D'%2304BE02'%20d%3D'M1%2C1.6l11.8%2C5.8L1%2C13.4V1.6%20M0%2C0v15l15-7.6L0%2C0L0%2C0z'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n}\ni.icon.icon-prev {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2015%2015'%3E%3Cg%3E%3Cpath%20fill%3D'%2304BE02'%20d%3D'M14%2C1.6v11.8L2.2%2C7.6L14%2C1.6%20M15%2C0L0%2C7.6L15%2C15V0L15%2C0z'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n}\n/**\n * Swiper 3.3.1\n * Most modern mobile touch slider and framework with hardware accelerated transitions\n * \n * http://www.idangero.us/swiper/\n * \n * Copyright 2016, Vladimir Kharlampidi\n * The iDangero.us\n * http://www.idangero.us/\n * \n * Licensed under MIT\n * \n * Released on: February 7, 2016\n */\n.swiper-container {\n  margin: 0 auto;\n  position: relative;\n  overflow: hidden;\n  /* Fix of Webkit flickering */\n  z-index: 1;\n}\n.swiper-container-no-flexbox .swiper-slide {\n  float: left;\n}\n.swiper-container-vertical > .swiper-wrapper {\n  -webkit-box-orient: vertical;\n  -ms-flex-direction: column;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n}\n.swiper-wrapper {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  z-index: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-transition-property: -webkit-transform;\n  transition-property: -webkit-transform;\n  transition-property: transform;\n  transition-property: transform, -webkit-transform;\n  box-sizing: content-box;\n}\n.swiper-container-android .swiper-slide,\n.swiper-wrapper {\n  -webkit-transform: translate3d(0px, 0, 0);\n  transform: translate3d(0px, 0, 0);\n}\n.swiper-container-multirow > .swiper-wrapper {\n  -webkit-box-lines: multiple;\n  -moz-box-lines: multiple;\n  -ms-flex-wrap: wrap;\n  -webkit-flex-wrap: wrap;\n  flex-wrap: wrap;\n}\n.swiper-container-free-mode > .swiper-wrapper {\n  -webkit-transition-timing-function: ease-out;\n  transition-timing-function: ease-out;\n  margin: 0 auto;\n}\n.swiper-slide {\n  -ms-flex: 0 0 auto;\n  -webkit-flex-shrink: 0;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  width: 100%;\n  height: 100%;\n  position: relative;\n}\n/* Auto Height */\n.swiper-container-autoheight,\n.swiper-container-autoheight .swiper-slide {\n  height: auto;\n}\n.swiper-container-autoheight .swiper-wrapper {\n  -webkit-box-align: start;\n  -ms-flex-align: start;\n  -webkit-align-items: flex-start;\n  align-items: flex-start;\n  -webkit-transition-property: -webkit-transform, height;\n  -webkit-transition-property: height, -webkit-transform;\n  transition-property: height, -webkit-transform;\n  transition-property: transform, height;\n  transition-property: transform, height, -webkit-transform;\n}\n/* a11y */\n.swiper-container .swiper-notification {\n  position: absolute;\n  left: 0;\n  top: 0;\n  pointer-events: none;\n  opacity: 0;\n  z-index: -1000;\n}\n/* IE10 Windows Phone 8 Fixes */\n.swiper-wp8-horizontal {\n  -ms-touch-action: pan-y;\n  touch-action: pan-y;\n}\n.swiper-wp8-vertical {\n  -ms-touch-action: pan-x;\n  touch-action: pan-x;\n}\n/* Arrows */\n.swiper-button-prev,\n.swiper-button-next {\n  position: absolute;\n  top: 50%;\n  width: 27px;\n  height: 44px;\n  margin-top: -22px;\n  z-index: 10;\n  cursor: pointer;\n  background-size: 27px 44px;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n.swiper-button-prev.swiper-button-disabled,\n.swiper-button-next.swiper-button-disabled {\n  opacity: 0.35;\n  cursor: auto;\n  pointer-events: none;\n}\n.swiper-button-prev,\n.swiper-container-rtl .swiper-button-next {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");\n  left: 10px;\n  right: auto;\n}\n.swiper-button-prev.swiper-button-black,\n.swiper-container-rtl .swiper-button-next.swiper-button-black {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E\");\n}\n.swiper-button-prev.swiper-button-white,\n.swiper-container-rtl .swiper-button-next.swiper-button-white {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E\");\n}\n.swiper-button-next,\n.swiper-container-rtl .swiper-button-prev {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");\n  right: 10px;\n  left: auto;\n}\n.swiper-button-next.swiper-button-black,\n.swiper-container-rtl .swiper-button-prev.swiper-button-black {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E\");\n}\n.swiper-button-next.swiper-button-white,\n.swiper-container-rtl .swiper-button-prev.swiper-button-white {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E\");\n}\n/* Pagination Styles */\n.swiper-pagination {\n  position: absolute;\n  text-align: center;\n  -webkit-transition: 300ms;\n  transition: 300ms;\n  -webkit-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n  z-index: 10;\n}\n.swiper-pagination.swiper-pagination-hidden {\n  opacity: 0;\n}\n/* Common Styles */\n.swiper-pagination-fraction,\n.swiper-pagination-custom,\n.swiper-container-horizontal > .swiper-pagination-bullets {\n  bottom: 10px;\n  left: 0;\n  width: 100%;\n}\n/* Bullets */\n.swiper-pagination-bullet {\n  width: 8px;\n  height: 8px;\n  display: inline-block;\n  border-radius: 100%;\n  background: #000;\n  opacity: 0.2;\n}\nbutton.swiper-pagination-bullet {\n  border: none;\n  margin: 0;\n  padding: 0;\n  box-shadow: none;\n  -moz-appearance: none;\n  -ms-appearance: none;\n  -webkit-appearance: none;\n  appearance: none;\n}\n.swiper-pagination-clickable .swiper-pagination-bullet {\n  cursor: pointer;\n}\n.swiper-pagination-white .swiper-pagination-bullet {\n  background: #fff;\n}\n.swiper-pagination-bullet-active {\n  opacity: 1;\n  background: #04BE02;\n}\n.swiper-pagination-white .swiper-pagination-bullet-active {\n  background: #fff;\n}\n.swiper-pagination-black .swiper-pagination-bullet-active {\n  background: #000;\n}\n.swiper-container-vertical > .swiper-pagination-bullets {\n  right: 10px;\n  top: 50%;\n  -webkit-transform: translate3d(0px, -50%, 0);\n  transform: translate3d(0px, -50%, 0);\n}\n.swiper-container-vertical > .swiper-pagination-bullets .swiper-pagination-bullet {\n  margin: 5px 0;\n  display: block;\n}\n.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {\n  margin: 0 5px;\n}\n/* Progress */\n.swiper-pagination-progress {\n  background: rgba(0, 0, 0, 0.25);\n  position: absolute;\n}\n.swiper-pagination-progress .swiper-pagination-progressbar {\n  background: #007aff;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  -webkit-transform: scale(0);\n  transform: scale(0);\n  -webkit-transform-origin: left top;\n  transform-origin: left top;\n}\n.swiper-container-rtl .swiper-pagination-progress .swiper-pagination-progressbar {\n  -webkit-transform-origin: right top;\n  transform-origin: right top;\n}\n.swiper-container-horizontal > .swiper-pagination-progress {\n  width: 100%;\n  height: 4px;\n  left: 0;\n  top: 0;\n}\n.swiper-container-vertical > .swiper-pagination-progress {\n  width: 4px;\n  height: 100%;\n  left: 0;\n  top: 0;\n}\n.swiper-pagination-progress.swiper-pagination-white {\n  background: rgba(255, 255, 255, 0.5);\n}\n.swiper-pagination-progress.swiper-pagination-white .swiper-pagination-progressbar {\n  background: #fff;\n}\n.swiper-pagination-progress.swiper-pagination-black .swiper-pagination-progressbar {\n  background: #000;\n}\n/* 3D Container */\n.swiper-container-3d {\n  -webkit-perspective: 1200px;\n  -o-perspective: 1200px;\n  perspective: 1200px;\n}\n.swiper-container-3d .swiper-wrapper,\n.swiper-container-3d .swiper-slide,\n.swiper-container-3d .swiper-slide-shadow-left,\n.swiper-container-3d .swiper-slide-shadow-right,\n.swiper-container-3d .swiper-slide-shadow-top,\n.swiper-container-3d .swiper-slide-shadow-bottom,\n.swiper-container-3d .swiper-cube-shadow {\n  -webkit-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n}\n.swiper-container-3d .swiper-slide-shadow-left,\n.swiper-container-3d .swiper-slide-shadow-right,\n.swiper-container-3d .swiper-slide-shadow-top,\n.swiper-container-3d .swiper-slide-shadow-bottom {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  z-index: 10;\n}\n.swiper-container-3d .swiper-slide-shadow-left {\n  background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));\n  /* Safari 4+, Chrome */\n  background-image: -webkit-linear-gradient(right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Chrome 10+, Safari 5.1+, iOS 5+ */\n  /* Firefox 3.6-15 */\n  /* Opera 11.10-12.00 */\n  background-image: linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Firefox 16+, IE10, Opera 12.50+ */\n}\n.swiper-container-3d .swiper-slide-shadow-right {\n  background-image: -webkit-gradient(linear, right top, left top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));\n  /* Safari 4+, Chrome */\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Chrome 10+, Safari 5.1+, iOS 5+ */\n  /* Firefox 3.6-15 */\n  /* Opera 11.10-12.00 */\n  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Firefox 16+, IE10, Opera 12.50+ */\n}\n.swiper-container-3d .swiper-slide-shadow-top {\n  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));\n  /* Safari 4+, Chrome */\n  background-image: -webkit-linear-gradient(bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Chrome 10+, Safari 5.1+, iOS 5+ */\n  /* Firefox 3.6-15 */\n  /* Opera 11.10-12.00 */\n  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Firefox 16+, IE10, Opera 12.50+ */\n}\n.swiper-container-3d .swiper-slide-shadow-bottom {\n  background-image: -webkit-gradient(linear, left bottom, left top, from(rgba(0, 0, 0, 0.5)), to(rgba(0, 0, 0, 0)));\n  /* Safari 4+, Chrome */\n  background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Chrome 10+, Safari 5.1+, iOS 5+ */\n  /* Firefox 3.6-15 */\n  /* Opera 11.10-12.00 */\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));\n  /* Firefox 16+, IE10, Opera 12.50+ */\n}\n/* Coverflow */\n.swiper-container-coverflow .swiper-wrapper,\n.swiper-container-flip .swiper-wrapper {\n  /* Windows 8 IE 10 fix */\n  -ms-perspective: 1200px;\n}\n/* Cube + Flip */\n.swiper-container-cube,\n.swiper-container-flip {\n  overflow: visible;\n}\n.swiper-container-cube .swiper-slide,\n.swiper-container-flip .swiper-slide {\n  pointer-events: none;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  z-index: 1;\n}\n.swiper-container-cube .swiper-slide .swiper-slide,\n.swiper-container-flip .swiper-slide .swiper-slide {\n  pointer-events: none;\n}\n.swiper-container-cube .swiper-slide-active,\n.swiper-container-flip .swiper-slide-active,\n.swiper-container-cube .swiper-slide-active .swiper-slide-active,\n.swiper-container-flip .swiper-slide-active .swiper-slide-active {\n  pointer-events: auto;\n}\n.swiper-container-cube .swiper-slide-shadow-top,\n.swiper-container-flip .swiper-slide-shadow-top,\n.swiper-container-cube .swiper-slide-shadow-bottom,\n.swiper-container-flip .swiper-slide-shadow-bottom,\n.swiper-container-cube .swiper-slide-shadow-left,\n.swiper-container-flip .swiper-slide-shadow-left,\n.swiper-container-cube .swiper-slide-shadow-right,\n.swiper-container-flip .swiper-slide-shadow-right {\n  z-index: 0;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n}\n/* Cube */\n.swiper-container-cube .swiper-slide {\n  visibility: hidden;\n  -webkit-transform-origin: 0 0;\n  transform-origin: 0 0;\n  width: 100%;\n  height: 100%;\n}\n.swiper-container-cube.swiper-container-rtl .swiper-slide {\n  -webkit-transform-origin: 100% 0;\n  transform-origin: 100% 0;\n}\n.swiper-container-cube .swiper-slide-active,\n.swiper-container-cube .swiper-slide-next,\n.swiper-container-cube .swiper-slide-prev,\n.swiper-container-cube .swiper-slide-next + .swiper-slide {\n  pointer-events: auto;\n  visibility: visible;\n}\n.swiper-container-cube .swiper-cube-shadow {\n  position: absolute;\n  left: 0;\n  bottom: 0px;\n  width: 100%;\n  height: 100%;\n  background: #000;\n  opacity: 0.6;\n  -webkit-filter: blur(50px);\n  filter: blur(50px);\n  z-index: 0;\n}\n/* Fade */\n.swiper-container-fade.swiper-container-free-mode .swiper-slide {\n  -webkit-transition-timing-function: ease-out;\n  transition-timing-function: ease-out;\n}\n.swiper-container-fade .swiper-slide {\n  pointer-events: none;\n  -webkit-transition-property: opacity;\n  transition-property: opacity;\n}\n.swiper-container-fade .swiper-slide .swiper-slide {\n  pointer-events: none;\n}\n.swiper-container-fade .swiper-slide-active,\n.swiper-container-fade .swiper-slide-active .swiper-slide-active {\n  pointer-events: auto;\n}\n/* Scrollbar */\n.swiper-scrollbar {\n  border-radius: 10px;\n  position: relative;\n  -ms-touch-action: none;\n  background: rgba(0, 0, 0, 0.1);\n}\n.swiper-container-horizontal > .swiper-scrollbar {\n  position: absolute;\n  left: 1%;\n  bottom: 3px;\n  z-index: 50;\n  height: 5px;\n  width: 98%;\n}\n.swiper-container-vertical > .swiper-scrollbar {\n  position: absolute;\n  right: 3px;\n  top: 1%;\n  z-index: 50;\n  width: 5px;\n  height: 98%;\n}\n.swiper-scrollbar-drag {\n  height: 100%;\n  width: 100%;\n  position: relative;\n  background: rgba(0, 0, 0, 0.5);\n  border-radius: 10px;\n  left: 0;\n  top: 0;\n}\n.swiper-scrollbar-cursor-drag {\n  cursor: move;\n}\n/* Preloader */\n.swiper-lazy-preloader {\n  width: 42px;\n  height: 42px;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  margin-left: -21px;\n  margin-top: -21px;\n  z-index: 10;\n  -webkit-transform-origin: 50%;\n  transform-origin: 50%;\n  -webkit-animation: swiper-preloader-spin 1s steps(12, end) infinite;\n  animation: swiper-preloader-spin 1s steps(12, end) infinite;\n}\n.swiper-lazy-preloader:after {\n  display: block;\n  content: \"\";\n  width: 100%;\n  height: 100%;\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n  background-position: 50%;\n  background-size: 100%;\n  background-repeat: no-repeat;\n}\n.swiper-lazy-preloader-white:after {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%23fff'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");\n}\n@-webkit-keyframes swiper-preloader-spin {\n  100% {\n    -webkit-transform: rotate(360deg);\n  }\n}\n@keyframes swiper-preloader-spin {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n.weui-actionsheet {\n  z-index: 10000;\n}\n.weui-actionsheet .weui-actionsheet__title {\n  padding: 8px 0;\n  text-align: center;\n  font-size: 16px;\n  color: #999;\n  background-color: #f4f4f4;\n  position: relative;\n}\n.weui-actionsheet .weui-actionsheet__title:after {\n  content: \" \";\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  height: 1px;\n  border-top: 1px solid #d9d9d9;\n  color: #d9d9d9;\n  -webkit-transform-origin: 0 100%;\n  transform-origin: 0 100%;\n  -webkit-transform: scaleY(0.5);\n  transform: scaleY(0.5);\n}\n.weui-popup__overlay,\n.weui-popup__container {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 10;\n}\n.weui-popup__overlay {\n  background-color: rgba(0, 0, 0, 0.6);\n  opacity: 0;\n  -webkit-transition: opacity .3s;\n  transition: opacity .3s;\n}\n.weui-popup__container {\n  display: none;\n}\n.weui-popup__container.weui-popup__container--visible {\n  display: block;\n}\n.weui-popup__container .weui-cells {\n  margin: 0;\n  text-align: left;\n}\n.weui-popup__modal {\n  width: 100%;\n  position: absolute;\n  z-index: 100;\n  bottom: 0;\n  border-radius: 0;\n  opacity: 0.6;\n  color: #3d4145;\n  -webkit-transition-duration: .3s;\n  transition-duration: .3s;\n  height: 100%;\n  background: #EFEFF4;\n  -webkit-transform: translate3d(0, 100%, 0);\n  transform: translate3d(0, 100%, 0);\n  -webkit-transition-property: opacity, -webkit-transform;\n  transition-property: opacity, -webkit-transform;\n  transition-property: transform, opacity;\n  transition-property: transform, opacity, -webkit-transform;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.popup-bottom .weui-popup__modal {\n  height: auto;\n}\n.weui-popup__modal .toolbar {\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  z-index: 1;\n}\n.weui-popup__modal .modal-content {\n  height: 100%;\n  padding-top: 2.2rem;\n  overflow: auto;\n  box-sizing: border-box;\n}\n.weui-popup__container--visible .weui-popup-overlay {\n  opacity: 1;\n}\n.weui-popup__container--visible .weui-popup__modal {\n  opacity: 1;\n  -webkit-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n}\n.weui-notification {\n  position: fixed;\n  width: 100%;\n  min-height: 3.4rem;\n  top: -2rem;\n  padding-top: 2rem;\n  left: 0;\n  right: 0;\n  z-index: 9999;\n  background-color: rgba(0, 0, 0, 0.85);\n  color: white;\n  font-size: .65rem;\n  -webkit-transform: translate3d(0, -100%, 0);\n  transform: translate3d(0, -100%, 0);\n  -webkit-transition: .4s;\n  transition: .4s;\n}\n.weui-notification.weui-notification--in {\n  -webkit-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n}\n.weui-notification.weui-notification--touching {\n  -webkit-transition-duration: 0s;\n  transition-duration: 0s;\n}\n.weui-notification .weui-notification__inner {\n  padding: .4rem .6rem 1rem .6rem;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: start;\n  -ms-flex-align: start;\n  -webkit-align-items: flex-start;\n  align-items: flex-start;\n}\n.weui-notification .weui-notification__content {\n  width: 100%;\n  margin: 0rem .4rem;\n}\n.weui-notification .weui-notification__title {\n  font-weight: bold;\n}\n.weui-notification .weui-notification__text {\n  line-height: 1;\n}\n.weui-notification .weui-notification__media {\n  height: 1rem;\n  width: 1rem;\n}\n.weui-notification .weui-notification__media img {\n  width: 100%;\n}\n.weui-notification .weui-notification__handle-bar {\n  position: absolute;\n  bottom: .2rem;\n  left: 50%;\n  -webkit-transform: translate3d(-50%, 0, 0);\n  transform: translate3d(-50%, 0, 0);\n  width: 2rem;\n  height: .3rem;\n  border-radius: .15rem;\n  background: white;\n  opacity: .5;\n}\n.weui-photo-browser-modal {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: black;\n  display: none;\n  opacity: 0;\n  -webkit-transition: opacity .3s;\n  transition: opacity .3s;\n}\n.weui-photo-browser-modal.weui-photo-browser-modal-visible {\n  opacity: 1;\n}\n.weui-photo-browser-modal .swiper-container {\n  height: 100%;\n  -webkit-transform: scale(0.2);\n  transform: scale(0.2);\n  -webkit-transition: -webkit-transform 0.5s;\n  transition: -webkit-transform 0.5s;\n  transition: transform .5s;\n  transition: transform 0.5s, -webkit-transform 0.5s;\n}\n.weui-photo-browser-modal .swiper-container .swiper-pagination-bullet {\n  background: white;\n  visibility: hidden;\n}\n.weui-photo-browser-modal .swiper-container.swiper-container-visible {\n  -webkit-transform: scale(1);\n  transform: scale(1);\n}\n.weui-photo-browser-modal .swiper-container.swiper-container-visible .swiper-pagination-bullet {\n  visibility: visible;\n  -webkit-transition-property: visibility;\n  transition-property: visibility;\n  -webkit-transition-delay: .5s;\n  transition-delay: .5s;\n}\n.weui-photo-browser-modal .swiper-container .swiper-pagination {\n  bottom: 10px;\n  left: 0;\n  width: 100%;\n}\n.weui-photo-browser-modal .photo-container {\n  height: 100%;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  overflow: hidden;\n}\n.weui-photo-browser-modal .photo-container img {\n  max-width: 100%;\n  margin-top: -30px;\n}\n.weui-photo-browser-modal .caption {\n  position: absolute;\n  bottom: 40px;\n  left: 0;\n  right: 0;\n  color: white;\n  text-align: center;\n  padding: 0 12px;\n  min-height: 3rem;\n  font-size: 14px;\n  z-index: 10;\n  -webkit-transition: opacity .3s;\n  transition: opacity .3s;\n  -webkit-transition-delay: .5s;\n  transition-delay: .5s;\n  opacity: 0;\n}\n.weui-photo-browser-modal .caption .caption-item {\n  display: none;\n  opacity: 0;\n  -webkit-transition: opacity .15s;\n  transition: opacity .15s;\n}\n.weui-photo-browser-modal .caption .caption-item.active {\n  display: block;\n  opacity: 1;\n}\n.weui-photo-browser-modal .swiper-container-visible .caption {\n  opacity: 1;\n}\n.color-primary {\n  color: #04BE02;\n}\n.color-danger,\n.color-error {\n  color: #f6383a;\n}\n.color-warning {\n  color: #f60;\n}\n.color-success {\n  color: #4cd964;\n}\n.bg-primary,\n.bg-success,\n.bg-danger,\n.bg-error,\n.bg-warning {\n  color: white;\n}\n.bg-primary {\n  background-color: #04BE02;\n}\n.bg-danger,\n.bg-error {\n  background-color: #f6383a;\n}\n.bg-warning {\n  background-color: #f60;\n}\n.bg-success {\n  background-color: #4cd964;\n}\n.weui-toptips {\n  z-index: 100;\n  opacity: 0;\n  -webkit-transition: opacity .3s;\n  transition: opacity .3s;\n}\n.weui-toptips.weui-toptips_visible {\n  opacity: 1;\n}\n.weui-icon_toast {\n  font-size: 55px;\n  color: white;\n  margin-bottom: 6px;\n}\n.weui-toast--forbidden .weui-icon_toast {\n  color: #f6383a;\n}\n.weui-toast--text {\n  min-height: initial;\n  font-size: 18px;\n  padding: 8px 16px;\n  width: auto;\n  top: 40%;\n}\n.weui-toast--text .weui-icon_toast {\n  display: none;\n}\n", ""]);

	// exports


/***/ }),

/***/ 565:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** 
	* jQuery WeUI V1.0.1 
	* By 言川
	* http://lihongxun945.github.io/jquery-weui/
	 */
	/* global $:true */
	/* global WebKitCSSMatrix:true */

	(function($) {
	  "use strict";

	  $.fn.transitionEnd = function(callback) {
	    var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
	      i, dom = this;

	    function fireCallBack(e) {
	      /*jshint validthis:true */
	      if (e.target !== this) return;
	      callback.call(this, e);
	      for (i = 0; i < events.length; i++) {
	        dom.off(events[i], fireCallBack);
	      }
	    }
	    if (callback) {
	      for (i = 0; i < events.length; i++) {
	        dom.on(events[i], fireCallBack);
	      }
	    }
	    return this;
	  };

	  $.support = (function() {
	    var support = {
	      touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch)
	    };
	    return support;
	  })();

	  $.touchEvents = {
	    start: $.support.touch ? 'touchstart' : 'mousedown',
	    move: $.support.touch ? 'touchmove' : 'mousemove',
	    end: $.support.touch ? 'touchend' : 'mouseup'
	  };

	  $.getTouchPosition = function(e) {
	    e = e.originalEvent || e; //jquery wrap the originevent
	    if(e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend') {
	      return {
	        x: e.targetTouches[0].pageX,
	        y: e.targetTouches[0].pageY
	      };
	    } else {
	      return {
	        x: e.pageX,
	        y: e.pageY
	      };
	    }
	  };

	  $.fn.scrollHeight = function() {
	    return this[0].scrollHeight;
	  };

	  $.fn.transform = function(transform) {
	    for (var i = 0; i < this.length; i++) {
	      var elStyle = this[i].style;
	      elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
	    }
	    return this;
	  };
	  $.fn.transition = function(duration) {
	    if (typeof duration !== 'string') {
	      duration = duration + 'ms';
	    }
	    for (var i = 0; i < this.length; i++) {
	      var elStyle = this[i].style;
	      elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
	    }
	    return this;
	  };

	  $.getTranslate = function (el, axis) {
	    var matrix, curTransform, curStyle, transformMatrix;

	    // automatic axis detection
	    if (typeof axis === 'undefined') {
	      axis = 'x';
	    }

	    curStyle = window.getComputedStyle(el, null);
	    if (window.WebKitCSSMatrix) {
	      // Some old versions of Webkit choke when 'none' is passed; pass
	      // empty string instead in this case
	      transformMatrix = new WebKitCSSMatrix(curStyle.webkitTransform === 'none' ? '' : curStyle.webkitTransform);
	    }
	    else {
	      transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
	      matrix = transformMatrix.toString().split(',');
	    }

	    if (axis === 'x') {
	      //Latest Chrome and webkits Fix
	      if (window.WebKitCSSMatrix)
	        curTransform = transformMatrix.m41;
	      //Crazy IE10 Matrix
	      else if (matrix.length === 16)
	        curTransform = parseFloat(matrix[12]);
	      //Normal Browsers
	      else
	        curTransform = parseFloat(matrix[4]);
	    }
	    if (axis === 'y') {
	      //Latest Chrome and webkits Fix
	      if (window.WebKitCSSMatrix)
	        curTransform = transformMatrix.m42;
	      //Crazy IE10 Matrix
	      else if (matrix.length === 16)
	        curTransform = parseFloat(matrix[13]);
	      //Normal Browsers
	      else
	        curTransform = parseFloat(matrix[5]);
	    }

	    return curTransform || 0;
	  };
	  $.requestAnimationFrame = function (callback) {
	    if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);
	    else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
	    else if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame(callback);
	    else {
	      return window.setTimeout(callback, 1000 / 60);
	    }
	  };

	  $.cancelAnimationFrame = function (id) {
	    if (window.cancelAnimationFrame) return window.cancelAnimationFrame(id);
	    else if (window.webkitCancelAnimationFrame) return window.webkitCancelAnimationFrame(id);
	    else if (window.mozCancelAnimationFrame) return window.mozCancelAnimationFrame(id);
	    else {
	      return window.clearTimeout(id);
	    }  
	  };

	  $.fn.join = function(arg) {
	    return this.toArray().join(arg);
	  }
	})($);

	/*===========================
	  Template7 Template engine
	  ===========================*/
	/* global $:true */
	/* jshint unused:false */
	/* jshint forin:false */
	+function ($) {
	  "use strict";
	  $.Template7 = $.t7 = (function () {
	    function isArray(arr) {
	      return Object.prototype.toString.apply(arr) === '[object Array]';
	    }
	    function isObject(obj) {
	      return obj instanceof Object;
	    }
	    function isFunction(func) {
	      return typeof func === 'function';
	    }
	    var cache = {};
	    function helperToSlices(string) {
	      var helperParts = string.replace(/[{}#}]/g, '').split(' ');
	      var slices = [];
	      var shiftIndex, i, j;
	      for (i = 0; i < helperParts.length; i++) {
	        var part = helperParts[i];
	        if (i === 0) slices.push(part);
	        else {
	          if (part.indexOf('"') === 0) {
	            // Plain String
	            if (part.match(/"/g).length === 2) {
	              // One word string
	              slices.push(part);
	            }
	            else {
	              // Find closed Index
	              shiftIndex = 0;
	              for (j = i + 1; j < helperParts.length; j++) {
	                part += ' ' + helperParts[j];
	                if (helperParts[j].indexOf('"') >= 0) {
	                  shiftIndex = j;
	                  slices.push(part);
	                  break;
	                }
	              }
	              if (shiftIndex) i = shiftIndex;
	            }
	          }
	          else {
	            if (part.indexOf('=') > 0) {
	              // Hash
	              var hashParts = part.split('=');
	              var hashName = hashParts[0];
	              var hashContent = hashParts[1];
	              if (hashContent.match(/"/g).length !== 2) {
	                shiftIndex = 0;
	                for (j = i + 1; j < helperParts.length; j++) {
	                  hashContent += ' ' + helperParts[j];
	                  if (helperParts[j].indexOf('"') >= 0) {
	                    shiftIndex = j;
	                    break;
	                  }
	                }
	                if (shiftIndex) i = shiftIndex;
	              }
	              var hash = [hashName, hashContent.replace(/"/g,'')];
	              slices.push(hash);
	            }
	            else {
	              // Plain variable
	              slices.push(part);
	            }
	          }
	        }
	      }
	      return slices;
	    }
	    function stringToBlocks(string) {
	      var blocks = [], i, j, k;
	      if (!string) return [];
	      var _blocks = string.split(/({{[^{^}]*}})/);
	      for (i = 0; i < _blocks.length; i++) {
	        var block = _blocks[i];
	        if (block === '') continue;
	        if (block.indexOf('{{') < 0) {
	          blocks.push({
	            type: 'plain',
	            content: block
	          });
	        }
	        else {
	          if (block.indexOf('{/') >= 0) {
	            continue;
	          }
	          if (block.indexOf('{#') < 0 && block.indexOf(' ') < 0 && block.indexOf('else') < 0) {
	            // Simple variable
	            blocks.push({
	              type: 'variable',
	              contextName: block.replace(/[{}]/g, '')
	            });
	            continue;
	          }
	          // Helpers
	          var helperSlices = helperToSlices(block);
	          var helperName = helperSlices[0];
	          var helperContext = [];
	          var helperHash = {};
	          for (j = 1; j < helperSlices.length; j++) {
	            var slice = helperSlices[j];
	            if (isArray(slice)) {
	              // Hash
	              helperHash[slice[0]] = slice[1] === 'false' ? false : slice[1];
	            }
	            else {
	              helperContext.push(slice);
	            }
	          }

	          if (block.indexOf('{#') >= 0) {
	            // Condition/Helper
	            var helperStartIndex = i;
	            var helperContent = '';
	            var elseContent = '';
	            var toSkip = 0;
	            var shiftIndex;
	            var foundClosed = false, foundElse = false, foundClosedElse = false, depth = 0;
	            for (j = i + 1; j < _blocks.length; j++) {
	              if (_blocks[j].indexOf('{{#') >= 0) {
	                depth ++;
	              }
	              if (_blocks[j].indexOf('{{/') >= 0) {
	                depth --;
	              }
	              if (_blocks[j].indexOf('{{#' + helperName) >= 0) {
	                helperContent += _blocks[j];
	                if (foundElse) elseContent += _blocks[j];
	                toSkip ++;
	              }
	              else if (_blocks[j].indexOf('{{/' + helperName) >= 0) {
	                if (toSkip > 0) {
	                  toSkip--;
	                  helperContent += _blocks[j];
	                  if (foundElse) elseContent += _blocks[j];
	                }
	                else {
	                  shiftIndex = j;
	                  foundClosed = true;
	                  break;
	                }
	              }
	              else if (_blocks[j].indexOf('else') >= 0 && depth === 0) {
	                foundElse = true;
	              }
	              else {
	                if (!foundElse) helperContent += _blocks[j];
	                if (foundElse) elseContent += _blocks[j];
	              }

	            }
	            if (foundClosed) {
	              if (shiftIndex) i = shiftIndex;
	              blocks.push({
	                type: 'helper',
	                helperName: helperName,
	                contextName: helperContext,
	                content: helperContent,
	                inverseContent: elseContent,
	                hash: helperHash
	              });
	            }
	          }
	          else if (block.indexOf(' ') > 0) {
	            blocks.push({
	              type: 'helper',
	              helperName: helperName,
	              contextName: helperContext,
	              hash: helperHash
	            });
	          }
	        }
	      }
	      return blocks;
	    }
	    var Template7 = function (template) {
	      var t = this;
	      t.template = template;

	      function getCompileFn(block, depth) {
	        if (block.content) return compile(block.content, depth);
	        else return function () {return ''; };
	      }
	      function getCompileInverse(block, depth) {
	        if (block.inverseContent) return compile(block.inverseContent, depth);
	        else return function () {return ''; };
	      }
	      function getCompileVar(name, ctx) {
	        var variable, parts, levelsUp = 0, initialCtx = ctx;
	        if (name.indexOf('../') === 0) {
	          levelsUp = name.split('../').length - 1;
	          var newDepth = ctx.split('_')[1] - levelsUp;
	          ctx = 'ctx_' + (newDepth >= 1 ? newDepth : 1);
	          parts = name.split('../')[levelsUp].split('.');
	        }
	        else if (name.indexOf('@global') === 0) {
	          ctx = '$.Template7.global';
	          parts = name.split('@global.')[1].split('.');
	        }
	        else if (name.indexOf('@root') === 0) {
	          ctx = 'ctx_1';
	          parts = name.split('@root.')[1].split('.');
	        }
	        else {
	          parts = name.split('.');
	        }
	        variable = ctx;
	        for (var i = 0; i < parts.length; i++) {
	          var part = parts[i];
	          if (part.indexOf('@') === 0) {
	            if (i > 0) {
	              variable += '[(data && data.' + part.replace('@', '') + ')]';
	            }
	            else {
	              variable = '(data && data.' + name.replace('@', '') + ')';
	            }
	          }
	          else {
	            if (isFinite(part)) {
	              variable += '[' + part + ']';
	            }
	            else {
	              if (part.indexOf('this') === 0) {
	                variable = part.replace('this', ctx);
	              }
	              else {
	                variable += '.' + part;       
	              }
	            }
	          }
	        }

	        return variable;
	      }
	      function getCompiledArguments(contextArray, ctx) {
	        var arr = [];
	        for (var i = 0; i < contextArray.length; i++) {
	          if (contextArray[i].indexOf('"') === 0) arr.push(contextArray[i]);
	          else {
	            arr.push(getCompileVar(contextArray[i], ctx));
	          }
	        }
	        return arr.join(', ');
	      }
	      function compile(template, depth) {
	        depth = depth || 1;
	        template = template || t.template;
	        if (typeof template !== 'string') {
	          throw new Error('Template7: Template must be a string');
	        }
	        var blocks = stringToBlocks(template);
	        if (blocks.length === 0) {
	          return function () { return ''; };
	        }
	        var ctx = 'ctx_' + depth;
	        var resultString = '(function (' + ctx + ', data) {\n';
	        if (depth === 1) {
	          resultString += 'function isArray(arr){return Object.prototype.toString.apply(arr) === \'[object Array]\';}\n';
	          resultString += 'function isFunction(func){return (typeof func === \'function\');}\n';
	          resultString += 'function c(val, ctx) {if (typeof val !== "undefined") {if (isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n';
	        }
	        resultString += 'var r = \'\';\n';
	        var i, j, context;
	        for (i = 0; i < blocks.length; i++) {
	          var block = blocks[i];
	          // Plain block
	          if (block.type === 'plain') {
	            resultString += 'r +=\'' + (block.content).replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/'/g, '\\' + '\'') + '\';';
	            continue;
	          }
	          var variable, compiledArguments;
	          // Variable block
	          if (block.type === 'variable') {
	            variable = getCompileVar(block.contextName, ctx);
	            resultString += 'r += c(' + variable + ', ' + ctx + ');';
	          }
	          // Helpers block
	          if (block.type === 'helper') {
	            if (block.helperName in t.helpers) {
	              compiledArguments = getCompiledArguments(block.contextName, ctx);
	              resultString += 'r += ($.Template7.helpers.' + block.helperName + ').call(' + ctx + ', ' + (compiledArguments && (compiledArguments + ', ')) +'{hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth+1) + ', inverse: ' + getCompileInverse(block, depth+1) + ', root: ctx_1});';
	            }
	            else {
	              if (block.contextName.length > 0) {
	                throw new Error('Template7: Missing helper: "' + block.helperName + '"');
	              }
	              else {
	                variable = getCompileVar(block.helperName, ctx);
	                resultString += 'if (' + variable + ') {';
	                resultString += 'if (isArray(' + variable + ')) {';
	                resultString += 'r += ($.Template7.helpers.each).call(' + ctx + ', ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth+1) + ', inverse: ' + getCompileInverse(block, depth+1) + ', root: ctx_1});';
	                resultString += '}else {';
	                resultString += 'r += ($.Template7.helpers.with).call(' + ctx + ', ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth+1) + ', inverse: ' + getCompileInverse(block, depth+1) + ', root: ctx_1});';
	                resultString += '}}';
	              }
	            }
	          }
	        }
	        resultString += '\nreturn r;})';
	        return eval.call(window, resultString);
	      }
	      t.compile = function (template) {
	        if (!t.compiled) {
	          t.compiled = compile(template);
	        }
	        return t.compiled;
	      };
	    };
	    Template7.prototype = {
	      options: {},
	      helpers: {
	        'if': function (context, options) {
	          if (isFunction(context)) { context = context.call(this); }
	          if (context) {
	            return options.fn(this, options.data);
	          }
	          else {
	            return options.inverse(this, options.data);
	          }
	        },
	        'unless': function (context, options) {
	          if (isFunction(context)) { context = context.call(this); }
	          if (!context) {
	            return options.fn(this, options.data);
	          }
	          else {
	            return options.inverse(this, options.data);
	          }
	        },
	        'each': function (context, options) {
	          var ret = '', i = 0;
	          if (isFunction(context)) { context = context.call(this); }
	          if (isArray(context)) {
	            if (options.hash.reverse) {
	              context = context.reverse();
	            }
	            for (i = 0; i < context.length; i++) {
	              ret += options.fn(context[i], {first: i === 0, last: i === context.length - 1, index: i});
	            }
	            if (options.hash.reverse) {
	              context = context.reverse();
	            }
	          }
	          else {
	            for (var key in context) {
	              i++;
	              ret += options.fn(context[key], {key: key});
	            }
	          }
	          if (i > 0) return ret;
	          else return options.inverse(this);
	        },
	        'with': function (context, options) {
	          if (isFunction(context)) { context = context.call(this); }
	          return options.fn(context);
	        },
	        'join': function (context, options) {
	          if (isFunction(context)) { context = context.call(this); }
	          return context.join(options.hash.delimiter || options.hash.delimeter);
	        },
	        'js': function (expression, options) {
	          var func;
	          if (expression.indexOf('return')>=0) {
	            func = '(function(){'+expression+'})';
	          }
	          else {
	            func = '(function(){return ('+expression+')})';
	          }
	          return eval.call(this, func).call(this);
	        },
	        'js_compare': function (expression, options) {
	          var func;
	          if (expression.indexOf('return')>=0) {
	            func = '(function(){'+expression+'})';
	          }
	          else {
	            func = '(function(){return ('+expression+')})';
	          }
	          var condition = eval.call(this, func).call(this);
	          if (condition) {
	            return options.fn(this, options.data);
	          }
	          else {
	            return options.inverse(this, options.data);   
	          }
	        }
	      }
	    };
	    var t7 = function (template, data) {
	      if (arguments.length === 2) {
	        var instance = new Template7(template);
	        var rendered = instance.compile()(data);
	        instance = null;
	        return (rendered);
	      }
	      else return new Template7(template);
	    };
	    t7.registerHelper = function (name, fn) {
	      Template7.prototype.helpers[name] = fn;
	    };
	    t7.unregisterHelper = function (name) {
	      Template7.prototype.helpers[name] = undefined;  
	      delete Template7.prototype.helpers[name];
	    };

	    t7.compile = function (template, options) {
	      var instance = new Template7(template, options);
	      return instance.compile();
	    };

	    t7.options = Template7.prototype.options;
	    t7.helpers = Template7.prototype.helpers;
	    return t7;
	  })();
	}($);

	/*! Hammer.JS - v2.0.8 - 2016-04-23
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2016 Jorik Tangelder;
	 * Licensed under the MIT license */
	(function(window, document, exportName, undefined) {
	  'use strict';

	var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
	var TEST_ELEMENT = document.createElement('div');

	var TYPE_FUNCTION = 'function';

	var round = Math.round;
	var abs = Math.abs;
	var now = Date.now;

	/**
	 * set a timeout with a given scope
	 * @param {Function} fn
	 * @param {Number} timeout
	 * @param {Object} context
	 * @returns {number}
	 */
	function setTimeoutContext(fn, timeout, context) {
	    return setTimeout(bindFn(fn, context), timeout);
	}

	/**
	 * if the argument is an array, we want to execute the fn on each entry
	 * if it aint an array we don't want to do a thing.
	 * this is used by all the methods that accept a single and array argument.
	 * @param {*|Array} arg
	 * @param {String} fn
	 * @param {Object} [context]
	 * @returns {Boolean}
	 */
	function invokeArrayArg(arg, fn, context) {
	    if (Array.isArray(arg)) {
	        each(arg, context[fn], context);
	        return true;
	    }
	    return false;
	}

	/**
	 * walk objects and arrays
	 * @param {Object} obj
	 * @param {Function} iterator
	 * @param {Object} context
	 */
	function each(obj, iterator, context) {
	    var i;

	    if (!obj) {
	        return;
	    }

	    if (obj.forEach) {
	        obj.forEach(iterator, context);
	    } else if (obj.length !== undefined) {
	        i = 0;
	        while (i < obj.length) {
	            iterator.call(context, obj[i], i, obj);
	            i++;
	        }
	    } else {
	        for (i in obj) {
	            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
	        }
	    }
	}

	/**
	 * wrap a method with a deprecation warning and stack trace
	 * @param {Function} method
	 * @param {String} name
	 * @param {String} message
	 * @returns {Function} A new function wrapping the supplied method.
	 */
	function deprecate(method, name, message) {
	    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
	    return function() {
	        var e = new Error('get-stack-trace');
	        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
	            .replace(/^\s+at\s+/gm, '')
	            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

	        var log = window.console && (window.console.warn || window.console.log);
	        if (log) {
	            log.call(window.console, deprecationMessage, stack);
	        }
	        return method.apply(this, arguments);
	    };
	}

	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} target
	 * @param {...Object} objects_to_assign
	 * @returns {Object} target
	 */
	var assign;
	if (typeof Object.assign !== 'function') {
	    assign = function assign(target) {
	        if (target === undefined || target === null) {
	            throw new TypeError('Cannot convert undefined or null to object');
	        }

	        var output = Object(target);
	        for (var index = 1; index < arguments.length; index++) {
	            var source = arguments[index];
	            if (source !== undefined && source !== null) {
	                for (var nextKey in source) {
	                    if (source.hasOwnProperty(nextKey)) {
	                        output[nextKey] = source[nextKey];
	                    }
	                }
	            }
	        }
	        return output;
	    };
	} else {
	    assign = Object.assign;
	}

	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} dest
	 * @param {Object} src
	 * @param {Boolean} [merge=false]
	 * @returns {Object} dest
	 */
	var extend = deprecate(function extend(dest, src, merge) {
	    var keys = Object.keys(src);
	    var i = 0;
	    while (i < keys.length) {
	        if (!merge || (merge && dest[keys[i]] === undefined)) {
	            dest[keys[i]] = src[keys[i]];
	        }
	        i++;
	    }
	    return dest;
	}, 'extend', 'Use `assign`.');

	/**
	 * merge the values from src in the dest.
	 * means that properties that exist in dest will not be overwritten by src
	 * @param {Object} dest
	 * @param {Object} src
	 * @returns {Object} dest
	 */
	var merge = deprecate(function merge(dest, src) {
	    return extend(dest, src, true);
	}, 'merge', 'Use `assign`.');

	/**
	 * simple class inheritance
	 * @param {Function} child
	 * @param {Function} base
	 * @param {Object} [properties]
	 */
	function inherit(child, base, properties) {
	    var baseP = base.prototype,
	        childP;

	    childP = child.prototype = Object.create(baseP);
	    childP.constructor = child;
	    childP._super = baseP;

	    if (properties) {
	        assign(childP, properties);
	    }
	}

	/**
	 * simple function bind
	 * @param {Function} fn
	 * @param {Object} context
	 * @returns {Function}
	 */
	function bindFn(fn, context) {
	    return function boundFn() {
	        return fn.apply(context, arguments);
	    };
	}

	/**
	 * let a boolean value also be a function that must return a boolean
	 * this first item in args will be used as the context
	 * @param {Boolean|Function} val
	 * @param {Array} [args]
	 * @returns {Boolean}
	 */
	function boolOrFn(val, args) {
	    if (typeof val == TYPE_FUNCTION) {
	        return val.apply(args ? args[0] || undefined : undefined, args);
	    }
	    return val;
	}

	/**
	 * use the val2 when val1 is undefined
	 * @param {*} val1
	 * @param {*} val2
	 * @returns {*}
	 */
	function ifUndefined(val1, val2) {
	    return (val1 === undefined) ? val2 : val1;
	}

	/**
	 * addEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function addEventListeners(target, types, handler) {
	    each(splitStr(types), function(type) {
	        target.addEventListener(type, handler, false);
	    });
	}

	/**
	 * removeEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function removeEventListeners(target, types, handler) {
	    each(splitStr(types), function(type) {
	        target.removeEventListener(type, handler, false);
	    });
	}

	/**
	 * find if a node is in the given parent
	 * @method hasParent
	 * @param {HTMLElement} node
	 * @param {HTMLElement} parent
	 * @return {Boolean} found
	 */
	function hasParent(node, parent) {
	    while (node) {
	        if (node == parent) {
	            return true;
	        }
	        node = node.parentNode;
	    }
	    return false;
	}

	/**
	 * small indexOf wrapper
	 * @param {String} str
	 * @param {String} find
	 * @returns {Boolean} found
	 */
	function inStr(str, find) {
	    return str.indexOf(find) > -1;
	}

	/**
	 * split string on whitespace
	 * @param {String} str
	 * @returns {Array} words
	 */
	function splitStr(str) {
	    return str.trim().split(/\s+/g);
	}

	/**
	 * find if a array contains the object using indexOf or a simple polyFill
	 * @param {Array} src
	 * @param {String} find
	 * @param {String} [findByKey]
	 * @return {Boolean|Number} false when not found, or the index
	 */
	function inArray(src, find, findByKey) {
	    if (src.indexOf && !findByKey) {
	        return src.indexOf(find);
	    } else {
	        var i = 0;
	        while (i < src.length) {
	            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
	                return i;
	            }
	            i++;
	        }
	        return -1;
	    }
	}

	/**
	 * convert array-like objects to real arrays
	 * @param {Object} obj
	 * @returns {Array}
	 */
	function toArray(obj) {
	    return Array.prototype.slice.call(obj, 0);
	}

	/**
	 * unique array with objects based on a key (like 'id') or just by the array's value
	 * @param {Array} src [{id:1},{id:2},{id:1}]
	 * @param {String} [key]
	 * @param {Boolean} [sort=False]
	 * @returns {Array} [{id:1},{id:2}]
	 */
	function uniqueArray(src, key, sort) {
	    var results = [];
	    var values = [];
	    var i = 0;

	    while (i < src.length) {
	        var val = key ? src[i][key] : src[i];
	        if (inArray(values, val) < 0) {
	            results.push(src[i]);
	        }
	        values[i] = val;
	        i++;
	    }

	    if (sort) {
	        if (!key) {
	            results = results.sort();
	        } else {
	            results = results.sort(function sortUniqueArray(a, b) {
	                return a[key] > b[key];
	            });
	        }
	    }

	    return results;
	}

	/**
	 * get the prefixed property
	 * @param {Object} obj
	 * @param {String} property
	 * @returns {String|Undefined} prefixed
	 */
	function prefixed(obj, property) {
	    var prefix, prop;
	    var camelProp = property[0].toUpperCase() + property.slice(1);

	    var i = 0;
	    while (i < VENDOR_PREFIXES.length) {
	        prefix = VENDOR_PREFIXES[i];
	        prop = (prefix) ? prefix + camelProp : property;

	        if (prop in obj) {
	            return prop;
	        }
	        i++;
	    }
	    return undefined;
	}

	/**
	 * get a unique id
	 * @returns {number} uniqueId
	 */
	var _uniqueId = 1;
	function uniqueId() {
	    return _uniqueId++;
	}

	/**
	 * get the window object of an element
	 * @param {HTMLElement} element
	 * @returns {DocumentView|Window}
	 */
	function getWindowForElement(element) {
	    var doc = element.ownerDocument || element;
	    return (doc.defaultView || doc.parentWindow || window);
	}

	var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

	var SUPPORT_TOUCH = ('ontouchstart' in window);
	var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
	var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

	var INPUT_TYPE_TOUCH = 'touch';
	var INPUT_TYPE_PEN = 'pen';
	var INPUT_TYPE_MOUSE = 'mouse';
	var INPUT_TYPE_KINECT = 'kinect';

	var COMPUTE_INTERVAL = 25;

	var INPUT_START = 1;
	var INPUT_MOVE = 2;
	var INPUT_END = 4;
	var INPUT_CANCEL = 8;

	var DIRECTION_NONE = 1;
	var DIRECTION_LEFT = 2;
	var DIRECTION_RIGHT = 4;
	var DIRECTION_UP = 8;
	var DIRECTION_DOWN = 16;

	var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
	var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

	var PROPS_XY = ['x', 'y'];
	var PROPS_CLIENT_XY = ['clientX', 'clientY'];

	/**
	 * create new input type manager
	 * @param {Manager} manager
	 * @param {Function} callback
	 * @returns {Input}
	 * @constructor
	 */
	function Input(manager, callback) {
	    var self = this;
	    this.manager = manager;
	    this.callback = callback;
	    this.element = manager.element;
	    this.target = manager.options.inputTarget;

	    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
	    // so when disabled the input events are completely bypassed.
	    this.domHandler = function(ev) {
	        if (boolOrFn(manager.options.enable, [manager])) {
	            self.handler(ev);
	        }
	    };

	    this.init();

	}

	Input.prototype = {
	    /**
	     * should handle the inputEvent data and trigger the callback
	     * @virtual
	     */
	    handler: function() { },

	    /**
	     * bind the events
	     */
	    init: function() {
	        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    },

	    /**
	     * unbind the events
	     */
	    destroy: function() {
	        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    }
	};

	/**
	 * create new input type manager
	 * called by the Manager constructor
	 * @param {Hammer} manager
	 * @returns {Input}
	 */
	function createInputInstance(manager) {
	    var Type;
	    var inputClass = manager.options.inputClass;

	    if (inputClass) {
	        Type = inputClass;
	    } else if (SUPPORT_POINTER_EVENTS) {
	        Type = PointerEventInput;
	    } else if (SUPPORT_ONLY_TOUCH) {
	        Type = TouchInput;
	    } else if (!SUPPORT_TOUCH) {
	        Type = MouseInput;
	    } else {
	        Type = TouchMouseInput;
	    }
	    return new (Type)(manager, inputHandler);
	}

	/**
	 * handle input events
	 * @param {Manager} manager
	 * @param {String} eventType
	 * @param {Object} input
	 */
	function inputHandler(manager, eventType, input) {
	    var pointersLen = input.pointers.length;
	    var changedPointersLen = input.changedPointers.length;
	    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
	    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

	    input.isFirst = !!isFirst;
	    input.isFinal = !!isFinal;

	    if (isFirst) {
	        manager.session = {};
	    }

	    // source event is the normalized value of the domEvents
	    // like 'touchstart, mouseup, pointerdown'
	    input.eventType = eventType;

	    // compute scale, rotation etc
	    computeInputData(manager, input);

	    // emit secret event
	    manager.emit('hammer.input', input);

	    manager.recognize(input);
	    manager.session.prevInput = input;
	}

	/**
	 * extend the data with some usable properties like scale, rotate, velocity etc
	 * @param {Object} manager
	 * @param {Object} input
	 */
	function computeInputData(manager, input) {
	    var session = manager.session;
	    var pointers = input.pointers;
	    var pointersLength = pointers.length;

	    // store the first input to calculate the distance and direction
	    if (!session.firstInput) {
	        session.firstInput = simpleCloneInputData(input);
	    }

	    // to compute scale and rotation we need to store the multiple touches
	    if (pointersLength > 1 && !session.firstMultiple) {
	        session.firstMultiple = simpleCloneInputData(input);
	    } else if (pointersLength === 1) {
	        session.firstMultiple = false;
	    }

	    var firstInput = session.firstInput;
	    var firstMultiple = session.firstMultiple;
	    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

	    var center = input.center = getCenter(pointers);
	    input.timeStamp = now();
	    input.deltaTime = input.timeStamp - firstInput.timeStamp;

	    input.angle = getAngle(offsetCenter, center);
	    input.distance = getDistance(offsetCenter, center);

	    computeDeltaXY(session, input);
	    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

	    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
	    input.overallVelocityX = overallVelocity.x;
	    input.overallVelocityY = overallVelocity.y;
	    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

	    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

	    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
	        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

	    computeIntervalInputData(session, input);

	    // find the correct target
	    var target = manager.element;
	    if (hasParent(input.srcEvent.target, target)) {
	        target = input.srcEvent.target;
	    }
	    input.target = target;
	}

	function computeDeltaXY(session, input) {
	    var center = input.center;
	    var offset = session.offsetDelta || {};
	    var prevDelta = session.prevDelta || {};
	    var prevInput = session.prevInput || {};

	    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
	        prevDelta = session.prevDelta = {
	            x: prevInput.deltaX || 0,
	            y: prevInput.deltaY || 0
	        };

	        offset = session.offsetDelta = {
	            x: center.x,
	            y: center.y
	        };
	    }

	    input.deltaX = prevDelta.x + (center.x - offset.x);
	    input.deltaY = prevDelta.y + (center.y - offset.y);
	}

	/**
	 * velocity is calculated every x ms
	 * @param {Object} session
	 * @param {Object} input
	 */
	function computeIntervalInputData(session, input) {
	    var last = session.lastInterval || input,
	        deltaTime = input.timeStamp - last.timeStamp,
	        velocity, velocityX, velocityY, direction;

	    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
	        var deltaX = input.deltaX - last.deltaX;
	        var deltaY = input.deltaY - last.deltaY;

	        var v = getVelocity(deltaTime, deltaX, deltaY);
	        velocityX = v.x;
	        velocityY = v.y;
	        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
	        direction = getDirection(deltaX, deltaY);

	        session.lastInterval = input;
	    } else {
	        // use latest velocity info if it doesn't overtake a minimum period
	        velocity = last.velocity;
	        velocityX = last.velocityX;
	        velocityY = last.velocityY;
	        direction = last.direction;
	    }

	    input.velocity = velocity;
	    input.velocityX = velocityX;
	    input.velocityY = velocityY;
	    input.direction = direction;
	}

	/**
	 * create a simple clone from the input used for storage of firstInput and firstMultiple
	 * @param {Object} input
	 * @returns {Object} clonedInputData
	 */
	function simpleCloneInputData(input) {
	    // make a simple copy of the pointers because we will get a reference if we don't
	    // we only need clientXY for the calculations
	    var pointers = [];
	    var i = 0;
	    while (i < input.pointers.length) {
	        pointers[i] = {
	            clientX: round(input.pointers[i].clientX),
	            clientY: round(input.pointers[i].clientY)
	        };
	        i++;
	    }

	    return {
	        timeStamp: now(),
	        pointers: pointers,
	        center: getCenter(pointers),
	        deltaX: input.deltaX,
	        deltaY: input.deltaY
	    };
	}

	/**
	 * get the center of all the pointers
	 * @param {Array} pointers
	 * @return {Object} center contains `x` and `y` properties
	 */
	function getCenter(pointers) {
	    var pointersLength = pointers.length;

	    // no need to loop when only one touch
	    if (pointersLength === 1) {
	        return {
	            x: round(pointers[0].clientX),
	            y: round(pointers[0].clientY)
	        };
	    }

	    var x = 0, y = 0, i = 0;
	    while (i < pointersLength) {
	        x += pointers[i].clientX;
	        y += pointers[i].clientY;
	        i++;
	    }

	    return {
	        x: round(x / pointersLength),
	        y: round(y / pointersLength)
	    };
	}

	/**
	 * calculate the velocity between two points. unit is in px per ms.
	 * @param {Number} deltaTime
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Object} velocity `x` and `y`
	 */
	function getVelocity(deltaTime, x, y) {
	    return {
	        x: x / deltaTime || 0,
	        y: y / deltaTime || 0
	    };
	}

	/**
	 * get the direction between two points
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Number} direction
	 */
	function getDirection(x, y) {
	    if (x === y) {
	        return DIRECTION_NONE;
	    }

	    if (abs(x) >= abs(y)) {
	        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	    }
	    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	}

	/**
	 * calculate the absolute distance between two points
	 * @param {Object} p1 {x, y}
	 * @param {Object} p2 {x, y}
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} distance
	 */
	function getDistance(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];

	    return Math.sqrt((x * x) + (y * y));
	}

	/**
	 * calculate the angle between two coordinates
	 * @param {Object} p1
	 * @param {Object} p2
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} angle
	 */
	function getAngle(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];
	    return Math.atan2(y, x) * 180 / Math.PI;
	}

	/**
	 * calculate the rotation degrees between two pointersets
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} rotation
	 */
	function getRotation(start, end) {
	    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
	}

	/**
	 * calculate the scale factor between two pointersets
	 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} scale
	 */
	function getScale(start, end) {
	    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	}

	var MOUSE_INPUT_MAP = {
	    mousedown: INPUT_START,
	    mousemove: INPUT_MOVE,
	    mouseup: INPUT_END
	};

	var MOUSE_ELEMENT_EVENTS = 'mousedown';
	var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

	/**
	 * Mouse events input
	 * @constructor
	 * @extends Input
	 */
	function MouseInput() {
	    this.evEl = MOUSE_ELEMENT_EVENTS;
	    this.evWin = MOUSE_WINDOW_EVENTS;

	    this.pressed = false; // mousedown state

	    Input.apply(this, arguments);
	}

	inherit(MouseInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function MEhandler(ev) {
	        var eventType = MOUSE_INPUT_MAP[ev.type];

	        // on start we want to have the left mouse button down
	        if (eventType & INPUT_START && ev.button === 0) {
	            this.pressed = true;
	        }

	        if (eventType & INPUT_MOVE && ev.which !== 1) {
	            eventType = INPUT_END;
	        }

	        // mouse must be down
	        if (!this.pressed) {
	            return;
	        }

	        if (eventType & INPUT_END) {
	            this.pressed = false;
	        }

	        this.callback(this.manager, eventType, {
	            pointers: [ev],
	            changedPointers: [ev],
	            pointerType: INPUT_TYPE_MOUSE,
	            srcEvent: ev
	        });
	    }
	});

	var POINTER_INPUT_MAP = {
	    pointerdown: INPUT_START,
	    pointermove: INPUT_MOVE,
	    pointerup: INPUT_END,
	    pointercancel: INPUT_CANCEL,
	    pointerout: INPUT_CANCEL
	};

	// in IE10 the pointer types is defined as an enum
	var IE10_POINTER_TYPE_ENUM = {
	    2: INPUT_TYPE_TOUCH,
	    3: INPUT_TYPE_PEN,
	    4: INPUT_TYPE_MOUSE,
	    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
	};

	var POINTER_ELEMENT_EVENTS = 'pointerdown';
	var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

	// IE10 has prefixed support, and case-sensitive
	if (window.MSPointerEvent && !window.PointerEvent) {
	    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
	    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
	}

	/**
	 * Pointer events input
	 * @constructor
	 * @extends Input
	 */
	function PointerEventInput() {
	    this.evEl = POINTER_ELEMENT_EVENTS;
	    this.evWin = POINTER_WINDOW_EVENTS;

	    Input.apply(this, arguments);

	    this.store = (this.manager.session.pointerEvents = []);
	}

	inherit(PointerEventInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function PEhandler(ev) {
	        var store = this.store;
	        var removePointer = false;

	        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

	        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

	        // get index of the event in the store
	        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

	        // start and mouse must be down
	        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
	            if (storeIndex < 0) {
	                store.push(ev);
	                storeIndex = store.length - 1;
	            }
	        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	            removePointer = true;
	        }

	        // it not found, so the pointer hasn't been down (so it's probably a hover)
	        if (storeIndex < 0) {
	            return;
	        }

	        // update the event in the store
	        store[storeIndex] = ev;

	        this.callback(this.manager, eventType, {
	            pointers: store,
	            changedPointers: [ev],
	            pointerType: pointerType,
	            srcEvent: ev
	        });

	        if (removePointer) {
	            // remove from the store
	            store.splice(storeIndex, 1);
	        }
	    }
	});

	var SINGLE_TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};

	var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
	var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

	/**
	 * Touch events input
	 * @constructor
	 * @extends Input
	 */
	function SingleTouchInput() {
	    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
	    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
	    this.started = false;

	    Input.apply(this, arguments);
	}

	inherit(SingleTouchInput, Input, {
	    handler: function TEhandler(ev) {
	        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

	        // should we handle the touch events?
	        if (type === INPUT_START) {
	            this.started = true;
	        }

	        if (!this.started) {
	            return;
	        }

	        var touches = normalizeSingleTouches.call(this, ev, type);

	        // when done, reset the started state
	        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
	            this.started = false;
	        }

	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});

	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function normalizeSingleTouches(ev, type) {
	    var all = toArray(ev.touches);
	    var changed = toArray(ev.changedTouches);

	    if (type & (INPUT_END | INPUT_CANCEL)) {
	        all = uniqueArray(all.concat(changed), 'identifier', true);
	    }

	    return [all, changed];
	}

	var TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};

	var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

	/**
	 * Multi-user touch events input
	 * @constructor
	 * @extends Input
	 */
	function TouchInput() {
	    this.evTarget = TOUCH_TARGET_EVENTS;
	    this.targetIds = {};

	    Input.apply(this, arguments);
	}

	inherit(TouchInput, Input, {
	    handler: function MTEhandler(ev) {
	        var type = TOUCH_INPUT_MAP[ev.type];
	        var touches = getTouches.call(this, ev, type);
	        if (!touches) {
	            return;
	        }

	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});

	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function getTouches(ev, type) {
	    var allTouches = toArray(ev.touches);
	    var targetIds = this.targetIds;

	    // when there is only one touch, the process can be simplified
	    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	        targetIds[allTouches[0].identifier] = true;
	        return [allTouches, allTouches];
	    }

	    var i,
	        targetTouches,
	        changedTouches = toArray(ev.changedTouches),
	        changedTargetTouches = [],
	        target = this.target;

	    // get target touches from touches
	    targetTouches = allTouches.filter(function(touch) {
	        return hasParent(touch.target, target);
	    });

	    // collect touches
	    if (type === INPUT_START) {
	        i = 0;
	        while (i < targetTouches.length) {
	            targetIds[targetTouches[i].identifier] = true;
	            i++;
	        }
	    }

	    // filter changed touches to only contain touches that exist in the collected target ids
	    i = 0;
	    while (i < changedTouches.length) {
	        if (targetIds[changedTouches[i].identifier]) {
	            changedTargetTouches.push(changedTouches[i]);
	        }

	        // cleanup removed touches
	        if (type & (INPUT_END | INPUT_CANCEL)) {
	            delete targetIds[changedTouches[i].identifier];
	        }
	        i++;
	    }

	    if (!changedTargetTouches.length) {
	        return;
	    }

	    return [
	        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
	        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
	        changedTargetTouches
	    ];
	}

	/**
	 * Combined touch and mouse input
	 *
	 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
	 * This because touch devices also emit mouse events while doing a touch.
	 *
	 * @constructor
	 * @extends Input
	 */

	var DEDUP_TIMEOUT = 2500;
	var DEDUP_DISTANCE = 25;

	function TouchMouseInput() {
	    Input.apply(this, arguments);

	    var handler = bindFn(this.handler, this);
	    this.touch = new TouchInput(this.manager, handler);
	    this.mouse = new MouseInput(this.manager, handler);

	    this.primaryTouch = null;
	    this.lastTouches = [];
	}

	inherit(TouchMouseInput, Input, {
	    /**
	     * handle mouse and touch events
	     * @param {Hammer} manager
	     * @param {String} inputEvent
	     * @param {Object} inputData
	     */
	    handler: function TMEhandler(manager, inputEvent, inputData) {
	        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
	            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

	        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
	            return;
	        }

	        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
	        if (isTouch) {
	            recordTouches.call(this, inputEvent, inputData);
	        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
	            return;
	        }

	        this.callback(manager, inputEvent, inputData);
	    },

	    /**
	     * remove the event listeners
	     */
	    destroy: function destroy() {
	        this.touch.destroy();
	        this.mouse.destroy();
	    }
	});

	function recordTouches(eventType, eventData) {
	    if (eventType & INPUT_START) {
	        this.primaryTouch = eventData.changedPointers[0].identifier;
	        setLastTouch.call(this, eventData);
	    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	        setLastTouch.call(this, eventData);
	    }
	}

	function setLastTouch(eventData) {
	    var touch = eventData.changedPointers[0];

	    if (touch.identifier === this.primaryTouch) {
	        var lastTouch = {x: touch.clientX, y: touch.clientY};
	        this.lastTouches.push(lastTouch);
	        var lts = this.lastTouches;
	        var removeLastTouch = function() {
	            var i = lts.indexOf(lastTouch);
	            if (i > -1) {
	                lts.splice(i, 1);
	            }
	        };
	        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
	    }
	}

	function isSyntheticEvent(eventData) {
	    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
	    for (var i = 0; i < this.lastTouches.length; i++) {
	        var t = this.lastTouches[i];
	        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
	        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
	            return true;
	        }
	    }
	    return false;
	}

	var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
	var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

	// magical touchAction value
	var TOUCH_ACTION_COMPUTE = 'compute';
	var TOUCH_ACTION_AUTO = 'auto';
	var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
	var TOUCH_ACTION_NONE = 'none';
	var TOUCH_ACTION_PAN_X = 'pan-x';
	var TOUCH_ACTION_PAN_Y = 'pan-y';
	var TOUCH_ACTION_MAP = getTouchActionProps();

	/**
	 * Touch Action
	 * sets the touchAction property or uses the js alternative
	 * @param {Manager} manager
	 * @param {String} value
	 * @constructor
	 */
	function TouchAction(manager, value) {
	    this.manager = manager;
	    this.set(value);
	}

	TouchAction.prototype = {
	    /**
	     * set the touchAction value on the element or enable the polyfill
	     * @param {String} value
	     */
	    set: function(value) {
	        // find out the touch-action by the event handlers
	        if (value == TOUCH_ACTION_COMPUTE) {
	            value = this.compute();
	        }

	        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
	            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
	        }
	        this.actions = value.toLowerCase().trim();
	    },

	    /**
	     * just re-set the touchAction value
	     */
	    update: function() {
	        this.set(this.manager.options.touchAction);
	    },

	    /**
	     * compute the value for the touchAction property based on the recognizer's settings
	     * @returns {String} value
	     */
	    compute: function() {
	        var actions = [];
	        each(this.manager.recognizers, function(recognizer) {
	            if (boolOrFn(recognizer.options.enable, [recognizer])) {
	                actions = actions.concat(recognizer.getTouchAction());
	            }
	        });
	        return cleanTouchActions(actions.join(' '));
	    },

	    /**
	     * this method is called on each input cycle and provides the preventing of the browser behavior
	     * @param {Object} input
	     */
	    preventDefaults: function(input) {
	        var srcEvent = input.srcEvent;
	        var direction = input.offsetDirection;

	        // if the touch action did prevented once this session
	        if (this.manager.session.prevented) {
	            srcEvent.preventDefault();
	            return;
	        }

	        var actions = this.actions;
	        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
	        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
	        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

	        if (hasNone) {
	            //do not prevent defaults if this is a tap gesture

	            var isTapPointer = input.pointers.length === 1;
	            var isTapMovement = input.distance < 2;
	            var isTapTouchTime = input.deltaTime < 250;

	            if (isTapPointer && isTapMovement && isTapTouchTime) {
	                return;
	            }
	        }

	        if (hasPanX && hasPanY) {
	            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
	            return;
	        }

	        if (hasNone ||
	            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
	            (hasPanX && direction & DIRECTION_VERTICAL)) {
	            return this.preventSrc(srcEvent);
	        }
	    },

	    /**
	     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
	     * @param {Object} srcEvent
	     */
	    preventSrc: function(srcEvent) {
	        this.manager.session.prevented = true;
	        srcEvent.preventDefault();
	    }
	};

	/**
	 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
	 * @param {String} actions
	 * @returns {*}
	 */
	function cleanTouchActions(actions) {
	    // none
	    if (inStr(actions, TOUCH_ACTION_NONE)) {
	        return TOUCH_ACTION_NONE;
	    }

	    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

	    // if both pan-x and pan-y are set (different recognizers
	    // for different directions, e.g. horizontal pan but vertical swipe?)
	    // we need none (as otherwise with pan-x pan-y combined none of these
	    // recognizers will work, since the browser would handle all panning
	    if (hasPanX && hasPanY) {
	        return TOUCH_ACTION_NONE;
	    }

	    // pan-x OR pan-y
	    if (hasPanX || hasPanY) {
	        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
	    }

	    // manipulation
	    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
	        return TOUCH_ACTION_MANIPULATION;
	    }

	    return TOUCH_ACTION_AUTO;
	}

	function getTouchActionProps() {
	    if (!NATIVE_TOUCH_ACTION) {
	        return false;
	    }
	    var touchMap = {};
	    var cssSupports = window.CSS && window.CSS.supports;
	    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

	        // If css.supports is not supported but there is native touch-action assume it supports
	        // all values. This is the case for IE 10 and 11.
	        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
	    });
	    return touchMap;
	}

	/**
	 * Recognizer flow explained; *
	 * All recognizers have the initial state of POSSIBLE when a input session starts.
	 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
	 * Example session for mouse-input: mousedown -> mousemove -> mouseup
	 *
	 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
	 * which determines with state it should be.
	 *
	 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
	 * POSSIBLE to give it another change on the next cycle.
	 *
	 *               Possible
	 *                  |
	 *            +-----+---------------+
	 *            |                     |
	 *      +-----+-----+               |
	 *      |           |               |
	 *   Failed      Cancelled          |
	 *                          +-------+------+
	 *                          |              |
	 *                      Recognized       Began
	 *                                         |
	 *                                      Changed
	 *                                         |
	 *                                  Ended/Recognized
	 */
	var STATE_POSSIBLE = 1;
	var STATE_BEGAN = 2;
	var STATE_CHANGED = 4;
	var STATE_ENDED = 8;
	var STATE_RECOGNIZED = STATE_ENDED;
	var STATE_CANCELLED = 16;
	var STATE_FAILED = 32;

	/**
	 * Recognizer
	 * Every recognizer needs to extend from this class.
	 * @constructor
	 * @param {Object} options
	 */
	function Recognizer(options) {
	    this.options = assign({}, this.defaults, options || {});

	    this.id = uniqueId();

	    this.manager = null;

	    // default is enable true
	    this.options.enable = ifUndefined(this.options.enable, true);

	    this.state = STATE_POSSIBLE;

	    this.simultaneous = {};
	    this.requireFail = [];
	}

	Recognizer.prototype = {
	    /**
	     * @virtual
	     * @type {Object}
	     */
	    defaults: {},

	    /**
	     * set options
	     * @param {Object} options
	     * @return {Recognizer}
	     */
	    set: function(options) {
	        assign(this.options, options);

	        // also update the touchAction, in case something changed about the directions/enabled state
	        this.manager && this.manager.touchAction.update();
	        return this;
	    },

	    /**
	     * recognize simultaneous with an other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    recognizeWith: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
	            return this;
	        }

	        var simultaneous = this.simultaneous;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (!simultaneous[otherRecognizer.id]) {
	            simultaneous[otherRecognizer.id] = otherRecognizer;
	            otherRecognizer.recognizeWith(this);
	        }
	        return this;
	    },

	    /**
	     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRecognizeWith: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
	            return this;
	        }

	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        delete this.simultaneous[otherRecognizer.id];
	        return this;
	    },

	    /**
	     * recognizer can only run when an other is failing
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    requireFailure: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
	            return this;
	        }

	        var requireFail = this.requireFail;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (inArray(requireFail, otherRecognizer) === -1) {
	            requireFail.push(otherRecognizer);
	            otherRecognizer.requireFailure(this);
	        }
	        return this;
	    },

	    /**
	     * drop the requireFailure link. it does not remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRequireFailure: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
	            return this;
	        }

	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        var index = inArray(this.requireFail, otherRecognizer);
	        if (index > -1) {
	            this.requireFail.splice(index, 1);
	        }
	        return this;
	    },

	    /**
	     * has require failures boolean
	     * @returns {boolean}
	     */
	    hasRequireFailures: function() {
	        return this.requireFail.length > 0;
	    },

	    /**
	     * if the recognizer can recognize simultaneous with an other recognizer
	     * @param {Recognizer} otherRecognizer
	     * @returns {Boolean}
	     */
	    canRecognizeWith: function(otherRecognizer) {
	        return !!this.simultaneous[otherRecognizer.id];
	    },

	    /**
	     * You should use `tryEmit` instead of `emit` directly to check
	     * that all the needed recognizers has failed before emitting.
	     * @param {Object} input
	     */
	    emit: function(input) {
	        var self = this;
	        var state = this.state;

	        function emit(event) {
	            self.manager.emit(event, input);
	        }

	        // 'panstart' and 'panmove'
	        if (state < STATE_ENDED) {
	            emit(self.options.event + stateStr(state));
	        }

	        emit(self.options.event); // simple 'eventName' events

	        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
	            emit(input.additionalEvent);
	        }

	        // panend and pancancel
	        if (state >= STATE_ENDED) {
	            emit(self.options.event + stateStr(state));
	        }
	    },

	    /**
	     * Check that all the require failure recognizers has failed,
	     * if true, it emits a gesture event,
	     * otherwise, setup the state to FAILED.
	     * @param {Object} input
	     */
	    tryEmit: function(input) {
	        if (this.canEmit()) {
	            return this.emit(input);
	        }
	        // it's failing anyway
	        this.state = STATE_FAILED;
	    },

	    /**
	     * can we emit?
	     * @returns {boolean}
	     */
	    canEmit: function() {
	        var i = 0;
	        while (i < this.requireFail.length) {
	            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
	                return false;
	            }
	            i++;
	        }
	        return true;
	    },

	    /**
	     * update the recognizer
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	        // make a new copy of the inputData
	        // so we can change the inputData without messing up the other recognizers
	        var inputDataClone = assign({}, inputData);

	        // is is enabled and allow recognizing?
	        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
	            this.reset();
	            this.state = STATE_FAILED;
	            return;
	        }

	        // reset when we've reached the end
	        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	            this.state = STATE_POSSIBLE;
	        }

	        this.state = this.process(inputDataClone);

	        // the recognizer has recognized a gesture
	        // so trigger an event
	        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	            this.tryEmit(inputDataClone);
	        }
	    },

	    /**
	     * return the state of the recognizer
	     * the actual recognizing happens in this method
	     * @virtual
	     * @param {Object} inputData
	     * @returns {Const} STATE
	     */
	    process: function(inputData) { }, // jshint ignore:line

	    /**
	     * return the preferred touch-action
	     * @virtual
	     * @returns {Array}
	     */
	    getTouchAction: function() { },

	    /**
	     * called when the gesture isn't allowed to recognize
	     * like when another is being recognized or it is disabled
	     * @virtual
	     */
	    reset: function() { }
	};

	/**
	 * get a usable string, used as event postfix
	 * @param {Const} state
	 * @returns {String} state
	 */
	function stateStr(state) {
	    if (state & STATE_CANCELLED) {
	        return 'cancel';
	    } else if (state & STATE_ENDED) {
	        return 'end';
	    } else if (state & STATE_CHANGED) {
	        return 'move';
	    } else if (state & STATE_BEGAN) {
	        return 'start';
	    }
	    return '';
	}

	/**
	 * direction cons to string
	 * @param {Const} direction
	 * @returns {String}
	 */
	function directionStr(direction) {
	    if (direction == DIRECTION_DOWN) {
	        return 'down';
	    } else if (direction == DIRECTION_UP) {
	        return 'up';
	    } else if (direction == DIRECTION_LEFT) {
	        return 'left';
	    } else if (direction == DIRECTION_RIGHT) {
	        return 'right';
	    }
	    return '';
	}

	/**
	 * get a recognizer by name if it is bound to a manager
	 * @param {Recognizer|String} otherRecognizer
	 * @param {Recognizer} recognizer
	 * @returns {Recognizer}
	 */
	function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
	    var manager = recognizer.manager;
	    if (manager) {
	        return manager.get(otherRecognizer);
	    }
	    return otherRecognizer;
	}

	/**
	 * This recognizer is just used as a base for the simple attribute recognizers.
	 * @constructor
	 * @extends Recognizer
	 */
	function AttrRecognizer() {
	    Recognizer.apply(this, arguments);
	}

	inherit(AttrRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof AttrRecognizer
	     */
	    defaults: {
	        /**
	         * @type {Number}
	         * @default 1
	         */
	        pointers: 1
	    },

	    /**
	     * Used to check if it the recognizer receives valid input, like input.distance > 10.
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {Boolean} recognized
	     */
	    attrTest: function(input) {
	        var optionPointers = this.options.pointers;
	        return optionPointers === 0 || input.pointers.length === optionPointers;
	    },

	    /**
	     * Process the input and return the state for the recognizer
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {*} State
	     */
	    process: function(input) {
	        var state = this.state;
	        var eventType = input.eventType;

	        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	        var isValid = this.attrTest(input);

	        // on cancel input and we've recognized before, return STATE_CANCELLED
	        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
	            return state | STATE_CANCELLED;
	        } else if (isRecognized || isValid) {
	            if (eventType & INPUT_END) {
	                return state | STATE_ENDED;
	            } else if (!(state & STATE_BEGAN)) {
	                return STATE_BEGAN;
	            }
	            return state | STATE_CHANGED;
	        }
	        return STATE_FAILED;
	    }
	});

	/**
	 * Pan
	 * Recognized when the pointer is down and moved in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PanRecognizer() {
	    AttrRecognizer.apply(this, arguments);

	    this.pX = null;
	    this.pY = null;
	}

	inherit(PanRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PanRecognizer
	     */
	    defaults: {
	        event: 'pan',
	        threshold: 10,
	        pointers: 1,
	        direction: DIRECTION_ALL
	    },

	    getTouchAction: function() {
	        var direction = this.options.direction;
	        var actions = [];
	        if (direction & DIRECTION_HORIZONTAL) {
	            actions.push(TOUCH_ACTION_PAN_Y);
	        }
	        if (direction & DIRECTION_VERTICAL) {
	            actions.push(TOUCH_ACTION_PAN_X);
	        }
	        return actions;
	    },

	    directionTest: function(input) {
	        var options = this.options;
	        var hasMoved = true;
	        var distance = input.distance;
	        var direction = input.direction;
	        var x = input.deltaX;
	        var y = input.deltaY;

	        // lock to axis?
	        if (!(direction & options.direction)) {
	            if (options.direction & DIRECTION_HORIZONTAL) {
	                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
	                hasMoved = x != this.pX;
	                distance = Math.abs(input.deltaX);
	            } else {
	                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
	                hasMoved = y != this.pY;
	                distance = Math.abs(input.deltaY);
	            }
	        }
	        input.direction = direction;
	        return hasMoved && distance > options.threshold && direction & options.direction;
	    },

	    attrTest: function(input) {
	        return AttrRecognizer.prototype.attrTest.call(this, input) &&
	            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
	    },

	    emit: function(input) {

	        this.pX = input.deltaX;
	        this.pY = input.deltaY;

	        var direction = directionStr(input.direction);

	        if (direction) {
	            input.additionalEvent = this.options.event + direction;
	        }
	        this._super.emit.call(this, input);
	    }
	});

	/**
	 * Pinch
	 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PinchRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}

	inherit(PinchRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'pinch',
	        threshold: 0,
	        pointers: 2
	    },

	    getTouchAction: function() {
	        return [TOUCH_ACTION_NONE];
	    },

	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	    },

	    emit: function(input) {
	        if (input.scale !== 1) {
	            var inOut = input.scale < 1 ? 'in' : 'out';
	            input.additionalEvent = this.options.event + inOut;
	        }
	        this._super.emit.call(this, input);
	    }
	});

	/**
	 * Press
	 * Recognized when the pointer is down for x ms without any movement.
	 * @constructor
	 * @extends Recognizer
	 */
	function PressRecognizer() {
	    Recognizer.apply(this, arguments);

	    this._timer = null;
	    this._input = null;
	}

	inherit(PressRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PressRecognizer
	     */
	    defaults: {
	        event: 'press',
	        pointers: 1,
	        time: 251, // minimal time of the pointer to be pressed
	        threshold: 9 // a minimal movement is ok, but keep it low
	    },

	    getTouchAction: function() {
	        return [TOUCH_ACTION_AUTO];
	    },

	    process: function(input) {
	        var options = this.options;
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTime = input.deltaTime > options.time;

	        this._input = input;

	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
	            this.reset();
	        } else if (input.eventType & INPUT_START) {
	            this.reset();
	            this._timer = setTimeoutContext(function() {
	                this.state = STATE_RECOGNIZED;
	                this.tryEmit();
	            }, options.time, this);
	        } else if (input.eventType & INPUT_END) {
	            return STATE_RECOGNIZED;
	        }
	        return STATE_FAILED;
	    },

	    reset: function() {
	        clearTimeout(this._timer);
	    },

	    emit: function(input) {
	        if (this.state !== STATE_RECOGNIZED) {
	            return;
	        }

	        if (input && (input.eventType & INPUT_END)) {
	            this.manager.emit(this.options.event + 'up', input);
	        } else {
	            this._input.timeStamp = now();
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});

	/**
	 * Rotate
	 * Recognized when two or more pointer are moving in a circular motion.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function RotateRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}

	inherit(RotateRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof RotateRecognizer
	     */
	    defaults: {
	        event: 'rotate',
	        threshold: 0,
	        pointers: 2
	    },

	    getTouchAction: function() {
	        return [TOUCH_ACTION_NONE];
	    },

	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	    }
	});

	/**
	 * Swipe
	 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function SwipeRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}

	inherit(SwipeRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof SwipeRecognizer
	     */
	    defaults: {
	        event: 'swipe',
	        threshold: 10,
	        velocity: 0.3,
	        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
	        pointers: 1
	    },

	    getTouchAction: function() {
	        return PanRecognizer.prototype.getTouchAction.call(this);
	    },

	    attrTest: function(input) {
	        var direction = this.options.direction;
	        var velocity;

	        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
	            velocity = input.overallVelocity;
	        } else if (direction & DIRECTION_HORIZONTAL) {
	            velocity = input.overallVelocityX;
	        } else if (direction & DIRECTION_VERTICAL) {
	            velocity = input.overallVelocityY;
	        }

	        return this._super.attrTest.call(this, input) &&
	            direction & input.offsetDirection &&
	            input.distance > this.options.threshold &&
	            input.maxPointers == this.options.pointers &&
	            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	    },

	    emit: function(input) {
	        var direction = directionStr(input.offsetDirection);
	        if (direction) {
	            this.manager.emit(this.options.event + direction, input);
	        }

	        this.manager.emit(this.options.event, input);
	    }
	});

	/**
	 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
	 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
	 * a single tap.
	 *
	 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
	 * multi-taps being recognized.
	 * @constructor
	 * @extends Recognizer
	 */
	function TapRecognizer() {
	    Recognizer.apply(this, arguments);

	    // previous time and center,
	    // used for tap counting
	    this.pTime = false;
	    this.pCenter = false;

	    this._timer = null;
	    this._input = null;
	    this.count = 0;
	}

	inherit(TapRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'tap',
	        pointers: 1,
	        taps: 1,
	        interval: 300, // max time between the multi-tap taps
	        time: 250, // max time of the pointer to be down (like finger on the screen)
	        threshold: 9, // a minimal movement is ok, but keep it low
	        posThreshold: 10 // a multi-tap can be a bit off the initial position
	    },

	    getTouchAction: function() {
	        return [TOUCH_ACTION_MANIPULATION];
	    },

	    process: function(input) {
	        var options = this.options;

	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTouchTime = input.deltaTime < options.time;

	        this.reset();

	        if ((input.eventType & INPUT_START) && (this.count === 0)) {
	            return this.failTimeout();
	        }

	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (validMovement && validTouchTime && validPointers) {
	            if (input.eventType != INPUT_END) {
	                return this.failTimeout();
	            }

	            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
	            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

	            this.pTime = input.timeStamp;
	            this.pCenter = input.center;

	            if (!validMultiTap || !validInterval) {
	                this.count = 1;
	            } else {
	                this.count += 1;
	            }

	            this._input = input;

	            // if tap count matches we have recognized it,
	            // else it has began recognizing...
	            var tapCount = this.count % options.taps;
	            if (tapCount === 0) {
	                // no failing requirements, immediately trigger the tap event
	                // or wait as long as the multitap interval to trigger
	                if (!this.hasRequireFailures()) {
	                    return STATE_RECOGNIZED;
	                } else {
	                    this._timer = setTimeoutContext(function() {
	                        this.state = STATE_RECOGNIZED;
	                        this.tryEmit();
	                    }, options.interval, this);
	                    return STATE_BEGAN;
	                }
	            }
	        }
	        return STATE_FAILED;
	    },

	    failTimeout: function() {
	        this._timer = setTimeoutContext(function() {
	            this.state = STATE_FAILED;
	        }, this.options.interval, this);
	        return STATE_FAILED;
	    },

	    reset: function() {
	        clearTimeout(this._timer);
	    },

	    emit: function() {
	        if (this.state == STATE_RECOGNIZED) {
	            this._input.tapCount = this.count;
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});

	/**
	 * Simple way to create a manager with a default set of recognizers.
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Hammer(element, options) {
	    options = options || {};
	    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
	    return new Manager(element, options);
	}

	/**
	 * @const {string}
	 */
	Hammer.VERSION = '2.0.8';

	/**
	 * default settings
	 * @namespace
	 */
	Hammer.defaults = {
	    /**
	     * set if DOM events are being triggered.
	     * But this is slower and unused by simple implementations, so disabled by default.
	     * @type {Boolean}
	     * @default false
	     */
	    domEvents: false,

	    /**
	     * The value for the touchAction property/fallback.
	     * When set to `compute` it will magically set the correct value based on the added recognizers.
	     * @type {String}
	     * @default compute
	     */
	    touchAction: TOUCH_ACTION_COMPUTE,

	    /**
	     * @type {Boolean}
	     * @default true
	     */
	    enable: true,

	    /**
	     * EXPERIMENTAL FEATURE -- can be removed/changed
	     * Change the parent input target element.
	     * If Null, then it is being set the to main element.
	     * @type {Null|EventTarget}
	     * @default null
	     */
	    inputTarget: null,

	    /**
	     * force an input class
	     * @type {Null|Function}
	     * @default null
	     */
	    inputClass: null,

	    /**
	     * Default recognizer setup when calling `Hammer()`
	     * When creating a new Manager these will be skipped.
	     * @type {Array}
	     */
	    preset: [
	        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
	        [RotateRecognizer, {enable: false}],
	        [PinchRecognizer, {enable: false}, ['rotate']],
	        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
	        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
	        [TapRecognizer],
	        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
	        [PressRecognizer]
	    ],

	    /**
	     * Some CSS properties can be used to improve the working of Hammer.
	     * Add them to this method and they will be set when creating a new Manager.
	     * @namespace
	     */
	    cssProps: {
	        /**
	         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userSelect: 'none',

	        /**
	         * Disable the Windows Phone grippers when pressing an element.
	         * @type {String}
	         * @default 'none'
	         */
	        touchSelect: 'none',

	        /**
	         * Disables the default callout shown when you touch and hold a touch target.
	         * On iOS, when you touch and hold a touch target such as a link, Safari displays
	         * a callout containing information about the link. This property allows you to disable that callout.
	         * @type {String}
	         * @default 'none'
	         */
	        touchCallout: 'none',

	        /**
	         * Specifies whether zooming is enabled. Used by IE10>
	         * @type {String}
	         * @default 'none'
	         */
	        contentZooming: 'none',

	        /**
	         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userDrag: 'none',

	        /**
	         * Overrides the highlight color shown when the user taps a link or a JavaScript
	         * clickable element in iOS. This property obeys the alpha value, if specified.
	         * @type {String}
	         * @default 'rgba(0,0,0,0)'
	         */
	        tapHighlightColor: 'rgba(0,0,0,0)'
	    }
	};

	var STOP = 1;
	var FORCED_STOP = 2;

	/**
	 * Manager
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Manager(element, options) {
	    this.options = assign({}, Hammer.defaults, options || {});

	    this.options.inputTarget = this.options.inputTarget || element;

	    this.handlers = {};
	    this.session = {};
	    this.recognizers = [];
	    this.oldCssProps = {};

	    this.element = element;
	    this.input = createInputInstance(this);
	    this.touchAction = new TouchAction(this, this.options.touchAction);

	    toggleCssProps(this, true);

	    each(this.options.recognizers, function(item) {
	        var recognizer = this.add(new (item[0])(item[1]));
	        item[2] && recognizer.recognizeWith(item[2]);
	        item[3] && recognizer.requireFailure(item[3]);
	    }, this);
	}

	Manager.prototype = {
	    /**
	     * set options
	     * @param {Object} options
	     * @returns {Manager}
	     */
	    set: function(options) {
	        assign(this.options, options);

	        // Options that need a little more setup
	        if (options.touchAction) {
	            this.touchAction.update();
	        }
	        if (options.inputTarget) {
	            // Clean up existing event listeners and reinitialize
	            this.input.destroy();
	            this.input.target = options.inputTarget;
	            this.input.init();
	        }
	        return this;
	    },

	    /**
	     * stop recognizing for this session.
	     * This session will be discarded, when a new [input]start event is fired.
	     * When forced, the recognizer cycle is stopped immediately.
	     * @param {Boolean} [force]
	     */
	    stop: function(force) {
	        this.session.stopped = force ? FORCED_STOP : STOP;
	    },

	    /**
	     * run the recognizers!
	     * called by the inputHandler function on every movement of the pointers (touches)
	     * it walks through all the recognizers and tries to detect the gesture that is being made
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	        var session = this.session;
	        if (session.stopped) {
	            return;
	        }

	        // run the touch-action polyfill
	        this.touchAction.preventDefaults(inputData);

	        var recognizer;
	        var recognizers = this.recognizers;

	        // this holds the recognizer that is being recognized.
	        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
	        // if no recognizer is detecting a thing, it is set to `null`
	        var curRecognizer = session.curRecognizer;

	        // reset when the last recognizer is recognized
	        // or when we're in a new session
	        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
	            curRecognizer = session.curRecognizer = null;
	        }

	        var i = 0;
	        while (i < recognizers.length) {
	            recognizer = recognizers[i];

	            // find out if we are allowed try to recognize the input for this one.
	            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
	            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
	            //      that is being recognized.
	            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
	            //      this can be setup with the `recognizeWith()` method on the recognizer.
	            if (session.stopped !== FORCED_STOP && ( // 1
	                    !curRecognizer || recognizer == curRecognizer || // 2
	                    recognizer.canRecognizeWith(curRecognizer))) { // 3
	                recognizer.recognize(inputData);
	            } else {
	                recognizer.reset();
	            }

	            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
	            // current active recognizer. but only if we don't already have an active recognizer
	            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	                curRecognizer = session.curRecognizer = recognizer;
	            }
	            i++;
	        }
	    },

	    /**
	     * get a recognizer by its event name.
	     * @param {Recognizer|String} recognizer
	     * @returns {Recognizer|Null}
	     */
	    get: function(recognizer) {
	        if (recognizer instanceof Recognizer) {
	            return recognizer;
	        }

	        var recognizers = this.recognizers;
	        for (var i = 0; i < recognizers.length; i++) {
	            if (recognizers[i].options.event == recognizer) {
	                return recognizers[i];
	            }
	        }
	        return null;
	    },

	    /**
	     * add a recognizer to the manager
	     * existing recognizers with the same event name will be removed
	     * @param {Recognizer} recognizer
	     * @returns {Recognizer|Manager}
	     */
	    add: function(recognizer) {
	        if (invokeArrayArg(recognizer, 'add', this)) {
	            return this;
	        }

	        // remove existing
	        var existing = this.get(recognizer.options.event);
	        if (existing) {
	            this.remove(existing);
	        }

	        this.recognizers.push(recognizer);
	        recognizer.manager = this;

	        this.touchAction.update();
	        return recognizer;
	    },

	    /**
	     * remove a recognizer by name or instance
	     * @param {Recognizer|String} recognizer
	     * @returns {Manager}
	     */
	    remove: function(recognizer) {
	        if (invokeArrayArg(recognizer, 'remove', this)) {
	            return this;
	        }

	        recognizer = this.get(recognizer);

	        // let's make sure this recognizer exists
	        if (recognizer) {
	            var recognizers = this.recognizers;
	            var index = inArray(recognizers, recognizer);

	            if (index !== -1) {
	                recognizers.splice(index, 1);
	                this.touchAction.update();
	            }
	        }

	        return this;
	    },

	    /**
	     * bind event
	     * @param {String} events
	     * @param {Function} handler
	     * @returns {EventEmitter} this
	     */
	    on: function(events, handler) {
	        if (events === undefined) {
	            return;
	        }
	        if (handler === undefined) {
	            return;
	        }

	        var handlers = this.handlers;
	        each(splitStr(events), function(event) {
	            handlers[event] = handlers[event] || [];
	            handlers[event].push(handler);
	        });
	        return this;
	    },

	    /**
	     * unbind event, leave emit blank to remove all handlers
	     * @param {String} events
	     * @param {Function} [handler]
	     * @returns {EventEmitter} this
	     */
	    off: function(events, handler) {
	        if (events === undefined) {
	            return;
	        }

	        var handlers = this.handlers;
	        each(splitStr(events), function(event) {
	            if (!handler) {
	                delete handlers[event];
	            } else {
	                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
	            }
	        });
	        return this;
	    },

	    /**
	     * emit event to the listeners
	     * @param {String} event
	     * @param {Object} data
	     */
	    emit: function(event, data) {
	        // we also want to trigger dom events
	        if (this.options.domEvents) {
	            triggerDomEvent(event, data);
	        }

	        // no handlers, so skip it all
	        var handlers = this.handlers[event] && this.handlers[event].slice();
	        if (!handlers || !handlers.length) {
	            return;
	        }

	        data.type = event;
	        data.preventDefault = function() {
	            data.srcEvent.preventDefault();
	        };

	        var i = 0;
	        while (i < handlers.length) {
	            handlers[i](data);
	            i++;
	        }
	    },

	    /**
	     * destroy the manager and unbinds all events
	     * it doesn't unbind dom events, that is the user own responsibility
	     */
	    destroy: function() {
	        this.element && toggleCssProps(this, false);

	        this.handlers = {};
	        this.session = {};
	        this.input.destroy();
	        this.element = null;
	    }
	};

	/**
	 * add/remove the css properties as defined in manager.options.cssProps
	 * @param {Manager} manager
	 * @param {Boolean} add
	 */
	function toggleCssProps(manager, add) {
	    var element = manager.element;
	    if (!element.style) {
	        return;
	    }
	    var prop;
	    each(manager.options.cssProps, function(value, name) {
	        prop = prefixed(element.style, name);
	        if (add) {
	            manager.oldCssProps[prop] = element.style[prop];
	            element.style[prop] = value;
	        } else {
	            element.style[prop] = manager.oldCssProps[prop] || '';
	        }
	    });
	    if (!add) {
	        manager.oldCssProps = {};
	    }
	}

	/**
	 * trigger dom event
	 * @param {String} event
	 * @param {Object} data
	 */
	function triggerDomEvent(event, data) {
	    var gestureEvent = document.createEvent('Event');
	    gestureEvent.initEvent(event, true, true);
	    gestureEvent.gesture = data;
	    data.target.dispatchEvent(gestureEvent);
	}

	assign(Hammer, {
	    INPUT_START: INPUT_START,
	    INPUT_MOVE: INPUT_MOVE,
	    INPUT_END: INPUT_END,
	    INPUT_CANCEL: INPUT_CANCEL,

	    STATE_POSSIBLE: STATE_POSSIBLE,
	    STATE_BEGAN: STATE_BEGAN,
	    STATE_CHANGED: STATE_CHANGED,
	    STATE_ENDED: STATE_ENDED,
	    STATE_RECOGNIZED: STATE_RECOGNIZED,
	    STATE_CANCELLED: STATE_CANCELLED,
	    STATE_FAILED: STATE_FAILED,

	    DIRECTION_NONE: DIRECTION_NONE,
	    DIRECTION_LEFT: DIRECTION_LEFT,
	    DIRECTION_RIGHT: DIRECTION_RIGHT,
	    DIRECTION_UP: DIRECTION_UP,
	    DIRECTION_DOWN: DIRECTION_DOWN,
	    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
	    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
	    DIRECTION_ALL: DIRECTION_ALL,

	    Manager: Manager,
	    Input: Input,
	    TouchAction: TouchAction,

	    TouchInput: TouchInput,
	    MouseInput: MouseInput,
	    PointerEventInput: PointerEventInput,
	    TouchMouseInput: TouchMouseInput,
	    SingleTouchInput: SingleTouchInput,

	    Recognizer: Recognizer,
	    AttrRecognizer: AttrRecognizer,
	    Tap: TapRecognizer,
	    Pan: PanRecognizer,
	    Swipe: SwipeRecognizer,
	    Pinch: PinchRecognizer,
	    Rotate: RotateRecognizer,
	    Press: PressRecognizer,

	    on: addEventListeners,
	    off: removeEventListeners,
	    each: each,
	    merge: merge,
	    extend: extend,
	    assign: assign,
	    inherit: inherit,
	    bindFn: bindFn,
	    prefixed: prefixed
	});

	// this prevents errors when Hammer is loaded in the presence of an AMD
	//  style loader but by script tag, not by the loader.
	var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
	freeGlobal.Hammer = Hammer;

	if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	        return Hammer;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module != 'undefined' && module.exports) {
	    module.exports = Hammer;
	} else {
	    window[exportName] = Hammer;
	}

	})(window, document, 'Hammer');

	+ function($) {
	  "use strict";

	  var defaults;
	  
	  $.modal = function(params, onOpen) {
	    params = $.extend({}, defaults, params);


	    var buttons = params.buttons;

	    var buttonsHtml = buttons.map(function(d, i) {
	      return '<a href="javascript:;" class="weui-dialog__btn ' + (d.className || "") + '">' + d.text + '</a>';
	    }).join("");

	    var tpl = '<div class="weui-dialog">' +
	                '<div class="weui-dialog__hd"><strong class="weui-dialog__title">' + params.title + '</strong></div>' +
	                ( params.text ? '<div class="weui-dialog__bd">'+params.text+'</div>' : '')+
	                '<div class="weui-dialog__ft">' + buttonsHtml + '</div>' +
	              '</div>';
	    
	    var dialog = $.openModal(tpl, onOpen);

	    dialog.find(".weui-dialog__btn").each(function(i, e) {
	      var el = $(e);
	      el.click(function() {
	        //先关闭对话框，再调用回调函数
	        if(params.autoClose) $.closeModal();

	        if(buttons[i].onClick) {
	          buttons[i].onClick.call(dialog);
	        }
	      });
	    });

	    return dialog;
	  };

	  $.openModal = function(tpl, onOpen) {
	    var mask = $("<div class='weui-mask'></div>").appendTo(document.body);
	    mask.show();

	    var dialog = $(tpl).appendTo(document.body);
	 
	    if (onOpen) {
	      dialog.transitionEnd(function () {
	        onOpen.call(dialog);
	      });
	    }   

	    dialog.show();
	    mask.addClass("weui-mask--visible");
	    dialog.addClass("weui-dialog--visible");


	    return dialog;
	  }

	  $.closeModal = function() {
	    $(".weui-mask--visible").removeClass("weui-mask--visible").transitionEnd(function() {
	      $(this).remove();
	    });
	    $(".weui-dialog--visible").removeClass("weui-dialog--visible").transitionEnd(function() {
	      $(this).remove();
	    });
	  };

	  $.alert = function(text, title, onOK) {
	    var config;
	    if (typeof text === 'object') {
	      config = text;
	    } else {
	      if (typeof title === 'function') {
	        onOK = arguments[1];
	        title = undefined;
	      }

	      config = {
	        text: text,
	        title: title,
	        onOK: onOK
	      }
	    }
	    return $.modal({
	      text: config.text,
	      title: config.title,
	      buttons: [{
	        text: defaults.buttonOK,
	        className: "primary",
	        onClick: config.onOK
	      }]
	    });
	  }

	  $.confirm = function(text, title, onOK, onCancel) {
	    var config;
	    if (typeof text === 'object') {
	      config = text
	    } else {
	      if (typeof title === 'function') {
	        onCancel = arguments[2];
	        onOK = arguments[1];
	        title = undefined;
	      }

	      config = {
	        text: text,
	        title: title,
	        onOK: onOK,
	        onCancel: onCancel
	      }
	    }
	    return $.modal({
	      text: config.text,
	      title: config.title,
	      buttons: [
	      {
	        text: defaults.buttonCancel,
	        className: "default",
	        onClick: config.onCancel
	      },
	      {
	        text: defaults.buttonOK,
	        className: "primary",
	        onClick: config.onOK
	      }]
	    });
	  };

	  //如果参数过多，建议通过 config 对象进行配置，而不是传入多个参数。
	  $.prompt = function(text, title, onOK, onCancel, input) {
	    var config;
	    if (typeof text === 'object') {
	      config = text;
	    } else {
	      if (typeof title === 'function') {
	        input = arguments[3];
	        onCancel = arguments[2];
	        onOK = arguments[1];
	        title = undefined;
	      }
	      config = {
	        text: text,
	        title: title,
	        input: input,
	        onOK: onOK,
	        onCancel: onCancel,
	        empty: false  //allow empty
	      }
	    }

	    var modal = $.modal({
	      text: '<p class="weui-prompt-text">'+(config.text || '')+'</p><input type="text" class="weui-input weui-prompt-input" id="weui-prompt-input" value="' + (config.input || '') + '" />',
	      title: config.title,
	      autoClose: false,
	      buttons: [
	      {
	        text: defaults.buttonCancel,
	        className: "default",
	        onClick: function () {
	          $.closeModal();
	          config.onCancel && config.onCancel.call(modal);
	        }
	      },
	      {
	        text: defaults.buttonOK,
	        className: "primary",
	        onClick: function() {
	          var input = $("#weui-prompt-input").val();
	          if (!config.empty && (input === "" || input === null)) {
	            modal.find('.weui-prompt-input').focus()[0].select();
	            return false;
	          }
	          $.closeModal();
	          config.onOK && config.onOK.call(modal, input);
	        }
	      }]
	    }, function () {
	      this.find('.weui-prompt-input').focus()[0].select();
	    });

	    return modal;
	  };

	  //如果参数过多，建议通过 config 对象进行配置，而不是传入多个参数。
	  $.login = function(text, title, onOK, onCancel, username, password) {
	    var config;
	    if (typeof text === 'object') {
	      config = text;
	    } else {
	      if (typeof title === 'function') {
	        password = arguments[4];
	        username = arguments[3];
	        onCancel = arguments[2];
	        onOK = arguments[1];
	        title = undefined;
	      }
	      config = {
	        text: text,
	        title: title,
	        username: username,
	        password: password,
	        onOK: onOK,
	        onCancel: onCancel
	      }
	    }

	    var modal = $.modal({
	      text: '<p class="weui-prompt-text">'+(config.text || '')+'</p>' +
	            '<input type="text" class="weui-input weui-prompt-input" id="weui-prompt-username" value="' + (config.username || '') + '" placeholder="输入用户名" />' +
	            '<input type="password" class="weui-input weui-prompt-input" id="weui-prompt-password" value="' + (config.password || '') + '" placeholder="输入密码" />',
	      title: config.title,
	      autoClose: false,
	      buttons: [
	      {
	        text: defaults.buttonCancel,
	        className: "default",
	        onClick: function () {
	          $.closeModal();
	          config.onCancel && config.onCancel.call(modal);
	        }
	      }, {
	        text: defaults.buttonOK,
	        className: "primary",
	        onClick: function() {
	          var username = $("#weui-prompt-username").val();
	          var password = $("#weui-prompt-password").val();
	          if (!config.empty && (username === "" || username === null)) {
	            modal.find('#weui-prompt-username').focus()[0].select();
	            return false;
	          }
	          if (!config.empty && (password === "" || password === null)) {
	            modal.find('#weui-prompt-password').focus()[0].select();
	            return false;
	          }
	          $.closeModal();
	          config.onOK && config.onOK.call(modal, username, password);
	        }
	      }]
	    }, function () {
	      this.find('#weui-prompt-username').focus()[0].select();
	    });

	    return modal;
	  };

	  defaults = $.modal.prototype.defaults = {
	    title: "提示",
	    text: undefined,
	    buttonOK: "确定",
	    buttonCancel: "取消",
	    buttons: [{
	      text: "确定",
	      className: "primary"
	    }],
	    autoClose: true //点击按钮自动关闭对话框，如果你不希望点击按钮就关闭对话框，可以把这个设置为false
	  };

	}($);

	+ function($) {
	  "use strict";

	  var defaults;
	  
	  var show = function(html, className) {
	    className = className || "";
	    var mask = $("<div class='weui-mask_transparent'></div>").appendTo(document.body);

	    var tpl = '<div class="weui-toast ' + className + '">' + html + '</div>';
	    var dialog = $(tpl).appendTo(document.body);

	    dialog.show();
	    dialog.addClass("weui-toast--visible");
	  };

	  var hide = function(callback) {
	    $(".weui-mask_transparent").remove();
	    $(".weui-toast--visible").removeClass("weui-toast--visible").transitionEnd(function() {
	      var $this = $(this);
	      $this.remove();
	      callback && callback($this);
	    });
	  }

	  $.toast = function(text, style, callback) {
	    if(typeof style === "function") {
	      callback = style;
	    }
	    var className, iconClassName = 'weui-icon-success-no-circle';
	    var duration = toastDefaults.duration;
	    if(style == "cancel") {
	      className = "weui-toast_cancel";
	      iconClassName = 'weui-icon-cancel'
	    } else if(style == "forbidden") {
	      className = "weui-toast--forbidden";
	      iconClassName = 'weui-icon-warn'
	    } else if(style == "text") {
	      className = "weui-toast--text";
	    } else if(typeof style === typeof 1) {
	      duration = style
	    }
	    show('<i class="' + iconClassName + ' weui-icon_toast"></i><p class="weui-toast_content">' + (text || "已经完成") + '</p>', className);

	    setTimeout(function() {
	      hide(callback);
	    }, duration);
	  }

	  $.showLoading = function(text) {
	    var html = '<div class="weui_loading">';
	    html += '<i class="weui-loading weui-icon_toast"></i>';
	    html += '</div>';
	    html += '<p class="weui-toast_content">' + (text || "数据加载中") + '</p>';
	    show(html, 'weui_loading_toast');
	  }

	  $.hideLoading = function() {
	    hide();
	  }

	  var toastDefaults = $.toast.prototype.defaults = {
	    duration: 2500
	  }

	}($);

	+ function($) {
	  "use strict";

	  var defaults;
	  
	  var show = function(params) {

	    var mask = $("<div class='weui-mask weui-actions_mask'></div>").appendTo(document.body);

	    var actions = params.actions || [];

	    var actionsHtml = actions.map(function(d, i) {
	      return '<div class="weui-actionsheet__cell ' + (d.className || "") + '">' + d.text + '</div>';
	    }).join("");

	    var titleHtml = "";
	    
	    if (params.title) {
	      titleHtml = '<div class="weui-actionsheet__title">' + params.title + '</div>';
	    }

	    var tpl = '<div class="weui-actionsheet " id="weui-actionsheet">'+
	                titleHtml +
	                '<div class="weui-actionsheet__menu">'+
	                actionsHtml +
	                '</div>'+
	                '<div class="weui-actionsheet__action">'+
	                  '<div class="weui-actionsheet__cell weui-actionsheet_cancel">取消</div>'+
	                  '</div>'+
	                '</div>';
	    var dialog = $(tpl).appendTo(document.body);

	    dialog.find(".weui-actionsheet__menu .weui-actionsheet__cell, .weui-actionsheet__action .weui-actionsheet__cell").each(function(i, e) {
	      $(e).click(function() {
	        $.closeActions();
	        params.onClose && params.onClose();
	        if(actions[i] && actions[i].onClick) {
	          actions[i].onClick();
	        }
	      })
	    });

	    mask.show();
	    dialog.show();
	    mask.addClass("weui-mask--visible");
	    dialog.addClass("weui-actionsheet_toggle");
	  };

	  var hide = function() {
	    $(".weui-mask").removeClass("weui-mask--visible").transitionEnd(function() {
	      $(this).remove();
	    });
	    $(".weui-actionsheet").removeClass("weui-actionsheet_toggle").transitionEnd(function() {
	      $(this).remove();
	    });
	  }

	  $.actions = function(params) {
	    params = $.extend({}, defaults, params);
	    show(params);
	  }

	  $.closeActions = function() {
	    hide();
	  }

	  $(document).on("click", ".weui-actions_mask", function() {
	    $.closeActions();
	  });

	  var defaults = $.actions.prototype.defaults = {
	    title: undefined,
	    onClose: undefined,
	    /*actions: [{
	      text: "菜单",
	      className: "color-danger",
	      onClick: function() {
	        console.log(1);
	      }
	    },{
	      text: "菜单2",
	      className: "color-success",
	      onClick: function() {
	        console.log(2);
	      }
	    }]*/
	  }

	}($);

	/* ===============================================================================
	************   Pull to refreh ************
	=============================================================================== */
	/* global $:true */

	+function ($) {
	  "use strict";

	  var PTR = function(el) {
	    this.container = $(el);
	    this.distance = 50;
	    this.attachEvents();
	  }

	  PTR.prototype.touchStart = function(e) {
	    if(this.container.hasClass("refreshing")) return;
	    var p = $.getTouchPosition(e);
	    this.start = p;
	    this.diffX = this.diffY = 0;
	  };

	  PTR.prototype.touchMove= function(e) {
	    if(this.container.hasClass("refreshing")) return;
	    if(!this.start) return false;
	    if(this.container.scrollTop() > 0) return;
	    var p = $.getTouchPosition(e);
	    this.diffX = p.x - this.start.x;
	    this.diffY = p.y - this.start.y;
	    if(this.diffY < 0) return;
	    this.container.addClass("touching");
	    e.preventDefault();
	    e.stopPropagation();
	    this.diffY = Math.pow(this.diffY, 0.8);
	    this.container.css("transform", "translate3d(0, "+this.diffY+"px, 0)");

	    if(this.diffY < this.distance) {
	      this.container.removeClass("pull-up").addClass("pull-down");
	    } else {
	      this.container.removeClass("pull-down").addClass("pull-up");
	    }
	  };
	  PTR.prototype.touchEnd = function() {
	    this.start = false;
	    if(this.diffY <= 0 || this.container.hasClass("refreshing")) return;
	    this.container.removeClass("touching");
	    this.container.removeClass("pull-down pull-up");
	    this.container.css("transform", "");
	    if(Math.abs(this.diffY) <= this.distance) {
	    } else {
	      this.container.addClass("refreshing");
	      this.container.trigger("pull-to-refresh");
	    }
	  };

	  PTR.prototype.attachEvents = function() {
	    var el = this.container;
	    el.addClass("weui-pull-to-refresh");
	    el.on($.touchEvents.start, $.proxy(this.touchStart, this));
	    el.on($.touchEvents.move, $.proxy(this.touchMove, this));
	    el.on($.touchEvents.end, $.proxy(this.touchEnd, this));
	  };

	  var pullToRefresh = function(el) {
	    new PTR(el);
	  };

	  var pullToRefreshDone = function(el) {
	    $(el).removeClass("refreshing");
	  }

	  $.fn.pullToRefresh = function() {
	    return this.each(function() {
	      pullToRefresh(this);
	    });
	  }

	  $.fn.pullToRefreshDone = function() {
	    return this.each(function() {
	      pullToRefreshDone(this);
	    });
	  }

	}($);

	/* ===============================================================================
	************   Infinite ************
	=============================================================================== */
	/* global $:true */
	+function ($) {
	  "use strict";


	  var Infinite = function(el, distance) {
	    this.container = $(el);
	    this.container.data("infinite", this);
	    this.distance = distance || 50;
	    this.attachEvents();
	  }

	  Infinite.prototype.scroll = function() {
	    var container = this.container;
	    var offset = container.scrollHeight() - ($(window).height() + container.scrollTop());
	    if(offset <= this.distance) {
	      container.trigger("infinite");
	    }
	  }

	  Infinite.prototype.attachEvents = function(off) {
	    var el = this.container;
	    var scrollContainer = (el[0].tagName.toUpperCase() === "BODY" ? $(document) : el);
	    scrollContainer[off ? "off" : "on"]("scroll", $.proxy(this.scroll, this));
	  };
	  Infinite.prototype.detachEvents = function(off) {
	    this.attachEvents(true);
	  }

	  var infinite = function(el) {
	    attachEvents(el);
	  }

	  $.fn.infinite = function(distance) {
	    return this.each(function() {
	      new Infinite(this, distance);
	    });
	  }
	  $.fn.destroyInfinite = function() {
	    return this.each(function() {
	      var infinite = $(this).data("infinite");
	      if(infinite && infinite.detachEvents) infinite.detachEvents();
	    });
	  }

	}($);

	/* global $:true */
	+function ($) {
	  "use strict";

	  var ITEM_ON = "weui-bar__item--on";

	  var showTab = function(a) {
	    var $a = $(a);
	    if($a.hasClass(ITEM_ON)) return;
	    var href = $a.attr("href");

	    if(!/^#/.test(href)) return ;

	    $a.parent().find("."+ITEM_ON).removeClass(ITEM_ON);
	    $a.addClass(ITEM_ON);

	    var bd = $a.parents(".weui-tab").find(".weui-tab__bd");

	    bd.find(".weui-tab__bd-item--active").removeClass("weui-tab__bd-item--active");

	    $(href).addClass("weui-tab__bd-item--active");
	  }

	  $.showTab = showTab;

	  $(document).on("click", ".weui-navbar__item, .weui-tabbar__item", function(e) {
	    var $a = $(e.currentTarget);
	    var href = $a.attr("href");
	    if($a.hasClass(ITEM_ON)) return;
	    if(!/^#/.test(href)) return;

	    e.preventDefault();

	    showTab($a);
	  });

	}($);

	/* global $:true */
	+ function($) {
	  "use strict";

	  $(document).on("click touchstart", ".weui-search-bar__label", function(e) {
	    $(e.target).parents(".weui-search-bar").addClass("weui-search-bar_focusing").find('input').focus();
	  }) 
	  /*
	  .on("blur", ".weui-search-bar__input", function(e) {
	    var $input = $(e.target);
	    if(!$input.val()) $input.parents(".weui-search-bar").removeClass("weui-search-bar_focusing");
	  })
	  */
	  .on("click", ".weui-search-bar__cancel-btn", function(e) {
	    var $input = $(e.target).parents(".weui-search-bar").removeClass("weui-search-bar_focusing").find(".weui-search-bar__input").val("").blur();
	  })
	  .on("click", ".weui-icon-clear", function(e) {
	    var $input = $(e.target).parents(".weui-search-bar").find(".weui-search-bar__input").val("").focus();
	  });

	}($);

	/*===========================
	Device/OS Detection
	===========================*/
	/* global $:true */
	;(function ($) {
	    "use strict";
	    var device = {};
	    var ua = navigator.userAgent;

	    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
	    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
	    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
	    var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

	    device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;
	    
	    // Android
	    if (android) {
	        device.os = 'android';
	        device.osVersion = android[2];
	        device.android = true;
	        device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
	    }
	    if (ipad || iphone || ipod) {
	        device.os = 'ios';
	        device.ios = true;
	    }
	    // iOS
	    if (iphone && !ipod) {
	        device.osVersion = iphone[2].replace(/_/g, '.');
	        device.iphone = true;
	    }
	    if (ipad) {
	        device.osVersion = ipad[2].replace(/_/g, '.');
	        device.ipad = true;
	    }
	    if (ipod) {
	        device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
	        device.iphone = true;
	    }
	    // iOS 8+ changed UA
	    if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
	        if (device.osVersion.split('.')[0] === '10') {
	            device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
	        }
	    }

	    // Webview
	    device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);
	        
	    // Minimal UI
	    if (device.os && device.os === 'ios') {
	        var osVersionArr = device.osVersion.split('.');
	        device.minimalUi = !device.webView &&
	                            (ipod || iphone) &&
	                            (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
	                            $('meta[name="viewport"]').length > 0 && $('meta[name="viewport"]').attr('content').indexOf('minimal-ui') >= 0;
	    }

	    // Check for status bar and fullscreen app mode
	    var windowWidth = $(window).width();
	    var windowHeight = $(window).height();
	    device.statusBar = false;
	    if (device.webView && (windowWidth * windowHeight === screen.width * screen.height)) {
	        device.statusBar = true;
	    }
	    else {
	        device.statusBar = false;
	    }

	    // Classes
	    var classNames = [];

	    // Pixel Ratio
	    device.pixelRatio = window.devicePixelRatio || 1;
	    classNames.push('pixel-ratio-' + Math.floor(device.pixelRatio));
	    if (device.pixelRatio >= 2) {
	        classNames.push('retina');
	    }

	    // OS classes
	    if (device.os) {
	        classNames.push(device.os, device.os + '-' + device.osVersion.split('.')[0], device.os + '-' + device.osVersion.replace(/\./g, '-'));
	        if (device.os === 'ios') {
	            var major = parseInt(device.osVersion.split('.')[0], 10);
	            for (var i = major - 1; i >= 6; i--) {
	                classNames.push('ios-gt-' + i);
	            }
	        }
	        
	    }
	    // Status bar classes
	    if (device.statusBar) {
	        classNames.push('with-statusbar-overlay');
	    }
	    else {
	        $('html').removeClass('with-statusbar-overlay');
	    }

	    // Add html classes
	    if (classNames.length > 0) $('html').addClass(classNames.join(' '));

	    $.device = device;
	})($);

	/*======================================================
	************   Picker   ************
	======================================================*/
	/* global $:true */
	/* jshint unused:false */
	/* jshint multistr:true */
	+ function($) {
	  "use strict";
	  var Picker = function (params) {
	      var p = this;
	      var defaults = {
	          updateValuesOnMomentum: false,
	          updateValuesOnTouchmove: true,
	          rotateEffect: false,
	          momentumRatio: 7,
	          freeMode: false,
	          // Common settings
	          scrollToInput: true,
	          inputReadOnly: true,
	          toolbar: true,
	          toolbarCloseText: '完成',
	          title: '请选择',
	          toolbarTemplate: '<div class="toolbar">\
	          <div class="toolbar-inner">\
	          <a href="javascript:;" class="picker-button close-picker">{{closeText}}</a>\
	          <h1 class="title">{{title}}</h1>\
	          </div>\
	          </div>',
	      };
	      params = params || {};
	      for (var def in defaults) {
	          if (typeof params[def] === 'undefined') {
	              params[def] = defaults[def];
	          }
	      }
	      p.params = params;
	      p.cols = [];
	      p.initialized = false;
	      
	      // Inline flag
	      p.inline = p.params.container ? true : false;

	      // 3D Transforms origin bug, only on safari
	      var originBug = $.device.ios || (navigator.userAgent.toLowerCase().indexOf('safari') >= 0 && navigator.userAgent.toLowerCase().indexOf('chrome') < 0) && !$.device.android;

	      // Should be converted to popover
	      function isPopover() {
	          var toPopover = false;
	          if (!p.params.convertToPopover && !p.params.onlyInPopover) return toPopover;
	          if (!p.inline && p.params.input) {
	              if (p.params.onlyInPopover) toPopover = true;
	              else {
	                  if ($.device.ios) {
	                      toPopover = $.device.ipad ? true : false;
	                  }
	                  else {
	                      if ($(window).width() >= 768) toPopover = true;
	                  }
	              }
	          } 
	          return toPopover; 
	      }
	      function inPopover() {
	          if (p.opened && p.container && p.container.length > 0 && p.container.parents('.popover').length > 0) return true;
	          else return false;
	      }

	      // Value
	      p.setValue = function (arrValues, transition) {
	          var valueIndex = 0;
	          for (var i = 0; i < p.cols.length; i++) {
	              if (p.cols[i] && !p.cols[i].divider) {
	                  p.cols[i].setValue(arrValues[valueIndex], transition);
	                  valueIndex++;
	              }
	          }
	      };
	      p.updateValue = function () {
	          var newValue = [];
	          var newDisplayValue = [];
	          for (var i = 0; i < p.cols.length; i++) {
	              if (!p.cols[i].divider) {
	                  newValue.push(p.cols[i].value);
	                  newDisplayValue.push(p.cols[i].displayValue);
	              }
	          }
	          if (newValue.indexOf(undefined) >= 0) {
	              return;
	          }
	          p.value = newValue;
	          p.displayValue = newDisplayValue;
	          if (p.params.onChange) {
	              p.params.onChange(p, p.value, p.displayValue);
	          }
	          if (p.input && p.input.length > 0) {
	              $(p.input).val(p.params.formatValue ? p.params.formatValue(p, p.value, p.displayValue) : p.value.join(' '));
	              $(p.input).trigger('change');
	          }
	      };

	      // Columns Handlers
	      p.initPickerCol = function (colElement, updateItems) {
	          var colContainer = $(colElement);
	          var colIndex = colContainer.index();
	          var col = p.cols[colIndex];
	          if (col.divider) return;
	          col.container = colContainer;
	          col.wrapper = col.container.find('.picker-items-col-wrapper');
	          col.items = col.wrapper.find('.picker-item');
	          
	          var i, j;
	          var wrapperHeight, itemHeight, itemsHeight, minTranslate, maxTranslate;
	          col.replaceValues = function (values, displayValues) {
	              col.destroyEvents();
	              col.values = values;
	              col.displayValues = displayValues;
	              var newItemsHTML = p.columnHTML(col, true);
	              col.wrapper.html(newItemsHTML);
	              col.items = col.wrapper.find('.picker-item');
	              col.calcSize();
	              col.setValue(col.values[0] || '', 0, true);
	              col.initEvents();
	          };
	          col.calcSize = function () {
	              if (!col.values.length) return;
	              if (p.params.rotateEffect) {
	                  col.container.removeClass('picker-items-col-absolute');
	                  if (!col.width) col.container.css({width:''});
	              }
	              var colWidth, colHeight;
	              colWidth = 0;
	              colHeight = col.container[0].offsetHeight;
	              wrapperHeight = col.wrapper[0].offsetHeight;
	              itemHeight = col.items[0].offsetHeight;
	              itemsHeight = itemHeight * col.items.length;
	              minTranslate = colHeight / 2 - itemsHeight + itemHeight / 2;
	              maxTranslate = colHeight / 2 - itemHeight / 2;    
	              if (col.width) {
	                  colWidth = col.width;
	                  if (parseInt(colWidth, 10) === colWidth) colWidth = colWidth + 'px';
	                  col.container.css({width: colWidth});
	              }
	              if (p.params.rotateEffect) {
	                  if (!col.width) {
	                      col.items.each(function () {
	                          var item = $(this);
	                          item.css({width:'auto'});
	                          colWidth = Math.max(colWidth, item[0].offsetWidth);
	                          item.css({width:''});
	                      });
	                      col.container.css({width: (colWidth + 2) + 'px'});
	                  }
	                  col.container.addClass('picker-items-col-absolute');
	              }
	          };
	          col.calcSize();
	          
	          col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)').transition(0);


	          var activeIndex = 0;
	          var animationFrameId;

	          // Set Value Function
	          col.setValue = function (newValue, transition, valueCallbacks) {
	              if (typeof transition === 'undefined') transition = '';
	              var newActiveIndex = col.wrapper.find('.picker-item[data-picker-value="' + newValue + '"]').index();
	              if(typeof newActiveIndex === 'undefined' || newActiveIndex === -1) {
	                  col.value = col.displayValue = newValue;
	                  return;
	              }
	              var newTranslate = -newActiveIndex * itemHeight + maxTranslate;
	              // Update wrapper
	              col.wrapper.transition(transition);
	              col.wrapper.transform('translate3d(0,' + (newTranslate) + 'px,0)');
	                  
	              // Watch items
	              if (p.params.updateValuesOnMomentum && col.activeIndex && col.activeIndex !== newActiveIndex ) {
	                  $.cancelAnimationFrame(animationFrameId);
	                  col.wrapper.transitionEnd(function(){
	                      $.cancelAnimationFrame(animationFrameId);
	                  });
	                  updateDuringScroll();
	              }

	              // Update items
	              col.updateItems(newActiveIndex, newTranslate, transition, valueCallbacks);
	          };

	          col.updateItems = function (activeIndex, translate, transition, valueCallbacks) {
	              if (typeof translate === 'undefined') {
	                  translate = $.getTranslate(col.wrapper[0], 'y');
	              }
	              if(typeof activeIndex === 'undefined') activeIndex = -Math.round((translate - maxTranslate)/itemHeight);
	              if (activeIndex < 0) activeIndex = 0;
	              if (activeIndex >= col.items.length) activeIndex = col.items.length - 1;
	              var previousActiveIndex = col.activeIndex;
	              col.activeIndex = activeIndex;
	              /*
	              col.wrapper.find('.picker-selected, .picker-after-selected, .picker-before-selected').removeClass('picker-selected picker-after-selected picker-before-selected');

	              col.items.transition(transition);
	              var selectedItem = col.items.eq(activeIndex).addClass('picker-selected').transform('');
	              var prevItems = selectedItem.prevAll().addClass('picker-before-selected');
	              var nextItems = selectedItem.nextAll().addClass('picker-after-selected');
	              */
	              //去掉 .picker-after-selected, .picker-before-selected 以提高性能
	              col.wrapper.find('.picker-selected').removeClass('picker-selected');
	              if (p.params.rotateEffect) {
	                col.items.transition(transition);
	              }
	              var selectedItem = col.items.eq(activeIndex).addClass('picker-selected').transform('');

	              if (valueCallbacks || typeof valueCallbacks === 'undefined') {
	                  // Update values
	                  col.value = selectedItem.attr('data-picker-value');
	                  col.displayValue = col.displayValues ? col.displayValues[activeIndex] : col.value;
	                  // On change callback
	                  if (previousActiveIndex !== activeIndex) {
	                      if (col.onChange) {
	                          col.onChange(p, col.value, col.displayValue);
	                      }
	                      p.updateValue();
	                  }
	              }
	                  
	              // Set 3D rotate effect
	              if (!p.params.rotateEffect) {
	                  return;
	              }
	              var percentage = (translate - (Math.floor((translate - maxTranslate)/itemHeight) * itemHeight + maxTranslate)) / itemHeight;
	              
	              col.items.each(function () {
	                  var item = $(this);
	                  var itemOffsetTop = item.index() * itemHeight;
	                  var translateOffset = maxTranslate - translate;
	                  var itemOffset = itemOffsetTop - translateOffset;
	                  var percentage = itemOffset / itemHeight;

	                  var itemsFit = Math.ceil(col.height / itemHeight / 2) + 1;
	                  
	                  var angle = (-18*percentage);
	                  if (angle > 180) angle = 180;
	                  if (angle < -180) angle = -180;
	                  // Far class
	                  if (Math.abs(percentage) > itemsFit) item.addClass('picker-item-far');
	                  else item.removeClass('picker-item-far');
	                  // Set transform
	                  item.transform('translate3d(0, ' + (-translate + maxTranslate) + 'px, ' + (originBug ? -110 : 0) + 'px) rotateX(' + angle + 'deg)');
	              });
	          };

	          function updateDuringScroll() {
	              animationFrameId = $.requestAnimationFrame(function () {
	                  col.updateItems(undefined, undefined, 0);
	                  updateDuringScroll();
	              });
	          }

	          // Update items on init
	          if (updateItems) col.updateItems(0, maxTranslate, 0);

	          var allowItemClick = true;
	          var isTouched, isMoved, touchStartY, touchCurrentY, touchStartTime, touchEndTime, startTranslate, returnTo, currentTranslate, prevTranslate, velocityTranslate, velocityTime;
	          function handleTouchStart (e) {
	              if (isMoved || isTouched) return;
	              e.preventDefault();
	              isTouched = true;
	              var position = $.getTouchPosition(e);
	              touchStartY = touchCurrentY = position.y;
	              touchStartTime = (new Date()).getTime();
	              
	              allowItemClick = true;
	              startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
	          }
	          function handleTouchMove (e) {
	              if (!isTouched) return;
	              e.preventDefault();
	              allowItemClick = false;
	              var position = $.getTouchPosition(e);
	              touchCurrentY = position.y;
	              if (!isMoved) {
	                  // First move
	                  $.cancelAnimationFrame(animationFrameId);
	                  isMoved = true;
	                  startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
	                  col.wrapper.transition(0);
	              }
	              e.preventDefault();

	              var diff = touchCurrentY - touchStartY;
	              currentTranslate = startTranslate + diff;
	              returnTo = undefined;

	              // Normalize translate
	              if (currentTranslate < minTranslate) {
	                  currentTranslate = minTranslate - Math.pow(minTranslate - currentTranslate, 0.8);
	                  returnTo = 'min';
	              }
	              if (currentTranslate > maxTranslate) {
	                  currentTranslate = maxTranslate + Math.pow(currentTranslate - maxTranslate, 0.8);
	                  returnTo = 'max';
	              }
	              // Transform wrapper
	              col.wrapper.transform('translate3d(0,' + currentTranslate + 'px,0)');

	              // Update items
	              col.updateItems(undefined, currentTranslate, 0, p.params.updateValuesOnTouchmove);
	              
	              // Calc velocity
	              velocityTranslate = currentTranslate - prevTranslate || currentTranslate;
	              velocityTime = (new Date()).getTime();
	              prevTranslate = currentTranslate;
	          }
	          function handleTouchEnd (e) {
	              if (!isTouched || !isMoved) {
	                  isTouched = isMoved = false;
	                  return;
	              }
	              isTouched = isMoved = false;
	              col.wrapper.transition('');
	              if (returnTo) {
	                  if (returnTo === 'min') {
	                      col.wrapper.transform('translate3d(0,' + minTranslate + 'px,0)');
	                  }
	                  else col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)');
	              }
	              touchEndTime = new Date().getTime();
	              var velocity, newTranslate;
	              if (touchEndTime - touchStartTime > 300) {
	                  newTranslate = currentTranslate;
	              }
	              else {
	                  velocity = Math.abs(velocityTranslate / (touchEndTime - velocityTime));
	                  newTranslate = currentTranslate + velocityTranslate * p.params.momentumRatio;
	              }

	              newTranslate = Math.max(Math.min(newTranslate, maxTranslate), minTranslate);

	              // Active Index
	              var activeIndex = -Math.floor((newTranslate - maxTranslate)/itemHeight);

	              // Normalize translate
	              if (!p.params.freeMode) newTranslate = -activeIndex * itemHeight + maxTranslate;

	              // Transform wrapper
	              col.wrapper.transform('translate3d(0,' + (parseInt(newTranslate,10)) + 'px,0)');

	              // Update items
	              col.updateItems(activeIndex, newTranslate, '', true);

	              // Watch items
	              if (p.params.updateValuesOnMomentum) {
	                  updateDuringScroll();
	                  col.wrapper.transitionEnd(function(){
	                      $.cancelAnimationFrame(animationFrameId);
	                  });
	              }

	              // Allow click
	              setTimeout(function () {
	                  allowItemClick = true;
	              }, 100);
	          }

	          function handleClick(e) {
	              if (!allowItemClick) return;
	              $.cancelAnimationFrame(animationFrameId);
	              /*jshint validthis:true */
	              var value = $(this).attr('data-picker-value');
	              col.setValue(value);
	          }

	          col.initEvents = function (detach) {
	              var method = detach ? 'off' : 'on';
	              col.container[method]($.touchEvents.start, handleTouchStart);
	              col.container[method]($.touchEvents.move, handleTouchMove);
	              col.container[method]($.touchEvents.end, handleTouchEnd);
	              col.items[method]('click', handleClick);
	          };
	          col.destroyEvents = function () {
	              col.initEvents(true);
	          };

	          col.container[0].f7DestroyPickerCol = function () {
	              col.destroyEvents();
	          };

	          col.initEvents();

	      };
	      p.destroyPickerCol = function (colContainer) {
	          colContainer = $(colContainer);
	          if ('f7DestroyPickerCol' in colContainer[0]) colContainer[0].f7DestroyPickerCol();
	      };
	      // Resize cols
	      function resizeCols() {
	          if (!p.opened) return;
	          for (var i = 0; i < p.cols.length; i++) {
	              if (!p.cols[i].divider) {
	                  p.cols[i].calcSize();
	                  p.cols[i].setValue(p.cols[i].value, 0, false);
	              }
	          }
	      }
	      $(window).on('resize', resizeCols);

	      // HTML Layout
	      p.columnHTML = function (col, onlyItems) {
	          var columnItemsHTML = '';
	          var columnHTML = '';
	          if (col.divider) {
	              columnHTML += '<div class="picker-items-col picker-items-col-divider ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '">' + col.content + '</div>';
	          }
	          else {
	              for (var j = 0; j < col.values.length; j++) {
	                  columnItemsHTML += '<div class="picker-item" data-picker-value="' + col.values[j] + '">' + (col.displayValues ? col.displayValues[j] : col.values[j]) + '</div>';
	              }
	              columnHTML += '<div class="picker-items-col ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '"><div class="picker-items-col-wrapper">' + columnItemsHTML + '</div></div>';
	          }
	          return onlyItems ? columnItemsHTML : columnHTML;
	      };
	      p.layout = function () {
	          var pickerHTML = '';
	          var pickerClass = '';
	          var i;
	          p.cols = [];
	          var colsHTML = '';
	          for (i = 0; i < p.params.cols.length; i++) {
	              var col = p.params.cols[i];
	              colsHTML += p.columnHTML(p.params.cols[i]);
	              p.cols.push(col);
	          }
	          pickerClass = 'weui-picker-modal picker-columns ' + (p.params.cssClass || '') + (p.params.rotateEffect ? ' picker-3d' : '') + (p.params.cols.length === 1 ? ' picker-columns-single' : '');
	          pickerHTML =
	              '<div class="' + (pickerClass) + '">' +
	                  (p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText).replace(/{{title}}/g, p.params.title) : '') +
	                  '<div class="picker-modal-inner picker-items">' +
	                      colsHTML +
	                      '<div class="picker-center-highlight"></div>' +
	                  '</div>' +
	              '</div>';
	              
	          p.pickerHTML = pickerHTML;    
	      };

	      // Input Events
	      function openOnInput(e) {
	          e.preventDefault();
	          if (p.opened) return;
	          p.open();
	          if (p.params.scrollToInput && !isPopover()) {
	              var pageContent = p.input.parents('.content');
	              if (pageContent.length === 0) return;

	              var paddingTop = parseInt(pageContent.css('padding-top'), 10),
	                  paddingBottom = parseInt(pageContent.css('padding-bottom'), 10),
	                  pageHeight = pageContent[0].offsetHeight - paddingTop - p.container.height(),
	                  pageScrollHeight = pageContent[0].scrollHeight - paddingTop - p.container.height(),
	                  newPaddingBottom;
	              var inputTop = p.input.offset().top - paddingTop + p.input[0].offsetHeight;
	              if (inputTop > pageHeight) {
	                  var scrollTop = pageContent.scrollTop() + inputTop - pageHeight;
	                  if (scrollTop + pageHeight > pageScrollHeight) {
	                      newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
	                      if (pageHeight === pageScrollHeight) {
	                          newPaddingBottom = p.container.height();
	                      }
	                      pageContent.css({'padding-bottom': (newPaddingBottom) + 'px'});
	                  }
	                  pageContent.scrollTop(scrollTop, 300);
	              }
	          }
	      }
	      function closeOnHTMLClick(e) {
	          if (inPopover()) return;
	          if (p.input && p.input.length > 0) {
	              if (e.target !== p.input[0] && $(e.target).parents('.weui-picker-modal').length === 0) p.close();
	          }
	          else {
	              if ($(e.target).parents('.weui-picker-modal').length === 0) p.close();   
	          }
	      }

	      if (p.params.input) {
	          p.input = $(p.params.input);
	          if (p.input.length > 0) {
	              if (p.params.inputReadOnly) p.input.prop('readOnly', true);
	              if (!p.inline) {
	                  p.input.on('click', openOnInput);    
	              }
	              if (p.params.inputReadOnly) {
	                  p.input.on('focus mousedown', function (e) {
	                      e.preventDefault();
	                  });
	              }
	          }
	              
	      }
	      
	      if (!p.inline) $('html').on('click', closeOnHTMLClick);

	      // Open
	      function onPickerClose() {
	          p.opened = false;
	          if (p.input && p.input.length > 0) p.input.parents('.page-content').css({'padding-bottom': ''});
	          if (p.params.onClose) p.params.onClose(p);

	          // Destroy events
	          p.container.find('.picker-items-col').each(function () {
	              p.destroyPickerCol(this);
	          });
	      }

	      p.opened = false;
	      p.open = function () {
	          var toPopover = isPopover();

	          if (!p.opened) {

	              // Layout
	              p.layout();

	              // Append
	              if (toPopover) {
	                  p.pickerHTML = '<div class="popover popover-picker-columns"><div class="popover-inner">' + p.pickerHTML + '</div></div>';
	                  p.popover = $.popover(p.pickerHTML, p.params.input, true);
	                  p.container = $(p.popover).find('.weui-picker-modal');
	                  $(p.popover).on('close', function () {
	                      onPickerClose();
	                  });
	              }
	              else if (p.inline) {
	                  p.container = $(p.pickerHTML);
	                  p.container.addClass('picker-modal-inline');
	                  $(p.params.container).append(p.container);
	              }
	              else {
	                  p.container = $($.openPicker(p.pickerHTML));
	                  $(p.container)
	                  .on('close', function () {
	                      onPickerClose();
	                  });
	              }

	              // Store picker instance
	              p.container[0].f7Picker = p;

	              // Init Events
	              p.container.find('.picker-items-col').each(function () {
	                  var updateItems = true;
	                  if ((!p.initialized && p.params.value) || (p.initialized && p.value)) updateItems = false;
	                  p.initPickerCol(this, updateItems);
	              });
	              
	              // Set value
	              if (!p.initialized) {
	                  if (p.params.value) {
	                      p.setValue(p.params.value, 0);
	                  }
	              }
	              else {
	                  if (p.value) p.setValue(p.value, 0);
	              }
	          }

	          // Set flag
	          p.opened = true;
	          p.initialized = true;

	          if (p.params.onOpen) p.params.onOpen(p);
	      };

	      // Close
	      p.close = function (force) {
	          if (!p.opened || p.inline) return;
	          if (inPopover()) {
	              $.closePicker(p.popover);
	              return;
	          }
	          else {
	              $.closePicker(p.container);
	              return;
	          }
	      };

	      // Destroy
	      p.destroy = function () {
	          p.close();
	          if (p.params.input && p.input.length > 0) {
	              p.input.off('click focus', openOnInput);
	              $(p.input).data('picker', null);
	          }
	          $('html').off('click', closeOnHTMLClick);
	          $(window).off('resize', resizeCols);
	      };

	      if (p.inline) {
	          p.open();
	      }

	      return p;
	  };

	  $(document).on("click", ".close-picker", function() {
	    var pickerToClose = $('.weui-picker-modal.weui-picker-modal-visible');
	    if (pickerToClose.length > 0) {
	      $.closePicker(pickerToClose);
	    }
	  });

	  //修复picker会滚动页面的bug
	  $(document).on($.touchEvents.move, ".picker-modal-inner", function(e) {
	    e.preventDefault();
	  });


	  $.openPicker = function(tpl, className, callback) {

	    if(typeof className === "function") {
	      callback = className;
	      className = undefined;
	    }

	    $.closePicker();

	    var container = $("<div class='weui-picker-container "+ (className || "") + "'></div>").appendTo(document.body);
	    container.show();

	    container.addClass("weui-picker-container-visible");

	    //关于布局的问题，如果直接放在body上，则做动画的时候会撑开body高度而导致滚动条变化。
	    var dialog = $(tpl).appendTo(container);
	    
	    dialog.width(); //通过取一次CSS值，强制浏览器不能把上下两行代码合并执行，因为合并之后会导致无法出现动画。

	    dialog.addClass("weui-picker-modal-visible");

	    callback && container.on("close", callback);

	    return dialog;
	  }

	  $.updatePicker = function(tpl) {
	    var container = $(".weui-picker-container-visible");
	    if(!container[0]) return false;

	    container.html("");

	    var dialog = $(tpl).appendTo(container);

	    dialog.addClass("weui-picker-modal-visible");

	    return dialog;
	  }

	  $.closePicker = function(container, callback) {
	    if(typeof container === "function") callback = container;
	    $(".weui-picker-modal-visible").removeClass("weui-picker-modal-visible").transitionEnd(function() {
	      $(this).parent().remove();
	      callback && callback();
	    }).trigger("close");
	  };

	  $.fn.picker = function(params) {
	    var args = arguments;
	    return this.each(function() {
	      if(!this) return;
	      var $this = $(this);
	      
	      var picker = $this.data("picker");
	      if(!picker) {
	        params = params || {};
	        var inputValue = $this.val();
	        if(params.value === undefined && inputValue !== "") {
	          params.value = (params.cols && params.cols.length > 1) ? inputValue.split(" ") : [inputValue];
	        }
	        var p = $.extend({input: this}, params);
	        picker = new Picker(p);
	        $this.data("picker", picker);
	      }
	      if(typeof params === typeof "a") {
	        picker[params].apply(picker, Array.prototype.slice.call(args, 1));
	      }
	    });
	  };
	}($);

	/* global $:true */
	+ function($) {
	  "use strict";

	  var defaults;

	  var selects = [];

	  var Select = function(input, config) {

	    var self = this;
	    this.config = config;

	    //init empty data
	    this.data = {
	      values: '',
	      titles: '',
	      origins: [],
	      length: 0
	    };

	    this.$input = $(input);
	    this.$input.prop("readOnly", true);

	    this.initConfig();

	    config = this.config;

	    this.$input.click($.proxy(this.open, this));
	    selects.push(this)
	  }

	  Select.prototype.initConfig = function() {
	    this.config = $.extend({}, defaults, this.config);

	    var config = this.config;

	    if(!config.items || !config.items.length) return;

	    config.items = config.items.map(function(d, i) {
	      if(typeof d == typeof "a") {
	        return {
	          title: d,
	          value: d
	        };
	      }

	      return d;
	    });


	    this.tpl = $.t7.compile("<div class='weui-picker-modal weui-select-modal'>" + config.toolbarTemplate + (config.multi ? config.checkboxTemplate : config.radioTemplate) + "</div>");

	    if(config.input !== undefined) this.$input.val(config.input);

	    this.parseInitValue();

	    this._init = true;
	  }

	  Select.prototype.updateInputValue = function(values, titles) {
	    var v, t;
	    if(this.config.multi) {
	      v = values.join(this.config.split);
	      t = titles.join(this.config.split);
	    } else {
	      v = values[0];
	      t = titles[0];
	    }

	    //caculate origin data
	    var origins = [];

	    this.config.items.forEach(function(d) {
	      values.each(function(i, dd) {
	        if(d.value == dd) origins.push(d);
	      });
	    });

	    this.$input.val(t).data("values", v);
	    this.$input.attr("value", t).attr("data-values", v);

	    var data = {
	      values: v,
	      titles: t,
	      valuesArray: values,
	      titlesArray: titles,
	      origins: origins,
	      length: origins.length
	    };
	    this.data = data;
	    this.$input.trigger("change", data);
	    this.config.onChange && this.config.onChange.call(this, data);
	  }

	  Select.prototype.parseInitValue = function() {
	    var value = this.$input.val();
	    var items = this.config.items;

	    //如果input为空，只有在第一次初始化的时候才保留默认选择。因为后来就是用户自己取消了全部选择，不能再为他选中默认值。
	    if( !this._init && (value === undefined || value == null || value === "")) return;

	    var titles = this.config.multi ? value.split(this.config.split) : [value];
	    for(var i=0;i<items.length;i++) {
	      items[i].checked = false;
	      for(var j=0;j<titles.length;j++) {
	        if(items[i].title === titles[j]) {
	          items[i].checked = true;
	        }
	      }
	    }
	  }

	  Select.prototype._bind = function(dialog) {
	    var self = this,
	        config = this.config;
	    dialog.on("change", function(e) {
	      var checked = dialog.find("input:checked");
	      var values = checked.map(function() {
	        return $(this).val();
	      });
	      var titles = checked.map(function() {
	        return $(this).data("title");
	      });
	      self.updateInputValue(values, titles);

	      if(config.autoClose && !config.multi) self.close();
	    })
	    .on("click", ".close-select", function() {
	      self.close();
	    });
	  }

	  //更新数据
	  Select.prototype.update = function(config) {
	    this.config = $.extend({}, this.config, config);
	    this.initConfig();
	    if(this._open) {
	      this._bind($.updatePicker(this.getHTML()));
	    }
	  }
	  
	  Select.prototype.open = function(values, titles) {

	    if(this._open) return;

	    // open picker 会默认关掉其他的，但是 onClose 不会被调用，所以这里先关掉其他select
	    for (var i = 0; i < selects.length; i++ ) {
	      var s = selects[i];
	      if (s === this) continue;
	      if (s._open) {
	        if(!s.close()) return false; // 其他的select由于某些条件限制关闭失败。
	      }
	    }

	    this.parseInitValue();

	    var config = this.config;

	    var dialog = this.dialog = $.openPicker(this.getHTML());
	    
	    this._bind(dialog);

	    this._open = true;
	    if(config.onOpen) config.onOpen(this);
	  }

	  Select.prototype.close = function(callback, force) {
	    if (!this._open) return false;
	    var self = this,
	        beforeClose = this.config.beforeClose;

	    if(typeof callback === typeof true) {
	      force === callback;
	    }
	    if(!force) {
	      if(beforeClose && typeof beforeClose === 'function' && beforeClose.call(this, this.data.values, this.data.titles) === false) {
	        return false
	      }
	      if(this.config.multi) {
	        if(this.config.min !== undefined && this.data.length < this.config.min) {
	          $.toast("请至少选择"+this.config.min+"个", "text");
	          return false
	        }
	        if(this.config.max !== undefined && this.data.length > this.config.max) {
	          $.toast("最多只能选择"+this.config.max+"个", "text");
	          return false
	        }
	      }
	    }
	    $.closePicker(function() {
	      self.onClose();
	      callback && callback();
	    });

	    return true
	  }

	  Select.prototype.onClose = function() {
	    this._open = false;
	    if(this.config.onClose) this.config.onClose(this);
	  }

	  Select.prototype.getHTML = function(callback) {
	    var config = this.config;
	    return this.tpl({
	      items: config.items,
	      title: config.title,
	      closeText: config.closeText
	    })
	  }


	  $.fn.select = function(params, args) {

	    return this.each(function() {
	      var $this = $(this);
	      if(!$this.data("weui-select")) $this.data("weui-select", new Select(this, params));

	      var select = $this.data("weui-select");

	      if(typeof params === typeof "a") select[params].call(select, args);

	      return select;
	    });
	  }

	  defaults = $.fn.select.prototype.defaults = {
	    items: [],
	    input: undefined, //输入框的初始值
	    title: "请选择",
	    multi: false,
	    closeText: "确定",
	    autoClose: true, //是否选择完成后自动关闭，只有单选模式下才有效
	    onChange: undefined, //function
	    beforeClose: undefined, // function 关闭之前，如果返回false则阻止关闭
	    onClose: undefined, //function
	    onOpen: undefined, //function
	    split: ",",  //多选模式下的分隔符
	    min: undefined, //多选模式下可用，最少选择数
	    max: undefined, //单选模式下可用，最多选择数
	    toolbarTemplate: '<div class="toolbar">\
	      <div class="toolbar-inner">\
	      <a href="javascript:;" class="picker-button close-select">{{closeText}}</a>\
	      <h1 class="title">{{title}}</h1>\
	      </div>\
	      </div>',
	    radioTemplate:
	      '<div class="weui-cells weui-cells_radio">\
	        {{#items}}\
	        <label class="weui-cell weui-check_label" for="weui-select-id-{{this.title}}">\
	          <div class="weui-cell__bd weui-cell_primary">\
	            <p>{{this.title}}</p>\
	          </div>\
	          <div class="weui-cell__ft">\
	            <input type="radio" class="weui-check" name="weui-select" id="weui-select-id-{{this.title}}" value="{{this.value}}" {{#if this.checked}}checked="checked"{{/if}} data-title="{{this.title}}">\
	            <span class="weui-icon-checked"></span>\
	          </div>\
	        </label>\
	        {{/items}}\
	      </div>',
	    checkboxTemplate:
	      '<div class="weui-cells weui-cells_checkbox">\
	        {{#items}}\
	        <label class="weui-cell weui-check_label" for="weui-select-id-{{this.title}}">\
	          <div class="weui-cell__bd weui-cell_primary">\
	            <p>{{this.title}}</p>\
	          </div>\
	          <div class="weui-cell__ft">\
	            <input type="checkbox" class="weui-check" name="weui-select" id="weui-select-id-{{this.title}}" value="{{this.value}}" {{#if this.checked}}checked="checked"{{/if}} data-title="{{this.title}}" >\
	            <span class="weui-icon-checked"></span>\
	          </div>\
	        </label>\
	        {{/items}}\
	      </div>',
	  }

	}($);

	/*======================================================
	************   Calendar   ************
	======================================================*/
	/* global $:true */
	/*jshint unused: false*/
	+function ($) {
	  "use strict";
	  var rtl = false;
	  var defaults;
	  var isSameDate = function (a, b) {
	    var a = new Date(a),
	      b = new Date(b);
	    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
	  }
	  var Calendar = function (params) {
	      var p = this;
	      params = params || {};
	      for (var def in defaults) {
	          if (typeof params[def] === 'undefined') {
	              params[def] = defaults[def];
	          }
	      }
	      p.params = params;
	      p.initialized = false;

	      // Inline flag
	      p.inline = p.params.container ? true : false;

	      // Is horizontal
	      p.isH = p.params.direction === 'horizontal';

	      // RTL inverter
	      var inverter = p.isH ? (rtl ? -1 : 1) : 1;

	      // Animating flag
	      p.animating = false;

	      // Should be converted to popover
	      function isPopover() {
	          var toPopover = false;
	          if (!p.params.convertToPopover && !p.params.onlyInPopover) return toPopover;
	          if (!p.inline && p.params.input) {
	              if (p.params.onlyInPopover) toPopover = true;
	              else {
	                  if ($.device.ios) {
	                      toPopover = $.device.ipad ? true : false;
	                  }
	                  else {
	                      if ($(window).width() >= 768) toPopover = true;
	                  }
	              }
	          } 
	          return toPopover; 
	      }
	      function inPopover() {
	          if (p.opened && p.container && p.container.length > 0 && p.container.parents('.popover').length > 0) return true;
	          else return false;
	      }

	      // Format date
	      function formatDate(date) {
	          date = new Date(date);
	          var year = date.getFullYear();
	          var month = date.getMonth();
	          var month1 = month + 1;
	          var day = date.getDate();
	          var weekDay = date.getDay();
	          return p.params.dateFormat
	              .replace(/yyyy/g, year)
	              .replace(/yy/g, (year + '').substring(2))
	              .replace(/mm/g, month1 < 10 ? '0' + month1 : month1)
	              .replace(/m/g, month1)
	              .replace(/MM/g, p.params.monthNames[month])
	              .replace(/M/g, p.params.monthNamesShort[month])
	              .replace(/dd/g, day < 10 ? '0' + day : day)
	              .replace(/d/g, day)
	              .replace(/DD/g, p.params.dayNames[weekDay])
	              .replace(/D/g, p.params.dayNamesShort[weekDay]);
	      }


	      // Value
	      p.addValue = function (value) {
	          if (p.params.multiple) {
	              if (!p.value) p.value = [];
	              var inValuesIndex;
	              for (var i = 0; i < p.value.length; i++) {
	                  if (isSameDate(value, p.value[i])) {
	                      inValuesIndex = i;
	                  }
	              }
	              if (typeof inValuesIndex === 'undefined') {
	                  p.value.push(value);
	              }
	              else {
	                  p.value.splice(inValuesIndex, 1);
	              }
	              p.updateValue();
	          }
	          else {
	              p.value = [value];
	              p.updateValue();
	          }
	      };
	      p.setValue = function (arrValues) {
	        var date = new Date(arrValues[0]);
	        p.setYearMonth(date.getFullYear(), date.getMonth());
	        p.addValue(+ date);
	      };
	      p.updateValue = function () {
	          p.wrapper.find('.picker-calendar-day-selected').removeClass('picker-calendar-day-selected');
	          var i, inputValue;
	          for (i = 0; i < p.value.length; i++) {
	              var valueDate = new Date(p.value[i]);
	              p.wrapper.find('.picker-calendar-day[data-date="' + valueDate.getFullYear() + '-' + valueDate.getMonth() + '-' + valueDate.getDate() + '"]').addClass('picker-calendar-day-selected');
	          }
	          if (p.params.onChange) {
	            p.params.onChange(p, p.value.map(formatDate), p.value.map(function (d) {
	              return + new Date(typeof d === typeof 'a' ? d.split(/\D/).filter(function (a) { return !!a; }).join("-") : d);
	            }));
	          }
	          if (p.input && p.input.length > 0) {
	              if (p.params.formatValue) inputValue = p.params.formatValue(p, p.value);
	              else {
	                  inputValue = [];
	                  for (i = 0; i < p.value.length; i++) {
	                      inputValue.push(formatDate(p.value[i]));
	                  }
	                  inputValue = inputValue.join(', ');
	              } 
	              $(p.input).val(inputValue);
	              $(p.input).trigger('change');
	          }
	      };

	      // Columns Handlers
	      p.initCalendarEvents = function () {
	          var col;
	          var allowItemClick = true;
	          var isTouched, isMoved, touchStartX, touchStartY, touchCurrentX, touchCurrentY, touchStartTime, touchEndTime, startTranslate, currentTranslate, wrapperWidth, wrapperHeight, percentage, touchesDiff, isScrolling;
	          function handleTouchStart (e) {
	              if (isMoved || isTouched) return;
	              // e.preventDefault();
	              isTouched = true;
	              var position = $.getTouchPosition(e);
	              touchStartX = touchCurrentY = position.x;
	              touchStartY = touchCurrentY = position.y;
	              touchStartTime = (new Date()).getTime();
	              percentage = 0;
	              allowItemClick = true;
	              isScrolling = undefined;
	              startTranslate = currentTranslate = p.monthsTranslate;
	          }
	          function handleTouchMove (e) {
	              if (!isTouched) return;
	              var position = $.getTouchPosition(e);
	              touchCurrentX = position.x;
	              touchCurrentY = position.y;
	              if (typeof isScrolling === 'undefined') {
	                  isScrolling = !!(isScrolling || Math.abs(touchCurrentY - touchStartY) > Math.abs(touchCurrentX - touchStartX));
	              }
	              if (p.isH && isScrolling) {
	                  isTouched = false;
	                  return;
	              }
	              e.preventDefault();
	              if (p.animating) {
	                  isTouched = false;
	                  return;   
	              }
	              allowItemClick = false;
	              if (!isMoved) {
	                  // First move
	                  isMoved = true;
	                  wrapperWidth = p.wrapper[0].offsetWidth;
	                  wrapperHeight = p.wrapper[0].offsetHeight;
	                  p.wrapper.transition(0);
	              }
	              e.preventDefault();

	              touchesDiff = p.isH ? touchCurrentX - touchStartX : touchCurrentY - touchStartY;
	              percentage = touchesDiff/(p.isH ? wrapperWidth : wrapperHeight);
	              currentTranslate = (p.monthsTranslate * inverter + percentage) * 100;

	              // Transform wrapper
	              p.wrapper.transform('translate3d(' + (p.isH ? currentTranslate : 0) + '%, ' + (p.isH ? 0 : currentTranslate) + '%, 0)');

	          }
	          function handleTouchEnd (e) {
	              if (!isTouched || !isMoved) {
	                  isTouched = isMoved = false;
	                  return;
	              }
	              isTouched = isMoved = false;
	              
	              touchEndTime = new Date().getTime();
	              if (touchEndTime - touchStartTime < 300) {
	                  if (Math.abs(touchesDiff) < 10) {
	                      p.resetMonth();
	                  }
	                  else if (touchesDiff >= 10) {
	                      if (rtl) p.nextMonth();
	                      else p.prevMonth();
	                  }
	                  else {
	                      if (rtl) p.prevMonth();
	                      else p.nextMonth();   
	                  }
	              }
	              else {
	                  if (percentage <= -0.5) {
	                      if (rtl) p.prevMonth();
	                      else p.nextMonth();
	                  }
	                  else if (percentage >= 0.5) {
	                      if (rtl) p.nextMonth();
	                      else p.prevMonth();
	                  }
	                  else {
	                      p.resetMonth();
	                  }
	              }

	              // Allow click
	              setTimeout(function () {
	                  allowItemClick = true;
	              }, 100);
	          }

	          function handleDayClick(e) {
	              if (!allowItemClick) return;
	              var day = $(e.target).parents('.picker-calendar-day');
	              if (day.length === 0 && $(e.target).hasClass('picker-calendar-day')) {
	                  day = $(e.target);
	              }
	              if (day.length === 0) return;
	              // if (day.hasClass('picker-calendar-day-selected') && !p.params.multiple) return;
	              if (day.hasClass('picker-calendar-day-disabled')) return;
	              if (day.hasClass('picker-calendar-day-next')) p.nextMonth();
	              if (day.hasClass('picker-calendar-day-prev')) p.prevMonth();
	              var dateYear = day.attr('data-year');
	              var dateMonth = day.attr('data-month');
	              var dateDay = day.attr('data-day');
	              if (p.params.onDayClick) {
	                  p.params.onDayClick(p, day[0], dateYear, dateMonth, dateDay);
	              }
	              p.addValue(new Date(dateYear, dateMonth, dateDay).getTime());
	              if (p.params.closeOnSelect && !p.params.multiple) p.close();
	          }

	          p.container.find('.picker-calendar-prev-month').on('click', p.prevMonth);
	          p.container.find('.picker-calendar-next-month').on('click', p.nextMonth);
	          p.container.find('.picker-calendar-prev-year').on('click', p.prevYear);
	          p.container.find('.picker-calendar-next-year').on('click', p.nextYear);
	          p.wrapper.on('click', handleDayClick);
	          if (p.params.touchMove) {
	              p.wrapper.on($.touchEvents.start, handleTouchStart);
	              p.wrapper.on($.touchEvents.move, handleTouchMove);
	              p.wrapper.on($.touchEvents.end, handleTouchEnd);
	          }
	              
	          p.container[0].f7DestroyCalendarEvents = function () {
	              p.container.find('.picker-calendar-prev-month').off('click', p.prevMonth);
	              p.container.find('.picker-calendar-next-month').off('click', p.nextMonth);
	              p.container.find('.picker-calendar-prev-year').off('click', p.prevYear);
	              p.container.find('.picker-calendar-next-year').off('click', p.nextYear);
	              p.wrapper.off('click', handleDayClick);
	              if (p.params.touchMove) {
	                  p.wrapper.off($.touchEvents.start, handleTouchStart);
	                  p.wrapper.off($.touchEvents.move, handleTouchMove);
	                  p.wrapper.off($.touchEvents.end, handleTouchEnd);
	              }
	          };
	          

	      };
	      p.destroyCalendarEvents = function (colContainer) {
	          if ('f7DestroyCalendarEvents' in p.container[0]) p.container[0].f7DestroyCalendarEvents();
	      };

	      // Calendar Methods
	      p.daysInMonth = function (date) {
	          var d = new Date(date);
	          return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
	      };
	      p.monthHTML = function (date, offset) {
	          date = new Date(date);
	          var year = date.getFullYear(),
	              month = date.getMonth(),
	              day = date.getDate();
	          if (offset === 'next') {
	              if (month === 11) date = new Date(year + 1, 0);
	              else date = new Date(year, month + 1, 1);
	          }
	          if (offset === 'prev') {
	              if (month === 0) date = new Date(year - 1, 11);
	              else date = new Date(year, month - 1, 1);
	          }
	          if (offset === 'next' || offset === 'prev') {
	              month = date.getMonth();
	              year = date.getFullYear();
	          }
	          var daysInPrevMonth = p.daysInMonth(new Date(date.getFullYear(), date.getMonth()).getTime() - 10 * 24 * 60 * 60 * 1000),
	              daysInMonth = p.daysInMonth(date),
	              firstDayOfMonthIndex = new Date(date.getFullYear(), date.getMonth()).getDay();
	          if (firstDayOfMonthIndex === 0) firstDayOfMonthIndex = 7;
	          
	          var dayDate, currentValues = [], i, j,
	              rows = 6, cols = 7,
	              monthHTML = '',
	              dayIndex = 0 + (p.params.firstDay - 1),    
	              today = new Date().setHours(0,0,0,0),
	              minDate = p.params.minDate ? new Date(p.params.minDate).getTime() : null,
	              maxDate = p.params.maxDate ? new Date(p.params.maxDate).getTime() : null;

	          if (p.value && p.value.length) {
	              for (i = 0; i < p.value.length; i++) {
	                  currentValues.push(new Date(p.value[i]).setHours(0,0,0,0));
	              }
	          }
	              
	          for (i = 1; i <= rows; i++) {
	              var rowHTML = '';
	              var row = i;
	              for (j = 1; j <= cols; j++) {
	                  var col = j;
	                  dayIndex ++;
	                  var dayNumber = dayIndex - firstDayOfMonthIndex;
	                  var addClass = '';
	                  if (dayNumber < 0) {
	                      dayNumber = daysInPrevMonth + dayNumber + 1;
	                      addClass += ' picker-calendar-day-prev';
	                      dayDate = new Date(month - 1 < 0 ? year - 1 : year, month - 1 < 0 ? 11 : month - 1, dayNumber).getTime();
	                  }
	                  else {
	                      dayNumber = dayNumber + 1;
	                      if (dayNumber > daysInMonth) {
	                          dayNumber = dayNumber - daysInMonth;
	                          addClass += ' picker-calendar-day-next';
	                          dayDate = new Date(month + 1 > 11 ? year + 1 : year, month + 1 > 11 ? 0 : month + 1, dayNumber).getTime();
	                      }
	                      else {
	                          dayDate = new Date(year, month, dayNumber).getTime();    
	                      }
	                  }
	                  // Today
	                  if (dayDate === today) addClass += ' picker-calendar-day-today';
	                  // Selected
	                  if (currentValues.indexOf(dayDate) >= 0) addClass += ' picker-calendar-day-selected';
	                  // Weekend
	                  if (p.params.weekendDays.indexOf(col - 1) >= 0) {
	                      addClass += ' picker-calendar-day-weekend';
	                  }
	                  // Disabled
	                  if ((minDate && dayDate < minDate) || (maxDate && dayDate > maxDate)) {
	                      addClass += ' picker-calendar-day-disabled';   
	                  }

	                  dayDate = new Date(dayDate);
	                  var dayYear = dayDate.getFullYear();
	                  var dayMonth = dayDate.getMonth();
	                  rowHTML += '<div data-year="' + dayYear + '" data-month="' + dayMonth + '" data-day="' + dayNumber + '" class="picker-calendar-day' + (addClass) + '" data-date="' + (dayYear + '-' + dayMonth + '-' + dayNumber) + '"><span>'+dayNumber+'</span></div>';
	              }
	              monthHTML += '<div class="picker-calendar-row">' + rowHTML + '</div>';
	          }
	          monthHTML = '<div class="picker-calendar-month" data-year="' + year + '" data-month="' + month + '">' + monthHTML + '</div>';
	          return monthHTML;
	      };
	      p.animating = false;
	      p.updateCurrentMonthYear = function (dir) {
	          if (typeof dir === 'undefined') {
	              p.currentMonth = parseInt(p.months.eq(1).attr('data-month'), 10);
	              p.currentYear = parseInt(p.months.eq(1).attr('data-year'), 10);   
	          }
	          else {
	              p.currentMonth = parseInt(p.months.eq(dir === 'next' ? (p.months.length - 1) : 0).attr('data-month'), 10);
	              p.currentYear = parseInt(p.months.eq(dir === 'next' ? (p.months.length - 1) : 0).attr('data-year'), 10);
	          }
	          p.container.find('.current-month-value').text(p.params.monthNames[p.currentMonth]);
	          p.container.find('.current-year-value').text(p.currentYear);
	              
	      };
	      p.onMonthChangeStart = function (dir) {
	          p.updateCurrentMonthYear(dir);
	          p.months.removeClass('picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next');
	          var currentIndex = dir === 'next' ? p.months.length - 1 : 0;

	          p.months.eq(currentIndex).addClass('picker-calendar-month-current');
	          p.months.eq(dir === 'next' ? currentIndex - 1 : currentIndex + 1).addClass(dir === 'next' ? 'picker-calendar-month-prev' : 'picker-calendar-month-next');

	          if (p.params.onMonthYearChangeStart) {
	              p.params.onMonthYearChangeStart(p, p.currentYear, p.currentMonth);
	          }
	      };
	      p.onMonthChangeEnd = function (dir, rebuildBoth) {
	          p.animating = false;
	          var nextMonthHTML, prevMonthHTML, newMonthHTML;
	          p.wrapper.find('.picker-calendar-month:not(.picker-calendar-month-prev):not(.picker-calendar-month-current):not(.picker-calendar-month-next)').remove();
	          
	          if (typeof dir === 'undefined') {
	              dir = 'next';
	              rebuildBoth = true;
	          }
	          if (!rebuildBoth) {
	              newMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), dir);
	          }
	          else {
	              p.wrapper.find('.picker-calendar-month-next, .picker-calendar-month-prev').remove();
	              prevMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), 'prev');
	              nextMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), 'next');
	          }
	          if (dir === 'next' || rebuildBoth) {
	              p.wrapper.append(newMonthHTML || nextMonthHTML);
	          }
	          if (dir === 'prev' || rebuildBoth) {
	              p.wrapper.prepend(newMonthHTML || prevMonthHTML);
	          }
	          p.months = p.wrapper.find('.picker-calendar-month');
	          p.setMonthsTranslate(p.monthsTranslate);
	          if (p.params.onMonthAdd) {
	              p.params.onMonthAdd(p, dir === 'next' ? p.months.eq(p.months.length - 1)[0] : p.months.eq(0)[0]);
	          }
	          if (p.params.onMonthYearChangeEnd) {
	              p.params.onMonthYearChangeEnd(p, p.currentYear, p.currentMonth);
	          }
	      };
	      p.setMonthsTranslate = function (translate) {
	          translate = translate || p.monthsTranslate || 0;
	          if (typeof p.monthsTranslate === 'undefined') p.monthsTranslate = translate;
	          p.months.removeClass('picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next');
	          var prevMonthTranslate = -(translate + 1) * 100 * inverter;
	          var currentMonthTranslate = -translate * 100 * inverter;
	          var nextMonthTranslate = -(translate - 1) * 100 * inverter;
	          p.months.eq(0).transform('translate3d(' + (p.isH ? prevMonthTranslate : 0) + '%, ' + (p.isH ? 0 : prevMonthTranslate) + '%, 0)').addClass('picker-calendar-month-prev');
	          p.months.eq(1).transform('translate3d(' + (p.isH ? currentMonthTranslate : 0) + '%, ' + (p.isH ? 0 : currentMonthTranslate) + '%, 0)').addClass('picker-calendar-month-current');
	          p.months.eq(2).transform('translate3d(' + (p.isH ? nextMonthTranslate : 0) + '%, ' + (p.isH ? 0 : nextMonthTranslate) + '%, 0)').addClass('picker-calendar-month-next');
	      };
	      p.nextMonth = function (transition) {
	          if (typeof transition === 'undefined' || typeof transition === 'object') {
	              transition = '';
	              if (!p.params.animate) transition = 0;
	          }
	          var nextMonth = parseInt(p.months.eq(p.months.length - 1).attr('data-month'), 10);
	          var nextYear = parseInt(p.months.eq(p.months.length - 1).attr('data-year'), 10);
	          var nextDate = new Date(nextYear, nextMonth);
	          var nextDateTime = nextDate.getTime();
	          var transitionEndCallback = p.animating ? false : true;
	          if (p.params.maxDate) {
	              if (nextDateTime > new Date(p.params.maxDate).getTime()) {
	                  return p.resetMonth();
	              }
	          }
	          p.monthsTranslate --;
	          if (nextMonth === p.currentMonth) {
	              var nextMonthTranslate = -(p.monthsTranslate) * 100 * inverter;
	              var nextMonthHTML = $(p.monthHTML(nextDateTime, 'next')).transform('translate3d(' + (p.isH ? nextMonthTranslate : 0) + '%, ' + (p.isH ? 0 : nextMonthTranslate) + '%, 0)').addClass('picker-calendar-month-next');
	              p.wrapper.append(nextMonthHTML[0]);
	              p.months = p.wrapper.find('.picker-calendar-month');
	              if (p.params.onMonthAdd) {
	                  p.params.onMonthAdd(p, p.months.eq(p.months.length - 1)[0]);
	              }
	          }
	          p.animating = true;
	          p.onMonthChangeStart('next');
	          var translate = (p.monthsTranslate * 100) * inverter;

	          p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
	          if (transitionEndCallback) {
	              p.wrapper.transitionEnd(function () {
	                  p.onMonthChangeEnd('next');
	              });
	          }
	          if (!p.params.animate) {
	              p.onMonthChangeEnd('next');
	          }
	      };
	      p.prevMonth = function (transition) {
	          if (typeof transition === 'undefined' || typeof transition === 'object') {
	              transition = '';
	              if (!p.params.animate) transition = 0;
	          }
	          var prevMonth = parseInt(p.months.eq(0).attr('data-month'), 10);
	          var prevYear = parseInt(p.months.eq(0).attr('data-year'), 10);
	          var prevDate = new Date(prevYear, prevMonth + 1, -1);
	          var prevDateTime = prevDate.getTime();
	          var transitionEndCallback = p.animating ? false : true;
	          if (p.params.minDate) {
	              if (prevDateTime < new Date(p.params.minDate).getTime()) {
	                  return p.resetMonth();
	              }
	          }
	          p.monthsTranslate ++;
	          if (prevMonth === p.currentMonth) {
	              var prevMonthTranslate = -(p.monthsTranslate) * 100 * inverter;
	              var prevMonthHTML = $(p.monthHTML(prevDateTime, 'prev')).transform('translate3d(' + (p.isH ? prevMonthTranslate : 0) + '%, ' + (p.isH ? 0 : prevMonthTranslate) + '%, 0)').addClass('picker-calendar-month-prev');
	              p.wrapper.prepend(prevMonthHTML[0]);
	              p.months = p.wrapper.find('.picker-calendar-month');
	              if (p.params.onMonthAdd) {
	                  p.params.onMonthAdd(p, p.months.eq(0)[0]);
	              }
	          }
	          p.animating = true;
	          p.onMonthChangeStart('prev');
	          var translate = (p.monthsTranslate * 100) * inverter;
	          p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
	          if (transitionEndCallback) {
	              p.wrapper.transitionEnd(function () {
	                  p.onMonthChangeEnd('prev');
	              });
	          }
	          if (!p.params.animate) {
	              p.onMonthChangeEnd('prev');
	          }
	      };
	      p.resetMonth = function (transition) {
	          if (typeof transition === 'undefined') transition = '';
	          var translate = (p.monthsTranslate * 100) * inverter;
	          p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
	      };
	      p.setYearMonth = function (year, month, transition) {
	          if (typeof year === 'undefined') year = p.currentYear;
	          if (typeof month === 'undefined') month = p.currentMonth;
	          if (typeof transition === 'undefined' || typeof transition === 'object') {
	              transition = '';
	              if (!p.params.animate) transition = 0;
	          }
	          var targetDate;
	          if (year < p.currentYear) {
	              targetDate = new Date(year, month + 1, -1).getTime();
	          }
	          else {
	              targetDate = new Date(year, month).getTime();
	          }
	          if (p.params.maxDate && targetDate > new Date(p.params.maxDate).getTime()) {
	              return false;
	          }
	          if (p.params.minDate && targetDate < new Date(p.params.minDate).getTime()) {
	              return false;
	          }
	          var currentDate = new Date(p.currentYear, p.currentMonth).getTime();
	          var dir = targetDate > currentDate ? 'next' : 'prev';
	          var newMonthHTML = p.monthHTML(new Date(year, month));
	          p.monthsTranslate = p.monthsTranslate || 0;
	          var prevTranslate = p.monthsTranslate;
	          var monthTranslate, wrapperTranslate;
	          var transitionEndCallback = p.animating ? false : true;
	          if (targetDate > currentDate) {
	              // To next
	              p.monthsTranslate --;
	              if (!p.animating) p.months.eq(p.months.length - 1).remove();
	              p.wrapper.append(newMonthHTML);
	              p.months = p.wrapper.find('.picker-calendar-month');
	              monthTranslate = -(prevTranslate - 1) * 100 * inverter;
	              p.months.eq(p.months.length - 1).transform('translate3d(' + (p.isH ? monthTranslate : 0) + '%, ' + (p.isH ? 0 : monthTranslate) + '%, 0)').addClass('picker-calendar-month-next');
	          }
	          else {
	              // To prev
	              p.monthsTranslate ++;
	              if (!p.animating) p.months.eq(0).remove();
	              p.wrapper.prepend(newMonthHTML);
	              p.months = p.wrapper.find('.picker-calendar-month');
	              monthTranslate = -(prevTranslate + 1) * 100 * inverter;
	              p.months.eq(0).transform('translate3d(' + (p.isH ? monthTranslate : 0) + '%, ' + (p.isH ? 0 : monthTranslate) + '%, 0)').addClass('picker-calendar-month-prev');
	          }
	          if (p.params.onMonthAdd) {
	              p.params.onMonthAdd(p, dir === 'next' ? p.months.eq(p.months.length - 1)[0] : p.months.eq(0)[0]);
	          }
	          p.animating = true;
	          p.onMonthChangeStart(dir);
	          wrapperTranslate = (p.monthsTranslate * 100) * inverter;
	          p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? wrapperTranslate : 0) + '%, ' + (p.isH ? 0 : wrapperTranslate) + '%, 0)');
	          if (transitionEndCallback) {
	             p.wrapper.transitionEnd(function () {
	                  p.onMonthChangeEnd(dir, true);
	              }); 
	          }
	          if (!p.params.animate) {
	              p.onMonthChangeEnd(dir);
	          }
	      };
	      p.nextYear = function () {
	          p.setYearMonth(p.currentYear + 1);
	      };
	      p.prevYear = function () {
	          p.setYearMonth(p.currentYear - 1);
	      };
	      

	      // HTML Layout
	      p.layout = function () {
	          var pickerHTML = '';
	          var pickerClass = '';
	          var i;
	          
	          var layoutDate = p.value && p.value.length ? p.value[0] : new Date().setHours(0,0,0,0);
	          var prevMonthHTML = p.monthHTML(layoutDate, 'prev');
	          var currentMonthHTML = p.monthHTML(layoutDate);
	          var nextMonthHTML = p.monthHTML(layoutDate, 'next');
	          var monthsHTML = '<div class="picker-calendar-months"><div class="picker-calendar-months-wrapper">' + (prevMonthHTML + currentMonthHTML + nextMonthHTML) + '</div></div>';
	          // Week days header
	          var weekHeaderHTML = '';
	          if (p.params.weekHeader) {
	              for (i = 0; i < 7; i++) {
	                  var weekDayIndex = (i + p.params.firstDay > 6) ? (i - 7 + p.params.firstDay) : (i + p.params.firstDay);
	                  var dayName = p.params.dayNamesShort[weekDayIndex];
	                  weekHeaderHTML += '<div class="picker-calendar-week-day ' + ((p.params.weekendDays.indexOf(weekDayIndex) >= 0) ? 'picker-calendar-week-day-weekend' : '') + '"> ' + dayName + '</div>';
	                  
	              }
	              weekHeaderHTML = '<div class="picker-calendar-week-days">' + weekHeaderHTML + '</div>';
	          }
	          pickerClass = 'weui-picker-calendar ' + (p.params.cssClass || '');
	          if(!p.inline) pickerClass = 'weui-picker-modal ' + pickerClass;
	          var toolbarHTML = p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '';
	          if (p.params.toolbar) {
	              toolbarHTML = p.params.toolbarTemplate
	                  .replace(/{{closeText}}/g, p.params.toolbarCloseText)
	                  .replace(/{{monthPicker}}/g, (p.params.monthPicker ? p.params.monthPickerTemplate : ''))
	                  .replace(/{{yearPicker}}/g, (p.params.yearPicker ? p.params.yearPickerTemplate : ''));
	          }

	          pickerHTML =
	              '<div class="' + (pickerClass) + '">' +
	                  toolbarHTML +
	                  '<div class="picker-modal-inner">' +
	                      weekHeaderHTML +
	                      monthsHTML +
	                  '</div>' +
	              '</div>';
	              
	              
	          p.pickerHTML = pickerHTML;    
	      };

	      // Input Events
	      function openOnInput(e) {
	          e.preventDefault();
	          if (p.opened) return;
	          p.open();
	          if (p.params.scrollToInput && !isPopover()) {
	              var pageContent = p.input.parents('.page-content');
	              if (pageContent.length === 0) return;

	              var paddingTop = parseInt(pageContent.css('padding-top'), 10),
	                  paddingBottom = parseInt(pageContent.css('padding-bottom'), 10),
	                  pageHeight = pageContent[0].offsetHeight - paddingTop - p.container.height(),
	                  pageScrollHeight = pageContent[0].scrollHeight - paddingTop - p.container.height(),
	                  newPaddingBottom;

	              var inputTop = p.input.offset().top - paddingTop + p.input[0].offsetHeight;
	              if (inputTop > pageHeight) {
	                  var scrollTop = pageContent.scrollTop() + inputTop - pageHeight;
	                  if (scrollTop + pageHeight > pageScrollHeight) {
	                      newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
	                      if (pageHeight === pageScrollHeight) {
	                          newPaddingBottom = p.container.height();
	                      }
	                      pageContent.css({'padding-bottom': (newPaddingBottom) + 'px'});
	                  }
	                  pageContent.scrollTop(scrollTop, 300);
	              }
	          }
	      }
	      function closeOnHTMLClick(e) {
	          if (inPopover()) return;
	          if (p.input && p.input.length > 0) {
	              if (e.target !== p.input[0] && $(e.target).parents('.weui-picker-modal').length === 0) p.close();
	          }
	          else {
	              if ($(e.target).parents('.weui-picker-modal').length === 0) p.close();   
	          }
	      }

	      if (p.params.input) {
	          p.input = $(p.params.input);
	          if (p.input.length > 0) {
	              if (p.params.inputReadOnly) p.input.prop('readOnly', true);
	              if (!p.inline) {
	                  p.input.on('click', openOnInput);    
	              }
	              if (p.params.inputReadOnly) {
	                  p.input.on('focus mousedown', function (e) {
	                      e.preventDefault();
	                  });
	              }
	          }
	              
	      }
	      
	      //iphone 上无法正确触发 click，会导致点击外面无法关闭
	      if (!p.inline) $(document).on('click touchend', closeOnHTMLClick);

	      // Open
	      function onPickerClose() {
	          p.opened = false;
	          if (p.input && p.input.length > 0) p.input.parents('.page-content').css({'padding-bottom': ''});
	          if (p.params.onClose) p.params.onClose(p);

	          // Destroy events
	          p.destroyCalendarEvents();
	      }

	      p.opened = false;
	      p.open = function () {
	          var toPopover = isPopover() && false;
	          var updateValue = false;
	          if (!p.opened) {
	              // Set date value
	              if (!p.value) {
	                  if (p.params.value) {
	                      p.value = p.params.value;
	                      updateValue = true;
	                  }
	              }

	              // Layout
	              p.layout();

	              // Append
	              if (toPopover) {
	                  p.pickerHTML = '<div class="popover popover-picker-calendar"><div class="popover-inner">' + p.pickerHTML + '</div></div>';
	                  p.popover = $.popover(p.pickerHTML, p.params.input, true);
	                  p.container = $(p.popover).find('.weui-picker-modal');
	                  $(p.popover).on('close', function () {
	                      onPickerClose();
	                  });
	              }
	              else if (p.inline) {
	                  p.container = $(p.pickerHTML);
	                  p.container.addClass('picker-modal-inline');
	                  $(p.params.container).append(p.container);
	              }
	              else {
	                  p.container = $($.openPicker(p.pickerHTML));
	                  $(p.container)
	                  .on('close', function () {
	                      onPickerClose();
	                  });
	              }

	              // Store calendar instance
	              p.container[0].f7Calendar = p;
	              p.wrapper = p.container.find('.picker-calendar-months-wrapper');

	              // Months
	              p.months = p.wrapper.find('.picker-calendar-month');

	              // Update current month and year
	              p.updateCurrentMonthYear();

	              // Set initial translate
	              p.monthsTranslate = 0;
	              p.setMonthsTranslate();

	              // Init events
	              p.initCalendarEvents();

	              // Update input value
	              if (updateValue) p.updateValue();
	              
	          }

	          // Set flag
	          p.opened = true;
	          p.initialized = true;
	          if (p.params.onMonthAdd) {
	              p.months.each(function () {
	                  p.params.onMonthAdd(p, this);
	              });
	          }
	          if (p.params.onOpen) p.params.onOpen(p);
	      };

	      // Close
	      p.close = function () {
	          if (!p.opened || p.inline) return;
	          p.animating = false;  //有可能还有动画没做完，因此animating设置还没改。
	          if (inPopover()) {
	              $.closePicker(p.popover);
	              return;
	          }
	          else {
	              $.closePicker(p.container);
	              return;
	          }
	      };

	      // Destroy
	      p.destroy = function () {
	          p.close();
	          if (p.params.input && p.input.length > 0) {
	              p.input.off('click focus', openOnInput);
	              p.input.data("calendar", null);
	          }
	          $('html').off('click', closeOnHTMLClick);
	      };

	      if (p.inline) {
	          p.open();
	      }

	      return p;
	  };

	  var format = function(d) {
	    return d < 10 ? "0"+d : d;
	  }


	  $.fn.calendar = function (params, args) {
	      params = params || {};
	      return this.each(function() {
	        var $this = $(this);
	        if(!$this[0]) return;
	        var p = {};
	        if($this[0].tagName.toUpperCase() === "INPUT") {
	          p.input = $this;
	        } else {
	          p.container = $this;
	        }

	        var calendar = $this.data("calendar");

	        if(!calendar) {
	          if(typeof params === typeof "a") {
	          } else {
	            if(!params.value && $this.val()) params.value = [$this.val()];
	            //默认显示今天
	            if(!params.value) {
	              var today = new Date();
	              params.value = [today.getFullYear() + "-" + format(today.getMonth() + 1) + "-" + format(today.getDate())];
	            }
	            calendar = $this.data("calendar", new Calendar($.extend(p, params)));
	          }
	        }

	        if(typeof params === typeof "a") {
	          calendar[params].call(calendar, args);
	        }
	      });
	  };

	  defaults = $.fn.calendar.prototype.defaults = {
	    value: undefined, // 通过JS赋值，注意是数组
	    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	    monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	    dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
	    dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
	    firstDay: 1, // First day of the week, Monday
	    weekendDays: [0, 6], // Sunday and Saturday
	    multiple: false,
	    dateFormat: 'yyyy-mm-dd',
	    direction: 'horizontal', // or 'vertical'
	    minDate: null,
	    maxDate: null,
	    touchMove: true,
	    animate: true,
	    closeOnSelect: true,
	    monthPicker: true,
	    monthPickerTemplate: 
	        '<div class="picker-calendar-month-picker">' +
	            '<a href="javascript:;" class="link icon-only picker-calendar-prev-month"><i class="icon icon-prev"></i></a>' +
	            '<div class="current-month-value"></div>' +
	            '<a href="javascript:;" class="link icon-only picker-calendar-next-month"><i class="icon icon-next"></i></a>' +
	        '</div>',
	    yearPicker: true,
	    yearPickerTemplate: 
	        '<div class="picker-calendar-year-picker">' +
	            '<a href="javascript:;" class="link icon-only picker-calendar-prev-year"><i class="icon icon-prev"></i></a>' +
	            '<span class="current-year-value"></span>' +
	            '<a href="javascript:;" class="link icon-only picker-calendar-next-year"><i class="icon icon-next"></i></a>' +
	        '</div>',
	    weekHeader: true,
	    // Common settings
	    scrollToInput: true,
	    inputReadOnly: true,
	    convertToPopover: true,
	    onlyInPopover: false,
	    toolbar: true,
	    toolbarCloseText: 'Done',
	    toolbarTemplate: 
	        '<div class="toolbar">' +
	            '<div class="toolbar-inner">' +
	                '{{yearPicker}}' +
	                '{{monthPicker}}' +
	                // '<a href="#" class="link close-picker">{{closeText}}</a>' +
	            '</div>' +
	        '</div>',
	    /* Callbacks
	    onMonthAdd
	    onChange
	    onOpen
	    onClose
	    onDayClick
	    onMonthYearChangeStart
	    onMonthYearChangeEnd
	    */
	  };

	}($);

	/* global $:true */
	/* jshint unused:false*/

	+ function($) {
	  "use strict";


	  var defaults;

	  var formatNumber = function (n) {
	    return n < 10 ? "0" + n : n;
	  }

	  var Datetime = function(input, params) {
	    this.input = $(input);
	    this.params = params;

	    this.initMonthes = ('01 02 03 04 05 06 07 08 09 10 11 12').split(' ');

	    this.initYears = (function () {
	      var arr = [];
	      for (var i = 1950; i <= 2030; i++) { arr.push(i); }
	      return arr;
	    })();

	    var p = $.extend({}, params, this.getConfig());
	    $(this.input).picker(p);
	  }

	  Datetime.prototype = {
	    getDays : function(max) {
	      var days = [];
	      for(var i=1; i<= (max||31);i++) {
	        days.push(i < 10 ? "0"+i : i);
	      }
	      return days;
	    },

	    getDaysByMonthAndYear : function(month, year) {
	      var int_d = new Date(year, parseInt(month)+1-1, 1);
	      var d = new Date(int_d - 1);
	      return this.getDays(d.getDate());
	    },
	    getConfig: function() {
	      var today = new Date(),
	          params = this.params,
	          self = this,
	          lastValidValues;

	      var config = {
	        rotateEffect: false,  //为了性能
	        cssClass: 'datetime-picker',

	        value: [today.getFullYear(), formatNumber(today.getMonth()+1), formatNumber(today.getDate()), formatNumber(today.getHours()), (formatNumber(today.getMinutes()))],

	        onChange: function (picker, values, displayValues) {
	          var cols = picker.cols;
	          var days = self.getDaysByMonthAndYear(values[1], values[0]);
	          var currentValue = values[2];
	          if(currentValue > days.length) currentValue = days.length;
	          picker.cols[4].setValue(currentValue);

	          //check min and max
	          var current = new Date(values[0]+'-'+values[1]+'-'+values[2]);
	          var valid = true;
	          if(params.min) {
	            var min = new Date(typeof params.min === "function" ? params.min() : params.min);

	            if(current < +min) {
	              picker.setValue(lastValidValues);
	              valid = false;
	            } 
	          }
	          if(params.max) {
	            var max = new Date(typeof params.max === "function" ? params.max() : params.max);
	            if(current > +max) {
	              picker.setValue(lastValidValues);
	              valid = false;
	            }
	          }

	          valid && (lastValidValues = values);

	          if (self.params.onChange) {
	            self.params.onChange.apply(this, arguments);
	          }
	        },

	        formatValue: function (p, values, displayValues) {
	          return self.params.format(p, values, displayValues);
	        },

	        cols: [
	          {
	            values: (function () {
	              var years = [];
	              for (var i=1950; i<=2050; i++) years.push(i);
	              return years;
	            })()
	          },
	          {
	            divider: true,  // 这是一个分隔符
	            content: params.yearSplit
	          },
	          {
	            values: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
	          },
	          {
	            divider: true,  // 这是一个分隔符
	            content: params.monthSplit
	          },
	          {
	            values: (function () {
	              var dates = [];
	              for (var i=1; i<=31; i++) dates.push(formatNumber(i));
	              return dates;
	            })()
	          },
	          
	        ]
	      }

	      if (params.dateSplit) {
	        config.cols.push({
	          divider: true,
	          content: params.dateSplit
	        })
	      }

	      config.cols.push({
	        divider: true,
	        content: params.datetimeSplit
	      })

	      var times = self.params.times();
	      if (times && times.length) {
	        config.cols = config.cols.concat(times);
	      }

	      var inputValue = this.input.val();
	      if(inputValue) config.value = params.parse(inputValue);
	      if(this.params.value) {
	        this.input.val(this.params.value);
	        config.value = params.parse(this.params.value);
	      }

	      return config;
	    }
	  }

	  $.fn.datetimePicker = function(params) {
	    params = $.extend({}, defaults, params);
	    return this.each(function() {
	      if(!this) return;
	      var $this = $(this);
	      var datetime = $this.data("datetime");
	      if(!datetime) $this.data("datetime", new Datetime(this, params));
	      return datetime;
	    });
	  };

	  defaults = $.fn.datetimePicker.prototype.defaults = {
	    input: undefined, // 默认值
	    min: undefined, // YYYY-MM-DD 最大最小值只比较年月日，不比较时分秒
	    max: undefined,  // YYYY-MM-DD
	    yearSplit: '-',
	    monthSplit: '-',
	    dateSplit: '',  // 默认为空
	    datetimeSplit: ' ',  // 日期和时间之间的分隔符，不可为空
	    times: function () {
	      return [  // 自定义的时间
	        {
	          values: (function () {
	            var hours = [];
	            for (var i=0; i<24; i++) hours.push(formatNumber(i));
	            return hours;
	          })()
	        },
	        {
	          divider: true,  // 这是一个分隔符
	          content: ':'
	        },
	        {
	          values: (function () {
	            var minutes = [];
	            for (var i=0; i<60; i++) minutes.push(formatNumber(i));
	            return minutes;
	          })()
	        }
	      ];
	    },
	    format: function (p, values) { // 数组转换成字符串
	      return p.cols.map(function (col) {
	        return col.value || col.content;
	      }).join('');
	    },
	    parse: function (str) {
	      // 把字符串转换成数组，用来解析初始值
	      // 如果你的定制的初始值格式无法被这个默认函数解析，请自定义这个函数。比如你的时间是 '子时' 那么默认情况这个'时'会被当做分隔符而导致错误，所以你需要自己定义parse函数
	      // 默认兼容的分隔符
	      var t = str.split(this.datetimeSplit);
	      return t[0].split(/\D/).concat(t[1].split(/:|时|分|秒/)).filter(function (d) {
	        return !!d;
	      })
	    }
	  }

	}($);

	/*======================================================
	************   Picker   ************
	======================================================*/
	/* global $:true */

	+ function($) {
	  "use strict";


	  //Popup 和 picker 之类的不要共用一个弹出方法，因为这样会导致 在 popup 中再弹出 picker 的时候会有问题。

	  $.openPopup = function(popup, className) {

	    $.closePopup();

	    popup = $(popup);
	    popup.show();
	    popup.width();
	    popup.addClass("weui-popup__container--visible");
	    var modal = popup.find(".weui-popup__modal");
	    modal.width();
	    modal.transitionEnd(function() {
	      modal.trigger("open");
	    });
	  }


	  $.closePopup = function(container, remove) {
	    container = $(container || ".weui-popup__container--visible");
	    container.find('.weui-popup__modal').transitionEnd(function() {
	      var $this = $(this);
	      $this.trigger("close");
	      container.hide();
	      remove && container.remove();
	    })
	    container.removeClass("weui-popup__container--visible")
	  };


	  $(document).on("click", ".close-popup, .weui-popup__overlay", function() {
	    $.closePopup();
	  })
	  .on("click", ".open-popup", function() {
	    $($(this).data("target")).popup();
	  })
	  .on("click", ".weui-popup__container", function(e) {
	    if($(e.target).hasClass("weui-popup__container")) $.closePopup();
	  })

	  $.fn.popup = function() {
	    return this.each(function() {
	      $.openPopup(this);
	    });
	  };

	}($);

	/* ===============================================================================
	************   Notification ************
	=============================================================================== */
	/* global $:true */
	+function ($) {
	  "use strict";

	  var noti, defaults, timeout, start, diffX, diffY;

	  var touchStart = function(e) {
	    var p = $.getTouchPosition(e);
	    start = p;
	    diffX = diffY = 0;
	    noti.addClass("touching");
	  };
	  var touchMove = function(e) {
	    if(!start) return false;
	    e.preventDefault();
	    e.stopPropagation();
	    var p = $.getTouchPosition(e);
	    diffX = p.x - start.x;
	    diffY = p.y - start.y;
	    if(diffY > 0) {
	      diffY = Math.sqrt(diffY);
	    }

	    noti.css("transform", "translate3d(0, "+diffY+"px, 0)");
	  };
	  var touchEnd = function() {
	    noti.removeClass("touching");
	    noti.attr("style", "");
	    if(diffY < 0 && (Math.abs(diffY) > noti.height()*0.38)) {
	      $.closeNotification();
	    }

	    if(Math.abs(diffX) <= 1 && Math.abs(diffY) <= 1) {
	      noti.trigger("noti-click");
	    }

	    start = false;
	  };

	  var attachEvents = function(el) {
	    el.on($.touchEvents.start, touchStart);
	    el.on($.touchEvents.move, touchMove);
	    el.on($.touchEvents.end, touchEnd);
	  };

	  $.notification = $.noti = function(params) {
	    params = $.extend({}, defaults, params);
	    noti = $(".weui-notification");
	    if(!noti[0]) { // create a new notification
	      noti = $('<div class="weui-notification"></div>').appendTo(document.body);
	      attachEvents(noti);
	    }

	    noti.off("noti-click"); //the click event is not correct sometime: it will trigger when user is draging.
	    if(params.onClick) noti.on("noti-click", function() {
	      params.onClick(params.data);
	    });

	    noti.html($.t7.compile(params.tpl)(params));

	    noti.show();

	    noti.addClass("weui-notification--in");
	    noti.data("params", params);

	    var startTimeout = function() {
	      if(timeout) {
	        clearTimeout(timeout);
	        timeout = null;
	      }

	      timeout = setTimeout(function() {
	        if(noti.hasClass("weui-notification--touching")) {
	          startTimeout();
	        } else {
	          $.closeNotification();
	        }
	      }, params.time);
	    };

	    startTimeout();

	  };

	  $.closeNotification = function() {
	    timeout && clearTimeout(timeout);
	    timeout = null;
	    var noti = $(".weui-notification").removeClass("weui-notification--in").transitionEnd(function() {
	      $(this).remove();
	    });

	    if(noti[0]) {
	      var params = $(".weui-notification").data("params");
	      if(params && params.onClose) {
	        params.onClose(params.data);
	      }
	    }
	  };

	  defaults = $.noti.prototype.defaults = {
	    title: undefined,
	    text: undefined,
	    media: undefined,
	    time: 4000,
	    onClick: undefined,
	    onClose: undefined,
	    data: undefined,
	    tpl:  '<div class="weui-notification__inner">' +
	            '{{#if media}}<div class="weui-notification__media">{{media}}</div>{{/if}}' +
	            '<div class="weui-notification__content">' +
	            '{{#if title}}<div class="weui-notification__title">{{title}}</div>{{/if}}' +
	            '{{#if text}}<div class="weui-notification__text">{{text}}</div>{{/if}}' +
	            '</div>' +
	            '<div class="weui-notification__handle-bar"></div>' +
	          '</div>'
	  };

	}($);

	+ function($) {
	  "use strict";

	  var timeout;

	  $.toptip = function(text, duration, type) {
	    if(!text) return;
	    if(typeof duration === typeof "a") {
	      type = duration;
	      duration = undefined;
	    }
	    duration = duration || 3000;
	    var className = type ? 'bg-' + type : 'bg-danger';
	    var $t = $('.weui-toptips').remove();
	    $t = $('<div class="weui-toptips"></div>').appendTo(document.body);
	    $t.html(text);
	    $t[0].className = 'weui-toptips ' + className

	    clearTimeout(timeout);

	    if(!$t.hasClass('weui-toptips_visible')) {
	      $t.show().width();
	      $t.addClass('weui-toptips_visible');
	    }

	    timeout = setTimeout(function() {
	      $t.removeClass('weui-toptips_visible').transitionEnd(function() {
	        $t.remove();
	      });
	    }, duration);
	  }
	}($);

	/* global $:true */
	+ function($) {
	  "use strict";
	  var Slider = function (container, arg) {
	    this.container = $(container);
	    this.handler = this.container.find('.weui-slider__handler')
	    this.track = this.container.find('.weui-slider__track')
	    this.value = this.container.find('.weui-slider-box__value')
	    this.bind()
	    if (typeof arg === 'function') {
	      this.callback = arg
	    }
	  }

	  Slider.prototype.bind = function () {
	    this.container
	      .on($.touchEvents.start, $.proxy(this.touchStart, this))
	      .on($.touchEvents.end, $.proxy(this.touchEnd, this));
	    $(document.body).on($.touchEvents.move, $.proxy(this.touchMove, this)) // move even outside container
	  }

	  Slider.prototype.touchStart = function (e) {
	    e.preventDefault()
	    this.start = $.getTouchPosition(e)
	    this.width = this.container.find('.weui-slider__inner').width()
	    this.left = parseInt(this.container.find('.weui-slider__handler').css('left'))
	    this.touching = true
	  }

	  Slider.prototype.touchMove = function (e) {
	    if (!this.touching) return true
	    var p = $.getTouchPosition(e)
	    var distance = p.x - this.start.x
	    var left = distance + this.left
	    var per = parseInt(left / this.width * 100)
	    if (per < 0) per = 0
	    if (per > 100) per = 100
	    this.handler.css('left', per + '%')
	    this.track.css('width', per + '%')
	    this.value.text(per)
	    this.callback && this.callback.call(this, per)
	    this.container.trigger('change', per)
	  }

	  Slider.prototype.touchEnd = function (e) {
	    this.touching = false
	  }

	  $.fn.slider = function (arg) {
	    this.each(function () {
	      var $this = $(this)
	      var slider = $this.data('slider')
	      if (slider) return slider;
	      else $this.data('slider', new Slider(this, arg))
	    })
	  }
	}($);


/***/ }),

/***/ 571:
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(572);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(537)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../node_modules/css-loader/index.js!./iconfont.css", function() {
				var newContent = require("!!../node_modules/css-loader/index.js!./iconfont.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),

/***/ 572:
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(536)();
	// imports


	// module
	exports.push([module.id, "\n@font-face {font-family: \"iconfont\";\n  src: url(" + __webpack_require__(573) + "); /* IE9*/\n  src: url(" + __webpack_require__(573) + "#iefix) format('embedded-opentype'), \n  url(" + __webpack_require__(574) + ") format('woff'), \n  url(" + __webpack_require__(575) + ") format('truetype'), \n  url(" + __webpack_require__(576) + "#iconfont) format('svg'); /* iOS 4.1- */\n}\n\n.iconfont {\n  font-family:\"iconfont\" !important;\n  font-size:16px;\n  font-style:normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.icon-qiandai:before { content: \"\\E629\"; }\n\n.icon-icon:before { content: \"\\E616\"; }\n\n.icon-15:before { content: \"\\E61E\"; }\n\n.icon-fuzhi:before { content: \"\\E600\"; }\n\n.icon-radio:before { content: \"\\E603\"; }\n\n.icon-tn-radio:before { content: \"\\E621\"; }\n\n", ""]);

	// exports


/***/ }),

/***/ 573:
/***/ (function(module, exports) {

	module.exports = "data:application/vnd.ms-fontobject;base64,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"

/***/ }),

/***/ 574:
/***/ (function(module, exports) {

	module.exports = "data:application/font-woff;base64,d09GRgABAAAAABiIABAAAAAAKHAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAABbAAAABoAAAAcdkStSkdERUYAAAGIAAAAHQAAACAANwAET1MvMgAAAagAAABHAAAAVldSWTZjbWFwAAAB8AAAAGEAAAF6s4K47WN2dCAAAAJUAAAAGAAAACQNYf74ZnBnbQAAAmwAAAT8AAAJljD3npVnYXNwAAAHaAAAAAgAAAAIAAAAEGdseWYAAAdwAAAOTgAAF6ijq3CdaGVhZAAAFcAAAAAwAAAANg00TndoaGVhAAAV8AAAAB0AAAAkB6oDiGhtdHgAABYQAAAAHgAAAB4ObwDcbG9jYQAAFjAAAAAWAAAAFhoaFV5tYXhwAAAWSAAAACAAAAAgA0IJ3W5hbWUAABZoAAABQwAAAj0eS7xKcG9zdAAAF6wAAABCAAAAWyTY+PZwcmVwAAAX8AAAAJUAAACVpbm+ZnicY2BgYGQAgjO2i86D6KvMrbYwGgBD5wWwAAB4nGNgZGBg4ANiCQYQYGJgBEJOIGYB8xgABK0APAAAAHicY2Bk/sP4hYGVgYNpJtMZBgaGfgjN+JrBmJGTgYGJgY2ZAQYYBRgQICDNNYXBgaHimSZzw/8GhhjmOoY6kBqQHABTYA0tAHicY2BgYGaAYBkGRgYQKAHyGMF8FoYIIC3EIAAUYQKyKp4xPGN+JvZM7pniM83//8GqMcT+d0uxSDFJfpB8Kflc8gHUTDTAyMYAl2AEmcyErgCbLuoAZtoZTRIAAOF3F8sAAAB4nGNgQANGDEbMEv8fMtf9b4LRAEVeCF94nJ1VaXfTRhSVvGRP2pLEUETbMROnNBqZsAUDLgQpsgvp4kBoJegiJzFd+AN87Gf9mqfQntOP/LTeO14SWnpO2xxL776ZO2/TexNxjKjseSCuUUdKXveksv5UKvGzpK7rXp4o6fWSumynnpIWUStNlczF/SO5RHUuVrJJsEnG616inqs874PSSzKsKEsi2iLayrwsTVNPHD9NtTi9ZJCmgZSMgp1Ko48QqlEvkaoOZUqHXr2eipsFUjYa8aijonoQKu4czzmljTpgpHKVw1yxWW3ke0nW8/qP0kSn2Nt+nGDDY/QjV4FUjMzA9jQeh08k09FeIjORf+y4TpSFUhtcAK9qsMegSvGhuPFBthPI1HjN8XVRqTQyFee6z7LZLB2PlRDlwd/YoZQbur+Ds9OmqFZjcfvAMwY5KZQoekgWgA5Tmaf2CNo8tEBmjfqj4hzwdQgvshBlKs+ULOhQBzJndveTYtrdSddkcaBfBjJvdveS3cfDRa+O9WW7vmAKZzF6khSLixHchzLrp0y71AhHGRdzwMU8XuLWtELIyAKMSiPMUVv4ntmoa5wdY290Ho/VU2TSRfzdTH49OKlY4TjLekfcSJy7x67rwlUgiwinGu8njizqUGWw+vvSkussOGGYZ8VCxZcXvncR+S8xbj+Qd0zhUr5rihLle6YoU54xRYVyGYWlXDHFFOWqKaYpa6aYoTxrilnKc0am/X/p+334Pocz5+Gb0oNvygvwTfkBfFN+CN+UH8E3pYJvyjp8U16Eb0pt4G0pUxGqmLF0+O0lWrWhajkzuMA+D2TNiPZFbwTSMEp11Ukpdb+lVf4k+euix2Prk5K6NWlsiLu6abP4+HTGb25dMuqGnatPjCPloT109dg0oVP7zeHfzl3dKi65q4hqw6g2IpgEgDbotwLxTfNsOxDzll18/EMwAtTPqTVUU3Xt1JUaD/K8q7sYnuTA44hjoI3rrq7ASxNTVkPz4WcpMhX7g7yplWrnsHX5ZFs1hzakwtsi9pVknKbtveRVSZWV96q0Xj6fhiF6ehbXhLZs3cmkEqFRM87x8K4qRdmRlnLUP0Lnl6K+B5xxdkHrwzHuRN1BtTXsdPj5ZiNrCyaGprS9E6BkLF0VY1HlWZxjdA1rHW/cEp6upycW8Sk2mY/CSnV9lI9uI80rdllm0ahKdXSX9lnsqzb9MjtoWB1nP2mqNu7qYVuNKlI9Vb4GtAd2Vt34UA8rPuqgUVU12+jayGM0LmvGfwzIYlz560arJtPv4JZqp81izV1Bc9+YLPdOL2+9yX4r56aRpv9Woy0jl/0cjvltEeDfOSh2U9ZAvTVpiHEB2QsYLtVE5w7N3cYg4jr7H53T/W/NwiA5q22N2Tz14erpKJI7THmcZZtZ1vUozVG0k8Q+RWKrw4nBTY3hWG7KBgbk7j+s38M94K4siw+8bSSAuM/axKie6uDuHlcjNOwruQ8YmWPHuQ2wA+ASxObYtSsdALvSJecOwGfkEDwgh+AhOQS75NwE+Jwcgi/IIfiSHIKvyLkF0COHYI8cgkfkEDwmpw2wTw7BE3IIviaH4BtyWgAJOQQpOQRPySF4ZmRzUuZvqch1oO8sugH0ve0aKFtQfjByZcLOqFh23yKyDywi9dDI1Qn1iIqlDiwi9blFpP5o5NqE+hMVS/3ZIlJ/sYjUF8aXmYGU13oveUcHfwIrvqx+AAEAAf//AA94nNU4a3hc1XFz5tzX3tfu3Xvv3n1Y+7R2LQsk7a5217KwLT+EsWRJlo2N1xiBjZElGyg0ITiBhId5BghJeCbYvAIOgTQFGzAU0kC/tkAhQFKSL6HkC3xtCoF+LaFNk37BUueuJFs2NB99/Ej3njszZ86cOXPPY2bOggjHTb7Fn+ZRiEAHLIS1MMIu7H/YXrOxpw8ZGKYB5ihwk5l8BJiisM0hFlBUKTBiMV0SJH0ENEEbDzIFJF2RNoIqiyhoqlAPM9M0hsEwVHNZov9hjzT2/x6NSkAd/W+qjJLK1Z9MpTD6iXT2DB6jjo2SPpMp2/5nCuv1es+8deu6u0tFz1s3sm7k1I3da7vX9i+vVYoLSwu9Dq9j2CpGrXlujx1pZVIry5rYxDKVznylsw1bmZsRXSfimJiT8q2skJFJopBtw0XMy0pOpFyqduY9STZ5knVLpWqhjRXyBVbpXIzdrBRpYiyWiK8LN88J8y8zNVpIXjnRh/cyN5UzzZSZPn5i1XFNWScWS9vKhXo4rBvh8PWKJGoCCkGzefnwmp65XiQgBkRRmrhPDMbdp1MtmGJ6rBBf3RKaIxjpRHjLNZ3ewoXNXoCxSy9ldiJtfnOJFbeoXByP2HPNkKFE40bOsh124T9oUVtvyv89gATlyQf4y3wtBCEF7XAWXAH3w4Geh6+/bjPXldM2YTRxztnr1g6KMXOIRWJCD0QTZiJKCxOJObGIM5pkYWiyw031OcyGONjxusgQBI4oAdY1GSU1gIouKXXLQD1h6gOQ8EJBbsYSZh1IQ2wAYjFn2GVOzOktd9y997abb7zhkovPP3fjKRtOXt1/0om9K7oXdJxV3tbe1jq/ZV4hn8tm0qlkIh6L2pbVKKGU18oyxcZSFDNFfzVy7jF1+Zg6y2RN3sRyBF3LSWLZy5RqHdVytSYvZpVapVyqlaoVqlUrVmcb55LsPzUpl8m2cWIt5uVMKcld25luaGW+XI42zUwTXj2xQTVNlT3ow9n0vokPGxWhAa8+9EoglI3aC5RQznPcZFJTsVSIIwsphqqz2rwYw5CiR+xoNnQ2s7mIlunlJkKCnoo6ViRpKux9xUy64b0OF7hlRkgLiSoTJcv1G38lmynXYu8bjmk6xgHTNqlMI3yeafb8plU+nHPo1aYWR2Mumo5rZFR1lcuYabvJZmxvmm9r7MM3MnGBy7ISZqrVHGP/Ep8bpv0WCM+NTzyTiYs0SdT01BxftiXWbKmsIQcACEsnn+XP8B7aZ2lo7zkuwZCzHgABxmizCGPAkY8BMoYDgMjWAkN2ouPGvJBotwIdR1qi0mLsbGMek7LtLN9ZLaUYq5YiDm5+fN+ulSt37Xv8fh+lJ/YZzeYBI9Fs3MS6jeYE71m56/4jIhMT9xvGAaM53miON0MY+id388f453EPPoQH8Xl8CV/Hd/DfySSXz+fH8Ta+iPfyIX463ykZSyfhLXgTfgZvwE/hJ/AjeA1+CD+Al+H78CL8DTwPz8FfwV/CX8Cz8Ax8D74LT8NT8GfwBByEx+ExeBQOwH54BP4UvgN/At+Gh+BB+BY8AN+EfXTy7oNvwL1wD9wNd8GdsBf2wB3wdfga3A63wa1wC9wMN8FX4SvwZbgRvgQ3wPVwHXwRroVr4Gq4Cq6k07sbLofL4FK4BL4An4eL4SL4HHwWdsGF8Bm4AD4Nn4I/hvPhPPgjOBfOgbNhJ+yAcVqE7TBKp38bnAlbYQucAafDCJwGm+FU2AR12AinwAZYDyfDOopNw7AGhmAQBmA19EMfrIKTYCWcCL2wApbDMlgKPbAEFsMiOAG6KZp1wQKoQRU6oQwlKJKfaYNWmA95aKav9sDFSXyLCYzDf8Bv4QP4FbwH74JKsdDDN/DvaPdYEMFX8ftEhWkz/RQYzIUw/oTqSDtqLv4T/pKoEAT5mfhr/DfgYEOIn8pPIW4ObL4en8U/J64DOX4y9TbB4f2Es6DyNGENsnwVrfPxtNqtIEICNH4iX0qrb+J+qschwJdwnWv4taUn4e24Gy/Hy/BSvISsjEEc9+E3aCQFYnwx7RmO9+Dd1CsKCt5C2hEkvoBXCIuAvMxLeDPehNfhF/FakMkqEVyasX+EX5CEx8/i2/xv4XneTDjB55GGAPcIxrlFMMZlglG8uqFZgSX9D2sUgh8Az424XmS0heVsx8iNFBiddsc0RkHVsxl1ZB7LanpW2waBRDwRiFNoFZMiT1JoBddjbp2mm6bZqjczgLk0qXWa62AoHKzTvNq5kF1PMwMyupHZRNOoq45ezzNtDksEtESdJiimxGN1MkdCRarTp6MYxXqKNYHQJKyXmSgmh4FcW9JPGXSy955j7fXNNP8PzMwU0CRTddOo/68Nbfp/NbE9Dx5lqp1zRo+yVVezo38oxlJOtvQMvoWfwdfwNfgCPU/iE2QE8DG+nbg7qW0ntZ3eeDfxjXwtHyY/fAKv8Srv4O18Ls/xLM/wBI/zEA/yAFc4uRA8hL/D3+Jv8AN8H9/Dd/Ft/AW+iT/HH+Nr+Aq+TCO9RO+L9LyAz+D38Any+E/SexAfx0fxAD6M36E48CDej/fhnbgXv4I34g14PV6FV9JpFcn/7KHotIf8l0lpoExJYi4ruYsSxUW8uAiLi1ixMgWmny42BaYLbxS50mW4XbLbJbhdOFOYD4sNzKZwsfEcJopNbDYxA44UnIFThTeK2CiBYtNk0+d8VUlWLlZkospElaq1YmUxqxWtzjzL5guU8kRKtYjrSLkqvT4nR7FW9InO6SY/46llc6XmGclGv9lds3n5qLYwxekZZbZDGXExm68USV+5SDJurbLA5zRGKHeUupjkdni1oly0p8WmddX8IYggwcI0lS9M2VyeEin4Woqdfl4g4Q8v6L1iy9ar+JVnMEbgjKtwaCu7bOLt1eOcsd63enHHwMEdA31jIttxx8SLA+OIPjOwuSP8FGNs4tIpkf5xgWrT8v1jfIrwdYzfsWOq+0E2uAN7z2dsYAcjTKmNF3jdZzVE31lbxv4T5A1V7B9fco5BSU7veef34vbhVWPSDlKBWzuf6xoa6qKUh9oOv3/YP/wYEmcj/Cj4mPcImk0hm10+HhxFHEUe83yUnI2OArPw7NoxzNnov3yPBR8DZ9ARHBAWrE5XxNrqga7mwKoia+kaOvRoZ1oShVJJkjLV15fWSinCViUtimK5LIuGYbTj0rdLJVnMVMupgLBeFfiUcOkmXyBT60zLIruguqxaTEuZQ6fQR0VraUkuW0Q1tVTTKEllTVVW6BOPVTOSNKXqoaLaLEmJjk2GZQUKPrWhLJimIvijSunqllJKTtdqS2tAudTqye/yB3g3ZVNVygQ3UW75BcpJ76D89ll4ibLkf/YnsmeS7rMgLqxhXOJMjq9ehQHlHabGfswi3mvnoaH/4AU0jeeuTBm6GDT/+kEMuXRLcG6/BQVb73FsFNgS8LSIRvENIroW0beBYIdtIewHLxGYWE9Q/IjLEK/TxVZWJNmPRIGYEqCLJkS1WLRO6ZrmqVoddDBMnRIEE4KuScHNBQddxw9yaIewTulj2LLDdbA4twbAsvgwcIv3Mjj04b9+8O4vf/6zp5/a/8i3Hrj7rttu/dIN115z9VW7Lvz0+ePbT9t88rr+vmVLuxYUOwr5eMyLhC1FhizLzvGDhSRXim0+KlpFx6XbqO+MyQOXZzxwc7VWLXkRL9LwsVnfu3V6R5xug1H5/RyZ/OwMs1wqS01sptqA5CndrHik57RvLRzNcWZxOmuHjfJ8/VM+uNAgp91w4fCovoLKMSpnKcDnurakhMsf2y3s3sx3H9yNbGBcuOLQmVqkemc1oinKDMGWv7acHa7x5a8u58e0cd7X5jhDDcaKccaEwQqRLY32sUH2I82t3lWNqAG+4pUVqMzU2Iq/XXG4ElAjRLiasl+NFGrDFRbwsbphAfdbhgKB6qAqKdSDHZY83BevTcZ3Vvr6KhPzkdUG09X+/up8ZWU7S9YGlweNVMoI6q4W0tNpPaS5p3d0CFzVp/kqr7e3S5KmBY102ghqmnRqRwcXVJ0LRjNP+xJCvUPT7Uaj8FUfcqGj5azD8lKj/ykz+gTe6L9mZriZgdx00PCkeUpe4NowkXLADsuFqZ5pllMUhWzx+3J1aEo32Tw9iAuNe3tpcj9/mQ/SLasJ5vZkiMcReF1ouNwBwfeEw/5lvdd1vY9e1lm2jXUuZqUkc0yWw5GnH7qor++ih6bQxG/G9m/fvv9VH4zxwcN8H334u+kGAv6YcN/kk3wzX0G3yTrdkB/pcW+54jNc1e4dR1HZxiSR9+QZWzz1l2kVgHEGfBTIc4rSCHCd0UZQ6wYLmEwRA0qdUlEQRGE9aBob9kOPqlH+XDu6ozD6CXvWe1L33HXn3ttvvf66Cz513rnn7Nx+1tYtp526fl3vinmFRDwaDLayJPOoRLxytUaH3S9IZ8PEbH7q3Ewd3bz/32Ebk00mS20oSxFow6m/E3OSzzS5l+RlmtyayVrZTMJDmVWts9rNfMLHNdLXztpYrUqHLsWqter0EZxyELJbLjWSpSDlfy7r0WOqaEqS/IosibqoOmFF47IaoBuUY0iSKKlOVFcljpIoBgQlbViGqdhOWDZV7Ajmy9Gm1mBYf9OwzPnxZDlrBJTS+s8ODezaWAnscYJne3Y4hmMhBx1zbCwUJohziOcpum7OM6RgXzwStsOKmdWcubQ/bTe+zXXCkW1sayv+OuAFFUfVdFUL0HgxXQyFggJHcmAUACWuqJoqIBe4LCqiogXJRglFLXXova2ru9xoqxUOhWyrxYsvG6oXj6uvPL6wbGNpvZky42i5KUs3raodjaTnRF07EshYQVOTQ30xxwqFJMP0Uopt21406eimg9iZgf8EXvFrzgAAeJxjYGRgYADimP7jLfH8Nl8Z5FkYQOAqc6stnNb538x8jrkWyOVgYAKJAgAjHwo4eJxjYGRgYK7738QQw8IAAsznGBgZUAErAFY9AzsAAAAEAAAAAAAAAAFVAAAD6QAsBAAAMwBBAEsATAAyAKQAAAAAAAAAAAAAATwCcAK+CF4KTAqQC9QAAAABAAAACgNsABIAAAAAAAIAVABiAGwAAAJlBg0AAAAAeJx9kLtOw0AQRa8TJwoSRURLM7IokmKt9SMij5qEhpY+SuzEUrAl23mIT0DUlPANtHwd15uloYgtz5zZuZ7HArjGBxw0j4Mebiy30MXQcht3eLXsUvNtuYMHZ265i57zSaXjXvGkb/5quMX6t5bbeIS27FLzZbmDN/xY7qLvvCPDCgVypMbWQLYq8rTISU9IsKZgjxcGyTrb08+trvElNpQIQvjsJpjy+1/vfBohgKJV1GryPQuxx7woN4mEvpap/PUlRoGKVKgDqi6M98zeJSpKmpSwajPFjFTzTbHk4DVzWyrOkwxwoMLHBDFvXDjNjnZsqKQdmS0UFmYnbaOTqR0bPtJ6zHsmSo2tOEpSVlmRS+DrmdR1utzXxTbjLoOD9ifxUNROxqJKGWlRCwk13UmCWNRRvIUnKhVVXVr2FxoKWSUAeJxjYGLAD7iAmJGBiSGakYmRmZGFkZWRjZGdNa20KiOTtSgxJTOfJTM5P4/J0JSjJE8XLMBemJmYl5KYCQD/cAzkAABLuADIUlixAQGOWbkIAAgAYyCwASNEILADI3CwDkUgIEu4AA5RS7AGU1pYsDQbsChZYGYgilVYsAIlYbABRWMjYrACI0SzCgkFBCuzCgsFBCuzDg8FBCtZsgQoCUVSRLMKDQYEK7EGAUSxJAGIUViwQIhYsQYDRLEmAYhRWLgEAIhYsQYBRFlZWVm4Af+FsASNsQUARAAAAA=="

/***/ }),

/***/ 575:
/***/ (function(module, exports) {

	module.exports = "data:application/x-font-ttf;base64,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"

/***/ }),

/***/ 576:
/***/ (function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiID4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8bWV0YWRhdGE+CkNyZWF0ZWQgYnkgRm9udEZvcmdlIDIwMTIwNzMxIGF0IEZyaSBNYXIgMzEgMTI6MDI6MDUgMjAxNwogQnkgYWRtaW4KPC9tZXRhZGF0YT4KPGRlZnM+Cjxmb250IGlkPSJpY29uZm9udCIgaG9yaXotYWR2LXg9IjEwMjQiID4KICA8Zm9udC1mYWNlIAogICAgZm9udC1mYW1pbHk9Imljb25mb250IgogICAgZm9udC13ZWlnaHQ9IjUwMCIKICAgIGZvbnQtc3RyZXRjaD0ibm9ybWFsIgogICAgdW5pdHMtcGVyLWVtPSIxMDI0IgogICAgcGFub3NlLTE9IjIgMCA2IDMgMCAwIDAgMCAwIDAiCiAgICBhc2NlbnQ9Ijg5NiIKICAgIGRlc2NlbnQ9Ii0xMjgiCiAgICB4LWhlaWdodD0iNzkyIgogICAgYmJveD0iNDQgLTEyNSA5NzQgODkzIgogICAgdW5kZXJsaW5lLXRoaWNrbmVzcz0iMCIKICAgIHVuZGVybGluZS1wb3NpdGlvbj0iMCIKICAgIHVuaWNvZGUtcmFuZ2U9IlUrMDA3OC1FNjI5IgogIC8+CjxtaXNzaW5nLWdseXBoIAogLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSIubm90ZGVmIiAKIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iLm5vdGRlZiIgCiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9Ii5udWxsIiBob3Jpei1hZHYteD0iMCIgCiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9Im5vbm1hcmtpbmdyZXR1cm4iIGhvcml6LWFkdi14PSIzNDEiIAogLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJ4IiB1bmljb2RlPSJ4IiBob3Jpei1hZHYteD0iMTAwMSIgCmQ9Ik0yODEgNTQzcS0yNyAtMSAtNTMgLTFoLTgzcS0xOCAwIC0zNi41IC02dC0zMi41IC0xOC41dC0yMyAtMzJ0LTkgLTQ1LjV2LTc2aDkxMnY0MXEwIDE2IC0wLjUgMzB0LTAuNSAxOHEwIDEzIC01IDI5dC0xNyAyOS41dC0zMS41IDIyLjV0LTQ5LjUgOWgtMTMzdi05N2gtNDM4djk3ek05NTUgMzEwdi01MnEwIC0yMyAwLjUgLTUydDAuNSAtNTh0LTEwLjUgLTQ3LjV0LTI2IC0zMHQtMzMgLTE2dC0zMS41IC00LjVxLTE0IC0xIC0yOS41IC0wLjUKdC0yOS41IDAuNWgtMzJsLTQ1IDEyOGgtNDM5bC00NCAtMTI4aC0yOWgtMzRxLTIwIDAgLTQ1IDFxLTI1IDAgLTQxIDkuNXQtMjUuNSAyM3QtMTMuNSAyOS41dC00IDMwdjE2N2g5MTF6TTE2MyAyNDdxLTEyIDAgLTIxIC04LjV0LTkgLTIxLjV0OSAtMjEuNXQyMSAtOC41cTEzIDAgMjIgOC41dDkgMjEuNXQtOSAyMS41dC0yMiA4LjV6TTMxNiAxMjNxLTggLTI2IC0xNCAtNDhxLTUgLTE5IC0xMC41IC0zN3QtNy41IC0yNXQtMyAtMTV0MSAtMTQuNQp0OS41IC0xMC41dDIxLjUgLTRoMzdoNjdoODFoODBoNjRoMzZxMjMgMCAzNCAxMnQyIDM4cS01IDEzIC05LjUgMzAuNXQtOS41IDM0LjVxLTUgMTkgLTExIDM5aC0zNjh6TTMzNiA0OTh2MjI4cTAgMTEgMi41IDIzdDEwIDIxLjV0MjAuNSAxNS41dDM0IDZoMTg4cTMxIDAgNTEuNSAtMTQuNXQyMC41IC01Mi41di0yMjdoLTMyN3oiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0icWlhbmRhaSIgdW5pY29kZT0iJiN4ZTYyOTsiIApkPSJNMzIwIDc1N3ExMiAtOSAyNC41IC0yMC41dDIyLjUgLTI2LjVxNSAtOCAxMiAtMTh0MTMgLTIwcTYgLTExIDEzIC0yM2gyMDdxNyAxMCAxMyAyMXE1IDkgMTEgMTh0MTEgMTZxMTAgMTQgMjAgMjYuNXQyOCAyNC41cTggNSAxMy41IDEzdDcgMTZ0LTIgMTUuNXQtMTMuNSAxMS41cS05IDMgLTE1IDJ0LTEzIC0zLjV0LTEzLjUgLTUuNXQtMTYuNSAtM3QtMTYuNSAzLjV0LTEyLjUgOC41dC0xMSAxMHEtNiA2IC0xNiA5cS0yMCA4IC0zMiAzCnQtMjQgLTE2cS0xMCAtMTAgLTE2IC0xNHEtMyAtMiAtNSAtMnEtNiAzIC0xMSA3cS01IDMgLTkuNSA2LjV0LTguNSA4LjVxLTggOCAtMjQgMTAuNXQtMjkgLTUuNXEtMTcgLTExIC0yMy41IC0xOC41dC0yMC41IC0xMC41cS04IC0yIC0xNy41IDF0LTE5LjUgNnQtMTkgNHQtMTYgLTRxLTE0IC0xMSAtOSAtMjYuNXQxOCAtMjQuNXpNODU5LjUgMjgycS03LjUgNDkgLTI2LjUgODd0LTQ0LjUgNjYuNXQtNDkuNSA0OS41cS0yOSAyNCAtNTAuNSA0NS41CnQtMzYuNSAzOC41cS0xOCAxOCAtMzAgMzRoLTIyNHEtMTMgLTE2IC0zMCAtMzVxLTE0IC0xNyAtMzUgLTM3LjV0LTQ3IC00My41cS0zMCAtMjYgLTU1LjUgLTU5dC00Mi41IC03Mi41dC0yMy41IC04NHQyLjUgLTkzLjVxOCAtNDQgMzMgLTg4LjV0NjcuNSAtODB0MTAzIC01OHQxMzkuNSAtMjIuNXE3NyAwIDEzNyAxOS41dDEwNCA1Mi41dDcwLjUgNzd0MzUuNSA5NHExMCA2MSAyLjUgMTEwek02OTEgODBxLTEwIC03IC0yNSAtN2gtMTA4di0zMQpxMCAtMTQgLTExLjUgLTI3dC0zMC41IC0xMXEtMTggMCAtMzAuNSA4LjV0LTE0LjUgMjkuNXYzMWgtMTA0cS0xNiAwIC0yNiA4LjV0LTggMjAuNXEwIDE0IDEwIDIyLjV0MjQgOC41aDEwNHY1NGgtMTA0cS0xNiAwIC0yNSA5LjV0LTkgMjEuNXQxMCAyM3QyNCAxMWgxMDRsMiAzMnEtMjggMjggLTUxIDUycS0xOSAyMSAtMzcgNDBsLTIzIDIycS04IDkgLTE0IDI1LjV0NiAzMy41cTE0IDE1IDM0IDh0MzMgLTE4cTYgLTcgMjEgLTIzbDc0IC03NApxMjYgMjUgNDggNDVxMTggMTcgMzcgMzNxMTggMTYgMjYgMjJxMTQgMTMgMzEgMTN0MjggLTE0cTIwIC0yMyAtMTYgLTU0cS05IC04IC0yOCAtMjdxLTE4IC0xOSAtMzcgLTM4cS0yMSAtMjMgLTQ3IC00N3YtMzBoMTAwcTIxIDAgMzEgLTEwdDEwIC0yMnEwIC0xNCAtOSAtMjR0LTMxIC04bC0xMDAgLTJsLTEgLTUyaDk4cTQzIDAgNDMgLTMzcTIgLTE1IC04IC0yMnoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iaWNvbiIgdW5pY29kZT0iJiN4ZTYxNjsiIApkPSJNNzIyIDYxMHEtMTE3IDAgLTE4NiAtNTJ2MTk5cTAgNTcgLTY2IDk2LjV0LTE2MyAzOS41cS05OCAwIC0xNjUgLTM5LjV0LTY3IC05Ni41djF2MnYxdjJ2MXYxdjF2MnYxdjF2MXYydjF2MXYxdjF2MXYxdjF2MXYxdjF2MXYxdjF2MXYxdjF2MHYxdjF2MXYxdjB2MXYxdjF2MHYxdjF2MHYxdjB2MXYxdjB2MXYwdjF2MHYxdjB2MXYwdjF2MHYwdjF2MHYxdjB2MHYxdjB2MHYxdjB2MHYxdjB2MHYwdjB2MXYwdjB2MHYwdjF2MHYwdjB2MHYwdjB2MAp2MHYxdjB2MHYwdjB2MHYwdjB2MHYwdjB2MHYwdjB2MHYtMXYwdjB2MHYwdjB2MHYwdjB2LTF2MHYwdjB2MHYwdi0xdjB2MHYwdi0xdjB2MHYwdi0xdjB2MHYwdi0xdjB2MHYtMXYwdjB2MHYtMXYwdi0xdjB2MHYtMXYwdjB2LTF2MHYtMXYwdjB2LTF2MHYtMXYwdi0xdjB2LTF2MHYwdi0xdjB2LTF2MHYtMXYwdi0xdjB2LTF2LTF2MHYtMXYwdi0xdjB2LTF2MHYtMXYtMXYwdi0xdjB2LTF2LTF2MHYtMXYwdi0xdi0xdjB2LTF2LTF2MHYtMXYtMXYwCnYtMXYtMXYwdi0xdi0xdi0xdjB2LTF2LTF2MHYtMXYtMXYtMXYwdi0xdi0xdi0xdjB2LTF2LTF2LTF2MHYtMXYtMXYtMXYtMXYwdi0xdi0xdi0xdi0xdjB2LTF2LTF2LTF2LTF2LTF2LTF2MHYtMXYtMXYtMXYtMXYtMXYtMXYwdi0xdi0xdi0xdi0xdi0xdi0xdi0xdi0xdi0xdi0xdjB2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTF2LTEKdi0xdi0xdi0xdi0xdi0xdi0xdi0ydi0xdi0xdi0xdi0xdi0xdi0xdi0xdi0xdi0xdi0xdi0ydi0xdi0xdi0xdi0xdi0xdi0xdi0xdi0xdi0ydi0xdi0xdi0xdi0xdi0xdi0xdi0ydi0xdi0xdi0xdi0xdi0xdi0ydi0xdi0xdi0xdi0xdi0ydi0xdi0xdi0xdi0xdi0ydi0xdi0xdi0xdi0xdi0ydi0xdi0xdi0xdi0ydi0xdi0xdi0xdi0ydi0xdi0xdi0xdi0ydi0xdi0xdi0xdi0ydi0xdi0xdi0xdi0ydi0xdi0xdi0ydi0xdi0xdi0xdi0ydi0xdi0xCnYtMnYtMXYtMXYtMnYtMXYtMXYtMXYtMnYtMXYtMXYtMnYtMXYtMXYtMnYtMXYtMnYtMXYtMXYtMnYtMXYtMXYtMnYtMXYtMXYtMnYtMXYtMXYtMnYtMXYtMnYtMXYtMXYtMnYtMXYtMnYtMXYtMXYtMnYtMXYtMnYtMXYtMXYtMnYtMXYtMnYtMXYtMXYtMnYtMXYtMnYtMXYtMnYtMXYtMnYtMXYtMXYtMnYtMXYtMnYtMXYtMnYtMXYtMnYtMXYtMnYtMXYtMXYtMnYtMXYtMnYtMXYtMnYtMXYtMnYtMXYtMnYtMXYtMnYtMXYtMnYtMXYtMnYtMXYtMgp2LTF2LTJ2LTF2LTJ2LTF2LTJ2LTF2LTJ2LTJ2LTF2LTJ2LTF2LTJ2LTF2LTJ2LTF2LTJ2LTF2LTJ2LTJ2LTF2LTJ2LTF2LTJ2LTF2LTJ2LTJ2LTF2LTJ2LTF2LTJ2LTF2LTJ2LTJ2LTF2LTJ2LTF2LTJ2LTJ2LTF2LTJ2LTF2LTJ2LTJ2LTF2LTJ2LTF2LTJ2LTJ2LTF2LTJ2LTJ2LTF2LTJ2LTF2LTJ2LTJ2LTF2LTJ2LTJ2LTF2LTJ2LTJ2LTF2LTJ2LTJ2LTF2LTJ2LTF2LTJ2LTJ2LTF2LTJ2LTJ2LTJ2LTF2LTJ2LTJ2LTF2LTJ2LTJ2LTF2LTJ2LTIKdi0xdi0ydi0ydi0xdi0ydi0ydi0ydi0xdi0ydi0ydi0xdi0ydi0ydi0ydi0xdi0ydi0ydi0ydi0xdi0ydi0ydi0ydi0xdi0ydi0ydi0ydi0xdi0ydi0ydi0ydi0xdi0ydi0ydi0ydi0xdi0ydi0ydi0ydi0xdi0ydi0ydi0ydi0ydi0xdi0ydi0ydi0ydi0ydi0xdi0ydi0ydi0ydi0ydi0xdi0ydi0ydi0ydi0ydi0ydi0xdi0ydi0ydi0ydi0ydi0ydi0xdi0ydi0ydi0ydi0ydi0ydi0xdi0ydi0ydi0ydi0ydi0ydi0ydi0xdi0ydi0ydi0ydi0ydi0yCnYtMnYtMnYtMXYtMnYtMnYtMnYtMnYtMnYtMnYtMnYtMXYtOXYwdjB2LTR2MHEzIC01NiA2OS41IC05NHQxNjIuNSAtMzh2MHYzMmwtMSAtNTN2MHYwdi01aDFxMyAtNTUgNjkuNSAtOTN0MTYyLjUgLTM4dDE2MyAzOC41dDY5IDk1LjV2MHYzN3E3OSA5IDEyOCA0NS41dDUwIDg1LjV2MHYyOTdxMCA1NyAtNjQuNSA5Ni41dC0xNjIuNSAzOS41ek01MzkgMjJxLTc2IDAgLTEyOC41IDI2dC01NS41IDU4djZxMSA1IDIgOXE2OSAtNTAgMTgxLjUgLTUwCnQxODEuNSA1MHEyIC02IDIgLTEycTAgLTMzIC01MyAtNjB0LTEzMCAtMjd2MHpNNzIyIDIwNy41cTAgLTMyLjUgLTUzIC02MHQtMTMwIC0yNy41cS03NCAwIC0xMjYgMjV0LTU3IDU2djZoLTFxMCAzMyA1MyA2MHQxMzAuNSAyN3QxMzAuNSAtMjd0NTMgLTU5LjV6TTMwNyAyNzdxLTc3IDAgLTEyOS41IDI2LjV0LTU0LjUgNTguNXY1cTAgNSAyIDEwcTY5IC01MSAxODEuNSAtNTF0MTgxLjUgNTFxMiAtNyAyIC0xMnEwIC0xMyAtOSAtMjYKcS05MiAtMTMgLTE0MCAtNjBxLTE4IC0yIC0zNCAtMnpNNTEwIDM0MmgtMmgyek0xMjUgNTczcTY5IC01MCAxODEuNSAtNTB0MTgxLjUgNTBxMiAtNyAyIC0xMnEwIC0zMyAtNTMgLTYwdC0xMzAgLTI3cS03NSAwIC0xMjcuNSAyNS41dC01Ni41IDU2LjV2OXpNMTIzIDY1NHYxMHExIDQgMiA3cTY5IC01MCAxODEuNSAtNTB0MTgxLjUgNTBxMiAtNiAyIC0xMnEwIC0zMyAtNTMgLTYwdC0xMzAgLTI3cS03NSAwIC0xMjcgMjV0LTU3IDU3egpNMTI1IDQ3NXE2OSAtNTEgMTgxLjUgLTUxdDE4MS41IDUxcTIgLTcgMiAtMTJxMCAtMzMgLTUzIC02MC41dC0xMzAgLTI3LjVxLTc2IDAgLTEyOC41IDI2dC01NS41IDU4djdxMSA1IDIgOXpNMzA2LjUgODQ0cTc3LjUgMCAxMzAuNSAtMjd0NTMgLTYwdC01MyAtNjB0LTEzMCAtMjdxLTc0IDAgLTEyNiAyNC41dC01NyA1Ni41djZoLTFxMCAzMyA1MyA2MHQxMzAuNSAyN3pNMzA2IDEwOXEwIC0xIDAuNSAtMnQwLjUgLTJ2LTI0djAKcS03OCAwIC0xMzEgMjcuNXQtNTMgNTkuNXYwcTAgNiAyIDEzcTY5IC01MSAxODIgLTUxdjB2LTE3cTAgLTEgLTAuNSAtMnQtMC41IC0ydjB6TTMwNyAxMzh2NDF2MHYwcS03NyAwIC0xMzAgMjd0LTU0IDU5djJxMCA2IDIgMTJxNjkgLTUxIDE4MiAtNTFoMWgxdjBxLTMgLTExIC0zIC0yMWwxIC04di02MXpNMzMwIDI2N3YwdjB6TTMyMSAyNTV2MHYwek01MzkgLTc2cS03OCAwIC0xMzEgMjd0LTUzIDYwdjBxMCA2IDIgMTIKcTY5IC01MCAxODEuNSAtNTB0MTgxLjUgNTBxMiAtNyAyIC0xMnEwIC0zMyAtNTMgLTYwdC0xMzAgLTI3djB6TTc3MSA5NXY0OXE4MiAxMCAxMzMgNDdxMiAtNiAyIC0xMnEwIC0yNyAtMzcuNSAtNTF0LTk3LjUgLTMzek03NzEgMTk0djEzcTAgMTcgLTcgMzRxODYgOSAxNDAgNDhxMiAtNiAyIC0xMnEwIC0yNyAtMzcuNSAtNTF0LTk3LjUgLTMyek03MjYgMjg4cS02MyA1MSAtMTcyIDU1cS0xMyAxNCAtMTUgMjh2OHExIDQgMiA5CnE2OSAtNTEgMTgxIC01MXExMTMgMCAxODIgNTFxMiAtNyAyIC0xM3EwIC0zMiAtNTEuNSAtNTl0LTEyOC41IC0yOHpNNzIyIDM4NnEtNzMgMCAtMTI1IDI1dC01OCA1NnY3djBxMCAzMiA1MyA1OS41dDEzMC41IDI3LjV0MTMwLjUgLTI3LjV0NTMgLTYwdC01MyAtNjB0LTEzMSAtMjcuNXoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iMTUiIHVuaWNvZGU9IiYjeGU2MWU7IiAKZD0iTTcxMSA2NDlxLTU3IDAgLTEwNS41IC0xNXQtNzkuNSAtNDF2MTA3djBxLTQgNTMgLTY5IDkwdC0xNTUuNSAzN3QtMTU2IC0zN3QtNjkuNSAtOTB2MHYtNDcwdjB2LTNxMCAtNTUgNjUuNSAtOTR0MTU3LjUgLTM5di0zMnYwcTMgLTU0IDY4LjUgLTkxLjV0MTU3IC0zNy41dDE1NyAzNy41dDY3LjUgOTEuNWgxdjQycTc3IDggMTI5LjUgNDMuNXQ1Ni41IDgyLjV2MHYyODZxMCA1NSAtNjYgOTR0LTE1OSAzOXpNMTM1IDcxNnExMSAxNSAzMyAyOApxNTQgMzEgMTMzIDMxdDEzMyAtMzFxMjIgLTEzIDMzIC0yOHE4IC0xMiA4IC0yMi41dC04IC0yMS41cS0xMSAtMTYgLTMzIC0yOHEtNTQgLTMyIC0xMzMgLTMydC0xMzMgMzJxLTIyIDEyIC0zMyAyOHEtOCAxMSAtOCAyMS41dDggMjIuNXpNMTI4IDYwOXE2NyAtNDggMTczIC00OHQxNzMgNDhxMSAtNCAxIC03cTAgLTEwIC04IC0yMnEtMTEgLTE1IC0zMyAtMjhxLTU0IC0zMSAtMTMzIC0zMXQtMTMzIDMxcS0yMiAxMyAtMzMgMjgKcS04IDEyIC04IDIycTAgMyAxIDd6TTEzMCA1MTZxNjcgLTQ3IDE3MSAtNDd0MTcxIDQ3cTMgLTYgMyAtMTJxMCAtMTEgLTggLTIycS0xMSAtMTUgLTMzIC0yOHEtNTQgLTMyIC0xMzMgLTMydC0xMzMgMzJxLTIyIDEzIC0zMyAyOHEtOCAxMSAtOCAyMnEwIDYgMyAxMnpNMTI4IDQxOXE2NyAtNDggMTczIC00OHQxNzMgNDhxMSAtMyAxIC03cTAgLTEwIC04IC0yMnEtMyAtMyAtNiAtN3EtNzQgLTEzIC0xMjAgLTUwcS0yMCAtMyAtNDAgLTMKcS03OSAwIC0xMzMgMzJxLTIyIDEzIC0zMyAyOHEtOCAxMiAtOCAyMnEwIDQgMSA3ek0xMjggMzI3cTY4IC00OCAxNzMgLTQ4aDJxLTQgLTExIC00IC0yM3YtMTlxLTc4IDAgLTEzMSAzMnEtMjIgMTMgLTMzIDI4cS04IDExIC04IDIycTAgNCAxIDh6TTE2OCAxNzdxLTIyIDEzIC0zMyAyOHEtOCAxMSAtOCAyMnEwIDMgMSA3cTY3IC00OCAxNzEgLTQ4di00MXEtNzggMCAtMTMxIDMyek02OTAgNDRxLTExIC0xNSAtMzIgLTI4CnEtNTQgLTMyIC0xMzMuNSAtMzJ0LTEzMy41IDMycS0yMiAxMyAtMzIgMjhxLTkgMTEgLTkgMjJxMCA2IDMgMTJxNjggLTQ3IDE3MS41IC00N3QxNzEuNSA0N3EyIC02IDIgLTEycTAgLTExIC04IC0yMnpNNjkwIDE0MnEtMTEgLTE1IC0zMiAtMjhxLTU0IC0zMSAtMTMzLjUgLTMxdC0xMzMuNSAzMXEtMjIgMTMgLTMyIDI4cS05IDEyIC05IDIycTAgNCAxIDdxNjggLTQ4IDE3My41IC00OHQxNzMuNSA0OHYtN3EwIC0xMCAtOCAtMjJ6TTY5MCAyMzQKcS0xMSAtMTYgLTMyIC0yOHEtNTQgLTMyIC0xMzMuNSAtMzJ0LTEzMy41IDMycS0yMiAxMiAtMzIgMjhxLTkgMTEgLTkgMjEuNXQ5IDIyLjVxMTAgMTUgMzIgMjhxNTQgMzEgMTMzLjUgMzF0MTMzLjUgLTMxcTIxIC0xMyAzMiAtMjhxOCAtMTIgOCAtMjIuNXQtOCAtMjEuNXpNODc2IDIxM3EtMTAgLTE1IC0zMiAtMjhxLTM5IC0yMyAtOTQgLTI5djQwcTgxIDggMTM0IDQ2cTEgLTQgMSAtN3EwIC0xMSAtOSAtMjJ6TTg3NiAzMDUKcS0xMCAtMTUgLTMyIC0yOHEtMzkgLTIzIC05NCAtMzB2OXEwIDE5IC0xMCAzN3E4NiA3IDE0MiA0NnEzIC02IDMgLTEycTAgLTExIC05IC0yMnpNODc2IDQwM3EtMTAgLTE1IC0zMiAtMjhxLTU0IC0zMiAtMTMzIC0zMnEtOSAwIC0xOCAxcS01NCAzNSAtMTMyIDQzcS0xMCA4IC0xNiAxNnEtOCAxMiAtOCAyMnY2cTY4IC00OCAxNzMuNSAtNDh0MTczLjUgNDhxMSAtMyAxIC02cTAgLTEwIC05IC0yMnpNODc2IDQ5NHEtMTAgLTE1IC0zMiAtMjgKcS01NCAtMzIgLTEzMy41IC0zMnQtMTMzLjUgMzJxLTIxIDEzIC0zMiAyOHEtOCAxMiAtOCAyMi41dDggMjEuNXExMSAxNSAzMiAyOHE1NCAzMiAxMzMuNSAzMnQxMzMuNSAtMzJxMjIgLTEzIDMyIC0yOHE5IC0xMSA5IC0yMS41dC05IC0yMi41eiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJmdXpoaSIgdW5pY29kZT0iJiN4ZTYwMDsiIApkPSJNNjQ3IDQ5NmgtNDI2djBxLTEwIDAgLTE3IC02LjV0LTcgLTE2LjV0NyAtMTd0MTcgLTd2MGg0MjZ2MHExMCAwIDE3IDd0NyAxN3QtNyAxNi41dC0xNyA2LjV2MHpNNjQ3IDMxN2gtNDI2djBxLTEwIDAgLTE3IC03dC03IC0xNi41dDcgLTE2LjV0MTcgLTd2MGg0MjZ2MHExMCAwIDE3IDd0NyAxNi41dC03IDE2LjV0LTE3IDd2MHpNNDgxIDEzOGgtMjYwdjBxLTEwIDAgLTE3IC03dC03IC0xNi41dDcgLTE2LjV0MTcgLTd2MGgyNjB2MApxMTAgMCAxNyA3dDcgMTYuNXQtNyAxNi41dC0xNyA3djB6TTg3MiA4NTBoLTU2MXEtOSAwIC0xNyAtMC41dC0yNSAtNnQtMjkgLTE1dC0yMS41IC0zMC41dC05LjUgLTUwdi03M2gtNTZxLTggMCAtMTYgLTAuNXQtMjUuNSAtNnQtMjkgLTE1dC0yMS41IC0zMC41dC0xMCAtNDl2LTU2MHEwIC0yOSAxMC41IC00OS41dDI1LjUgLTMwLjV0MzAgLTE1LjV0MjYgLTUuNWwxMCAtMWg1NjJxMzkgMCA2NSAyMWwxIDF0MiAxcTE2IDE0IDI0IDM0CmwtMTMgLTIxcTEwIDEzIDE2IDI5LjV0NiAyNi41bDEgMTB2NzNoNTVxNDAgMCA2NSAyMXExIDAgMiAwLjV0MSAxLjVxMTYgMTQgMjQgMzNsLTEyIC0yMXEyMiAzMCAyMiA2N3Y1NTlxMCAyOSAtOS41IDUwdC0yMS41IDMwLjV0LTI5IDE1dC0yNSA2dC0xNyAwLjV6TTc3MyA0NnEtMSAtMzMgLTIwIC01OXEtMyAtNCAtOCAtN3EtMiAtNyAtMTkgLTE0bDE0IDhxLTIzIC0xOCAtNTggLTE4aC00OTZxLTQgMCAtMTAgMC41dC0yMS41IDUuNQp0LTI3LjUgMTMuNXQtMjIgMjd0LTEwIDQzLjV2NDk1cTAgMjYgOC41IDQ0dDE5LjUgMjd0MjYgMTMuNXQyMiA1dDE1IDAuNWg0OTZxOCAwIDE1IC0wLjV0MjIgLTV0MjUuNSAtMTMuNXQxOS41IC0yN3Q5IC00NHYtNDk1ek05MzAgMjIxcTAgLTMzIC0yMCAtNTlxLTMgLTUgLTcgLThxLTMgLTYgLTIwIC0xM2wxNCA4cS0yMiAtMTggLTU3IC0xOGgtMjN2NDQzcTAgMjggLTEwIDQ5dC0yMiAzMC41dC0yOSAxNXQtMjUgNnQtMTYgMC41aC00NjJ2NDEKcTAgMjUgOC41IDQzLjV0MTkgMjd0MjUuNSAxMy41dDIyIDUuNXQxNSAwLjVoNDk3cTcgMCAxNCAtMC41dDIyLjUgLTUuNXQyNiAtMTMuNXQxOSAtMjd0OC41IC00My41di00OTV6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9InJhZGlvIiB1bmljb2RlPSImI3hlNjAzOyIgCmQ9Ik01MTMgODMycS05MSAwIC0xNzQgLTM1LjV0LTE0MyAtOTUuNXQtOTUuNSAtMTQyLjV0LTM1LjUgLTE3My41dDM1LjUgLTE3NHQ5NS41IC0xNDN0MTQzIC05NS41dDE3NCAtMzUuNXQxNzMuNSAzNS41dDE0Mi41IDk1LjV0OTUuNSAxNDN0MzUuNSAxNzR0LTM1LjUgMTczLjV0LTk1LjUgMTQyLjV0LTE0Mi41IDk1LjV0LTE3My41IDM1LjV6TTgwMSA1MDdsLTM0NiAtMzQ3cS0xMyAtMTMgLTMxLjUgLTEzdC0zMi41IDEzbC0xNzkgMTc5CnEtMTMgMTMgLTEzIDMxLjV0MTMuNSAzMS41dDMyIDEzdDMxLjUgLTEzbDE0NyAtMTQ3bDMxNSAzMTVxMTMgMTMgMzEuNSAxM3QzMiAtMTN0MTMuNSAtMzEuNXQtMTQgLTMxLjV6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9InRuLXJhZGlvIiB1bmljb2RlPSImI3hlNjIxOyIgCmQ9Ik01MTIgODQ2cS05NCAwIC0xNzkuNSAtMzd0LTE0NyAtOTguNXQtOTguNSAtMTQ3dC0zNyAtMTc5LjV0MzcgLTE3OS41dDk4LjUgLTE0N3QxNDcgLTk4LjV0MTc5LjUgLTM3dDE3OS41IDM3dDE0NyA5OC41dDk4LjUgMTQ3dDM3IDE3OS41dC0zNyAxNzkuNXQtOTguNSAxNDd0LTE0NyA5OC41dC0xNzkuNSAzN3pNNTEyIC0xcS0xMDQgMCAtMTkzIDUxLjV0LTE0MC41IDE0MC41dC01MS41IDE5M3Q1MS41IDE5M3QxNDAuNSAxNDAuNQp0MTkzIDUxLjV0MTkzIC01MS41dDE0MC41IC0xNDAuNXQ1MS41IC0xOTN0LTUxLjUgLTE5M3QtMTQwLjUgLTE0MC41dC0xOTMgLTUxLjV2MHoiIC8+CiAgPC9mb250Pgo8L2RlZnM+PC9zdmc+Cg=="

/***/ }),

/***/ 1158:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.con_Main = exports.Main = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(64);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(94);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRedux = __webpack_require__(253);

	var _reactRouter = __webpack_require__(272);

	__webpack_require__(534);

	var _mapStateToProps_Main = __webpack_require__(1159);

	var _mapDispatchToProps_Main = __webpack_require__(1160);

	__webpack_require__(571);

	var _common = __webpack_require__(1162);

	var _common2 = _interopRequireDefault(_common);

	var _mockData = __webpack_require__(1157);

	var _mockData2 = _interopRequireDefault(_mockData);

	__webpack_require__(561);

	__webpack_require__(563);

	var _jqueryWeui = __webpack_require__(565);

	var _jqueryWeui2 = _interopRequireDefault(_jqueryWeui);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// import FastClick from '../node_modules/jquery-weui/dist/lib/fastclick'

	// React component
	var Main = function (_Component) {
	  _inherits(Main, _Component);

	  function Main() {
	    _classCallCheck(this, Main);

	    return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
	  }

	  _createClass(Main, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var me = this;
	      // FastClick.attach(document.body); 
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          onPro_stateChange = _props.onPro_stateChange,
	          pro_state = _props.V3DemoReducer.pro_state,
	          me = this;

	      return _react2.default.createElement(
	        'div',
	        { className: 'h100' },
	        this.props.children,
	        _react2.default.createElement(
	          'div',
	          { className: pro_state == 'Pending' ? 'showLoading' : 'hide' },
	          _react2.default.createElement('div', { className: 'weui-mask_transparent' }),
	          _react2.default.createElement(
	            'div',
	            { className: 'weui-toast' },
	            _react2.default.createElement('i', { className: 'weui-loading weui-icon_toast' }),
	            _react2.default.createElement(
	              'p',
	              { className: 'weui-toast__content' },
	              '\u6570\u636E\u52A0\u8F7D\u4E2D'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: pro_state == 'Rejected' ? 'showDialog' : 'hide' },
	          _react2.default.createElement('div', { className: 'weui-mask' }),
	          _react2.default.createElement(
	            'div',
	            { className: 'weui-dialog' },
	            _react2.default.createElement(
	              'div',
	              { className: 'weui-dialog__hd' },
	              _react2.default.createElement(
	                'strong',
	                { className: 'weui-dialog__title' },
	                '\u5F39\u7A97\u6807\u9898'
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'weui-dialog__bd' },
	              '\u5F39\u7A97\u5185\u5BB9\uFF0C\u544A\u77E5\u5F53\u524D\u9875\u9762\u4FE1\u606F\u7B49'
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'weui-dialog__ft' },
	              _react2.default.createElement(
	                'a',
	                { href: 'javascript:;',
	                  className: 'weui-dialog__btn weui-dialog__btn_primary', onClick: function onClick() {
	                    return onPro_stateChange('Resolved');
	                  } },
	                '\u786E\u5B9A'
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Main;
	}(_react.Component);

	var con_Main = (0, _reactRedux.connect)(_mapStateToProps_Main.mapStateToProps_Main, _mapDispatchToProps_Main.mapDispatchToProps_Main)(Main);

	exports.Main = Main;
	exports.con_Main = con_Main;
	exports.default = con_Main;

/***/ }),

/***/ 1159:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mapStateToProps_Main = undefined;

	var _immutable = __webpack_require__(532);

	var mapStateToProps_Main = function mapStateToProps_Main(state, ownProps) {
	  var rObj = (0, _immutable.fromJS)(state).mergeDeep({
	    stateFlag: 'mapStateToProps_Main'
	  });
	  return rObj.toJSON();
	};
	exports.mapStateToProps_Main = mapStateToProps_Main;
	exports.default = mapStateToProps_Main;

/***/ }),

/***/ 1160:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mapDispatchToProps_Main = undefined;

	var _Action = __webpack_require__(1056);

	var _immutable = __webpack_require__(532);

	var _mapDispatchToProps_Common = __webpack_require__(1161);

	var mapDispatchToProps_Main = function mapDispatchToProps_Main(dispatch, ownProps) {
	  return (0, _mapDispatchToProps_Common.mapDispatchToProps_Common)(dispatch, ownProps);
	};
	exports.mapDispatchToProps_Main = mapDispatchToProps_Main;
	exports.default = mapDispatchToProps_Main;

/***/ }),

/***/ 1161:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.mapDispatchToProps_Common = undefined;

	var _Action = __webpack_require__(1056);

	var _immutable = __webpack_require__(532);

	var _common = __webpack_require__(1162);

	var _common2 = _interopRequireDefault(_common);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapDispatchToProps_Common = function mapDispatchToProps_Common(dispatch, ownProps) {
	  return {
	    onMain_TabbarClick: function onMain_TabbarClick(e, index) {
	      dispatch({
	        type: 'onMain_TabbarClick_saga',
	        e: e,
	        index: index,
	        ownProps: ownProps
	      });
	    },
	    onMain_TabbarClickOld: function onMain_TabbarClickOld(e, index) {
	      dispatch(_Action.Action.Main_TabbarClickAction(e, index));
	      (0, _common.Ajax)({
	        url: _common.API.login,
	        doneFun: function doneFun(msg) {
	          var data = JSON.parse(msg);
	          if (data.suc) {
	            dispatch(_Action.Action.Main_TabbarClickAction(e, index));

	            switch (index) {
	              case 0:
	                ownProps.router.push({
	                  pathname: '/'
	                });
	                return;
	              case 1:
	                ownProps.router.push({
	                  pathname: '/PageTwo'
	                });
	                return;
	              case 2:
	                ownProps.router.push({
	                  pathname: '/Quote'
	                });
	                return;
	              case 3:
	                ownProps.router.push({
	                  pathname: '/PageFour'
	                });
	                return;
	              default:
	                ownProps.router.push({
	                  pathname: '/'
	                });
	                return;

	            }
	          } else {
	            setTimeout(function () {
	              dispatch(_Action.Action.pro_stateClickAction('Resolved'));
	            }, 1);
	          }
	        },
	        failFun: function failFun(jqXHR, textStatus) {},
	        alwaysFun: function alwaysFun() {},
	        props: dispatch
	      });
	    },
	    onPro_stateChange: function onPro_stateChange(state) {
	      return dispatch(_Action.Action.pro_stateClickAction(state));
	    },
	    dispatch: dispatch
	  };
	};

	exports.mapDispatchToProps_Common = mapDispatchToProps_Common;
	exports.default = mapDispatchToProps_Common;

/***/ }),

/***/ 1162:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});
	exports.API = undefined;
	exports.Ajax = Ajax;
	exports.CheckLogin = CheckLogin;

	var _jqueryVendor = __webpack_require__(740);

	var _jqueryVendor2 = _interopRequireDefault(_jqueryVendor);

	var _jsCookie = __webpack_require__(553);

	var _jsCookie2 = _interopRequireDefault(_jsCookie);

	var _immutable = __webpack_require__(532);

	var _Action = __webpack_require__(1056);

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
	// const apiPreFix = 'http://192.168.91.102/' //'/'// 
	var apiPreFix = '/'; // 
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

/***/ })

});