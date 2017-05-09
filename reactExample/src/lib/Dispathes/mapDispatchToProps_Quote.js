 import Action from '../Action'
 import {
 	fromJS
 } from 'immutable'

 import mapDispatchToProps_Common from './mapDispatchToProps_Common'

 const mapDispatchToProps_Quote = function(dispatch, ownProps) {
 	return fromJS({
 		onTabbarClick: (e, index) => dispatch(fromJS(Action.quote_tabbarClickAction).mergeDeep({
 			e,
 			index
 		}).toJSON())
 	}).mergeDeep(mapDispatchToProps_Common(dispatch, ownProps)).toJSON()
 }

 export default mapDispatchToProps_Quote