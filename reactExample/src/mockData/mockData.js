import Mock from 'mockjs' 
import common,{Ajax,API} from './../lib/common'

Mock.mock(API.login, {
    'name': Mock.Random.name(),
    'age|1-100': 100,
    'color': Mock.Random.color()
});