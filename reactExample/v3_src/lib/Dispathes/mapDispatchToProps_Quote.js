 import {Action} from '../Action' 
 import {
 	fromJS
 } from 'immutable'

 import {mapDispatchToProps_Common} from './mapDispatchToProps_Common'

 const mapDispatchToProps_Quote = function(dispatch, ownProps) {
 	return mapDispatchToProps_Common(dispatch, ownProps)
 	// return fromJS({
 	// 	onMain_TabbarClick: (e, index) => dispatch(fromJS(Action.Main_TabbarClickAction).mergeDeep({
 	// 		e,
 	// 		index
 	// 	}).toJSON())
 	// }).mergeDeep(mapDispatchToProps_Common(dispatch, ownProps)()).toJSON()
 }
 export {
 	mapDispatchToProps_Quote
 }
 export default mapDispatchToProps_Quote