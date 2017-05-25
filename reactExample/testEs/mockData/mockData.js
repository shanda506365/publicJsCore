'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.optionsData = exports.mData = undefined;

var _mockjs = require('mockjs');

var _mockjs2 = _interopRequireDefault(_mockjs);

var _API = require('./../lib/API');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mockjs2.default.setup({
	// timeout: '1000-4000'
});
_mockjs2.default.mock(_API.API.login, {
	'suc|9-1': true,
	'msg|1-10': '',
	'code': '01',
	'data|1-10': [{
		'id|+1': 1,
		'name': '@name',
		'age|1-100': 100,
		'color': _mockjs2.default.Random.color()
	}]
});
var mData = _mockjs2.default.mock({
	'suc': true,
	'msg|1-10': '',
	'code': '01',
	'data|1-10': [{
		'id|+1': 1,
		'name': '@name',
		'age|1-100': 100,
		'color': '@color'
	}]
});
var optionsData = _mockjs2.default.mock({
	'data|2-2': [{
		'id|+1': 1,
		'name': '@name',
		'age|1-100': 100,
		'color': '@color'
	}]
});
var Random = _mockjs2.default.Random;
Random.extend({
	constellation: function constellation(date) {
		var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'];
		return this.pick(constellations);
	}
});
Random.constellation();
// // => "水瓶座"
// alert(Mock.mock('@CONSTELLATION'))
// // => "天蝎座"
// alert(JSON.stringify(Mock.mock({
//     constellation: '@CONSTELLATION'
// })))

// var template = {
// 	'suc': true,
// 	'msg|1-10': '',
// 	'code': '01',
// 	'data|0-10':[{
// 		'id|+1':0,
// 		'name': '@name',
// 		'age|1-100': 1001,
// 		'color':'@color'
// 	}] 
// }
// var data = {
// 	'suc': true,
// 	'msg': '',
// 	'code': '02',
// 	'data':[{
// 		'id':0,
// 		'name': 'Larry Wilson',
// 		'age': 100,
// 		'color':'#3538B2'
// 	}] 
// }
// console.log(Mock.valid(template, data))
exports.mData = mData;
exports.optionsData = optionsData;