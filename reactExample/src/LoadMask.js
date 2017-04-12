 import a from './lib/jquery-vendor.js';

 var b = {
 	init: function(b) {
 		var c = a.extend({}, a.fn.loadingOverlay.defaults, b),
 			d = a(this).addClass(c.loadingClass),
 			e = '<div class="' + c.overlayClass + '"><p class="' + c.spinnerClass + '"><span class="' + c.iconClass + '"></span><span class="' + c.textClass + '">' + c.loadingText + "</span></p></div>";
 		return d.data("loading-overlay") || d.prepend(a(e)).data("loading-overlay", !0), d
 	},
 	remove: function(b) {
 		var c = a.extend({}, a.fn.loadingOverlay.defaults, b),
 			d = a(this).data("loading-overlay", !1);
 		return d.find("." + c.overlayClass).detach(), d.hasClass(c.loadingClass) ? d.removeClass(c.loadingClass) : d.find("." + c.loadingClass).removeClass(c.loadingClass), d
 	},
 	exposeMethods: function() {
 		return b
 	}
 };
 a.fn.loadingOverlay = function(c) {
 	return b[c] ? b[c].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof c && c ? void a.error("Method " + c + " does not exist on jQuery.loadingOverlay") : b.init.apply(this, arguments)
 }, a.fn.loadingOverlay.defaults = {
 	loadingClass: "loading",
 	overlayClass: "loading-overlay",
 	spinnerClass: "loading-spinner",
 	iconClass: "loading-icon",
 	textClass: "loading-text",
 	loadingText: "请稍候"
 }