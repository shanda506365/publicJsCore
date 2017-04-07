import Mock from 'mockjs'
import common, {
	Ajax,
	API
} from './../lib/common'

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
export {mData as mData}