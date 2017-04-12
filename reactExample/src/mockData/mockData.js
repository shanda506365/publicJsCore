import Mock from 'mockjs'
import common, {
	Ajax,
	API
} from './../lib/common'
Mock.setup({
	timeout: '1000-4000'
})
Mock.mock(API.login, {
	'suc': true,
	'msg|1-10': '',
	'code': '01',
	'data|1-10':[{
		'id|+1':1,
		'name': '@name',
		'age|1-100': 100,
		'color': Mock.Random.color()
	}] 
});
var mData = Mock.mock({
	'suc': true,
	'msg|1-10': '',
	'code': '01',
	'data|1-10':[{
		'id|+1':1,
		'name': '@name',
		'age|1-100': 100,
		'color':'@color'
	}] 
});

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
export {mData as mData}