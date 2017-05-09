 import Action from '../Action'
 import {
 	fromJS
 } from 'immutable'

 import mapDispatchToProps_Common from './mapDispatchToProps_Common'

 const mapDispatchToProps_Count = function(dispatch, ownProps) {
 	return {
 		onIncreaseClick: () => dispatch(Action.increaseAction),
 		onTestValClick: () => dispatch({
 			type: ''
 		}),
 		onNavbarClick: (e, index) => dispatch(fromJS(Action.navbarClickAction).mergeDeep({
 			e,
 			index
 		}).toJSON())
 	}
 }

 export default mapDispatchToProps_Count