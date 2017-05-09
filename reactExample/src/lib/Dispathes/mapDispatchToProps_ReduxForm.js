 import Action from '../Action'
 import {
 	fromJS
 } from 'immutable'

 import mapDispatchToProps_Common from './mapDispatchToProps_Common'

 const mapDispatchToProps_ReduxForm = function(dispatch, ownProps) {
 	return fromJS({
 		onFormSubmit: (e, values, state, formDataName) => dispatch(fromJS(Action.formSubmitAction).mergeDeep({
 			e,
 			values,
 			state,
 			formDataName
 		}).toJSON()),
 		onSimpleFormLoad: () => dispatch(Action.simpleFormLoadAction),
 		onTagSelect: (e, tagSels) => dispatch(fromJS(Action.tagSelectAction).mergeDeep({
 			e,
 			tagSels
 		}).toJSON())
 	}).mergeDeep(mapDispatchToProps_Common(dispatch, ownProps)).toJSON()
 }

 export default mapDispatchToProps_ReduxForm