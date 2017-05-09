 import Action from '../Action'
 import {
 	fromJS
 } from 'immutable'

 const mapDispatchToProps_Common = function(dispatch, ownProps) {
 	return {
 		onPro_stateChange: (state) => dispatch(fromJS(Action.pro_stateClickAction).mergeDeep({
 			state
 		}).toJSON())
 	}
 }

 export default mapDispatchToProps_Common