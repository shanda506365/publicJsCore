 import {
 	Action
 } from '../Action'
 import {
 	fromJS
 } from 'immutable'

 import {
 	mapDispatchToProps_Common
 } from './mapDispatchToProps_Common'


 const mapDispatchToProps_PageOne = function(dispatch, ownProps) {
 	return fromJS(mapDispatchToProps_Common(dispatch, ownProps)).mergeDeep({}).toJSON()

 	// return mapDispatchToProps_Common(dispatch, ownProps)

 }
 export {
 	mapDispatchToProps_PageOne
 }
 export default mapDispatchToProps_PageOne