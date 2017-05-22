 import {
 	Action
 } from '../Action'
 import {
 	fromJS
 } from 'immutable'

 import {
 	mapDispatchToProps_Common
 } from './mapDispatchToProps_Common'


 const mapDispatchToProps_PageFour = function(dispatch, ownProps) {
 	return fromJS(mapDispatchToProps_Common(dispatch, ownProps)).mergeDeep({
 		onSomeButtonClicked: (e, tabIndex) => { 
 			dispatch({
 				type: 'USER_FETCH_REQUESTED',
 				payload: {
 					tabIndex
 				}
 			})
 		}
 	}).toJSON()

 	// return mapDispatchToProps_Common(dispatch, ownProps)

 }
 export{
 	mapDispatchToProps_PageFour
 }
 export default mapDispatchToProps_PageFour