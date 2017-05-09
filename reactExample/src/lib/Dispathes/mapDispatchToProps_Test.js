 import Action from '../Action'
 import {
 	fromJS
 } from 'immutable'

 import mapDispatchToProps_Common from './mapDispatchToProps_Common'

 const mapDispatchToProps_Test = function(dispatch, ownProps) {
 	return fromJS({
 		onIncreaseTestClick: () => dispatch({
 			type: 'increaseTest',
 			filter: ownProps
 		})
 	}).mergeDeep(mapDispatchToProps_Common(dispatch, ownProps)).toJSON()
 }

 export default mapDispatchToProps_Test